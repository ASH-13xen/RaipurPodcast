"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Mic,
  Send,
  MapPin,
  MessageCircle,
  ArrowRight,
  Phone,
  Youtube,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Loader2,
} from "lucide-react";
import emailjs from "@emailjs/browser";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// --- CONFIGURATION ---
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"general" | "guest">("general");
  const [isSending, setIsSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // --- HANDLER ---
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);

    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setIsSending(false);
          alert("Message sent successfully! We will get back to you soon.");
          formRef.current?.reset();
        },
        (error) => {
          setIsSending(false);
          alert("Failed to send message. Please try again later.");
          console.error(error.text);
        },
      );
  };

  return (
    <div className="min-h-screen bg-[#0a0d20] text-slate-300 pt-16 pb-12 px-4 md:pt-24 relative overflow-hidden font-sans">
      {/* Background Glows - Adjusted for mobile */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pink-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-16 space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight">
            Let's Start a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Conversation
            </span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto px-2">
            Whether you have a story to tell, feedback to share, or just want to
            say hello from Raipur.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT SIDE: Contact Forms */}
          <div className="lg:col-span-7">
            {/* TABS - Stack on mobile, row on desktop */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8 bg-slate-900/50 p-2 rounded-2xl sm:rounded-full w-full sm:w-fit border border-slate-800 backdrop-blur-sm mx-auto lg:mx-0">
              <button
                onClick={() => setActiveTab("general")}
                className={`flex items-center justify-center sm:justify-start gap-2 px-6 py-3 rounded-xl sm:rounded-full text-sm font-bold transition-all ${
                  activeTab === "general"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Mail className="w-4 h-4" />
                General Query
              </button>
              <button
                onClick={() => setActiveTab("guest")}
                className={`flex items-center justify-center sm:justify-start gap-2 px-6 py-3 rounded-xl sm:rounded-full text-sm font-bold transition-all ${
                  activeTab === "guest"
                    ? "bg-pink-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Mic className="w-4 h-4" />
                Be Our Guest
              </button>
            </div>

            {/* FORM CONTAINER */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              {/* Decorative Gradient Line at top */}
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
                  activeTab === "general"
                    ? "from-purple-500 to-indigo-500"
                    : "from-pink-500 to-rose-500"
                }`}
              />

              <AnimatePresence mode="wait">
                {activeTab === "general" ? (
                  <motion.form
                    key="general"
                    ref={formRef}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={sendEmail}
                    className="space-y-4 md:space-y-6"
                  >
                    <input
                      type="hidden"
                      name="form_type"
                      value="General Query"
                    />

                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">
                          Your Name
                        </label>
                        <Input
                          name="user_name"
                          required
                          placeholder="John Doe"
                          className="bg-slate-950/50 border-slate-800 focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">
                          Email Address
                        </label>
                        <Input
                          name="user_email"
                          type="email"
                          required
                          placeholder="john@example.com"
                          className="bg-slate-950/50 border-slate-800 focus:border-purple-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">
                        Subject
                      </label>
                      <Input
                        name="subject"
                        required
                        placeholder="Feedback / Question / Sponsorship"
                        className="bg-slate-950/50 border-slate-800 focus:border-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">
                        Message
                      </label>
                      <Textarea
                        name="message"
                        required
                        placeholder="Type your message here..."
                        className="bg-slate-950/50 border-slate-800 focus:border-purple-500 min-h-[150px]"
                      />
                    </div>
                    <Button
                      disabled={isSending}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-6 text-lg rounded-xl"
                    >
                      {isSending ? (
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      ) : (
                        <>
                          Send Message <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="guest"
                    ref={formRef}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={sendEmail}
                    className="space-y-4 md:space-y-6"
                  >
                    <input
                      type="hidden"
                      name="form_type"
                      value="Guest Application"
                    />

                    <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl mb-6">
                      <p className="text-pink-200 text-xs md:text-sm">
                        <strong>💡 Guest Tip:</strong> We love stories about
                        failure, resilience, and local impact. Tell us what
                        value you bring to the Raipur audience.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">
                          Full Name
                        </label>
                        <Input
                          name="user_name"
                          required
                          placeholder="Your Name"
                          className="bg-slate-950/50 border-slate-800 focus:border-pink-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">
                          Email
                        </label>
                        <Input
                          name="user_email"
                          type="email"
                          required
                          placeholder="Your Email"
                          className="bg-slate-950/50 border-slate-800 focus:border-pink-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">
                        Linkedin / Instagram
                      </label>
                      <Input
                        name="social_link"
                        placeholder="Social Profile Link"
                        className="bg-slate-950/50 border-slate-800 focus:border-pink-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">
                        Proposed Topic
                      </label>
                      <Input
                        name="topic"
                        placeholder="E.g. The Startup Scene in Bhilai"
                        className="bg-slate-950/50 border-slate-800 focus:border-pink-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">
                        Why should we host you?
                      </label>
                      <Textarea
                        name="message"
                        required
                        placeholder="Pitch your story in 2-3 sentences..."
                        className="bg-slate-950/50 border-slate-800 focus:border-pink-500 min-h-[120px]"
                      />
                    </div>
                    <Button
                      disabled={isSending}
                      className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-6 text-lg rounded-xl"
                    >
                      {isSending ? (
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      ) : (
                        <>
                          Submit Application{" "}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT SIDE: Info & Extras */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            {/* Direct Contact Card */}
            <div className="bg-slate-900/30 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Other ways to connect
              </h3>

              <div className="space-y-4">
                {/* 1. CALL US */}
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500 transition-colors group cursor-pointer"
                >
                  <div className="bg-purple-500/10 p-3 rounded-lg text-purple-400 group-hover:text-purple-300 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                      Call Us
                    </p>
                    <p className="text-white font-medium truncate">
                      +91 98765 43210
                    </p>
                  </div>
                </a>

                {/* 2. WHATSAPP */}
                <a
                  href="https://wa.me/8253085278"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-green-500 transition-colors group cursor-pointer"
                >
                  <div className="bg-green-500/10 p-3 rounded-lg text-green-400 group-hover:text-green-300 shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                      WhatsApp
                    </p>
                    <p className="text-white font-medium truncate">
                      Chat with Team
                    </p>
                  </div>
                </a>

                {/* 3. LOCATION */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Civil+Lines+Raipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500 transition-colors group cursor-pointer"
                >
                  <div className="bg-blue-500/10 p-3 rounded-lg text-blue-400 group-hover:text-blue-300 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                      Studio Location
                    </p>
                    <p className="text-white font-medium truncate">
                      Civil Lines, Raipur, CG
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* SOCIAL LINKS ROW */}
            <div className="bg-slate-900/30 p-6 md:p-8 rounded-3xl border border-slate-800">
              <h4 className="text-lg font-bold text-white mb-4">
                Follow us on Socials
              </h4>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="p-3 bg-slate-950 rounded-full border border-slate-800 text-slate-400 hover:text-pink-500 hover:border-pink-500 transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com/@RaipurPodcast"
                  target="_blank"
                  className="p-3 bg-slate-950 rounded-full border border-slate-800 text-slate-400 hover:text-red-500 hover:border-red-500 transition-all"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="p-3 bg-slate-950 rounded-full border border-slate-800 text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  className="p-3 bg-slate-950 rounded-full border border-slate-800 text-slate-400 hover:text-sky-500 hover:border-sky-500 transition-all"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="p-3 bg-slate-950 rounded-full border border-slate-800 text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
