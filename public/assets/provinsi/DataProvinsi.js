const provinces = [
    { id: 1, name: "Aceh" },
    { id: 2, name: "Sumatera Utara" },
    { id: 3, name: "Sumatera Barat" },
    { id: 4, name: "Riau" },
    { id: 5, name: "Jambi" },
    { id: 6, name: "Sumatera Selatan" },
    { id: 7, name: "Bengkulu" },
    { id: 8, name: "Lampung" },
    { id: 9, name: "Kepulauan Bangka Belitung" },
    { id: 10, name: "Kepulauan Riau" },
    { id: 11, name: "DKI Jakarta" },
    { id: 12, name: "Jawa Barat" },
    { id: 13, name: "Jawa Tengah" },
    { id: 14, name: "DI Yogyakarta" },
    { id: 15, name: "Jawa Timur" },
    { id: 16, name: "Banten" },
    { id: 17, name: "Bali" },
    { id: 18, name: "Nusa Tenggara Barat" },
    { id: 19, name: "Nusa Tenggara Timur" },
    { id: 20, name: "Kalimantan Barat" },
    { id: 21, name: "Kalimantan Tengah" },
    { id: 22, name: "Kalimantan Selatan" },
    { id: 23, name: "Kalimantan Timur" },
    { id: 24, name: "Kalimantan Utara" },
    { id: 25, name: "Sulawesi Utara" },
    { id: 26, name: "Sulawesi Tengah" },
    { id: 27, name: "Sulawesi Selatan" },
    { id: 28, name: "Sulawesi Tenggara" },
    { id: 29, name: "Gorontalo" },
    { id: 30, name: "Sulawesi Barat" },
    { id: 31, name: "Maluku" },
    { id: 32, name: "Maluku Utara" },
    { id: 33, name: "Papua" },
    { id: 34, name: "Papua Barat" },
    { id: 35, name: "Papua Selatan" },
    { id: 36, name: "Papua Pegunungan" },
    { id: 37, name: "Papua Tengah" },
    { id: 38, name: "Papua Barat Daya" },
];

