import TODAY from './id-today.js';
import TYPES from './id-types.js';
import YEAR from './id-year.js';
import { REL, FOCUS_NONE, ADVICE_DOM, ADVICE_YONG } from './id-focus.js';
// Teks pembacaan para master (Bahasa Indonesia). Persona hanya terasa lewat suara, tidak dijelaskan di layar.
// · fortune (tab Hari Ini): pemandu netral dan ramah
// · haewoon: lugas, ringkas, berbobot / hana: ceria dan hangat / dohan: padat dan strategis, tidak pernah mutlak
import MORE from './id-more.js';
import { FORTUNE_DOM, HANA_TODAY } from './id-dom.js';
import W5 from './id5-wealth.js';
import L5 from './id5-love.js';
import K5 from './id5-work.js';
import H5 from './id5-health.js';
import { LEAD5, TODO5 } from './id5-card.js';
import DATE from './id-date.js';
const ID = {
  ui: {
    tab: 'Master',
    pick: 'Kamu ingin bertanya pada siapa hari ini?',
    name: { haewoon: 'Haewoon', hana: 'Hana', dohan: 'Dohan' },
    field: { haewoon: 'Saju · Keberuntungan per jam', hana: 'Asmara · Hubungan', dohan: 'Karier · Bisnis' },
    title: { haewoon: 'Pembacaan saju Haewoon', hana: 'Pembacaan asmara Hana', dohan: 'Pembacaan karier Dohan' },
    badge: { free: 'Gratis hari ini', ad: 'Buka dengan iklan', open: 'Terbuka' },
    unlock: 'Tonton iklan untuk melihat pembacaan lengkap',
    unlockNote: 'Setelah satu iklan singkat, kamu tidak perlu menonton lagi selama periode waktu ini (sampai {t}).',
    unlockFree: 'Hari ini kamu bisa membaca Hana atau Dohan secara gratis.',
    adFail: 'Iklan gagal dimuat, jadi kali ini kami membukanya untukmu.',
    fold: { haewoon: 'Lihat lagi dasar saju-ku', hana: 'Lihat lagi gaya asmaraku', dohan: 'Lihat lagi gaya kerjaku' },
    compatTitle: 'Kecocokan — dinamika hubungan',
    compatSub: 'Pilih jenis hubungan dan masukkan tanggal lahirnya untuk melihat bagaimana bagan kalian bertemu. Skor dan pembacaan satu baris gratis.',
    compatUnlock: 'Tonton iklan untuk kecocokan',
    compatNote: 'Kecocokan dibuka terpisah dari pembacaan Hana. Setelah dibuka, tetap terbuka selama periode waktu ini (sampai {t}).',
    relKind: 'Hubungan', relKinds: { some: 'Gebetan', lover: 'Pasangan', idol: 'Idola', friend: 'Teman', coworker: 'Rekan kerja', boss: 'Atasan · Tim', family: 'Keluarga' },
    siunTitle: 'Siun — keberuntungan jam demi jam hari ini',
    siunHint: 'Ketuk satu slot waktu di dial untuk melihat keberuntungan jam itu.',
    siunNow: 'Sekarang',
    bestTag: 'Jam terbaik', worstTag: 'Jam waspada',
    sleepRange: '23.00–05.00',
    teaserSiun: 'Jam berapa yang terbaik untukmu hari ini?',
    cardsTitle: 'Tanya lebih banyak pada para master',
    goMaster: 'Lihat pembacaan',
    monthsTitle: 'Bulan-bulan ke depan',
    secs: {
      pillars: 'Empat Pilar', overall: 'Pembacaan menyeluruh', siun: 'Keberuntungan per jam',
      temper: 'Temperamen asmaraku', type: 'Siapa yang menarikmu, siapa yang cocok', today: 'Alur asmara hari ini', timing: 'Kapan jodoh datang', people: 'Siapa yang menolongmu, siapa yang perlu dijaga jaraknya',
      style: 'Gaya kerjamu', fields: 'Bidang dan peran yang cocok', hours: 'Waktu terbaik untuk laporan · rapat · kontrak', flow: 'Alur karier bulan ini · tahun ini', collab: 'Dengan siapa bekerja sama, siapa yang dihindari',
    },
    good: 'Jam baik', avoid: 'Jam yang dihindari', thisMonth: 'Bulan ini', thisYear: 'Tahun ini', next3: '3 bulan ke depan',
    band: ['Berat', 'Stabil', 'Cerah', 'Sangat cerah'],
    kinds: { report: 'laporan', meeting: 'rapat', contract: 'kontrak' },
    disclaimer: 'Alur yang dibaca dari saju hanya sebagai acuan. Ambil keputusan penting dengan melihat fakta dan situasimu juga.',
    month: '{m}',
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    seasons: ['Semi', 'Panas', 'Gugur', 'Dingin'],
    loveStar: { m: 'Bintang pasanganmu, Kekayaan (財星),', f: 'Bintang pasanganmu, Otoritas (官星),', none: 'Bintang jodoh' },
    lucky: { color: 'Warna', dir: 'Arah', num: 'Angka', act: 'Kegiatan' },
    toc: 'Daftar isi',
    or: ' atau ',
  },

  // ════════ Tab Hari Ini: pemandu netral dan ramah ════════
  fortune: {
    weekend: MORE.weekend,
    flow: [
      ['Hari yang baik untuk sedikit memperlambat langkah.', 'Hari ini lebih baik menjaga yang sudah ada daripada memulai hal baru.', 'Energi berkumpul ke dalam hari ini, jadi bijak untuk merampingkan jadwal yang padat.', 'Hari ini alurnya lebih tidak goyah bila kamu membereskan satu per satu.'],
      ['Hari yang lancar tanpa naik-turun besar.', 'Menjaga ritme biasamu sudah cukup hari ini.', 'Alur yang tenang, baik untuk membereskan hal kecil yang tertunda.', 'Energi perlahan mulai naik hari ini.'],
      ['Hari dengan alur yang cukup lancar.', 'Hasil cenderung mengikuti sejauh kamu bergerak hari ini.', 'Alur yang lumayan untuk mengerjakan lagi hal yang tertunda.', 'Orang dan pekerjaan saling klop hari ini.'],
      ['Energi hari ini sangat cocok dengan baganmu.', 'Sedikit rintangan hari ini, dan segala sesuatu cenderung berjalan lancar.', 'Jika kamu sudah mempersiapkan sesuatu, hari ini baik untuk melangkah.', 'Secara keseluruhan, keberuntungan mengalir lembut hari ini.'],
    ],
    tenDay: [
      ['Hari di mana bekerja dengan orang yang sepemikiran memberimu kekuatan.', 'Keras kepala dan rasa bersaing mudah muncul, jadi dengarkan orang lain sekali lagi.'],
      ['Kamu mendapat dorongan hari ini, baik untuk melaju.', 'Urusan orang atau uang bisa merugikanmu, jadi periksa janji dan pengeluaran.'],
      ['Pekerjaan jadi menyenangkan dan pikiranmu sedikit lega hari ini.', 'Mudah bermalas-malasan, jadi mulailah dari yang wajib dikerjakan.'],
      ['Kepandaian bicara dan ide-idemu menonjol hari ini.', 'Kata-kata mudah mendahului, jadi pikirkan sekali lagi sebelum bicara di situasi penting.'],
      ['Peluang tak terduga atau penghasilan sampingan bisa menarik perhatianmu hari ini.', 'Hasrat akan uang besar mudah muncul, jadi tahan dulu investasi berisiko.'],
      ['Usaha jujurmu membuahkan hasil hari ini.', 'Yang masuk juga bisa keluar, jadi awasi pengeluaran.'],
      ['Hari yang baik untuk menghadapi hal sulit secara langsung.', 'Tekanan dan ketegangan mudah menumpuk, jadi jangan memikul semuanya sendirian.'],
      ['Hari yang baik untuk mendapatkan kepercayaan dan pengakuan.', 'Tanggung jawab bisa terasa berat. Jaga aturan dan janji dengan cermat.'],
      ['Intuisi dan ide mudah datang hari ini.', 'Pikiran bertambah banyak dan semangat mudah merosot hari ini.'],
      ['Belajar, dokumen, dan mendapat bantuan berjalan lancar hari ini.', 'Kamu mungkin ingin bergantung pada orang lain, jadi sediakan waktu untuk membereskan sendiri.'],
    ],
    domName: { wealth: 'keuangan', love: 'asmara dan hubungan', work: 'pekerjaan dan studi', health: 'kesehatan' },
    title: 'Ramalan Hari Ini', focus: 'Yang perlu diperhatikan hari ini', advice: 'Saran hari ini',
    dom: {
      wealth: {
        flow: [['Uang mengalir keluar sedikit lebih deras hari ini.', 'Keberuntungan uang mundur sejenak hari ini.'], ['Uang tetap tenang tanpa perubahan besar.', 'Yang masuk dan yang keluar kurang lebih seimbang hari ini.'], ['Uang mengalir lapang hari ini.', 'Ada alur yang menyenangkan di sekitar uang dan transaksi.']],
        why: {
          pyeon: 'Kekayaan Tak Terduga sedang bergerak, jadi uang yang berputar seperti penghasilan sampingan dan transaksi menonjol.',
          jeong: 'Kekayaan Tetap datang, membawa uang yang kembali sebanding dengan kerjamu.',
          bad: 'Bintang Kekayaan datang, tetapi membebanimu, jadi makin sedikit kamu mengidamkan, makin banyak yang tersimpan.',
          rob: 'Pesaing menyusup masuk, jadi uang mudah bocor lewat orang lain atau persaingan.',
          output: 'Ekspresi sedang bergerak, jadi bakat dan keterampilan mudah berubah menjadi penghasilan.',
          doc: 'Sumber Daya datang, menghubungkanmu dengan uang yang diselesaikan lewat dokumen dan kontrak.',
          none: 'Bintang Kekayaan tidak bergerak langsung hari ini, jadi belanjakan hanya sesuai rencana.',
        },
        caution: ['Hindari belanja impulsif dan investasi yang hanya berdasar omongan orang lain.', 'Periksa dua kali dokumen apa pun yang memuat angka.', 'Jangan percaya janji keuntungan pasti sebelum kamu memeriksanya sendiri.'],
        tip: ['Sisihkan sebagian dari yang masuk saat itu juga.', 'Tabungan kecil hari ini terkumpul dan mengubah alurnya.', 'Coba rapikan daftar pengeluaranmu.'],
      },
      love: {
        flow: [['Hati mudah berselisih jalan hari ini.', 'Suhu emosi mudah naik turun hari ini.'], ['Alur jodoh sedang tenang.', 'Hubungan mengikuti alurnya yang biasa.'], ['Hati mudah terhubung hari ini.', 'Ada alur hangat menuju jodoh.']],
        why: {
          star: '{star} datang, jadi pertemuan dan percakapan mengalir alami.',
          bad: 'Bintang jodoh datang tetapi terasa berat, jadi lebih baik mendekat perlahan.',
          dohwa: 'Energi memikat Bunga Persik datang, jadi lebih banyak mata tertuju padamu dari biasanya.',
          dayHap: 'Harmoni menyentuh tempat pasanganmu (cabang Hari), jadi kamu mudah klop dengan orang terdekat.',
          dayChung: 'Tempat pasanganmu (cabang Hari) terkena benturan, jadi gesekan dengan orang terdekat mudah terjadi.',
          stemHap: 'Energi yang bersatu dengan Tuan Hari-mu datang, jadi seseorang yang kamu sukai bisa muncul.',
          none: 'Bintang jodoh sedang tenang hari ini, hari yang baik untuk merawat hubungan yang sudah ada.',
        },
        chance: ['Jodoh baru kemungkinan datang secara alami di tempat yang akrab.', 'Jika hubunganmu dengan seseorang sedang canggung, ini saat yang baik untuk menghubungi lebih dulu.', 'Daripada menebak perasaan seseorang, tanyakan langsung.'],
        tip: ['Perasaan lebih dulu tersampaikan lewat nada bicaramu.', 'Lepaskan rasa tidak sabar, dan orang yang tepat akan terlihat.', 'Hubungan menjadi kuat dalam prosesnya, bukan dalam kesimpulannya.'],
      },
      work: {
        flow: [['Pekerjaan bergerak lebih lambat dari perkiraan hari ini.', 'Ada batu sandungan kecil dalam pekerjaan hari ini.'], ['Pekerjaan bergerak dengan kecepatan biasanya.', 'Hari di mana kamu bisa menangani tugas tanpa kesulitan.'], ['Hasil kerja mudah terlihat hari ini.', 'Peluang untuk menunjukkan kemampuanmu terbuka.']],
        why: {
          kwan: 'Otoritas datang, saat yang baik untuk mendapatkan kepercayaan dan pengakuan.',
          kwanBad: 'Otoritas datang, jadi tanggung jawab dan tekanan mudah bertambah.',
          output: 'Ekspresi sedang bergerak, jadi rencana, usulan, dan hasil kerja keluar dengan baik.',
          study: 'Sumber Daya datang, menambah kekuatan pada studi, sertifikasi, dan dokumen.',
          monthChung: 'Tempat kerjamu (cabang Bulan) terkena benturan, jadi pembicaraan soal perubahan di tempat kerja bisa muncul.',
          rob: 'Sebaya datang, jadi persaingan atau perbedaan pendapat dengan rekan kerja mudah terjadi.',
          none: 'Bintang pekerjaan tidak banyak bergerak hari ini, jadi jalani sesuai urutan yang kamu rencanakan.',
        },
        caution: ['Bergeraklah berdasarkan fakta yang sudah kamu periksa sendiri, bukan kabar burung.', 'Jika ada kontrak atau janji, baca syaratnya sampai habis.', 'Tunda keputusan yang belum siap kamu ambil.'],
        tip: ['Satu hal yang kamu selesaikan hari ini menentukan langkah esok.', 'Curahkan tenagamu pada hal yang kamu kuasai.', 'Coba persingkat daftar tugasmu.'],
      },
      health: {
        flow: [['Tubuhmu mudah lelah hari ini.', 'Kondisimu mudah naik turun hari ini.'], ['Alur tubuhmu stabil.', 'Menjaga ritme biasamu sudah cukup hari ini.'], ['Tubuh dan pikiran bertambah kuat hari ini.', 'Pemulihan berlangsung cepat hari ini.']],
        why: {
          excess: 'Energi {el}, yang sudah berlimpah dalam dirimu, bertambah lagi, jadi {organ} bisa terbebani.',
          lack: 'Energi {el} yang kamu kurang masuk dan melengkapi keseimbanganmu.',
          chung: 'Tempat dirimu sendiri (cabang Hari) terkena benturan, jadi kamu bisa mudah lelah.',
          hyeong: 'Ada energi Gesekan hari ini, jadi waspadai benturan dan cedera kecil.',
          none: 'Keseimbangan Lima Unsur tidak banyak goyah hari ini.',
        },
        tip: ['Jika gejala yang sama terus kembali, temui dokter sebelum membaca ramalan apa pun.', 'Minum air sesering mungkin dan lakukan peregangan kapan pun bisa.', 'Lewati camilan larut malam dan minum berlebihan.'],
      },
    },
  },

  // ════════ Haewoon: lugas, ringkas, berbobot ════════
  haewoon: {
    card: ['Hari ini ada satu jam yang luar biasa cerah. Ketahuilah kapan itu.', 'Hari ini jam yang perlu dihindari terlihat jelas. Periksa sebelum bergerak.', 'Keberuntungan berbeda setiap jam. Lihat jadwalmu hari ini.'],
    ov: {
      now: 'Kini kamu berdiri dalam siklus {gz} yang dimulai sekitar usia {age}. {desc}.',
      nowTone: ['Angin buritan. Jangan biarkan angin ini berlalu.', 'Angin yang tidak condong ke mana pun. Kemampuanmu menjadi hasilmu.', 'Angin haluan. Bertahan juga sebuah keterampilan. Jangan paksa permainannya jadi lebih besar.'],
      year: 'Tahun ini, tahun {gz}: {tone}',
      yearTone: ['berpihak padamu. Keluarkan apa yang selama ini kamu tunda.', 'stabil. Cukup kurangi sedikit keinginanmu.', 'membawa beban. Timbang sekali lagi keputusan besar.'],
      next: 'Sekitar usia {age}, kamu memasuki siklus {gz}. {desc}. {tone}',
      nextTone: ['Anginnya berubah lebih lembut. Bersiaplah dari sekarang untuk saat itu.', 'Coraknya mirip dengan sekarang. Teruskan apa yang kamu lakukan dengan tekun.', 'Angin haluan akan datang. Bangun pondasimu sebelum ia tiba.'],
      way: 'Biar kukatakan dengan jelas. Energi yang paling dibutuhkan baganmu adalah {el}. {why} {close}',
      wayClose: ['Terbuka terlambat bukanlah nasib buruk. Alur tidak pernah diam di satu tempat.', 'Keberuntungan ditentukan bukan saat ia datang, melainkan saat kamu memakainya. Percayai dulu kekuatanmu.', 'Terburu-buru, maka kamu tercerai-berai. Satu per satu. Itulah jalanmu.', 'Jangan menyamakan langkah dengan orang lain. Bagian ini milikmu.'],
    },
    siun: {
      summary: 'Dari jam-jammu hari ini, {best} membawa energi paling cerah dan {worst} yang paling berat.',
      summaryTail: ['Letakkan hal penting di jam yang cerah.', 'Di jam yang berat, tahan keputusan. Itu saja.', 'Memilih jam saja sudah menenangkan separuh keberuntunganmu.'],
      tg: [
        ['Pihakmu sendiri memberi kekuatan. Bergeraklah bersama orang lain.', 'Keras kepala naik di jam ini. Jangan bersikeras hanya kamu yang benar.'],
        ['Daya dorong menguat. Bereskan yang tertunda, sekarang.', 'Persaingan mengangkat kepala. Ambil bagianmu saja, dan kamu malah rugi.'],
        ['Tanganmu luwes dan pekerjaan menyenangkan. Selesaikan yang sudah kamu mulai.', 'Tubuhmu kendur. Selesaikan dulu satu hal yang wajib.'],
        ['Kata dan bakat hidup. Keluarkan sekarang.', 'Kata-kata mendahului di jam ini. Pelankan satu ketukan di depan senior.'],
        ['Peluang tak terduga lewat. Buka matamu.', 'Hasrat uang besar mengaburkan penilaian. Tutup dompetmu.'],
        ['Uang jujur bergerak. Lakukan pembukuan dan hitungan sekarang.', 'Uang yang akan keluar terlihat. Beli hanya yang kamu butuhkan.'],
        ['Jam untuk menembus hal sulit secara langsung. Jangan menghindar.', 'Tekanan menumpuk. Jangan memikul semuanya sendirian.'],
        ['Keberuntungan dengan senior menyertaimu. Laporan dan persetujuan tempatnya di sini.', 'Tanggung jawab terasa berat. Jangan buat janji yang tak bisa kamu tepati.'],
        ['Intuisi berkilat. Catat apa yang terlintas saat itu juga.', 'Pikiran berputar-putar. Serahkan keputusan ke jam berikutnya.'],
        ['Kepalamu jernih. Selesaikan belajar dan urusan dokumen sekarang.', 'Kamu akan ingin bergantung pada orang lain. Bereskan sendiri.'],
      ],
      rel: {
        hap: 'Harmoni bertemu cabang Hari-mu. Ajukan permintaan yang kamu tunda, sekarang.',
        samhap: 'Jam yang bergandengan tangan dengan cabang Hari-mu. Pekerjaan bersama berjalan mudah.',
        chung: 'Benturan dengan cabang Hari-mu. Jangan meninggikan suara. Jangan terburu-buru di jalan juga.',
        hyeong: 'Gesekan sedang bekerja. Satu salah ucap kecil menyebar luas.',
        hae: 'Rintangan ikut tercampur. Salah paham mudah terjadi, jadi pastikan dulu sebelum lanjut.',
      },
      doIt: ['Kerja tim, olahraga', 'Membereskan tunggakan', 'Merampungkan, rencana makan', 'Perencanaan, presentasi', 'Penjualan, meninjau tawaran baru', 'Pembukuan, belanja', 'Negosiasi sulit', 'Laporan, persetujuan', 'Mencatat ide', 'Belajar, merapikan dokumen'],
      avoid: ['Meminjamkan uang', 'Salah ucap di depan senior', 'Belanja impulsif', 'Janji yang tak bisa ditepati', 'Menunda keputusan'],
      avoidChung: 'Pembicaraan penting, perjalanan terburu-buru',
      doLabel: 'Baik untuk', avoidLabel: 'Hindari',
      dawn: 'Jam untuk membangunkan tubuh. Rencanakan harimu sekarang.',
      sleep: 'Jam untuk beristirahat. Tidur itu sendiri mengisi ulang keberuntunganmu.',
    },
  },

  // ════════ Hana: ceria dan hangat (empati → alasan → tindakan kecil) ════════
  hana: {
    card: [['Belakangan merasa sedikit kusut? Tidak apa-apa santai saja hari ini.', 'Hari ini satu kata saja terasa lebih besar dari biasanya. Mau lihat bersama?'], ['Alur asmara sedang tenang. Tapi ada satu hal yang perlu kamu lihat.', 'Hari ini, ada petunjuk dari seseorang yang akrab.'], ['Alur asmara hari ini cukup bagus! Jangan sampai terlewat.', 'Hati mudah terhubung hari ini. Penasaran dengan siapa?']],
    temper: {
      palace: [
        'Tempat pasanganmu menyimpan energi yang serupa denganmu (Sebaya). Asmara seperti sahabat cocok untukmu. Kamu merasa nyaman berjalan berdampingan, bukan satu orang memimpin yang lain.',
        'Tempat pasanganmu menyimpan energi ekspresi (Ekspresi). Kamu menginginkan cinta penuh kasih yang terlihat lewat kata dan tindakan. Bersama orang yang tak pernah mengungkapkan apa pun, kamu bisa cepat kecewa.',
        'Tempat pasanganmu menyimpan energi kekayaan (Kekayaan). Kamu praktis bahkan dalam cinta. Kamu merasa dicintai lewat tindakan perhatian lebih dari kata-kata.',
        'Tempat pasanganmu menyimpan energi tanggung jawab (Otoritas). Hatimu tertuju pada orang yang dapat diandalkan dan menepati janji. Begitu berkomitmen, kamu cenderung menjaganya lama.',
        'Tempat pasanganmu menyimpan energi perhatian (Sumber Daya). Kamu menginginkan seseorang yang memahamimu dan bisa kamu sandari. Kamu butuh waktu untuk membuka diri, tetapi begitu terbuka, rasanya dalam.',
      ],
      dohwa: 'Dan kamu punya Bunga Persik, bintang daya tarik. Kamu mungkin tidak sadar, tetapi orang sering lebih dulu tertarik padamu.',
      many: 'Kamu punya beberapa bintang pasangan, jadi kamu cukup populer. Namun hatimu mudah goyah, jadi menetapkan satu standar milikmu sendiri akan membantu.',
      none: 'Bintang pasanganmu cenderung tipis, jadi tujuan pribadimu sering didahulukan daripada berkencan. Tidak apa-apa. Baganmu adalah bagan yang menemukan orang yang tepat saat tidak terburu-buru.',
      express: 'Energi ekspresimu kuat, jadi terlihat jelas saat kamu menyukai seseorang. Kejujuran itu adalah pesonamu.',
      think: 'Energi berpikirmu kuat, jadi kamu lama merenungkan perasaan sebelum menunjukkannya. Sesekali tidak apa-apa bicara sebelum terlalu banyak berpikir.',
    },
    elPerson: [
      'seseorang yang penuh mimpi dan terus tumbuh, seseorang yang membuat rencana bersamamu',
      'seseorang yang ceria dan terbuka berekspresi, seseorang yang menghidupkan suasana',
      'seseorang yang mantap dan konsisten, seseorang yang menepati janji',
      'seseorang dengan standar jelas dan gaya yang rapi, seseorang yang cepat memutuskan',
      'seseorang yang penuh pertimbangan dan enak diajak bicara, seseorang yang luwes',
    ],
    type: {
      attract: 'Kamu tertarik pada {p}. Bintang pasanganmu adalah energi {el}, jadi matamu secara alami tertuju pada orang seperti itu.',
      match: 'Yang cocok untukmu dalam jangka panjang adalah {p}. Itulah orang yang melengkapi energi {el} yang kamu butuhkan.',
      animals: 'Menurut shio, kamu klop dengan shio {a}. Mungkin tidak terasa di awal, tetapi makin lama makin nyaman.',
      tip: 'Jika orang yang menarikmu dan orang yang cocok untukmu sama, luar biasa. Jika tidak, yang bertahan adalah yang kedua. Ingat ini.',
    },
    today: {
      flow: [['Hatimu mungkin sedikit sensitif hari ini.', 'Emosi mudah naik turun hari ini.', 'Hari ini alur asmara sedikit bersilangan.'], ['Alur asmara hari ini tenang.', 'Hari ini, hubungan yang akrab terasa nyaman tanpa perubahan besar.', 'Hari ini baik untuk merapikan perasaanmu dengan tenang.'], ['Alur asmara hari ini bagus.', 'Hati mudah terhubung hari ini.', 'Hari ini energi hangat mengalir di antara orang-orang.']],
      why: {
        star: '{star} datang, jadi pertemuan dan percakapan mengalir alami.',
        bad: 'Bintang jodoh memang datang, tetapi sedikit berat bagimu. Jadi terburu-buru bisa membuat kusut.',
        dohwa: 'Energi Bunga Persik datang, jadi lebih banyak mata tertuju padamu. Berdandanlah sedikit lebih sebelum keluar hari ini.',
        dayHap: 'Harmoni menyentuh tempat pasanganmu, jadi kamu klop dengan orang terdekat.',
        dayChung: 'Tempat pasanganmu terkena benturan, jadi gesekan dengan orang terdekat mudah terjadi. Bukan karena dia buruk, itu hanya energi hari ini.',
        stemHap: 'Energi yang bersatu dengan Tuan Hari-mu datang, jadi seseorang yang kamu sukai bisa muncul.',
        none: 'Bintang jodoh sedang tenang hari ini. Hari yang baik untuk memperhatikan orang yang sudah ada di sisimu daripada bertemu yang baru.',
      },
      caution: ['Jika kata-kata yang menyakitkan hampir terucap, tarik satu napas sebelum bicara.', 'Hari ini, percakapan di mana kamu mendengarkan lebih baik daripada yang mencari kesimpulan.', 'Meski balasannya lambat, jangan terlalu dipikirkan hari ini.'],
      chance: ['Hari yang baik untuk menghubungi lebih dulu. Sapaan singkat sudah cukup.', 'Seseorang yang baru bisa menarik perhatianmu di tempat yang akrab.', 'Sampaikan perasaanmu pada orang yang selama ini kamu syukuri.'],
      tip: ['Perasaan lebih dulu tersampaikan lewat nada bicaramu.', 'Cukup bersikap sedikit manis. Itulah hal terbesarnya.', 'Hubungan adalah soal proses, bukan kesimpulan.'],
    },
    timing: {
      lead: 'Aku memilihkan bulan-bulan dalam enam bulan ke depan saat energi jodoh datang.',
      sig: {
        star: 'Bintang pasanganmu datang sebagai energi yang membantumu. Terima perkenalan dan undangan.',
        dohwa: 'Bunga Persik datang, bulan di mana mata tertuju padamu.',
        dayHap: 'Harmoni menyentuh tempat pasanganmu bulan ini, jadi hubungan mudah melangkah lebih dekat.',
        stemHap: 'Bulan ketika seseorang yang menarik hatimu bisa muncul.',
      },
      warn: {
        dayChung: 'Tempat pasanganmu terkena benturan bulan ini. Selesaikan pertengkaran di hari yang sama.',
        starHeavy: 'Energi jodoh datang sebagai beban. Waspadai hubungan yang menyeretmu.',
      },
      none: 'Dalam enam bulan ke depan, energi jodoh tidak banyak bergerak. Di saat seperti ini, berinvestasi pada dirimu sendiri memanggil jodoh berikutnya.',
      year: { good: 'Melihat setahun penuh, energi jodoh sedang datang.', mid: 'Tahun ini, energi jodoh tenang. Biarkan semuanya terjadi alami daripada memaksakannya.', warn: 'Tahun ini, hubungan mudah berubah. Sering berbicara sudah cukup untuk menjaga yang kamu punya.' },
    },
    people: {
      noble: 'Orang yang menolongmu di masa sulit kemungkinan lahir di tahun {a}. Itulah posisi Bangsawan Langit-mu, jadi berbagi kekhawatiran membuka jalan.',
      match: 'Orang yang lahir di tahun {a} mudah akrab denganmu.',
      clash: 'Kamu mungkin berselisih dengan orang yang lahir di tahun {a}. Bukan karena mereka orang jahat, tetapi karena energi kalian berlawanan. Menuliskan hal penting mengurangi salah paham.',
      style: [
        'Kamu setia dan menghargai teman serta rekan. Hanya saja, jangan menanggung masalah semua orang.',
        'Kamulah yang menghidupkan suasana dengan kata-kata. Sesekali cobalah lebih banyak mendengar cerita mereka daripada bercerita.',
        'Kamu berteman dengan bijak. Punya setidaknya satu teman yang kamu temui tanpa kepentingan membuat hatimu tenang.',
        'Kamu sopan dan menghormati batas. Karena itu kamu butuh sedikit waktu untuk menjadi akrab.',
        'Kamu memperhatikan orang dan menyambut mereka dengan hangat. Jika sebuah hubungan hanya mengambil, tidak apa-apa melepaskannya.',
      ],
    },
    compat: {
      lead: ['Mari kita lihat kalian berdua bersama.', 'Oke, mari letakkan kedua bagan berdampingan.'],
      score: ['Pasangan yang butuh sedikit usaha.', 'Pasangan yang cukup baik jika saling menyesuaikan.', 'Pasangan yang cocok.', 'Pasangan yang sangat cocok!'],
      axes: { pull: 'Daya tarik', talk: 'Komunikasi', clash: 'Titik gesekan', grow: 'Tumbuh bersama' },
      starOf: [
        'Bagimu, dia adalah Sebaya: energi seperti sahabat. Setara dan nyaman, tetapi jadi tegang saat kalian sama-sama keras kepala.',
        'Bagimu, dia adalah Ekspresi: energi yang kamu sayangi dan tempatmu mengekspresikan diri. Di dekatnya, kamu jadi lebih manis.',
        'Bagimu, dia adalah Kekayaan: energi yang ingin kamu urus dan lindungi secara praktis.',
        'Bagimu, dia adalah Otoritas: energi yang menenangkanmu dan memberi standar. Menenteramkan, meski kadang sedikit berat.',
        'Bagimu, dia adalah Sumber Daya: energi yang memahami dan mendukungmu. Mudah untuk bersandar, jadi sering-seringlah berterima kasih.',
      ],
      el: { help: 'Menurut Lima Unsur, dia melengkapi energi {el} yang kamu kurang.', same: 'Menurut Lima Unsur, energi kalian mirip, jadi banyak hal dipahami tanpa kata.', strain: 'Menurut Lima Unsur, energi {el} miliknya sedikit berat bagimu. Menyisakan waktu untuk diri masing-masing akan membantu.' },
      day: { hap: 'Cabang Hari kalian (tempat pasangan) selaras. Hubungan yang makin nyaman makin banyak waktu bersama.', samhap: 'Cabang Hari kalian bergandengan ke arah yang sama. Tetapkan tujuan bersama dan semuanya berjalan lancar.', chung: 'Cabang Hari kalian berbenturan. Daya tariknya kuat, begitu pula gesekannya. Berbaikan di hari yang sama dengan pertengkaran.', hyeong: 'Cabang Hari kalian membentuk Gesekan. Kata-kata kecil mudah melukai, jadi hati-hati bahkan dengan candaan.', hae: 'Cabang Hari kalian membentuk Rintangan. Sering-seringlah bicara sebelum rasa sakit menumpuk.', none: 'Cabang Hari kalian tidak banyak berbenturan atau saling menarik. Waktu yang kalian bangun bersama menentukan hubungannya.' },
      kind: {
        lover: { good: 'Sebagai pasangan, kalian saling menenangkan. Kemanisan sehari-hari lebih penting daripada hari jadi.', bad: 'Sebagai pasangan, ada hal yang perlu disesuaikan. Buat aturan untuk langsung mengatakan apa yang menyakitkan.' },
        some: { good: 'Kalau ini gebetan, alurnya sedang bagus. Tidak apa-apa mengajak bertemu sekali lagi.', bad: 'Kalau ini gebetan, jangan terburu-buru. Sedikit menyesuaikan dengan ritmenya akan membantu.' },
        friend: { good: 'Sebagai teman, kalian pasangan yang awet. Kalian bisa menjadi tempat aman satu sama lain.', bad: 'Sebagai teman, kalian kadang berselisih tetapi cepat berbaikan. Hanya hati-hati soal uang di antara kalian.' },
        coworker: { good: 'Sebagai rekan kerja, kalian bekerja selaras. Bagi peran, dan sinerginya bertambah.', bad: 'Sebagai rekan kerja, gaya kerja kalian berbeda. Tuliskan tugas, jangan hanya dibicarakan.' },
        boss: { good: 'Sebagai atasan dan anggota tim, kalian bisa saling memercayakan sesuatu. Laporan singkat dan sering membuatnya makin baik.', bad: 'Sebagai atasan dan anggota tim, standar kalian berbeda, jadi salah paham mudah terjadi. Samakan harapan dulu.' },
        family: { good: 'Sebagai keluarga, kalian bisa saling bersandar dan mengandalkan.', bad: 'Sebagai keluarga, kalian begitu dekat sehingga mudah saling melukai. Ucapkan terima kasih sekali lagi.' },
        idol: { good: 'Kamu dan idolamu punya energi yang klop. Makin kamu mendukungnya, makin banyak energi yang kamu dapat juga.', bad: 'Kamu dan idolamu punya energi berwarna berbeda, dan justru karena itu kamu tertarik.' },
      },
      do: 'Yang membuat hubungan ini tetap hidup', dont: 'Yang perlu dihindari',
      doList: [['kencan aktif di mana kalian bergerak bersama', 'belajar hal baru bersama', 'saling memuji'], ['makan makanan enak bersama', 'mengungkapkan perasaan dengan kata', 'hadiah kecil'], ['membuat rencana bersama', 'tepat waktu', 'berbagi pekerjaan rumah dan peran'], ['menghormati prinsip masing-masing', 'memberi waktu pribadi satu sama lain', 'pembicaraan yang tenang dan teratur'], ['percakapan mendalam', 'bepergian', 'waktu tenang bersama']],
      dontList: [['adu gengsi', 'membiarkan masalah uang berlalu'], ['melontarkan kata-kata emosional', 'membandingkannya dengan orang lain'], ['berusaha mengendalikan', 'sikap penuh perhitungan'], ['mengabaikan caranya melakukan sesuatu', 'mengingkari janji'], ['diam untuk berpikir sendiri', 'membiarkan rasa sakit menumpuk']],
      hour: 'Waktu yang baik bagi kalian berdua untuk bersama adalah {h}.',
      idolNote: 'Masukkan tanggal lahir idolamu yang diketahui publik. Yang kamu masukkan hanya tersimpan di perangkat ini.',
      idolName: 'Nama idola (panggilan)',
      inviteLead: 'Kirim tautannya, dan dia cukup memasukkan tanggal lahirnya untuk langsung melihat kecocokan kalian.',
      shareBtn: 'Buat kartu kecocokan',
      shareText: 'Skor kecocokan kami sudah keluar! Coba juga',
      detailTitle: 'Pembacaan rinci Hana',
      lockDesc: 'Lihat empat ukuran kecocokan, pembacaan rinci untuk hubungan kalian, yang perlu dilakukan dan dihindari bersama, serta waktu yang baik untuk bersama.',
      lockBtn: 'Tonton iklan untuk pembacaan rinci',
      cardTitle: 'Kecocokan kami',
      kindMore: {
        some: { good: ['Ada energi berdebar di antara kalian berdua sekarang. Lanjutkan percakapan dengan pertanyaan ringan.', 'Ini pasangan di mana dia juga kemungkinan tertarik padamu. Buat satu rencana khusus untuk kalian berdua.', 'Saat yang tepat untuk menyatakan perasaan adalah hari ketika kalian banyak tertawa bersama. Percayai suasananya.'], bad: ['Pasangan ini lebih baik melangkah sedikit lebih pelan. Jangan terlalu memikirkan seberapa cepat dia membalas.', 'Cara kalian mengungkapkan sesuatu berbeda, jadi salah paham mudah terjadi. Jika penasaran, tanyakan langsung daripada memberi kode.', 'Menjadi akrab dalam kelompok lebih dulu bisa membantu sebelum bertemu berdua.'] },
        lover: { good: ['Pasangan yang makin saling menenangkan makin banyak waktu bersama. Berbagi momen sehari-hari menumbuhkan cinta kalian.', 'Kalian saling melengkapi kekurangan. Ucapkan rasa syukur dengan lantang, sesering mungkin.', 'Pasangan yang baik untuk membicarakan masa depan. Mulailah dengan membuat rencana kecil bersama.'], bad: ['Kalian mencintai dengan cara berbeda, jadi rasa sakit mudah muncul. Berjanjilah mengatakan apa yang menyakitkan di hari yang sama.', 'Pertengkaran cenderung berlarut bagi pasangan ini. Sepakati satu tanda untuk berbaikan.', 'Menghormati waktu pribadi masing-masing justru membuat kalian lebih dekat.'] },
        idol: { good: ['Energimu klop dengan idolamu. Waktu yang kamu habiskan untuk mendukungnya memberimu kekuatan juga.', 'Energi idolamu melengkapi kekuranganmu. Dunia fandom menjadi energi sehari-hari.', 'Ikatan yang makin seru makin lama kamu menyukainya. Abadikan momen-momenmu.'], bad: ['Kamu dan idolamu punya energi berwarna berbeda. Karena itulah kamu tertarik.', 'Terlalu larut dalam fandom bisa membuatmu lelah. Sediakan waktu untuk merawat dirimu juga.', 'Pasangan di mana setiap sisi baru idolamu terasa segar dan mendebarkan.'] },
        friend: { good: ['Teman yang saling memahami tanpa kata. Makin dalam seiring waktu.', 'Kalian kemungkinan orang pertama yang diingat satu sama lain di masa sulit. Sapa lebih dulu.', 'Mencoba hal baru bersama membuat persahabatan makin kuat.'], bad: ['Teman yang kadang berselisih tetapi cepat berbaikan. Hanya hati-hati soal uang dan ketepatan waktu.', 'Kalian berbeda dalam banyak hal, jadi ada banyak yang bisa dipelajari satu sama lain.', 'Jangan biarkan rasa sakit menumpuk. Bicarakan dengan ringan.'] },
        coworker: { good: ['Rekan kerja yang bekerja selaras. Bagi peran, dan sinerginya bertambah.', 'Pasangan yang baik untuk bertukar ide. Saling kembangkan ide di rapat.', 'Proyek yang kalian kerjakan bersama cenderung diterima dengan baik.'], bad: ['Kecepatan dan cara kerja kalian berbeda. Simpan tugas secara tertulis.', 'Bagi tanggung jawab dengan jelas sejak awal.', 'Berbicara dengan fakta, bukan perasaan, membuat segalanya jauh lebih mudah.'] },
        boss: { good: ['Hubungan di mana kalian bisa saling memercayakan sesuatu. Laporan singkat dan sering membangun kepercayaan.', 'Kalian mengakui kekuatan satu sama lain. Jangan pelit pujian.', 'Tetapkan tujuan bersama dan hasil mudah diraih.'], bad: ['Standar kalian berbeda, jadi salah paham mudah terjadi. Samakan harapan dulu.', 'Untuk masukan, bicarakan prosesnya, bukan hanya hasilnya.', 'Memisahkan suasana kerja dan suasana pribadi membuatnya lebih mudah.'] },
        family: { good: ['Keluarga yang bisa saling bersandar dan mengandalkan. Sering-seringlah makan bersama.', 'Kalian tahu isi hati satu sama lain tanpa kata. Tetap saja, sering ucapkan terima kasih.', 'Perjalanan bersama membuat ikatan makin hangat.'], bad: ['Kalian begitu dekat sehingga mudah saling melukai. Ucapkan sekali lagi, dengan lembut.', 'Menghormati pilihan masing-masing mengurangi konflik.', 'Berikan kata-kata dukungan, bukan omelan.'] },
      },
    },
  },

  // ════════ Dohan: padat dan strategis (kesimpulan → dasar → tindakan, tidak pernah mutlak) ════════
  dohan: {
    hours2: MORE.hours2,
    flow2: MORE.flow2,
    card: [['Ada variabel dalam pekerjaan hari ini. Memilih waktu yang tepat bisa menguranginya.', 'Hari ini lebih cocok untuk merapikan daripada memutuskan. Biar kuatur urutannya untukmu.'], ['Alur yang stabil. Tetap saja, ada jam yang lebih menguntungkan dari yang lain.', 'Kecepatan biasamu cukup hari ini. Cukup pilih waktu yang tepat untuk melapor.'], ['Hasil kerja mudah terlihat. Pilih momenmu.', 'Hari ini cenderung baik untuk mengajukan usulan. Periksa slot waktunya.']],
    style: {
      org: 'Kamu condong ke tipe organisasi. Otoritas dan Sumber Daya berbobot besar, jadi kamu berprestasi saat membangun kepercayaan di dalam struktur. Yang perlu disiapkan: reputasimu. Janji dan tenggat adalah asetmu.',
      biz: 'Kamu condong ke tipe bisnis. Ekspresi dan Kekayaan aktif dalam baganmu, jadi kamu menguat saat menata permainan dan menciptakan transaksi sendiri. Variabelnya adalah kecepatan. Lihat arus kas sebelum ekspansi.',
      pro: 'Kamu condong ke tipe spesialis. Sumber Daya dan Ekspresi mendukungmu, jadi nilaimu bertambah saat kamu mendalami pengetahuan dan keterampilan. Yang perlu disiapkan: bukti. Tinggalkan dalam bentuk sertifikasi atau portofolio.',
      mix: 'Kecenderungan keduamu ({t}) juga muncul dekat. Daripada berkomitmen pada satu, memadukan keduanya dalam pekerjaanmu sekarang cenderung lebih berhasil.',
      name: { org: 'tipe organisasi', biz: 'tipe bisnis', pro: 'tipe spesialis' },
    },
    fields: {
      lead: 'Keberuntungan cenderung melekat di bidang tempat Yongsin-mu, {el}, hidup.',
      list: ['pendidikan, penerbitan, konten, desain, lingkungan', 'media, TI, pemasaran, kecantikan, energi', 'properti, konstruksi, perantara, konsultasi, kuliner', 'keuangan, hukum, permesinan, kesehatan, manufaktur', 'perdagangan, distribusi, riset, pariwisata, logistik'],
      role: ['menumbuhkan orang dan memulai proyek', 'tampil di depan untuk menyampaikan dan meyakinkan', 'mengoordinasikan dan menjaga kepercayaan', 'menetapkan standar dan menata', 'mengumpulkan informasi dan menghubungkan'],
      roleLine: 'Peran yang cocok: {r}.',
      strength: 'Sepuluh Dewa yang tampak sebagai kekuatanmu adalah {t}. {trait}',
    },
    flow: {
      daeun: 'Dalam gambaran besar, kamu berada di siklus {gz}. {desc}.',
      short: ['Kerja tim', 'Hasil · usulan', 'Penghasilan · transaksi', 'Penilaian · tanggung jawab', 'Dokumen · belajar'],
      tone: ['Hati-hati', 'Stabil', 'Menguntungkan'],
    },
    collab: {
      noble: 'Orang yang lahir di tahun {a} cenderung membantu dalam pekerjaan praktis. Mintalah pendapat mereka saat kamu buntu.',
      match: 'Orang yang lahir di tahun {a} cenderung selaras denganmu. Baik untuk berbagi peran dalam kerja bersama.',
      clash: 'Dengan orang yang lahir di tahun {a}, gaya kerja cenderung berlawanan. Tuliskan tugas, jangan hanya lisan.',
      rob: 'Baganmu punya Sebaya yang kuat, jadi hati-hati dengan kemitraan. Sepakati bagian, peran, dan cara pembagian hasil secara tertulis sebelum mulai.',
      alone: 'Baganmu punya Sebaya yang lemah, jadi kamu cenderung mencoba mengerjakan semuanya sendiri. Satu mitra untuk menyerahkan eksekusi bisa sangat meningkatkan efisiensimu.',
      mid: 'Baganmu menyeimbangkan kerja tim dan kemandirian. Memilih mitra per proyek cocok untukmu.',
    },
  },
};

