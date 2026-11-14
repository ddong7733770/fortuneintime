// Kartu bidang tab Hari Ini: baris pembuka (skor 1–5) · tugas (up/down) · daftar hindari, perluasan 5× (ditambahkan)
const L = s => s.trim().split('\n').map(x => x.trim()).filter(Boolean);
export const LEAD5 = {
  wealth: [
    L(`
Pengeluaran menumpuk hari ini. Bayar hanya yang wajib.
Uang mudah lepas. Tinggalkan kartu di rumah.
Mengejar kerugian bisa lebih merugikan. Berhenti untuk hari ini.
Janji soal uang mudah kusut. Hindari meminjamkan.
Keberuntungan uang hampir di dasar. Fokus bertahan saja.
Kamu bisa belanja karena suasana hati. Lihat lagi keranjangmu besok.
Kekhawatiran uang bertambah hari ini. Menuliskan angka meringankannya.
Kebocoran terlihat hari ini. Periksa dulu pembayaran otomatis.
Hitungan mudah meleset. Periksa transfer dua kali.
Keserakahan berbalik hari ini. Tunda transaksi besar.
Dompetmu mudah menipis. Masak di rumah daripada makan di luar.
Pertengkaran soal uang mudah tersulut. Berhenti sejenak saat emosi naik.
`),
    L(`
Sedikit lebih banyak yang keluar hari ini. Sesuaikan lagi anggaranmu.
Godaan belanja terus datang. Tahan selama sehari.
Pembayaran kecil menumpuk. Catat apa yang kamu belanjakan.
Uang bergerak pelan. Periksa uang yang menjadi hakmu.
Lebih cocok untuk menabung daripada belanja. Coba hari tanpa belanja.
Penilaian soal uang bisa kabur. Percayai angka daripada omongan.
Diskon bisa menggoda. Tanyakan apakah benar-benar butuh.
Pengeluaran mendahului pemasukan. Tinjau biaya tetapmu.
Uang sedang beristirahat. Tunda pembelian besar.
Pengeluaran cenderung muncul. Simpan sedikit cadangan.
Makin banyak berhemat, makin banyak yang tersisa. Catat yang kamu hemat.
Terburu-buru merugikanmu hari ini. Putuskan perlahan.
`),
    L(`
Uang sedang tenang. Kelola seperti biasa.
Masuk dan keluar seimbang hari ini. Rapikan anggaranmu.
Hari ini yang biasa itu baik. Periksa transfer tabunganmu.
Uang mengalir merata. Rencanakan bulan depan.
Tanpa perubahan besar. Jaga kebiasaan menabung kecilmu.
Hari yang baik untuk belanja sesuai rencana. Bandingkan sebelum membeli.
Uang stabil. Tambahkan sedikit ke dana daruratmu.
Segalanya berjalan lancar. Kumpulkan poin dan manfaatmu.
Uang diam-diam terkumpul. Catat pengeluaran hari ini dalam satu baris.
Kebiasaan menjadi hasil. Pangkas satu biaya tetap.
Segalanya seimbang. Selaraskan tanggal pemasukan dan pembayaran.
Ritme biasamu sudah cukup. Tinjau langgananmu.
`),
    L(`
Kabar baik soal uang bisa datang. Jangan lewatkan pesan apa pun.
Naluri uangmu tajam. Catat syarat yang bagus.
Usaha terbayar. Tagih hari ini yang menjadi hakmu.
Keuntungan kecil bertambah. Tabung sebagian segera.
Transaksi berjalan lancar. Kirim penawaran yang kamu tunda.
Uang condong ke arahmu. Coba bernegosiasi.
Manfaat menonjol hari ini. Cari pengembalian dana yang terlupa.
Ide penghasilan mudah datang. Catat sekarang.
Keberuntungan uang naik. Naikkan target tabunganmu.
Pembicaraan uang berjalan baik. Selesaikan pelunasan.
Hari yang baik untuk mengamankan untung nyata. Pertimbangkan hanya investasi yang perlu.
Peluang bagus muncul. Bandingkan syarat dengan cermat.
`),
    L(`
Keberuntungan uang memuncak hari ini. Jalankan apa yang sudah kamu siapkan.
Uang terkumpul hari ini. Tabung sebanyak yang masuk.
Panen besar terlihat. Urus kontrak dan pelunasan.
Energi uang meluap. Jangan lewatkan peluangnya.
Usaha berubah menjadi uang. Tunjukkan karyamu dengan percaya diri.
Negosiasi berjalan baik. Sampaikan syarat yang kamu inginkan.
Penghasilan cenderung bertambah. Tentukan dulu peruntukannya.
Pintu kekayaan terbuka. Lanjutkan transaksi yang tertunda.
Naluri uangmu bersinar. Buat rencana jangka panjang.
Transaksi bagus terus datang. Sekalian bangun kepercayaan.
Keuntungan tak terduga bisa datang. Bagikan juga rasa terima kasih.
Keberuntungan uang mekar penuh. Tetap membumi dan buat catatan.
`),
  ],
  love: [
    L(`
Emosi tajam hari ini. Jangan mengambil kesimpulan.
Rasa sakit mudah membesar. Jangan menebak sendirian.
Kata-kata keluar salah. Baca ulang sebelum mengirim.
Hatimu lelah. Rawat dirimu lebih dulu.
Pertengkaran mudah tersulut. Berhenti sejenak sebelum menjawab.
Harapan bisa tidak terpenuhi. Turunkan ekspektasimu.
Pesan terus meleset. Tunggu daripada mendesak.
Salah paham menumpuk. Periksa faktanya dulu.
Hubungan terasa berat. Sedikit jarak tidak apa-apa.
Kenangan lama muncul. Biarkan masa lalu.
Hatimu goyah. Bicaralah dengan teman yang kamu percaya.
Kelelahan emosional tinggi. Istirahat lebih awal adalah jawabannya.
`),
    L(`
Mengungkapkan diri terasa canggung. Singkat dan hangat saja.
Ritme kalian tidak sama. Hormati waktunya.
Hal kecil terasa menyengat. Biarkan berlalu.
Keberuntungan asmara sedikit turun. Hindari berkomitmen berlebihan.
Menunggu terasa lama. Fokus pada urusanmu sendiri.
Obrolan tetap di permukaan. Ubah pertanyaanmu.
Kamu merasa tidak sabar. Lihat prosesnya, bukan hasilnya.
Sedikit rasa sakit berlalu. Pikirkan dulu apa yang kamu syukuri.
Hubungan sedang tenang. Kirim sapaan ringan saja.
Mudah membanding-bandingkan. Lihat hanya hubunganmu sendiri.
Suasana hati naik turun. Tunda obrolan penting.
Kata-kata terasa canggung. Tunjukkan lewat tindakan.
`),
    L(`
Hubungan terasa mudah. Nikmati obrolan ringan.
Kemanisan sehari-hari hari ini. Makanlah bersama.
Keakraban terasa menyenangkan. Ucapkan terima kasih dengan lantang.
Hatimu tenang. Tanyakan harinya.
Segalanya berjalan lembut. Tepati janji-janji kecil.
Hari yang cukup baik untuk jodoh. Hubungi teman lama.
Hari yang damai. Jalan-jalan bersama.
Hari yang baik untuk melihat ke belakang. Kenang momen-momen indah.
Segalanya diam-diam makin dalam. Dengarkan dia sampai selesai.
Ada rasa stabil. Rencanakan kencan berikutnya.
Jika lajang, fokus pada dirimu. Nikmati hobi.
Kehangatan yang nyaman hari ini. Berikan pujian ringan.
`),
    L(`
Ketertarikan berjalan dua arah. Dekati dengan senyuman.
Obrolan klop. Tanyakan apa yang membuatmu penasaran.
Debaran bertambah. Ajukan sebuah rencana.
Hati mudah terhubung. Jujurlah dengan perasaanmu.
Jodoh baru muncul. Datangi sebuah pertemuan.
Kalian makin dekat. Buat rencana bersama.
Pesonamu terlihat. Jadilah dirimu sendiri.
Pesan disambut baik. Balas dengan hangat.
Suasananya bagus. Pergilah ke tempat baru.
Jodoh sudah dekat. Jangan tolak perkenalan.
Ketulusan tersampaikan. Bagikan rasa terima kasihmu.
Tanda-tanda baik datang. Tanggapi tanpa ragu.
`),
    L(`
Keberuntungan asmara mekar penuh. Bagikan perasaanmu.
Cinta bersinar hari ini. Rencanakan kencan istimewa.
Jodoh sedang datang. Terbukalah pada orang baru.
Hari yang baik untuk menyatakan cinta. Kumpulkan keberanianmu.
Hubungan makin dalam. Bicarakan masa depan.
Pesonamu di puncak. Jadilah bintang di pertemuan.
Hati menjadi satu. Habiskan lebih banyak waktu bersama.
Penuh debaran. Ciptakan hari yang akan diingat.
Kamu dan pasangan seirama. Coba hal baru bersama.
Mudah bertemu orang baik. Buat rencana.
Kamu dicintai hari ini. Balas dengan cinta yang sama.
Pintu jodoh terbuka. Ulurkan tangan lebih dulu.
`),
  ],
  work: [
    L(`
Pekerjaan mudah macet. Hari ini berpeganglah pada dasar-dasar.
Kesalahan bisa membesar. Periksa sebelum mengumpulkan.
Tekanan berat. Bagi pekerjaannya.
Rencana melenceng. Susun ulang prioritas.
Fokus buyar. Matikan notifikasi.
Pendapat berbenturan. Tuangkan semuanya secara tertulis.
Energi rendah. Tunda keputusan besar.
Hasil lambat. Jangan terburu-buru.
Pekerjaan menumpuk. Selesaikan tiga hal saja.
Penilaian membebanimu. Fokus pada yang bisa kamu lakukan.
Hari untuk bertahan. Melewatinya dengan selamat sudah cukup.
Banyak variabel. Siapkan rencana cadangan.
`),
    L(`
Butuh ketelitian. Periksa angka dan tanggal.
Temponya lambat. Bersikaplah teliti.
Pekerjaan sedikit berat. Minta bantuan.
Tenggat sudah dekat. Selesaikan yang sudah kamu mulai.
Waspadai kesalahan. Pakai daftar periksa.
Fokus lemah. Bekerja dalam waktu-waktu singkat.
Perlu konfirmasi. Catat instruksinya.
Tugas bertumpuk. Sesuaikan lagi jadwalmu.
Hari untuk menyelesaikan, bukan memulai. Rampungkan yang tersisa.
Berhati-hatilah. Baca sampai habis sebelum menandatangani.
Hemat energi. Kerjakan hanya tugas kunci di pagi hari.
Masalah kecil bisa muncul. Simpan cadangan.
`),
    L(`
Pekerjaan mengalir tenang. Lanjutkan sesuai rencana.
Hari yang cukup baik. Selesaikan tugas kecil yang tertunda.
Konsistensi bersinar. Jaga rutinitasmu.
Hari yang baik untuk merapikan. Bereskan berkas dan email.
Kemampuan biasamu sudah cukup. Percayai dirimu.
Hari yang baik untuk mengulang. Rapikan apa yang kamu pelajari.
Kerja tim berjalan baik. Bagikan kemajuanmu.
Segalanya mengalir merata. Rencanakan minggu depan.
Hari yang stabil. Kuatkan dasar-dasar.
Hari yang tenang. Fokus pada satu tugas sulit.
Hari yang seimbang. Pisahkan kerja dan istirahat.
Hari yang baik untuk memeriksa. Tinjau lagi tujuanmu.
`),
    L(`
Hasil terlihat hari ini. Bagikan.
Ide bersinar. Bicaralah di rapat.
Kerja sama berjalan baik. Usulkan kerja bersama.
Pengakuan mudah datang. Rajin melapor.
Fokus kuat. Mulailah dengan tugas tersulit.
Peluang datang. Angkat tangan.
Kamu belajar cepat. Mulailah kursus baru.
Kamu meyakinkan. Poles usulanmu.
Pekerjaan berjalan lancar. Selesaikan yang kamu tunda.
Penilaian berjalan baik. Presentasikan dengan percaya diri.
Alurnya bagus. Tetapkan target berikutnya.
Bantuan akan datang. Sampaikan dengan jelas apa yang kamu butuhkan.
`),
    L(`
Keberuntungan kerja memuncak hari ini. Kerjakan tugas terpentingmu.
Kemampuanmu terlihat. Melangkahlah ke depan.
Hari hasil besar. Tunjukkan semua yang sudah kamu siapkan.
Keputusanmu bersinar. Ambil keputusan yang selama ini kamu tunda.
Kepemimpinanmu diterima. Pimpin timmu.
Sangat baik untuk ujian dan wawancara. Percaya dirilah.
Peluang berlimpah. Ambil proyek baru.
Hasil terlihat dalam angka. Buat catatan.
Pengakuan mengikuti. Sebut juga orang-orang yang membantu.
Pekerjaan terbuka lebar. Naikkan rencanamu satu tingkat.
Energi meluap. Ambil tantangan sulit.
Kamu sedang di atas angin. Pertahankan.
`),
  ],
  health: [
    L(`
Tubuhmu terasa berat. Pangkas rencana dengan berani.
Kelelahan tinggi. Tidurlah lebih awal.
Energi di titik terendah. Tunda rencana yang berat.
Tubuhmu mengirim sinyal kuat. Istirahat nomor satu.
Kamu mudah lelah. Sering-seringlah duduk dan beristirahat.
Pemulihan lambat. Tenangkan lambung dengan makanan hangat.
Energimu menipis. Olahraga ringan saja.
Ketegangan menumpuk. Tarik napas dalam.
Cedera mudah terjadi. Bergeraklah perlahan.
Kamu butuh tidur. Matikan layar lebih awal.
Kamu bisa kedinginan. Berpakaianlah hangat.
Hari ini tugasmu adalah beristirahat. Bersikaplah lembut pada dirimu.
`),
    L(`
Masih ada sedikit lelah. Sering istirahat sebentar.
Hemat energimu. Hindari makan berlebihan.
Tubuhmu terasa kaku. Lakukan peregangan.
Ritmemu bisa bergeser. Jaga jam makan.
Kamu mudah lelah. Minum air daripada kafein.
Kamu merasa berat. Naik tangga perlahan daripada lift.
Fokus menurun. Sering istirahatkan matamu.
Energi rendah. Kurangi rencana malam.
Pakai tubuh dengan hemat. Hindari latihan berat.
Ketegangan bertahan. Mandi air hangat.
Kamu kurang tidur. Tidur siang singkat saja.
Hari untuk menjaga kondisi. Akhiri hari lebih awal.
`),
    L(`
Tubuhmu baik-baik saja. Lanjutkan olahragamu.
Kamu seimbang. Minum air sesering mungkin.
Ritme biasamu. Jaga tidur dan makan.
Hari yang mudah. Jalan santai.
Tubuhmu mantap. Perhatikan postur.
Hari yang stabil. Tambahkan satu sayur lagi.
Tanpa beban hari ini. Akhiri dengan peregangan.
Hari yang tenang. Periksa kebiasaanmu.
Kondisimu datar. Berjemur sebentar.
Perlu konsistensi. Penuhi target langkahmu.
Tubuhmu tenang. Biasakan tidur lebih awal.
Kesehatan baik. Pilih camilan sehat.
`),
    L(`
Tubuhmu terasa ringan. Lebih aktiflah.
Pemulihan cepat. Kejar ketinggalan olahraga.
Vitalitas mengalir. Keluarlah.
Energi sedang naik. Coba jenis latihan yang belum pernah kamu lakukan.
Tubuhmu bekerja sama. Naik tangga.
Kamu merasa baik. Tetapkan target kesehatan.
Hari yang menyegarkan. Mulai dengan jalan pagi.
Energi berlimpah. Rencanakan olahraga dengan teman.
Kamu merasa segar. Makanlah dengan baik.
Sangat baik untuk beraktivitas. Nikmati bersepeda atau mendaki.
Kamu makin kuat. Naikkan sedikit intensitasnya.
Hari yang menyenangkan. Nikmati bergerak.
`),
    L(`
Kamu dalam kondisi puncak. Ambil tantangan fisik.
Vitalitas meluap. Bergeraklah sepuasnya.
Rasanya bisa terbang. Mulailah olahraga baru.
Penuh energi. Nikmati berkeringat.
Pemulihan dalam kondisi terbaik. Kerjakan tugas tertunda sekaligus.
Energi meluap. Habiskan lebih banyak waktu di luar.
Tubuh dan pikiran terasa ringan. Rencanakan perjalanan atau jalan-jalan.
Staminamu bersinar. Kejar rekor pribadimu.
Keberuntungan kesehatan mekar penuh. Mulailah kebiasaan baik.
Tubuhmu bergerak dengan baik. Cukup pemanasan lalu nikmati.
Energi yang hidup mengalir. Bergeraklah bersama orang-orang di sekitarmu.
Hari yang menyegarkan. Catat betapa baiknya perasaanmu.
`),
  ],
};

