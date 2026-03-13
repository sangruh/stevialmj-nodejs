import { Trophy, AlertTriangle, Skull, Info, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function HallOfFame() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">Hall of Fame: Perbandingan Pemanis</h2>
          <p className="text-muted-foreground text-lg">
            Fakta berbicara. Lihat mengapa Stevia LMJ adalah pilihan paling cerdas untuk kesehatan dan dompet Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Gold Winner - Stevia */}
          <div className="relative bg-white rounded-3xl shadow-xl border-2 border-yellow-400 overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                  <Trophy className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold bg-yellow-400 text-white px-3 py-1 rounded-full">JUARA 1</span>
              </div>
              
              <div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-1">Stevia Drop 6gr</h3>
                <p className="text-sm text-muted-foreground">Pemanis Alami Masa Depan</p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Paling manis dengan <strong>nol kalori</strong></span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Paling awet (±40 hari pemakaian)</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Biaya per gelas sangat rendah</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Tidak menaikkan gula darah sama sekali</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-dashed border-border">
                <p className="font-bold text-green-600 flex items-center gap-2">
                  <Check className="w-5 h-5" /> Menang di Efisiensi + Kesehatan
                </p>
              </div>
            </div>
          </div>

          {/* Silver Winner - Tropicana */}
          <div className="relative bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
            <div className="absolute top-0 left-0 w-full h-2 bg-gray-300"></div>
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="bg-gray-100 p-3 rounded-full text-gray-500">
                  <Trophy className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold bg-gray-300 text-white px-3 py-1 rounded-full">JUARA 2</span>
              </div>
              
              <div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-1">Pemanis Sachet</h3>
                <p className="text-sm text-muted-foreground">Tropicana Slim Diabtx, dll</p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <Info className="w-5 h-5 text-blue-500 shrink-0" />
                  <span>Kalori rendah tapi tetap ada</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>Manisnya kurang nendang, boros sachet</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>Cepat habis, mahal per gelas</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Aman untuk diabetes, tapi tidak optimal</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-dashed border-border">
                <p className="font-bold text-gray-500 flex items-center gap-2">
                  <Info className="w-5 h-5" /> Pilihan Transisi, Bukan Solusi
                </p>
              </div>
            </div>
          </div>

          {/* Loser - Gula Pasir */}
          <div className="relative bg-white rounded-3xl shadow-md border border-red-100 overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
            <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="bg-red-100 p-3 rounded-full text-red-600">
                  <Skull className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold bg-red-500 text-white px-3 py-1 rounded-full">BAHAYA</span>
              </div>
              
              <div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-1">Gula Pasir</h3>
                <p className="text-sm text-muted-foreground">Sukrosa Tebu</p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Kalori sangat tinggi</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Penyebab utama lonjakan gula darah</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Murah di depan, mahal di rumah sakit</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/80">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Tidak ada argumen rasional untuk kesehatan</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-dashed border-border">
                <p className="font-bold text-red-600 flex items-center gap-2">
                  <Skull className="w-5 h-5" /> Murah Semu. Rapuh.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline" className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                Lihat Tabel Perbandingan Lengkap
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold text-center mb-4">Analisis Perbandingan Ekonomi & Kesehatan</DialogTitle>
              </DialogHeader>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/20">
                      <TableHead className="w-[200px] font-bold text-foreground">Fitur</TableHead>
                      <TableHead className="font-bold text-primary text-center bg-primary/5">Stevia Drop 6gr</TableHead>
                      <TableHead className="font-bold text-foreground text-center">Pemanis Sachet (50s)</TableHead>
                      <TableHead className="font-bold text-foreground text-center">Gula Pasir (1kg)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Harga</TableCell>
                      <TableCell className="text-center font-bold text-primary bg-primary/5">Rp 35.000</TableCell>
                      <TableCell className="text-center">Rp 50.000</TableCell>
                      <TableCell className="text-center">Rp 17.000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Kalori</TableCell>
                      <TableCell className="text-center font-bold text-green-600 bg-primary/5">0 kkal</TableCell>
                      <TableCell className="text-center">±0,4 kkal</TableCell>
                      <TableCell className="text-center text-red-500">±40 kkal / 10gr</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bahan Utama</TableCell>
                      <TableCell className="text-center bg-primary/5">Stevioside (Alami)</TableCell>
                      <TableCell className="text-center">Erythritol (Gula Alkohol)</TableCell>
                      <TableCell className="text-center">Sukrosa Tebu</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Kadar Manis</TableCell>
                      <TableCell className="text-center bg-primary/5">200-300x Gula</TableCell>
                      <TableCell className="text-center">70-80% Gula</TableCell>
                      <TableCell className="text-center">100% (Standar)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Total Sajian</TableCell>
                      <TableCell className="text-center font-bold bg-primary/5">±120 Gelas</TableCell>
                      <TableCell className="text-center">±50 Gelas</TableCell>
                      <TableCell className="text-center">±99 Gelas</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Lama Habis (3x sehari)</TableCell>
                      <TableCell className="text-center font-bold text-green-600 bg-primary/5">±40 Hari</TableCell>
                      <TableCell className="text-center">±16,5 Hari</TableCell>
                      <TableCell className="text-center">±33 Hari</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Harga Per Saji</TableCell>
                      <TableCell className="text-center font-bold text-green-600 bg-primary/5">Rp 291</TableCell>
                      <TableCell className="text-center text-red-500">Rp 1.000</TableCell>
                      <TableCell className="text-center">Rp 171</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Keamanan Diabetes</TableCell>
                      <TableCell className="text-center font-bold text-green-600 bg-primary/5">Sangat Aman</TableCell>
                      <TableCell className="text-center text-blue-500">Aman</TableCell>
                      <TableCell className="text-center font-bold text-red-600">Berbahaya</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6 bg-secondary/10 p-4 rounded-lg text-sm text-muted-foreground text-center">
                <p>Data dikalkulasi berdasarkan penggunaan rata-rata harian normal. Harga dapat berubah sewaktu-waktu.</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
