"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getCurrentTheme } from "@/utils/themeSwitcher";

function HeroLanding() {
  const [theme, setTheme] = useState(getCurrentTheme()); // Start med det aktuelle tema

  useEffect(() => {
    const updateTheme = () => setTheme(getCurrentTheme());
    window.addEventListener("themeChange", updateTheme); // Lyt til brugerdefineret "themeChange"-event
    return () => window.removeEventListener("themeChange", updateTheme); // Fjern listener ved unmount
  }, []);

  // Definer billeder for begge temaer
  const images = {
    dark: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    light:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  };

  return (
    <div className="relative h-screen">
      <h1 className="hidden">Hero Landing</h1>

      {/* Dynamisk baggrundsbillede */}
      <div className="relative h-full w-full">
        <Image
          src={images[theme]} // Opdater billedet baseret på tema
          alt="Festival Image"
          layout="fill"
          objectFit="cover"
          priority
          className="z-0"
        />
      </div>

      {/* Indhold */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 px-4">
        <div className="flex flex-col items-center space-y-8 text-center mb-32 sm:mb-44">
          <h2 className="font-titan font-extrabold text-4xl sm:text-5xl lg:text-8xl text-white z-20">
            FooFest 2025
          </h2>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 z-20">
            <Link href="/pages/artist">
              <Button
                variant="default"
                className="px-6 py-2 rounded-full border  text-white border-primary hover:bg-transparent transition ease-out duration-200"
              >
                Line-up
              </Button>
            </Link>

            <Link href="/pages/booking">
              <Button
                variant="default"
                className="px-6 py-2 rounded-full border  text-white border-primary hover:bg-transparent transition ease-out duration-200"
              >
                Tickets
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroLanding;
