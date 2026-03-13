import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-accent/20 pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/images/logo-stevia-lmj.webp" alt="Logo" className="w-8 h-8 object-contain" loading="lazy" />
              <span className="font-display font-bold text-xl text-foreground tracking-tight">
                Stevia LMJ
              </span>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed max-w-xs">
              Pemanis alami Stevia dari Lumajang. Solusi hidup sehat tanpa rasa bersalah. 100% Alami, 0 Kalori.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-foreground">Navigasi</h3>
            <ul className="space-y-3">
              <li>
                <a href="/#about" className="text-muted-foreground hover:text-primary transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="/#benefits" className="text-muted-foreground hover:text-primary transition-colors">
                  Manfaat Stevia
                </a>
              </li>
              <li>
                <a href="/#products" className="text-muted-foreground hover:text-primary transition-colors">
                  Produk & Harga
                </a>
              </li>
              <li>
                <a href="/#faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-foreground">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>Lumajang, Jawa Timur, Indonesia</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+62 812-4935-6066</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>sangruhdev@gmail.com</span>
              </li>
            </ul>
            
            {/* Google Maps Embed */}
            <div className="mt-6 rounded-xl overflow-hidden shadow-sm border border-border h-48 w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.5547165437956!2d113.23612279999999!3d-8.1467295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd6674f8e21c6cb%3A0xeff0d5f2602e4738!2sPemanis%20Alami%20Stevia%20Lumajang!5e0!3m2!1sen!2ssg!4v1767221124893!5m2!1sen!2ssg" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Stevia Lumajang"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground text-sm font-body">
            &copy; {new Date().getFullYear()} Stevia LMJ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
