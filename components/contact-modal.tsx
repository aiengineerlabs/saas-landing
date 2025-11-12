"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Mail, MessageSquare, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { trackContactAttempt } from "@/lib/analytics";
import emailjs from "@emailjs/browser";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: string;
}

export default function ContactModal({ isOpen, onClose, service = "general" }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: service,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // EmailJS Configuration
  // TODO: Replace these with your EmailJS credentials
  // Get them from https://dashboard.emailjs.com/admin/integration
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "your_service_id";
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "your_template_id";
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "your_public_key";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear error on input change
  };

  const handleServiceChange = (value: string) => {
    setFormData({ ...formData, service: value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Please enter your name");
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.message.trim()) {
      setError("Please enter a message");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Check if EmailJS is configured
    if (EMAILJS_SERVICE_ID === "your_service_id" || 
        EMAILJS_TEMPLATE_ID === "your_template_id" || 
        EMAILJS_PUBLIC_KEY === "your_public_key") {
      setError("Email service not configured. Please email us directly at hao.hoang.ai@gmail.com");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Track the contact attempt
      trackContactAttempt({
        name: formData.name,
        email: formData.email,
        service: formData.service,
        message: formData.message
      }, 'form_submit');

      // Send email via EmailJS
      // Variable names must match your EmailJS template exactly
      const templateParams = {
        name: formData.name,              // For "From Name" field
        email: formData.email,             // For "Reply To" field       // For template content
        service: formData.service,
        message: formData.message,
      };
      console.log(templateParams);
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setIsSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          service: service,
          message: "",
        });
        setIsSuccess(false);
        onClose();
      }, 2000);

    } catch (err: unknown) {
      console.error("EmailJS error:", err);
      
      // Provide helpful error message
      let errorMessage = "Failed to send message. ";
      if (err && typeof err === 'object' && 'text' in err) {
        errorMessage += (err as { text: string }).text;
      } else {
        errorMessage += "Please try again or email us directly at hao.hoang.ai@gmail.com";
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Update this with your actual Calendly link when you have one
  const calendlyLink = "https://calendly.com/signup";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Get in Touch</DialogTitle>
          <DialogDescription>
            Send us a message and we&apos;ll get back to you within 24 hours
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
              <p className="text-sm text-muted-foreground">
                We&apos;ve received your message and will respond soon.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="service">Service Interest</Label>
            <Select value={formData.service} onValueChange={handleServiceChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="daily-learning">Daily Learning Content</SelectItem>
                <SelectItem value="digital-products">Digital Products</SelectItem>
                <SelectItem value="consulting">Expert Consulting</SelectItem>
                <SelectItem value="workshop">Team Workshop</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your project or question..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
            />
          </div>
        </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            <DialogFooter className="flex-col sm:flex-col gap-2">
              <div className="flex flex-col gap-2 w-full">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
                
                {formData.service === "consulting" || formData.service === "workshop" ? (
                  <Button asChild variant="outline" className="w-full" type="button">
                    <Link href={calendlyLink} target="_blank">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule a Call
                    </Link>
                  </Button>
                ) : null}

                <Button asChild variant="outline" className="w-full" type="button">
                  <Link href="https://aiinterviewprep.substack.com/" target="_blank">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Subscribe on Substack
                  </Link>
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground text-center mt-2">
                We typically respond within 24 hours. For consulting inquiries, 
                you can also schedule a call directly.
              </p>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
