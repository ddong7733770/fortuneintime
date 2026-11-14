// Tab Hari Ini · baris asmara, perluasan 5× (ditambahkan ke set yang ada). Satu baris = satu kalimat
const L = s => s.trim().split('\n').map(x => x.trim()).filter(Boolean);
export default {
  flow: [
    L(`
Hari ini mengungkapkan perasaan bisa salah arah.
Hari ini tanggapannya bisa terasa lebih dingin dari biasanya.
Hari ini luka kecil mudah membengkak.
Hari ini mundur sedikit dalam hubungan terasa lebih mudah.
Hari ini suhu percakapan bisa terasa berbeda di tiap sisi.
Hari ini kamu mungkin tidak menerima kasih sayang sebanyak yang diharapkan.
Hari ini emosi mendahului dan kata-kata bisa menjadi tajam.
Hari ini energi jodoh sedang rendah.
Hari ini kamu bisa terlalu banyak memikirkan sesuatu.
Hari ini waktu berkirim pesan terus meleset.
Hatimu mudah lelah dan hubungan bisa terasa berat.
Hari ini kamu bisa memahami ucapannya dengan cara lain.
Hari ini kekhawatiran datang lebih dulu daripada harapan.
Hari ini kenangan lama bisa muncul dan membuatmu gelisah.
Hari ini kamu bisa merasa kecil di dalam hubungan.
Hari ini satu janji kecil saja bisa melukaimu.
Dalam asmara, hari ini makin terburu-buru, makin kusut.
Hari ini menenangkan hati lebih penting daripada menunjukkannya.
Hari ini jadwal yang padat bisa terasa seperti jarak.
Hari ini perubahan suasana hati terlihat dalam hubungan.
Hari ini rawat hatimu sendiri lebih dulu daripada jodoh baru.
Salah paham kecil menumpuk, jadi hari ini setiap kata berarti.
Hari ini menunggu terasa lama dalam hubungan.
Alur jodoh seolah berhenti sejenak.
`),
    L(`
Hari ini hubunganmu tetap dengan kehangatan seperti biasa.
Hari ini cinta tenang tetapi mantap.
Hari untuk merasa nyaman satu sama lain, tanpa perlu hal istimewa.
Keberuntungan asmara tenang, jadi kebaikan sehari-hari menonjol.
Tanpa debaran besar, tetapi hatimu damai.
Hari ini hubunganmu mengikuti ritme biasanya.
Hari ini obrolan dengan orang terdekat mengalir baik.
Hari ini alur jodoh merata.
Hari yang tenang untuk berbagi cerita hari masing-masing.
Gelombang emosi kecil dan hari tetap tenteram.
Hari yang baik untuk melihat hubunganmu saat ini.
Hari ini keakraban adalah kekuatan dalam asmara.
Hari ini hubungan yang sudah terjaga terasa lebih hangat daripada yang baru.
Hari yang santai dan tanpa kejutan besar dalam asmara.
Hari ini hatimu tenang.
Hari ini perhatian kecil tersampaikan apa adanya.
Energi jodoh biasa, tetapi obrolan berjalan baik.
Hari ini waktu bersama mengalir alami.
Hubunganmu menjaga tempatnya tanpa terburu-buru.
Keberuntungan asmara mengalir merata dan keseharian terasa nyaman.
Hari ini hubunganmu bisa makin dalam secara diam-diam.
Jika lajang, hari yang baik untuk menikmati waktumu sendiri.
Alur asmara tenang, jadi merapikan perasaan terasa mudah.
Hari ini pesan-pesan ringan bolak-balik dengan menyenangkan.
`),
    L(`
Hari ini perasaanmu tersampaikan dengan hangat.
Hari ini tanda ketertarikan mudah bolak-balik.
Hari ini tawa sering pecah dalam obrolan.
Hari ini pesonamu terlihat alami.
Hari ini energi jodoh bersinar terang.
Hari yang baik untuk menunjukkan bahwa kamu menyukai seseorang.
Hari ini pertemuan baru cenderung dimulai dengan baik.
Hari ini hubunganmu bisa selangkah lebih dekat.
Hari ini pikiranmu klop dengan pikirannya.
Hari ini pesan yang mendebarkan bisa datang.
Hari ini keberuntungan asmara terbuka lebar.
Hari ini waktu bersama terasa istimewa.
Hari ini apa yang ingin kamu katakan keluar dengan lembut.
Hari ini jodoh bisa datang dari tempat yang sangat dekat.
Hari ini ketulusan satu sama lain mudah terlihat.
Hari ini kehidupan baru masuk ke hubunganmu.
Hari ini kesan pertama cenderung membekas dengan baik.
Hari yang baik untuk berbagi perasaan yang selama ini kamu ragukan.
Hari ini kata-kata manis diingat lama.
Hari ini angin buritan bertiup di alur jodoh.
Hari ini kamu bisa menarik perhatian di pertemuan.
Hari ini rasa saling tertarik bertambah.
Hari ini kabar baik bisa datang dalam asmara.
Hati terhubung dan hari ini obrolan jadi panjang.
`),
  ],
  more: [
    L(`
Saat merasa sensitif, lebih baik beristirahat sehari daripada mengambil kesimpulan.
Jika ada yang melukaimu, tulis hari ini dan baca lagi besok.
Diamnya mungkin tidak ada hubungannya denganmu.
Di hari yang emosional, bicara langsung lebih sedikit menimbulkan salah paham daripada lewat pesan.
Menurunkan sedikit harapan hari ini meringankan hatimu.
Makin lama kamu menebak sendirian, makin berat hatimu cenderung terasa.
Jika hubungan terasa berat, rawat dirimu lebih dulu.
Kata-kata yang diucapkan di hari lelah terdengar lebih keras dari maksudmu.
Jangan biarkan pertengkaran kecil hari ini berlarut.
Saat hatimu goyah, bicaralah dengan teman yang kamu percaya.
Memikirkan sekali lagi situasinya meredakan rasa sakit.
Tidak perlu mendapat jawaban hari ini.
`),
    L(`
Di hari yang mudah, mengucapkan terima kasih dengan lantang menguatkan ikatan.
Makan bersama bisa lebih berarti daripada acara istimewa apa pun.
Berbagi jadwal masing-masing mengurangi selisih kecil.
Bahkan dalam hubungan yang akrab, pujian ringan terasa segar.
Jika lajang, hari yang baik untuk mencari komunitas hal yang kamu sukai.
Hari ini cukup dengarkan dia sampai selesai.
Obrolan di hari yang tenang bisa menjadi kekuatan besar nanti.
Kirim sapaan ringan kepada seseorang yang sudah lama tidak kamu ajak bicara.
Hari yang baik untuk membicarakan rencana berikutnya bersama.
Ingat satu hal yang dia sukai, dan nanti itu akan berguna.
Hari ini yang terbaik adalah menjaga ritme yang membuatmu nyaman.
Carilah hal-hal kecil untuk ditertawakan bersama.
`),
    L(`
Hari ini perasaanmu tersampaikan dengan baik, jadi katakan apa yang selama ini kamu ragukan.
Jika bertemu orang baru, jadilah dirimu sendiri dengan alami.
Jika punya pasangan, habiskan waktu di tempat yang berbeda dari biasanya.
Hari yang baik untuk mengajak santai seseorang yang kamu sukai.
Kamu bisa memercayai apa adanya kata-kata manis yang kamu dengar hari ini.
Menyimpan kenangan dalam foto atau catatan membuatnya bertahan lebih lama.
Saat suasananya bagus, bagikan apa yang masing-masing harapkan.
Jika ada perkenalan, datang dengan santai adalah ide bagus.
Spesifik dalam berterima kasih menyentuh lebih dalam.
Hari ini menghubungi lebih dulu menciptakan alur yang baik.
Jika melihat peluang hubungan melangkah maju, jangan dilewatkan.
Hari yang beruntung, jadi biarkan wajah dan nada bicaramu menunjukkan ketenangan.
`),
  ],
  why: {
    star: L(`
{star} masuk sebagai energi yang membantu, jadi hati mudah terhubung.
{star} hidup, jadi peluang untuk pertemuan baru muncul.
{star} datang hari ini, saat yang baik untuk menunjukkan ketertarikan.
{star} bersinar terang, jadi kehangatan masuk ke dalam hubungan.
{star} bergerak, jadi kamu bisa terhubung dengan seseorang yang menarik hatimu.
{star} berkilau hari ini, jadi obrolan mengalir alami.
{star} datang, jadi waktu bersama pasangan bisa terasa lebih istimewa.
{star} mengalir baik, jadi perkenalan atau pertemuan bisa membawa seseorang.
{star} mendukungmu, jadi keberanian untuk mendekat cenderung membuahkan hasil.
{star} hidup, saat yang baik untuk memikirkan langkah berikutnya dalam hubunganmu.
{star} datang, jadi hari ini perasaannya mudah terbaca.
Berkat {star}, pertemuan pertama cenderung meninggalkan kesan baik.
`),
    bad: L(`
Bintang jodoh masuk dengan berat, jadi hatimu bisa mudah lelah.
Energi jodoh membebanimu, jadi kamu bisa merasa terbebani dalam hubungan.
Bintang jodoh datang tetapi menekanmu, jadi pelankan langkah.
Energi jodoh masuk kuat, jadi kamu bisa kelelahan menyesuaikan diri dengan orang lain.
Bintang jodoh bertindak sebagai beban, jadi harapan dan kenyataan bisa berjarak.
Energi jodoh meluap, jadi kelelahan emosional bisa bertambah hari ini.
Bintang jodoh berat, jadi jangan terburu-buru mengambil keputusan.
Energi jodoh terlalu banyak untuk dipikul, jadi kamu bisa akhirnya menopang hubungan sendirian.
Bintang jodoh datang, tetapi hari ini lindungi dulu hatimu sendiri.
Energi jodoh berat, jadi ingat bahwa tidak apa-apa berkata tidak.
Bintang jodoh berdesakan, jadi hatimu bisa terasa sibuk.
Energi jodoh berat, jadi pertemuan ringan lebih cocok untukmu.
`),
    dohwa: L(`
Bunga Persik datang, jadi kamu menarik perhatian secara alami.
Bunga Persik hidup, jadi kesan pertama terutama berhasil baik.
Berkat Bunga Persik, kamu bisa menjadi pusat obrolan.
Hari ini Bunga Persik masuk, jadi pesona terlihat dari nada dan ekspresimu.
Bunga Persik bergerak, jadi kamu bisa terhubung dengan seseorang yang baru.
Bunga Persik bersinar, jadi usaha merawat penampilan terbayar.
Bunga Persik datang, jadi pesan bisa datang lebih banyak dari biasanya.
Bunga Persik mengalir baik, jadi kamu bisa menangkap tanda ketertarikan.
Bunga Persik berkilau, jadi kehadiranmu makin besar di antara orang-orang.
Dengan Bunga Persik di dekatmu, kamu punya kekuatan untuk mencairkan suasana.
Bunga Persik hidup, jadi kamu bisa menunjukkan sisi baru kepada pasanganmu juga.
Dengan Bunga Persik di sini, hari ini pertemuan ramai cocok untukmu.
`),
    dayHap: L(`
Harmoni menyentuh tempat pasanganmu (cabang Hari), jadi kamu seirama dengan orang terdekat.
Cabang Hari-mu membentuk harmoni, jadi waktu bersama terasa mudah.
Harmoni mencapai tempat pasanganmu, jadi kalian saling memahami dengan lebih lapang.
Cabang Hari-mu menemukan harmoni, hari yang baik untuk berbaikan setelah pertengkaran.
Tempat pasanganmu terikat oleh harmoni, baik untuk membuat rencana bersama.
Harmoni menyentuh cabang Hari-mu, jadi orang di sisimu memberi rasa tenang.
Harmoni terbentuk dengan tempat pasanganmu, jadi menyelaraskan hati terasa mudah.
Cabang Hari-mu bersatu hari ini, jadi ketenangan seperti keluarga bisa hadir.
Harmoni mencapai tempat pasanganmu, jadi rencana cenderung berjalan baik.
Cabang Hari-mu menerima harmoni, jadi empati mudah datang dalam obrolan.
Tempat pasanganmu menghangat oleh harmoni, jadi perhatian kecil berdampak besar.
Harmoni menyentuh cabang Hari-mu, jadi keseharian bersama terasa seru.
`),
    dayChung: L(`
Tempat pasanganmu (cabang Hari) terkena benturan, jadi kalian bisa berselisih karena hal kecil.
Hari ini cabang Hari-mu terguncang, jadi rencana bisa berubah tiba-tiba.
Tempat pasanganmu terkena benturan, jadi perbedaan pikiran bisa terlihat lebih besar.
Benturan mengenai cabang Hari-mu, jadi nada bicara bisa membuatmu tersinggung.
Tempat pasanganmu terguncang, jadi hari ini tunda keputusan besar.
Hari ini cabang Hari-mu terkena benturan, jadi mungkin masing-masing butuh ruang.
Benturan mencapai tempat pasanganmu, jadi rencana bisa bersilang.
Cabang Hari-mu sedang berkonflik, jadi tanggapi satu ketukan lebih lambat.
Tempat pasanganmu terkena benturan, jadi masalah lama bisa muncul lagi.
Cabang Hari-mu terguncang, jadi berbagi fakta lebih membantu daripada berbagi perasaan.
Dengan benturan di tempat pasanganmu, perjalanan atau perubahan jadwal bisa membuat kalian tidak bertemu.
Hari ini benturan mengenai cabang Hari-mu, jadi sampaikan dengan lembut apa yang menyakitkan.
`),
    stemHap: L(`
Tuan Hari-mu membentuk penyatuan, jadi seseorang yang menarik hatimu bisa muncul.
Energi yang bersatu dengan Tuan Hari-mu datang, jadi obrolan mengalir lembut.
Tuan Hari-mu menemukan penyatuan, jadi hari ini hati mudah bersentuhan.
Hari ini Tuan Hari-mu bersatu, saat yang baik untuk menemukan seseorang untuk bersama.
Tuan Hari-mu terikat, jadi stabilitas dalam hubungan bertambah.
Berkat energi yang bersatu dengan Tuan Hari-mu, ketertarikan mengalir alami.
Tuan Hari-mu bersatu, hari yang baik untuk bertemu seseorang.
Penyatuan mencapai Tuan Hari-mu, jadi menerima ajakannya terasa mudah.
Tuan Hari-mu menemukan penyatuan, jadi kenalan lama bisa tampak baru.
Energi yang bersatu dengan Tuan Hari-mu bisa menumbuhkan rasa saling tertarik.
Tuan Hari-mu terhubung lewat penyatuan, jadi melakukan sesuatu bersama terasa seru.
Hari ini Tuan Hari-mu bersatu, jadi seseorang untuk berbagi hati ada di dekatmu.
`),
    none: L(`
Hari ini bintang jodoh beristirahat, saat yang baik untuk merawat ikatan di sisimu.
Energi jodoh tenang, jadi hari ini waktu untuk diri sendiri cocok untukmu.
Bintang jodoh tenang, jadi tidak perlu memaksakan pertemuan.
Energi jodoh diam, jadi waktu dengan orang yang akrab terasa mudah.
Hari ini alur jodoh datar, jadi jalani seperti biasa.
Bintang jodoh diam di tempat, hari yang baik untuk merapikan hubungan.
Energi jodoh tenang, baik untuk menjelajahi selera dan perasaanmu sendiri.
Bintang jodoh tidak bergerak, jadi sapaan kecil terasa lebih hangat.
Energi jodoh tenang, jadi amati daripada terburu-buru.
Bintang jodoh menarik napas, jadi kebaikan sehari-hari bersinar.
Hari ini sedikit perubahan dalam asmara, baik untuk melihat ke belakang dengan tenang.
Energi jodoh tenang, jadi waktu dengan teman juga penghiburan besar.
`),
  },
  caution: L(`
Meski balasannya lambat, jangan mendesaknya hari ini.
Pesan yang dikirim saat emosi tinggi sulit ditarik kembali.
Jaga nada bicaramu agar candaan tidak berubah menyakitkan.
Hindari membandingkan kisah cintamu dengan orang lain.
Meski ingin memeriksa kehidupan pribadinya, hari ini percayalah.
Jangan memendam rasa sakit untuk diluapkan sekaligus.
Lebih baik tidak mengungkit hubungan masa lalu hari ini.
Tunda obrolan penting saat kamu lelah.
Jangan mengambil kesimpulan sebelum mendengarkannya.
Jangan menilainya hanya dari kata orang lain.
Kata seperti «selalu» dan «tidak pernah» cenderung memicu pertengkaran.
Atur waktu agar tidak terlambat ke janji temu.
Hindari pernyataan cinta atau pesan emosional saat sedang minum.
Tahan menyalahkan teman atau keluarganya.
Saat merasa cemas, bertanyalah daripada memutuskan sendiri.
Jangan mengukur cinta dari frekuensi pesan.
Jangan memutuskan nasib hubungan saat marah.
Hari ini hindari kata atau tindakan yang mengujinya.
Hati-hati agar tidak melampiaskan suasana hati buruk kepada pasangan.
Hari ini kebohongan kecil bisa tumbuh menjadi salah paham besar.
Tunda mengunggah perasaanmu di media sosial.
Jangan menunjukkan kekurangannya di depan orang lain.
Jika dia berkata tidak, hormati itu.
Jangan mencoba membuktikan perasaan dengan hadiah atau pengeluaran berlebihan.
Di hari yang melelahkan, sapaan singkat lebih baik daripada telepon panjang.
Pasang pengingat agar tidak lupa hari jadi dan rencana.
Beri dia waktu berpikir daripada menuntut jawaban.
Hindari meremehkan seleranya.
Menghilang setelah bertengkar cenderung memperbesar salah paham.
Hari ini lepaskan keinginan memeriksa ponselnya.
Jangan mencurigai sikapnya karena cerita yang kamu bayangkan.
Jangan mengaitkan perasaan hari ini dengan hal-hal masa lalu.
Jangan membagikan terlalu banyak informasi pribadi kepada orang baru sekaligus.
Untuk kencan pertama, pilih tempat umum yang ramai.
Jangan mengaitkan penolakannya dengan nilaimu.
Tidak apa-apa tidak terburu-buru mendefinisikan hubungan.
Tidak apa-apa membatasi pesan yang menguras tenagamu.
Hari ini sindiran cenderung sangat membekas.
Simpan obrolan panjang untuk saat dia tidak sibuk.
`),
  chance: L(`
Hari ini sapaan ringan bisa membawa ke obrolan yang menyenangkan.
Ajakan berjalan-jalan bersama kemungkinan disambut baik.
Jika teman mengenalkanmu pada seseorang, layak untuk datang.
Obrolan mengalir mudah di komunitas yang berbagi minatmu.
Pergilah makan makanan favoritnya.
Lihat foto-foto bersama dan bagikan kenangan.
Berikan pujian kepada seseorang yang kamu sukai.
Tinggalkan catatan pendek tulisan tangan, seperti yang lama tidak kamu lakukan.
Pilih film atau pertunjukan untuk ditonton bersama.
Mendengarkan kekhawatirannya mendekatkan kalian.
Jodoh cenderung lahir di tempat yang banyak tawa.
Berjalan-jalan dengan pasangan di lingkungan yang belum pernah kalian jelajahi.
Kamu bisa bertemu orang baru saat jalan bareng teman.
Obrolan dimulai secara alami di tempat orang belajar bersama.
Memberi bantuan kecil melunakkan hubungan.
Hari ini cukup tersenyum dan menyapa lebih dulu sudah membuka pintu.
Menunjukkan minat pada hobinya memperpanjang obrolan.
Memasak bersama biasanya menjadi waktu yang seru.
Hari yang baik untuk minum kopi sebentar dengan seseorang yang mulai berjarak.
Berikan camilan kepada seseorang yang kamu syukuri.
Angkat topik perjalanan berikutnya bersama pasanganmu.
Tinggalkan komentar hangat pada kabar baik yang kamu lihat di media sosial.
Jika menyukai seseorang, hari ini kamu bisa sedikit lebih jujur.
Sebut namanya dengan hangat dalam obrolan.
Jodoh bisa lahir di kelompok olahraga ringan atau klub.
Tanyakan harinya dan ingat apa yang dia ceritakan.
Foto bersama cenderung menjadi kenangan indah.
Bagikan cerita masa kecil kalian.
Tanggapi dengan ceria tanda ketertarikan yang kamu terima hari ini.
Obrolan cenderung berjalan baik di kencan buta atau pertemuan pertama.
Tetapkan target kecil bersama pasanganmu.
Jika dia terlihat lelah, berikan kata-kata hangat.
Dengarkan lagu yang sama bersama dan bicarakan.
Kirim pesan terima kasih kepada orang terdekat.
Pertemuan di tempat baru cenderung dikenang dengan manis.
Hari ini kata-kata singkat dan tulus paling berhasil.
`),
  tip: L(`
Hubungan yang baik dimulai dari menepati janji-janji kecil.
Satu anggukan berarti banyak bagi orang lain.
Mengenal hatimu sendiri lebih dulu membantumu membaginya dengan baik.
Sampaikan rasa sakit dengan kalimat yang dimulai dengan «aku».
Kebaikan lahir dari konsistensi, bukan dari kata-kata besar.
Dalam pesan, kehangatan lebih penting daripada panjangnya.
Menerima perbedaan kalian mengurangi pertengkaran.
Berusaha memahami menjaga hubungan lebih baik daripada berusaha mengubah orang lain.
Pujian kecil hari ini kembali sebagai kebaikan esok hari.
Waktu sendiri juga persiapan untuk hubungan yang baik.
Tawa bersama menjaga hubungan tetap hidup lama.
Perhatikan usaha-usahanya.
Jangan tunda «maaf» dan «terima kasih».
Jangan kehilangan dirimu bahkan dengan orang yang kamu sukai.
Saat obrolan macet, ubah pertanyaannya.
Jika hatimu lelah, tidak apa-apa beristirahat sejenak.
Hormati jarak yang membuat orang lain nyaman.
Rawat juga dirimu di dalam hubungan.
Merayakan hari jadi kecil bersama mengumpulkan kenangan.
Makin banyak kamu mendengar, makin dekat hati kalian.
Mengucapkan harapan dengan kata-kata mengurangi salah paham.
Pikirkan setiap hari satu hal baik tentang orang lain.
Setelah bertengkar, pikirkan cara menyelesaikannya, bukan siapa yang benar.
Takdir mempertemukan orang; usaha menjaga mereka tetap bersama.
Meluangkan waktu untuk saling mengenal juga berharga.
Tatapan hangat sampai lebih dulu daripada kata apa pun.
Ketulusan dan kebaikan paling berhasil bila bersama.
Tanpa membandingkan, kamu melihat hubunganmu sendiri lebih jelas.
Menghormati harinya membuat harimu juga dihormati.
Untuk bertemu orang baik, buat dirimu nyaman lebih dulu.
Satu tindakan baik bisa lebih berharga daripada sepuluh kata.
Tidak pernah terlambat untuk berbagi perasaanmu.
Lihat ritmenya dan ritmemu sekaligus.
Waktu bersama bertahan lebih lama daripada hadiah kecil.
Bagikan rasa syukur hari ini sebelum hari berakhir.
Mengulang ucapannya dengan kata-katamu membantu menghubungkan hati.
`),
  act: [
    L(`
Tulis apa yang ingin kamu katakan padanya dan baca lagi besok.
Pilih satu hal yang memberimu ketenangan dan lakukan.
Rapikan rasa sakitmu seperti menulis buku harian.
Buka hatimu kepada teman yang kamu percaya.
Fokus pada urusanmu daripada menunggu pesan.
Tenangkan hatimu dengan secangkir teh hangat.
Jika kalian bertengkar, cari satu hal untuk dimintai maaf.
Hari ini berjalan-jalanlah sendirian.
Saat emosi naik, tarik napas dalam dan tunda balasan.
Tulis dalam satu kalimat sudut pandangnya.
Tutup media sosial sejenak dan fokus pada perasaanmu.
Tidur lebih awal dan biarkan hatimu beristirahat.
`),
    L(`
Ceritakan kepada orang terdekat apa yang terjadi padamu hari ini.
Tetapkan rencana kecil bersama untuk minggu ini.
Catat satu hal yang dia sukai.
Hubungi seseorang yang sudah lama ingin kamu tanyakan kabarnya.
Pilih bersama menu makan malam ini.
Ucapkan satu hal spesifik yang kamu syukuri.
Dengarkan dia sampai selesai dan ajukan satu pertanyaan.
Rapikan foto-foto yang kalian ambil bersama.
Cari komunitas atau kelas yang menarik minatmu.
Kirim pesan singkat penyemangat untuknya.
Bicarakan bersama rencana akhir pekan kalian.
Rangkum dalam satu baris pandanganmu tentang cinta.
`),
    L(`
Ajak lebih dulu seseorang yang menarik hatimu.
Pilih rute kencan yang berbeda dari biasanya.
Kirim pesan singkat yang menunjukkan kamu menyukainya.
Jika diundang ke perkenalan atau pertemuan, datanglah dengan senang hati.
Siapkan kejutan kecil untuknya.
Buat daftar hal yang ingin kalian lakukan bersama.
Ceritakan kepada orang yang kamu temui hari ini apa yang kamu sukai darinya.
Ajukan satu pertanyaan lagi saat mengobrol dengan orang baru.
Bagikan rencana masa depan dengan pasangan, tanpa beban.
Ucapkan apa yang sudah lama ingin kamu katakan.
Keluar dengan pakaian yang paling membuatmu merasa jadi diri sendiri.
Bagikan video yang bisa membuat kalian tertawa bersama.
`),
  ],
};
