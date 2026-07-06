"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Mail, MapPin, MessageSquare, Terminal, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/app/actions/contact";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    }
    
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 lg:pt-32 pb-16">
      <section className="container-wide mb-16">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight text-white">
              Let&apos;s <span className="text-gradient">Connect</span>
            </h1>
            <p className="text-lg sm:text-xl text-apyx-text-secondary leading-relaxed">
              Have a question, want to partner with us, or just want to say hi? Drop us a message below.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-24 relative">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-apyx-purple/10 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Contact Form */}
        <ScrollReveal className="relative z-10">
          <form onSubmit={handleSubmit} className="bg-apyx-surface border border-apyx-border rounded-3xl p-8 sm:p-10 space-y-6">
            {success ? (
              <div className="bg-apyx-emerald/10 border border-apyx-emerald/20 rounded-2xl p-8 text-center flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-apyx-emerald mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-apyx-text-secondary">Thanks for reaching out. Our team will get back to you shortly.</p>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setSuccess(false)}
                  className="mt-6 border-apyx-border text-apyx-text-secondary hover:text-white"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <>
                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                    {error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white">Full Name</label>
                  <Input id="name" name="name" required placeholder="John Doe" className="bg-apyx-bg border-apyx-border h-12" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white">Email Address</label>
                  <Input id="email" name="email" required type="email" placeholder="john@example.com" className="bg-apyx-bg border-apyx-border h-12" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-white">Message</label>
                  <Textarea id="message" name="message" required placeholder="How can we help you?" className="bg-apyx-bg border-apyx-border min-h-[150px] resize-none" />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-gradient-brand text-white border-0 h-12 text-base">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Message"}
                </Button>
              </>
            )}
          </form>
        </ScrollReveal>

        {/* Contact Info */}
        <ScrollReveal delay={0.2} className="relative z-10 flex flex-col justify-center space-y-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-apyx-surface border border-apyx-border flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-apyx-purple" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
              <p className="text-apyx-text-secondary mb-2">For general inquiries and partnerships.</p>
              <a href="mailto:hello@apyx.club" className="text-apyx-cyan hover:underline font-mono text-sm">hello@apyx.club</a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-apyx-surface border border-apyx-border flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-apyx-blue" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Discord Community</h3>
              <p className="text-apyx-text-secondary mb-2">Join our active community of student builders.</p>
              <a href="#" className="text-apyx-cyan hover:underline font-mono text-sm">discord.gg/apyx</a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-apyx-surface border border-apyx-border flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-apyx-emerald" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Location</h3>
              <p className="text-apyx-text-secondary">
                We are a student-run organization operating out of the campus innovation hub.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-apyx-border">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <Terminal className="w-4 h-4 text-apyx-text-muted" />
              <span className="text-sm font-medium text-white">Status: Actively accepting new members</span>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
