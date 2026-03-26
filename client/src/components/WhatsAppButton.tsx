import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

// Meta Pixel initialization
declare global {
  interface Window {
    fbq: any;
  }
}

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppButton({
  phoneNumber = "6281249356066",
  message = "Halo Stevia Lumajang, saya ingin bertanya tentang produk Anda"
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after a short delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    // Track with Meta Pixel - InitiateCheckout for all WhatsApp clicks
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'WhatsApp Floating Button',
        content_category: 'Customer Support',
        currency: 'IDR'
      });
    }
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle size={28} className="animate-pulse group-hover:animate-none" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        Chat via WhatsApp
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>

      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"></span>
    </button>
  );
}
