# OrangeHRM Automation Testing - Cypress + Page Object Model

Final project Quality Assurance: automation testing untuk website demo **OrangeHRM** menggunakan **Cypress** dengan pola **Page Object Model (POM)** yang dipisah menjadi **action, assertion, data, dan intercept**.

- Website yang diuji: https://opensource-demo.orangehrmlive.com
- Fitur yang diuji: **Login**, **Directory**, dan **Recruitment**
- Jumlah test case: **24** (masing-masing fitur 8 test case)

---

## Daftar Isi

1. [Tentang Project](#1-tentang-project)
2. [Teknologi yang Dipakai](#2-teknologi-yang-dipakai)
3. [Struktur Folder](#3-struktur-folder)
4. [Penjelasan Pola POM di Project Ini](#4-penjelasan-pola-pom-di-project-ini)
5. [Prasyarat](#5-prasyarat)
6. [Instalasi](#6-instalasi)
7. [Cara Menjalankan Test](#7-cara-menjalankan-test)
8. [Daftar Test Case](#8-daftar-test-case)
9. [Penjelasan Intercept (Spy dan Stub)](#9-penjelasan-intercept-spy-dan-stub)
10. [Data Uji](#10-data-uji)
11. [Troubleshooting](#11-troubleshooting)
12. [Catatan dan Keterbatasan](#12-catatan-dan-keterbatasan)
13. [Kesimpulan](#13-kesimpulan)
14. [Author](#14-author)

---

## 1. Tentang Project

Project ini dibuat untuk memenuhi tugas final project mata kuliah/pelatihan QA. Tujuannya membuat pengujian otomatis (automation) pada tiga fitur di OrangeHRM:

| Fitur | Fungsi di aplikasi | Jumlah TC |
|---|---|---|
| Login | Pintu masuk aplikasi, memverifikasi username dan password | 8 |
| Directory | Mencari dan melihat daftar karyawan berdasarkan nama, jabatan, dan lokasi | 8 |
| Recruitment | Mengelola kandidat dan lowongan pekerjaan | 8 |

Setiap fitur diuji dari beberapa sisi: skenario berhasil (positif), skenario gagal (negatif), validasi form, dan validasi respons API lewat intercept.

---

## 2. Teknologi yang Dipakai

| Teknologi | Kegunaan |
|---|---|
| Node.js (LTS) | Menjalankan JavaScript di luar browser dan mengelola package |
| Cypress | Framework automation testing untuk web |
| JavaScript (ES6) | Bahasa penulisan script |
| JSON | Menyimpan data uji |
| Git dan GitHub | Version control dan penyimpanan project |

---

## 3. Struktur Folder

```
orangehrm-cypress-pom/
├── cypress/
│   ├── data/                      # Data uji (JSON)
│   │   ├── loginData.json
│   │   ├── directoryData.json
│   │   └── recruitmentData.json
│   ├── e2e/                       # File test (alur skenario)
│   │   ├── login.cy.js
│   │   ├── directory.cy.js
│   │   └── recruitment.cy.js
│   └── support/
│       ├── actions/               # Selector dan aksi (klik, ketik, pilih)
│       │   ├── loginActions.js
│       │   ├── directoryActions.js
│       │   └── recruitmentActions.js
│       ├── assertions/            # Pengecekan hasil
│       │   ├── loginAssertions.js
│       │   ├── directoryAssertions.js
│       │   └── recruitmentAssertions.js
│       ├── intercepts/            # Monitoring dan stubbing request API
│       │   ├── loginIntercept.js
│       │   ├── directoryIntercept.js
│       │   └── recruitmentIntercept.js
│       ├── commands.js            # Custom command (cy.login)
│       └── e2e.js                 # Konfigurasi global
├── cypress.config.js              # Konfigurasi Cypress
├── package.json                   # Daftar dependency dan script
├── .gitignore                     # File/folder yang tidak diupload
└── README.md                      # Dokumentasi ini
```

---

## 4. Penjelasan Pola POM di Project Ini

**Page Object Model (POM)** adalah cara menyusun script test supaya rapi dan mudah dirawat. Selector dan langkah interaksi dikumpulkan di satu tempat, sehingga file test hanya berisi alur ceritanya. Kalau tampilan website berubah, cukup edit satu file, tidak perlu mengubah puluhan test.

Di project ini POM dibagi menjadi empat bagian:

| Bagian | Isi | Lokasi | Analogi |
|---|---|---|---|
| **Action** | Selector elemen dan perintah interaksi | `support/actions/` | "Tangan" tester |
| **Assertion** | Pengecekan apakah hasil sesuai harapan | `support/assertions/` | "Mata" tester |
| **Data** | Data uji seperti username, password, pesan error | `cypress/data/` | "Bahan" tes |
| **Intercept** | Memantau atau memanipulasi request API | `support/intercepts/` | "Penyadap" jaringan |

**Contoh alur satu test (TC_LOGIN_001):**

1. File `login.cy.js` memanggil `loginActions.login(...)` untuk mengisi form dan klik tombol Login.
2. `loginIntercept.waitLogin()` menunggu request `POST /auth/validate` selesai.
3. `loginAssertions.loginRequestOk(...)` mengecek status response.
4. `loginAssertions.dashboardDisplayed()` mengecek halaman Dashboard tampil.
5. Data username dan password diambil dari `loginData.json`.

---

## 5. Prasyarat

Pastikan sudah terpasang:

- **Node.js versi LTS** (download di https://nodejs.org)
- **Git** (download di https://git-scm.com)
- **Google Chrome**
- **VS Code** (disarankan)

Cek versi lewat terminal:

```bash
node -v
npm -v
git --version
```

---

## 6. Instalasi

1. Clone repository ini:

   ```bash
   git clone https://github.com/USERNAME/orangehrm-cypress-pom.git
   ```

2. Masuk ke folder project:

   ```bash
   cd orangehrm-cypress-pom
   ```

3. Install semua dependency (termasuk Cypress):

   ```bash
   npm install
   ```

   Proses ini agak lama karena Cypress cukup besar. Tunggu sampai selesai.

---

## 7. Cara Menjalankan Test

### Mode visual (Cypress Test Runner)

Cocok untuk demo karena langkah test bisa dilihat langsung.

```bash
npx cypress open
```

Lalu: pilih **E2E Testing**, pilih browser **Chrome**, klik **Start E2E Testing**, kemudian klik file spec yang ingin dijalankan (`login.cy.js`, `directory.cy.js`, atau `recruitment.cy.js`).

### Mode terminal (headless)

Cocok untuk menjalankan semua test sekaligus.

```bash
# semua test
npx cypress run

# satu fitur saja
npx cypress run --spec "cypress/e2e/login.cy.js"
npx cypress run --spec "cypress/e2e/directory.cy.js"
npx cypress run --spec "cypress/e2e/recruitment.cy.js"
```

### Lewat npm script

```bash
npm run cy:open
npm run cy:run
npm run test:login
npm run test:directory
npm run test:recruitment
```

---

## 8. Daftar Test Case

### 8.1 Login (`login.cy.js`)

| ID | Skenario | Tipe |
|---|---|---|
| TC_LOGIN_001 | Login berhasil dengan username dan password valid | Positif |
| TC_LOGIN_002 | Login gagal dengan username salah | Negatif |
| TC_LOGIN_003 | Login gagal dengan password salah | Negatif |
| TC_LOGIN_004 | Login gagal dengan username dan password sama-sama salah | Negatif |
| TC_LOGIN_005 | Login gagal saat username dan password dikosongkan | Validasi form |
| TC_LOGIN_006 | Login gagal saat username kosong | Validasi form |
| TC_LOGIN_007 | Login gagal saat password kosong | Validasi form |
| TC_LOGIN_008 | Password tersamarkan dan user bisa logout setelah login | Fungsional |

### 8.2 Directory (`directory.cy.js`)

| ID | Skenario | Tipe |
|---|---|---|
| TC_DIR_001 | Membuka menu Directory dari sidebar | Navigasi |
| TC_DIR_002 | Form filter (Employee Name, Job Title, Location) tampil lengkap | Tampilan |
| TC_DIR_003 | Filter berdasarkan Job Title | Fungsional |
| TC_DIR_004 | Filter berdasarkan Location | Fungsional |
| TC_DIR_005 | Menampilkan "No Records Found" saat API mengembalikan data kosong (stub) | Intercept stub |
| TC_DIR_006 | Autocomplete Employee Name menampilkan saran | Fungsional |
| TC_DIR_007 | Nama karyawan yang tidak valid menampilkan pesan Invalid | Negatif |
| TC_DIR_008 | Tombol Reset mengembalikan filter ke kondisi awal | Fungsional |

### 8.3 Recruitment (`recruitment.cy.js`)

| ID | Skenario | Tipe |
|---|---|---|
| TC_REC_001 | Membuka menu Recruitment dari sidebar | Navigasi |
| TC_REC_002 | Berpindah ke tab Vacancies | Navigasi |
| TC_REC_003 | Tombol Add menampilkan form Add Candidate | Fungsional |
| TC_REC_004 | Gagal menyimpan kandidat saat field wajib kosong | Validasi form |
| TC_REC_005 | Gagal menyimpan kandidat dengan format email salah | Validasi form |
| TC_REC_006 | Berhasil menambahkan kandidat baru | Positif |
| TC_REC_007 | Pencarian dengan keyword yang tidak ada menampilkan No Records Found | Negatif |
| TC_REC_008 | Berhasil menghapus kandidat yang baru dibuat | Positif |

---

## 9. Penjelasan Intercept (Spy dan Stub)

`cy.intercept()` adalah fitur Cypress untuk mengamati dan mengatur request jaringan (API) yang dikirim website. Di project ini dipakai dengan dua cara.

### Spy (memantau request asli)

Request tetap berjalan ke server asli, tapi Cypress ikut "mengintip". Dipakai untuk membuktikan bahwa aksi di UI benar-benar menghasilkan request yang tepat.

```js
cy.intercept('POST', '**/auth/validate').as('loginRequest');
// ...lakukan aksi login...
cy.wait('@loginRequest').then((i) => {
  expect(i.response.statusCode).to.be.oneOf([200, 302]);
});
```

Contoh pemakaian di project ini:

| Fitur | Endpoint yang dipantau | Yang diverifikasi |
|---|---|---|
| Login | `POST /auth/validate` | Status response dan username terkirim |
| Directory | `GET /api/v2/directory/employees` | Status 200 dan parameter `jobTitleId` / `locationId` |
| Directory (autocomplete) | `GET /api/v2/directory/employees?nameOrId=*` | Saran nama muncul |
| Recruitment | `POST /api/v2/recruitment/candidates` | Nama di response sama dengan yang diinput |
| Recruitment | `DELETE /api/v2/recruitment/candidates` | Status 200 saat hapus |

### Stub (mengganti response)

Request dicegat dan dijawab dengan data buatan kita. Dipakai untuk menguji kondisi yang sulit dibuat di server asli, misalnya data kosong.

```js
cy.intercept('GET', '**/api/v2/directory/employees**', {
  statusCode: 200,
  body: { data: [], meta: { total: 0 }, rels: [] },
}).as('getEmptyDirectory');
```

Ini dipakai pada **TC_DIR_005** untuk menguji tampilan "No Records Found" tanpa bergantung pada data di website demo.

### Alias dan `cy.wait`

Alias (`.as('nama')`) memberi nama pada sebuah intercept, lalu `cy.wait('@nama')` membuat test menunggu request itu selesai. Cara ini lebih stabil dibanding `cy.wait(3000)` yang menebak waktu tunggu.

---

## 10. Data Uji

Semua data uji disimpan di folder `cypress/data/` dalam format JSON, jadi bisa diubah tanpa menyentuh script test.

| File | Isi |
|---|---|
| `loginData.json` | Kredensial valid dan tidak valid, pesan error, URL |
| `directoryData.json` | Job Title, Location, keyword autocomplete, pesan, response kosong untuk stub |
| `recruitmentData.json` | Data kandidat, email tidak valid, keyword tidak ada, pesan |

**Kredensial demo OrangeHRM:** username `Admin`, password `admin123`.

**Catatan data kandidat:** nama belakang kandidat dibuat unik otomatis lewat `generateCandidate()` (menambahkan angka dari `Date.now()`), supaya test aman dijalankan berulang kali tanpa bentrok dengan data lama.

**Catatan data Directory:** nilai `jobTitle` dan `location` di `directoryData.json` harus sama persis dengan opsi di dropdown website. Kalau gagal, cek opsi yang tersedia lalu sesuaikan.

---

## 11. Troubleshooting

| Masalah | Penyebab | Solusi |
|---|---|---|
| `Expected to find content: '...' within the selector '.oxd-select-option'` | Opsi dropdown tidak ada di website demo | Buka dropdown manual, salin teks opsi persis, ubah di `directoryData.json` |
| `cy.wait() timed out ... No request ever occurred` | Pola URL intercept tidak cocok dengan request asli | Buka DevTools, tab Network, filter Fetch/XHR, lihat URL sebenarnya, sesuaikan di file intercept |
| Selector tidak ditemukan | Tampilan website berubah | Inspect elemen di Chrome, perbarui selector di file action |
| Test lambat atau timeout | Server demo sedang ramai | Jalankan ulang, atau naikkan `defaultCommandTimeout` di `cypress.config.js` |
| Kandidat tidak muncul saat hapus | Daftar kandidat dipaginasi | Pastikan kandidat baru tampil di halaman pertama, jalankan ulang |
| `npm install` gagal | Koneksi atau versi Node | Pastikan Node versi LTS dan internet stabil, ulangi |

---

## 12. Catatan dan Keterbatasan

- Website demo OrangeHRM bersifat publik. Datanya **di-reset berkala** dan servernya kadang lambat, jadi hasil test bisa berbeda di waktu yang berbeda.
- Selector dan endpoint mengikuti struktur OrangeHRM versi 5 yang tampil saat project dibuat. Jika versi demo berubah, bagian action dan intercept mungkin perlu disesuaikan.
- Pada proyek nyata, sebaiknya test dijalankan di environment khusus testing dengan data yang terkontrol.

---

## 13. Kesimpulan

Project ini menghasilkan **24 test case otomatis** (8 Login, 8 Directory, 8 Recruitment) dengan Cypress dan pola POM yang memisahkan action, assertion, data, dan intercept.

Hal yang didapat dari pendekatan ini:

- **Rapi dan mudah dirawat.** Perubahan selector cukup di file action, perubahan data cukup di file JSON.
- **Lebih stabil.** Memakai `cy.intercept` dan `cy.wait('@alias')` sehingga test menunggu request selesai, bukan menebak waktu.
- **Cakupan lengkap.** Ada skenario positif, negatif, validasi form, validasi API (spy), dan simulasi data kosong (stub).
- **Efisien.** `cy.session` membuat login cukup dilakukan sekali untuk test Directory dan Recruitment.

---

## 14. Author

- Nama: **Wahyu Kuncoro**
- QA Sanber Code