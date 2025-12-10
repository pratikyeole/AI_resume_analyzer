import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Glassy Background */}
      <div className="backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-blue-300">
            Resume Analyzer
          </h1>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-10 text-gray-100 font-medium">
            {["Home", "Features", "How It Works", "Contact"].map((item, idx) => (
              <li
                key={idx}
                className="cursor-pointer hover:text-white hover:drop-shadow transition"
              >
                {item}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-3xl focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {open && (
          <div className="md:hidden bg-white/10 backdrop-blur-xl border-t border-white/20 py-4 px-6">
            <ul className="flex flex-col gap-4 text-gray-100 text-lg">
              {["Home", "Features", "How It Works", "Contact"].map((item, idx) => (
                <li
                  key={idx}
                  className="cursor-pointer hover:text-white hover:drop-shadow transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
