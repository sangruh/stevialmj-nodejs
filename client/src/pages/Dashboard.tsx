import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Edit, Trash2, X, FileText, Loader2, Wand2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GenerateArticleModal from "@/components/GenerateArticleModal";

interface ArticleFormData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  readTime: number;
  category: string;
  tags: string;
}

const emptyFormData: ArticleFormData = {
  id: "",
  title: "",
  excerpt: "",
  content: "",
  author: "Team Stevia LMJ",
  date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
  image: "/images/article-1.webp",
  readTime: 5,
  category: "Tips Kesehatan",
  tags: "",
};

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ArticleFormData>(emptyFormData);
  const [searchTerm, setSearchTerm] = useState("");

  const utils = trpc.useUtils();
  
  const { data: articles, isLoading } = trpc.articles.list.useQuery();
  const createMutation = trpc.articles.create.useMutation({
    onSuccess: () => {
      utils.articles.list.invalidate();
      toast.success("Artikel berhasil ditambahkan!");
      setIsModalOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(`Gagal menambahkan artikel: ${error.message}`);
    },
  });

  const updateMutation = trpc.articles.update.useMutation({
    onSuccess: () => {
      utils.articles.list.invalidate();
      toast.success("Artikel berhasil diupdate!");
      setIsModalOpen(false);
      resetForm();
      setEditingId(null);
    },
    onError: (error) => {
      toast.error(`Gagal mengupdate artikel: ${error.message}`);
    },
  });

  const deleteMutation = trpc.articles.delete.useMutation({
    onSuccess: () => {
      utils.articles.list.invalidate();
      toast.success("Artikel berhasil dihapus!");
    },
    onError: (error) => {
      toast.error(`Gagal menghapus artikel: ${error.message}`);
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  const resetForm = () => {
    setFormData(emptyFormData);
    setEditingId(null);
  };

  const handleOpenModal = (article?: typeof articles[number]) => {
    if (article) {
      setFormData({
        ...article,
        tags: article.tags || "",
      });
      setEditingId(article.id);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updateMutation.mutate({
        id: editingId,
        ...formData,
      });
    } else {
      // Generate URL-friendly ID from title
      const generatedId = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      
      createMutation.mutate({
        ...formData,
        id: generatedId || formData.id,
      });
    }
  };

  const handleGenerated = (generatedData: {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string;
    readTime: number;
  }) => {
    // Auto-fill the form with generated data
    const generatedId = generatedData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    setFormData({
      ...emptyFormData,
      ...generatedData,
      id: generatedId,
      author: "Team Stevia LMJ",
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      image: "/images/article-1.webp",
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Yakin ingin menghapus artikel "${title}"?`)) {
      deleteMutation.mutate({ id });
    }
  };

  const filteredArticles = articles?.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Dashboard Artikel
              </h1>
              <p className="text-muted-foreground mt-1">
                Kelola konten artikel Stevia Lumajang
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <span className="text-sm text-primary font-medium">
                  {user?.email}
                </span>
              </div>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Artikel</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{articles?.length || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Kategori</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Set(articles?.map(a => a.category)).size || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Baca</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {articles?.reduce((acc, a) => acc + (a.readTime || 0), 0) || 0} menit
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsGenerateModalOpen(true)}
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Artikel
              </Button>
              <Button onClick={() => handleOpenModal()}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Artikel
              </Button>
            </div>
          </div>

          {/* Articles Table */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Artikel</CardTitle>
              <CardDescription>
                Kelola semua artikel yang telah dipublikasikan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredArticles && filteredArticles.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Judul</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Penulis</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Baca</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredArticles.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell className="font-medium max-w-xs truncate">
                            {article.title}
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {article.category}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {article.author}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {article.date}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {article.readTime} menit
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleOpenModal(article)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(article.id, article.title)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  {searchTerm ? "Tidak ada artikel yang cocok dengan pencarian" : "Belum ada artikel"}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Create/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Artikel" : "Tambah Artikel Baru"}
            </DialogTitle>
            <DialogDescription>
              {editingId ? "Update informasi artikel" : "Buat artikel baru untuk dipublikasikan"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="id">ID Artikel (URL-friendly)</Label>
                <Input
                  id="id"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="contoh: manfaat-stevia"
                  required
                  disabled={!!editingId}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="readTime">Waktu Baca (menit)</Label>
                <Input
                  id="readTime"
                  type="number"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Judul Artikel</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Masukkan judul artikel"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Ringkasan (Excerpt)</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Ringkasan singkat artikel (2-3 kalimat)"
                className="resize-none"
                rows={2}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Konten Artikel (Markdown)</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Tulis konten artikel dalam format Markdown..."
                className="resize-none font-mono text-sm"
                rows={10}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Penulis</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tips Kesehatan">Tips Kesehatan</SelectItem>
                    <SelectItem value="Diabetes">Diabetes</SelectItem>
                    <SelectItem value="Diet & Nutrisi">Diet & Nutrisi</SelectItem>
                    <SelectItem value="Resep Sehat">Resep Sehat</SelectItem>
                    <SelectItem value="Testimoni">Testimoni</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL Gambar</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/images/article.webp"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (pisahkan dengan koma)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="stevia, kesehatan, gula darah"
              />
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Batal
              </Button>
              <Button 
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                {editingId ? "Update" : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Generate Article Modal */}
      <GenerateArticleModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onGenerated={handleGenerated}
      />

      <Footer />
    </div>
  );
}
