"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/layout/footer";
import BottomNavbar from "@/components/layout/BottomNavbar";
import Navbar from "./components/navbar";
import CategoriesBar from "./components/CategoriesBar";

type Category = "For you" | "Tech" | "Pro" | "Creative";

type Props = {
  children: React.ReactNode;
};

type GradientConfig = {
  color: string; // RGB values
  positionX: string; // X position for radial gradient
  positionY: string; // Y position for radial gradient
};

const Layout = ({ children }: Props) => {
  const isProfilePage = false;
  const [activeCategory, setActiveCategory] = useState<Category>("For you");

  const gradientConfigs: Record<Category, GradientConfig> = {
    "For you": {
      color: "139, 92, 246", // Violet
      positionX: "20%", // Shifted left
      positionY: "0%",
    },
    Tech: {
      color: "96, 165, 250", // Blue
      positionX: "40%", // Slightly right of left
      positionY: "10%",
    },
    Pro: {
      color: "250, 204, 21", // Yellow
      positionX: "60%", // Center-right
      positionY: "0%",
    },
    Creative: {
      color: "45, 212, 191", // Teal
      positionX: "80%", // Far right
      positionY: "5%",
    },
  };

  const activeGradient = gradientConfigs[activeCategory];

  return (
    <motion.div
      className="flex flex-col min-h-screen "
      animate={{
        backgroundImage: `radial-gradient(ellipse 68% 15% at ${activeGradient.positionX} ${activeGradient.positionY}, rgba(${activeGradient.color}, 0.2), transparent 60%), linear-gradient(to bottom, rgba(${activeGradient.color}, 0.1), #111827)`,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
      <CategoriesBar
        onCategoryChange={setActiveCategory}
        activeCategory={activeCategory}
      />
      <div className="flex-1 py-8 px-6 sm:px-12 pt-28">{children}</div>
      <Footer />
      {!isProfilePage && <BottomNavbar />}
    </motion.div>
  );
};

export default Layout;
