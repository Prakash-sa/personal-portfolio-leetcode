import { motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  Mail,
  Github,
  Linkedin,
  Puzzle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import profileData from "@/data/profile.json";
import profilePic from "@/data/profile.jpg";

export default function Hero() {
  const scrollToNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Avatar placeholder */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-primary to-blue-500 p-1"
          >
            <div className="w-full h-full rounded-full bg-background overflow-hidden">
              <img
                src={profilePic}
                alt={profileData.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Name and title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            <span className="gradient-text">{profileData.name}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6"
          >
            {profileData.subtitle}
          </motion.h2>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            {profileData.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button size="lg" className="hover-lift group">
              <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Download Resume
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover-lift"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex justify-center space-x-6 mb-12"
          >
            {profileData.social.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors hover-scale"
                aria-label={social.platform}
              >
                {social.icon === "github" && <Github className="w-6 h-6" />}
                {social.icon === "linkedin" && <Linkedin className="w-6 h-6" />}
                {social.icon === "leetcode" && <Puzzle className="w-6 h-6" />}
              </a>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            onClick={scrollToNext}
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors animate-bounce"
            aria-label="Scroll to next section"
          >
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
