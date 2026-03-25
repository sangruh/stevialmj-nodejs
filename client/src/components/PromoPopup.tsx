import { useState, useEffect } from "react";
import { X, Gift, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Meta Pixel initialization
declare global {
  interface Window {
    fbq: any;
  }
}

const trackPromoClick = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: 'Promo Discount 10%',
      content_category: 'Promo',
      currency: 'IDR'
    });
  }
};

interface PromoPopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PromoPopup({ isOpen, onOpenChange }: PromoPopupProps) {
  const [step, setStep] = useState<"form" | "code">("form");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  // Removed automatic useEffect trigger

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit this data to a backend
    localStorage.setItem("promo_claimed", "true");
    setStep("code");
  };

  const copyCode = () => {
    navigator.clipboard.writeText("2026SEHATMANIS");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-none shadow-2xl">
        <DialogHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
            <Gift className="w-8 h-8" />
          </div>
          <DialogTitle className="text-2xl font-display font-bold text-foreground">
            {step === "form" ? "Diskon Spesial 10%!" : "Selamat! Ini Kode Promo Anda"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-base">
            {step === "form" 
              ? "Khusus untuk pembelian pertama Anda. Isi data diri singkat di bawah ini untuk mendapatkan kode promo eksklusif."
              : "Gunakan kode ini saat checkout melalui WhatsApp untuk mendapatkan potongan harga 10%."}
          </DialogDescription>
        </DialogHeader>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input 
                id="name" 
                required 
                placeholder="Contoh: Budi Santoso"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor WhatsApp</Label>
              <Input 
                id="phone" 
                required 
                type="tel"
                placeholder="Contoh: 08123456789"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg rounded-xl mt-2">
              Ambil Diskon Saya
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              *Promo berlaku untuk pelanggan baru
            </p>
          </form>
        ) : (
          <div className="space-y-6 mt-4">
            <div className="bg-secondary/10 border-2 border-dashed border-primary/30 rounded-xl p-6 text-center relative group">
              <p className="text-sm text-muted-foreground mb-2">Kode Promo:</p>
              <p className="text-3xl font-mono font-bold text-primary tracking-wider">2026SEHATMANIS</p>
              <Button 
                size="sm" 
                variant="ghost" 
                className="absolute top-2 right-2 text-muted-foreground hover:text-primary"
                onClick={copyCode}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg rounded-xl"
              onClick={() => {
                trackPromoClick();
                const message = `Halo Stevia Lumajang, saya mau klaim promo kode: 2026SEHATMANIS.%0A%0ANama: ${formData.name}%0ANo HP: ${formData.phone}`;
                window.open(`https://wa.me/6281249356066?text=${message}`, '_blank');
                onOpenChange(false);
              }}
            >
              Gunakan Sekarang via WhatsApp
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
