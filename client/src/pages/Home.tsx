import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Leaf, Heart, ShieldCheck, ArrowRight, Play, ZoomIn } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Lightbox from "@/components/Lightbox";
import PromoPopup from "@/components/PromoPopup";
import HallOfFame from "@/components/HallOfFame";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState } from "react";

// Meta Pixel initialization
declare global {
  interface Window {
    fbq: any;
  }
}

export default function Home() {
  const [location] = useLocation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [promoPopupOpen, setPromoPopupOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Meta Pixel Event Helper
  const trackEvent = (eventName: string, params?: any) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, params);
    }
  };

  const handleWhatsAppClick = (productName: string, price?: string) => {
    trackEvent('InitiateCheckout', {
      content_name: productName,
      content_category: 'Stevia Product',
      value: price ? parseFloat(price.replace(/[^0-9]/g, '')) / 1000 : undefined,
      currency: 'IDR',
      content_ids: [productName.toLowerCase().replace(/\s+/g, '-')]
    });
  };

  const galleryImages = [
    "/images/gallery/activity-1.webp",
    "/images/gallery/activity-2.webp",
    "/images/gallery/activity-3.webp",
    "/images/gallery/activity-4.webp",
    "/images/gallery/activity-5.webp"
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    // Check if there is a hash in the URL
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      <SEOHead 
        title="Stevia LMJ - Pemanis Alami Lumajang"
        description="Nikmati manisnya hidup sehat tanpa rasa bersalah dengan Stevia Lumajang. 100% Alami, 0 Kalori, dan Aman untuk Diabetes. Solusi tepat pengganti gula pasir. Coba sekarang!"
        url="https://stevialmj.my.id/"
      />
      <PromoPopup isOpen={promoPopupOpen} onOpenChange={setPromoPopupOpen} />
      <WhatsAppButton message="Halo Stevia Lumajang, saya ingin tahu lebih lanjut tentang produk pemanis alami Stevia. Bisa bantu saya?" />
      <Lightbox 
        images={galleryImages} 
        initialIndex={currentImageIndex} 
        isOpen={lightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
      />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero-banner.webp" 
              alt="Stevia Leaves Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-in slide-in-from-left-10 duration-700 fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 text-primary-foreground font-medium text-sm border border-secondary">
                <Leaf size={16} className="text-primary" />
                <span className="text-primary">100% Pemanis Alami</span>
              </div>
              
              <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight">
                Stevia Lumajang <br/>
                <span className="text-primary">Manis Alami Tanpa Rasa Bersalah</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Nikmati manisnya hidup sehat dengan Stevia alami dari Lumajang. 
                Nol kalori, aman untuk diabetes, dan rasa yang tetap nikmat.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-lg shadow-lg hover:shadow-xl transition-all" onClick={() => {
                  handleWhatsAppClick('Stevia Product', 'Rp 25.000');
                  window.open('https://wa.me/6281249356066?text=Halo%20Stevia%20Lumajang,%20saya%20ingin%20pesan%20produknya', '_blank');
                }}>
                  Beli Sekarang
                </Button>
                <Link href="/artikel">
                  <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5 rounded-full px-8 h-12 text-lg">
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Hero Image/Product Placeholder */}
            <div className="hidden md:flex justify-center items-center animate-in slide-in-from-right-10 duration-1000 fade-in delay-200">
              <div className="relative">
                <div className="absolute -inset-4 bg-secondary/30 rounded-full blur-3xl"></div>
                <img 
                  src="/images/hero-stevia-lmj.webp" 
                  alt="Sweet No Worries Product" 
                  className="relative w-80 h-80 md:w-96 md:h-96 object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500 rounded-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-24 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-primary font-medium text-sm border border-primary/20">
                <ShieldCheck size={16} className="text-primary" />
                <span className="text-primary">Mengapa Stevia LMJ?</span>
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">Kebaikan Alami di Setiap Tetes</h2>
              <p className="text-muted-foreground text-lg">Solusi tepat untuk Anda yang ingin hidup lebih sehat tanpa mengorbankan rasa manis.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 space-y-4 text-center">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                    <Leaf size={32} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground">100% Alami</h3>
                  <p className="text-muted-foreground">
                    Diekstrak langsung dari daun Stevia Rebaudiana pilihan tanpa campuran bahan kimia berbahaya.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 space-y-4 text-center">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                    <ShieldCheck size={32} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground">Aman untuk Diabetes</h3>
                  <p className="text-muted-foreground">
                    Tidak memicu lonjakan gula darah (indeks glikemik 0), sehingga aman dikonsumsi penderita diabetes.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 space-y-4 text-center">
                  <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
                    <Heart size={32} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground">Nol Kalori</h3>
                  <p className="text-muted-foreground">
                    Bantu jaga berat badan ideal dan cegah obesitas. Manisnya dapat, sehatnya juga dapat.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 text-primary-foreground font-medium text-sm border border-secondary">
                  <Heart size={16} className="text-primary" />
                  <span className="text-primary">Tentang Kami</span>
                </div>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                  Dedikasi untuk Kesehatan Keluarga Indonesia
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Stevia LMJ lahir dari kepedulian kami terhadap meningkatnya kasus diabetes dan obesitas di Indonesia. Kami percaya bahwa hidup sehat tidak harus mengorbankan kenikmatan rasa.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Berbasis di Lumajang, Jawa Timur, kami menghadirkan pemanis alami stevia berkualitas tinggi yang diproses secara higienis. Produk kami diformulasikan khusus agar memiliki rasa manis yang pas tanpa aftertaste pahit, sehingga cocok untuk segala jenis minuman dan makanan.
                </p>
                <div className="pt-4 grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-bold text-2xl text-primary">100%</h4>
                    <p className="text-sm text-muted-foreground">Bahan Alami</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-2xl text-primary">0</h4>
                    <p className="text-sm text-muted-foreground">Kalori & Gula</p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 relative">
                <div className="absolute -inset-4 bg-secondary/20 rounded-3xl transform rotate-3"></div>
                <img 
                  src="/images/hero-stevia-lmj.webp" 
                  alt="Tentang Stevia LMJ" 
                  className="relative rounded-2xl shadow-lg w-full object-cover aspect-square"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">Apa Kata Mereka?</h2>
              <p className="text-muted-foreground text-lg">Pengalaman nyata dari pelanggan setia Stevia LMJ.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <Card className="border-none shadow-sm bg-white p-6">
              <CardContent className="p-0 space-y-4">
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "Awalnya ragu karena biasanya stevia ada rasa pahitnya. Tapi Stevia LMJ ini beda, manisnya pas dan gak ada aftertaste pahit sama sekali. Cocok banget buat kopi pagi saya!"
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      BU
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">Budi Utomo</p>
                      <p className="text-xs text-muted-foreground">Karyawan Swasta</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 2 */}
              <Card className="border-none shadow-sm bg-white p-6">
                <CardContent className="p-0 space-y-4">
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "Sangat membantu program diet saya. Berat badan turun 3kg dalam sebulan setelah ganti gula pasir ke Stevia LMJ. Rasanya enak dan praktis dibawa kemana-mana."
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      SR
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">Sari Rahmawati</p>
                      <p className="text-xs text-muted-foreground">Ibu Rumah Tangga</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 3 */}
              <Card className="border-none shadow-sm bg-white p-6">
                <CardContent className="p-0 space-y-4">
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "Sebagai penderita diabetes, saya harus hati-hati pilih pemanis. Dokter menyarankan stevia, dan saya cocok banget sama produk ini. Gula darah tetap stabil."
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      AH
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">Ahmad Hidayat</p>
                      <p className="text-xs text-muted-foreground">Pensiunan</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 text-primary-foreground font-medium text-sm border border-secondary">
                <Play size={16} className="text-primary" />
                <span className="text-primary">Kegiatan Kami</span>
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">Stevia LMJ Menyapa Warga</h2>
              <p className="text-muted-foreground text-lg">Momen kebersamaan kami bersama masyarakat Lumajang di Alun-Alun.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
              {/* Large item */}
              <div 
                className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl cursor-pointer"
                onClick={() => openLightbox(0)}
              >
                <img 
                  src={galleryImages[0]} 
                  alt="Kegiatan Stevia LMJ 1" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10" />
                </div>
              </div>
              
              {/* Standard items */}
              {galleryImages.slice(1).map((img, index) => (
                <div 
                  key={index} 
                  className={`relative group overflow-hidden rounded-2xl cursor-pointer ${index === 1 || index === 2 ? 'col-span-1 row-span-1' : 'col-span-1 row-span-1'}`}
                  onClick={() => openLightbox(index + 1)}
                >
                  <img 
                    src={img} 
                    alt={`Kegiatan Stevia LMJ ${index + 2}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hall of Fame Comparison Section */}
        <HallOfFame />

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-primary text-white">
          <div className="container mx-auto px-4 text-center space-y-8">
            <h2 className="font-display font-bold text-3xl md:text-4xl">Siap Beralih ke Hidup Lebih Sehat?</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90">
              Kunjungi kami langsung di alamat toko, temui kami di <strong>Car Free Day (CFD) Lumajang</strong>, atau manfaatkan layanan <strong>Home Care</strong> kami ke rumah Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" className="rounded-full px-8 h-12 text-lg font-bold text-primary hover:bg-white" onClick={() => {
                trackEvent('Lead');
                window.open('https://wa.me/6281249356066?text=Halo%20Stevia%20Lumajang,%20saya%20ingin%20tanya-tanya%20dulu', '_blank');
              }}>
                Hubungi via WhatsApp
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 rounded-full px-8 h-12 text-lg" onClick={() => window.open('https://maps.app.goo.gl/BDJpWE9tkeoQhL1u8', '_blank')}>
                Lokasi Kami
              </Button>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 text-primary-foreground font-medium text-sm border border-secondary">
                <Leaf size={16} className="text-primary" />
                <span className="text-primary">Produk Unggulan</span>
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">Pilihan Sehat untuk Keluarga</h2>
              <p className="text-muted-foreground text-lg">Tersedia dalam berbagai ukuran sesuai kebutuhan Anda.</p>
              
              {/* Promo Notification Trigger */}
              <div className="mt-6 animate-bounce">
                <button 
                  onClick={() => setPromoPopupOpen(true)}
                  className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-6 py-3 rounded-full font-bold border-2 border-red-200 hover:bg-red-200 transition-colors shadow-sm"
                >
                  <span className="text-xl">🎁</span>
                  <span>Ada Promo Spesial! Klik di sini</span>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {/* Product 1 */}
              <Card className="overflow-hidden border-border shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-64 overflow-hidden bg-secondary/5 relative">
                  <img 
                    src="/images/product-3gr.webp" 
                    alt="Stevia Drop 3gr" 
                    className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Cocok untuk Anak
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-xl text-foreground">Stevia Tetes 3gr</h3>
                    <p className="text-muted-foreground text-sm mt-1">Praktis dibawa kemana saja</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">Rp 25.000</span>
                    <span className="text-sm text-muted-foreground line-through">Rp 45.000</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Untuk 50 Gelas
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> 1 Tetes untuk 250ml Air
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Praktis & Higienis
                    </li>
                  </ul>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold" onClick={() => {
                    handleWhatsAppClick('Stevia Tetes 3gr', 'Rp 25.000');
                    window.open('https://wa.me/6281249356066?text=Halo%20Stevia%20Lumajang,%20saya%20mau%20pesan%20Stevia%20Tetes%203gr', '_blank');
                  }}>
                    Pesan Sekarang
                  </Button>
                </CardContent>
              </Card>

              {/* Product 2 */}
              <Card className="overflow-hidden border-border shadow-lg hover:shadow-xl transition-all duration-300 group relative ring-2 ring-primary/20">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                <div className="h-64 overflow-hidden bg-secondary/5 relative">
                  <img 
                    src="/images/hero-stevia-lmj.webp" 
                    alt="Stevia Drop 30ml" 
                    className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    Best Seller
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-xl text-foreground">Stevia Tetes 6gr</h3>
                    <p className="text-muted-foreground text-sm mt-1">Pilihan hemat untuk keluarga</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">Rp 35.000</span>
                    <span className="text-sm text-muted-foreground line-through">Rp 55.000</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Untuk 100 Gelas
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> 1 Tetes untuk 250ml Air
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Lebih Hemat
                    </li>
                  </ul>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 text-lg" onClick={() => {
                    handleWhatsAppClick('Stevia Tetes 6gr', 'Rp 35.000');
                    window.open('https://wa.me/6281249356066?text=Halo%20Stevia%20Lumajang,%20saya%20mau%20pesan%20Stevia%20Tetes%206gr', '_blank');
                  }}>
                    Pesan Sekarang
                  </Button>
                </CardContent>
              </Card>

              {/* Product 3 */}
              <Card className="overflow-hidden border-border shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-64 overflow-hidden bg-secondary/5 relative">
                  <img
                    src="/images/stevia12g.webp"
                    alt="Stevia Tetes 12gr"
                    className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Baru!
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-xl text-foreground">Stevia Tetes 12gr</h3>
                    <p className="text-muted-foreground text-sm mt-1">Ukuran jumbo untuk penggunaan lebih lama</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">Rp 49.000</span>
                    <span className="text-sm text-muted-foreground line-through">Rp 65.000</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Untuk 200 Gelas
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> 1 Tetes untuk 250ml Air
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Hemat & Praktis
                    </li>
                  </ul>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold" onClick={() => {
                    handleWhatsAppClick('Stevia Tetes 12gr', 'Rp 49.000');
                    window.open('https://wa.me/6281249356066?text=Halo%20Stevia%20Lumajang,%20saya%20mau%20pesan%20Stevia%20Tetes%2012gr', '_blank');
                  }}>
                    Pesan Sekarang
                  </Button>
                </CardContent>
              </Card>

              {/* Product 4 */}
              <Card className="overflow-hidden border-border shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-64 overflow-hidden bg-secondary/5 relative">
                  <img 
                    src="/images/product-reseller.webp" 
                    alt="Paket Reseller" 
                    className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-xl text-foreground">Paket Reseller</h3>
                    <p className="text-muted-foreground text-sm mt-1">Mulai bisnis sehatmu</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">Hubungi Kami</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Harga Khusus Agen
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Support Materi Promosi
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> Min. Order 20 Botol
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 font-bold" onClick={() => {
                    handleWhatsAppClick('Paket Reseller');
                    window.open('https://wa.me/6281249356066?text=Halo%20Stevia%20Lumajang,%20saya%20tertarik%20jadi%20Reseller', '_blank');
                  }}>
                    Gabung Mitra
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Guarantee Badge */}
            <div className="mt-16 max-w-3xl mx-auto bg-secondary/10 rounded-2xl p-8 border border-secondary/20 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-foreground">Garansi Kepuasan 100%</h3>
                <p className="text-muted-foreground">
                  Kami menjamin kualitas produk Stevia LMJ. Jika Anda menerima produk rusak atau tidak sesuai, kami akan ganti baru tanpa biaya tambahan. <strong>Wajib sertakan video unboxing saat klaim garansi.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Kegiatan Section */}
        <section id="kegiatan" className="py-24 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 text-primary-foreground font-medium text-sm border border-secondary">
                <Leaf size={16} className="text-primary" />
                <span className="text-primary">Kegiatan Kami</span>
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">Aktivitas Stevia LMJ</h2>
              <p className="text-muted-foreground text-lg">Berbagai kegiatan positif kami untuk masyarakat Lumajang.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Kegiatan 1 - CFD */}
              <Card className="overflow-hidden border-border shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-48 overflow-hidden bg-secondary/5 relative">
                  <img
                    src="/images/gallery/activity-1.webp"
                    alt="Car Free Day Lumajang"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    Rutin
                  </div>
                </div>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-display font-bold text-lg text-foreground">Car Free Day (CFD) Lumajang</h3>
                  <p className="text-muted-foreground text-sm">
                    Setiap minggu pagi di alun-alun Lumajang. Konsultasi kesehatan gratis dan produk Stevia.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-green-500" /> Cek Kesehatan Gratis
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Kegiatan 2 - Home Care */}
              <Card className="overflow-hidden border-border shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-48 overflow-hidden bg-secondary/5 relative">
                  <img
                    src="/images/gallery/activity-2.webp"
                    alt="Layanan Home Care"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Populer
                  </div>
                </div>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-display font-bold text-lg text-foreground">Layanan Home Care</h3>
                  <p className="text-muted-foreground text-sm">
                    Kunjungan ke rumah untuk cek kesehatan dan konsultasi produk Stevia langsung di tempat Anda.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-green-500" /> Praktis & Nyaman
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Kegiatan 3 - Community Event */}
              <Card className="overflow-hidden border-border shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-48 overflow-hidden bg-secondary/5 relative">
                  <img
                    src="/images/gallery/activity-3.webp"
                    alt="Kegiatan Komunitas"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Komunitas
                  </div>
                </div>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-display font-bold text-lg text-foreground">Kegiatan Komunitas</h3>
                  <p className="text-muted-foreground text-sm">
                    Penyuluhan kesehatan, senam bersama, dan berbagi inspirasi hidup sehat untuk masyarakat.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-green-500" /> Edukasi Sehat
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Kegiatan 4 - Health Check */}
              <Card className="overflow-hidden border-border shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-48 overflow-hidden bg-secondary/5 relative">
                  <img
                    src="/images/gallery/activity-4.webp"
                    alt="Cek Kesehatan"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-display font-bold text-lg text-foreground">Cek Kesehatan Lengkap</h3>
                  <p className="text-muted-foreground text-sm">
                    Pemeriksaan gula darah, kolesterol, dan asam urat dengan teknologi terkini.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-green-500" /> Hasil Akurat
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Kegiatan 5 - Product Demo */}
              <Card className="overflow-hidden border-border shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-48 overflow-hidden bg-secondary/5 relative">
                  <img
                    src="/images/gallery/activity-5.webp"
                    alt="Demo Produk"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Interaktif
                  </div>
                </div>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-display font-bold text-lg text-foreground">Demo Produk Stevia</h3>
                  <p className="text-muted-foreground text-sm">
                    Coba langsung produk Stevia LMJ dalam berbagai minuman dan makanan sehat.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-green-500" /> Gratis Sampling
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Kegiatan 6 - Join Us CTA */}
              <Card className="overflow-hidden border-2 border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300 group bg-primary/5">
                <div className="h-48 overflow-hidden bg-primary/10 relative flex items-center justify-center">
                  <div className="text-center p-6">
                    <Leaf className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="font-display font-bold text-xl text-primary">Mari Bergabung!</h3>
                  </div>
                </div>
                <CardContent className="p-4 space-y-3 text-center">
                  <p className="text-muted-foreground text-sm">
                    Ikuti kegiatan kami dan dapatkan inspirasi hidup sehat bersama komunitas Stevia LMJ.
                  </p>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold"
                    onClick={() => {
                      trackEvent('Lead');
                      window.open('https://wa.me/6281249356066?text=Halo%20Stevia%20Lumajang,%20saya%20tertarik%20ikut%20kegiatan%20Anda', '_blank');
                    }}
                  >
                    Gabung Komunitas
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Health Check Services Section */}
        <section className="py-16 bg-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-primary font-medium text-sm border border-primary/20 shadow-sm">
                <Heart size={16} className="text-primary" />
                <span className="text-primary">Layanan Kesehatan Stevia LMJ</span>
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">Cek Kesehatan Murah & Akurat</h2>
              <p className="text-muted-foreground text-lg">
                Kami melayani cek kesehatan di <strong>Car Free Day (CFD) Lumajang</strong> atau layanan <strong>Home Care</strong> (datang ke rumah Anda).
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {/* Service 1 */}
              <Card className="bg-white border-border shadow-sm hover:shadow-md transition-all hover:border-primary/30">
                <CardContent className="p-6 text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
                    <Heart size={24} />
                  </div>
                  <h3 className="font-bold text-foreground">Cek Tekanan Darah</h3>
                  <p className="text-2xl font-bold text-primary">GRATIS</p>
                  <p className="text-xs text-muted-foreground">Khusus pelanggan Stevia LMJ</p>
                </CardContent>
              </Card>

              {/* Service 2 */}
              <Card className="bg-white border-border shadow-sm hover:shadow-md transition-all hover:border-primary/30">
                <CardContent className="p-6 text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-secondary/20 rounded-full flex items-center justify-center text-foreground mb-2">
                    <div className="font-bold text-lg">GD</div>
                  </div>
                  <h3 className="font-bold text-foreground">Cek Gula Darah</h3>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-muted-foreground line-through">Rp 25.000</span>
                    <span className="text-2xl font-bold text-primary">Rp 10.000</span>
                  </div>
                </CardContent>
              </Card>

              {/* Service 3 */}
              <Card className="bg-white border-border shadow-sm hover:shadow-md transition-all hover:border-primary/30">
                <CardContent className="p-6 text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-secondary/20 rounded-full flex items-center justify-center text-foreground mb-2">
                    <div className="font-bold text-lg">AU</div>
                  </div>
                  <h3 className="font-bold text-foreground">Cek Asam Urat</h3>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-muted-foreground line-through">Rp 25.000</span>
                    <span className="text-2xl font-bold text-primary">Rp 10.000</span>
                  </div>
                </CardContent>
              </Card>

              {/* Service 4 */}
              <Card className="bg-white border-border shadow-sm hover:shadow-md transition-all hover:border-primary/30">
                <CardContent className="p-6 text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-secondary/20 rounded-full flex items-center justify-center text-foreground mb-2">
                    <div className="font-bold text-lg">CH</div>
                  </div>
                  <h3 className="font-bold text-foreground">Cek Kolesterol</h3>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-muted-foreground line-through">Rp 45.000</span>
                    <span className="text-2xl font-bold text-primary">Rp 20.000</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 text-center">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 font-bold" onClick={() => {
                trackEvent('Lead');
                window.open('https://wa.me/6281249356066?text=Halo%20Stevia%20Lumajang,%20saya%20mau%20booking%20cek%20kesehatan', '_blank');
              }}>
                Booking Jadwal Cek Kesehatan
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12 space-y-4">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">Pertanyaan Umum</h2>
              <p className="text-muted-foreground text-lg">Jawaban untuk pertanyaan yang sering diajukan.</p>
            </div>
            
            <div className="space-y-4">
              <div className="border border-border rounded-lg p-6 hover:border-primary transition-colors">
                <h3 className="font-bold text-lg text-foreground mb-2">Apakah Stevia aman untuk penderita diabetes?</h3>
                <p className="text-muted-foreground">Ya, sangat aman. Stevia tidak menaikkan kadar gula darah karena memiliki indeks glikemik nol, sehingga menjadi pilihan terbaik untuk penderita diabetes.</p>
              </div>
              
              <div className="border border-border rounded-lg p-6 hover:border-primary transition-colors">
                <h3 className="font-bold text-lg text-foreground mb-2">Apakah ada rasa pahit (aftertaste)?</h3>
                <p className="text-muted-foreground">Stevia LMJ diformulasikan khusus dengan proses ekstraksi modern untuk meminimalkan rasa pahit yang biasa ditemukan pada produk stevia lain. Rasa manisnya alami dan enak.</p>
              </div>
              
              <div className="border border-border rounded-lg p-6 hover:border-primary transition-colors">
                <h3 className="font-bold text-lg text-foreground mb-2">Berapa lama masa kadaluarsanya?</h3>
                <p className="text-muted-foreground">Produk kami memiliki masa simpan hingga 2 tahun jika disimpan di tempat yang sejuk dan kering serta terhindar dari sinar matahari langsung.</p>
              </div>
              
              <div className="border border-border rounded-lg p-6 hover:border-primary transition-colors">
                <h3 className="font-bold text-lg text-foreground mb-2">Apakah bisa dikirim ke luar kota?</h3>
                <p className="text-muted-foreground">Tentu saja! Kami melayani pengiriman ke seluruh Indonesia dengan packing aman (bubble wrap tebal) dan bergaransi jika barang rusak di jalan.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
          <div className="container relative z-10 mx-auto px-4 text-center space-y-8">
            <h2 className="font-display font-bold text-4xl md:text-5xl max-w-3xl mx-auto leading-tight">
              Mulai Hidup Sehat Hari Ini Bersama Stevia Lumajang
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan keluarga Indonesia yang telah beralih ke pemanis alami yang lebih sehat.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 font-bold text-lg px-10 h-14 rounded-full shadow-xl" onClick={() => {
              handleWhatsAppClick('Stevia Product', 'Rp 35.000');
              window.open('https://wa.me/6281249356066?text=Halo%20Stevia%20Lumajang,%20saya%20siap%20hidup%20sehat', '_blank');
            }}>
              Pesan Sekarang via WhatsApp <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