const cities = [
    { id: 1, name: "Banda Aceh", provinceId: 1 },
    { id: 2, name: "Langsa", provinceId: 1 },
    { id: 3, name: "Lhokseumawe", provinceId: 1 },
    { id: 4, name: "Sabang", provinceId: 1 },
    { id: 5, name: "Subulussalam", provinceId: 1 },
    { id: 6, name: "Medan", provinceId: 2 },
    { id: 7, name: "Binjai", provinceId: 2 },
    { id: 8, name: "Tebing Tinggi", provinceId: 2 },
    { id: 9, name: "Padang Sidempuan", provinceId: 2 },
    { id: 10, name: "Gunungsitoli", provinceId: 2 },
    { id: 11, name: "Padang", provinceId: 3 },
    { id: 12, name: "Solok", provinceId: 3 },
    { id: 13, name: "Sawahlunto", provinceId: 3 },
    { id: 14, name: "Padang Panjang", provinceId: 3 },
    { id: 15, name: "Bukittinggi", provinceId: 3 },
    { id: 16, name: "Payakumbuh", provinceId: 3 },
    { id: 17, name: "Pariaman", provinceId: 3 },
    { id: 18, name: "Pekanbaru", provinceId: 4 },
    { id: 19, name: "Dumai", provinceId: 4 },
    { id: 20, name: "Jambi", provinceId: 5 },
    { id: 21, name: "Sungai Penuh", provinceId: 5 },
    { id: 22, name: "Palembang", provinceId: 6 },
    { id: 23, name: "Pagar Alam", provinceId: 6 },
    { id: 24, name: "Lubuklinggau", provinceId: 6 },
    { id: 25, name: "Prabumulih", provinceId: 6 },
    { id: 26, name: "Bengkulu", provinceId: 7 },
    { id: 27, name: "Bandar Lampung", provinceId: 8 },
    { id: 28, name: "Metro", provinceId: 8 },
    { id: 29, name: "Pangkal Pinang", provinceId: 9 },
    { id: 30, name: "Tanjung Pinang", provinceId: 10 },
    { id: 31, name: "Jakarta Pusat", provinceId: 11 },
    { id: 32, name: "Jakarta Utara", provinceId: 11 },
    { id: 33, name: "Jakarta Barat", provinceId: 11 },
    { id: 34, name: "Jakarta Selatan", provinceId: 11 },
    { id: 35, name: "Jakarta Timur", provinceId: 11 },
    { id: 36, name: "Bogor", provinceId: 12 },
    { id: 37, name: "Sukabumi", provinceId: 12 },
    { id: 38, name: "Bandung", provinceId: 12 },
    { id: 39, name: "Cirebon", provinceId: 12 },
    { id: 40, name: "Bekasi", provinceId: 12 },
    { id: 41, name: "Depok", provinceId: 12 },
    { id: 42, name: "Cimahi", provinceId: 12 },
    { id: 43, name: "Tasikmalaya", provinceId: 12 },
    { id: 44, name: "Banjar", provinceId: 12 },
    { id: 45, name: "Semarang", provinceId: 13 },
    { id: 46, name: "Surakarta", provinceId: 13 },
    { id: 47, name: "Salatiga", provinceId: 13 },
    { id: 48, name: "Pekalongan", provinceId: 13 },
    { id: 49, name: "Tegal", provinceId: 13 },
    { id: 50, name: "Yogyakarta", provinceId: 14 },
    { id: 51, name: "Surabaya", provinceId: 15 },
    { id: 52, name: "Malang", provinceId: 15 },
    { id: 53, name: "Madiun", provinceId: 15 },
    { id: 54, name: "Mojokerto", provinceId: 15 },
    { id: 55, name: "Probolinggo", provinceId: 15 },
    { id: 56, name: "Pasuruan", provinceId: 15 },
    { id: 57, name: "Batu", provinceId: 15 },
    { id: 58, name: "Serang", provinceId: 16 },
    { id: 59, name: "Cilegon", provinceId: 16 },
    { id: 60, name: "Tangerang Selatan", provinceId: 16 },
    { id: 61, name: "Denpasar", provinceId: 17 },
    { id: 62, name: "Mataram", provinceId: 18 },
    { id: 63, name: "Kupang", provinceId: 19 },
    { id: 64, name: "Pontianak", provinceId: 20 },
    { id: 65, name: "Singkawang", provinceId: 20 },
    { id: 66, name: "Palangkaraya", provinceId: 21 },
    { id: 67, name: "Banjarmasin", provinceId: 22 },
    { id: 68, name: "Banjarbaru", provinceId: 22 },
    { id: 69, name: "Samarinda", provinceId: 23 },
    { id: 70, name: "Balikpapan", provinceId: 23 },
    { id: 71, name: "Bontang", provinceId: 23 },
    { id: 72, name: "Tarakan", provinceId: 24 },
    { id: 73, name: "Tanjung Selor", provinceId: 24 },
    { id: 74, name: "Manado", provinceId: 25 },
    { id: 75, name: "Bitung", provinceId: 25 },
    { id: 76, name: "Tomohon", provinceId: 25 },
    { id: 77, name: "Kotamobagu", provinceId: 25 },
    { id: 78, name: "Palu", provinceId: 26 },
    { id: 79, name: "Makassar", provinceId: 27 },
    { id: 80, name: "Parepare", provinceId: 27 },
    { id: 81, name: "Palopo", provinceId: 27 },
    { id: 82, name: "Kendari", provinceId: 28 },
    { id: 83, name: "Baubau", provinceId: 28 },
    { id: 84, name: "Gorontalo", provinceId: 29 },
    { id: 85, name: "Mamuju", provinceId: 30 },
    { id: 86, name: "Ambon", provinceId: 31 },
    { id: 87, name: "Tual", provinceId: 31 },
    { id: 88, name: "Ternate", provinceId: 32 },
    { id: 89, name: "Tidore Kepulauan", provinceId: 32 },
    { id: 90, name: "Jayapura", provinceId: 33 },
    { id: 91, name: "Sorong", provinceId: 34 },
    { id: 92, name: "Merauke", provinceId: 35 },
    { id: 93, name: "Timika", provinceId: 36 },
    { id: 94, name: "Nabire", provinceId: 37 },
    { id: 95, name: "Kaimana", provinceId: 38 },
    { id: 96, name: "Manokwari", provinceId: 38 },
    { id: 97, name: "Sorong Selatan", provinceId: 38 },
    { id: 98, name: "Raja Ampat", provinceId: 38 },
];

