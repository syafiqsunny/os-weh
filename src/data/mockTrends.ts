import { TrendSignal } from "../types";

export const mockTrendsData: TrendSignal[] = [
  {
    id: "1",
    rank: 1,
    keyword: "Subsidi Petrol RON95 Bersasar",
    category: "Ekonomi",
    score: 96,
    velocity: "Meningkat Tegak",
    risk3R: "Sederhana",
    newsValue: "Sangat Tinggi",
    sourceDiversity: 18,
    sources: [
      "Kementerian Ekonomi bentang unjuran penjimatan RM4.1 Bilion.",
      "Netizen di Threads pertikai had kelayakan gaji kasar isi rumah.",
      "Editorial Utusan: 'Melindungi golongan rentan atau merumitkan mekanisma bantuan?'",
      "Sembang TikTok mendakwa kaedah MySejahtera/Kad Pengenalan melambatkan proses pembayaran pam gas."
    ],
    fullIntelBrief: "Isu subsidi RON95 menjadi tajuk perbincangan utama merentasi semua platform digital hari ini. Isu tertumpu kepada ketelusan pengiraan pendapatan layak (PADU) lawan kaedah pelaksanaan fizikal di stesen minyak. Risikonya ialah dakyah populis ekstremis yang menggunakan sentimen kelas pendapatan.",
    radarData: [
      { name: "Sentimen Negatif", value: 68 },
      { name: "Kekerapan Berita", value: 95 },
      { name: "Sebutan Sosial", value: 98 },
      { name: "Interaksi Pengguna", value: 92 },
      { name: "Kepelbagaian Sumber", value: 87 }
    ]
  },
  {
    id: "2",
    rank: 2,
    keyword: "PRN Johor Ke-16 & Sempadan Baharu",
    category: "Politik",
    score: 91,
    velocity: "Sederhana",
    risk3R: "Tinggi",
    newsValue: "Sangat Tinggi",
    sourceDiversity: 14,
    sources: [
      "Suruhanjaya Pilihan Raya (SPR) kaji cadangan pembahagian semula sempadan parlimen.",
      "Analisis politik meramalkan pertembungan tiga penjuru kritikal.",
      "Pimpinan parti komponen mula uar-uarkan manifesto digital.",
      "Klip viral mempersoalkan penyertaan pengundi baru bawah skim Automatik Undi18."
    ],
    fullIntelBrief: "Wacana pilihan raya negeri mula membara di selatan tanah air. Fokus bincang terarah kepada sempadan zon baharu parlimen dan kempen akar umbi tempatan. 3R risk tergolong tinggi disebabkan wujudnya eksploitasi isu perkauman halus serta sentimen kenegerian.",
    radarData: [
      { name: "Sentimen Negatif", value: 45 },
      { name: "Kekerapan Berita", value: 89 },
      { name: "Sebutan Sosial", value: 91 },
      { name: "Interaksi Pengguna", value: 85 },
      { name: "Kepelbagaian Sumber", value: 72 }
    ]
  },
  {
    id: "3",
    rank: 3,
    keyword: "Amaran Banjir Kilat Pantai Timur",
    category: "Bencana",
    score: 87,
    velocity: "Meningkat Tegak",
    risk3R: "Rendah",
    newsValue: "Tinggi",
    sourceDiversity: 22,
    sources: [
      "MetMalaysia keluarkan amaran cuaca jingga/bahaya untuk Terengganu & Kelantan.",
      "Bilik gerakan bencana negeri diaktifkan 24 jam.",
      "Perbincangan komuniti di X menggesa persediaan logistik bot penyelamat dipercepat.",
      "Hantaran tular situasi paras air sungai utama melepasi tahap amaran."
    ],
    fullIntelBrief: "Laporan cuaca melampau menyebabkan kebimbangan tinggi di kalangan lokal. Signal radar menonjolkan sokongan logistik, panggilan bantuan keselamatan, dan video situasi banjir semasa di hantar secara meluas ke TikTok.",
    radarData: [
      { name: "Sentimen Negatif", value: 20 },
      { name: "Kekerapan Berita", value: 94 },
      { name: "Sebutan Sosial", value: 88 },
      { name: "Interaksi Pengguna", value: 85 },
      { name: "Kepelbagaian Sumber", value: 90 }
    ]
  },
  {
    id: "4",
    rank: 4,
    keyword: "Skim Gaji Progresif Sektor Swasta",
    category: "Ekonomi",
    score: 84,
    velocity: "Stabil",
    risk3R: "Rendah",
    newsValue: "Tinggi",
    sourceDiversity: 11,
    sources: [
      "Kementerian Sumber Manusia umum pilot projek penyertaan 1,000 syarikat.",
      "Majikan keluhkan peningkatan kos caruman KWSP lawan syarat kenaikan minima.",
      "Utas perbincangan di LinkedIn: 'Adakah RM2.5k memadai sebagai aras kelayakan asas bakat IT?'",
      "Netizen gesa skim ini diwajibkan, bukannya mengikut kadar sukarela."
    ],
    fullIntelBrief: "Skim gaji progresif memacu maklumbalas positif daripada golongan pekerja muda, namun majikan menyuarakan keluhan pengurusan aliran tunai pasca pandemik. Fokus utama adalah mengimbangi produktiviti dengan upah munasabah.",
    radarData: [
      { name: "Sentimen Negatif", value: 35 },
      { name: "Kekerapan Berita", value: 78 },
      { name: "Sebutan Sosial", value: 82 },
      { name: "Interaksi Pengguna", value: 88 },
      { name: "Kepelbagaian Sumber", value: 74 }
    ]
  },
  {
    id: "5",
    rank: 5,
    keyword: "Kebocoran Data Kesihatan MySejahtera",
    category: "Am",
    score: 80,
    velocity: "Meningkat Tegak",
    risk3R: "Rendah",
    newsValue: "Sangat Tinggi",
    sourceDiversity: 9,
    sources: [
      "Kumpulan penggodam dakwa miliki 5 juta baris data maklumat vaksinasi awam.",
      "Menteri Digital tegaskan siasatan forensik keselamatan siber sedang giat dijalankan.",
      "Perbincangan hangat di forum teknologi mendedahkan kelemahan API lama.",
      "Gesa pemantapan akta privasi data peribadi (PDPA) dengan denda keras bagi kementerian."
    ],
    fullIntelBrief: "Krisis integriti siber memicu kemarahan awam berikutan kebimbangan kecurian identiti. Sentimen perbincangan di platform X didominasi gesaan siber integriti nasional.",
    radarData: [
      { name: "Sentimen Negatif", value: 85 },
      { name: "Kekerapan Berita", value: 86 },
      { name: "Sebutan Sosial", value: 79 },
      { name: "Interaksi Pengguna", value: 82 },
      { name: "Kepelbagaian Sumber", value: 65 }
    ]
  },
  {
    id: "6",
    rank: 6,
    keyword: "Dividen ASB & Polisi Pelaburan Baru",
    category: "Ekonomi",
    score: 79,
    velocity: "Sederhana",
    risk3R: "Rendah",
    newsValue: "Sederhana",
    sourceDiversity: 12,
    sources: [
      "Permulaan uar-uar jangkaan dividen hujung tahun ASB 2026.",
      "Penganalisis bank unjurkan pulangan stabil sekitar 5.8% upah.",
      "Sembang kewangan di X mengesyorkan penukaran pegangan ke skim ASB 3 bagi bukan bumiputera.",
      "Tular hantaran mengenai pengeluaran dividen secara digital sepenuhnya di aplikasi."
    ],
    fullIntelBrief: "Wacana celik kewangan tahunan di kalangan komuniti pelabur runcit tempatan. Isu tertumpu kepada perbandingan pulangan pasaran saham tempatan dengan instrumen stabil.",
    radarData: [
      { name: "Sentimen Negatif", value: 15 },
      { name: "Kekerapan Berita", value: 74 },
      { name: "Sebutan Sosial", value: 80 },
      { name: "Interaksi Pengguna", value: 84 },
      { name: "Kepelbagaian Sumber", value: 70 }
    ]
  },
  {
    id: "7",
    rank: 7,
    keyword: "Isu Pengaruh Ajaran Sesat Al-Arkam Baru",
    category: "Budaya",
    score: 76,
    velocity: "Meningkat Tegak",
    risk3R: "Tinggi",
    newsValue: "Tinggi",
    sourceDiversity: 13,
    sources: [
      "Jabatan Agama Islam Negeri (JAIN) lakukan tangkapan bersepadu usahawan syarikat GISB.",
      "Dakwaan doktrinasi ketat terhadap kanak-kanak di bawah pusat kebajikan.",
      "Klip pendedahan bekas ahli di TikTok ditonton melebihi 2 juta kali.",
      "Majlis Agama Fatwakan perniagaan mementingkan status barakah palsu adalah haram."
    ],
    fullIntelBrief: "Sensasi bualan berunsurkan agama dan doktrinasi ekstrem. Mengundang polemik hangat berkaitan penguatkuasaan pentadbiran Islam, perlindungan anak-anak yatim serta kartel ekonomi patuh syariah.",
    radarData: [
      { name: "Sentimen Negatif", value: 91 },
      { name: "Kekerapan Berita", value: 82 },
      { name: "Sebutan Sosial", value: 75 },
      { name: "Interaksi Pengguna", value: 80 },
      { name: "Kepelbagaian Sumber", value: 63 }
    ]
  },
  {
    id: "8",
    rank: 8,
    keyword: "Kenaikan Tol Lebuhraya PLUS",
    category: "Ekonomi",
    score: 75,
    velocity: "Sederhana",
    risk3R: "Rendah",
    newsValue: "Tinggi",
    sourceDiversity: 8,
    sources: [
      "Rundingan penstrukturan konsesi tol dilaporkan menemui jalan buntu.",
      "Persatuan pengguna desak kerajaan kekalkan harga tol sedia ada.",
      "Skim diskaun harian waktu bukan puncak dicadangkan untuk pemegang RFID.",
      "Kicauan sarkastik: 'Harga minyak naik, tol naik, gaji bila nak progresif?'"
    ],
    fullIntelBrief: "Isu kos sara hidup ruji memicu pelbagai perkongsian meme dan sindiran sosial di platform X dan Facebook. Sentimen didominasi rasa tidak puas hati pengguna jalan raya berjadual.",
    radarData: [
      { name: "Sentimen Negatif", value: 80 },
      { name: "Kekerapan Berita", value: 65 },
      { name: "Sebutan Sosial", value: 78 },
      { name: "Interaksi Pengguna", value: 82 },
      { name: "Kepelbagaian Sumber", value: 50 }
    ]
  },
  {
    id: "9",
    rank: 9,
    keyword: "Sistem Kerja 4 Hari Seminggu",
    category: "Am",
    score: 72,
    velocity: "Stabil",
    risk3R: "Rendah",
    newsValue: "Sederhana",
    sourceDiversity: 10,
    sources: [
      "Syarikat teknologi tempatan lapor kepuasan staf meningkat 40% pasca tempoh ujian.",
      "Sektor perkilangan nyatakan kebimbangan kejatuhan kualiti output eksport.",
      "Tinjauan awam hantaran LinkedIn menyokong penuh kelonggaran kerja hibrid.",
      "Kementerian Sumber Manusia tidak bercadang memperkenalkan akta rasmi tetapi menggalakkan autonomi majikan."
    ],
    fullIntelBrief: "Isu gaya hidup sihat (work-life balance) menjadi kegemaran perbincangan profesional muda. Signal menunjukkan kecenderungan tinggi menyokong tadbir urus fleksibel.",
    radarData: [
      { name: "Sentimen Negatif", value: 10 },
      { name: "Kekerapan Berita", value: 60 },
      { name: "Sebutan Sosial", value: 76 },
      { name: "Interaksi Pengguna", value: 80 },
      { name: "Kepelbagaian Sumber", value: 68 }
    ]
  },
  {
    id: "10",
    rank: 10,
    keyword: "Kontroversi Filem Tempatan 'Tanahair'",
    category: "Budaya",
    score: 70,
    velocity: "Stabil",
    risk3R: "Sederhana",
    newsValue: "Sederhana",
    sourceDiversity: 7,
    sources: [
      "Lembaga Penapis Filem (LPF) potong 3 babak sensitif sejarah perang tanah melayu.",
      "Pengarah filem luahkan rasa kecewa kerana keaslian fakta terjejas.",
      "Debat sejarawan tempatan: 'Naratif heroisme atau mengikut kehendak sinematik komersial?'",
      "Klip maklumbalas tayangan perdana bertaburan di media sosial."
    ],
    fullIntelBrief: "Isu kebebasan bersuara lwn sensitiviti sejarah kaum tempatan. Perbincangan sederhana di platform Threads mengimbangi keperluan seni filem dan keharmonian etnik.",
    radarData: [
      { name: "Sentimen Negatif", value: 50 },
      { name: "Kekerapan Berita", value: 62 },
      { name: "Sebutan Sosial", value: 68 },
      { name: "Interaksi Pengguna", value: 72 },
      { name: "Kepelbagaian Sumber", value: 55 }
    ]
  }
];
