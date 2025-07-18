"use client";

import React, { useState, useContext } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, Twitter, Send, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useSidebar } from "@/components/ui/sidebar";
import { UserDetailContext } from "@/context/UserDetailContext";
import Image from "next/image";

function Help() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toggleSidebar } = useSidebar();
  const { userDetails } = useContext(UserDetailContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFeedback("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay },
    },
  });

  return (
    <div
      className="flex flex-1 flex-col items-center min-h-screen px-4 py-8 md:p-16 lg:p-24 relative"
      style={{
        background: "linear-gradient(135deg, #000, #0a0a0a)",
        color: "#e5e5e5",
      }}
    >
      {/* Sidebar toggle via avatar */}
      <div className="absolute top-4 right-4">
        {userDetails?.picture && (
          <Image
            onClick={toggleSidebar}
            src={userDetails.picture}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full cursor-pointer hover:scale-105 transition"
          />
        )}
      </div>

      <motion.div
        className="flex flex-col items-center w-full max-w-6xl space-y-8 z-10"
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <motion.div className="text-center space-y-2" variants={fadeUp(0)}>
          <HelpCircle className="w-12 h-12 mx-auto text-green-400 animate-pulse" />
          <h2 className="font-extrabold text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-gray-300">
            Help & Support
          </h2>
          <p className="max-w-2xl text-base md:text-lg text-gray-400 mx-auto">
            Have a question? Need help? You’re at the right place — explore answers, reach out, or send feedback.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-6"
          variants={fadeUp(0.1)}
        >
          {/* FAQ Section */}
          <Card className="bg-gradient-to-br from-black via-gray-900 to-gray-800 border border-gray-700 rounded-xl shadow-md hover:shadow-green-600/30 hover:scale-[1.01] transition">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-green-300">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {[
                  {
                    q: "How do I upgrade my plan?",
                    a: "Go to the Pricing page and pick a plan that fits your needs. Your tokens are updated immediately.",
                  },
                  {
                    q: "What if I run out of tokens?",
                    a: "You can still view your workspace, but you won’t be able to create new content until you upgrade or buy more tokens.",
                  },
                  {
                    q: "Can I delete my account?",
                    a: "Yes. In Settings → Danger Zone you can delete your account. This cannot be undone.",
                  },
                  {
                    q: "How can I contact support?",
                    a: `Use the section below or email us directly.`,
                  },
                ].map((item, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-gray-300 hover:text-green-300 transition-colors">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400">
                      {item.a}{" "}
                      {idx === 3 && (
                        <a
                          href="mailto:support@boltnew.com"
                          className="text-green-400 underline hover:text-green-300"
                        >
                          support@boltnew.com
                        </a>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="bg-gradient-to-br from-black via-gray-900 to-gray-800 border border-gray-700 rounded-xl shadow-md hover:shadow-green-600/30 hover:scale-[1.01] transition">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-green-300">
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-400">Still need help? Reach out directly:</p>
              <p className="flex items-center gap-2">
                <Mail className="text-green-400" />{" "}
                <a
                  href="mailto:support@boltnew.com"
                  className="text-green-400 underline hover:text-green-300"
                >
                  habbujayanth@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Twitter className="text-green-400" />{" "}
                <a
                  href="https://x.com/habbujayanth"
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-400 underline hover:text-green-300"
                >
                  @jayantHabbu
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Feedback Section */}
          <Card className="bg-gradient-to-br from-black via-gray-900 to-gray-800 border border-gray-700 rounded-xl shadow-md hover:shadow-green-600/30 hover:scale-[1.01] transition md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-green-300">
                Send Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                  placeholder="We’d love to hear your thoughts…"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="bg-black text-gray-200 border border-gray-700"
                />
                <Button
                  type="submit"
                  className="flex items-center gap-2 bg-gradient-to-r from-green-700 to-green-800 hover:from-green-600 hover:to-green-700 transition"
                >
                  <Send className="w-4 h-4 text-gray-200" /> Submit
                </Button>
                {submitted && (
                  <motion.p
                    className="text-green-400 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    ✅ Thanks for your feedback!
                  </motion.p>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Help;
