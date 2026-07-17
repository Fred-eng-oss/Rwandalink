"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  content: string;
  rating: number;
  image: string | null;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data.filter((t: Testimonial) => t.content) : [];
        setTestimonials(list);
      })
      .catch(() => {});
  }, []);

  const next = useCallback(() => {
    if (testimonials.length === 0) return;
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    if (testimonials.length === 0) return;
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, testimonials.length]);

  if (testimonials.length === 0) return null;

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
  };

  const testimonial = testimonials[current];
  const initials = testimonial.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-amber-500">Clients Say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Real feedback from the students and businesses we&apos;ve had the
            privilege of serving.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
            <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Quote className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="relative bg-gray-50 rounded-3xl p-8 sm:p-12 min-h-[320px] flex items-center border border-gray-100">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
                className="w-full"
              >
                <div className="text-center">
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-8 italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  <div className="flex items-center justify-center gap-4">
                    {testimonial.image ? (
                      <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-800 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                        {initials}
                      </div>
                    )}
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">
                        {testimonial.role}{testimonial.company ? ` at ${testimonial.company}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {testimonials.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-800 hover:shadow-xl transition-all duration-300 border border-gray-100 hidden sm:flex"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-800 hover:shadow-xl transition-all duration-300 border border-gray-100 hidden sm:flex"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setDirection(index > current ? 1 : -1); setCurrent(index); }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === current ? "bg-amber-500 w-8" : "bg-gray-400 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
