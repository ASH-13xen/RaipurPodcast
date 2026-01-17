/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  CheckCircle2,
  ShieldCheck,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input"; // Assuming you have this
import { Button } from "@/components/ui/button"; // Assuming you have this

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API Call (Replace with your actual logic)
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      // Optional: Close automatically after success
      // setTimeout(onClose, 2000);
    }, 1500);
  };

  // Reset status when modal closes so it's fresh next time
  React.useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setStatus("idle"), 300);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* MODAL CONTENT */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking inside
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-[#0a0d20] shadow-2xl shadow-purple-900/20"
            >
              {/* Decorative Glows */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 p-8 flex flex-col items-center text-center">
                {status === "success" ? (
                  /* --- SUCCESS STATE --- */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 space-y-4"
                  >
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20 text-green-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        You're on the list!
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Thanks for joining. Keep an eye on your inbox for the
                        next update.
                      </p>
                    </div>
                    <Button
                      onClick={onClose}
                      className="mt-4 bg-slate-800 text-white hover:bg-slate-700 w-full rounded-xl"
                    >
                      Close
                    </Button>
                  </motion.div>
                ) : (
                  /* --- FORM STATE --- */
                  <>
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/30 text-purple-300">
                      <Mail className="w-7 h-7" />
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Never Miss an Episode
                    </h2>

                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                      Get notified about new guests and behind-the-scenes
                      stories. Straight to your inbox.
                    </p>

                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                      <div className="space-y-2 text-left">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="h-12 bg-slate-900/50 border-slate-800 focus:border-purple-500 text-base"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-900/20 transition-all"
                      >
                        {status === "loading" ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <span className="flex items-center gap-2">
                            Subscribe Now <ArrowRight className="w-4 h-4" />
                          </span>
                        )}
                      </Button>
                    </form>

                    {/* Anti-Spam Notice */}
                    <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800/50">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                      <span>No spam allowed. Unsubscribe anytime.</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
