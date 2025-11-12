"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckIcon } from "@radix-ui/react-icons";
import ContactModal from "@/components/contact-modal";

export default function Pricing() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("general");

  const handleContactClick = (service: string) => {
    setSelectedService(service);
    setContactModalOpen(true);
  };

  const plans = [
    {
      name: "Daily Learning",
      desc: "Free daily content for AI engineers",
      price: 0,
      isMostPop: true,
      features: [
        "Daily interview questions",
        "Daily knowledge sharing",
        "Practical AI system insights",
        "Community access",
      ],
    },
    {
      name: "Digital Products",
      desc: "Production-ready AI system resources",
      price: 19,
      isMostPop: false,
      features: [
        "RAG Systems eBook ($29)",
        "Interview Question Kit ($19)",
        "LLM Evaluation Templates ($39)",
        "Free Substack access included",
      ],
    },
    {
      name: "Expert Consulting",
      desc: "Custom AI system design & implementation",
      price: 1500,
      isMostPop: false,
      features: [
        "RAG & agentic system design",
        "Production deployment guidance",
        "Team training workshops",
        "Code review & optimization",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="w-full max-w-7xl mx-auto px-4 py-24 md:px-6"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-16 flex flex-col gap-3"
      >
        <h2 className="text-xl font-semibold sm:text-2xl bg-linear-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
          Our Services
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground text-center">
          From daily learning content to expert consulting and digital products.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative ${plan.isMostPop ? "scale-105" : ""}`}
          >
            <Card
              className={`relative h-full ${
                plan.isMostPop ? "border-2 border-primary shadow-xl" : ""
              }`}
            >
              {plan.isMostPop && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-card border-2 border-primary px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <CardContent className="p-6 pt-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.desc}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">
                      {plan.price === 0 ? "Free" : plan.price === 1500 ? "$1,500" : `$${plan.price}`}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      {plan.price === 0 ? "" : plan.price === 1500 ? "/project" : "/item"}
                    </span>
                  </div>
                </div>

                <Separator className="my-6" />

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm"
                    >
                      <CheckIcon className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button
                  className="w-full"
                  variant={plan.isMostPop ? "default" : "outline"}
                  size="lg"
                  onClick={() => {
                    if (plan.price === 0) {
                      handleContactClick("daily-learning");
                    } else if (plan.price === 1500) {
                      handleContactClick("consulting");
                    } else {
                      handleContactClick("digital-products");
                    }
                  }}
                >
                  {plan.price === 0 ? "Join Daily Learning" : plan.price === 1500 ? "Book Consultation" : "View Products"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <ContactModal 
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        service={selectedService}
      />
    </section>
  );
}
