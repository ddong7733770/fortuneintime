// Tab Hari Ini · baris kesehatan, perluasan 5× (ditambahkan ke set yang ada). Satu baris = satu kalimat
// Tanpa diagnosis, obat, atau klaim pengobatan. Jika ada yang terasa tidak beres, arahkan ke tenaga profesional lebih dulu
const L = s => s.trim().split('\n').map(x => x.trim()).filter(Boolean);
export default {
  flow: [
    L(`
Hari ini tubuhmu mungkin sedang meminta istirahat.
Hari ini kelelahan kecil bisa menumpuk dan terasa berat.
Hari ini energimu bisa cepat habis.
Hari ini bahkan tugas biasa bisa terasa terlalu banyak.
Hari ini tubuh dan pikiranmu bisa tidak seirama.
Hari ini kondisimu sedang rendah.
Hari ini kurang tidur bisa terlihat.
Tubuhmu bisa bereaksi sensitif terhadap cuaca atau perubahan di sekitarmu.
Hari ini ketegangan cenderung menumpuk di tubuh.
Hari ini pemulihan butuh waktu lebih lama.
Memaksakan diri hari ini bisa membawa kelelahan sampai besok.
Hari ini kamu bisa mudah kedinginan.
Hari ini fokusmu bisa cepat kabur.
Hari untuk memakai tubuh dengan hemat.
Hari ini waspadai benturan atau keseleo kecil.
Hari ini jam makan bisa menjadi tidak teratur.
Hari ini kelelahan mental bisa terlihat di tubuh.
Hari ini kamu butuh istirahat lebih dari aktivitas.
Tubuhmu terasa berat dan kamu mungkin tidak ingin bergerak.
Hari untuk membagi-bagi energimu.
Hari ini kondisimu bisa sangat berbeda antara pagi dan sore.
Hari ini kelelahan bisa terlihat di wajahmu.
Hari ini tugas utama adalah menjaga staminamu.
Hari ini beristirahat justru berarti melangkah maju.
`),
    L(`
Hari ini tubuhmu menjaga ritme biasanya.
Hari ini kondisimu tidak banyak naik turun.
Hari ini tubuhmu tetap seimbang.
Hari yang baik untuk menjalani hari tanpa memaksakan diri.
Keberuntungan kesehatan biasa saja, jadi hari ini kebiasaan menentukan kondisimu.
Hari ini cukup jaga makan dan tidur.
Tubuhmu mengikuti kecepatanmu yang biasa.
Kamu bisa mengakhiri hari tanpa banyak lelah.
Hari ini tubuh dan pikiran menemukan keseimbangan yang tenang.
Hari ini aktivitas ringan cocok untukmu.
Kondisimu stabil, hari yang baik untuk menjaga rutinitas.
Hari ini kesehatan mengalir dengan tenang.
Hari yang baik untuk memeriksa kebiasaan sehari-hari.
Energimu bertahan di level yang nyaman.
Selama tidak berlebihan, ini hari yang mudah.
Hari ini rutinitas teratur membuahkan hasil.
Hari ini sinyal tubuhmu tenang.
Hari yang baik untuk menjaga olahraga biasamu.
Hari ini tidak ada perubahan besar dalam alur kesehatanmu.
Hari yang baik untuk menjalani urusan sambil mendengarkan tubuh.
Hari ini energi yang terpakai dan yang pulih kurang lebih seimbang.
Hari yang baik untuk mengusir lelah lebih awal.
Gerakan kecil sepanjang hari menjaga kondisimu.
Tubuhmu dalam kondisi cukup baik, jadi kamu bisa bergerak sesuai rencana.
`),
    L(`
Hari ini kekuatan memenuhi tubuhmu.
Hari ini kondisimu cerah.
Hari ini kamu bisa merasa ringan sejak pagi.
Makin aktif kamu, makin banyak energi yang kamu dapat.
Pemulihan kuat, jadi hari ini lelah cepat hilang.
Hari ini kegembiraan bergerak bertambah.
Energi melimpah dan hari terasa panjang.
Hari ini tubuh dan pikiran sama-sama terasa segar.
Hari ini kamu bisa merasakan manfaat olahraga dengan jelas.
Hari ini udara luar terasa sangat segar.
Hari ini fokus dan stamina sama-sama membaik.
Hari yang baik untuk mencoba aktivitas baru.
Hari ini rasa sehat terlihat di wajahmu.
Hari ini tubuhmu dalam keseimbangan yang baik.
Hari ini rasa segar setelah tidur bertahan lama.
Vitalitasmu mencerahkan orang-orang di sekitarmu.
Tubuhmu terasa ringan dan langkahmu bersemangat.
Hari yang baik untuk memulai kebiasaan sehat.
Hari ini bahkan pekerjaan fisik tidak mudah membuatmu lelah.
Hari ini tubuhmu bekerja sama dengan baik.
Energi tersebar merata dan hari terasa mudah.
Aktivitas yang membuatmu berkeringat juga menaikkan suasana hati.
Kamu merasa baik, jadi bekerja dan beristirahat sama-sama berjalan baik.
Hari ini energi kesehatan terbuka lebar.
`),
  ],
  more: [
    L(`
Hari ini pejamkan mata dan beristirahatlah beberapa menit di sela tugas.
Di hari yang berat, turunkan intensitas dan fokus pada peregangan.
Mandi air hangat sangat meredakan ketegangan.
Cukup tidak menatap layar sampai larut malam ini sudah membantu pemulihan.
Mulailah dengan tidak melewatkan makan dan makan perlahan.
Makin lelah kamu, makin perlu meraih air sebelum kafein.
Menunda dengan sopan rencana yang terlalu berat adalah cara menjaga diri.
Perhatikan langkahmu dan pelan-pelan di tangga atau jalan licin.
Hari ini jaga suhu tubuhmu dengan pakaian hangat.
Jika pikiranmu lelah, beristirahatlah sambil mendengarkan musik yang kamu sukai.
Tidur sedikit lebih awal membuat besok lebih ringan.
Hari ini dahulukan istirahat daripada pekerjaan rumah yang kamu tunda.
`),
    L(`
Berjalan sedikit lebih banyak hari ini saja sudah membuat tubuhmu senang.
Menjaga jam makan yang teratur menstabilkan kondisimu.
Biasakan mengubah posisi sekali setiap jam.
Lemaskan punggung dan bahu yang kaku dengan peregangan ringan.
Simpan botol air di dekatmu dan minum sedikit-sedikit.
Meredupkan lampu sebelum tidur cenderung memperdalam tidur.
Hari biasa baik untuk memeriksa kebiasaanmu.
Tambahkan satu sayur atau buah lagi ke harimu.
Pilih satu hal yang disukai tubuhmu dan lakukan hari ini.
Sedikit sinar matahari menaikkan suasana hati dan ritme.
Hari ini tempuh sebagian perjalanan ke kantor dengan berjalan kaki.
Di hari libur, menggerakkan tubuh sedikit membantu.
`),
    L(`
Di hari yang baik, mulailah olahraga yang selama ini kamu tunda.
Menetapkan rutinitas baru saat merasa ringan membantunya bertahan.
Tambah aktivitasmu, tetapi selalu lakukan pemanasan.
Selagi energimu baik, tetapkan satu target kesehatan.
Jadikan hari menyenangkan dengan aktivitas luar ruangan atau jalan-jalan.
Tidurlah hari ini senyenyak keringat yang kamu keluarkan.
Meski energimu berlebih, jangan lupa minum.
Mencari teman olahraga membuatnya lebih mudah dipertahankan.
Mencatat betapa baiknya perasaanmu membantu menemukan ritmemu.
Di hari yang ringan, bahkan merapikan dan bersih-bersih bisa menyenangkan.
Selagi bertenaga, rencanakan menu sehat lebih awal.
Makin banyak bergerak hari ini, makin jernih pikiranmu cenderung terasa.
`),
  ],
  why: {
    excess: L(`
Energi {el} condong ke satu sisi, jadi {organ} bisa mudah lelah.
Energi {el} bertambah pada yang sudah berlimpah, jadi jangan membebani {organ}.
Hari ini energi {el} meluap, jadi istirahatkan {organ} dan jangan berlebihan.
Hari ini energi {el} sedang tinggi, jadi perhatikan {organ}.
Banyak energi {el} bertumpuk, jadi {organ} bisa sensitif.
Hari ini energi {el} membuat timbangan miring, jadi kurangi kebiasaan yang membebani {organ}.
Hari ini energi {el} terisi penuh, jadi {organ} bisa mudah lelah.
Kelebihan energi {el} datang, jadi perlakukan {organ} dengan lembut.
Hari ini energi {el} menguat, jadi beri istirahat untuk {organ}.
Hari ini energi {el} menumpuk, jadi redakan lelah pada {organ} lebih awal.
Hari ini energi {el} bertambah, jadi jangan memforsir {organ}.
Energi {el} datang sekaligus, jadi dengarkan sinyal dari {organ}.
`),
    lack: L(`
Energi {el} yang kurang datang, jadi keseimbangan tubuhmu cenderung mapan.
Hari ini energi {el} terisi, jadi kondisimu cenderung stabil.
Energi {el} yang hilang terisi kembali, jadi tubuhmu cenderung merasa nyaman.
Hari ini energi {el} datang dan mengisi kekosongan.
Hari ini energi {el} terisi ulang, jadi pemulihan cenderung lebih mudah.
Energi {el} yang tadinya kosong masuk, dan tubuhmu menyambutnya.
Energi {el} bertambah, jadi lima unsurmu cenderung merata.
Dengan energi {el} terisi, ritme yang biasanya lemah cenderung hidup kembali.
Hari ini energi {el} datang, jadi tubuhmu cenderung terasa ringan.
Energi {el} yang kurang ditambahkan, jadi istirahat memulihkanmu dengan baik.
Energi {el} datang, hari yang baik untuk menyeimbangkan tubuh dan pikiran.
Hari ini energi {el} terisi, hari yang baik untuk memulai kebiasaan sehat.
`),
    chung: L(`
Tempat dirimu (cabang Hari) terkena benturan, jadi kondisimu bisa naik turun.
Hari ini cabang Hari-mu terguncang, jadi kamu bisa lebih mudah lelah dari biasanya.
Benturan mengenai cabang Hari-mu, jadi tidur atau ritme harian bisa terganggu.
Tempat dirimu terkena benturan, jadi ketegangan di tubuh bisa bertambah.
Cabang Hari-mu sedang berkonflik, jadi banyak bepergian bisa menumpuk kelelahan.
Hari ini cabang Hari-mu terkena benturan, jadi pastikan menyisakan jeda istirahat di antara rencana.
Tempat dirimu terguncang, jadi kelelahan mental bisa sampai ke tubuh.
Dengan benturan di cabang Hari-mu, perubahan jadwal mendadak bisa melelahkanmu.
Hari ini cabang Hari-mu terguncang, jadi hati-hati agar tidak cedera karena terburu-buru.
Tempat dirimu terkena benturan, jadi kamu butuh istirahat lebih dari biasanya.
Hari ini benturan mengenai cabang Hari-mu, jadi hindari olahraga berat.
Hari ini cabang Hari-mu sedang berkonflik, jadi menenangkan tubuh adalah jalannya.
`),
    hyeong: L(`
Ada energi Gesekan, jadi terburu-buru bisa berujung benturan hari ini.
Hari ini Gesekan datang, jadi hati-hati dengan benda tajam.
Karena energi Gesekan, cedera kecil bisa terjadi, jadi bergeraklah perlahan.
Dengan Gesekan di dekatmu, pastikan pemanasan sebelum berolahraga.
Ada energi Gesekan, jadi ketegangan bisa membuat tubuhmu kaku.
Gesekan datang, jadi perhatikan pijakanmu di tangga dan jalan.
Energi Gesekan ada di udara, jadi jangan lama-lama dalam posisi yang memaksa.
Dengan Gesekan di dekatmu, beri jarak lebih saat berkendara.
Karena energi Gesekan, kelelahan yang menumpuk bisa berujung kelalaian.
Hari ini Gesekan datang, jadi hati-hati saat mengangkat barang berat.
Ada energi Gesekan, jadi tubuh dan pikiran bisa sama-sama tegang.
Dengan Gesekan di dekatmu, utamakan keselamatan hari ini.
`),
    none: L(`
Hari ini lima unsurmu tetap seimbang, hari yang cukup baik.
Energi kesehatan tidak banyak terguncang, jadi kebiasaan biasamu sudah cukup.
Energi tubuhmu tenang, hari yang baik untuk menjaga ritme.
Lima unsur mengalir merata, jadi hari cenderung berlalu dengan nyaman.
Hari ini tidak ada perubahan besar dalam energi kesehatan, hari yang baik untuk memeriksa diri.
Energi tubuhmu tenang, jadi aktivitas ringan cocok untukmu.
Alur unsur-unsur datar, jadi cukup jangan berlebihan.
Energi kesehatan tenang, jadi pertahankan tidur dan makan yang teratur.
Energimu stabil, hari yang baik untuk melanjutkan olahraga biasamu.
Unsur-unsur seimbang, jadi sinyal tubuhmu juga tenang.
Hari ini sedikit perubahan dalam kesehatan, saat yang baik untuk menguatkan kebiasaan baik.
Energi tersebar merata di tubuhmu, jadi hari cenderung terasa mudah.
`),
  },
  tip: L(`
Setelah makan, jalan sebentar daripada langsung berbaring.
Sekali sehari, tatap langit dan tarik napas dalam.
Cuci tangan dan kaki dengan air hangat sebelum tidur.
Jaga punggung tetap tegak saat duduk.
Perbesar sedikit teks di layarmu.
Tetapkan waktu-waktu untuk minum air.
Buka jendela untuk mengganti udara kamar saat bangun.
Ganti camilan dengan buah atau kacang-kacangan.
Naik tangga satu atau dua lantai daripada lift.
Redupkan lampu satu jam sebelum tidur.
Putar leher dan bahu perlahan.
Berjemur sebentar saat jam makan siang.
Kurangi sedikit makanan asin hari ini.
Kunyah perlahan dan sampai halus.
Putar pergelangan kaki dan tangan dengan lembut.
Sekali sehari, bergeraklah mengikuti lagu yang kamu sukai.
Jemur bantal dan selimut di bawah matahari.
Hindari kafein di akhir hari.
Simpan ponsel di saku saat berjalan.
Pejamkan mata dan fokus hanya pada napas selama satu menit.
Jika tasmu berat, kurangi bebannya.
Makan satu kali dengan sup hangat.
Lakukan peregangan ringan sebelum tidur.
Jaga jam alarm tetap konsisten.
Hangatkan tubuh dengan berendam atau merendam kaki.
Sesuaikan tinggi kursi kerjamu.
Turun satu halte lebih awal saat pulang dan berjalan kaki.
Periksa jumlah langkahmu sekali hari ini.
Jika merasa dingin, pakai beberapa lapis pakaian tipis.
Buat waktu istirahat hari ini dengan teh favoritmu.
Habiskan lebih banyak waktu berdiri tegak.
Istirahat lima menit dengan mata terpejam setelah makan siang.
Menulis rencana besok sebelum tidur menenangkan pikiran.
Ubah suasana kamarmu dengan aroma yang menyenangkan.
Di akhir pekan, bangun di jam yang sama daripada membayar utang tidur.
Mulai satu kebiasaan kecil untuk tubuhmu hari ini.
`),
  // Baris terakhir di hari kesehatan rendah: ramalan bukan pengganti dokter (redaksi bergiliran)
  tipLow: L(`
Jika gejala yang sama terus kembali, temui dokter sebelum membaca ramalan apa pun.
Jika rasa tidak nyaman berlanjut, bicaralah dengan tenaga profesional sebelum mengandalkan ramalan.
Jika merasakan nyeri atau rasa tidak nyaman yang tidak biasa, sebaiknya periksakan diri ke klinik.
Ramalan hanyalah panduan, jadi jika ada yang terasa tidak beres, temui dokter lebih dulu.
Jika kelelahan tidak hilang selama berhari-hari, minta tenaga profesional memeriksa kondisimu.
`),
  act: [
    L(`
Hapus satu hal dari rencana hari ini dan beristirahatlah di waktu itu.
Tetapkan jam tidur dan pasang alarm untuknya.
Pejamkan mata dan istirahat sepuluh menit setelah makan siang.
Makan satu kali dengan makanan hangat hari ini.
Lemaskan leher dan bahu perlahan selama tiga menit.
Jalan santai daripada olahraga berat.
Kurangi rencana sore dan beristirahat di rumah.
Targetkan minum delapan gelas air.
Bersantai dengan berendam setengah badan atau mandi air hangat.
Letakkan ponsel di luar tempat tidur saat tidur.
Jika tubuh terasa berat, persingkat daftar tugas hari ini.
Tarik napas dalam dan perlahan lima kali.
`),
    L(`
Berdiri dan lakukan peregangan sekali setiap jam.
Tetapkan target langkah untuk hari ini.
Tetapkan jam makan dan patuhi.
Lakukan peregangan sepuluh menit di sore hari.
Buat rencana olahraga singkat untuk minggu ini.
Ganti satu camilan dengan yang sehat.
Rapikan tempat tidur dan berbaring lebih awal.
Isi botol air dan taruh di mejamu.
Berjemur sambil jalan-jalan saat makan siang.
Pasang pengingat untuk memperbaiki postur.
Catat apa yang kamu makan hari ini.
Keliling lingkungan rumah sore ini.
`),
    L(`
Jalan kaki atau berolahraga 20 menit lebih lama dari biasanya.
Ikuti kelas atau video olahraga yang baru.
Berkeringat ringan dengan naik tangga.
Buat janji olahraga dengan teman.
Tetapkan satu target kesehatan untuk minggu ini.
Nikmati aktivitas luar ruangan seperti bersepeda atau pendakian ringan.
Memasak dengan bahan-bahan sehat.
Buat rutinitas peregangan pagi.
Catat aktivitas hari ini di aplikasi kebugaran.
Coba gerakan yang sebelumnya tidak bisa kamu lakukan.
Manfaatkan energi baikmu untuk merapikan atau membersihkan rumah.
Periksa tanggal pemeriksaan kesehatanmu berikutnya.
`),
  ],
};
