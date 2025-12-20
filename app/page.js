"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Globe, Zap, BarChart3, Users } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div className="bg-white selection:bg-green-100">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/landing/hero.png"
            alt="Futuristic Green City"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-white"></div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="container mx-auto px-6 relative z-10 text-center"
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-8">
            <Leaf className="w-4 h-4 text-green-400" />
            <span className="text-white text-xs font-black uppercase tracking-widest">The Future is Green</span>
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tight leading-[0.9]"
          >
            Discover Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200">
              Impact
            </span>
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 mb-10 font-medium leading-relaxed"
          >
            Track your journey to a sustainable lifestyle. Join thousands of eco-warriors
            mapping their carbon footprint and contributing to global reforestation.
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="bg-green-600 text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-green-500 transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-2 group"
            >
              Start Your Quest
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/aware"
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all"
            >
              Explore Feed
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex gap-12 text-white/80"
        >
          <div className="text-center">
            <div className="text-3xl font-black text-green-400">1.2M+</div>
            <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Trees Planted</div>
          </div>
          <div className="w-[1px] h-10 bg-white/20 my-auto"></div>
          <div className="text-center">
            <div className="text-3xl font-black text-green-400">45K+</div>
            <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Impact Points</div>
          </div>
          <div className="w-[1px] h-10 bg-white/20 my-auto"></div>
          <div className="text-center">
            <div className="text-3xl font-black text-green-400">120+</div>
            <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Global Causes</div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="md:w-1/2"
            >
              <h2 className="text-xs font-black text-green-600 uppercase tracking-widest mb-4">Our Mission</h2>
              <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6 uppercase tracking-tight leading-none">
                Empowering the <br />
                Next Generation of <br />
                <span className="text-green-600">Eco-Warriors</span>
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                At CarbonQuest, we believe data is the key to change. We provide the
                tools you need to monitor, analyze, and reduce your carbon footprint
                while turning environmental action into a rewarding social experience.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 border border-green-100 rounded-2xl bg-green-50/30">
                  <Zap className="w-6 h-6 text-green-600 mb-2" />
                  <div className="font-black text-xs uppercase tracking-widest mb-1">Fast Tracking</div>
                  <div className="text-sm text-neutral-500">Real-time emissions data entry.</div>
                </div>
                <div className="p-4 border border-green-100 rounded-2xl bg-green-50/30">
                  <Users className="w-6 h-6 text-green-600 mb-2" />
                  <div className="font-black text-xs uppercase tracking-widest mb-1">Community</div>
                  <div className="text-sm text-neutral-500">Collaborate with like-minded peers.</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 relative"
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="/landing/community.png"
                  alt="Environmental Community"
                  width={600}
                  height={800}
                  className="w-full object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-green-50 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-black text-xs uppercase tracking-widest text-neutral-400">Global Reach</div>
                  <div className="font-black text-lg text-neutral-900 leading-none">50+ Countries</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Highlighting Section */}
      <section className="py-24 bg-neutral-950 text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="md:w-1/2 text-right"
            >
              <h2 className="text-xs font-black text-green-400 uppercase tracking-widest mb-4">Powerful Tools</h2>
              <h1 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight leading-none">
                Interactive <br />
                <span className="text-green-400">Visualizations</span>
              </h1>
              <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                Go beyond simple numbers. Our stunning visualizations reveal the hidden
                patterns in your consumption, making it effortless to identify and
                eliminate wasteful habits.
              </p>
              <div className="flex justify-end gap-12">
                <div className="text-center">
                  <BarChart3 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="font-black text-xs uppercase tracking-widest text-white/60">Live Analytics</div>
                </div>
                <div className="text-center">
                  <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="font-black text-xs uppercase tracking-widest text-white/60">Smart Goals</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="md:w-1/2"
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.3)] border-4 border-white/10 group">
                <Image
                  src="/landing/tracking.png"
                  alt="Carbon Tracking Analytics"
                  width={600}
                  height={400}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-neutral-900 mb-8 uppercase tracking-tighter leading-none">
              Small Steps, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-900">
                Big Impact.
              </span>
            </h1>
            <p className="max-w-xl mx-auto text-neutral-500 mb-12 text-lg font-medium">
              Start tracking, learning, and reducing your carbon footprint today.
              The planet is waiting for quest-takers like you.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link
                href="/signup"
                className="bg-neutral-900 text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all hover:scale-105"
              >
                Join the Quest
              </Link>
              <Link
                href="/login"
                className="bg-green-100 text-green-700 px-12 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-green-200 transition-all font-black"
              >
                Log In
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Background Accents */}
        <div className="absolute top-0 right-0 -z-10 blur-3xl opacity-20 bg-green-400 w-96 h-96 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 -z-10 blur-3xl opacity-20 bg-emerald-400 w-96 h-96 rounded-full -translate-x-1/2 translate-y-1/2"></div>
      </section>

      <Footer />
    </div>
  );
}
