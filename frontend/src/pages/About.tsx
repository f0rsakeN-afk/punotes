import React from "react";
import { motion } from "motion/react";
import Members from "@/components/Members";
import Mission from "@/components/Mission";
import Contact from "@/components/Contact";
import AboutQuestions from "@/components/AboutQuestions";
import { SparklesCore } from "@/components/ui/sparkles";
import SEO from "@/components/SEO";

const About: React.FC = () => {
  return (
    <>
      <SEO
        title="About PU Notes - Engineering Study Resources"
        description="Learn about PU Notes, your comprehensive resource for engineering study materials at Purbanchal University"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-background to-secondary/10"
      >
        <div className="container mx-auto max-w-7xl py-16 px-4 space-y-20">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 relative"
          >
            <SparklesCore
              background="transparent"
              minSize={0.5}
              maxSize={1.2}
              particleDensity={300}
              className=" absolute w-full h-full inset-0"
              particleColor="#FFFFFF"
            />
            <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(500px_250px_at_top,transparent_80%,white)]"></div>
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              About PU Notes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your comprehensive resource for engineering study materials at
              Purbanchal University
            </p>
          </motion.section>

          {/* Mission Section */}
          <Mission />

          {/* Team Section */}
          <Members />

          {/* Accordion */}
          <AboutQuestions />

          {/* Contact Section */}
          <Contact />
        </div>
      </motion.div>
    </>
  );
};

export default About;
