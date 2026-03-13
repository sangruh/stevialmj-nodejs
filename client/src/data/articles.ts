export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  content: string;
}

export const articles: Article[] = [
  {
    id: "manfaat-stevia-untuk-diet",
    title: "Mekanisme Penurunan Berat Badan dengan Stevia: Tinjauan Metabolisme dan Manajemen Kalori",
    excerpt: "Ingin langsing tanpa menyiksa diri? Pelajari rahasia ilmiah bagaimana Stevia membantu membakar lemak dan menjaga berat badan ideal Anda secara alami.",
    image: "/images/article-1.webp",
    date: "12 Januari 2026",
    author: "Team Stevia LMJ",
    content: `
      <p class="lead text-xl text-foreground/80 mb-8">Obesitas dan kelebihan berat badan telah menjadi epidemi global yang berkaitan erat dengan konsumsi gula tambahan (added sugar). Artikel ini membahas mekanisme biologis bagaimana Stevia Rebaudiana dapat menjadi instrumen efektif dalam program penurunan berat badan yang berkelanjutan.</p>

      <h3 class="text-2xl font-display font-bold text-foreground mt-8 mb-4">1. Matematika Defisit Kalori</h3>
      <p>Prinsip dasar penurunan berat badan adalah defisit kalori—membakar lebih banyak energi daripada yang dikonsumsi. Gula pasir (sukrosa) adalah penyumbang kalori "kosong" yang signifikan. Satu sendok teh gula mengandung sekitar 16-20 kalori. Meskipun terdengar kecil, akumulasi konsumsi harian dari kopi, teh, minuman kemasan, dan makanan olahan dapat mencapai ratusan kalori ekstra.</p>
      <p>Stevia, di sisi lain, adalah pemanis non-nutritif dengan <strong>nol kalori</strong>. Dengan mengganti asupan gula harian sebesar 50 gram (sekitar 200 kalori) dengan Stevia, seseorang dapat memangkas 1.400 kalori per minggu. Secara teoritis, ini setara dengan penurunan berat badan sekitar 0,2 kg per minggu tanpa perubahan aktivitas fisik apa pun.</p>

      <h3 class="text-2xl font-display font-bold text-foreground mt-8 mb-4">2. Regulasi Hormon Insulin</h3>
      <p>Salah satu hambatan terbesar dalam diet adalah fluktuasi gula darah. Konsumsi karbohidrat sederhana dan gula memicu lonjakan glukosa darah yang cepat, yang direspons pankreas dengan melepaskan insulin dalam jumlah besar. Insulin adalah hormon "penyimpan lemak" yang memberi sinyal pada sel untuk menyerap glukosa.</p>
      <p>Masalah timbul ketika terjadi <em>reactive hypoglycemia</em> atau "sugar crash" setelah lonjakan tersebut, yang memicu rasa lapar palsu dan keinginan (craving) untuk makan manis lagi. Stevia tidak memicu respon glikemik ini. Dengan menjaga kadar insulin tetap rendah dan stabil, tubuh lebih cenderung menggunakan cadangan lemak sebagai energi (lipolisis) daripada menyimpannya.</p>
      
      <div class="bg-primary/5 border-l-4 border-primary p-6 my-8 rounded-r-lg">
        <p class="font-bold text-primary mb-2">Baca Juga:</p>
        <p>Bagi Anda yang memiliki perhatian khusus pada stabilitas gula darah, pelajari analisis medis lengkapnya di artikel <a href="/artikel/stevia-vs-gula-pasir" class="text-primary underline hover:text-primary/80">Analisis Komparatif: Profil Glikemik Stevia vs Sukrosa</a>.</p>
      </div>

      <h3 class="text-2xl font-display font-bold text-foreground mt-8 mb-4">3. Psikologi Diet dan Kepatuhan Jangka Panjang</h3>
      <p>Banyak diet gagal karena terlalu restriktif. Menghilangkan rasa manis sepenuhnya dari pola makan seringkali menyebabkan efek psikologis deprivasi, yang berujung pada "binge eating" atau balas dendam makan berlebih.</p>
      <p>Stevia memungkinkan individu untuk tetap menikmati profil rasa manis pada makanan dan minuman mereka tanpa konsekuensi metabolik negatif. Ini meningkatkan tingkat kepatuhan (adherence) terhadap program diet dalam jangka panjang. Kunci keberhasilan diet bukanlah intensitasnya, melainkan konsistensinya.</p>

      <h3 class="text-2xl font-display font-bold text-foreground mt-8 mb-4">Kesimpulan Klinis</h3>
      <p>Substitusi gula dengan Stevia bukan sekadar tren, melainkan strategi diet berbasis bukti. Efektivitasnya terletak pada kemampuan ganda: menghilangkan asupan kalori gula secara langsung dan menstabilkan hormonal tubuh untuk mencegah rasa lapar berlebih.</p>

      <div class="bg-secondary/20 p-6 my-8 rounded-lg">
        <p class="font-bold text-foreground mb-2">Siap Memulai?</p>
        <p>Terapkan teori ini ke dalam praktek dapur Anda. Simak <a href="/artikel/resep-dessert-sehat-stevia" class="text-primary font-bold hover:underline">Koleksi Resep Dessert Premium Rendah Kalori</a> kami untuk ide hidangan lezat yang mendukung diet Anda.</p>
      </div>
    `
  },
  {
    id: "resep-dessert-sehat-stevia",
    title: "Gastronomi Sehat: Teknik Substitusi Gula dengan Stevia pada Olahan Dessert Premium",
    excerpt: "Bikin dessert mewah ala kafe tapi takut gemuk? Coba resep rahasia dessert rendah kalori ini. Dijamin enak, sehat, dan bebas rasa bersalah!",
    image: "/images/article-2.webp",
    date: "25 Januari 2026",
    author: "Team Stevia LMJ",
    content: `
      <p class="lead text-xl text-foreground/80 mb-8">Tantangan terbesar dalam menciptakan dessert sehat adalah mempertahankan tekstur dan rasa tanpa kehadiran gula pasir yang berperan sebagai pemberi volume dan kelembaban. Artikel ini menyajikan teknik kuliner dan resep yang telah dikalibrasi khusus untuk penggunaan Stevia LMJ.</p>

      <h3 class="text-2xl font-display font-bold text-foreground mt-8 mb-4">Teknik Konversi: Drops vs Gram</h3>
      <p>Stevia memiliki tingkat kemanisan 200-300 kali lipat dari gula pasir. Kesalahan umum pemula adalah menggunakan terlalu banyak stevia, yang dapat menimbulkan rasa pahit (bitter aftertaste). Rasio emas untuk Stevia LMJ adalah:</p>
      <ul class="list-disc pl-6 space-y-2 mb-6 text-muted-foreground">
        <li><strong>1 Tetes Stevia LMJ</strong> ≈ 1 Sendok Teh Gula Pasir (5 gram)</li>
        <li><strong>3-4 Tetes Stevia LMJ</strong> ≈ 1 Sendok Makan Gula Pasir (15 gram)</li>
      </ul>

      <hr class="my-8 border-border" />

      <h3 class="text-2xl font-display font-bold text-foreground mt-8 mb-4">1. Silky Avocado Chocolate Mousse (Keto & Vegan)</h3>
      <p>Dessert ini kaya akan lemak sehat (MUFA) dan antioksidan, dengan tekstur yang sangat lembut menyerupai mousse Prancis klasik.</p>
      
      <div class="bg-white border border-border rounded-xl p-6 my-6 shadow-sm">
        <h4 class="font-bold text-lg mb-4">Komposisi Bahan:</h4>
        <ul class="list-disc pl-6 space-y-1 mb-4 text-muted-foreground">
          <li>2 buah alpukat mentega matang sempurna (pilih yang dagingnya tidak berserat)</li>
          <li>4 sdm bubuk kakao murni (Unsweetened Cocoa Powder)</li>
          <li>6-8 tetes <strong>Stevia LMJ</strong> (sesuaikan selera)</li>
          <li>100ml santan kental atau almond milk</li>
          <li>Sejumput garam laut (untuk mengangkat rasa coklat)</li>
          <li>1/2 sdt ekstrak vanila alami</li>
        </ul>
        
        <h4 class="font-bold text-lg mb-4">Instruksi Kuliner:</h4>
        <ol class="list-decimal pl-6 space-y-2 text-muted-foreground">
          <li>Belah alpukat, buang biji, dan kerok dagingnya. Pastikan tidak ada bagian kulit yang terbawa untuk menghindari rasa pahit.</li>
          <li>Masukkan semua bahan ke dalam food processor atau blender high-speed.</li>
          <li>Proses hingga tekstur benar-benar halus dan emulsi tercampur sempurna (sekitar 2-3 menit).</li>
          <li>Pindahkan ke gelas saji, tutup dengan plastic wrap, dan dinginkan (chilling) minimal 2 jam untuk set.</li>
          <li>Sajikan dengan topping strawberry segar atau kacang almond sangrai.</li>
        </ol>
        
        <div class="mt-4 pt-4 border-t border-dashed border-border text-sm text-muted-foreground">
          <strong>Estimasi Nutrisi per Porsi:</strong> Kalori: 180 kkal | Karbohidrat Net: 4g | Lemak: 16g | Protein: 3g
        </div>
      </div>

      <div class="bg-primary/5 border-l-4 border-primary p-6 my-8 rounded-r-lg">
        <p class="font-bold text-primary mb-2">Tahukah Anda?</p>
        <p>Resep ini sangat mendukung metabolisme pembakaran lemak. Pelajari sains di baliknya dalam artikel <a href="/artikel/manfaat-stevia-untuk-diet" class="text-primary underline hover:text-primary/80">Mekanisme Penurunan Berat Badan dengan Stevia</a>.</p>
      </div>

      <h3 class="text-2xl font-display font-bold text-foreground mt-8 mb-4">2. Overnight Chia Seed Pudding (High Fiber)</h3>
      <p>Menu sarapan atau snack sore yang padat nutrisi. Chia seed adalah superfood yang kaya Omega-3 dan serat.</p>
      
      <div class="bg-white border border-border rounded-xl p-6 my-6 shadow-sm">
        <h4 class="font-bold text-lg mb-4">Komposisi Bahan:</h4>
        <ul class="list-disc pl-6 space-y-1 mb-4 text-muted-foreground">
          <li>4 sdm Chia Seeds organik</li>
          <li>250ml Susu kedelai atau susu sapi low-fat</li>
          <li>4-5 tetes <strong>Stevia LMJ</strong></li>
          <li>Topping: Potongan mangga atau blueberry</li>
        </ul>
        
        <h4 class="font-bold text-lg mb-4">Instruksi Kuliner:</h4>
        <ol class="list-decimal pl-6 space-y-2 text-muted-foreground">
          <li>Dalam toples kaca (mason jar), campurkan susu dan Stevia LMJ, aduk hingga larut.</li>
          <li>Masukkan chia seeds, aduk rata segera agar tidak menggumpal.</li>
          <li>Diamkan selama 5 menit, lalu aduk kembali.</li>
          <li>Tutup toples dan simpan di lemari es semalaman (minimal 6 jam). Chia seed akan mengembang dan membentuk tekstur gel seperti puding.</li>
          <li>Sajikan dingin dengan topping buah segar.</li>
        </ol>
      </div>

      <h3 class="text-2xl font-display font-bold text-foreground mt-8 mb-4">Tips Pro untuk Baking</h3>
      <p>Saat membuat kue (baking) dengan Stevia, ingat bahwa gula pasir juga berfungsi memberikan volume dan warna kecoklatan (karamelisasi). Karena Stevia tidak memiliki sifat ini, untuk resep kue bolu atau cookies, disarankan menambahkan sedikit <em>applesauce</em> (saus apel) atau putih telur kocok untuk membantu struktur kue tetap mengembang dan lembut.</p>

      <div class="bg-secondary/20 p-6 my-8 rounded-lg">
        <p class="font-bold text-foreground mb-2">Aman untuk Semua Kalangan</p>
        <p>Semua resep di atas aman dikonsumsi oleh anak-anak hingga lansia penderita diabetes. Baca detail keamanannya di <a href="/artikel/stevia-vs-gula-pasir" class="text-primary font-bold hover:underline">Analisis Medis Stevia vs Gula Pasir</a>.</p>
      </div>
    `
  },
  {
    id: "stevia-vs-gula-pasir",
    title: "Analisis Komparatif: Profil Glikemik Stevia vs Sukrosa dalam Manajemen Diabetes Melitus",
    excerpt: "Gula pasir vs Stevia: Mana yang benar-benar aman untuk diabetes? Simak fakta medis mengejutkan yang wajib diketahui penderita diabetes di sini.",
    image: "/images/article-3.webp",
    date: "5 Februari 2026",
    author: "Team Stevia LMJ",
    content: `
      <p class="lead text-xl text-foreground/80 mb-8">Diabetes Melitus Tipe 2 adalah gangguan metabolik yang ditandai dengan hiperglikemia kronis akibat resistensi insulin. Manajemen diet, khususnya pembatasan karbohidrat sederhana, merupakan pilar utama terapi. Artikel ini membedah profil keamanan Stevia sebagai alternatif pemanis bagi pasien diabetes.</p>

      <h3 class="text-2xl font-display font-bold text-foreground mt-8 mb-4">1. Memahami Indeks Glikemik (IG)</h3>
      <p>Indeks Glikemik adalah skala (0-100) yang mengukur seberapa cepat suatu makanan meningkatkan kadar gula darah. Semakin tinggi angkanya, semakin berbahaya bagi penderita diabetes.</p>
      <ul class="list-disc pl-6 space-y-2 mb-6 text-muted-foreground">
        <li><strong>Glukosa Murni:</strong> IG 100 (Standar rujukan)</li>
        <li><strong>Gula Pasir (Sukrosa):</strong> IG 65 (Kategori Sedang)</li>
        <li><strong>Madu:</strong> IG 50-60 (Tergantung jenis bunga)</li>
        <li><strong>Stevia:</strong> IG 0 (Nol)</li>
      </ul>
      <p>Dengan IG 0, Stevia melewati sistem pencernaan tanpa dipecah menjadi glukosa, sehingga <strong>tidak menyebabkan kenaikan gula darah sama sekali</strong>. Glikosida steviol (senyawa manis dalam stevia) dimetabolisme oleh bakteri di usus besar, bukan diserap di aliran darah sebagai gula.</p>

      <h3 class="text-2xl font-display font-bold text-foreground mt-8 mb-4">2. Keamanan Jangka Panjang</h3>
      <p>Banyak pasien beralih ke pemanis buatan seperti Aspartam, Sakarin, atau Sukralosa. Meskipun rendah kalori, beberapa studi observasional menunjukkan potensi efek samping jangka panjang pemanis sintetis terhadap mikrobioma usus dan toleransi glukosa.</p>
      <p>Stevia memiliki keunggulan sebagai <strong>pemanis alami</strong> (plant-based). Studi toksikologi yang dipublikasikan dalam <em>Journal of Medicinal Food</em> menunjukkan bahwa Stevia memiliki profil keamanan yang sangat baik dan bahkan memiliki potensi efek anti-hipertensi ringan dan anti-inflamasi.</p>

      <div class="bg-primary/5 border-l-4 border-primary p-6 my-8 rounded-r-lg">
        <p class="font-bold text-primary mb-2">Relevansi Diet:</p>
        <p>Penggunaan Stevia tidak hanya soal gula darah, tapi juga manajemen berat badan yang krusial bagi diabetesi. Baca hubungannya di artikel <a href="/artikel/manfaat-stevia-untuk-diet" class="text-primary underline hover:text-primary/80">Mekanisme Penurunan Berat Badan dengan Stevia</a>.</p>
      </div>

      <h3 class="text-2xl font-display font-bold text-foreground mt-8 mb-4">3. Dampak terhadap Sensitivitas Insulin</h3>
      <p>Penelitian awal pada hewan coba dan studi klinis terbatas pada manusia menunjukkan bahwa stevioside (salah satu komponen stevia) mungkin memiliki efek positif dalam meningkatkan sensitivitas insulin dan menekan sekresi glukagon (hormon yang menaikkan gula darah). Ini menjadikan Stevia kandidat terapi nutrisi yang menjanjikan, bukan sekadar pengganti rasa manis pasif.</p>

      <h3 class="text-2xl font-display font-bold text-foreground mt-8 mb-4">Rekomendasi Klinis</h3>
      <p>Berdasarkan konsensus medis saat ini, Stevia dinyatakan aman (GRAS - Generally Recognized As Safe) oleh FDA dan BPOM untuk konsumsi harian. Bagi penderita diabetes, beralih ke Stevia adalah langkah intervensi gaya hidup yang cerdas, aman, dan efektif untuk menjaga kualitas hidup tanpa mengorbankan kenikmatan rasa.</p>

      <div class="bg-secondary/20 p-6 my-8 rounded-lg">
        <p class="font-bold text-foreground mb-2">Praktekkan Hidup Sehat</p>
        <p>Menjaga gula darah bukan berarti berhenti makan enak. Temukan inspirasi menu aman diabetes di <a href="/artikel/resep-dessert-sehat-stevia" class="text-primary font-bold hover:underline">Koleksi Resep Dessert Sehat</a> kami.</p>
      </div>
    `
  }
];
