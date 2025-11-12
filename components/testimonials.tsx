"use client";
import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "AI Engineer at Meta",
      avatar: "https://i.pravatar.cc/150?img=1",
      content:
        "The daily interview questions from AI Engineer Labs have been invaluable for my FAANG interviews. The practical system design questions really helped me land my dream job.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "ML Engineer at Google",
      avatar: "https://i.pravatar.cc/150?img=3",
      content:
        "Hao's deep dives into LLM optimization like weight decay illusions completely changed how I think about training dynamics. His Substack posts explain the 'dark arts' that actually work in production systems.",
      rating: 5,
    },
    {
      name: "David Kim",
      role: "CTO at AI Startup",
      avatar: "https://i.pravatar.cc/150?img=5",
      content:
        "The consulting session with Hao transformed our RAG system from prototype to production-ready. We went from 70% accuracy to 95% in just two weeks.",
      rating: 5,
    },
    {
      name: "Lisa Wong",
      role: "Senior AI Engineer at OpenAI",
      avatar: "https://i.pravatar.cc/150?img=15",
      content:
        "Hao's LLM system design interviews are next-level. Questions about 500B parameter model training with cosine schedules and weight decay dynamics prepared me perfectly for FAANG interviews.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "AI Research Engineer",
      avatar: "https://i.pravatar.cc/150?img=17",
      content:
        "Following the daily content has kept me updated on cutting-edge AI developments while staying grounded in practical engineering principles.",
      rating: 5,
    },
    {
      name: "Sarah Patel",
      role: "Engineering Manager at Anthropic",
      avatar: "https://i.pravatar.cc/150?img=19",
      content:
        "The workshop on building production RAG systems was exactly what my team needed. We implemented the learnings immediately and saw measurable improvements.",
      rating: 5,
    },
  ];

  const StarIcon = () => (
    <svg
      className="w-4 h-4 text-yellow-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <section id="testimonials" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20 flex flex-col gap-3"
        >
          <h2 className="text-xl font-semibold sm:text-2xl bg-linear-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
            Trusted by AI Engineers
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground text-center">
            Join the growing community of AI engineers learning from practical insights.
          </p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              className="break-inside-avoid mb-8"
            >
              <div className="p-6 rounded-xl bg-card border border-border transition-colors duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-sm font-medium border border-primary/20">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
