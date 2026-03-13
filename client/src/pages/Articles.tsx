import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, ArrowRight, BookOpen, Share2, Search, X } from "lucide-react";
import { Link, useRoute, useLocation } from "wouter";
import SEOHead from "@/components/SEOHead";
import { trpc } from "@/lib/trpc";
import { marked } from 'marked';
import '../styles/article.css';
import { useMemo, useState, useEffect } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Articles() {
  const [location] = useLocation();
  const [match, params] = useRoute("/artikel/:id");
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [readingProgress, setReadingProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Only set articleId if we actually matched the detail route
  const articleId = match ? params?.id : null;
  
  // Reading progress bar effect
  useEffect(() => {
    if (!articleId) return;
    
    const handleScroll = () => {
      const article = document.querySelector('.article-content');
      if (!article) return;
      
      const windowHeight = window.innerHeight;
      const documentHeight = article.scrollHeight;
      const scrollTop = window.scrollY;
      const articleTop = article.getBoundingClientRect().top + scrollTop;
      
      // Calculate progress based on article content scroll
      const articleScrolled = scrollTop - articleTop + windowHeight;
      const articleHeight = documentHeight;
      const progress = Math.min(Math.max((articleScrolled / articleHeight) * 100, 0), 100);
      
      setReadingProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [articleId]);
  


  // Fetch articles from database
  const { data: articles, isLoading, error } = trpc.articles.list.useQuery();
  
  // Articles data is now automatically transformed by superjson
  const allArticles = articles || [];
  
  // Filter articles by category and search query
  const articlesList = allArticles
    .filter((article: any) => {
      // Filter by category
      if (selectedCategory !== 'All' && article.category !== selectedCategory) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = article.title?.toLowerCase().includes(query);
        const excerptMatch = article.excerpt?.toLowerCase().includes(query);
        const tagsMatch = article.tags?.toLowerCase().includes(query);
        return titleMatch || excerptMatch || tagsMatch;
      }
      
      return true;
    });
  
  // Get unique categories from articles
  const categories = ['All', ...Array.from(new Set(allArticles.map((article: any) => article.category).filter(Boolean)))];
  

  
  // Fetch single article if viewing detail
  const { data: articleData, isLoading: articleLoading, error: articleError } = trpc.articles.getById.useQuery(
    { id: articleId || '' },
    { enabled: !!articleId }
  );
  
  // Article data is now automatically transformed by superjson
  const article = articleData;
  
  // WhatsApp message based on context
  const whatsappMessage = articleId && article 
    ? `Halo Stevia LMJ, saya tertarik dengan artikel "${article.title}" dan ingin tahu lebih lanjut tentang produk Stevia.`
    : location === '/artikel'
    ? 'Halo Stevia LMJ, saya tertarik dengan artikel kesehatan di website Anda dan ingin tahu lebih lanjut tentang produk Stevia.'
    : 'Halo Stevia LMJ, saya ingin tanya tentang produk Stevia Anda.';
  
  // Parse markdown content using useMemo (must be at top level, not conditional)
  const parsedContent = useMemo(() => {
    if (article?.content) {
      return marked(article.content);
    }
    return '';
  }, [article?.content]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-body">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Memuat artikel...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-body">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-destructive">Terjadi Kesalahan</h1>
            <p className="text-muted-foreground">{error.message}</p>
            <Button onClick={() => window.location.reload()}>Muat Ulang</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // If viewing a single article
  if (articleId) {
    // Show loading state for article detail
    if (articleLoading) {
      return (
        <div className="min-h-screen flex flex-col bg-background font-body">
          <Navbar />
          <div className="flex-grow flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Memuat artikel...</p>
            </div>
          </div>
          <Footer />
        </div>
      );
    }
    
    // Show error state for article detail
    if (articleError) {
      return (
        <div className="min-h-screen flex flex-col bg-background font-body">
          <Navbar />
          <div className="flex-grow flex items-center justify-center">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold text-destructive">Terjadi Kesalahan</h1>
              <p className="text-muted-foreground">{articleError.message}</p>
              <Link href="/artikel">
                <Button>Kembali ke Daftar Artikel</Button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      );
    }
    
    if (!article) return (
      <div className="min-h-screen flex flex-col bg-background font-body">
        <SEOHead title="Artikel Tidak Ditemukan - Stevia LMJ" />
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Artikel tidak ditemukan</h1>
            <Link href="/artikel">
              <Button>Kembali ke Daftar Artikel</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );

    return (
      <div className="min-h-screen flex flex-col bg-background font-body">
        <SEOHead 
          title={article.title}
          description={article.excerpt}
          image={article.image}
          url={`https://stevialmj.my.id/artikel/${article.id}`}
          type="article"
        />
        
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-secondary/20 z-50">
          <div 
            className="h-full bg-primary transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
        
        <WhatsAppButton message={whatsappMessage} />
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <article className="container mx-auto px-4 max-w-4xl">
            <div className="mb-8">
              <Link href="/artikel">
                <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary group">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Kembali ke Artikel
                </Button>
              </Link>
            </div>

            <div className="mb-8">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>

            <header className="mb-8 space-y-4">
              {/* Category Badge */}
              {article.category && (
                <div className="inline-block">
                  <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                    {article.category}
                  </span>
                </div>
              )}
              
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{article.readTime} menit baca</span>
                </div>
              </div>
              
              {/* Tags */}
              {article.tags && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {article.tags.split(',').map((tag: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-secondary/50 text-foreground/70 text-sm rounded-full">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const url = `https://stevialmj.my.id/artikel/${article.id}`;
                    const text = `Baca artikel menarik: ${article.title}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
                  }}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Bagikan
                </Button>
              </div>
            </header>

            <div className="article-container" dangerouslySetInnerHTML={{ __html: parsedContent }} />

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-xl font-display font-bold mb-4">Artikel Lainnya</h3>
              <div className="grid gap-4">
                {articlesList?.filter((a: any) => a.id !== article.id).slice(0, 2).map((relatedArticle: any) => (
                  <Link key={relatedArticle.id} href={`/artikel/${relatedArticle.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardContent className="p-4 flex gap-4">
                        <img 
                          src={relatedArticle.image} 
                          alt={relatedArticle.title}
                          className="w-24 h-24 object-cover rounded-lg"
                          loading="lazy"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {relatedArticle.excerpt}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  // Article list view
  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      <SEOHead 
        title="Artikel Kesehatan & Tips Hidup Sehat - Stevia LMJ"
        description="Baca artikel terbaru tentang kesehatan, diet, dan tips hidup sehat dengan Stevia. Temukan informasi bermanfaat untuk gaya hidup lebih baik!"
        url="https://stevialmj.my.id/artikel"
      />
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Artikel & Tips Kesehatan
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Temukan informasi bermanfaat seputar kesehatan, diet, dan gaya hidup sehat dengan Stevia
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Cari artikel berdasarkan judul, konten, atau tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Ditemukan {articlesList.length} artikel untuk "{searchQuery}"
              </p>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 transition-all ${
                  selectedCategory === category 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : 'border-primary/30 text-foreground hover:bg-primary/5'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {!Array.isArray(articlesList) && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Data artikel tidak valid. Type: {typeof articles}</p>
              </div>
            )}
            {Array.isArray(articlesList) && articlesList.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Belum ada artikel tersedia.</p>
              </div>
            )}
            {Array.isArray(articlesList) && articlesList.length > 0 && articlesList.map((article: any) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {article.readTime} min
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  {/* Category Badge */}
                  {article.category && (
                    <div className="inline-block">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {article.category}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-display font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  {/* Tags */}
                  {article.tags && (
                    <div className="flex flex-wrap gap-2">
                      {article.tags.split(',').slice(0, 3).map((tag: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-secondary/50 text-foreground/70 text-xs rounded">
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link href={`/artikel/${article.id}`}>
                    <Button className="w-full group/btn">
                      Baca Selengkapnya
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