const districts = [
    { id: 1, name: "Kuta Alam", cityId: 1 },
    { id: 2, name: "Kuta Raja", cityId: 1 },
    { id: 3, name: "Baiturrahman", cityId: 1 },
    { id: 4, name: "Meuraxa", cityId: 1 },
    { id: 5, name: "Jaya Baru", cityId: 1 },
    { id: 6, name: "Langsa Barat", cityId: 2 },
    { id: 7, name: "Langsa Kota", cityId: 2 },
    { id: 8, name: "Langsa Lama", cityId: 2 },
    { id: 9, name: "Langsa Timur", cityId: 2 },
    { id: 10, name: "Muara Dua", cityId: 3 },
    
    { id: 11, name: "Banda Sakti", cityId: 3 },
    { id: 12, name: "Blang Mangat", cityId: 3 },
    { id: 13, name: "Sukajadi", cityId: 3 },
    { id: 14, name: "Sukakarya", cityId: 4 },
    { id: 15, name: "Sukajaya", cityId: 4 },
    { id: 16, name: "Penanggalan", cityId: 5 },
    { id: 17, name: "Rundeng", cityId: 5 },
    { id: 18, name: "Simpang Kiri", cityId: 5 },
    { id: 19, name: "Medan Kota", cityId: 6 },
    { id: 20, name: "Medan Marelan", cityId: 6 },
    { id: 21, name: "Medan Tuntungan", cityId: 6 },
    { id: 22, name: "Medan Helvetia", cityId: 6 },
    { id: 23, name: "Binjai Kota", cityId: 7 },
    { id: 24, name: "Binjai Barat", cityId: 7 },
    { id: 25, name: "Binjai Timur", cityId: 7 },
    { id: 26, name: "Padang Sidempuan Barat", cityId: 9 },
    { id: 27, name: "Padang Sidempuan Utara", cityId: 9 },
    { id: 28, name: "Gunungsitoli Idanoi", cityId: 10 },
    { id: 29, name: "Gunungsitoli Selatan", cityId: 10 },
    { id: 30, name: "Gunungsitoli Utara", cityId: 10 },
    { id: 31, name: "Rambutan", cityId: 8 },
    { id: 32, name: "Padang Hilir", cityId: 8 },
    { id: 33, name: "Padang Hulu", cityId: 8 },
    { id: 34, name: "Bajenis", cityId: 8 },
    { id: 35, name: "Tebing Tinggi Kota", cityId: 8 },
    // Padang (CityId: 11)
    { id: 36, name: "Padang Barat", cityId: 11 },
    { id: 37, name: "Padang Timur", cityId: 11 },
    { id: 38, name: "Koto Tangah", cityId: 11 },
    { id: 39, name: "Padang Utara", cityId: 11 },
    { id: 40, name: "Padang Selatan", cityId: 11 },

    // Solok (CityId: 12)
    { id: 41, name: "Lubuk Sikarah", cityId: 12 },
    { id: 42, name: "Tanjung Harapan", cityId: 12 },

    // Sawahlunto (CityId: 13)
    { id: 43, name: "Barangin", cityId: 13 },
    { id: 44, name: "Lembah Segar", cityId: 13 },
    { id: 45, name: "Talawi", cityId: 13 },
    { id: 46, name: "Silungkang", cityId: 13 },

    // Padang Panjang (CityId: 14)
    { id: 47, name: "Padang Panjang Barat", cityId: 14 },
    { id: 48, name: "Padang Panjang Timur", cityId: 14 },

    // Bukittinggi (CityId: 15)
    { id: 49, name: "Mandiangin Koto Selayan", cityId: 15 },
    { id: 50, name: "Aur Birugo Tigo Baleh", cityId: 15 },
    { id: 51, name: "Guguk Panjang", cityId: 15 },

    // Payakumbuh (CityId: 16)
    { id: 52, name: "Payakumbuh Barat", cityId: 16 },
    { id: 53, name: "Payakumbuh Timur", cityId: 16 },
    { id: 54, name: "Payakumbuh Selatan", cityId: 16 },
    { id: 55, name: "Payakumbuh Utara", cityId: 16 },
    { id: 56, name: "Lamposi Tigo Nagari", cityId: 16 },

    // Pariaman (CityId: 17)
    { id: 57, name: "Pariaman Tengah", cityId: 17 },
    { id: 58, name: "Pariaman Selatan", cityId: 17 },
    { id: 59, name: "Pariaman Timur", cityId: 17 },
    { id: 60, name: "Pariaman Utara", cityId: 17 },

    // Pekanbaru (CityId: 18)
    { id: 61, name: "Sukajadi", cityId: 18 },
    { id: 62, name: "Senapelan", cityId: 18 },
    { id: 63, name: "Pekanbaru Kota", cityId: 18 },
    { id: 64, name: "Rumbai", cityId: 18 },
    { id: 65, name: "Marpoyan Damai", cityId: 18 },

    // Dumai (CityId: 19)
    { id: 66, name: "Dumai Barat", cityId: 19 },
    { id: 67, name: "Dumai Timur", cityId: 19 },
    { id: 68, name: "Bukit Kapur", cityId: 19 },
    { id: 69, name: "Medang Kampai", cityId: 19 },

    // Jambi (CityId: 20)
    { id: 70, name: "Pasar Jambi", cityId: 20 },
    { id: 71, name: "Jelutung", cityId: 20 },
    { id: 72, name: "Telanaipura", cityId: 20 },
    { id: 73, name: "Danau Sipin", cityId: 20 },
    { id: 74, name: "Danau Teluk", cityId: 20 },
    // Sungai Penuh (CityId: 21)
    { id: 75, name: "Sungai Penuh", cityId: 21 },

    // Palembang (CityId: 22)
    { id: 76, name: "Ilir Barat I", cityId: 22 },
    { id: 77, name: "Ilir Barat II", cityId: 22 },
    { id: 78, name: "Ulu Raung", cityId: 22 },
    { id: 79, name: "Seberang Ulu I", cityId: 22 },
    { id: 80, name: "Seberang Ulu II", cityId: 22 },
    { id: 81, name: "Jakabaring", cityId: 22 },

    // Pagar Alam (CityId: 23)
    { id: 82, name: "Pagar Alam Selatan", cityId: 23 },
    { id: 83, name: "Pagar Alam Utara", cityId: 23 },

    // Lubuklinggau (CityId: 24)
    { id: 84, name: "Lubuklinggau Selatan I", cityId: 24 },
    { id: 85, name: "Lubuklinggau Selatan II", cityId: 24 },
    { id: 86, name: "Lubuklinggau Timur I", cityId: 24 },
    { id: 87, name: "Lubuklinggau Timur II", cityId: 24 },
    { id: 88, name: "Lubuklinggau Barat I", cityId: 24 },
    { id: 89, name: "Lubuklinggau Barat II", cityId: 24 },

    // Prabumulih (CityId: 25)
    { id: 90, name: "Prabumulih Selatan", cityId: 25 },
    { id: 91, name: "Prabumulih Utara", cityId: 25 },

    // Bengkulu (CityId: 26)
    { id: 92, name: "Bengkulu Utara", cityId: 26 },
    { id: 93, name: "Bengkulu Selatan", cityId: 26 },
    { id: 94, name: "Kota Bengkulu", cityId: 26 },

    // Bandar Lampung (CityId: 27)
    { id: 95, name: "Tanjung Karang Pusat", cityId: 27 },
    { id: 96, name: "Tanjung Karang Timur", cityId: 27 },
    { id: 97, name: "Tanjung Karang Barat", cityId: 27 },
    { id: 98, name: "Kemiling", cityId: 27 },
    { id: 99, name: "Rajabasa", cityId: 27 },

    // Metro (CityId: 28)
    { id: 100, name: "Metro Pusat", cityId: 28 },
    { id: 101, name: "Metro Timur", cityId: 28 },
    { id: 102, name: "Metro Barat", cityId: 28 },

    // Pangkal Pinang (CityId: 29)
    { id: 103, name: "Pangkal Balam", cityId: 29 },
    { id: 104, name: "Gerunggang", cityId: 29 },
    { id: 105, name: "Taman Sari", cityId: 29 },

    // Tanjung Pinang (CityId: 30)
    { id: 106, name: "Tanjung Pinang Kota", cityId: 30 },
    { id: 107, name: "Tanjung Pinang Timur", cityId: 30 },
    { id: 108, name: "Tanjung Pinang Barat", cityId: 30 },
    // Jakarta Pusat (CityId: 31)
    { id: 109, name: "Gambir", cityId: 31 },
    { id: 110, name: "Tanah Abang", cityId: 31 },
    { id: 111, name: "Senen", cityId: 31 },
    { id: 112, name: "Cikini", cityId: 31 },
    { id: 113, name: "Kota", cityId: 31 },

    // Jakarta Utara (CityId: 32)
    { id: 114, name: "Kepulauan Seribu", cityId: 32 },
    { id: 115, name: "Koja", cityId: 32 },
    { id: 116, name: "Cilincing", cityId: 32 },
    { id: 117, name: "Tanjung Priok", cityId: 32 },
    { id: 118, name: "Pademangan", cityId: 32 },

    // Jakarta Barat (CityId: 33)
    { id: 119, name: "Grogol Petamburan", cityId: 33 },
    { id: 120, name: "Kebon Jeruk", cityId: 33 },
    { id: 121, name: "Kembangan", cityId: 33 },
    { id: 122, name: "Palmerah", cityId: 33 },
    { id: 123, name: "Tambora", cityId: 33 },

    // Jakarta Selatan (CityId: 34)
    { id: 124, name: "Kebayoran Baru", cityId: 34 },
    { id: 125, name: "Mampang Prapatan", cityId: 34 },
    { id: 126, name: "Tebet", cityId: 34 },
    { id: 127, name: "Cilandak", cityId: 34 },
    { id: 128, name: "Pesanggrahan", cityId: 34 },

    // Jakarta Timur (CityId: 35)
    { id: 129, name: "Jatinegara", cityId: 35 },
    { id: 130, name: "Cakung", cityId: 35 },
    { id: 131, name: "Duren Sawit", cityId: 35 },
    { id: 132, name: "Matraman", cityId: 35 },
    { id: 133, name: "Pulo Gadung", cityId: 35 },

    // Bogor (CityId: 36)
    { id: 134, name: "Bogor Tengah", cityId: 36 },
    { id: 135, name: "Bogor Selatan", cityId: 36 },
    { id: 136, name: "Bogor Utara", cityId: 36 },
    { id: 137, name: "Tanah Sareal", cityId: 36 },

    // Sukabumi (CityId: 37)
    { id: 138, name: "Sukabumi", cityId: 37 },
    { id: 139, name: "Cikole", cityId: 37 },
    { id: 140, name: "Lembursitu", cityId: 37 },

    // Bandung (CityId: 38)
    { id: 141, name: "Bandung Wetan", cityId: 38 },
    { id: 142, name: "Cibeunying Kaler", cityId: 38 },
    { id: 143, name: "Cibeunying Kidul", cityId: 38 },
    { id: 144, name: "Sumurbandung", cityId: 38 },

    // Cirebon (CityId: 39)
    { id: 145, name: "Cirebon Utara", cityId: 39 },
    { id: 146, name: "Cirebon Selatan", cityId: 39 },
    { id: 147, name: "Kedawung", cityId: 39 },

    // Bekasi (CityId: 40)
    { id: 148, name: "Bekasi Utara", cityId: 40 },
    { id: 149, name: "Bekasi Selatan", cityId: 40 },
    { id: 150, name: "Medansatria", cityId: 40 },
    { id: 151, name: "East Bekasi", cityId: 40 },
    // Depok (CityId: 41)
    { id: 152, name: "Beji", cityId: 41 },
    { id: 153, name: "Cimanggis", cityId: 41 },
    { id: 154, name: "Limo", cityId: 41 },
    { id: 155, name: "Pancoran Mas", cityId: 41 },
    { id: 156, name: "Sawangan", cityId: 41 },
    { id: 157, name: "Tapos", cityId: 41 },

    // Cimahi (CityId: 42)
    { id: 158, name: "Cimahi Utara", cityId: 42 },
    { id: 159, name: "Cimahi Tengah", cityId: 42 },
    { id: 160, name: "Cimahi Selatan", cityId: 42 },

    // Tasikmalaya (CityId: 43)
    { id: 161, name: "Tasikmalaya", cityId: 43 },
    { id: 162, name: "Cisayong", cityId: 43 },
    { id: 163, name: "Cihideung", cityId: 43 },

    // Banjar (CityId: 44)
    { id: 164, name: "Banjar", cityId: 44 },
    { id: 165, name: "Langensari", cityId: 44 },
    { id: 166, name: "Pataruman", cityId: 44 },

    // Semarang (CityId: 45)
    { id: 167, name: "Semarang Utara", cityId: 45 },
    { id: 168, name: "Semarang Selatan", cityId: 45 },
    { id: 169, name: "Semarang Timur", cityId: 45 },
    { id: 170, name: "Semarang Barat", cityId: 45 },
    { id: 171, name: "Candisari", cityId: 45 },

    // Surakarta (CityId: 46)
    { id: 172, name: "Banjarsari", cityId: 46 },
    { id: 173, name: "Jebres", cityId: 46 },
    { id: 174, name: "Laweyan", cityId: 46 },
    { id: 175, name: "Serengan", cityId: 46 },
    { id: 176, name: "Pasar Kliwon", cityId: 46 },

    // Salatiga (CityId: 47)
    { id: 177, name: "Sidomukti", cityId: 47 },
    { id: 178, name: "Sidorejo", cityId: 47 },
    { id: 179, name: "Kota", cityId: 47 },

    // Pekalongan (CityId: 48)
    { id: 180, name: "Pekalongan Utara", cityId: 48 },
    { id: 181, name: "Pekalongan Selatan", cityId: 48 },

    // Tegal (CityId: 49)
    { id: 182, name: "Tegal Barat", cityId: 49 },
    { id: 183, name: "Tegal Timur", cityId: 49 },

    // Yogyakarta (CityId: 50)
    { id: 184, name: "Gondokusuman", cityId: 50 },
    { id: 185, name: "Mantrijeron", cityId: 50 },
    { id: 186, name: "Ngampilan", cityId: 50 },
    { id: 187, name: "Sanden", cityId: 50 },

    // Surabaya (CityId: 51)
    { id: 188, name: "Asemrowo", cityId: 51 },
    { id: 189, name: "Gubeng", cityId: 51 },
    { id: 190, name: "Tegalsari", cityId: 51 },
    { id: 191, name: "Wonokromo", cityId: 51 },

    // Malang (CityId: 52)
    { id: 192, name: "Klojen", cityId: 52 },
    { id: 193, name: "Blimbing", cityId: 52 },
    { id: 194, name: "Lowokwaru", cityId: 52 },

    // Madiun (CityId: 53)
    { id: 195, name: "Manguharjo", cityId: 53 },
    { id: 196, name: "Kota Madiun", cityId: 53 },

    // Mojokerto (CityId: 54)
    { id: 197, name: "Mojokerto", cityId: 54 },
    { id: 198, name: "Puri", cityId: 54 },

    // Probolinggo (CityId: 55)
    { id: 199, name: "Probolinggo", cityId: 55 },
    { id: 200, name: "Kota Probolinggo", cityId: 55 },

    // Pasuruan (CityId: 56)
    { id: 201, name: "Pasuruan", cityId: 56 },
    { id: 202, name: "Gondang Wetan", cityId: 56 },

    // Batu (CityId: 57)
    { id: 203, name: "Batu", cityId: 57 },

    // Serang (CityId: 58)
    { id: 204, name: "Serang", cityId: 58 },
    { id: 205, name: "Cipocok Jaya", cityId: 58 },

    // Cilegon (CityId: 59)
    { id: 206, name: "Cilegon", cityId: 59 },

    // Tangerang Selatan (CityId: 60)
    { id: 207, name: "Ciputat", cityId: 60 },
    { id: 208, name: "Pondok Aren", cityId: 60 },
    // Denpasar (CityId: 61)
    { id: 209, name: "Denpasar Utara", cityId: 61 },
    { id: 210, name: "Denpasar Selatan", cityId: 61 },
    { id: 211, name: "Denpasar Timur", cityId: 61 },
    { id: 212, name: "Denpasar Barat", cityId: 61 },

    // Mataram (CityId: 62)
    { id: 213, name: "Mataram", cityId: 62 },
    { id: 214, name: "Cakranegara", cityId: 62 },

    // Kupang (CityId: 63)
    { id: 215, name: "Kupang", cityId: 63 },
    { id: 216, name: "Kelapa Lima", cityId: 63 },

    // Pontianak (CityId: 64)
    { id: 217, name: "Pontianak Selatan", cityId: 64 },
    { id: 218, name: "Pontianak Utara", cityId: 64 },
    { id: 219, name: "Pontianak Kota", cityId: 64 },

    // Singkawang (CityId: 65)
    { id: 220, name: "Singkawang Selatan", cityId: 65 },
    { id: 221, name: "Singkawang Tengah", cityId: 65 },
    { id: 222, name: "Singkawang Utara", cityId: 65 },

    // Palangkaraya (CityId: 66)
    { id: 223, name: "Palangkaraya", cityId: 66 },

    // Banjarmasin (CityId: 67)
    { id: 224, name: "Banjarmasin Utara", cityId: 67 },
    { id: 225, name: "Banjarmasin Selatan", cityId: 67 },
    { id: 226, name: "Banjarmasin Timur", cityId: 67 },
    { id: 227, name: "Banjarmasin Barat", cityId: 67 },

    // Banjarbaru (CityId: 68)
    { id: 228, name: "Banjarbaru", cityId: 68 },
    { id: 229, name: "Cempaka", cityId: 68 },
    { id: 230, name: "Landasan Ulin", cityId: 68 },

    // Samarinda (CityId: 69)
    { id: 231, name: "Samarinda Ilir", cityId: 69 },
    { id: 232, name: "Samarinda Ulu", cityId: 69 },
    { id: 233, name: "Samarinda Kota", cityId: 69 },

    // Balikpapan (CityId: 70)
    { id: 234, name: "Balikpapan Selatan", cityId: 70 },
    { id: 235, name: "Balikpapan Utara", cityId: 70 },
    { id: 236, name: "Balikpapan Tengah", cityId: 70 },

    // Bontang (CityId: 71)
    { id: 237, name: "Bontang Utara", cityId: 71 },
    { id: 238, name: "Bontang Selatan", cityId: 71 },

    // Tarakan (CityId: 72)
    { id: 239, name: "Tarakan", cityId: 72 },
    { id: 240, name: "Tarakan Tengah", cityId: 72 },

    // Tanjung Selor (CityId: 73)
    { id: 241, name: "Tanjung Selor", cityId: 73 },

    // Manado (CityId: 74)
    { id: 242, name: "Manado", cityId: 74 },
    { id: 243, name: "Wanea", cityId: 74 },
    { id: 244, name: "Bunaken", cityId: 74 },

    // Bitung (CityId: 75)
    { id: 245, name: "Bitung", cityId: 75 },

    // Tomohon (CityId: 76)
    { id: 246, name: "Tomohon Selatan", cityId: 76 },
    { id: 247, name: "Tomohon Utara", cityId: 76 },

    // Kotamobagu (CityId: 77)
    { id: 248, name: "Kotamobagu Selatan", cityId: 77 },
    { id: 249, name: "Kotamobagu Utara", cityId: 77 },

    // Palu (CityId: 78)
    { id: 250, name: "Palu Utara", cityId: 78 },
    { id: 251, name: "Palu Selatan", cityId: 78 },

    // Makassar (CityId: 79)
    { id: 252, name: "Makassar", cityId: 79 },
    { id: 253, name: "Tamalanrea", cityId: 79 },
    { id: 254, name: "Bontoala", cityId: 79 },

    // Parepare (CityId: 80)
    { id: 255, name: "Parepare", cityId: 80 },
    { id: 256, name: "Ujung", cityId: 80 },
    // Palopo (CityId: 81)
    { id: 257, name: "Palopo", cityId: 81 },
    { id: 258, name: "Bua", cityId: 81 },

    // Kendari (CityId: 82)
    { id: 259, name: "Kendari", cityId: 82 },
    { id: 260, name: "Kendari Barat", cityId: 82 },
    { id: 261, name: "Kendari Timur", cityId: 82 },

    // Baubau (CityId: 83)
    { id: 262, name: "Baubau", cityId: 83 },
    { id: 263, name: "Baubau Barat", cityId: 83 },

    // Gorontalo (CityId: 84)
    { id: 264, name: "Gorontalo", cityId: 84 },
    { id: 265, name: "Gorontalo Utara", cityId: 84 },

    // Mamuju (CityId: 85)
    { id: 266, name: "Mamuju", cityId: 85 },
    { id: 267, name: "Mamuju Utara", cityId: 85 },

    // Ambon (CityId: 86)
    { id: 268, name: "Ambon", cityId: 86 },
    { id: 269, name: "Teluk Ambon", cityId: 86 },

    // Tual (CityId: 87)
    { id: 270, name: "Tual", cityId: 87 },
    { id: 271, name: "Kota Tual", cityId: 87 },

    // Ternate (CityId: 88)
    { id: 272, name: "Ternate", cityId: 88 },
    { id: 273, name: "Ternate Selatan", cityId: 88 },

    // Tidore Kepulauan (CityId: 89)
    { id: 274, name: "Tidore Kepulauan", cityId: 89 },

    // Jayapura (CityId: 90)
    { id: 275, name: "Jayapura", cityId: 90 },
    { id: 276, name: "Jayapura Selatan", cityId: 90 },
    { id: 277, name: "Jayapura Utara", cityId: 90 },

    // Sorong (CityId: 91)
    { id: 278, name: "Sorong", cityId: 91 },
    { id: 279, name: "Sorong Selatan", cityId: 91 },

    // Merauke (CityId: 92)
    { id: 280, name: "Merauke", cityId: 92 },
    { id: 281, name: "Merauke Barat", cityId: 92 },

    // Timika (CityId: 93)
    { id: 282, name: "Timika", cityId: 93 },
    { id: 283, name: "Timika Barat", cityId: 93 },

    // Nabire (CityId: 94)
    { id: 284, name: "Nabire", cityId: 94 },

    // Kaimana (CityId: 95)
    { id: 285, name: "Kaimana", cityId: 95 },

    // Manokwari (CityId: 96)
    { id: 286, name: "Manokwari", cityId: 96 },

    // Sorong Selatan (CityId: 97)
    { id: 287, name: "Sorong Selatan", cityId: 97 },

    // Raja Ampat (CityId: 98)
    { id: 288, name: "Raja Ampat", cityId: 98 },
    { id: 289, name: "Waigeo", cityId: 98 },
];

