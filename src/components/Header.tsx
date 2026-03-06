import React from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface HeaderProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

export function Header({ onSignIn, onSignUp }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeroModal, setShowHeroModal] = useState(false);

  const closeModal = useCallback(() => setShowHeroModal(false), []);

  useEffect(() => {
    if (!showHeroModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [showHeroModal, closeModal]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b-2 border-[var(--color-gold)]/30 bg-white/95 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center" aria-label="Bible Way — Faithful Living">
              <img
                src="/logo.png"
                alt="bibleway.in"
                className="h-12 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              id="Header.SignUpButton"
              onClick={() => setShowHeroModal(true)}
              aria-label="Join Bible Way"
              size="sm"
              className="shadow-sm h-10 px-5 text-sm"
            >
              Join Bible Way
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <div className="flex flex-col gap-3">
                  <Button onClick={() => { setMobileMenuOpen(false); setShowHeroModal(true); }} className="w-full bg-primary">
                    Join Bible Way
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero Image Modal - rendered via portal to ensure it's above everything */}
      {showHeroModal && createPortal(
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          style={{ zIndex: 99999 }}
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl w-full animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 shadow-lg transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-white" />
            </button>
            <img
              src="https://res.cloudinary.com/dlmiumywi/image/upload/v1772829772/biblewayheroimage_qgkzup.jpg"
              alt="BibleWay - Launching on Easter April 8"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
