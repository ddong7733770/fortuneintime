// Komentar bidang tambahan (tab Hari Ini: uang · asmara · pekerjaan/studi · kesehatan / Hana: alur asmara hari ini)
// Ditambahkan ke set dasar: flow, more, why, caution·chance·tip, act. Tingkat [0 rendah · 1 sedang · 2 baik]
export const FORTUNE_DOM = {
  wealth: {
    flow: [
      ['Kebocoran pengeluaran mudah terlihat hari ini.', 'Hari ini, beri bobot lebih pada menjaga uang daripada menghasilkannya.', 'Alur uang beristirahat sejenak hari ini.', 'Godaan belanja bisa terasa lebih besar dari biasanya.'],
      ['Uang mengalir dengan kecepatan biasanya.', 'Hari yang kemungkinan berlalu tanpa untung atau rugi besar.', 'Kamu belanja sesuai rencana dan mendapat sesuai rencana hari ini.', 'Keberuntungan uang sedang-sedang saja; cara kamu mengelolanya yang membuat perbedaan.'],
      ['Urusan uang berjalan cukup lancar hari ini.', 'Keuntungan kecil terkumpul dengan baik hari ini.', 'Peluang uang mudah terlihat hari ini.', 'Pekerjaan dengan angka cenderung berhasil baik hari ini.'],
    ],
    more: [
      ['Biaya tak terduga bisa menyelinap, jadi menyimpan sedikit cadangan membuat hati tenang.', 'Bahkan diskon yang biasanya kamu lewati layak dilihat dua kali hari ini.', 'Saat kekhawatiran uang membuatmu terburu-buru, penilaian mudah kabur, jadi luangkan waktu untuk memutuskan.'],
      ['Cukup seimbangkan biaya tetap dan penghasilan, dan hari berlalu lancar.', 'Tidak ada perubahan besar, tetapi kebiasaan uang yang kecil bisa menggeser alur bulan ini.', 'Tentukan sebelumnya ke mana uang yang masuk akan pergi, dan hari terasa lebih rapi.'],
      ['Jika ada pelunasan atau uang yang menjadi hakmu, menagihnya hari ini cenderung berhasil.', 'Ada ruang juga untuk uang tak terduga, seperti penghasilan sampingan atau bonus.', 'Buat rencana tabungan selagi alurnya baik, dan energi ini bertahan lebih lama.'],
    ],
    why: {
      pyeon: ['Energi Kekayaan Tak Terduga datang, jadi peluang uang yang berputar dan transaksi menonjol.', 'Kekayaan Tak Terduga bergerak hari ini, jadi penghasilan sampingan atau keuntungan kejutan layak diharapkan.'],
      jeong: ['Energi Kekayaan Tetap datang, jadi imbalan cenderung sesuai dengan usaha jujurmu.', 'Kekayaan Tetap menguat hari ini, jadi uang stabil seperti gaji dan pelunasan mengalir baik.'],
      bad: ['Bintang Kekayaan datang, tetapi berat bagimu, jadi lebih baik melepaskan ambisi besar.', 'Energi Kekayaan masuk sebagai beban hari ini, jadi menjaga lebih penting daripada menghasilkan.'],
      rob: ['Energi Pesaing menyusup, jadi uang mudah bocor di antara orang-orang.', 'Pesaing bergerak hari ini, jadi hati-hati dengan meminjamkan uang atau biaya bersama.'],
      output: ['Energi Ekspresi mengubah bakat menjadi uang dengan mudah hari ini.', 'Ekspresi hidup, jadi keterampilan dan idemu mudah terhubung dengan penghasilan.'],
      doc: ['Energi Sumber Daya datang, membawa alur uang lewat dokumen atau kontrak.', 'Sumber Daya bergerak hari ini, jadi merapikan dokumen cenderung menyelesaikan urusan uang.'],
      none: ['Bintang Kekayaan sedang tenang hari ini, jadi cukup cegah pengeluaran tak terencana.', 'Energi uang tidak banyak bergerak hari ini, jadi berpegang pada kebiasaanmu menjaga semuanya lancar.'],
    },
    caution: ['Aktifkan notifikasi pembayaran kartu agar langsung menyadari kebocoran.', 'Jika teman menawarkan investasi, dengarkan saja hari ini dan putuskan nanti.', 'Periksa apakah kamu membayar langganan yang tidak kamu pakai.', 'Untuk jual beli barang bekas atau transfer, periksa dua kali data pihak lain.', 'Hindari membayar dengan cicilan hari ini.', 'Jangan tanggapi permintaan uang mendesak sebelum kamu memastikannya langsung.'],
    tip: ['Mencatat pengeluaran sekecil apa pun mulai menunjukkan alurnya.', 'Mulai kebiasaan kecil menyisihkan apa yang tidak kamu belanjakan hari ini.', 'Rapikan struk di dompet atau aplikasimu. Kamu akan melihat ke mana uang pergi.', 'Tulis kebutuhan dan keinginan secara terpisah.', 'Daripada anggaran bulanan, tetapkan anggaran untuk hari ini saja.', 'Cari manfaat yang terlupakan, seperti poin atau kupon.'],
    act: [
      ['Mulailah dengan menunda pembayaran besar satu hari.', 'Periksa pengeluaranmu dan sesuaikan lagi anggaran minggu ini.', 'Buat percakapan soal uang tetap singkat hari ini.'],
      ['Periksa sisa anggaran bulan ini.', 'Temukan satu biaya tetap yang bisa dipangkas.', 'Catat uang yang menjadi hakmu dan utangmu. Pikiranmu akan terasa lebih ringan.'],
      ['Urus pelunasan atau permintaan penawaran yang kamu tunda.', 'Hari yang baik untuk menyusun rencana tabungan.', 'Coba negosiasikan harga atau sesuaikan syarat.'],
    ],
  },
  love: {
    flow: [
      ['Hari ini, bahkan ucapan kecil mudah melukai.', 'Salah paham mudah terjadi dalam hubungan hari ini.', 'Ritmemu bisa terasa tidak selaras dengan seseorang hari ini.', 'Satu pesan saja bisa mengguncang hatimu hari ini.'],
      ['Hubungan berjalan nyaman tanpa perubahan besar.', 'Keberuntungan asmara stabil, jadi jaga ritme biasamu.', 'Lebih banyak rasa nyaman daripada debaran hari ini.', 'Waktu dengan orang-orang yang akrab mengisi hatimu hari ini.'],
      ['Energi menyenangkan datang untuk asmara hari ini.', 'Percakapan mengalir dan hati mudah mendekat hari ini.', 'Pertemuan baru atau kemajuan hubungan layak diharapkan.', 'Perasaanmu tersampaikan sebanyak kamu mengungkapkannya hari ini.'],
    ],
    more: [
      ['Cobalah membaca maksudnya sebelum nadanya, dan kamu akan menghindari pertengkaran yang tidak perlu.', 'Saat emosi naik, beri sedikit waktu sebelum membalas.', 'Daripada memendam rasa sakit sendirian, bagikan dengan ringan.'],
      ['Kebaikan kecil sehari-hari terasa lebih besar dari acara istimewa apa pun hari ini.', 'Saat yang baik untuk melihat kembali hubunganmu dan memikirkan apa yang kamu syukuri.', 'Jika kamu lajang, waktu santai merawat diri bisa memanggil jodohmu berikutnya.'],
      ['Waktu yang tepat untuk mengatakan apa yang biasanya tidak bisa kamu ucapkan.', 'Kamu mudah meninggalkan kesan baik di pertemuan dan perjodohan.', 'Bersama pasangan, tempat atau pengalaman baru menambah percikan.'],
    ],
    why: {
      star: ['{star} datang kuat, jadi alur jodoh menjadi hidup.', '{star} datang hari ini, jadi jarak dengan orang yang kamu sukai mudah menyempit.'],
      bad: ['Bintang jodoh datang sebagai energi berat, jadi mudah berlebihan dalam hubungan hari ini.', 'Energi jodoh terasa berat, jadi seimbangkan daya tarik dengan kehati-hatian.'],
      dohwa: ['Energi Bunga Persik datang, jadi mata orang mudah tertuju padamu.', 'Bunga Persik bergerak hari ini, jadi pesonamu terlihat alami.'],
      dayHap: ['Tempat pasanganmu (cabang Hari) selaras, jadi ikatan dekat makin kuat.', 'Harmoni menyentuh cabang Hari-mu, jadi waktu bersama mengalir nyaman.'],
      dayChung: ['Tempat pasanganmu (cabang Hari) terkena benturan, jadi makin dekat orangnya, makin hati-hati kata-katamu.', 'Cabang Hari-mu goyah hari ini, jadi rencana dengan pasangan bisa bersilang.'],
      stemHap: ['Energi bersatu dengan Tuan Hari-mu, jadi kamu bisa merasa tertarik atau klop dengan seseorang.', 'Tuan Hari-mu bersatu hari ini, jadi pintu jodoh mudah terbuka.'],
      none: ['Bintang jodoh sedang tenang, hari yang baik untuk menguatkan yang sudah ada.', 'Hari ini untuk menjaga hubungan yang akrab tetap hangat daripada mencari angin baru.'],
    },
    caution: ['Hindari percakapan yang mengungkit masa lalu hari ini.', 'Jangan menilai perasaan dari kecepatan balasan.', 'Membandingkannya dengan orang lain sangat mudah melukai hari ini.', 'Jangan memikirkan cerita yang belum pasti.', 'Jika emosi tersulut, tidak apa-apa melanjutkan pembicaraan besok.', 'Jangan salah menilai hanya dari apa yang kamu lihat di media sosial.'],
    chance: ['Obrolan dengan seseorang yang menghubungimu setelah lama bisa berjalan menyenangkan.', 'Ajakan ringan untuk makan bersama menciptakan alur yang baik.', 'Tidak apa-apa menunjukkan perasaanmu hari ini.', 'Jodoh bisa terbentuk di komunitas hobi atau kelompok belajar.', 'Puji kelebihannya secara spesifik.', 'Hadiah kecil atau catatan tulisan tangan bisa sangat menyentuh hati seseorang.'],
    tip: ['Cukup menanyakan harinya lebih dulu melembutkan hubungan.', 'Wajah dan matamu berbicara lebih banyak dari kata-kata.', 'Jangan menahan ucapan “terima kasih” yang sederhana.', 'Jalan singkat bersama bisa lebih baik daripada obrolan panjang.', 'Merawat diri sendiri adalah awal dari hubungan yang baik.', 'Turunkan sedikit harapan, dan kebahagiaan kecil terasa lebih besar.'],
    act: [
      ['Hari ini, lakukan percakapan di mana kamu mendengarkan daripada menyelesaikan.', 'Sampaikan rasa sakit dengan lembut, memakai kalimat “Aku merasa…”.', 'Ambil waktu sendiri untuk merapikan perasaanmu.'],
      ['Kirim pesan singkat menanyakan kabar pada orang terdekat.', 'Buat rencana kecil yang bisa kalian lakukan bersama.', 'Ucapkan terima kasih yang belum sempat kamu sampaikan.'],
      ['Hubungi lebih dulu orang yang ada di pikiranmu.', 'Pilih tempat baru untuk kencanmu.', 'Jika diundang ke sebuah pertemuan, datanglah.'],
    ],
  },
  work: {
    flow: [
      ['Pekerjaan mungkin tidak berjalan sesuai rencana hari ini.', 'Kesalahan kecil mudah terjadi, jadi memeriksa dua kali itu penting hari ini.', 'Pekerjaan bisa terasa lebih lambat dari biasanya.', 'Saat-saat sulit fokus pada pekerjaan atau belajar bisa muncul.'],
      ['Pekerjaan dan studi mengalir stabil hari ini.', 'Hari yang baik untuk mengerjakan tugas selangkah demi selangkah.', 'Hasil sesuai dengan kemampuan biasamu hari ini.', 'Hari kemungkinan selesai tanpa kejutan.'],
      ['Hari untuk mengharapkan hasil baik dalam pekerjaan.', 'Fokus tinggi, jadi belajar dan bekerja efisien hari ini.', 'Pendapatmu diterima dengan baik hari ini.', 'Alur yang lumayan untuk memulai sesuatu yang baru.'],
    ],
    more: [
      ['Periksa dua kali faktanya sebelum mengambil keputusan penting.', 'Jika tenggat bertumpuk, mulailah dengan menyusun ulang prioritas.', 'Hari ini, mengurangi kesalahan adalah kemenangan lebih besar daripada mencoba hal baru.'],
      ['Cukup berpegang pada rutinitasmu bisa menjadikannya hari yang baik.', 'Bereskan tugas kecil yang kamu tunda, dan besok terasa lebih ringan.', 'Berbagi informasi dengan rekan membuat pekerjaan berjalan lebih lancar.'],
      ['Jika kamu sudah mempersiapkan sesuatu, ini waktu yang tepat untuk menunjukkannya hari ini.', 'Bahkan tugas berat menunjukkan jalan keluar saat kamu menghadapinya langsung.', 'Apa yang kamu raih hari ini cenderung dihitung baik dalam penilaian.'],
    ],
    why: {
      kwan: ['Energi Otoritas menguat, jadi rasa tanggung jawabmu dihargai.', 'Otoritas datang hari ini, jadi urusan dengan senior cenderung berjalan lancar.'],
      kwanBad: ['Otoritas masuk dengan berat, jadi tekanan dan ketegangan kerja bisa bertambah.', 'Otoritas terasa berat, jadi tanggung jawab menumpuk padamu hari ini.'],
      output: ['Energi Ekspresi hidup, jadi ekspresi dan idemu menonjol.', 'Ekspresi bergerak, hari yang baik untuk menghasilkan karya.'],
      study: ['Energi Sumber Daya datang, jadi belajar dan memahami terasa cepat.', 'Sumber Daya menguat, hari yang baik untuk fokus belajar ujian atau sertifikasi.'],
      monthChung: ['Cabang Bulan-mu (tempat kerja) terkena benturan, jadi perubahan jadwal atau perpindahan mudah terjadi.', 'Tempat kerjamu goyah hari ini, jadi bersiaplah untuk perubahan mendadak di pekerjaan.'],
      rob: ['Energi Sebaya menguat, jadi persaingan atau perbedaan pendapat mudah terjadi.', 'Sebaya bergerak, jadi keinginan menjaga bagianmu bertambah hari ini.'],
      none: ['Bintang pekerjaan tenang hari ini, jadi menangani segala sesuatu sesuai urutan paling berhasil.', 'Hari ini, konsistensi menciptakan hasil lebih dari perubahan besar.'],
    },
    caution: ['Periksa ulang penerima dan lampiran sebelum mengirim email.', 'Catat instruksi yang kamu terima secara lisan.', 'Periksa sebelumnya agar jadwalmu tidak bertabrakan.', 'Tanyakan daripada menebak hal yang tidak kamu ketahui.', 'Tinjau lagi keesokan harinya keputusan yang diambil saat lelah.', 'Pastikan mencadangkan berkas penting.'],
    tip: ['Selesaikan tugas berat di awal pagi.', 'Fokus 25 menit dan istirahat 5 menit cocok untuk hari ini.', 'Merapikan meja juga menjernihkan kepala.', 'Tulis apa yang kamu pelajari hari ini dalam satu baris.', 'Jika ada yang membantumu, tinggalkan ucapan terima kasih singkat.', 'Tulis tiga tugas untuk besok sebelumnya.'],
    act: [
      ['Fokus menyelesaikan pekerjaan yang sedang berjalan daripada tugas baru hari ini.', 'Buat daftar periksa untuk bagian yang sering kamu lalaikan.', 'Minta bantuan sejak awal di bagian yang kamu butuhkan.'],
      ['Periksa ulang target minggu ini.', 'Bagikan kabar perkembangan singkat dengan rekan.', 'Selesaikan merapikan materi yang kamu tunda.'],
      ['Keluarkan usulan atau ide yang sudah kamu siapkan.', 'Urus presentasi atau pengumpulan penting hari ini.', 'Saat yang baik untuk memulai belajar baru atau persiapan sertifikasi.'],
    ],
  },
  health: {
    flow: [
      ['Kelelahan mudah menumpuk hari ini, jadi jangan memaksakan diri.', 'Hari untuk mendengarkan sinyal tubuhmu.', 'Kamu bisa lebih mudah lelah dari biasanya hari ini.', 'Hari untuk memperhatikan kondisimu.'],
      ['Kesehatan mengalir stabil.', 'Tubuhmu kurang lebih sama seperti biasa hari ini.', 'Selama tidak memaksakan diri, hari yang nyaman.', 'Rutinitas teratur menjaga kondisimu hari ini.'],
      ['Tubuhmu terasa ringan dan bugar hari ini.', 'Hari yang baik untuk mulai berolahraga atau beraktivitas.', 'Kamu dalam kondisi baik dan bisa menjalani hari dengan energi.', 'Tubuh dan pikiran mudah menemukan keseimbangan hari ini.'],
    ],
    more: [
      ['Jika kurang tidur, utamakan tidur lebih awal.', 'Makanan ringan dan hangat lebih cocok untuk tubuhmu daripada makanan berat hari ini.', 'Jika bahu atau leher terasa kaku, lemaskan sesekali.'],
      ['Minum air yang cukup dan makan teratur sudah cukup.', 'Jalan santai atau peregangan menjaga kondisimu stabil hari ini.', 'Jika sudah lama duduk, berdirilah sekali setiap jam.'],
      ['Waktu yang tepat untuk memulai olahraga yang kamu tunda.', 'Manfaatkan kondisi baikmu untuk sedikit menambah aktivitas.', 'Hari yang baik untuk membangun satu kebiasaan sehat baru.'],
    ],
    why: {
      excess: ['Energi {el} meluap, jadi {organ} bisa terbebani. Jangan memaksakan diri.', 'Energi {el}, yang sudah berlimpah, bertambah lagi hari ini, jadi rawat {organ} sedikit lebih ekstra.'],
      lack: ['Energi {el} terisi hari ini, jadi keseimbangan tubuhmu mudah pulih.', 'Energi {el} yang kurang terisi kembali, jadi kondisimu stabil.'],
      chung: ['Cabang Hari-mu terkena benturan, jadi kelelahan menumpuk atau kondisimu mudah goyah.', 'Tempatmu sendiri goyah hari ini, jadi hindari jadwal yang terlalu padat.'],
      hyeong: ['Ada energi Gesekan, jadi waspadai cedera kecil dan benturan.', 'Gesekan sedang bekerja hari ini, jadi lakukan pemanasan dengan baik sebelum berolahraga.'],
      none: ['Hari yang stabil ketika Lima Unsur tidak banyak goyah.', 'Energi tubuhmu mengalir merata hari ini.'],
    },
    tip: ['Kurangi pemakaian ponsel sebelum tidur.', 'Hangatkan dirimu dengan secangkir teh.', 'Naik tangga saja sudah olahraga yang baik.', 'Jika matamu lelah, sering-seringlah melihat ke kejauhan.', 'Awali hari dengan peregangan ringan.', 'Makan buah dan sayur musiman.'],
    act: [
      ['Hapus satu hal dari jadwalmu hari ini dan amankan waktu istirahat.', 'Jadikan tidur lebih awal sebagai target hari ini.', 'Jangan abaikan sinyal tubuhmu.'],
      ['Jalan kaki 10 menit setelah makan siang.', 'Sengaja minum air lebih sering.', 'Lakukan peregangan ringan di sore hari.'],
      ['Jalan kaki atau olahraga sedikit lebih dari biasanya.', 'Hari yang baik untuk mencoba olahraga baru.', 'Rencanakan beberapa menu makanan sehat.'],
    ],
  },
};

