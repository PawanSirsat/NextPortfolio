"use client";

import React from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
  Code,
  Newspaper,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-10 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">About</h3>
            <p className="text-sm">
              This portfolio builder and home website is developed by Pawan
              Sirsat. It showcases trending and latest projects and articles.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link
                href="https://github.com/your-github"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-6 h-6 hover:text-white transition-colors" />
              </Link>
              <Link
                href="https://linkedin.com/in/your-linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6 hover:text-white transition-colors" />
              </Link>
              <Link
                href="https://twitter.com/your-twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-6 h-6 hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/projects"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Code className="w-4 h-4" />
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Newspaper className="w-4 h-4" />
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/trending"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  Trending
                </Link>
              </li>
              {/* Add more links as needed */}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <p className="text-sm">
              Email: example@example.com
              <br />
              Phone: +1 (123) 456-7890
            </p>
            <Button
              variant="outline"
              className="mt-4 hover:text-white border-gray-600"
            >
              Contact Us
            </Button>
          </div>
        </div>

        <Separator className="my-8 border-gray-700" />

        {/* Copyright Section */}
        <div className="text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Pawan Sirsat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
