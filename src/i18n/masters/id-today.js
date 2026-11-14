// Baris singkat untuk tab Hari Ini (kesimpulan → inti → rincian). Bidang: keuangan · asmara · pekerjaan · kesehatan
export default {
  badge: [[80, 'Hari yang luar biasa', 'good'], [68, 'Hari yang baik', 'good'], [52, 'Hari yang biasa', 'mid'], [40, 'Hari untuk berhati-hati', 'warn'], [0, 'Hari untuk beristirahat', 'warn']],
  lvl: { good: 'Baik', mid: 'Sedang', warn: 'Hati-hati' },
  sumTitle: 'Hari ini dalam 3 baris',
  sumBest: 'Bidang terbaik',
  sumCare: 'Bidang yang perlu diawasi',
  sumNone: 'Tidak ada yang perlu dikhawatirkan',
  sumHour: 'Jam terbaik',
  domTitle: 'Ramalan per bidang',
  domHint: 'Ketuk untuk rincian',
  more: 'Baca selengkapnya',
  less: 'Tampilkan lebih sedikit',
  basisFold: 'Dasar saju hari ini',
  word: {
    wealth: ['Hari bocor', 'Hari menabung', 'Hari stabil', 'Hari rezeki masuk', 'Hari berlimpah'],
    love: ['Hari bersilang', 'Hari hati-hati', 'Hari nyaman', 'Hari berdebar', 'Hari bersinar'],
    work: ['Hari bertahan', 'Hari teliti', 'Hari beres-beres', 'Hari diakui', 'Hari memimpin'],
    health: ['Hari istirahat', 'Hari santai', 'Hari stabil', 'Hari bugar', 'Hari penuh tenaga'],
  },
  care: { wealth: 'Waspadai belanja impulsif', love: 'Jaga ucapanmu', work: 'Waspadai kelalaian dan tenggat', health: 'Waspadai kelelahan' },
  lead: {
    wealth: [
      ['Uang mudah bocor hari ini. Tutup dompetmu.', 'Pengeluaran tak terduga mudah muncul. Tunda pembayaran sampai besok.', 'Kekhawatiran soal uang bisa membuatmu terburu-buru hari ini. Hindari keputusan besar.'],
      ['Godaan belanja sedang tinggi. Tunda keputusan besar sampai besok.', 'Yang masuk mudah keluar. Beli hanya yang kamu butuhkan.', 'Menjaga sama dengan menghasilkan hari ini. Awasi dulu pengeluaran kecil.'],
      ['Uang mengalir stabil. Belanja sesuai rencana sudah cukup.', 'Tidak banyak naik atau turun. Pertahankan kebiasaan menabung.', 'Ritme biasamu sudah baik. Jangan tunda penyelesaian pembayaran.'],
      ['Uang bisa datang padamu hari ini. Urus pelunasan.', 'Alur uang yang baik. Ajukan pembicaraan soal uang yang kamu tunda.', 'Keuntungan nyata terisi hari ini. Jangan lewatkan peluang kecil.'],
      ['Keberuntungan uang terbuka lebar. Raih peluang saat datang.', 'Uang dan peluang datang bersamaan. Baik untuk kontrak dan pelunasan.', 'Hari panen besar. Sisihkan sebagian dari yang masuk.'],
    ],
    love: [
      ['Hati mudah bersilang hari ini. Saat emosi memuncak, kurangi bicara.', 'Salah paham mudah terjadi. Tanyakan daripada menebak.', 'Hubungan terasa sensitif. Ambil waktu untuk dirimu sendiri.'],
      ['Terburu-buru membuat semuanya kacau hari ini. Jaga ritmemu sendiri.', 'Mengungkapkan diri bisa terasa canggung. Singkat dan ramah saja.', 'Harapan mudah melaju duluan. Tepati dulu janji-janji kecil.'],
      ['Lebih banyak rasa nyaman daripada debaran hari ini. Nikmati kemanisan sehari-hari.', 'Hubungan sedang tenang. Ucapkan satu kata terima kasih.', 'Hari yang lancar. Habiskan waktu dengan orang terdekat.'],
      ['Hati mudah terhubung hari ini. Hubungi lebih dulu.', 'Debaran sedang dalam perjalanan. Buat rencana untuk bertemu.', 'Hari yang baik untuk menunjukkan kamu menyukai seseorang. Beranilah.'],
      ['Pesonamu bersinar hari ini. Sangat baik untuk menyatakan perasaan dan berkencan.', 'Keberuntungan asmara terbuka lebar. Dekati orang yang menarik hatimu.', 'Cinta makin dalam hari ini. Ciptakan waktu yang istimewa.'],
    ],
    work: [
      ['Pekerjaan mudah kusut hari ini. Fokus pada hal dasar.', 'Tekanan berat hari ini. Bertahan juga sebuah keterampilan.', 'Kesalahan mudah membesar. Periksa dua kali.'],
      ['Hari yang butuh kehati-hatian. Periksa ulang dokumen dan tenggat.', 'Terburu-buru merugikanmu hari ini. Kerjakan sesuai urutan.', 'Hari untuk menyelesaikan yang sedang berjalan daripada memulai hal baru.'],
      ['Kamu akan menangani tugasmu dengan baik. Bereskan tunggakan.', 'Kemampuan biasamu sudah cukup. Tulis tugas untuk besok.', 'Hari yang baik untuk beres-beres. Rapikan meja dan kalendermu.'],
      ['Hari yang baik untuk diakui. Siapkan laporan dan presentasi.', 'Kerja tim berjalan baik. Minta bantuan.', 'Hasil terlihat hari ini. Angkat tangan saat peluang datang.'],
      ['Pekerjaan mengalir lancar. Kerjakan hal penting hari ini.', 'Kemampuanmu bersinar. Melangkahlah ke depan.', 'Semua yang kamu kerjakan membuahkan hasil. Buat langkah besar.'],
    ],
    health: [
      ['Tubuhmu lelah lebih dulu hari ini. Beristirahat adalah tugasmu.', 'Kondisimu menurun. Kurangi jadwalmu.', 'Memaksakan diri membawa masalah. Tidurlah lebih awal.'],
      ['Kelelahan mudah menumpuk. Sering-seringlah istirahat.', 'Hemat energimu. Hindari makan dan minum berlebihan.', 'Tubuhmu terasa berat. Lemaskan dengan peregangan ringan.'],
      ['Kondisimu stabil. Pertahankan olahraga biasamu.', 'Tubuhmu seimbang. Minum air sesering mungkin.', 'Tidak banyak masalah. Cukup jaga tidur dan makan.'],
      ['Pemulihan cepat. Bergeraklah sedikit lebih dari biasanya.', 'Energi naik. Coba olahraga baru.', 'Tubuhmu terasa ringan. Jalan kaki dan waktu di luar ruangan sangat baik.'],
      ['Penuh energi. Coba sesuatu yang menantang fisik.', 'Kondisi puncak. Lakukan olahraga yang selama ini kamu tunda.', 'Tubuh dan pikiran terasa ringan. Bergeraklah sebanyak yang kamu mau.'],
    ],
  },
  todo: {
    wealth: {
      up: ['Urus pelunasan atau pengembalian dana yang tertunda', 'Ajukan pembicaraan soal uang hari ini', 'Cari sumber penghasilan lain', 'Catat penawaran yang bagus', 'Sisihkan sebagian dari yang masuk saat itu juga', 'Bandingkan harga sekali lagi'],
      down: ['Catat pengeluaran hari ini sebelum tidur', 'Biarkan keranjang belanja sehari sebelum membayar', 'Tinjau langgananmu', 'Lihat sekilas pengeluaran tetapmu', 'Periksa arus kasmu', 'Catat hanya yang benar-benar kamu butuhkan'],
      no: ['Keputusan investasi atau pinjaman besar', 'Belanja impulsif', 'Meminjamkan uang', 'Membeli dengan cicilan'],
    },
    love: {
      up: ['Sapa lebih dulu', 'Ucapkan terima kasih dengan lantang', 'Buat rencana untuk bertemu', 'Perhatikan perubahan kecil padanya', 'Datangi pertemuan baru', 'Tunjukkan bahwa kamu menyukainya'],
      down: ['Rapikan rasa sakit hati sebelum membaginya', 'Dengarkan dia sampai selesai', 'Ambil waktu untuk dirimu sendiri', 'Baca ulang pesan sebelum mengirim', 'Berhenti sejenak saat emosi memuncak', 'Tepati dulu janji-janji kecil'],
      no: ['Keputusan emosional', 'Mengungkit masa lalu', 'Mendesak minta balasan', 'Membanding-bandingkan'],
    },
    work: {
      up: ['Sampaikan laporan penting hari ini', 'Bagikan idemu secara aktif', 'Dahulukan tugas yang butuh kerja tim', 'Angkat tangan saat peluang datang', 'Kerjakan yang sulit di jam fokusmu', 'Catat apa yang kamu pelajari hari ini'],
      down: ['Periksa dua kali dokumen dan tenggat', 'Pilih dan tulis hanya tiga tugas', 'Tanyakan langsung saat ragu', 'Selesaikan dulu yang sudah dimulai', 'Pasang pengingat untuk janji penting', 'Rapikan meja dan berkasmu'],
      no: ['Keputusan tergesa-gesa', 'Menjanjikan berlebihan', 'Menyerahkan tanpa memeriksa', 'Balasan emosional'],
    },
    health: {
      up: ['Jalan santai atau olahraga ringan', 'Berjemur sebentar', 'Mulai olahraga baru', 'Minum air sesering mungkin', 'Awali hari dengan peregangan', 'Habiskan lebih banyak waktu di luar ruangan'],
      down: ['Tidur lebih awal', 'Beri jeda di antara rencana', 'Hangatkan lambung dengan makanan hangat', 'Sering lemaskan bahu dan leher', 'Istirahatkan mata setelah lama menatap layar', 'Luangkan waktu untuk bernapas dalam'],
      no: ['Begadang semalaman', 'Makan dan minum berlebihan', 'Olahraga terlalu keras', 'Terlalu banyak kafein'],
    },
  },
};