// Hana: alur asmara hari ini (ceria dan hangat)
export const HANA_TODAY = {
  flow: [
    ['Hatimu sedikit mudah lelah hari ini.', 'Kamu mungkin kecewa hari ini jika tanggapan tidak sesuai harapan.', 'Energi jodoh sedikit rendah hari ini.', 'Kamu mungkin merasa gelisah tanpa alasan hari ini.', 'Satu kata saja bisa lama terngiang di pikiranmu hari ini.', 'Orang-orang mungkin sedikit melelahkanmu hari ini.'],
    ['Hatimu tenang hari ini.', 'Hari ini paling baik dihabiskan bersama orang yang membuatmu nyaman.', 'Alur asmara hari ini damai.', 'Hal yang akrab lebih menarik daripada yang baru hari ini.', 'Hari yang baik untuk melihat kembali hubungan-hubunganmu.', 'Percakapan tenang cocok untuk hari ini.'],
    ['Sesuatu yang mendebarkan bisa terjadi hari ini!', 'Pesonamu terlihat alami hari ini.', 'Percakapan mengalir mudah hari ini.', 'Rasanya jodoh sudah dekat hari ini.', 'Perasaanmu tersampaikan dengan baik hari ini.', 'Sepertinya banyak hal yang membuat tersenyum hari ini.'],
  ],
  more: [
    ['Kalau begitu, jangan salahkan dirimu. Tidak apa-apa menganggapnya energi hari ini saja.', 'Dia mungkin juga sedang tidak enak hari. Beri jeda sejenak.', 'Jika hatimu terasa berat, istirahat sebentar dengan musik favoritmu.', 'Saat pikiranmu menumpuk, berbicara dengan teman yang kamu percaya membantu.', 'Rasa sakit hari ini akan terasa jauh lebih kecil besok.', 'Tidak perlu memaksakan senyum. Rawat dirimu lebih dulu hari ini.'],
    ['Meski tanpa peristiwa besar, hari seperti inilah yang membuat hubungan kokoh.', 'Hari ini, coba perhatikan salah satu kebiasaan kecilnya.', 'Jika kamu lajang, ini hari sempurna untuk waktu sendiri.', 'Meski pesan jarang, bukan berarti perasaan mendingin. Jangan khawatir.', 'Jalani seperti biasa dan tunjukkan sedikit rasa terima kasih.', 'Rasa nyaman juga wajah penting dari cinta.'],
    ['Jika ada yang ragu kamu katakan, hari ini hari yang baik untuk mengatakannya.', 'Jika bertemu orang baru, kamu akan meninggalkan kesan pertama yang hebat.', 'Jika punya pasangan, hari yang bagus untuk membuat kenangan istimewa.', 'Tanda ketertarikan yang kamu terima hari ini mungkin bukan khayalanmu.', 'Senyummu adalah senjata terbesarmu hari ini.', 'Beranilah dan melangkah satu langkah lebih dekat.'],
  ],
  why: {
    star: ['{star} datang sebagai energi yang membantumu hari ini, jadi jodoh mendarat dengan baik.', '{star} berkilau hari ini, jadi hati seseorang bisa berpaling padamu.'],
    bad: ['Bintang jodoh datang sedikit berat, jadi mudah terbawa ritme orang lain.', 'Energi jodoh terasa berat hari ini, jadi periksa dulu hatimu sendiri.'],
    dohwa: ['Bunga Persik datang, jadi hari ini kamu menarik perhatian bahkan tanpa berusaha.', 'Berkat energi Bunga Persik, suasana mudah condong ke arahmu.'],
    dayHap: ['Harmoni menyentuh tempat pasanganmu, jadi waktu bersama terasa nyaman dan hangat.', 'Harmoni masuk ke cabang Hari-mu, jadi kalian berdua seirama.'],
    dayChung: ['Tempat pasanganmu terkena benturan, jadi mudah ribut soal hal kecil.', 'Cabang Hari-mu goyah hari ini, jadi waktu bertemu atau rencana bisa bersilang.'],
    stemHap: ['Tuan Hari-mu bersatu, jadi mudah bertemu seseorang yang benar-benar memahamimu.', 'Tuan Hari-mu bersatu hari ini, jadi kesamaan mudah muncul dalam percakapan.'],
    none: ['Bintang jodoh sedang beristirahat hari ini, jadi baik untuk mencurahkan perhatian pada orang di sisimu.', 'Hari ini tentang merawat hubunganmu yang sekarang, bukan mencari yang baru.'],
  },
  caution: ['Meski ingin memeriksa ponsel atau media sosialnya, tahan diri hari ini.', 'Kata seperti “terserah” atau “sudahlah” mudah disalahartikan hari ini.', 'Lebih baik tidak mengungkit hubungan masa lalu hari ini.', 'Jangan menilai seseorang hanya dari kata temanmu.', 'Jika lelah, mengurangi rencana adalah kebaikan bagi kalian berdua.', 'Jika kesal, rapikan dulu sekali sebelum mengatakannya.'],
  chance: ['Jika ada orang yang kamu sukai, ajak minum kopi dengan santai.', 'Balas pesan yang kamu terima hari ini sedikit lebih hangat.', 'Jika teman menawarkan perjodohan, datanglah.', 'Ceritakan pada pasanganmu satu hal yang kamu syukuri hari ini.', 'Kamu bisa klop dengan seseorang di komunitas hobi.', 'Pakai pakaian yang selama ini ingin kamu kenakan. Suasana hatimu akan naik.'],
  tip: ['Cukup menatap matanya dan tersenyum.', 'Ucapan sederhana “masuk akal” membuka hati.', 'Hari ini, berterima kasihlah pada orang-orang yang mendukungmu.', 'Pesan lebih baik hangat daripada panjang.', 'Orang yang mencintai dirinya juga mudah menerima cinta.', 'Tidak perlu terburu-buru; cinta akan datang. Sungguh.'],
  act: [
    ['Berikan dirimu hadiah kecil hari ini.', 'Menuliskan perasaanmu seperti buku harian membantumu merapikannya.', 'Naikkan suasana hatimu dengan mengobrol bersama teman yang membuatmu nyaman.'],
    ['Tanyakan kabar seseorang yang sudah lama tidak kamu ajak bicara.', 'Pilih film atau tempat yang ingin kalian datangi bersama.', 'Hari ini, dengarkan ceritanya sampai selesai.'],
    ['Mulai percakapan dengan orang yang menarik hatimu.', 'Jika kencan, pilih rute yang berbeda dari biasanya.', 'Datangi pertemuan dan mengobrollah dengan orang baru.'],
  ],
};
