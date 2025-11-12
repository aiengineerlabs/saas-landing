"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
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

export default function Hero() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="relative justify-center items-center">
      <section className="max-w-(--breakpoint-xl) mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center">
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
            className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0"
          >
            <Button 
              className="shadow-lg"
              onClick={() => setContactModalOpen(true)}
            >
              Join Our Daily Learning
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">About Hao</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Hao Hoang - Founder</DialogTitle>
                  <DialogDescription>
                    AI Engineer from Albuquerque, NM. Deep-diving into LLM system design,
                    optimization techniques, and production ML engineering. Author of "AI Interview Prep"
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
        className="w-full h-full absolute -top-32 flex justify-end items-center pointer-events-none "
      >
        <div className="w-3/4 flex justify-center items-center">
          <div className="w-12 h-[600px] bg-light blur-[70px] rounded-3xl max-sm:rotate-15 sm:rotate-35 will-change-transform"></div>
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
