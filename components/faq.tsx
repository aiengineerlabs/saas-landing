"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function Faq() {
  const accordionItems = [
    {
      title: "Is the daily content really free?",
      content: (
        <div className="text-muted-foreground">
          Yes! Our daily interview questions and knowledge sharing are completely free.
          We believe in democratizing access to high-quality AI engineering education.
        </div>
      ),
    },
    {
      title: "How do I get notified of daily content?",
      content: (
        <div className="text-muted-foreground">
          Join our email list or follow us on LinkedIn. We post daily content consistently
          at the same time each day to help you build a learning habit.
        </div>
      ),
    },
    {
      title: "What's included in consulting services?",
      content: (
        <div className="text-muted-foreground">
          Our consulting covers RAG system design, agentic AI implementation,
          production deployment guidance, and team training workshops. Each project
          is tailored to your specific needs and timeline.
        </div>
      ),
    },
    {
      title: "What's special about your Substack content?",
      content: (
        <div className="text-muted-foreground">
          My &quot;AI Interview Prep&quot; Substack dives deep into the &apos;dark arts&apos; of AI system design
          that textbooks don&apos;t cover. Each post explores real production challenges, like weight
          decay illusions in LLM training and optimization dynamics that actually matter.
        </div>
      ),
    },
    {
      title: "Do you offer refunds for digital products?",
      content: (
        <div className="text-muted-foreground">
          We offer a 30-day money-back guarantee on all digital products. If you&apos;re not
          satisfied with the quality and practical value, we&apos;ll refund your purchase.
        </div>
      ),
    },
  ];

  return (
    <motion.section
      initial={{ y: 20, opacity: 0 }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5, type: "spring", bounce: 0 }}
      className="relative w-full max-w-(--breakpoint-xl) mx-auto px-4 py-28 gap-5 md:px-8 flex flex-col justify-center items-center"
    >
      <div className="flex flex-col gap-3 justify-center items-center">
        <h4 className="text-2xl font-bold sm:text-3xl bg-linear-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
          FAQ
        </h4>
        <p className="max-w-xl text-muted-foreground text-center">
          Common questions about our daily content and services.
        </p>
      </div>
      <div className="flex w-full max-w-lg">
        <Accordion type="multiple" className="w-full">
          {accordionItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="text-muted-foreground"
            >
              <AccordionTrigger className="text-left">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
}
