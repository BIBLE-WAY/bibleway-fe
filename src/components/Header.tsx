import React from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface HeaderProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

export function Header({ onSignIn, onSignUp }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeroModal, setShowHeroModal] = useState(false);

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

      {/* Hero Image Modal */}
      {showHeroModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowHeroModal(false)}>
          <div className="relative max-w-3xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowHeroModal(false)}
              className="absolute -top-3 -right-3 z-10 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
            <img
              src="https://res.cloudinary.com/dlmiumywi/image/upload/v1772829772/biblewayheroimage_qgkzup.jpg"
              alt="BibleWay Hero"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
