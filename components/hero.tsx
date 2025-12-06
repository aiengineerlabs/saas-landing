"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import Link from "next/link";
import ContactModal from "@/components/contact-modal";

const ThreeDBackground = dynamic(() => import("@/components/3d-background"), {
  ssr: false,
});

export default function Hero() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="relative justify-center items-center overflow-hidden">
      <ThreeDBackground />
      <section className="relative max-w-(--breakpoint-xl) mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{ duration: 0.6, type: "spring", bounce: 0 }}
          className="flex flex-col justify-center items-center space-y-5 max-w-4xl mx-auto text-center"
        >
          <span className="w-fit h-full text-sm bg-card px-2 py-1 border border-border rounded-full">
            AI Engineer Labs LLC
          </span>
          <h1 className="text-4xl font-medium tracking-tighter mx-auto md:text-6xl text-pretty bg-linear-to-b from-sky-800 dark:from-sky-100 to-foreground dark:to-foreground bg-clip-text text-transparent">
            Daily AI Interview Questions & Knowledge Sharing
          </h1>
          <p className="max-w-2xl text-lg mx-auto text-muted-foreground text-balance">
            Turning AI research into real-world engineering systems. Join our daily learning journey through interview prep and cutting-edge AI knowledge.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0"
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(91, 168, 255, 0.3)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button 
                className="shadow-lg relative overflow-hidden"
                onClick={() => setContactModalOpen(true)}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Join Our Daily Learning</span>
              </Button>
            </motion.div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">About Hao</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Hao Hoang - Founder</DialogTitle>
                  <DialogDescription>
                    AI Engineer from Albuquerque, NM. Deep-diving into LLM system design,
                    optimization techniques, and production ML engineering. Author of &quot;AI Interview Prep&quot;
                    Substack, sharing the dark arts of AI system design that actually work in production.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href="https://www.linkedin.com/in/hoang-van-hao/" target="_blank">
                      LinkedIn
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="https://aiinterviewprep.substack.com/" target="_blank">
                      Substack
                    </Link>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.div>
      </section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, type: "spring", bounce: 0 }}
        className="w-full h-full absolute -top-32 flex justify-end items-center pointer-events-none z-0"
      >
        <div className="w-3/4 flex justify-center items-center">
          <motion.div 
            className="w-12 h-[600px] bg-light blur-[70px] rounded-3xl max-sm:rotate-15 sm:rotate-35 will-change-transform"
            animate={{
              rotate: [35, 40, 35],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
      
      <ContactModal 
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        service="daily-learning"
      />
    </div>
  );
}
