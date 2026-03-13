import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Wand2, Sparkles } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface GenerateArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerated: (data: {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string;
    readTime: number;
  }) => void;
}

export default function GenerateArticleModal({
  isOpen,
  onClose,
  onGenerated,
}: GenerateArticleModalProps) {
  const [topic, setTopic] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [tone, setTone] = useState("friendly");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateMutation = trpc.articles.generate.useMutation({
    onSuccess: (data) => {
      onGenerated({
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        tags: data.tags,
        readTime: data.readTime,
      });
      toast.success("Artikel berhasil di-generate!");
      handleClose();
    },
    onError: (error) => {
      console.error("Generation error:", error);
      toast.error(error.message || "Gagal generate artikel");
    },
  });

  const handleGenerate = () => {
    if (!topic.trim() || !targetAudience.trim()) {
      toast.error("Mohon isi topik dan target audience");
      return;
    }

    setIsGenerating(true);
    generateMutation.mutate({ topic, targetAudience });
  };

  const handleClose = () => {
    setTopic("");
    setTargetAudience("");
    setTone("friendly");
    onClose();
  };

  const suggestionChips = [
    "Manfaat stevia untuk penderita diabetes",
    "Cara menggunakan stevia untuk diet",
    "Resep minuman sehat dengan stevia",
    "Perbandingan stevia vs gula pasir",
    "Stevia untuk ibu hamil dan menyusui",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            Generate Artikel dengan AI
          </DialogTitle>
          <DialogDescription>
            Buat artikel berkualitas secara otomatis dengan AI. Cukup masukkan
            topik dan target audience.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topik Artikel</Label>
            <Textarea
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Contoh: Manfaat stevia untuk kesehatan jantung..."
              className="resize-none"
              rows={3}
              disabled={isGenerating}
            />
            
            {/* Quick suggestions */}
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs text-muted-foreground">Saran:</span>
              {suggestionChips.slice(0, 3).map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setTopic(suggestion)}
                  className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                  type="button"
                  disabled={isGenerating}
                >
                  {suggestion.substring(0, 30)}...
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience</Label>
            <Input
              id="audience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Contoh: Ibu rumah tangga usia 30-50 tahun"
              disabled={isGenerating}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Gaya Bahasa</Label>
            <Select value={tone} onValueChange={setTone} disabled={isGenerating}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friendly">Ramah & Santai</SelectItem>
                <SelectItem value="professional">Profesional & Formal</SelectItem>
                <SelectItem value="educational">Edukatif & Informatif</SelectItem>
                <SelectItem value="persuasive">Persuasif & Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Info box */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex gap-3">
            <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p>AI akan membuat artikel lengkap dengan:</p>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                <p>Judul yang menarik</p>
                <p>Ringkasan (excerpt)</p>
                <p>Konten utama (1500-2000 kata)</p>
                <p>Kategori & tags otomatis</p>
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isGenerating || generateMutation.isPending}
          >
            Batal
          </Button>
          <Button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || generateMutation.isPending}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {generateMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Artikel
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