function mergeDom(base, add) {
  base.flow = base.flow.map((a, c) => [...a, ...add.flow[c]]);
  base.more = add.more; base.act = add.act;
  for (const [k, v] of Object.entries(add.why)) base.why[k] = [base.why[k], ...v];
  for (const k of ['caution', 'chance', 'tip']) if (add[k]) base[k] = [...(base[k] || []), ...add[k]];
}
for (const k of Object.keys(FORTUNE_DOM)) mergeDom(ID.fortune.dom[k], FORTUNE_DOM[k]);
mergeDom(ID.hana.today, HANA_TODAY);
// Baris domain 5×: ditambahkan setelah set yang ada (dipakai dengan rotasi anti-pengulangan)
function add5(base, add) {
  for (const k of ['flow', 'more', 'act']) if (add[k]) base[k] = base[k].map((a, c) => [...a, ...add[k][c]]);
  for (const [k, v] of Object.entries(add.why || {})) base.why[k] = [...base.why[k], ...v];
  for (const k of ['caution', 'chance', 'tip']) if (add[k]) base[k] = [...(base[k] || []), ...add[k]];
  if (add.tipLow) { base.tip = base.tip.slice(1); base.tipLow = add.tipLow; }
}
for (const [k, v] of Object.entries({ wealth: W5, love: L5, work: K5, health: H5 })) add5(ID.fortune.dom[k], v);
ID.hana.date = DATE;
ID.ui.secs.date = DATE.title;
ID.fortune.rel = REL; ID.fortune.focusNone = FOCUS_NONE; ID.fortune.adviceDom = ADVICE_DOM; ID.fortune.adviceYong = ADVICE_YONG;
ID.today = TODAY;
for (const k of Object.keys(LEAD5)) {
  TODAY.lead[k] = TODAY.lead[k].map((a, n) => [...a, ...LEAD5[k][n]]);
  for (const t of ['up', 'down', 'no']) TODAY.todo[k][t] = [...TODAY.todo[k][t], ...TODO5[k][t]];
}
ID.types = TYPES;
ID.year = YEAR;
export default ID;
