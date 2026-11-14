// Tab Hari Ini · baris keuangan, perluasan 5× (ditambahkan ke set yang ada). Satu baris = satu kalimat
const L = s => s.trim().split('\n').map(x => x.trim()).filter(Boolean);
export default {
  flow: [
    L(`
Hari ini dompetmu bisa menipis lebih cepat dari dugaan.
Hari ini pintu keluar uang lebih lebar daripada pintu masuknya.
Hari ini pembayaran kecil bisa menumpuk menjadi beban.
Hari ini keberuntungan uang sedang beristirahat.
Hari ini hitunganmu bisa lebih sering meleset dari biasanya.
Hari ini pengeluaran cenderung mengikuti suasana hati.
Energi uang sedang lemah, jadi hari ini menjaga itu penting.
Hari ini pembicaraan soal uang bisa membebani pikiranmu.
Hari ini uang yang menjadi hakmu datang terlambat dan tagihan datang lebih awal.
Hari ini biaya tak terencana cenderung muncul.
Hari ini hatimu mudah goyah di depan uang.
Alur uang bisa terasa tersumbat untuk sementara.
Hari ini menambal kebocoran sama pentingnya dengan menghasilkan.
Hari ini urusan uang mungkin tidak berjalan semulus harapan.
Hari ini kerugian kecil bisa mengganggumu.
Hari ini belanja impulsif cenderung menyelinap.
Hari ini yang paling berhasil adalah diam-diam menyimpan uang.
Hari ini uang bergerak pelan dan bisa terasa menjengkelkan.
Hari ini pengeluaran untuk orang lain cenderung bertambah.
Hari ini kamu bisa membeli karena suasana hati, bukan karena harga.
Makin kamu kejar uang hari ini, makin jauh ia pergi.
Hari ini rencana yang melibatkan uang bisa menemui hambatan.
Keberuntungan uang sedang rendah, jadi jangan dipaksakan hari ini.
Hari ini cukup menunda pengeluaran sudah merupakan keuntungan.
`),
    L(`
Hari ini uang bergerak dengan ritme biasanya.
Hari ini alur uang tetap datar.
Hari ini pemasukan dan pengeluaran seimbang.
Keberuntungan uang biasa saja, jadi hari ini kebiasaan menentukan hasil.
Hari ini tidak banyak kabar baru di urusan uang.
Hari ini kamu tidak banyak mendapat dan tidak banyak mengeluarkan.
Hari ini alur uang tetap tenang di tempatnya.
Hari ini ikuti rencana, dan tidak ada yang perlu disesali.
Hari ini penilaianmu yang biasa sudah cukup untuk urusan uang.
Uang sedang tenang, tetapi pengelolaan kecil hari ini membuahkan hasil.
Yang seharusnya masuk akan masuk, dan yang seharusnya keluar akan keluar.
Keberuntungan uang hari ini bergerak dalam batas yang kamu harapkan.
Hari ini tidak ada alasan untuk terburu-buru soal uang.
Energi uang mengalir merata dan pikiranmu tenang.
Hari ini menepati anggaran terasa mudah.
Hari ini uang tenang tetapi mantap.
Hari ini tabungan kecil mudah berubah menjadi hasil yang terlihat.
Hari ini uang yang masuk dan keluar terlihat sekilas.
Hari ini uang menjaga ritme biasanya.
Hari yang baik untuk menyeimbangkan pengeluaran dan tabungan.
Hari ini tidak ada naik turun besar dalam alur uang.
Hari yang baik untuk meninjau aturan belanjamu.
Keberuntungan uang cukup baik, jadi hari ini ketekunan adalah kekuatanmu.
Hari ini caramu yang biasa dengan uang adalah yang paling cocok.
`),
    L(`
Hari ini energi uang hidup dan bersinar.
Hari ini pesan yang terkait uang cenderung membawa kabar baik.
Hari ini keuntungan kecil cenderung datang beruntun.
Hari ini angin buritan bertiup di alur uangmu.
Hari ini naluri uangmu lebih tajam dari biasanya.
Hari ini uang yang kamu tunggu bisa masuk.
Hari ini syarat yang bagus mudah menarik perhatianmu.
Hari ini segala sesuatu berjalan baik di urusan uang.
Hari ini usaha mudah membuahkan imbalan.
Hari ini pembicaraan soal uang cenderung berjalan baik.
Keberuntungan uang naik, hari yang baik untuk menjalankan rencana.
Hari ini barang yang kamu beli dengan bijak cenderung memuaskan.
Hari ini alur uang terbuka lebar, dengan banyak pilihan.
Hari ini penilaianmu soal uang cenderung tepat.
Hari ini manfaat atau diskon tak terduga bisa datang padamu.
Keberuntungan uang sedang hidup, jadi hari ini bergerak itu menguntungkan.
Hari ini ide untuk mendapat lebih banyak mudah datang.
Hari ini pelunasan dan transaksi cenderung selesai dengan rapi.
Hari ini sedikit keberuntungan menyertaimu di urusan uang.
Hari ini alur uang condong ke arahmu.
Hari ini kepercayaan yang kamu bangun bisa berubah menjadi keuntungan.
Keberuntungan uang baik, jadi hari ini kamu lebih kuat dalam negosiasi.
Hari ini uang terkumpul lebih cepat.
Energi uang berlimpah dan pikiranmu juga terasa lapang.
`),
  ],
  more: [
    L(`
Jika hari ini ada yang menarik perhatianmu, simpan di keranjang dan biarkan sehari.
Di hari yang melelahkan, belanja untuk menghadiahi diri cenderung bertambah.
Sebelum mengeluarkan uang untuk orang lain, tanyakan apakah rencana itu benar-benar perlu.
Bahkan pembayaran otomatis kecil bisa menjadi beban saat menumpuk.
Anggap uang yang kamu hemat hari ini sebagai ruang untuk minggu depan.
Meninggikan suara soal uang cenderung memperbesar kerugian.
Hari ini keputusan yang ditunda lebih menguntungkan daripada yang terburu-buru.
Jika sulit berhemat, pakai hanya uang tunai atau kartu debit hari ini.
Cukup melihat saldo sudah mengubah caramu berbelanja.
Hari ini keinginan membeli apa yang dibeli orang lain bertambah.
Anggap hari ini sebagai hari menjaga uang, dan hatimu terasa lebih ringan.
Terburu-buru menutup kerugian cenderung membawa kerugian yang lebih besar.
`),
    L(`
Hari yang baik untuk meninjau pengeluaran dan menyesuaikan alur bulan ini.
Di hari ketika uang hampir tidak bergerak, kebiasaan kecil membuat perbedaan.
Pembelian yang sudah direncanakan boleh dilakukan hari ini.
Menyelaraskan tanggal pemasukan dan pembayaran memudahkan bulan depan.
Hari yang tenang baik untuk merapikan keuangan yang selama ini kamu tunda.
Memisahkan uang yang dibelanjakan dan yang tidak hari ini memberimu patokan.
Hari ini penyesuaian kecil lebih cocok daripada keputusan besar.
Jika butuh sesuatu, membandingkan harga dulu tidak akan membuatmu terlambat.
Keberuntungan uang merata, jadi kamu bisa sedikit menaikkan porsi tabungan.
Kekhawatiran soal uang terlihat lebih sederhana saat ditulis dalam angka.
Hari ini pengelolaan yang konsisten lebih berharga daripada ambisi besar.
Tandai hari gajian atau pelunasan di kalender untuk melihat alurnya.
`),
    L(`
Di hari dengan alur baik, tentukan dulu ke mana uang yang masuk pergi, dan ia bertahan lebih lama.
Hari ini pembicaraan soal uang yang kamu tunda cenderung berjalan baik.
Pekerjaan sampingan kecil atau berbagi keahlian bisa berubah menjadi penghasilan.
Jika melihat syarat yang bagus, catat dan periksa hari ini.
Makin baik keberuntungan uangmu, makin bermanfaat mencatat untuk lain kali.
Hari yang baik untuk memakai poin atau manfaat yang sudah terkumpul.
Pindahkan sebagian kelebihan hari ini ke dana daruratmu, dan hatimu tenang.
Jika ada yang perlu dinegosiasikan, sampaikan dengan jelas syarat yang kamu inginkan.
Bahkan saat uang mengalir baik, pikirkan dua kali pengeluaran besar yang tak terencana.
Bersyukur atas yang masuk cenderung menarik alur berikutnya.
Catat keuntungan kecil hari ini dengan senyuman.
Membagikan informasi bagus kepada orang di sekitarmu memperluas peluangmu.
`),
  ],
  why: {
    pyeon: L(`
Kekayaan Tak Terduga datang, jadi uang yang berpindah tangan makin cepat.
Kekayaan Tak Terduga hidup, jadi peluang muncul dalam transaksi dan penjualan.
Berkat Kekayaan Tak Terduga, pembicaraan uang cenderung datang lewat orang.
Hari ini Kekayaan Tak Terduga masuk, jadi makin aktif kamu, makin besar alurnya.
Kekayaan Tak Terduga bergerak, jadi uang di luar penghasilan tetap menonjol.
Kekayaan Tak Terduga meluas, saat yang baik untuk menemukan sumber penghasilan baru.
Kekayaan Tak Terduga menguat, jadi kegiatan di luar cenderung membuahkan hasil.
Kekayaan Tak Terduga datang, jadi kamu bisa menangani jumlah yang lebih besar.
Kekayaan Tak Terduga terbuka, jadi nalurimu dalam tawar-menawar tajam.
Kekayaan Tak Terduga bersinar, jadi manfaat tak terduga bisa masuk.
Dengan Kekayaan Tak Terduga di sini, makin luas pergaulanmu, makin luas jalan uangmu.
Kekayaan Tak Terduga sedang mengudara, jadi bergerak adalah pilihan terbaik hari ini.
`),
    jeong: L(`
Kekayaan Tetap datang, jadi kerja tekun cenderung kembali sebagai imbalan.
Kekayaan Tetap mantap, jadi pengelolaan uang yang terencana sangat cocok.
Kekayaan Tetap menguat, jadi penghasilan rutin terkumpul dengan rapi.
Hari ini Kekayaan Tetap masuk, jadi ketekunan berubah menjadi kekayaan.
Berkat Kekayaan Tetap, pelunasan dan pembayaran cenderung berjalan baik.
Kekayaan Tetap hidup, jadi kemampuanmu menabung dengan cermat bertambah.
Kekayaan Tetap bergerak, jadi uang yang dijanjikan cenderung datang tepat waktu.
Kekayaan Tetap mengalir baik, jadi anggaran yang kamu tetapkan cenderung terpenuhi.
Kekayaan Tetap datang, baik untuk menyeimbangkan biaya hidup dan tabungan.
Kekayaan Tetap kokoh, jadi uang kecil pun tidak terlewat.
Kekayaan Tetap mapan, jadi hari ini pilihan yang masuk akal membuahkan hasil.
Dengan Kekayaan Tetap di sini, uang cenderung bergerak lewat tempat yang tepercaya.
`),
    bad: L(`
Bintang Kekayaan datang tetapi berat, jadi makin kamu genggam, makin banyak yang lepas.
Energi Kekayaan membebanimu, jadi memikirkan uang bisa melelahkan.
Kekayaan datang tetapi sulit dikelola, jadi rencana yang ambisius bisa meleset.
Bintang Kekayaan bertindak sebagai beban, jadi tekanan pengeluaran bisa bertambah.
Energi Kekayaan masuk kuat, jadi keserakahan bisa mendahului penilaian.
Hari ini bintang Kekayaan berdesakan, jadi urusan uang bisa menuntut lebih banyak perhatian.
Bintang Kekayaan menekanmu, jadi hari ini membantu untuk mundur selangkah.
Energi Kekayaan meluap, jadi kemampuanmu mengelolanya bisa kurang.
Kekayaan masuk sebagai beban, jadi hati-hati dengan jumlah besar.
Bintang Kekayaan berat, jadi hari ini menjaga lebih berharga daripada membelanjakan.
Energi Kekayaan terlalu banyak untuk dipikul, jadi jauhi urusan uang orang lain.
Kekayaan datang, tetapi jaga dulu energi dan suasana hatimu untuk melindungi uangmu.
`),
    rob: L(`
Pesaing datang, jadi uang bisa terjerat dengan orang-orang terdekat.
Pesaing kuat, jadi persaingan bisa menaikkan pengeluaran.
Hari ini Pesaing bergerak, jadi bagianmu dari biaya bersama bisa bertambah.
Pesaing menyusup, jadi permintaan orang lain bisa membuka dompetmu.
Dengan Pesaing di dekatmu, menjaga bagianmu butuh batas yang jelas.
Pesaing datang, jadi kamu bisa berbelanja hanya demi gengsi.
Pesaing menguat, jadi hati-hati dengan kemitraan atau investasi bersama.
Pesaing sedang mengudara, jadi hitungan yang kabur cenderung merugikanmu.
Hari ini Pesaing masuk, jadi biaya kelompok bisa lebih besar dari perkiraan.
Pesaing bergerak, jadi kamu bisa terbawa pengeluaran orang lain.
Dengan Pesaing di dekatmu, hindari meminjamkan uang hari ini.
Pesaing hadir, jadi tuliskan janji soal uang agar aman.
`),
    output: L(`
Ekspresi hidup, jadi keterampilan dan idemu bisa berubah menjadi penghasilan.
Energi Ekspresi mengalir ke kekayaan, jadi nilai kerjamu diakui.
Ekspresi bergerak, jadi penjualan dan promosi cenderung membuahkan hasil.
Hari ini Ekspresi mendukung kekayaan, jadi makin banyak kamu menunjukkan kemampuan, makin baik.
Ekspresi datang, jadi pekerjaan sampingan atau berbagi keahlian bisa menjadi uang.
Berkat Ekspresi, kata-kata dan tulisanmu bisa terhubung dengan penghasilan.
Hari ini Ekspresi memberi makan Kekayaan, jadi apa yang kamu buat cenderung laku.
Ekspresi sedang hidup, jadi ide penghasilan baru mudah datang.
Ekspresi mengalir baik, hari yang baik untuk memoles layanan atau produkmu.
Ekspresi datang, saat yang baik untuk menetapkan ulang harga keahlianmu.
Ekspresi hidup, jadi hasil terlihat sebanding dengan usaha.
Hari ini Ekspresi membawa ke kekayaan, jadi menuntaskan pekerjaan membawa imbalan.
`),
    doc: L(`
Sumber Daya datang, jadi kontrak dan catatan membantu merapikan urusan uang.
Berkat Sumber Daya, uang yang dipastikan secara tertulis dapat diandalkan.
Sumber Daya bergerak, jadi urusan seperti asuransi, pengembalian dana, atau bantuan cenderung beres.
Hari ini Sumber Daya masuk, jadi apa yang kamu pelajari membantu melindungi uangmu.
Sumber Daya mengalir baik, hari yang baik untuk membaca syarat kontrak dengan tenang.
Sumber Daya menguat, jadi nasihat para tetua membantu keuanganmu.
Dengan Sumber Daya di dekatmu, janji tertulis punya bobot.
Sumber Daya datang, baik untuk merapikan dokumen rumah atau pembelian besar.
Sumber Daya hidup, hari yang baik untuk belajar tentang uang.
Berkat Sumber Daya, memeriksa lebih menguntungkan daripada terburu-buru.
Sumber Daya bergerak, baik untuk menyelesaikan urusan kepemilikan atau kontrak.
Dengan Sumber Daya di sini, menyimpan struk dan catatan sudah termasuk mengelola uang.
`),
    none: L(`
Hari ini bintang Kekayaan beristirahat, jadi menjaga pengeluaran biasa sudah cukup.
Hari ini energi uang tenang, jadi tidak perlu harapan besar atau kekhawatiran besar.
Energi uang tidak bergerak, jadi anggaran yang kamu tetapkan adalah panduan terbaik.
Bintang Kekayaan tenang, jadi tinjau rencana yang ada daripada memulai yang baru.
Hari ini energi uang tenang, jadi hidup sesuai kebiasaanmu berjalan baik.
Energi Kekayaan hampir tidak masuk atau keluar, baik untuk mengelola dengan tenang.
Bintang Kekayaan menarik napas, jadi tidak perlu terburu-buru.
Hari ini alur uang datar, jadi tabungan kecil tetap bersamamu.
Energi Kekayaan tenang, jadi kamu bisa menyingkirkan pikiran soal uang sejenak.
Bintang Kekayaan diam di tempat, jadi cukup tambal kebocoran.
Hari ini sedikit perubahan di urusan uang, baik untuk merapikan dan meninjau.
Energi Kekayaan tenang, jadi cukup hindari pengeluaran tak terencana.
`),
  },
  caution: L(`
Sebelum membayar, tanyakan sekali lagi apakah kamu benar-benar membutuhkannya.
Periksa dengan cermat biaya kecil seperti biaya admin dan ongkos kirim.
Catat tanggal berakhirnya uji coba gratismu.
Jangan buka permintaan pembayaran yang datang lewat tautan tidak dikenal.
Hari ini hindari menjadi penjamin siapa pun.
Jangan terburu-buru membayar hanya karena tertulis edisi terbatas.
Untuk janji yang melibatkan banyak uang, periksa kontraknya lebih dulu.
Hati-hati agar tidak menghabiskan limit kartumu.
Tentukan sebelumnya cara membagi biaya kelompok.
Tunda pembelian yang kebijakan pengembaliannya belum kamu periksa.
Periksa dua kali nomor rekening sebelum mengirim.
Pindahkan belanja di hari suasana hati sedang turun ke besok.
Hari ini waspadai terutama apa pun yang menjanjikan keuntungan pasti.
Jangan langsung menjawab saat diminta meminjamkan uang.
Tunda pembelian besar yang harganya belum kamu bandingkan.
Simpan struk dan catatan transaksi, jangan dibuang.
Jangan bagikan PIN pembayaran aplikasimu kepada siapa pun.
Isi saldo dompet digital hanya sebanyak yang dibutuhkan.
Periksa apakah langganan lama masih aktif.
Hari ini hindari membayarkan atas nama orang lain.
Saat pembicaraan soal uang memanas, berhentilah sejenak.
Hati-hati dengan tagihan makan atau minum yang bergantung pada suasana.
Pastikan tanggal transfer otomatis sesuai dengan saldomu.
Jangan buru-buru mencari pinjaman.
Periksa apakah harga yang sangat murah punya jebakan.
Untuk patungan atau tagihan bersama, tetapkan jumlahnya lebih dulu.
Bertindaklah atas saran uang dari orang lain hanya setelah kamu memeriksanya sendiri.
Hari ini tunda membuka kartu atau metode pembayaran baru.
Hari ini jauhi taruhan kecil atau uang yang bergantung pada untung-untungan.
Jaga pengeluaran untuk hadiah tetap dalam anggaran.
Periksa pesanan dan pengirimanmu sekali lagi.
Kirim uang muka atau DP hanya setelah memeriksa syaratnya.
Pembayaran yang dilakukan saat lelah cenderung ada kesalahan.
Lihat sisa cicilan bersama tagihan bulan ini.
Catat janji soal uang meski dengan keluarga atau teman.
Pastikan tidak lupa membawa dompet dan kartu.
`),
  tip: L(`
Tambahkan catatan satu baris pada setiap pengeluaran hari ini.
Aktifkan notifikasi aplikasi anggaranmu, meski hanya sehari.
Keluarkan dari dompet kartu yang tidak pernah kamu pakai.
Tetapkan anggaran mingguan dan bagi menjadi jumlah harian.
Buat daftar terpisah untuk barang yang ingin dibeli.
Pindahkan uang receh dan jumlah kecil ke rekening tabungan terpisah.
Tulis biaya tetap bulan ini dalam satu halaman.
Saat dorongan datang, hitung sampai sepuluh dan pikirkan lagi.
Ganti satu kali makan di luar dengan masakan rumah.
Jual barang bekas yang sudah tidak kamu pakai.
Tetapkan target jumlah untuk dana daruratmu.
Melihat kapan kamu berbelanja menunjukkan kebiasaanmu.
Lihat isi kulkas sebelum pergi belanja.
Memakai satu metode pembayaran saja membuat alurnya lebih mudah dilihat.
Pisahkan pengeluaran menjadi wajib, ingin, dan bisa dilewati.
Biasakan menabung lebih dulu di hari gajian.
Catat di kotak kecil berapa yang kamu hemat hari ini.
Pastikan tidak membeli barang yang sama dua kali.
Tulis tujuan keuanganmu dalam satu kalimat.
Biasakan langsung memeriksa notifikasi pengeluaran.
Pilih hadiah berdasarkan niat, bukan harga.
Tetapkan anggaran terpisah untuk kesenangan kecil.
Jika ongkos kirim mengganggu, pesan untuk diambil sendiri.
Tinjau tagihan lama seperti paket ponsel atau asuransi.
Pilih satu hari tanpa belanja minggu ini.
Tandai di kalender hari uang masuk dan keluar.
Menyimpan foto struk di satu tempat memudahkan merapikan.
Foto barang yang kamu inginkan dan lihat lagi seminggu kemudian.
Nikmati keseruan menabung dalam jumlah kecil.
Tinjau pengeluaranmu di tanggal yang sama setiap bulan.
Periksa apakah ada pengembalian dana atau uang yang menjadi hakmu.
Tanyakan apakah barang yang lama di keranjang benar-benar dibutuhkan.
Pastikan tidak ada langganan serupa yang tumpang tindih.
Saat target tabungan tercapai, beri dirimu tepukan kecil di punggung.
Baca buku atau artikel tentang uang.
Pilih pos pengeluaran terbesar dan pangkas.
`),
  act: [
    L(`
Biarkan keranjang belanjamu seperti apa adanya selama sehari.
Tulis dalam angka sisa anggaran minggu ini.
Lihat lagi lima pembayaran terakhirmu.
Pegang hanya satu rencana yang memakan biaya hari ini dan tunda sisanya.
Buka daftar pembayaran otomatis dan batalkan setidaknya satu.
Hari ini pakai hanya uang tunai atau kartu debit.
Cocokkan pengeluaran hari ini dengan struk di dompetmu.
Catat uang yang kamu pinjamkan atau yang menjadi hakmu.
Tahan pembayaran tak terencana hari ini.
Matikan notifikasi aplikasi belanja sejenak.
Pindahkan satu pengeluaran besar bulan ini ke bulan depan.
Jika uang membuatmu khawatir, uraikan situasinya dalam angka.
`),
    L(`
Bagi pengeluaran bulan ini ke dalam kategori sederhana.
Periksa jumlah transfer otomatis tabunganmu.
Lihat apakah ada poin yang belum dipakai.
Catat sebelumnya pengeluaran yang direncanakan minggu depan.
Cocokkan saldo rekeningmu dengan tagihan kartu yang akan datang.
Pindahkan meski jumlah kecil ke rekening tabungan.
Buat daftar belanja dan beli persis itu.
Tinjau ulang target tabungan bulan ini.
Bandingkan harga dan beli satu barang yang benar-benar dibutuhkan.
Rampungkan catatan anggaran seminggu sekaligus.
Buka rincian tagihan asuransi atau ponselmu.
Jika bulan depan ada pengeluaran besar, sisihkan dananya sekarang.
`),
    L(`
Jika ada uang atau pengembalian dana yang menjadi hakmu, tagih hari ini.
Tulis satu cara konkret untuk menambah penghasilan.
Pindahkan sebagian dari yang masuk langsung ke dana darurat.
Jika melihat produk dengan syarat bagus, bandingkan dengan cermat.
Cari pekerjaan sampingan yang memanfaatkan bakatmu.
Bersiaplah membicarakan gaji atau tarifmu.
Catat keuntungan hari ini dan tentukan peruntukannya.
Kirim hari ini penawaran atau tagihan yang kamu tunda.
Tetapkan target tabungan jangka panjang.
Luangkan satu jam untuk belajar tentang uang.
Ucapkan terima kasih kepada orang yang memberitahumu penawaran bagus.
Rencanakan apa yang akan dilakukan dengan sisa uang bulan ini.
`),
  ],
};
