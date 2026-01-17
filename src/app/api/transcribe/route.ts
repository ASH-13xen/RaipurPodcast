/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import os from "os";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY || "");

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function safeDelete(filePath: string) {
  try {
    await unlink(filePath);
    console.log(`Temp file cleaned up: ${filePath}`);
  } catch (error: any) {
    if (error.code !== "ENOENT") {
      console.error(`Warning: Failed to delete temp file: ${filePath}`, error);
    }
  }
}

export async function POST(req: Request) {
  let tempFilePath = "";
  let uploadResponse: any = null;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const language = (formData.get("language") as string) || "English";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 1. Save locally
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    tempFilePath = path.join(os.tmpdir(), `upload_${Date.now()}_${file.name}`);
    await writeFile(tempFilePath, buffer);

    // 2. Upload to Google
    uploadResponse = await fileManager.uploadFile(tempFilePath, {
      mimeType: file.type || "audio/mp3",
      displayName: file.name,
    });

    // 3. Wait for processing
    let fileState = await fileManager.getFile(uploadResponse.file.name);
    while (fileState.state === "PROCESSING") {
      await delay(2000);
      fileState = await fileManager.getFile(uploadResponse.file.name);
    }

    if (fileState.state === "FAILED") {
      throw new Error("Audio processing failed by Google AI.");
    }

    // 4. Dynamic Prompt
    let languageInstruction = "";
    if (language === "Hinglish") {
      languageInstruction =
        "The audio is in Hindi/English mix. Transcribe using LATIN alphabet (English script).";
    } else {
      languageInstruction = `The audio is in ${language}. Transcribe using ${language} script.`;
    }

    // --- FIX 1: Enable JSON Mode ---
    // We explicitly tell the model to return JSON using generationConfig
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      generationConfig: { responseMimeType: "application/json" },
    });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      {
        text: `You are a professional transcriber. 
        1. ${languageInstruction}
        2. Identify speakers (Speaker 1, Speaker 2).
        3. Return ONLY a valid JSON array.
        
        Format: [{"speaker": "Speaker 1", "text": "..."}]`,
      },
    ]);

    let responseText = result.response.text();

    // --- FIX 2: The "Repairman" (Handle Truncated JSON) ---
    // If the string is cut off (doesn't end with ']')
    // we try to close it manually to save the data we have.
    responseText = responseText.trim();

    // Clean potential markdown just in case (though JSON mode usually avoids it)
    if (responseText.startsWith("```json")) {
      responseText = responseText.replace(/```json|```/g, "").trim();
    }

    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch (jsonError) {
      console.warn("JSON Parse failed, attempting repair...", jsonError);
      // Bruteforce Repair: Find the last closing brace '}' and add ']'
      const lastClosingBrace = responseText.lastIndexOf("}");
      if (lastClosingBrace !== -1) {
        const repairedJson =
          responseText.substring(0, lastClosingBrace + 1) + "]";
        try {
          parsedData = JSON.parse(repairedJson);
          console.log("JSON successfully repaired!");
        } catch (e) {
          throw new Error(
            "Transcript was too long and the JSON could not be repaired. Please try a shorter file."
          );
        }
      } else {
        throw new Error("Invalid AI response structure.");
      }
    }

    // Cleanup
    await safeDelete(tempFilePath);

    return NextResponse.json({ utterances: parsedData });
  } catch (error: any) {
    console.error("Transcription Error:", error);
    if (tempFilePath) await safeDelete(tempFilePath);

    return NextResponse.json(
      { error: error.message || "Transcription failed." },
      { status: 500 }
    );
  }
}