export const TODO5 = {
  wealth: {
    up: L(`
Jika ada uang yang menjadi hakmu, hubungi hari ini
Bandingkan produk dengan syarat yang bagus
Tentukan dulu ke mana uang yang masuk pergi
Catat satu ide penghasilan tambahan
Kirim penawaran yang kamu tunda
Naikkan sedikit target tabunganmu
Kumpulkan poin dan manfaatmu
Coba tawar harganya
Cari apa yang bisa dikembalikan dananya
Tambahkan sedikit lagi ke dana darurat
Luangkan 30 menit belajar tentang uang
Ucapkan terima kasih kepada klien atau pelanggan
Jumlahkan pemasukan bulan ini
Buat rencana tabungan jangka panjang
Beli barang yang kamu butuhkan dengan harga bagus
Buat daftar barang yang bisa dijual
Tetapkan ulang harga keahlianmu
Periksa rincian pelunasan dengan cermat
Tabung sebagian penghasilan segera
Berterima kasih kepada yang memberi tips bagus
Rencanakan sisa dana bulan ini
Rapikan dokumen keuanganmu
Bersiap membicarakan gaji atau tarif
Catat keuntungan hari ini
`),
    down: L(`
Hari ini tunggu sehari sebelum membayar
Tinjau daftar pembayaran otomatis
Catat pengeluaran hari ini di anggaran
Rapikan struk di dompetmu
Susun ulang anggaran minggu ini
Tetapkan waktu tanpa belanja
Matikan notifikasi aplikasi belanja
Pakai hanya uang tunai atau kartu debit
Catat piutang dan utangmu
Beli hanya yang ada di daftar belanja
Periksa tagihan kartu lebih awal
Masak di rumah daripada makan di luar
Singkirkan barang yang tidak dipakai
Periksa rekening dua kali sebelum transfer
Cek kapan uji coba gratis berakhir
Catat biaya tetap bulan ini
Hitung sampai sepuluh saat dorongan datang
Periksa sisa cicilan
Sepakati biaya kelompok sebelumnya
Cukup foto barang yang ingin dibeli
Tinjau tagihan ponsel atau asuransi
Aktifkan notifikasi saldo
Bandingkan harga dulu
Pindahkan meski sedikit ke tabungan
`),
    no: L(`
Menjadi penjamin pinjaman
Investasi karena kabar burung
Belanja untuk menghibur diri
Mencari pinjaman terburu-buru
Belanja impulsif edisi terbatas
Membayar lewat tautan asing
Membayar uang muka di depan
Gali lubang tutup lubang kartu kredit
Belanja demi gengsi
Tagihan minum karena suasana
Tawaran untung pasti
Pembelian besar tanpa membandingkan
Belanja diam-diam
Taruhan untung-untungan
Transfer uang terburu-buru
Transaksi tanpa kontrak
`),
  },
  love: {
    up: L(`
Ajak seseorang yang menarik hatimu
Pilih rute kencan yang berbeda
Ajukan satu pertanyaan lagi saat dia bicara
Berikan pujian yang spesifik
Bagikan foto-foto yang kalian ambil bersama
Siapkan hadiah kecil
Datangi sebuah perkenalan
Bicarakan rencana berikutnya dengan pasangan
Tersenyum dan sapa lebih dulu
Katakan singkat bahwa kamu menyukainya
Ajak jalan-jalan bersama
Makan makanan favoritnya bersama
Tinggalkan catatan tulisan tangan
Bergabung dengan komunitas sehobi
Tanyakan harinya lebih dulu
Pilih film untuk ditonton bersama
Berterima kasih atas momen yang spesifik
Bertukar kontak dengan orang baru
Kirim pesan penyemangat untuk pasangan
Tetapkan target kecil bersama
Berpakaian seperti dirimu dan keluar
Sapa orang yang ingin kamu hubungi
Coba hobinya bersamanya
Rencanakan hari yang akan dikenang
`),
    down: L(`
Jangan desak balasannya hari ini
Baca ulang pesanmu sekali sebelum mengirim
Tulis rasa sakit dan bicarakan besok
Sisihkan satu jam hanya untuk dirimu
Bayangkan sekali dari sisinya
Menjauh saat emosi naik
Bicara dengan teman yang kamu percaya
Istirahat lebih awal untuk menenangkan diri
Jika perlu minta maaf, ucapkan lebih dulu
Lepaskan sedikit harapan
Kirim sapaan singkat dan hangat saja
Pahami bahwa dia sedang sibuk
Tutup media sosial sejenak
Ingat satu kenangan indah
Bicaralah langsung
Lakukan satu hal yang merawat dirimu
Berjalan di tempat yang tenang
Ungkapkan perasaan dimulai dengan «aku»
Hari ini dengarkan daripada menyimpulkan
Tepati satu janji kecil
Tulis perasaanmu di buku harian
Beri dia waktu berpikir
Beristirahat dengan secangkir teh hangat
Ucapkan dulu satu hal yang kamu syukuri
`),
    no: L(`
Menghitung pesan
Memeriksa ponselnya
Berkirim pesan saat mabuk
Mengujinya
Membandingkan dengan pasangan lain
Mengkritiknya di depan umum
Kesimpulan sepihak
Sindiran
Hadiah berlebihan
Membicarakan mantan
Mengunggah perasaan ke media sosial
Mendiamkan
Memaksa jawaban
Mengubah rencana tanpa memberi tahu
Menyalahkan teman-temannya
Buru-buru menyimpulkan
`),
  },
  work: {
    up: L(`
Bagikan rencana yang sudah kamu siapkan
Mulai dengan tugas tersulit
Ajukan diri untuk proyek baru
Laporkan hasil secara singkat
Daftar kursus yang kamu inginkan
Bertukar ide dengan rekan kerja
Poles slide presentasimu
Tetapkan target berikutnya dalam angka
Berterima kasih kepada rekan yang membantu
Selesaikan hari ini tugas yang tertunda
Bicara lebih dulu di rapat
Usulkan kerja bersama lebih dulu
Berlatih wawancara atau ujian seperti sungguhan
Catat hasil hari ini
Coba alat baru
Minta saran kepada senior
Perbarui portofoliomu
Blokir dua jam waktu fokus
Perbaiki satu cara kerja
Bicara dengan calon mentor
Dorong belajarmu sedikit lebih jauh
Kumpulkan usulan hari ini
Semangati tim dengan kata yang baik
Rencanakan tugas besok lebih awal
`),
    down: L(`
Pakai daftar periksa sebelum mengumpulkan
Catat instruksi yang kamu terima
Pangkas daftar hari ini menjadi tiga tugas
Periksa jadwal yang bertabrakan
Cadangkan berkas penting
Tanyakan segera saat buntu
Bacakan email sebelum mengirim
Fokus dalam waktu-waktu singkat
Bekerja dengan notifikasi mati
Periksa ulang tenggat
Mulai dari sisa pekerjaan kemarin
Jadwalkan waktu istirahat
Periksa dua kali angka dan tanggal
Tulis notulen rapat segera
Tanyakan kabar pekerjaan rekan
Periksa ulang lampiran
Tetapkan tenggat sebelum menerima pekerjaan
Tunda keputusan penting saat lelah
Rapikan meja sebelum mulai
Perbaiki kesalahan segera
Rapikan catatan kerjamu
Sisakan waktu perjalanan yang cukup
Kerjakan sepuluh menit tugas yang kamu hindari
Catat pelajaran hari ini
`),
    no: L(`
Menandatangani tanpa memeriksa
Email emosional
Terlalu banyak tugas sekaligus
Belajar sistem kebut semalam
Kritik di depan umum
Mengutip sumber yang belum diperiksa
Lembur berlebihan
Bergosip
Memeriksa sekilas saja
Melempar pekerjaan ke orang lain
Janji tanpa batas waktu
Membagikan data keamanan
Bekerja tanpa menyimpan
Menebak-nebak instruksi
Adu gengsi
Keputusan besar yang impulsif
`),
  },
  health: {
    up: L(`
Berjalan sedikit lebih banyak dari biasanya
Coba olahraga baru
Awali dengan peregangan pagi
Naik tangga
Berjalan di udara segar
Buat janji olahraga
Memasak dengan bahan sehat
Bersepeda
Mendaki ringan
Catat olahragamu
Makan sayur dan buah
Nikmati hobi yang aktif
Beristirahat dengan baik setelah berkeringat
Naikkan target langkahmu
Beristirahat di bawah sinar matahari
Bergerak sambil merapikan rumah
Rencanakan olahraga seminggu
Menari diiringi musik favorit
Lakukan pemanasan yang cukup
Cek tanggal pemeriksaan kesehatan
Coba berenang atau yoga
Rencanakan jalan-jalan dengan teman
Sarapanlah
Bangun pagi dan mulai hari
`),
    down: L(`
Hapus satu rencana hari ini
Istirahatkan mata sebentar setelah makan siang
Mandi air hangat
Tetapkan jam tidur
Jauhkan ponsel dari tempat tidur
Jaga jam makan tetap teratur
Lemaskan leher dan bahu perlahan
Berpakaian hangat saat keluar
Simpan botol air di dekatmu
Kunyah perlahan dan sampai halus
Coba rendam kaki atau berendam setengah badan
Redupkan lampu dan beristirahat
Cukup peregangan ringan
Tunda rencana malam
Duduk tegak
Jalan santai dan perlahan saja
Tidur siang singkat
Minum secangkir teh hangat
Tarik napas dalam lima kali
Pejamkan mata dan dengarkan musik
Persingkat daftar tugas hari ini
Pakai sepatu yang nyaman
Temui tenaga profesional jika ada yang tidak beres
Pulang kerja lebih awal dan beristirahat
`),
    no: L(`
Camilan larut malam
Diet ekstrem
Olahraga tanpa pemanasan
Layar sampai larut malam
Melewatkan makan
Terlalu banyak makanan dingin
Mengabaikan sinyal tubuh
Berjam-jam dalam satu posisi
Kafein di sore hari
Tidur berlebihan di akhir pekan
Terlalu banyak yang manis
Makan terburu-buru
Mengangkat beban berat
Tidur dengan rambut basah
Kerja berlebihan
Terlalu pedas atau berlemak
`),
  },
};