const villages = [
    // Kuta Alam (districtId: 1)
    { id: 1, name: "Kuta Alam", districtId: 1 },
    { id: 2, name: "Kuta Raja", districtId: 1 },
    { id: 3, name: "Baiturrahman", districtId: 1 },
    { id: 4, name: "Meuraxa", districtId: 1 },
    { id: 5, name: "Jaya Baru", districtId: 1 },
  
    // Langsa (districtId: 2)
    { id: 6, name: "Langsa Barat", districtId: 2 },
    { id: 7, name: "Langsa Kota", districtId: 2 },
    { id: 8, name: "Langsa Lama", districtId: 2 },
    { id: 9, name: "Langsa Timur", districtId: 2 },
  
    // Lhokseumawe (districtId: 3)
    { id: 10, name: "Muara Dua", districtId: 3 },
    { id: 11, name: "Banda Sakti", districtId: 3 },
    { id: 12, name: "Blang Mangat", districtId: 3 },
    { id: 13, name: "Sukajadi", districtId: 3 },
  
    // Sabang (districtId: 4)
    { id: 14, name: "Sukakarya", districtId: 4 },
    { id: 15, name: "Sukajaya", districtId: 4 },
  
    // Padang Sidempuan (districtId: 5)
    { id: 16, name: "Penanggalan", districtId: 5 },
    { id: 17, name: "Rundeng", districtId: 5 },
    { id: 18, name: "Simpang Kiri", districtId: 5 },
  
    // Medan (districtId: 6)
    { id: 19, name: "Medan Kota", districtId: 6 },
    { id: 20, name: "Medan Marelan", districtId: 6 },
    { id: 21, name: "Medan Tuntungan", districtId: 6 },
    { id: 22, name: "Medan Helvetia", districtId: 6 },
  
    // Binjai (districtId: 7)
    { id: 23, name: "Binjai Kota", districtId: 7 },
    { id: 24, name: "Binjai Barat", districtId: 7 },
    { id: 25, name: "Binjai Timur", districtId: 7 },
  
    // Padang Sidempuan (districtId: 9)
    { id: 26, name: "Padang Sidempuan Barat", districtId: 9 },
    { id: 27, name: "Padang Sidempuan Utara", districtId: 9 },
  
    // Gunungsitoli (districtId: 10)
    { id: 28, name: "Gunungsitoli Idanoi", districtId: 10 },
    { id: 29, name: "Gunungsitoli Selatan", districtId: 10 },
    { id: 30, name: "Gunungsitoli Utara", districtId: 10 },
  
    // Rambutan (districtId: 8)
    { id: 31, name: "Rambutan", districtId: 8 },
    { id: 32, name: "Padang Hilir", districtId: 8 },
    { id: 33, name: "Padang Hulu", districtId: 8 },
    { id: 34, name: "Bajenis", districtId: 8 },
    { id: 35, name: "Tebing Tinggi Kota", districtId: 8 },
  ];
  
