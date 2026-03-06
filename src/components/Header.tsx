import React from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface HeaderProps {
  onJoinBibleWay: () => void;
}

export function Header({ onJoinBibleWay }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
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
            onClick={onJoinBibleWay}
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
                <Button onClick={() => { setMobileMenuOpen(false); onJoinBibleWay(); }} className="w-full bg-primary">
                  Join Bible Way
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
