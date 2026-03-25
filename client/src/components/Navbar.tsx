import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useState } from "react";
import LoginModal from "@/components/LoginModal";
import { useAuth } from "@/contexts/AuthContext";

// Meta Pixel initialization
declare global {
  interface Window {
    fbq: any;
  }
}

const trackWhatsAppClick = (productName: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: productName,
      content_category: 'Stevia Product',
      currency: 'IDR'
    });
  }
};
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Stevia Product');
    window.open('https://wa.me/6281249356066?text=Halo%20Stevia%20Lumajang,%20saya%20ingin%20pesan%20produknya', '_blank');
  };

  // Helper function to handle navigation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    setIsOpen(false);

    // If we are not on the home page, let the browser navigate to "/" first
    if (location !== "/") {
      return;
    }

    // If we are already on home page, prevent default and scroll smoothly
    e.preventDefault();
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Update URL hash without jumping
      window.history.pushState(null, "", hash);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="/images/logo-stevia-lmj.webp" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="font-display font-bold text-xl text-foreground tracking-tight">
              Stevia LMJ
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/#about" onClick={(e) => handleNavClick(e, "#about")} className="text-foreground/80 hover:text-primary transition-colors font-body">Tentang</a>
          <a href="/#benefits" onClick={(e) => handleNavClick(e, "#benefits")} className="text-foreground/80 hover:text-primary transition-colors font-body">Manfaat</a>
          <a href="/#products" onClick={(e) => handleNavClick(e, "#products")} className="text-foreground/80 hover:text-primary transition-colors font-body">Produk</a>
          <a href="/#contact" onClick={(e) => handleNavClick(e, "#contact")} className="text-foreground/80 hover:text-primary transition-colors font-body">Kontak</a>
          <Link href="/artikel" className={`text-foreground/80 hover:text-primary transition-colors font-body ${location.startsWith('/artikel') ? 'text-primary font-bold' : ''}`}>Artikel</Link>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="font-body">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 font-body flex items-center gap-2"
              onClick={() => setIsLoginModalOpen(true)}
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          )}
          
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 font-body" onClick={handleWhatsAppClick}>
            Pesan Sekarang
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-foreground p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          <a href="/#about" onClick={(e) => handleNavClick(e, "#about")} className="text-foreground/80 hover:text-primary py-2 border-b border-border/50">Tentang</a>
          <a href="/#benefits" onClick={(e) => handleNavClick(e, "#benefits")} className="text-foreground/80 hover:text-primary py-2 border-b border-border/50">Manfaat</a>
          <a href="/#products" onClick={(e) => handleNavClick(e, "#products")} className="text-foreground/80 hover:text-primary py-2 border-b border-border/50">Produk</a>
          <a href="/#contact" onClick={(e) => handleNavClick(e, "#contact")} className="text-foreground/80 hover:text-primary py-2 border-b border-border/50">Kontak</a>
          <Link href="/artikel" onClick={() => setIsOpen(false)} className={`text-foreground/80 hover:text-primary py-2 border-b border-border/50 ${location.startsWith('/artikel') ? 'text-primary font-bold' : ''}`}>Artikel</Link>
          
          {isAuthenticated ? (
            <Link 
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="text-foreground/80 hover:text-primary py-2 border-b border-border/50"
            >
              Dashboard
            </Link>
          ) : null}
          
          {isAuthenticated ? (
            <Button
              variant="outline"
              className="w-full mt-2 flex items-center gap-2"
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-full mt-2 flex items-center gap-2"
              onClick={() => {
                setIsOpen(false);
                setIsLoginModalOpen(true);
              }}
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          )}
          
          <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full mt-2" onClick={() => {
            trackWhatsAppClick('Stevia Product');
            window.open('https://wa.me/6281249356066?text=Halo%20Stevia%20Lumajang,%20saya%20ingin%20pesan%20produknya', '_blank');
          }}>
            Pesan Sekarang
          </Button>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </nav>
  );
}
