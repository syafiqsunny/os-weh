import { TrendSignal } from "../types";

export const mockTrendsData: TrendSignal[] = [
  // ==========================================
  // GROUP A: TOP 10 — PALING PANAS SEKARANG (Rank 1 - 10)
  // Isu dengan Trend Heat Score tertinggi (90 - 100)
  // ==========================================
  {
    id: "trend_001",
    rank: 1,
    keyword: "Subsidi Petrol RON95 Bersasar",
    category: "Ekonomi",
    vertical: "WEH Money",
    score: 96,
    growthRate: "+68% dalam 60 minit",
    mentionCount: "18,450 sebutan",
    platformUtama: "TikTok",
    confidenceScore: 92,
    statusPengesahan: "Sebahagian Disahkan",
    risiko: "Tinggi",
    waktuKemasKini: "6:00 petang",
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
    newsLinks: [
      { label: "Astro Awani: Suku Kedua Subsidi RON95", url: "https://www.astroawani.com/berita-malaysia/subsidi-bersasar-ron95-dilaksanakan-suku-kedua-2026-rafizi-451230" },
      { label: "Berita Harian: Mekanisme Subsidi RON95 Bersasar", url: "https://www.bharian.com.my/berita/nasional/2026/06/subsidi-ron95-bersasar-pantau-harga-barang-runcit" },
      { label: "PADU Official Portal", url: "https://padu.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 68 },
      { name: "Kekerapan Berita", value: 95 },
      { name: "Sebutan Sosial", value: 98 },
      { name: "Interaksi Pengguna", value: 92 },
      { name: "Kepelbagaian Sumber", value: 87 }
    ],
    apaYangBerlaku: "Isu pelaksanaan subsidi bersasar minyak gred RON95 semakin memuncak di platform TikTok dan Threads berikutan pengumuman terkini kriteria pendapatan kelayakan oleh Kementerian Kewangan. Rakyat meluahkan kekhawatiran kaedah kad pengenalan pintar di pam boleh mencetuskan kesesakan trafik yang ketara di stesen minyak bandar.",
    faktaDisahkan: [
      "Pelaksanaan subsidi bersasar RON95 disahkan bermula pada pertengahan suku kedua tahun ini.",
      "Data rujukan utama akan disinkronasikan merujuk kepada profil pangkalan pusat PADU.",
      "Unjuran rasmi kerajaan menganggarkan penjimatan fiskal bersih sebanyak RM4.1 Bilion setahun."
    ],
    dakwaanBelumDisahkan: [
      "Khabar angin kononnya semua kenderaan melebihi 1,600cc akan disekat serta merta tanpa mengira julat pendapatan.",
      "Video tular mendakwa minyak subsidi berkualiti lebih rendah berbanding minyak komersial."
    ],
    responsRasmi: [
      "Menteri Ekonomi menjelaskan tiada sekatan kenderaan berdasarkan kapasiti cc enjin, skim rujukan tulen adalah pendapatan isi rumah.",
      "Pihak pengusaha stesen minyak mengesahkan sistem terminal pemprosesan MyKad telah diuji 99.4% stabil."
    ],
    apaYangBelumDiketahui: [
      "Struktur lengkap pengiraan pendapatan boleh guna bersih (net disposable income) di bawah PADU.",
      "Kadar apungan harga sebenar mengikut harga pasaran minyak antarabangsa mingguan."
    ],
    sentimenMetrics: [
      { name: "Neutral", value: 15 },
      { name: "Bimbang", value: 50 },
      { name: "Marah", value: 25 },
      { name: "Menyokong", value: 10 }
    ],
    sentimenKonteks: [
      "Bimbang kesan inflasi harga barangan runcit harian.",
      "Keliru kaedah penebusan kad pengenalan pintar.",
      "Pertikai kesediaan sistem fizikal di stesen minyak pedalaman."
    ],
    keywordsBerkaitan: ["RON95", "Subsidi Bersasar", "PADU", "MyKad", "Harga Minyak", "BUDI95", "Kos Sara Hidup"],
    entitiBerkaitan: ["Kementerian Kewangan", "Kementerian Ekonomi", "PADU", "Petronas", "Shell", "Caltex", "BUDI95"],
    cadanganKandungan: [
      { format: "WEH Nak Tau", title: "Siapa yang layak menerima subsidi RON95?" },
      { format: "WEH Check", title: "Betul ke pengguna perlu membuka MySejahtera di pam?" },
      { format: "WEH Data", title: "Berapa banyak kerajaan boleh berjimat?" },
      { format: "WEH Money", title: "Apa kesannya kepada perbelanjaan bulanan keluarga?" }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 3, trendHeatScore: 89 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 1, trendHeatScore: 96 }
    ]
  },
  {
    id: "trend_002",
    rank: 2,
    keyword: "PRN Johor 2026",
    category: "Politik",
    vertical: "WEH Siasat",
    score: 94,
    growthRate: "+42% dalam 60 minit",
    mentionCount: "13,120 sebutan",
    platformUtama: "X",
    confidenceScore: 88,
    statusPengesahan: "Disahkan",
    risiko: "Tinggi",
    waktuKemasKini: "5:30 petang",
    velocity: "Meningkat Tegak",
    risk3R: "Tinggi",
    newsValue: "Sangat Tinggi",
    sourceDiversity: 14,
    sources: [
      "Suruhanjaya Pilihan Raya (SPR) kaji cadangan pembahagian semula sempadan parlimen.",
      "Analisis politik meramalkan pertembungan tiga penjuru kritikal.",
      "Pimpinan parti komponen mula uar-uarkan manifesto digital."
    ],
    fullIntelBrief: "Wacana pilihan raya negeri mula membara di selatan tanah air. Fokus bincang terarah kepada sempadan zon baharu parlimen dan kempen akar umbi tempatan. 3R risk tergolong tinggi disebabkan wujudnya eksploitasi isu perkauman halus serta sentimen kenegerian.",
    newsLinks: [
      { label: "Malaysiakini: PRN Johor 16", url: "https://www.malaysiakini.com/news/712395" },
      { label: "Utusan Malaysia: Sempadan Baharu PRN Johor", url: "https://www.utusan.com.my/nasional/2026/06/spr-persempadanan-semula-kawasan-pilihan-raya-johor" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 45 },
      { name: "Kekerapan Berita", value: 89 },
      { name: "Sebutan Sosial", value: 91 },
      { name: "Interaksi Pengguna", value: 85 },
      { name: "Kepelbagaian Sumber", value: 72 }
    ],
    apaYangBerlaku: "PRN Johor Ke-16 sedang dibincangkan secara intensif berhubung draf kajian persempadanan semula Suruhanjaya Pilihan Raya (SPR) negeri Johor. Ini mengundang perbalahan strategik antara gabungan politik parti tempatan.",
    faktaDisahkan: [
      "DUN Johor akan tamat tempoh mandat rasmi tidak lama lagi.",
      "Kajian persempadanan semula dikemukakan secara telus mengikut jadual perlembagaan."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan kononnya kawasan tumpuan dimanipulasi memihak kepada salah satu blok gabungan politik."
    ],
    responsRasmi: [
      "SPR menafikan sebarang unsur gerrymandering, menegaskan pembahagian mematuhi demografi penduduk semasa."
    ],
    apaYangBelumDiketahui: [
      "Tarikh rasmi pembubaran Dewan Undangan Negeri Johor.",
      "Kandungan penuh manifesto gabungan baharu."
    ],
    sentimenMetrics: [
      { name: "Neutral", value: 30 },
      { name: "Menolak", value: 20 },
      { name: "Menyokong", value: 40 },
      { name: "Keliru", value: 10 }
    ],
    sentimenKonteks: [
      "Debat pembahagian kerusi pengunci bandar.",
      "Automatik Undi18 mencorakkan polar kebangsaan baru."
    ],
    keywordsBerkaitan: ["PRN Johor", "Sempadan Pilihan Raya", "Undi18", "Manifesto", "Calon", "Barisan Nasional"],
    entitiBerkaitan: ["SPR", "Barisan Nasional", "Perikatan Nasional", "Pakatan Harapan", "UMNO", "DAP", "PAS"],
    cadanganKandungan: [
      { format: "WEH Nak Tau", title: "Apakah beza sempadan baharu PRN Johor?" },
      { format: "WEH Check", title: "Adakah benar dakwaan manipulasi undi?" }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 5, trendHeatScore: 82 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 2, trendHeatScore: 94 }
    ]
  },
  {
    id: "trend_003",
    rank: 3,
    keyword: "Kebocoran Data Kesihatan MySejahtera",
    category: "Teknologi",
    vertical: "WEH Check",
    score: 93,
    growthRate: "+86% dalam 60 minit",
    mentionCount: "11,840 sebutan",
    platformUtama: "Threads",
    confidenceScore: 95,
    statusPengesahan: "Sebahagian Disahkan",
    risiko: "Tinggi",
    waktuKemasKini: "4:15 petang",
    velocity: "Meningkat Tegak",
    risk3R: "Rendah",
    newsValue: "Sangat Tinggi",
    sourceDiversity: 9,
    sources: [
      "Kumpulan penggodam dakwa miliki 5 juta baris data maklumat vaksinasi awam.",
      "Menteri Digital tegaskan siasatan forensik keselamatan siber sedang giat dijalankan.",
      "Perbincangan hangat di forum teknologi mendedahkan kelemahan API lama."
    ],
    fullIntelBrief: "Satu insiden dakwaan ketirisan maklumat sejarah kesihatan awam tular di forum penggodam gelap. Walaupun sebahagian dakwaan disahkan merupakan sampel data lama, keresahan masyarakat tinggi berkenaan integriti privasi.",
    newsLinks: [
      { label: "Malaysiakini: Kebocoran Data Sektor Awam", url: "https://www.malaysiakini.com/news/709121" },
      { label: "Astro Awani: Siasatan Cyber Security Malaysia", url: "https://www.astroawani.com/berita-malaysia/kebocoran-data-kesihatan-siasatan-forensik-keselamatan-siber-giat-diteruskan-458112" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 85 },
      { name: "Kekerapan Berita", value: 86 },
      { name: "Sebutan Sosial", value: 79 },
      { name: "Interaksi Pengguna", value: 82 },
      { name: "Kepelbagaian Sumber", value: 65 }
    ],
    apaYangBerlaku: "Kecoh di forum siber apabila sekumpulan akaun penggodam mendakwa berjaya membolos simpanan pangkalan data awam peribadi membabitkan modul pengesahan kesihatan lama.",
    faktaDisahkan: [
      "Ada sebahagian fail sampel yang dipaparkan adalah sahih merujuk data lampau.",
      "Tiada transaksi siber terbaharu yang bocor dikesan di pelayan komersial."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan penggodam kononnya keseluruhan sistem identiti digital negara telah dikompromi."
    ],
    responsRasmi: [
      "Menteri Digital mengesahkan Cyber Security Malaysia sedang bekerjasama rapat melakukan pembendungan data pintu belakang."
    ],
    apaYangBelumDiketahui: [
      "Identiti dalang penggodaman siber tersebut.",
      "Jumlah denda komersial yang boleh dikenakan mengikut draf pindaan Akta PDPA."
    ],
    sentimenMetrics: [
      { name: "Bimbang", value: 65 },
      { name: "Neutral", value: 10 },
      { name: "Marah", value: 20 },
      { name: "Menyokong", value: 5 }
    ],
    sentimenKonteks: [
      "Rakyat bimbang kecurian identiti pihak ketiga.",
      "Tuntutan pampasan undang-undang keselamatan privasi."
    ],
    keywordsBerkaitan: ["MySejahtera", "Kebocoran Data", "Penggodam", "Keselamatan Siber", "PDPA", "Data Peribadi"],
    entitiBerkaitan: ["Menteri Digital", "Cyber Security Malaysia", "Majlis Keselamatan Negara", "PDPA Portal"],
    cadanganKandungan: [
      { format: "WEH Check", title: "Betulkah data MySejahtera kita telah dijual di forum asing?" },
      { format: "WEH Nak Tau", title: "Langkah memeriksa kebocoran data peribadi anda." }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 8, trendHeatScore: 81 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 3, trendHeatScore: 93 }
    ]
  },
  {
    id: "trend_004",
    rank: 4,
    keyword: "Banjir Pantai Timur & Amaran Jingga",
    category: "Bencana",
    vertical: "WEH Borneo/Pantai",
    score: 92,
    growthRate: "+39% dalam 60 minit",
    mentionCount: "17,210 sebutan",
    platformUtama: "TikTok",
    confidenceScore: 97,
    statusPengesahan: "Disahkan",
    risiko: "Tinggi",
    waktuKemasKini: "3:45 petang",
    velocity: "Meningkat Tegak",
    risk3R: "Rendah",
    newsValue: "Tinggi",
    sourceDiversity: 22,
    sources: [
      "MetMalaysia keluarkan amaran cuaca jingga/bahaya untuk Terengganu & Kelantan.",
      "Bilik gerakan bencana negeri diaktifkan 24 jam.",
      "Perbincangan komuniti di X menggesa persediaan logistik bot penyelamat dipercepat."
    ],
    fullIntelBrief: "MetMalaysia menyuarakan krisis monsun luar jangka di Pantai Timur. Beberapa stesen paras sungai melepasi had kritikal menyebabkan persediaan awal pusat pemindahan sementara (PPS) dibuka.",
    newsLinks: [
      { label: "MetMalaysia: Official Weather Alert Portal", url: "https://www.met.gov.my" },
      { label: "Astro Awani: Persediaan Kecemasan Pantai Timur", url: "https://www.astroawani.com/berita-malaysia/banjir-pantai-timur-amalan-persediaan-kecemasan-diperketat-459124" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 20 },
      { name: "Kekerapan Berita", value: 94 },
      { name: "Sebutan Sosial", value: 88 },
      { name: "Interaksi Pengguna", value: 85 },
      { name: "Kepelbagaian Sumber", value: 90 }
    ],
    apaYangBerlaku: "MetMalaysia meningkatkan amaran cuaca buruk jingga kerana taburan hujan lebat luar musim, mencetuskan amaran banjir kilat di lapan daerah di Kelantan dan Terengganu.",
    faktaDisahkan: [
      "12 PPS telah dibuka secara rasmi bagi menampung mangsa banjir.",
      "MetMalaysia mengesahkan taburan hujan adalah 3 kali ganda min purata bulanan."
    ],
    dakwaanBelumDisahkan: [
      "Khabar angin empangan utama di kawasan pedalaman retak dan sedia pecah."
    ],
    responsRasmi: [
      "Agensi Pengurusan Bencana Negara (NADMA) menegaskan empangan dalam keadaan 100% teguh dan dipantau rapi."
    ],
    apaYangBelumDiketahui: [
      "Anggaran rasmi kerosakan infrastruktur jalan raya yang terputus hubungan."
    ],
    sentimenMetrics: [
      { name: "Bimbang", value: 70 },
      { name: "Neutral", value: 20 },
      { name: "Menyokong", value: 10 }
    ],
    sentimenKonteks: [
      "Mangsa banjir risau bantuan makanan lambat sampai.",
      "Sokongan komuniti sukarelawan menghantar bot persendirian."
    ],
    keywordsBerkaitan: ["Banjir", "Amaran Cuaca", "MetMalaysia", "Paras Air", "Bilik Gerakan", "Pemindahan"],
    entitiBerkaitan: ["MetMalaysia", "NADMA", "Angkatan Pertahanan Awam", "Jabatan Kebajikan Masyarakat"],
    cadanganKandungan: [
      { format: "WEH Nak Tau", title: "Laluan jalan utama Pantai Timur yang ditutup setakat ini." },
      { format: "WEH Data", title: "Infografik perbelanjaan dana bencana NADMA." }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 6, trendHeatScore: 84 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 4, trendHeatScore: 92 }
    ]
  },
  {
    id: "trend_005",
    rank: 5,
    keyword: "Tangkapan Pemimpin GISB & Ajaran Sesat",
    category: "Budaya",
    vertical: "WEH Siasat",
    score: 91,
    growthRate: "+35% dalam 60 minit",
    mentionCount: "15,400 sebutan",
    platformUtama: "TikTok",
    confidenceScore: 94,
    statusPengesahan: "Disahkan",
    risiko: "Tinggi",
    waktuKemasKini: "3:00 petang",
    velocity: "Stabil",
    risk3R: "Tinggi",
    newsValue: "Sangat Tinggi",
    sourceDiversity: 13,
    sources: [
      "Jabatan Agama Islam Negeri (JAIN) lakukan tangkapan bersepadu usahawan syarikat GISB.",
      "Dakwaan doktrinasi ketat terhadap kanak-kanak di bawah pusat kebajikan.",
      "Klip pendedahan bekas ahli di TikTok ditonton melebihi 2 jumlah tayangan."
    ],
    fullIntelBrief: "Isu GISB menguasai sentimen keagamaan dan penyalahgunaan doktrin. Operasi penguatkuasaan polis yang meluas berjaya mendedahkan pelbagai salah laku yang melibatkan rangkaian rumah kebajikan kanak-kanak.",
    newsLinks: [
      { label: "Utusan Malaysia: Serbuan Bersepadu Isu GISB", url: "https://www.utusan.com.my/nasional/2026/06/gisb-tangkapan-ahli-dan-eksploitasi-kanak-kanak-oleh-jadin" },
      { label: "Malaysiakini: Siasatan GISB & Penyelamatan Kanak-kanak", url: "https://www.malaysiakini.com/news/708115" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 91 },
      { name: "Kekerapan Berita", value: 82 },
      { name: "Sebutan Sosial", value: 75 },
      { name: "Interaksi Pengguna", value: 80 },
      { name: "Kepelbagaian Sumber", value: 63 }
    ],
    apaYangBerlaku: "Polis Diraja Malaysia (PDRM) bersama agensi agama Islam JAKIM menyelamatkan beratus-ratus kanak-kanak daripada rumah amal dikendalikan GISB atas dakwaan penderaan mental siber.",
    faktaDisahkan: [
      "Laporan perubatan mengesahkan unsur pengabaian kesihatan fizikal beberapa mangsa cilik.",
      "Aset kewangan beberapa entiti berkaitan telah disekat sementara bagi melancarkan siasatan penggubahan wang haram."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan kononnya ajaran asal Al-Arqam diamalkan semula secara tersembunyi sepenuhnya dalam kem kepimpinan tertinggi."
    ],
    responsRasmi: [
      "Lembaga Fatwa Kebangsaan sedang merumuskan draf ketetapan rasmi status keagamaan entiti perniagaan tersebut."
    ],
    apaYangBelumDiketahui: [
      "Rangkaian proksi perniagaan asing milik syarikat yang beroperasi di luar negara."
    ],
    sentimenMetrics: [
      { name: "Marah", value: 70 },
      { name: "Bimbang", value: 20 },
      { name: "Neutral", value: 10 }
    ],
    sentimenKonteks: [
      "Umat Islam berang dengan penyelewengan nama barakah perniagaan.",
      "Gesaan menyelamatkan kebajikan psikologi mangsa remaja."
    ],
    keywordsBerkaitan: ["GISB", "Ajaran Sesat", "Tangkapan", "Eksploitasi", "Kanak-Kanak", "PDRM", "JAKIM"],
    entitiBerkaitan: ["PDRM", "JAKIM", "GISB", "Kementerian Pembangunan Wanita"],
    cadanganKandungan: [
      { format: "WEH Siasat", title: "Menyingkap empayar terselubung perniagaan GISB." },
      { format: "WEH Check", title: "Adakah terdapat modus operandi ajaran sesat baharu?" }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 1, trendHeatScore: 92 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 5, trendHeatScore: 91 }
    ]
  },
  {
    id: "trend_006",
    rank: 6,
    keyword: "Keganasan Siber & Buli Netizen",
    category: "Sosial",
    vertical: "WEH Rakyat",
    score: 91,
    growthRate: "+33% dalam 60 minit",
    mentionCount: "8,920 sebutan",
    platformUtama: "X",
    confidenceScore: 89,
    statusPengesahan: "Disahkan",
    risiko: "Sederhana",
    waktuKemasKini: "2:30 petang",
    velocity: "Stabil",
    risk3R: "Rendah",
    newsValue: "Tinggi",
    sourceDiversity: 11,
    sources: [
      "Kementerian Komunikasi draf hukuman denda RM500k untuk pembuli siber tegar.",
      "Persatuan Psikologi Malaysia dedahkan kes depresi buli meningkat."
    ],
    fullIntelBrief: "Undang-undang keselamatan digital dicadangkan bagi membendung pembuli akaun awam palsu di media sosial. Netizen mendesak denda maksima dikenakan.",
    newsLinks: [
      { label: "MCMC Official", url: "https://mcmc.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 78 },
      { name: "Kekerapan Berita", value: 80 },
      { name: "Sebutan Sosial", value: 85 },
      { name: "Interaksi Pengguna", value: 90 },
      { name: "Kepelbagaian Sumber", value: 75 }
    ],
    apaYangBerlaku: "Kempen kesedaran anti-buli siber dilarikan ke parlimen berikutan tindak balas bunuh diri mengejut seorang pempengaruh wanita muda tempatan baru-baru ini.",
    faktaDisahkan: [
      "MCMC telah menubuhkan pasukan petugas siber khas untuk mengesan akaun samaran yang menyebarkan kebencian."
    ],
    dakwaanBelumDisahkan: [
      "Netizen mendakwa beberapa kumpulan 'troll' di Telegram dibayar oleh entiti politik untuk merosakkan reputasi individu tertentu."
    ],
    responsRasmi: [
      "Menteri Komunikasi menyatakan undang-undang pelisensian media sosial akan mula berkuat kuasa tahun hadapan bagi memperketat verifikasi pengguna asli."
    ],
    apaYangBelumDiketahui: [
      "Had sempadan pengasingan kritikan murni lawan pembulian peribadi berlandaskan rang akta keselamatan."
    ],
    sentimenMetrics: [
      { name: "Marah", value: 60 },
      { name: "Bimbang", value: 30 },
      { name: "Menyokong", value: 10 }
    ],
    sentimenKonteks: [
      "Gesaan menghentikan komen agresif berunsur 'body-shaming'.",
      "Sokongan terhadap akta lesen siber."
    ],
    keywordsBerkaitan: ["Buli Siber", "MCMC", "Lesen Media Sosial", "Keselamatan Digital", "Kesihatan Mental"],
    entitiBerkaitan: ["Kementerian Komunikasi", "MCMC", "PDRM Siasatan Siber"],
    cadanganKandungan: [
      { format: "WEH Nak Tau", title: "Apakah denda baharu pembuli siber di bawah draf akta?" },
      { format: "WEH Check", title: "Betulkah akaun palsu boleh dijejak menggunakan alamat IP sahaja?" }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 11, trendHeatScore: 78 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 6, trendHeatScore: 91 }
    ]
  },
  {
    id: "trend_007",
    rank: 7,
    keyword: "Kadar Dividen KWSP Terkini",
    category: "Ekonomi",
    vertical: "WEH Money",
    score: 90,
    growthRate: "+18% dalam 60 minit",
    mentionCount: "21,450 sebutan",
    platformUtama: "Facebook",
    confidenceScore: 99,
    statusPengesahan: "Disahkan",
    risiko: "Rendah",
    waktuKemasKini: "2:00 petang",
    velocity: "Stabil",
    risk3R: "Rendah",
    newsValue: "Sangat Tinggi",
    sourceDiversity: 15,
    sources: [
      "Unjuran penganalisis meletakkan sasaran pulangan KWSP konvensional sekitar 5.85%."
    ],
    fullIntelBrief: "Isu kestabilan kewangan jangka panjang pekerja swasta mula menjadi bualan rancak. Kadar dividen dipantau rapat memandangkan prestasi bursa tempatan menunjukkan daya ketahanan kukuh.",
    newsLinks: [
      { label: "KWSP Rasmi", url: "https://kwsp.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 10 },
      { name: "Kekerapan Berita", value: 92 },
      { name: "Sebutan Sosial", value: 95 },
      { name: "Interaksi Pengguna", value: 89 },
      { name: "Kepelbagaian Sumber", value: 80 }
    ],
    apaYangBerlaku: "Perdebatan sihat tercetus dalam kalangan penyumbang KWSP swasta membandingkan pulangan pelaburan skim patuh Syariah lawan instrumen pelaburan ekuiti luar negara.",
    faktaDisahkan: [
      "KWSP mencatatkan keuntungan pelaburan kasar lebih tinggi pada suku ketiga hasil lonjakan pasaran saham AS."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan skim simpanan paksa baharu yang menyekat pengeluaran akaun 3 (Fleksibel) sebelum usia 55."
    ],
    responsRasmi: [
      "KWSP menegaskan polisi pengeluaran Akaun Fleksibel kekal tidak berubah, rakyat bebas berbelanja kecemasan mengikut keperluan asal."
    ],
    apaYangBelumDiketahui: [
      "Tarikh muktamad pengumuman rasmi kadar pulangan oleh pengerusi lembaga."
    ],
    sentimenMetrics: [
      { name: "Menyokong", value: 50 },
      { name: "Neutral", value: 30 },
      { name: "Bimbang", value: 20 }
    ],
    sentimenKonteks: [
      "Pekerja berharap dapat menikmati dividen yang tinggi menangkis kadar inflasi.",
      "Perbincangan kaedah memaksimumkan caruman sukarela diri sendiri."
    ],
    keywordsBerkaitan: ["KWSP", "Dividen KWSP", "Akaun Fleksibel", "Pelaburan", "PencenSaraan"],
    entitiBerkaitan: ["KWSP", "Kementerian Kewangan", "Penganalisis Maybank Investment"],
    cadanganKandungan: [
      { format: "WEH Money", title: "Cara mengira anggaran dividen caruman bulanan anda." }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 14, trendHeatScore: 76 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 7, trendHeatScore: 90 }
    ]
  },
  {
    id: "trend_008",
    rank: 8,
    keyword: "Kecerdasan Buatan (AI) Malaysia",
    category: "Teknologi",
    vertical: "WEH Nak Tau",
    score: 90,
    growthRate: "+15% dalam 60 minit",
    mentionCount: "9,120 sebutan",
    platformUtama: "X",
    confidenceScore: 91,
    statusPengesahan: "Disahkan",
    risiko: "Rendah",
    waktuKemasKini: "1:45 petang",
    velocity: "Stabil",
    risk3R: "Rendah",
    newsValue: "Tinggi",
    sourceDiversity: 12,
    sources: [
      "Pelan Hala Tuju AI Negara bakal menyaksikan pembinaan koridor super-komparatif siber di Cyberjaya."
    ],
    fullIntelBrief: "Inisiatif memperkasakan kedaulatan digital menyaksikan penglibatan dana swasta antarabangsa membina pusat data AI bersih di Johor dan Selangor.",
    newsLinks: [
      { label: "MIMOS AI Research", url: "https://mimos.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 12 },
      { name: "Kekerapan Berita", value: 85 },
      { name: "Sebutan Sosial", value: 82 },
      { name: "Interaksi Pengguna", value: 88 },
      { name: "Kepelbagaian Sumber", value: 79 }
    ],
    apaYangBerlaku: "MIMOS bekerjasama dengan NVIDIA melancarkan modul pembelajaran kecerdasan buatan khas menggunakan dialek Bahasa Melayu bagi meningkatkan ketepatan terjemahan tempatan.",
    faktaDisahkan: [
      "Peruntukan RM150 juta diaktifkan bagi menubuhkan pusat penyelidikan AI di UTM Johor Baru."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan kononnya pengautomasian pejabat kerajaan akan mengurangkan separuh jawatan kakitangan awam dalam tempoh 18 bulan."
    ],
    responsRasmi: [
      "Menteri Digital menafikan pengurangan kakitangan awam, menjelaskan AI digunakan sebagai pembantu operasi bagi mengurangkan kelewatan draf permohonan rakyat."
    ],
    apaYangBelumDiketahui: [
      "Silibus rasmi pendigitalan sekolah menggunakan kaedah adaptif AI."
    ],
    sentimenMetrics: [
      { name: "Menyokong", value: 60 },
      { name: "Neutral", value: 25 },
      { name: "Bimbang", value: 15 }
    ],
    sentimenKonteks: [
      "Pelajar dan usahawan muda teruja mencuba aplikasi AI baharu.",
      "Keresahan golongan pendidik berkenaan integriti penulisan kerja kursus akademik."
    ],
    keywordsBerkaitan: ["AI Malaysia", "MIMOS", "NVIDIA", "Pusat Data", "Menteri Digital"],
    entitiBerkaitan: ["Kementerian Digital", "NVIDIA", "UTM", "MIMOS"],
    cadanganKandungan: [
      { format: "WEH Nak Tau", title: "Bagaimana narasumber AI tempatan menyelamatkan bahasa ibunda?" }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 10, trendHeatScore: 80 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 8, trendHeatScore: 90 }
    ]
  },
  {
    id: "trend_009",
    rank: 9,
    keyword: "Isu Pemilikan Tanah Kampung Baru",
    category: "Politik",
    vertical: "WEH Siasat",
    score: 90,
    growthRate: "+12% dalam 60 minit",
    mentionCount: "6,540 sebutan",
    platformUtama: "Facebook",
    confidenceScore: 85,
    statusPengesahan: "Dipertikaikan",
    risiko: "Tinggi",
    waktuKemasKini: "1:30 petang",
    velocity: "Sederhana",
    risk3R: "Tinggi",
    newsValue: "Tinggi",
    sourceDiversity: 8,
    sources: [
      "Rundingan ganti rugi pemaju swasta dicabar pemilik waris tanah warisan Kampung Baru."
    ],
    fullIntelBrief: "Isu klasik pencerobohan dan pemodenan Kampung Baru kembali hangat apabila dokumen tawaran baharu mendedahkan nilai transaksi pampasan di bawah kadar taksiran semasa.",
    newsLinks: [
      { label: "Dewan Bandaraya Kuala Lumpur", url: "https://dbkl.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 72 },
      { name: "Kekerapan Berita", value: 78 },
      { name: "Sebutan Sosial", value: 80 },
      { name: "Interaksi Pengguna", value: 85 },
      { name: "Kepelbagaian Sumber", value: 60 }
    ],
    apaYangBerlaku: "Pertikaian antara syarikat konsesi pembangunan Kuala Lumpur dengan waris generasi ketiga pemilik lot tradisi Kampung Baru mengenai kewajaran pengambilan tanah bersejarah.",
    faktaDisahkan: [
      "Enakmen Rizab Melayu Wilayah Persekutuan kekal melindungi plot Kampung Baru daripada pemilikan asing."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan ada cubaan membatalkan hak rizab secara senyap bagi membolehkan pembinaan kondominium mega bebas."
    ],
    responsRasmi: [
      "Menteri Wilayah Persekutuan menegaskan tiada perubahan status tanah rizab Melayu Kampung Baru, jaminan hak warisan dipelihara."
    ],
    apaYangBelumDiketahui: [
      "Jumlah tuntutan ganti rugi konsesi yang dipersetujui sebulat suara oleh ahli jawatankuasa wakil waris pendudukan."
    ],
    sentimenMetrics: [
      { name: "Marah", value: 55 },
      { name: "Neutral", value: 30 },
      { name: "Menyokong", value: 15 }
    ],
    sentimenKonteks: [
      "Keresahan kehilangan sejarah budaya Melayu di pusat kota raya.",
      "Gesa kerajaan campur tangan menyelaraskan harga adil pasaran hartanah."
    ],
    keywordsBerkaitan: ["Kampung Baru", "Tanah Rizab", "Warisan", "DBKL", "Pampasan Hartanah"],
    entitiBerkaitan: ["Kementerian Wilayah Persekutuan", "DBKL", "Persatuan Waris Kampung Baru"],
    cadanganKandungan: [
      { format: "WEH Siasat", title: "Membongkar nilai taksiran sebenar sekaki tanah Kampung Baru." }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 12, trendHeatScore: 75 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 9, trendHeatScore: 90 }
    ]
  },
  {
    id: "trend_010",
    rank: 10,
    keyword: "Subsidi Pas Bulanan LRT My50",
    category: "Ekonomi",
    vertical: "WEH Transit",
    score: 90,
    growthRate: "+10% dalam 60 minit",
    mentionCount: "14,500 sebutan",
    platformUtama: "Threads",
    confidenceScore: 98,
    statusPengesahan: "Disahkan",
    risiko: "Rendah",
    waktuKemasKini: "12:00 tengah hari",
    velocity: "Stabil",
    risk3R: "Rendah",
    newsValue: "Tinggi",
    sourceDiversity: 10,
    sources: [
      "Prasarana jamin peruntukan subsidi pas pengangkutan My50 diteruskan menerusi Belanjawan baharu."
    ],
    fullIntelBrief: "Pas bulanan tanpa had My50 bagi transit LRT/MRT dikekalkan, membantu meringankan kos commute harian ratusan ribu pekerja bandar raya Kuala Lumpur.",
    newsLinks: [
      { label: "MyRapid Portal", url: "https://myrapid.com.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 8 },
      { name: "Kekerapan Berita", value: 88 },
      { name: "Sebutan Sosial", value: 91 },
      { name: "Interaksi Pengguna", value: 93 },
      { name: "Kepelbagaian Sumber", value: 70 }
    ],
    apaYangBerlaku: "Commuters di Lembah Klang berkongsi kepuasan mengekalkan perbelanjaan transit bulanan di takat RM50 sahaja berbanding pemanduan kenderaan fizikal yang dibebani tol.",
    faktaDisahkan: [
      "Prasarana mengumumkan lebih 220,000 pengguna aktif mendaftar pas My50 setiap bulan."
    ],
    dakwaanBelumDisahkan: [
      "Kononnya had kelayakan My50 akan dihadkan hanya untuk pelajar dan warga emas bermula tahun depan."
    ],
    responsRasmi: [
      "Prasarana mengeluarkan pekeliling rasmi mengesahkan My50 tetap dibuka kepada semua rakyat Malaysia berusia 18 tahun ke atas tanpa had kelayakan."
    ],
    apaYangBelumDiketahui: [
      "Rancangan perluasan skim pas My50 ke sistem transit rel MRT koridor laluan luar bandar."
    ],
    sentimenMetrics: [
      { name: "Menyokong", value: 80 },
      { name: "Neutral", value: 15 },
      { name: "Bimbang", value: 5 }
    ],
    sentimenKonteks: [
      "Netizen gembira kebajikan kos transit dipelihara.",
      "Gesa peningkatan kekerapan tren waktu sibuk (peak hour)."
    ],
    keywordsBerkaitan: ["My50", "Commute", "LRT", "Prasarana", "Lembah Klang", "MRT3"],
    entitiBerkaitan: ["Prasarana", "Kementerian Pengangkutan", "RapidKL"],
    cadanganKandungan: [
      { format: "WEH Data", title: "Statistik: Berapa banyak kita jimat menggunakan pas My50?" }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 15, trendHeatScore: 74 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 10, trendHeatScore: 90 }
    ]
  },

  // ==========================================
  // GROUP B: RISING 10 — SEDANG MENINGKAT (Rank 11 - 20)
  // Isu dengan kadar pertumbuhan tercepat (Heat score 75 - 89)
  // ==========================================
  {
    id: "trend_011",
    rank: 11,
    keyword: "Skim Gaji Progresif Swasta",
    category: "Ekonomi",
    vertical: "WEH Money",
    score: 88,
    growthRate: "+124% dalam 60 minit",
    mentionCount: "12,450 sebutan",
    platformUtama: "LinkedIn",
    confidenceScore: 91,
    statusPengesahan: "Disahkan",
    risiko: "Rendah",
    waktuKemasKini: "11:30 pagi",
    velocity: "Meningkat Tegak",
    risk3R: "Rendah",
    newsValue: "Tinggi",
    sourceDiversity: 11,
    sources: [
      "Kementerian Sumber Manusia umum pilot projek penyertaan 1000 syarikat swasta."
    ],
    fullIntelBrief: "Skim gaji progresif memacu maklumbalas positif daripada golongan pekerja muda, namun majikan menyuarakan keluhan pengurusan aliran tunai pasca pandemik. Fokus utama adalah mengimbangi produktiviti dengan upah munasabah.",
    newsLinks: [
      { label: "Gaji Progresif HR Portal", url: "https://gajiprogresif.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 15 },
      { name: "Kekerapan Berita", value: 85 },
      { name: "Sebutan Sosial", value: 90 },
      { name: "Interaksi Pengguna", value: 92 },
      { name: "Kepelbagaian Sumber", value: 75 }
    ],
    apaYangBerlaku: "Kementerian Sumber Manusia mengaktifkan rundingan rintis bersama beberapa kesatuan sekerja swasta bagi menetapkan siling kenaikan upah berdasarkan kelayakan kompetensi kemahiran digital baru.",
    faktaDisahkan: [
      "Majikan yang menyertai skim progresif rintis berhak menuntut dana subsidi kerajaan bagi menampung liputan kenaikan gaji tahun pertama staf."
    ],
    dakwaanBelumDisahkan: [
      "Syarikat korporat besar didakwa enggan menyertai skim secara sukarela demi menjaga margin keuntungan pelabur luar."
    ],
    responsRasmi: [
      "Satu jawatankuasa khas ditubuhkan untuk menyelia draf pindaan polisi upah sukarela ke sistem wajib secara berperingkat."
    ],
    apaYangBelumDiketahui: [
      "Senarai penuh 1,000 nama korporat rintis yang mendapat persetujuan kelayakan fasa awal."
    ],
    sentimenMetrics: [
      { name: "Menyokong", value: 65 },
      { name: "Neutral", value: 20 },
      { name: "Menolak", value: 15 }
    ],
    sentimenKonteks: [
      "Pekerja menyambut baik peluang menikmati kenaikan upah berasaskan sijil.",
      "Majikan bimbang kos overhed bulanan melonjak melampau kabus kegawatan."
    ],
    keywordsBerkaitan: ["Gaji Progresif", "Kesatuan Sekerja", "Sumber Manusia", "Subsidi Gaji"],
    entitiBerkaitan: ["Kementerian Sumber Manusia", "MEF", "MTUC"],
    cadanganKandungan: [
      { format: "WEH Nak Tau", title: "Apakah beza gaji minimum dan gaji progresif?" }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 19, trendHeatScore: 68 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 11, trendHeatScore: 88 }
    ]
  },
  {
    id: "trend_012",
    rank: 12,
    keyword: "Kenaikan Harga Barang Runcit",
    category: "Ekonomi",
    vertical: "WEH Money",
    score: 86,
    growthRate: "+98% dalam 60 minit",
    mentionCount: "15,100 sebutan",
    platformUtama: "Facebook",
    confidenceScore: 94,
    statusPengesahan: "Disahkan",
    risiko: "Rendah",
    waktuKemasKini: "11:00 pagi",
    velocity: "Meningkat Tegak",
    risk3R: "Rendah",
    newsValue: "Sangat Tinggi",
    sourceDiversity: 13,
    sources: [
      "KPDN lancar ops pemantauan kartel runcit selepas penularan kenaikan mendadak harga bawang merah India."
    ],
    fullIntelBrief: "Desas-desus kenaikan harga barang basah mengejut di pasar raya Lembah Klang memicu langkah penguatkuasaan KPDN melakukan pemantauan rantaian borong import.",
    newsLinks: [
      { label: "KPDN Portal Rasmi", url: "https://kpdn.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 89 },
      { name: "Kekerapan Berita", value: 85 },
      { name: "Sebutan Sosial", value: 92 },
      { name: "Interaksi Pengguna", value: 90 },
      { name: "Kepelbagaian Sumber", value: 65 }
    ],
    apaYangBerlaku: "KPDN mengeluarkan notis penjelasan harga basah di bawah akta kawalan antipencatutan bagi mengawal spekulasi margin keuntungan melampau pemborong runcit.",
    faktaDisahkan: [
      "Harga bawang dan rempah import stabil di peringkat pengedaran pelabuhan utama."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan ada tindakan menyorok stok barangan kawalan seperti gula dan minyak masak sebutan di sempadan negeri."
    ],
    responsRasmi: [
      "KPDN memberi amaran lesen borong pengedar degil akan ditarik serta merta jika sabit kesalahan pencatutan."
    ],
    apaYangBelumDiketahui: [
      "Kelemahan sistem logistik rantaian sejuk tempatan yang membazirkan hasil tanaman pekebun Cameron."
    ],
    sentimenMetrics: [
      { name: "Marah", value: 75 },
      { name: "Bimbang", value: 20 },
      { name: "Neutral", value: 5 }
    ],
    sentimenKonteks: [
      "Rakyat penat dengan permainan harga peniaga di musim perayaan.",
      "Gesa pemulihan dana bantuan BUDI agro petani kecil."
    ],
    keywordsBerkaitan: ["Harga Barang", "Antipencatutan", "KPDN", "Barangan Kawalan"],
    entitiBerkaitan: ["KPDN", "FAMA", "Syarikat Borong Nasional"],
    cadanganKandungan: [
      { format: "WEH Check", title: "Benarkah stok bawang merah negara sengaja disorok kartel?" }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 18, trendHeatScore: 70 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 12, trendHeatScore: 86 }
    ]
  },
  {
    id: "trend_013",
    rank: 13,
    keyword: "Pencemaran Sungai Kim Kim Baru",
    category: "Bencana",
    vertical: "WEH Borneo/Selatan",
    score: 85,
    growthRate: "+95% dalam 60 minit",
    mentionCount: "7,450 sebutan",
    platformUtama: "Facebook",
    confidenceScore: 90,
    statusPengesahan: "Disahkan",
    risiko: "Tinggi",
    waktuKemasKini: "10:30 pagi",
    velocity: "Meningkat Tegak",
    risk3R: "Rendah",
    newsValue: "Tinggi",
    sourceDiversity: 8,
    sources: [
      "Jabatan Alam Sekitar (JAS) Johor kesan loji industri membuang sisa toksik haram sekali lagi."
    ],
    fullIntelBrief: "Laporan pencemaran sisa kimia industri dikesan mencederakan ekosistem sungai di Pasir Gudang Johor. Penduduk digesa memakai pelindung pernafasan.",
    newsLinks: [
      { label: "JAS Johor Update", url: "https://jas.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 92 },
      { name: "Kekerapan Berita", value: 80 },
      { name: "Sebutan Sosial", value: 85 },
      { name: "Interaksi Pengguna", value: 88 },
      { name: "Kepelbagaian Sumber", value: 58 }
    ],
    apaYangBerlaku: "Bau busuk dari parit utama perindustrian Pasir Gudang dihidu penduduk sekitar perumahan, mengimbas kembali sejarah toksik hitam tahun 2019.",
    faktaDisahkan: [
      "JAS mengesahkan mengesan kehadiran sebatian berasaskan sulfur di parit awam zon industi berdekatan."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan sisa dibuang secara sengaja pada waktu hujan tengah malam bagi mengelak alat sensor pemantau siber JAS."
    ],
    responsRasmi: [
      "Exco Alam Sekitar Johor menegaskan dua kilang kimia telah disita serta merta bagi siasatan forensik kimia sampel."
    ],
    apaYangBelumDiketahui: [
      "Jumlah denda kerosakan alam sekitar muktamad yang boleh diputuskan mahkamah mengikut enakmen alam sekitar diperketat."
    ],
    sentimenMetrics: [
      { name: "Marah", value: 80 },
      { name: "Bimbang", value: 15 },
      { name: "Neutral", value: 5 }
    ],
    sentimenKonteks: [
      "Penduduk bimbang keselamatan kesihatan paru-paru anak sekolah.",
      "Tuntutan denda penutupan terus kilang toksik berulang."
    ],
    keywordsBerkaitan: ["Sungai Kim Kim", "Sisa Toksik", "Pasir Gudang", "JAS Johor"],
    entitiBerkaitan: ["JAS", "Exco Alam Sekitar Johor", "Majlis Bandaraya Pasir Gudang"],
    cadanganKandungan: [
      { format: "WEH Siasat", title: "Mengapa dalang industri toksik Kim Kim berkali-kali terlepas?" }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 22, trendHeatScore: 65 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 13, trendHeatScore: 85 }
    ]
  },
  {
    id: "trend_014",
    rank: 14,
    keyword: "Sistem Kehadiran RFID Sekolah",
    category: "Teknologi",
    vertical: "WEH Nak Tau",
    score: 83,
    growthRate: "+89% dalam 60 minit",
    mentionCount: "8,120 sebutan",
    platformUtama: "TikTok",
    confidenceScore: 92,
    statusPengesahan: "Disahkan",
    risiko: "Rendah",
    waktuKemasKini: "10:15 pagi",
    velocity: "Sederhana",
    risk3R: "Rendah",
    newsValue: "Sederhana",
    sourceDiversity: 10,
    sources: [
      "Kementerian Pendidikan luluskan skim pendigitalan kehadiran gred pintar rintis di 50 asrama penuh."
    ],
    fullIntelBrief: "Kerjasama PIBG memasang sensor kad RFID murid memacu kedudukan perbincangan keluarga muda, sebahagian menyambut baik verifikasi masa nyata anak selamat mendarat di pagar sekolah.",
    newsLinks: [
      { label: "Kementerian Pendidikan Malaysia", url: "https://moe.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 18 },
      { name: "Kekerapan Berita", value: 74 },
      { name: "Sebutan Sosial", value: 82 },
      { name: "Interaksi Pengguna", value: 85 },
      { name: "Kepelbagaian Sumber", value: 68 }
    ],
    apaYangBerlaku: "Ibu bapa mula berkongsi tangkapan skrin aplikasi notifikasi WhatsApp kehadiran pintar sekolah anak masing-masing, menyatakan kelegaan keselamatan commutes harian murid.",
    faktaDisahkan: [
      "Kos pemasangan pelat rintis RFID diletakkan di bawah tanggungan dana korporat CSR telekomunikasi utama."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan kononnya caj bulanan tambahan sebanyak RM15 akan dipotong dari yuran pendaftaran murid secara wajib."
    ],
    responsRasmi: [
      "Timbalan Menteri Pendidikan menjelaskan tiada sebarang yuran bulanan wajib dikenakan kepada keluarga bagi skim RFID murni."
    ],
    apaYangBelumDiketahui: [
      "Kelayakan sekolah harian luar bandar mendapat pengagihan set perkakasan sensor komputer percuma."
    ],
    sentimenMetrics: [
      { name: "Menyokong", value: 70 },
      { name: "Neutral", value: 18 },
      { name: "Bimbang", value: 12 }
    ],
    sentimenKonteks: [
      "Sokongan penuh keselamatan pencegahan ponteng.",
      "Bimbang kos pendaftaran ganti kad jika anak tersorong hilang."
    ],
    keywordsBerkaitan: ["RFID Sekolah", "Kehadiran Pintar", "PIBG", "KPM", "Pagar Pintar"],
    entitiBerkaitan: ["KPM", "PIBG Kebangsaan", "TM Group CSR"],
    cadanganKandungan: [
      { format: "WEH Nak Tau", title: "Bagaimana RFID menghalang kes buli & ponteng asrama?" }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 20, trendHeatScore: 68 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 14, trendHeatScore: 83 }
    ]
  },
  {
    id: "trend_015",
    rank: 15,
    keyword: "Sistem Kerja 4 Hari Seminggu",
    category: "Sosial",
    vertical: "WEH Rakyat",
    score: 82,
    growthRate: "+82% dalam 60 minit",
    mentionCount: "13,900 sebutan",
    platformUtama: "LinkedIn",
    confidenceScore: 88,
    statusPengesahan: "Disahkan",
    risiko: "Rendah",
    waktuKemasKini: "10:00 pagi",
    velocity: "Stabil",
    risk3R: "Rendah",
    newsValue: "Sederhana",
    sourceDiversity: 10,
    sources: [
      "Syarikat teknologi tempatan lapor kepuasan staf meningkat 40% pasca tempoh ujian.",
      "Sektor perkilangan nyatakan kebimbangan kejatuhan kualiti output eksport.",
      "Tinjauan awam hantaran LinkedIn menyokong penuh kelonggaran kerja hibrid."
    ],
    fullIntelBrief: "Isu gaya hidup sihat (work-life balance) menjadi kegemaran perbincangan profesional muda. Signal menunjukkan kecenderungan tinggi menyokong tadbir urus fleksibel.",
    newsLinks: [
      { label: "Berita Harian: Kesediaan Majikan Sistem Kerja 4 Hari", url: "https://www.bharian.com.my/rencana/minda-pembaca/2026/04/kesediaan-majikan-malaysia-laksana-sistem-kerja-empat-hari" },
      { label: "Malaysiakini: Isu WFH & Akta Kerja Fleksibel", url: "https://www.malaysiakini.com/news/711222" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 10 },
      { name: "Kekerapan Berita", value: 60 },
      { name: "Sebutan Sosial", value: 76 },
      { name: "Interaksi Pengguna", value: 80 },
      { name: "Kepelbagaian Sumber", value: 68 }
    ],
    apaYangBerlaku: "Idea memendekkan tempoh masa pejabat konvensional dari 5 hari ke 4 hari kembali tular berikutan kejayaan skim rintis syarikat e-dagang tempatan yang mengekalkan tahap KPI optimum.",
    faktaDisahkan: [
      "Tiada pindaan akta kerja 1955 setakat ini untuk menurunkan hari bekerja am swasta secara mandatori."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan pemotongan gaji 20% secara berkadar jika kakitangan memilih bekerja 4 hari seminggu."
    ],
    responsRasmi: [
      "Jabatan Tenaga Kerja menegaskan sebarang penyelarasan masa kerja tidak membenarkan pengurangan kadar upah asas yang dipersetujui dalam kontrak pelantikan."
    ],
    apaYangBelumDiketahui: [
      "Kesan sebenar produktiviti sektor penjagaan kesihatan peguam awam jika waktu bekerja disingkatkan."
    ],
    sentimenMetrics: [
      { name: "Menyokong", value: 85 },
      { name: "Neutral", value: 10 },
      { name: "Bimbang", value: 5 }
    ],
    sentimenKonteks: [
      "Golongan muda mendambakan pengasingan kualiti hidup keluarga.",
      "Majikan risau peningkatan kos upah buruh gantian."
    ],
    keywordsBerkaitan: ["4 Hari Bekerja", "Syarikat Teknologi", "Tenaga Kerja", "Work Live Balance"],
    entitiBerkaitan: ["Jabatan Tenaga Kerja", "MEF Korporat", "LinkedIn Malaysia"],
    cadanganKandungan: [
      { format: "WEH Nak Tau", title: "Syarat melaksanakan kerja 4 hari tanpa potong gaji." }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 13, trendHeatScore: 77 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 15, trendHeatScore: 82 }
    ]
  },
  {
    id: "trend_016",
    rank: 16,
    keyword: "Kos Hartanah & Rumah Pertama",
    category: "Ekonomi",
    vertical: "WEH Money",
    score: 80,
    growthRate: "+77% dalam 60 minit",
    mentionCount: "11,200 sebutan",
    platformUtama: "Threads",
    confidenceScore: 87,
    statusPengesahan: "Disahkan",
    risiko: "Rendah",
    waktuKemasKini: "9:30 pagi",
    velocity: "Stabil",
    risk3R: "Rendah",
    newsValue: "Tinggi",
    sourceDiversity: 9,
    sources: [
      "Kementerian Perumahan kaji skim pinjaman deposit 10% percuma bagi pembeli bumiputera muda pertama."
    ],
    fullIntelBrief: "Impian pemilikan kediaman bagi lepasan graduan menjadi polemik berikutan jurang pendapatan bersih lawan peningkatan harga tawaran kondominium bandar.",
    newsLinks: [
      { label: "KPKT Portal", url: "https://kpkt.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 65 },
      { name: "Kekerapan Berita", value: 72 },
      { name: "Sebutan Sosial", value: 80 },
      { name: "Interaksi Pengguna", value: 83 },
      { name: "Kepelbagaian Sumber", value: 64 }
    ],
    apaYangBerlaku: "Gen Z meluahkan kekecewaan di Threads kerana ketiadaan kediaman bertanah mampu milik berharga bawah RM300k dalam radius 35km dari pusat bandar KL.",
    faktaDisahkan: [
      "Harga purata rumah teres di Selangor mencatatkan kenaikan tahunan sebanyak 4.2%."
    ],
    dakwaanBelumDisahkan: [
      "Syarikat pembinaan didakwa sengaja menyimpan stok kondominium tidak terjual bagi menaikkan harga sewa secara palsu."
    ],
    responsRasmi: [
      "KPKT mengesahkan skim PR1MA akan beralih fokus membina kediaman modular bersebelahan stesen MRT transit utama."
    ],
    apaYangBelumDiketahui: [
      "Syarikat pembiayaan mikro yang sudi menawarkan kadar faedah bawah 3.1% bagi graduan bertaji rendah."
    ],
    sentimenMetrics: [
      { name: "Bimbang", value: 55 },
      { name: "Neutral", value: 30 },
      { name: "Menyokong", value: 15 }
    ],
    sentimenKonteks: [
      "Graduan khuatir terpaksa menyewa seumur hidup.",
      "Gesa pembetulan sistem harga siling rumah prima rakyat."
    ],
    keywordsBerkaitan: ["Rumah Pertama", "Hartanah", "PR1MA", "Bantuan Perumahan"],
    entitiBerkaitan: ["KPKT", "PR1MA Corp", "Sime Darby Property"],
    cadanganKandungan: [
      { format: "WEH Money", title: "Formula munasabah menghitung kelayakan gaji pinjaman rumah." }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 16, trendHeatScore: 73 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 16, trendHeatScore: 80 }
    ]
  },
  {
    id: "trend_017",
    rank: 17,
    keyword: "Scam Kripto Telegram & Polis",
    category: "Teknologi",
    vertical: "WEH Check",
    score: 79,
    growthRate: "+73% dalam 60 minit",
    mentionCount: "9,400 sebutan",
    platformUtama: "Instagram",
    confidenceScore: 91,
    statusPengesahan: "Disahkan",
    risiko: "Sederhana",
    waktuKemasKini: "9:00 pagi",
    velocity: "Meningkat Tegak",
    risk3R: "Rendah",
    newsValue: "Tinggi",
    sourceDiversity: 10,
    sources: [
      "PDRM JSJK dedahkan kerugian RM14 Juta membabitkan modus operandi pelaburan robot kripto palsu di aplikasi sembang."
    ],
    fullIntelBrief: "Penjenayah siber mengeksploitasi kumpulan sembang Telegram dengan menyamar sebagai broker kripto berdaftar. PDRM meningkatkan amaran tapisan.",
    newsLinks: [
      { label: "PDRM JSJK FB Update", url: "https://www.facebook.com/JSJKPDRM" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 85 },
      { name: "Kekerapan Berita", value: 78 },
      { name: "Sebutan Sosial", value: 82 },
      { name: "Interaksi Pengguna", value: 86 },
      { name: "Kepelbagaian Sumber", value: 70 }
    ],
    apaYangBerlaku: "Beberapa mangsa berkongsi tangkap layar perbincangan sindiket mengumpan deposit RM500 dengan jaminan pulangan dalam masa 3 jam sahaja menerusi akaun palsu.",
    faktaDisahkan: [
      "Sekurang-kurangnya 12 tangkapan proksi akaun bank keldai siber telah dilakukan minggu ini."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan tular kononnya dalang skim ini menyewa pejabat mewah di tengah-tengah segitiga emas KL bagi menyamar sebagai syarikat sah."
    ],
    responsRasmi: [
      "PDRM menasihatkan awam menyemak status syarikat kewangan pelabur menerusi portal semakan BNM (Bank Negara Malaysia) sebelum memindahkan sebarang wang basah."
    ],
    apaYangBelumDiketahui: [
      "Teknik pengubahan wang haram merentasi rantaian blok siber antarabangsa yang menyukarkan penjejakan balik baki mangsa."
    ],
    sentimenMetrics: [
      { name: "Marah", value: 65 },
      { name: "Bimbang", value: 30 },
      { name: "Neutral", value: 5 }
    ],
    sentimenKonteks: [
      "Kemarahan tumpu kepada ketidakupayaan bank menghalang transaksi pantas ke akaun penipu.",
      "Gesa penyekatan terus aplikasi Telegram yang enggan berkerjasama."
    ],
    keywordsBerkaitan: ["Scam Kripto", "Mule Account", "JSJK PDRM", "Bank Negara"],
    entitiBerkaitan: ["PDRM JSJK", "Bank Negara Malaysia", "Suruhanjaya Sekuriti"],
    cadanganKandungan: [
      { format: "WEH Check", title: "Ciri-ciri kumpulan sembang Telegram scam yang wajib anda keluar segera." }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 25, trendHeatScore: 61 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 17, trendHeatScore: 79 }
    ]
  },
  {
    id: "trend_018",
    rank: 18,
    keyword: "Amaran Gelombang Haba El Nino",
    category: "Bencana",
    vertical: "WEH Borneo/Atas",
    score: 78,
    growthRate: "+71% dalam 60 minit",
    mentionCount: "8,200 sebutan",
    platformUtama: "X",
    confidenceScore: 96,
    statusPengesahan: "Disahkan",
    risiko: "Rendah",
    waktuKemasKini: "8:45 pagi",
    velocity: "Stabil",
    risk3R: "Rendah",
    newsValue: "Biasa",
    sourceDiversity: 9,
    sources: [
      "MetMalaysia sahkan 3 kawasan di utara semenanjung mencatatkan paras suhu kuning melebihi 37 darjah celsius berturut."
    ],
    fullIntelBrief: "UTARA tanah air merekodkan paras gelombang kering menyebabkan gesaan sekolah mengehadkan aktiviti sukan padang demi keselamatan haba pelajar.",
    newsLinks: [
      { label: "Kementerian Kesihatan Malaysia", url: "https://moh.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 15 },
      { name: "Kekerapan Berita", value: 80 },
      { name: "Sebutan Sosial", value: 78 },
      { name: "Interaksi Pengguna", value: 82 },
      { name: "Kepelbagaian Sumber", value: 75 }
    ],
    apaYangBerlaku: "MetMalaysia merekodkan daerah Chuping (Perlis) dan Sik (Kedah) mencatatkan rekod suhu tinggi kuning, mendesak penyediaan bekalan air tambahan di takungan empangan lokal.",
    faktaDisahkan: [
      "Sekolah dibenarkan menangguhkan aktiviti kokurikulum luar kelas jika bacaan melepasi 35 darjah celsius."
    ],
    dakwaanBelumDisahkan: [
      "Khabar angin bekalan elektrik grid nasional bakal dipotong secara bergilir akibat lebihan beban penghawa dingin."
    ],
    responsRasmi: [
      "TNB menjamin pencawang pengagihan adalah 100% kukuh menguruskan permintaan puncak elektrik semasa monsun kemarau."
    ],
    apaYangBelumDiketahui: [
      "Kesan kemarau panjang terhadap kualiti padi sawah pesawah MADA Kedah bagi tuaian musim ini."
    ],
    sentimenMetrics: [
      { name: "Bimbang", value: 60 },
      { name: "Neutral", value: 35 },
      { name: "Menyokong", value: 5 }
    ],
    sentimenKonteks: [
      "Keluarga bimbang kesihatan strok haba anak kecil.",
      "Gesa pengagihan air percuma kepada perkampungan pedalaman terkesan."
    ],
    keywordsBerkaitan: ["El Nino", "Suhu Tinggi", "Gelombang Haba", "TNB", "Kemarau"],
    entitiBerkaitan: ["MetMalaysia", "TNB", "Kementerian Kesihatan", "MADA"],
    cadanganKandungan: [
      { format: "WEH Nak Tau", title: "Tanda-tanda awal strok haba pada anak anda." }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 17, trendHeatScore: 72 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 18, trendHeatScore: 78 }
    ]
  },
  {
    id: "trend_019",
    rank: 19,
    keyword: "Pengeksportan Durian Musang King",
    category: "Ekonomi",
    vertical: "WEH Borneo/Tani",
    score: 76,
    growthRate: "+65% dalam 60 minit",
    mentionCount: "5,450 sebutan",
    platformUtama: "Facebook",
    confidenceScore: 92,
    statusPengesahan: "Disahkan",
    risiko: "Rendah",
    waktuKemasKini: "8:30 pagi",
    velocity: "Stabil",
    risk3R: "Rendah",
    newsValue: "Biasa",
    sourceDiversity: 7,
    sources: [
      "FAMA setuju hantar 500 tan pertama buah segar ke pelabuhan Shanghai di bawah protokol kualiti baru."
    ],
    fullIntelBrief: "Eksport buah segar jenis durian premium mendarat di bursa kelulusan China. Pekebun menyambut baik peluang pampasan harga tinggi, namun peminat tempatan keluh kehabisan stok gred super.",
    newsLinks: [
      { label: "FAMA Agro Portal", url: "https://fama.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 20 },
      { name: "Kekerapan Berita", value: 70 },
      { name: "Sebutan Sosial", value: 75 },
      { name: "Interaksi Pengguna", value: 78 },
      { name: "Kepelbagaian Sumber", value: 60 }
    ],
    apaYangBerlaku: "Kementerian Pertanian bekerjasama dengan rantaian logistik kargo dingin bagi mempercepat penghantaran durian segar terus ke pasar raya Beijing dalam tempoh 24 jam selepas luruh.",
    faktaDisahkan: [
      "Hanya ladang berdaftar pengiktirafan MyGAP (Good Agricultural Practice) dibenarkan mengeksport unit buah segar."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan kononnya ladang haram di Raub Pahang dieksploitasi pihak berskala besar untuk membekal kargo asing tersebut."
    ],
    responsRasmi: [
      "Kementerian menegaskan tapisan ketat penguatkuasaan dijalankan bagi menghalang jenama Musang King dicemari hasil ladang tidak berlesen."
    ],
    apaYangBelumDiketahui: [
      "Aras kestabilan harga runcit Musang King domestik untuk baki musim ini."
    ],
    sentimenMetrics: [
      { name: "Menyokong", value: 50 },
      { name: "Neutral", value: 30 },
      { name: "Bimbang", value: 20 }
    ],
    sentimenKonteks: [
      "Usahawan tani gembira pulangan eksport berkembang pesat.",
      "Peminat tempatan kecewa harga durian tempatan kekal tidak munasabah."
    ],
    keywordsBerkaitan: ["Musang King", "Eksport China", "FAMA", "Ladang MyGAP"],
    entitiBerkaitan: ["Kementerian Pertanian", "FAMA", "Persatuan Pengusaha Durian"],
    cadanganKandungan: [
      { format: "WEH Data", title: "Statistik pasaran durian luar negara lawan jualan domestik." }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 21, trendHeatScore: 66 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 19, trendHeatScore: 76 }
    ]
  },
  {
    id: "trend_020",
    rank: 20,
    keyword: "Kadar Inflasi Makanan Malaysia",
    category: "Ekonomi",
    vertical: "WEH Money",
    score: 75,
    growthRate: "+61% dalam 60 minit",
    mentionCount: "13,100 sebutan",
    platformUtama: "X",
    confidenceScore: 94,
    statusPengesahan: "Disahkan",
    risiko: "Rendah",
    waktuKemasKini: "8:00 pagi",
    velocity: "Stabil",
    risk3R: "Rendah",
    newsValue: "Tinggi",
    sourceDiversity: 11,
    sources: [
      "Jabatan Perangkaan lapor indeks harga pengguna sub-makanan naik 3.4% secara purata tahunan."
    ],
    fullIntelBrief: "Statistik inflasi makanan mengekalkan rujukan bimbang di kalangan keluarga berpendapatan rendah. Kadar tertinggi disumbang oleh menu restoran luar rumah.",
    newsLinks: [
      { label: "DOSM Official", url: "https://dosm.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 75 },
      { name: "Kekerapan Berita", value: 80 },
      { name: "Sebutan Sosial", value: 85 },
      { name: "Interaksi Pengguna", value: 82 },
      { name: "Kepelbagaian Sumber", value: 70 }
    ],
    apaYangBerlaku: "Kajian DOSM mendedahkan kos sarapan pagi nasi lemak dan teh tarik di Lembah Klang merangkak naik setinggi 12% dalam tempoh dua tahun disebabkan harga gula rantaian sejuk.",
    faktaDisahkan: [
      "Harga daging segar dan sayuran tempatan sebenarnya mencatatkan penurunan musiman kecil."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan restoran makanan segera sengaja mengurangkan saiz bahagian ayam (shrinkflation) bagi menyembunyikan inflasi tulen."
    ],
    responsRasmi: [
      "DOSM menjelaskan trend makan luar meningkat pasca pandemik menyumbang tarikan kenaikan harga indeks sub-makanan."
    ],
    apaYangBelumDiketahui: [
      "Kesan struktur rintis menu rahmah seterusnya dalam mengimbangi margin hidup peniaga kedai makan."
    ],
    sentimenMetrics: [
      { name: "Bimbang", value: 65 },
      { name: "Marah", value: 25 },
      { name: "Neutral", value: 10 }
    ],
    sentimenKonteks: [
      "Pengguna letih dengan taktik caj perkhidmatan tersembunyi.",
      "Desakan peluasan kempen kebun komuniti sayuran herba perumahan."
    ],
    keywordsBerkaitan: ["Inflasi Makanan", "DOSM", "Indeks Runcit", "Shrinkflation", "Makan Luar"],
    entitiBerkaitan: ["DOSM", "Kementerian Kewangan", "Persatuan Pengguna Islam"],
    cadanganKandungan: [
      { format: "WEH Money", title: "Cara mengatur kembali peratusan gaji makan luar keluarga bandar." }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 23, trendHeatScore: 63 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 20, trendHeatScore: 75 }
    ]
  },

  // ==========================================
  // GROUP C: WATCHLIST 10 — PERLU DIPANTAU (Rank 21 - 30)
  // Isu yang: baru mula muncul, belum disahkan, dll (Heat score 50 - 74)
  // Label: Radar WEH
  // ==========================================
  {
    id: "trend_021",
    rank: 21,
    keyword: "Ransomware Hospital Melaka",
    category: "Teknologi",
    vertical: "WEH Check",
    score: 74,
    growthRate: "+50% dalam 60 minit",
    mentionCount: "4,500 sebutan",
    platformUtama: "Reddit",
    confidenceScore: 65,
    statusPengesahan: "Belum Disahkan",
    risiko: "Tinggi",
    waktuKemasKini: "7:45 pagi",
    velocity: "Meningkat Tegak",
    risk3R: "Rendah",
    newsValue: "Tinggi",
    sourceDiversity: 5,
    sources: [
      "Tangkapan layar di sub-Reddit IT mendedahkan pelayan pendaftaran hospital awam dikunci ransomware."
    ],
    fullIntelBrief: "Satu dakwaan pencerobohan perisian tebusan mengunci pangkalan data pendaftaran pesakit luar di salah sebuah hospital pinggir bandar. Sedang dipantau rapat.",
    newsLinks: [
      { label: "Kementerian Kesihatan Malaysia Updates", url: "https://moh.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 60 },
      { name: "Kekerapan Berita", value: 40 },
      { name: "Sebutan Sosial", value: 55 },
      { name: "Interaksi Pengguna", value: 68 },
      { name: "Kepelbagaian Sumber", value: 35 }
    ],
    apaYangBerlaku: "Tular spekulasi sistem rujukan fail pesakit kecemasan terpaksa ditulis secara manual di kertas susulan kegagalan log masuk pelayan fail utama sejak malam tadi.",
    faktaDisahkan: [
      "Server pendaftaran mengalami gangguan sistem operasi bermula jam 11 malam tadi."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan penggodam meminta tebusan sebanyak 5 koin Bitcoin untuk memulangkan data pendaftaran kesihatan awam."
    ],
    responsRasmi: [
      "Pengarah Hospital menjelaskan kerosakan berpunca daripada kegagalan fizikal cakera keras (hardware glitch) dan bukannya digodam siber tebusan."
    ],
    apaYangBelumDiketahui: [
      "Masa muktamad proses baik pulih kerosakan pelayan pendaftaran kembali pulih sepenuhnya."
    ],
    sentimenMetrics: [
      { name: "Keliru", value: 45 },
      { name: "Bimbang", value: 40 },
      { name: "Neutral", value: 15 }
    ],
    sentimenKonteks: [
      "Pesakit bimbang masa menunggu di zon kecemasan melarat terlalu panjang.",
      "Pertikai tahap sandaran database fizikal di luar pelayan hospital."
    ],
    keywordsBerkaitan: ["Ransomware", "Hospital Awam", "Server Down", "Siasatan Siber", "Cyber Risk"],
    entitiBerkaitan: ["Kementerian Kesihatan", "CyberSecurity Malaysia", "PDRM Siasatan Siber"],
    cadanganKandungan: [
      { format: "WEH Check", title: "Adakah server Hospital Melaka benar-benar digodam ransomware?" }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 30, trendHeatScore: 40 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 21, trendHeatScore: 74 }
    ]
  },
  {
    id: "trend_022",
    rank: 22,
    keyword: "Isu Pengaruh Doktrin Perlis",
    category: "Budaya",
    vertical: "WEH Siasat",
    score: 72,
    growthRate: "+45% dalam 60 minit",
    mentionCount: "3,120 sebutan",
    platformUtama: "X",
    confidenceScore: 55,
    statusPengesahan: "Belum Disahkan",
    risiko: "Tinggi",
    waktuKemasKini: "7:30 pagi",
    velocity: "Sederhana",
    risk3R: "Tinggi",
    newsValue: "Tinggi",
    sourceDiversity: 4,
    sources: [
      "Hantaran sulit mendakwa terdapat kem tumpuan pemuda di pedalaman Perlis mengajar ideologi radikal."
    ],
    fullIntelBrief: "Aktiviti perhimpunan tertutup di utara tanah air mengundang spekulasi dakyah agama ekstrem. Jabatan Agama Negeri mula dikerah melakukan siasatan.",
    newsLinks: [
      { label: "Jabatan Mufti Perlis", url: "https://muftiperlis.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 70 },
      { name: "Kekerapan Berita", value: 30 },
      { name: "Sebutan Sosial", value: 65 },
      { name: "Interaksi Pengguna", value: 72 },
      { name: "Kepelbagaian Sumber", value: 25 }
    ],
    apaYangBerlaku: "Tular hantaran di TikTok memaparkan rakaman latihan fizikal ala separa tentera sekumpulan belia berpakaian hitam yang dikaitkan dengan penubuhan jemaah radikal baharu.",
    faktaDisahkan: [
      "Latihan yang dipaparkan adalah aktiviti simulasi perkhemahan sukarela sebuah kelab rekreasi berdaftar."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan peserta kem dipaksa mengikrarkan janji taat setia kepada seorang pemimpin kultus asing."
    ],
    responsRasmi: [
      "Jabatan Agama Islam Perlis mengesahkan tiada sebarang unsur ajaran menyimpang dikesan dalam sukatan modul perkhemahan kelab sukan tersebut."
    ],
    apaYangBelumDiketahui: [
      "Dalang media sosial yang sengaja memotong video latihan fizikal bagi menakut-nakutkan komuniti awam."
    ],
    sentimenMetrics: [
      { name: "Keliru", value: 50 },
      { name: "Bimbang", value: 30 },
      { name: "Marah", value: 20 }
    ],
    sentimenKonteks: [
      "Keresahan berlakunya ekstremisme di kawasan sempadan utara.",
      "Gesa pengawasan ketat kem rekreasi sukan persendirian."
    ],
    keywordsBerkaitan: ["Doktrin Perlis", "Ajaran Radikal", "JAKIM", "Siasatan Utusan", "Risk 3R"],
    entitiBerkaitan: ["Jabatan Agama Islam Perlis", "JAKIM", "PDRM Cawangan Khas"],
    cadanganKandungan: [
      { format: "WEH Check", title: "Kebenaran di sebalik video tular latihan separa tentera belia di Perlis." }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 29, trendHeatScore: 45 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 22, trendHeatScore: 72 }
    ]
  },
  {
    id: "trend_023",
    rank: 23,
    keyword: "Geng Curi Kereta Sempadan",
    category: "Sosial",
    vertical: "WEH Borneo/Selatan",
    score: 70,
    growthRate: "+30% dalam 60 minit",
    mentionCount: "4,120 sebutan",
    platformUtama: "Facebook",
    confidenceScore: 82,
    statusPengesahan: "Sebahagian Disahkan",
    risiko: "Sederhana",
    waktuKemasKini: "7:00 pagi",
    velocity: "Sederhana",
    risk3R: "Rendah",
    newsValue: "Sederhana",
    sourceDiversity: 6,
    sources: [
      "Klip CCTV tular memaparkan kecurian kenderaan SUV pacuan 4 roda di Johor Baru dalam tempoh 45 saat."
    ],
    fullIntelBrief: "Sindiket penyeludupan kenderaan mewah menyasarkan kenderaan pacuan empat roda untuk dilarikan merentasi sempadan utara atau pelabuhan di selatan tanah air.",
    newsLinks: [
      { label: "PDRM Johor Facebook", url: "https://www.facebook.com/PolisJohor" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 68 },
      { name: "Kekerapan Berita", value: 45 },
      { name: "Sebutan Sosial", value: 72 },
      { name: "Interaksi Pengguna", value: 79 },
      { name: "Kepelbagaian Sumber", value: 40 }
    ],
    apaYangBerlaku: "Modus operandi terbaharu sindiket dikesan menggunakan alat pemintas isyarat kunci jauh (keyless signal jammer) bagi melarikan kenderaan di kawasan parkir pusat membeli belah.",
    faktaDisahkan: [
      "Tiga kenderaan curi berjaya dikesan dan disita di stesen pemeriksaan kastam sempadan darat."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan ada pakat sulit antara pengawal keselamatan parkir dengan orang tengah sindiket melarikan kereta."
    ],
    responsRasmi: [
      "PDRM Johor mengesahkan tangkapan lima suspek warga asing yang bertindak sebagai pemandu keldai rantaian ekspot haram."
    ],
    apaYangBelumDiketahui: [
      "Negara destinasi transit utama kenderaan curi mewah selepas diseludup keluar stesen kastam."
    ],
    sentimenMetrics: [
      { name: "Bimbang", value: 60 },
      { name: "Marah", value: 30 },
      { name: "Neutral", value: 10 }
    ],
    sentimenKonteks: [
      "Rakyat risau keselamatan harta benda pacuan 4 roda di kawasan awam.",
      "Desakan pemasangan sistem pengesan GPS tambahan swasta."
    ],
    keywordsBerkaitan: ["Curi Kereta", "Keyless Bypass", "Sempadan Johor", "CCTV Viral"],
    entitiBerkaitan: ["PDRM Johor", "Jabatan Kastam Diraja", "Rantai Perlindungan Insurans"],
    cadanganKandungan: [
      { format: "WEH Nak Tau", title: "Tip melindungi kenderaan keyless anda daripada dipintas isyarat komputer." }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 26, trendHeatScore: 55 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 23, trendHeatScore: 70 }
    ]
  },
  {
    id: "trend_024",
    rank: 24,
    keyword: "Spekulasi Tarikh PRU Ke-16",
    category: "Politik",
    vertical: "WEH Siasat",
    score: 68,
    growthRate: "+25% dalam 60 minit",
    mentionCount: "5,100 sebutan",
    platformUtama: "X",
    confidenceScore: 40,
    statusPengesahan: "Palsu",
    risiko: "Sederhana",
    waktuKemasKini: "6:30 pagi",
    velocity: "Menurun",
    risk3R: "Tinggi",
    newsValue: "Sederhana",
    sourceDiversity: 5,
    sources: [
      "Poster palsu mendakwa kabinet bersetuju membubarkan parlimen pada hujung Disember 2026 tular di WhatsApp."
    ],
    fullIntelBrief: "Wacana spekulatif berkenaan pilihan raya umum dipercepat mula merebak di beberapa kumpulan sembang akar umbi, mencetuskan kekeliruan am berhubung baki mandat kerajaan.",
    newsLinks: [
      { label: "Jabatan Perdana Menteri", url: "https://www.jpm.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 40 },
      { name: "Kekerapan Berita", value: 35 },
      { name: "Sebutan Sosial", value: 58 },
      { name: "Interaksi Pengguna", value: 65 },
      { name: "Kepelbagaian Sumber", value: 30 }
    ],
    apaYangBerlaku: "Poster berlogo draf rasmikan dewan parlimen ditularkan menggambarkan jadual lengkap pilihan raya diatur awal demi memintas draf pembentangan belanjawan.",
    faktaDisahkan: [
      "Mandat sah parlimen ke-15 sebenarnya hanya tamat secara automatik pada suku ketiga tahun 2028."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan rundingan sulit pembubaran awal dipersetujui susulan desakan blok pembangkang."
    ],
    responsRasmi: [
      "Jurucakap Kerajaan menegaskan poster tersebut adalah 100% rekaan palsu, fokus pentadbiran kekal menstabilkan ekonomi sara hidup."
    ],
    apaYangBelumDiketahui: [
      "Dalang pereka grafik poster manipulasi digital tersebut."
    ],
    sentimenMetrics: [
      { name: "Keliru", value: 60 },
      { name: "Menolak", value: 25 },
      { name: "Menyokong", value: 15 }
    ],
    sentimenKonteks: [
      "Bosan dengan mainan politik yang tidak menyumbang kebajikan harian.",
      "Gesa tindakan undang-undang penyebaran dakyah palsu parlimen."
    ],
    keywordsBerkaitan: ["PRU16", "Bubar Parlimen", "Poster Palsu", "WhatsApp Viral", "Mandat Kerajaan"],
    entitiBerkaitan: ["Jabatan Perdana Menteri", "SPR", "MCMC Siasatan"],
    cadanganKandungan: [
      { format: "WEH Check", title: "Membongkar poster PRU Disember: Mengapa ia dikesan rekaan palsu." }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 24, trendHeatScore: 68 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 24, trendHeatScore: 68 }
    ]
  },
  {
    id: "trend_025",
    rank: 25,
    keyword: "Pencemaran Mikroplastik Ikan Borong",
    category: "Bencana",
    vertical: "WEH Borneo/Tani",
    score: 65,
    growthRate: "+20% dalam 60 minit",
    mentionCount: "2,980 sebutan",
    platformUtama: "Reddit",
    confidenceScore: 78,
    statusPengesahan: "Disahkan",
    risiko: "Rendah",
    waktuKemasKini: "6:00 pagi",
    velocity: "Stabil",
    risk3R: "Rendah",
    newsValue: "Sederhana",
    sourceDiversity: 4,
    sources: [
      "Kajian universiti tempatan mendedahkan 80% sampel ikan kembung di pasar borong mengandungi partikel mikroplastik."
    ],
    fullIntelBrief: "Isu keselamatan kesihatan makanan laut tercetus susulan pendedahan saintifik pencemaran zarah plastik mikro dalam rantaian diet harian. Membimbangkan peminat sushi.",
    newsLinks: [
      { label: "Universiti Sains Malaysia Research", url: "https://usm.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 55 },
      { name: "Kekerapan Berita", value: 60 },
      { name: "Sebutan Sosial", value: 65 },
      { name: "Interaksi Pengguna", value: 72 },
      { name: "Kepelbagaian Sumber", value: 45 }
    ],
    apaYangBerlaku: "Penerbitan jurnal sains rujukan marin mendapati serpihan plastik gred halus terkumpul di perut ikan selar dan kembung hasil pembuangan sampah plastik di laut.",
    faktaDisahkan: [
      "Kandungan plastik mikro hanyalah dalam organ dalaman (perut ikan) dan bukan pada tisu isi ikan itu sendiri."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan makan ikan borong boleh menyebabkan kanser usus serta-merta tanpa mengira teknik cucian."
    ],
    responsRasmi: [
      "Jabatan Perikanan mengesyorkan orang awam membersihkan dan membuang keseluruhan organ dalaman ikan sebelum dimasak bagi mengeluarkan risiko partikel plastik."
    ],
    apaYangBelumDiketahui: [
      "Teknologi penapisan sampah laut berskala besar bagi mengembalikan kebersihan zon tangkapan laut dalam."
    ],
    sentimenMetrics: [
      { name: "Bimbang", value: 65 },
      { name: "Neutral", value: 30 },
      { name: "Menyokong", value: 5 }
    ],
    sentimenKonteks: [
      "Keluarga risau keselamatan bahan makanan ruji anak.",
      "Kempen mengurangkan penggunaan beg plastik komersial."
    ],
    keywordsBerkaitan: ["Mikroplastik", "Ikan Kembung", "USM Jurnal", "Jabatan Perikanan", "Sampah Marin"],
    entitiBerkaitan: ["USM", "Jabatan Perikanan Malaysia", "Institut Kesihatan Negara"],
    cadanganKandungan: [
      { format: "WEH Nak Tau", title: "Adakah mikroplastik dalam ikan berbahaya kepada badan manusia?" }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 28, trendHeatScore: 48 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 25, trendHeatScore: 65 }
    ]
  },
  {
    id: "trend_026",
    rank: 26,
    keyword: "Status Autonomi Wilayah Labuan",
    category: "Politik",
    vertical: "WEH Borneo",
    score: 62,
    growthRate: "+18% dalam 60 minit",
    mentionCount: "2,450 sebutan",
    platformUtama: "Facebook",
    confidenceScore: 80,
    statusPengesahan: "Sebahagian Disahkan",
    risiko: "Sederhana",
    waktuKemasKini: "5:30 pagi",
    velocity: "Stabil",
    risk3R: "Sederhana",
    newsValue: "Biasa",
    sourceDiversity: 6,
    sources: [
      "Pemimpin Sabah kemukakan petisyen memohon pemulangan Labuan ke bawah pentadbiran autonomi Sabah."
    ],
    fullIntelBrief: "Tuntutan mengulas kedudukan ekonomi Wilayah Persekutuan Labuan kembali dibangkitkan bagi memulihkan status zon bebas cukai pelabuhan kontena di Borneo.",
    newsLinks: [
      { label: "Sabah State Portal", url: "https://sabah.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 18 },
      { name: "Kekerapan Berita", value: 50 },
      { name: "Sebutan Sosial", value: 62 },
      { name: "Interaksi Pengguna", value: 68 },
      { name: "Kepelbagaian Sumber", value: 50 }
    ],
    apaYangBerlaku: "Beberapa persatuan korporat Labuan mengadu kemerosotan pelaburan industri minyak semenjak dipindahkan ke tadbir urus pusat fizikal di semenanjung.",
    faktaDisahkan: [
      "Perjanjian penyerahan Labuan kepada Persekutuan pada tahun 1984 dibina atas draf persetujuan majlis sultan / negeri Sabah."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan kononnya kerajaan Sabah akan melancarkan mogok zon ekonomi jika tuntutan Labuan tidak dipertimbangkan draf belanjawan."
    ],
    responsRasmi: [
      "Ketua Menteri Sabah menjelaskan rundingan autonomi dijalankan secara murni mengikut meja bulat perlembagaan, tiada sebarang unsur paksaan konfrontasi."
    ],
    apaYangBelumDiketahui: [
      "Kesan unjuran cukai import jika Wilayah Labuan diserap masuk ke bawah enakmen kastam negeri Sabah sepenuhnya."
    ],
    sentimenMetrics: [
      { name: "Menyokong", value: 55 },
      { name: "Neutral", value: 35 },
      { name: "Menolak", value: 10 }
    ],
    sentimenKonteks: [
      "Sentimen kenegerian Borneo menginginkan hak kelola dana minyak.",
      "Bimbang perubahan pelan insentif cukai sedia ada."
    ],
    keywordsBerkaitan: ["Labuan Autonomi", "Borneo Rights", "Sabah Maju Jaya", "Zon Sejahtera"],
    entitiBerkaitan: ["Kerajaan Negeri Sabah", "Kementerian Sektor Wilayah", "Dewan Perniagaan Labuan"],
    cadanganKandungan: [
      { format: "WEH Siasat", title: "Mengapa ekonomi kemakmuran Labuan didakwa terbiar terpencil?" }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 27, trendHeatScore: 50 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 26, trendHeatScore: 62 }
    ]
  },
  {
    id: "trend_027",
    rank: 27,
    keyword: "Varian COVID-19 Lambda Baru",
    category: "Am",
    vertical: "WEH Check",
    score: 60,
    growthRate: "+15% dalam 60 minit",
    mentionCount: "5,400 sebutan",
    platformUtama: "WhatsApp",
    confidenceScore: 30,
    statusPengesahan: "Palsu",
    risiko: "Sederhana",
    waktuKemasKini: "5:00 pagi",
    velocity: "Menurun",
    risk3R: "Rendah",
    newsValue: "Biasa",
    sourceDiversity: 3,
    sources: [
      "Hantaran berantai WhatsApp mendakwa hospital awam KL sesak dan bersedia untuk perintah kawalan pergerakan (MCO) baharu."
    ],
    fullIntelBrief: "Satu dakyah panik kembali disebarkan di aplikasi sembang mendakwa varian mutasi baharu bermula di pusat transit bandar, mencetuskan amaran panik pembelian stok topeng muka.",
    newsLinks: [
      { label: "Kementerian Kesihatan Malaysia", url: "https://moh.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 75 },
      { name: "Kekerapan Berita", value: 20 },
      { name: "Sebutan Sosial", value: 45 },
      { name: "Interaksi Pengguna", value: 50 },
      { name: "Kepelbagaian Sumber", value: 15 }
    ],
    apaYangBerlaku: "Mesej palsu tersebut mempergunakan nama pegawai perubatan palsu bagi mempengaruhi suri rumah tangga membeli bekalan ubat tambahan dari pengedar tidak sah siber.",
    faktaDisahkan: [
      "Kadar jangkitan Covid-19 semasa di Malaysia adalah di bawah tahap amaran am harian biasa."
    ],
    dakwaanBelumDisahkan: [
      "Kononnya menteri kesihatan akan mengumumkan penutupan sekolah dalam siaran tv langsung malam ini."
    ],
    responsRasmi: [
      "KKM mengeluarkan kenyataan rasmi digital menyangkal sebarang khabar angin penutupan premis, gesa penular mesej bertaubat dan menghentikan penipuan siber."
    ],
    apaYangBelumDiketahui: [
      "Asal usul kemasukan pertama draf teks berantai palsu tersebut di platform internet tempatan."
    ],
    sentimenMetrics: [
      { name: "Marah", value: 50 },
      { name: "Keliru", value: 40 },
      { name: "Neutral", value: 10 }
    ],
    sentimenKonteks: [
      "Kemarahan rakyat terhadap taktik panik peniaga ubat.",
      "Gesa tindakan undang-undang pantas MCMC."
    ],
    keywordsBerkaitan: ["COVID-19 Varian", "MCO Palsu", "KKM Kenyataan", "WhatsApp Berantai"],
    entitiBerkaitan: ["Kementerian Kesihatan", "MCMC", "Hospital Kuala Lumpur"],
    cadanganKandungan: [
      { format: "WEH Check", title: "Kenyataan Palsu MCO Disember: Bagaimana KKM membongkar taktik panik penular mesej." }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 11, trendHeatScore: 71 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 27, trendHeatScore: 60 }
    ]
  },
  {
    id: "trend_028",
    rank: 28,
    keyword: "Hospital Awam Selangor Sesak",
    category: "Sosial",
    vertical: "WEH Rakyat",
    score: 58,
    growthRate: "+12% dalam 60 minit",
    mentionCount: "4,200 sebutan",
    platformUtama: "X",
    confidenceScore: 89,
    statusPengesahan: "Disahkan",
    risiko: "Rendah",
    waktuKemasKini: "4:30 pagi",
    velocity: "Stabil",
    risk3R: "Rendah",
    newsValue: "Sederhana",
    sourceDiversity: 6,
    sources: [
      "Commuters berkongsi masa menunggu di jabatan kecemasan Hospital Tengku Ampuan Rahimah melepasi had 4 jam."
    ],
    fullIntelBrief: "Isu waktu menunggu pesakit luar kembali hangat di Selangor berikutan kekurangan doktor pelatih dan lonjakan kes influenza bermusim.",
    newsLinks: [
      { label: "Selangor Health Commission", url: "https://selangor.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 72 },
      { name: "Kekerapan Berita", value: 55 },
      { name: "Sebutan Sosial", value: 68 },
      { name: "Interaksi Pengguna", value: 74 },
      { name: "Kepelbagaian Sumber", value: 48 }
    ],
    apaYangBerlaku: "Keluarga meluahkan rintihan kepenatan menunggu barisan rawatan dehidrasi anak di kerusi ruang lobi, menggesa naik taraf kapasiti wad katil basah kecemasan.",
    faktaDisahkan: [
      "Beberapa klinik kesihatan berhampiran hospital telah dilanjutkan waktu operasi giliran malam bagi mengurangkan kesesakan zon kecemasan."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan kononnya ubat demam ruji kehabisan stok sepenuhnya di laci simpanan dispensari zon."
    ],
    responsRasmi: [
      "Pengarah Kesihatan Selangor menjelaskan ubat-ubatan mencukupi, kelewatan adalah disebabkan keutamaan mengikut skim triaj merah (kes kritikal ditangani awal)."
    ],
    apaYangBelumDiketahui: [
      "Tarikh kemasukan kohort penjawatan doktor tetap baharu tajaan JPA bagi menampung beban kerja wad."
    ],
    sentimenMetrics: [
      { name: "Marah", value: 50 },
      { name: "Bimbang", value: 40 },
      { name: "Neutral", value: 10 }
    ],
    sentimenKonteks: [
      "Kemarahan terhadap sistem giliran pendaftaran yang didakwa legasi lambat.",
      "Sokongan terhadap kualiti kerja doktor yang dedikasi di bawah tekanan."
    ],
    keywordsBerkaitan: ["Hospital Sesak", "Selangor Travel", "Klinik Kesihatan", "Waktu Menunggu", "Triaj Kesihatan"],
    entitiBerkaitan: ["Jabatan Kesihatan Selangor", "Kementerian Kesihatan", "Hospital HTAR Klang"],
    cadanganKandungan: [
      { format: "WEH Nak Tau", title: "Tip mendapatkan rawatan pantas di klinik kesihatan berdekatan tanpa pergi ke hospital." }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 28, trendHeatScore: 58 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 28, trendHeatScore: 58 }
    ]
  },
  {
    id: "trend_029",
    rank: 29,
    keyword: "Pengharaman Handphone Di Sekolah",
    category: "Sosial",
    vertical: "WEH Nak Tau",
    score: 55,
    growthRate: "+8% dalam 60 minit",
    mentionCount: "3,100 sebutan",
    platformUtama: "Facebook",
    confidenceScore: 82,
    statusPengesahan: "Sebahagian Disahkan",
    risiko: "Rendah",
    waktuKemasKini: "4:00 pagi",
    velocity: "Stabil",
    risk3R: "Rendah",
    newsValue: "Biasa",
    sourceDiversity: 5,
    sources: [
      "Kesatuan Guru membentangkan draf kajian larangan penuh membawa peranti pintar ke premis asrama bagi mengurangkan gejala rakaman buli digital."
    ],
    fullIntelBrief: "Cadangan menyekat kemasukan telefon pintar di bilik asrama sekolah berasrama penuh (SBP) memicu perbalahan antara guru yang mahukan ketenteraman dan ibu bapa yang menginginkan komunikasi harian.",
    newsLinks: [
      { label: "KPM Official Website", url: "https://moe.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 35 },
      { name: "Kekerapan Berita", value: 50 },
      { name: "Sebutan Sosial", value: 58 },
      { name: "Interaksi Pengguna", value: 64 },
      { name: "Kepelbagaian Sumber", value: 42 }
    ],
    apaYangBerlaku: "Deperdebatkan sama ada telefon pintar berfungsi sebagai kawan baik pembelajaran adaptif abad-21 murid atau alat gangguan mental yang mengundang aktiviti buli berniat jahat.",
    faktaDisahkan: [
      "Polisi sedia ada membenarkan pengetua menetapkan had peraturan dalaman bilik asrama masing-masing."
    ],
    dakwaanBelumDisahkan: [
      "Dakwaan sebahabang guru asrama menyita komputer riba murid secara pukal tanpa memberikan surat pekeliling rasmi PIBG."
    ],
    responsRasmi: [
      "KPM menjelaskan draf panduan peranti pintar asrama sedang dikaji semula bagi menyelaraskan hak kelayakan hubungan keluar murid."
    ],
    apaYangBelumDiketahui: [
      "Pelan penyediaan komputer terminal internet khalayak percuma di dalam PPS asrama bagi mengurangkan kebergantungan peranti peribadi."
    ],
    sentimenMetrics: [
      { name: "Neutral", value: 40 },
      { name: "Menyokong", value: 35 },
      { name: "Bimbang", value: 25 }
    ],
    sentimenKonteks: [
      "Ibu bapa risau anak terputus hubungan kecemasan.",
      "Guru menyokong fokus pembelajaran fizikal di dewan kelas."
    ],
    keywordsBerkaitan: ["Sita Handphone", "Asrama Sekolah", "Disiplin Murid", "NUTP Guru", "Buli Digital"],
    entitiBerkaitan: ["KPM", "NUTP", "Sistem Sekolah Berasrama Penuh"],
    cadanganKandungan: [
      { format: "WEH Nak Tau", title: "Pro & Kontra: Adakah draf larangan telefon pintar membendung kes buli?" }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 29, trendHeatScore: 55 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 29, trendHeatScore: 55 }
    ]
  },
  {
    id: "trend_030",
    rank: 30,
    keyword: "Sistem Pembayaran Terbuka Tol RFID",
    category: "Ekonomi",
    vertical: "WEH Transit",
    score: 52,
    growthRate: "+5% dalam 60 minit",
    mentionCount: "6,900 sebutan",
    platformUtama: "Threads",
    confidenceScore: 94,
    statusPengesahan: "Disahkan",
    risiko: "Rendah",
    waktuKemasKini: "3:00 pagi",
    velocity: "Menurun",
    risk3R: "Rendah",
    newsValue: "Biasa",
    sourceDiversity: 4,
    sources: [
      "LLM lapor perluasan pilihan pembayaran kad debit di 6 plaza tol pantai barat."
    ],
    fullIntelBrief: "Sistem kutipan tol lebuh raya terus diuji dengan menambah keupayaan kad visa/debit terbuka di luar had sistem monopoli kad Touch 'N Go tradisi.",
    newsLinks: [
      { label: "Lembaga Lebuhraya Malaysia", url: "https://llm.gov.my" }
    ],
    radarData: [
      { name: "Sentimen Negatif", value: 25 },
      { name: "Kekerapan Berita", value: 50 },
      { name: "Sebutan Sosial", value: 55 },
      { name: "Interaksi Pengguna", value: 58 },
      { name: "Kepelbagaian Sumber", value: 40 }
    ],
    apaYangBerlaku: "Pengendali lebuh raya memasang terminal pembaca kad dekat pintu hadapan plaza tol untuk membolehkan kad debit berstikit disentuh oleh pemandu.",
    faktaDisahkan: [
      "Sebelas plaza tol utama sekitar Kuala Lumpur telah mengaktifkan sistem hibrid Touch 'N Go / Visa secara langsung."
    ],
    dakwaanBelumDisahkan: [
      "Khayalak mendakwa penggunaan kad debit memerlukan baki minimum RM100 dipendam secara palsu oleh pihak bank."
    ],
    responsRasmi: [
      "Lembaga Lebuhraya menegaskan pematuhan baki hanyalah merujuk kadar tol laluan semasa, tiada sebarang penahanan baki palsu RM100 dilakukan."
    ],
    apaYangBelumDiketahui: [
      "Tarikh pelaksanaan penuh sistem Multi-Lane Free Flow (MLFF) bagi membuang palang tol sepenuhnya."
    ],
    sentimenMetrics: [
      { name: "Menyokong", value: 75 },
      { name: "Neutral", value: 20 },
      { name: "Bimbang", value: 5 }
    ],
    sentimenKonteks: [
      "Commuter gembira mempunyai alternatif kad simpanan.",
      "Gesa percepatkan kelajuan galian palang RFID di stesen sibuk."
    ],
    keywordsBerkaitan: ["Plaza Tol", "Debit Terbuka", "RFID Tol", "Lembaga Lebuhraya", "Touch N Go"],
    entitiBerkaitan: ["Lembaga Lebuhraya Malaysia", "PLUS Expressway", "Touch 'N Go Sdn Bhd"],
    cadanganKandungan: [
      { format: "WEH Nak Tau", title: "Langkah mengaktifkan kad debit bank di lorong tol terbuka Rapid." }
    ],
    rankingHistory: [
      { capturedAt: "2026-06-23T15:00:00+08:00", rank: 30, trendHeatScore: 52 },
      { capturedAt: "2026-06-23T16:00:00+08:00", rank: 30, trendHeatScore: 52 }
    ]
  }
];
