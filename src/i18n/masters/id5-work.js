// Tab Hari Ini · baris pekerjaan & studi, perluasan 5× (ditambahkan ke set yang ada). Satu baris = satu kalimat
const L = s => s.trim().split('\n').map(x => x.trim()).filter(Boolean);
export default {
  flow: [
    L(`
Hari ini urutan tugas bisa terus kusut.
Hari ini permintaan tak terduga cenderung menyela.
Hari ini fokusmu mudah buyar.
Hari ini usaha mungkin tidak langsung membuahkan hasil.
Hari ini tekanan tenggat bisa terasa berat.
Hari ini kesalahan kecil bisa menambah beban kerja.
Hari ini perbedaan pendapat bisa memperlambat pekerjaan.
Hari ini alur kerja terasa berat.
Hari ini tugas yang direncanakan bisa selesai setengah jalan saja.
Hari ini apa yang kamu pelajari mungkin tidak melekat dengan baik.
Hari ini tanggapan yang ditunggu bisa datang terlambat.
Hari ini beban kerjamu bisa terasa lebih besar dari biasanya.
Hari ini keputusan tertunda dan bisa terasa menjengkelkan.
Hari ini terburu-buru bisa membuatmu harus mengulang.
Hari ini pekerjaan menuntut daya tahan.
Hari ini salah paham kecil bisa membuat pekerjaan kusut.
Hari ini perangkat atau perangkat lunak bisa bermasalah.
Hari ini penilaian bisa membebani pikiranmu.
Hari ini perubahan jadwal bisa merusak ritmemu.
Hari ini bertahan lebih baik daripada mencoba hal baru.
Hari ini kelelahan bisa menurunkan fokus kerja.
Hari ini bisa muncul saat-saat kamu butuh bantuan.
Hari ini hasil mungkin tidak menonjol, dan itu bisa mengecewakan.
Hari ini ketepatan lebih penting daripada kecepatan.
`),
    L(`
Hari ini pekerjaan mengalir sesuai urutannya.
Hari ini alur kerja seperti biasa.
Hari ini studi dan pekerjaan sama-sama berjalan tanpa beban.
Hari yang baik untuk menyelesaikan pekerjaan tanpa kejutan.
Hari ini ritme kerjamu tetap mantap.
Hari ini kemajuan cenderung sesuai rencanamu.
Hari ini cukup mengerjakan bagianmu dengan baik.
Hari ini tugas diam-diam menumpuk lalu tertata.
Hari ini kebiasaan sehari-hari menciptakan hasil.
Hari ini konsistensi bersinar lebih terang daripada kemenangan besar.
Hari yang baik untuk menyeimbangkan pekerjaan dan studi.
Hari ini kamu dan rekan kerja cukup seirama.
Kecepatan kerja pas dan pikiranmu tenang.
Hari yang baik untuk mencentang tugas kecil satu per satu.
Pekerjaan hari ini bergerak dalam batas yang kamu harapkan.
Hari yang baik untuk merapikan dan memeriksa.
Hari kerja cenderung berlalu tanpa naik turun besar.
Hari yang tenang untuk mengulang apa yang sudah kamu pelajari.
Hari yang baik untuk menguatkan dasar-dasar pekerjaanmu.
Hari ini hasil keluar di level biasamu.
Pekerjaan mengalir merata, hari yang baik untuk membuat rencana.
Hari ini cukup melanjutkan apa yang sedang kamu kerjakan.
Hari ini rapat dan laporan cenderung selesai dengan lancar.
Hari yang baik untuk menjaga batas antara kerja dan istirahat.
`),
    L(`
Hari ini pekerjaan makin cepat.
Hari ini ide-ide mudah datang.
Hari ini usaha cenderung berubah menjadi hasil yang terlihat.
Hari ini fokusmu bertahan lama.
Hari ini kerja sama berjalan mulus.
Hari ini bahkan tugas sulit bisa menunjukkan petunjuk.
Hari ini peranmu cenderung menonjol.
Hari ini apa yang kamu pelajari langsung meresap.
Hari ini usulanmu cenderung disambut baik.
Hari ini penilaian atau presentasi bisa mendapat tanggapan baik.
Hari ini alur kerja condong ke arahmu.
Hari yang baik untuk membereskan tugas yang tertunda sekaligus.
Hari ini peluang baru bisa mengetuk pintu.
Hari ini keputusan diambil dengan cepat.
Hari ini kesempatan agar kemampuanmu diakui bisa datang.
Pekerjaan mengalir begitu lancar sampai hari terasa singkat.
Hari ini minta bantuan, dan seseorang dengan senang hati akan menolong.
Hari ini kamu bisa selangkah lebih dekat ke tujuanmu.
Hari yang baik untuk menunjukkan kemampuan di ujian atau wawancara.
Hari ini hasil kerja bisa terlihat dalam angka.
Hari yang baik untuk menunjukkan kepemimpinan.
Hari ini kamu belajar lebih cepat.
Hari ini arah pekerjaanmu terlihat jelas.
Hari ini energimu langsung tersalur ke pekerjaan.
`),
  ],
  more: [
    L(`
Hari ini curahkan energimu untuk menjaga tugas yang sudah ada daripada menerima yang baru.
Jika buntu, menjauhlah sejenak lalu lihat lagi; jalan biasanya muncul.
Hari untuk memeriksa kesalahan dalam proses, bukan dalam hasil.
Jika instruksinya samar, satu pertanyaan klarifikasi menghemat banyak waktu.
Tulis pekerjaan yang belum selesai hari ini di urutan teratas daftar besok, dan pikiranmu tenang.
Saat lelah, memindahkan keputusan penting ke sore hari adalah salah satu pilihan.
Satu kemenangan kecil mengubah alur hari.
Jika menerima kritik, catat isinya saja, bukan perasaannya.
Makin banyak tugas menumpuk, makin bermanfaat lima menit untuk menyusun urutan.
Hari ini memenuhi tenggat lebih penting daripada kesempurnaan.
Meminta bantuan bisa lebih cepat daripada menyelesaikannya sendiri.
Di hari yang melelahkan, lepaskan pikiran soal kerja setelah jam pulang.
`),
    L(`
Hari yang baik untuk menyesuaikan lagi jadwal minggu ini.
Di hari tanpa perubahan besar, perbaikan kecil membuat perbedaan besar.
Menemukan cara mengurangi pekerjaan berulang memudahkan hari esok.
Menanyakan kemajuan rekan kerja melancarkan kerja sama.
Jika sedang belajar, mengulang lebih cocok daripada materi baru hari ini.
Materi yang kamu rapikan hari ini menjadi dasar tugas berikutnya.
Meninggalkan catatan kerja membantumu mengerjakan tugas yang sama lebih cepat lain kali.
Di hari biasa, membuat sketsa tujuan berikutnya berhasil baik.
Jika ada rapat, siapkan satu pertanyaan sebelumnya.
Menetapkan tenggat kecil untuk dirimu sendiri memudahkan fokus.
Hari ini berpegang pada cara biasamu paling efisien.
Menarik garis jelas antara kerja dan istirahat menaikkan fokus besok.
`),
    L(`
Di hari dengan alur baik, kerjakan lebih dulu tugas sulit yang selama ini kamu tunda.
Ide yang kamu bagikan hari ini bisa membawa ke peluang berikutnya.
Jika ada presentasi atau laporan, buka dengan percaya diri pada poin utamanya.
Jika ditawari peran baru, pertimbangkan dengan positif.
Jika sedang belajar, hari yang baik untuk melangkah sedikit lebih jauh.
Menyebut rekan yang membantu menaikkan semangat tim.
Jika hasilnya baik, catat bagaimana kamu mencapainya.
Kepercayaan yang kamu bangun hari ini cenderung bertahan.
Jika ada yang perlu dinegosiasikan atau dikoordinasikan, coba hari ini.
Saat yang baik untuk mulai mempelajari keterampilan yang sudah lama kamu inginkan.
Jika energimu berlebih, cicil pekerjaan minggu depan.
Meski hasil terlihat, pastikan melakukan pemeriksaan akhir.
`),
  ],
  why: {
    kwan: L(`
Otoritas masuk sebagai energi yang membantu, jadi kamu mendapat kepercayaan dalam peranmu.
Otoritas hidup, saat yang baik untuk menunjukkan kemampuan di posisi yang bertanggung jawab.
Berkat Otoritas, pengakuan dari atasan cenderung mengikuti.
Hari ini Otoritas masuk, jadi mengikuti aturan terlihat baik padamu.
Otoritas bergerak, jadi pembicaraan soal promosi atau penilaian bisa muncul.
Otoritas mengalir baik, jadi tempatmu di organisasi makin kokoh.
Otoritas datang, jadi bobot peranmu bisa berubah menjadi peluang.
Otoritas berkilau, jadi kamu bisa meninggalkan kesan baik di suasana formal.
Otoritas stabil, jadi bekerja sesuai aturan membawa hasil baik.
Otoritas menguat, hari yang baik untuk mengambil peran memimpin.
Dengan Otoritas di sini, menepati janji dan tenggat adalah alat terbaikmu.
Otoritas hidup, jadi sikap yang lurus menonjol di ujian atau wawancara.
`),
    kwanBad: L(`
Otoritas masuk dengan berat, jadi tanggung jawab bisa menumpuk sekaligus.
Otoritas membebanimu, jadi tekanan seputar penilaian bisa bertambah.
Otoritas menekanmu, jadi tekanan kerja bisa terasa intens.
Otoritas bertindak sebagai beban, jadi hari ini berhati-hatilah dengan atasan.
Otoritas masuk kuat, jadi aturan dan perintah bisa melelahkanmu.
Hari ini Otoritas berdesakan, jadi tugas bisa tiba-tiba bertambah.
Otoritas terlalu banyak untuk dipikul, jadi kekhawatiran berbuat salah bisa bertambah.
Otoritas datang tetapi sulit dikelola, jadi bagilah bebannya.
Hari ini Otoritas berat, jadi hindari berkomitmen berlebihan.
Otoritas masuk sebagai beban, jadi ketegangan bisa membuat bahumu kaku.
Otoritas kuat, jadi hari ini cukup bertahan dengan mantap.
Hari ini Otoritas berat, jadi jangan terlalu memaksakan diri.
`),
    output: L(`
Ekspresi hidup, jadi rencana dan ide mudah datang.
Berkat Ekspresi, kemampuanmu meyakinkan lewat kata dan tulisan bertambah.
Hari ini Ekspresi masuk, hari yang baik untuk menghasilkan karya.
Ekspresi bergerak, jadi solusi kreatif terlintas di pikiran.
Ekspresi mengalir baik, jadi presentasi dan laporan berjalan lancar.
Ekspresi menguat, jadi pekerjaan langsung dengan tangan keluar rapi.
Ekspresi bersinar, hari yang baik untuk mencoba pendekatan baru.
Ekspresi datang, jadi makin banyak kamu mengungkapkan ide, makin banyak pintu terbuka.
Ekspresi berkilau, jadi pekerjaan kreatif atau merapikan yang tertunda berjalan baik.
Dengan Ekspresi di dekatmu, mengajari junior atau rekan juga berbobot.
Ekspresi hidup, hari yang baik untuk mengubah ide menjadi rencana konkret.
Ekspresi bergerak, jadi hari ini biarkan tanganmu bergerak lebih dulu daripada kepalamu.
`),
    study: L(`
Sumber Daya datang, jadi pengetahuan baru mudah meresap.
Berkat Sumber Daya, hari yang baik untuk belajar dengan fokus.
Sumber Daya hidup, jadi persiapan sertifikasi atau ujian mendapat momentum.
Hari ini Sumber Daya masuk, jadi dokumen dan materi tertata dengan baik.
Sumber Daya bergerak, jadi nasihat senior atau atasan cenderung membantu.
Sumber Daya mengalir baik, jadi pekerjaan yang menuntut pemikiran mendalam cocok untukmu.
Sumber Daya menguat, jadi bagian yang belum kamu pahami bisa tiba-tiba jelas.
Sumber Daya stabil, hari yang baik untuk menyelesaikan target belajar yang direncanakan.
Sumber Daya datang, hari yang baik untuk meninjau kontrak atau dokumen resmi.
Sumber Daya berkilau, jadi buku atau kuliah bisa menginspirasimu.
Dengan Sumber Daya di dekatmu, hari yang baik untuk membangun dasar dengan tenang.
Sumber Daya hidup, jadi apa yang kamu pelajari langsung menjadi keterampilan.
`),
    monthChung: L(`
Tempat kerjamu (cabang Bulan) terkena benturan, jadi arah pekerjaan bisa berubah tiba-tiba.
Cabang Bulan-mu terguncang, jadi luwes saja dengan perubahan jadwal.
Tempat kerjamu terkena benturan, jadi pembicaraan soal mutasi atau tugas baru bisa muncul.
Benturan mengenai cabang Bulan-mu, jadi cara kerjamu yang biasa bisa goyah.
Tempat kerjamu terguncang, jadi perjalanan dinas atau kerja di luar bisa muncul.
Hari ini cabang Bulan-mu terkena benturan, jadi punya rencana cadangan membantu.
Benturan mencapai tempat kerjamu, jadi permintaan mendadak bisa menyela.
Cabang Bulan-mu sedang berkonflik, jadi putuskan hanya setelah memeriksa.
Tempat kerjamu terkena benturan, jadi kabar perubahan organisasi bisa datang.
Cabang Bulan-mu terguncang, jadi melihat perubahan sebagai peluang membantu.
Dengan benturan di tempat kerjamu, urutan tugas yang berjalan bisa bergeser.
Hari ini benturan mengenai cabang Bulan-mu, jadi cadangkan berkas penting sebelumnya.
`),
    rob: L(`
Energi Sebaya datang, jadi kamu bisa berselisih pendapat dengan rekan kerja.
Sebaya bergerak, jadi gengsi bisa mendahului di saat-saat persaingan.
Energi Sebaya kuat, jadi keinginan melakukan semuanya dengan caramu bisa bertambah.
Hari ini Sebaya masuk, jadi berbagi penghargaan bisa mengganggumu.
Sebaya menguat, jadi perjelas peran dalam kerja bersama.
Dengan Sebaya di udara, kamu bisa dibandingkan dengan orang yang setara kemampuannya.
Sebaya datang, jadi keras kepala bekerja sendiri bisa memperlambat pekerjaan.
Dengan energi Sebaya di dekatmu, pendapat dalam tim perlu dikoordinasikan.
Hari ini Sebaya bergerak, jadi kerja sama membawa hasil lebih besar daripada persaingan.
Dengan Sebaya di sini, bantuan rekan bisa mempercepat pekerjaan.
Hari ini energi Sebaya kuat, jadi lembutkan nada bicaramu.
Dengan Sebaya hadir, berbagi penghargaan membangun kepercayaan.
`),
    none: L(`
Hari ini bintang pekerjaan beristirahat, jadi menangani tugas yang ditetapkan langkah demi langkah adalah yang terbaik.
Hari ini energi kerja tenang, jadi merapikan lebih cocok daripada memperluas.
Bintang pekerjaan tenang, jadi menjaga rutinitas sudah cukup.
Energi kerja diam, hari yang baik untuk membuat rencana berikutnya.
Hari ini alur kerja datar, jadi perbaikan kecil menonjol.
Bintang pekerjaan diam di tempat, hari yang baik untuk beres-beres yang tertunda.
Energi kerja tenang, baik untuk fokus pada dasar-dasar.
Bintang pekerjaan tidak bergerak, jadi tidak perlu terburu-buru mengambil keputusan besar.
Energi kerja tenang, jadi ketelitian menjadi hasil terbesarmu.
Bintang pekerjaan menarik napas, hari yang baik untuk bekerja sesuai kondisimu.
Hari ini sedikit perubahan di pekerjaan, saat yang baik untuk dipakai belajar.
Energi kerja tenang, baik untuk menyamakan langkah dengan rekan kerja.
`),
  },
  caution: L(`
Periksa dua kali tanggal dan jam tenggat.
Tinjau sekali lagi materi yang memuat angka dan satuan.
Catat notulen rapat segera setelah selesai.
Periksa nama dan versi berkas sebelum mengunggah ke folder bersama.
Jangan mengirim balasan saat emosi sedang tinggi.
Jangan menjanjikan jadwal yang belum kamu yakini.
Jangan melewatkan pemeriksaan hanya karena terburu-buru.
Hindari menunjukkan kesalahan orang lain di depan umum.
Jangan mengirim kata sandi atau data keamanan lewat aplikasi pesan.
Perjelas cakupan dan tenggat sebelum menerima pekerjaan.
Bacakan email penting sekali dengan lantang sebelum mengirim.
Mengerjakan beberapa hal sekaligus cenderung menimbulkan kesalahan.
Jangan mengutip sumber yang belum kamu periksa.
Jika instruksi atasan tidak jelas, segera tanyakan lagi.
Periksa tenggat permintaan yang datang menjelang jam pulang.
Hati-hati agar ucapan santai tidak disalahpahami.
Periksa urutan halaman sebelum mencetak atau mengumpulkan.
Isi daya laptop atau ponsel sebelumnya.
Perhatikan keamanan saat menerima berkas dari luar.
Jauhkan ponsel saat belajar.
Periksa ulang lokasi dan jam ujian atau wawancara.
Hari ini tahan menilai pekerjaan orang lain.
Tuangkan kontrak dan kesepakatan secara tertulis.
Fokus besok lebih baik daripada lembur malam ini.
Sering-seringlah menyimpan jika pekerjaanmu tidak tersimpan otomatis.
Pastikan di pagi hari bahwa jam rapat tidak berubah.
Pastikan tidak ada dokumen wajib yang terlewat.
Periksa sekali kemajuan tugas yang kamu delegasikan.
Hati-hati agar tidak tertukar antara obrolan grup dan pribadi.
Catat bahkan janji kecil agar tidak lupa.
Jangan mengambil keputusan penting saat kelelahan.
Tetap waspada terutama pada tugas yang sudah biasa.
Jangan mengandalkan orang lain untuk memeriksakan pekerjaanmu.
Jangan pendam keluhan; sampaikan dengan tenang di waktu yang tepat.
Saat jadwal bertabrakan, tetapkan prioritas lebih dulu.
Sisakan waktu perjalanan yang cukup untuk kemacetan.
`),
  tip: L(`
Pilih satu tugas terpenting di pagi hari.
Rapikan mejamu sekali sebelum mulai.
Kelompokkan tugas-tugas yang serupa.
Matikan notifikasi untuk menciptakan waktu fokus.
Sebelum pulang, rangkum pekerjaan hari ini dalam tiga baris.
Pecah tugas sulit menjadi langkah-langkah kecil.
Setelah makan siang, mulailah dengan tugas yang lebih ringan.
Simpan materi yang sering dipakai di satu tempat.
Cari segera istilah yang tidak kamu kenal dan catat.
Saat buntu, coba jelaskan kepada orang lain.
Mengosongkan kotak masuk juga menjernihkan kepala.
Hargai dirimu atas kemenangan kecil hari ini.
Sesi belajar singkat dan sering lebih lama melekat.
Tulis dalam satu baris apa yang akan kamu sampaikan sebelum rapat.
Masukkan juga waktu istirahat ke dalam jadwal.
Pertanyaan yang baik membawa hasil yang baik.
Cegah kesalahan berulang dengan daftar periksa.
Saat menyelesaikan sesuatu, catat segera tugas berikutnya.
Belajar dari kelebihan rekan kerja menumbuhkan keterampilanmu.
Jadikan sehari sebelum tenggat sebagai tenggatmu sendiri.
Tentukan apa yang bisa dikerjakan di waktu-waktu luang singkat.
Rapikan apa yang kamu pelajari seolah akan mengajarkannya.
Saat pekerjaan banyak, mulailah dari yang paling mudah dimulai.
Catat masukan dan terapkan satu per satu.
Jangan duduk terlalu lama dalam satu posisi; sering-seringlah berdiri.
Ucapkan terima kasih singkat kepada rekan yang membantumu hari ini.
Tempel target mingguanmu di catatan tempel.
Mulai tugas yang kamu hindari dengan berkata hanya sepuluh menit saja.
Atur kecerahan layar agar nyaman untuk mata.
Temukan slot waktu yang tenang dan taruh tugas sulit di sana.
Aturan penamaan berkas membuat berkas mudah ditemukan.
Catat ide bagus saat itu juga.
Saat belajar, tetapkan target waktu dan pakai timer.
Pisahkan daftar hari ini menjadi yang harus selesai dan yang bisa menunggu.
Pelajari satu pintasan di alat yang kamu pakai untuk bekerja.
Mencentang bahkan tugas kecil menumbuhkan motivasi.
`),
  act: [
    L(`
Pangkas daftar hari ini menjadi tiga tugas dan selesaikan hanya itu.
Buat daftar periksa sebelum mengumpulkan dan centang satu per satu.
Tentukan kepada siapa bertanya tentang tugas yang membuatmu buntu.
Pilih satu hal di jadwal hari ini yang bisa ditunda.
Jika berbuat salah, perbaiki segera.
Cadangkan berkas-berkas penting.
Sisipkan dua istirahat singkat dalam hari kerjamu.
Tulis ulang instruksi yang kamu terima sebagai catatan.
Periksa kalendermu apakah ada yang bertabrakan.
Hari ini selesaikan pekerjaan yang berjalan sebelum menerima yang baru.
Tulis urutan tugas di kertas sebelum mulai.
Catat satu pelajaran yang kamu dapat hari ini.
`),
    L(`
Urutkan sisa tugas minggu ini berdasarkan prioritas.
Samakan kemajuan secara singkat dengan rekan kerja.
Temukan satu cara mengurangi pekerjaan berulang.
Periksa ulang target belajar bulan ini.
Bereskan email dan pesan yang menumpuk.
Siapkan agenda rapat berikutnya lebih awal.
Rapikan folder kerjamu.
Selesaikan sisa tugas kemarin di pagi hari.
Rangkum apa yang kamu pelajari dalam satu halaman.
Buat sketsa jadwal minggu depan lebih awal.
Perbarui panduan atau catatan kerjamu.
Tutup hari dengan mencentang yang sudah selesai.
`),
    L(`
Bagikan hari ini rencana yang sudah kamu siapkan.
Pakai jam fokus terbaikmu untuk tugas tersulit.
Angkat tangan untuk peran atau proyek baru.
Beri kabar singkat kepada atasan tentang hasilmu.
Daftar sertifikasi atau kursus yang selama ini kamu tunda.
Usulkan lebih dulu tugas yang butuh kerja sama.
Tambahkan hasil hari ini ke portofoliomu.
Tetapkan target berikutnya dalam angka yang konkret.
Jika sebentar lagi ada wawancara atau ujian, berlatihlah seolah sungguhan.
Bagikan informasi berguna kepada rekan kerja.
Coba ide yang sudah lama kamu pikirkan.
Poles kalimat-kalimat kunci presentasimu.
`),
  ],
};
