// prisma/seed.js
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Helper: URL placeholder dengan warna
const P = (text, warna = '16a34a') =>
  `https://placehold.co/400x400/${warna}/white?text=${encodeURIComponent(text)}`
const LOGO = (text, warna = '14532d') =>
  `https://placehold.co/200x200/${warna}/white?text=${encodeURIComponent(text)}`

async function main() {
  console.log('🌱 Mulai seeding...')

  // ── RESET ──────────────────────────────────────────────────
  await prisma.notifikasi.deleteMany()
  await prisma.detailTransaksi.deleteMany()
  await prisma.transaksi.deleteMany()
  await prisma.produk.deleteMany()
  await prisma.umkm.deleteMany()
  await prisma.news.deleteMany()
  await prisma.qrisConfig.deleteMany()
  await prisma.user.deleteMany()
  await prisma.admin.deleteMany()
  console.log('🗑️  Semua data lama dihapus')

  // ── ADMIN ──────────────────────────────────────────────────
  const admin = await prisma.admin.create({
    data: {
      nama: 'Administrator',
      email: 'admin@umkm-wongsorejo.id',
      password: await bcrypt.hash('admin123', 10),
    },
  })
  console.log('✅ Admin dibuat')

  // ── USERS ──────────────────────────────────────────────────
  const [user1, user2, user3] = await Promise.all([
    prisma.user.create({
      data: {
        nama: 'Budi Santoso',
        email: 'budi@test.com',
        password: await bcrypt.hash('user123', 10),
        alamat: 'Jl. Mawar No. 5, Wongsorejo, Banyuwangi',
        no_hp: '081234567890',
      },
    }),
    prisma.user.create({
      data: {
        nama: 'Siti Rahayu',
        email: 'siti@test.com',
        password: await bcrypt.hash('user123', 10),
        alamat: 'Dusun Krajan RT 02/01, Wongsorejo',
        no_hp: '082345678901',
      },
    }),
    prisma.user.create({
      data: {
        nama: 'Ahmad Fauzi',
        email: 'ahmad@test.com',
        password: await bcrypt.hash('user123', 10),
        alamat: 'Desa Alasbuluh, Wongsorejo, Banyuwangi',
        no_hp: '083456789012',
      },
    }),
  ])
  console.log('✅ 3 User dibuat')

  // ── UMKM (13 data dari lapangan) ───────────────────────────
  const umkmRecords = await Promise.all([
    // 1
    prisma.umkm.create({ data: {
      nama_umkm: 'Kripik Singkong Pak Rizal', pemilik: 'Rizal',
      desa: 'Wongsorejo', kecamatan: 'Wongsorejo', kategori: 'Makanan Ringan',
      status_pendampingan: 'Sudah Pendampingan',
      deskripsi: 'Produsen kripik singkong renyah khas Desa Wongsorejo. Telah mendapat pendampingan dari Bidang Usaha Mikro Dinas Diskopumdag Kabupaten Banyuwangi.',
      logo: LOGO('Pak Rizal', '16a34a'), id_admin: admin.id_admin,
    }}),
    // 2
    prisma.umkm.create({ data: {
      nama_umkm: 'Kue Kering Bu Justia', pemilik: 'Justia',
      desa: 'Alasbuluh', kecamatan: 'Wongsorejo', kategori: 'Kue & Roti',
      status_pendampingan: 'Sudah Pendampingan',
      deskripsi: 'Usaha kue kering rumahan dari Desa Alasbuluh. Telah mendapat pendampingan dari Bidang Usaha Mikro Dinas Diskopumdag Kabupaten Banyuwangi.',
      logo: LOGO('Bu Justia', 'f59e0b'), id_admin: admin.id_admin,
    }}),
    // 3
    prisma.umkm.create({ data: {
      nama_umkm: 'Telur Asin Pak Rahmad', pemilik: 'Rahmad',
      desa: 'Wongsorejo', kecamatan: 'Wongsorejo', kategori: 'Makanan Olahan',
      status_pendampingan: 'Sudah Pendampingan',
      deskripsi: 'Produsen telur asin berkualitas dari Desa Wongsorejo. Proses pengasinan tradisional 14 hari menghasilkan kuning telur berminyak dan pasir. Telah mendapat pendampingan Diskopumdag.',
      logo: LOGO('Pak Rahmad', 'f97316'), id_admin: admin.id_admin,
    }}),
    // 4
    prisma.umkm.create({ data: {
      nama_umkm: 'Kripik Pisang Bu Saimah', pemilik: 'Saimah',
      desa: 'Alasrejo', kecamatan: 'Wongsorejo', kategori: 'Makanan Ringan',
      status_pendampingan: 'Sudah Pendampingan',
      deskripsi: 'Usaha kripik pisang gurih dari Desa Alasrejo. Menggunakan pisang kapok pilihan, digoreng kering dan renyah. Telah mendapat pendampingan dari Diskopumdag Banyuwangi.',
      logo: LOGO('Bu Saimah', 'eab308'), id_admin: admin.id_admin,
    }}),
    // 5
    prisma.umkm.create({ data: {
      nama_umkm: 'Kacang Asin Sidodadi Utara', pemilik: null,
      desa: 'Sidodadi Utara', kecamatan: 'Wongsorejo', kategori: 'Makanan Ringan',
      status_pendampingan: 'Belum Pendampingan',
      deskripsi: 'Produsen kacang asin dari Desa Sidodadi Utara. Berlokasi di balai desa yang pernah dikunjungi langsung oleh Bupati Banyuwangi. Potensi besar untuk dikembangkan.',
      logo: LOGO('Sidodadi', '84cc16'), id_admin: admin.id_admin,
    }}),
    // 6
    prisma.umkm.create({ data: {
      nama_umkm: 'Rengginang Bajulmati', pemilik: null,
      desa: 'Bajulmati', dusun: 'Mangaran', kecamatan: 'Wongsorejo', kategori: 'Makanan Ringan',
      status_pendampingan: 'Belum Pendampingan',
      deskripsi: 'Usaha rengginang ketan dari Dusun Mangaran, Desa Bajulmati. Produk tradisional yang dibuat secara turun-temurun dengan ketan putih pilihan.',
      logo: LOGO('Rengginang', '65a30d'), id_admin: admin.id_admin,
    }}),
    // 7
    prisma.umkm.create({ data: {
      nama_umkm: 'Marning Pak Untazd Masud', pemilik: 'Untazd Masud',
      desa: 'Bajulmati', dusun: 'Badolan', kecamatan: 'Wongsorejo', kategori: 'Makanan Ringan',
      status_pendampingan: 'Belum Pendampingan',
      deskripsi: 'Produsen marning jagung dari Dusun Badolan, Desa Bajulmati. Bumbu rempah tradisional, renyah dan gurih. Belum mendapat akses pendampingan maupun platform pemasaran digital.',
      logo: LOGO('Pak Untazd', 'ca8a04'), id_admin: admin.id_admin,
    }}),
    // 8
    prisma.umkm.create({ data: {
      nama_umkm: 'Marning Pak Anam', pemilik: 'Anam',
      desa: 'Bajulmati', dusun: 'Badolan', kecamatan: 'Wongsorejo', kategori: 'Makanan Ringan',
      status_pendampingan: 'Belum Pendampingan',
      deskripsi: 'Produsen marning jagung dari Dusun Badolan, Desa Bajulmati. Sejenis dengan Pak Untazd Masud namun dengan cita rasa bumbu yang berbeda.',
      logo: LOGO('Pak Anam', 'b45309'), id_admin: admin.id_admin,
    }}),
    // 9
    prisma.umkm.create({ data: {
      nama_umkm: 'Es Cendol Badolan', pemilik: null,
      desa: 'Bajulmati', dusun: 'Badolan', kecamatan: 'Wongsorejo', kategori: 'Minuman',
      status_pendampingan: 'Belum Pendampingan',
      deskripsi: 'Usaha es cendol segar dengan santan kelapa dan gula merah asli dari Dusun Badolan. Minuman tradisional Jawa yang menyegarkan dan belum tersentuh digitalisasi.',
      logo: LOGO('Es Cendol', '0d9488'), id_admin: admin.id_admin,
    }}),
    // 10
    prisma.umkm.create({ data: {
      nama_umkm: 'Marning Wongsorejo Selatan', pemilik: null,
      desa: 'Wongsorejo', kecamatan: 'Wongsorejo', kategori: 'Makanan Ringan',
      status_pendampingan: 'Belum Pendampingan',
      deskripsi: 'Produsen marning jagung yang berlokasi di selatan Masjid, Desa Wongsorejo. Cita rasa gurih khas dengan bumbu bawang putih alami.',
      logo: LOGO('Marning WS', '78716c'), id_admin: admin.id_admin,
    }}),
    // 11
    prisma.umkm.create({ data: {
      nama_umkm: 'Depo Air Minum Haqiqi', pemilik: null,
      desa: 'Bajulmati', dusun: 'Badolan', kecamatan: 'Wongsorejo', kategori: 'Minuman',
      status_pendampingan: 'Belum Pendampingan',
      deskripsi: 'Depot air minum isi ulang Haqiqi dari Dusun Badolan, Desa Bajulmati. Proses filtrasi bertahap, harga terjangkau. Belum mendapat akses pemasaran digital.',
      logo: LOGO('Haqiqi', '0369a1'), id_admin: admin.id_admin,
    }}),
    // 12
    prisma.umkm.create({ data: {
      nama_umkm: 'Kue Kering Mei Indah', pemilik: 'Yeni',
      desa: 'Wongsorejo', dusun: 'Krajan', kecamatan: 'Wongsorejo', kategori: 'Kue & Roti',
      status_pendampingan: 'Belum Pendampingan',
      deskripsi: 'Usaha kue kering rumahan brand Mei Indah dari Dusun Krajan RT 03/01, Desa Wongsorejo. Dikelola oleh Yeni. Tersedia nastar, putri salju, kastengel, dan kue semprit.',
      logo: LOGO('Mei Indah', 'be185d'), id_admin: admin.id_admin,
    }}),
    // 13
    prisma.umkm.create({ data: {
      nama_umkm: 'Bangsring Village Community (BVC)', pemilik: null,
      desa: 'Bangsring', kecamatan: 'Wongsorejo', kategori: 'Kelompok Usaha',
      status_pendampingan: 'Belum Pendampingan',
      deskripsi: 'Paguyuban usaha kuliner pemuda beranggotakan 50 pelaku usaha dari three desa: Alasbuluh, Bengkak, dan Bangsring. Potensi kolektif yang belum terfasilitasi secara digital.',
      logo: LOGO('BVC', '4f46e5'), id_admin: admin.id_admin,
    }}),
  ])
  console.log(`✅ ${umkmRecords.length} UMKM dibuat`)

  // ── PRODUK (terhubung ke UMKM) ─────────────────────────────
  const [u1,u2,u3,u4,u5,u6,u7,u8,u9,u10,u11,u12,u13] = umkmRecords

  const produkList = await Promise.all([
    // UMKM 1
    prisma.produk.create({ data: { nama_produk: 'Kripik Singkong Original', deskripsi: 'Kripik singkong renyah khas Desa Wongsorejo. Dibuat dari singkong pilihan, digoreng kering tanpa pengawet. Per bungkus 200 gram.', harga: 15000, stok: 50, gambar: P('Kripik Singkong'), id_umkm: u1.id_umkm }}),
    prisma.produk.create({ data: { nama_produk: 'Kripik Singkong Pedas', deskripsi: 'Varian pedas dengan bumbu cabai merah alami. Cocok untuk camilan sore. Per bungkus 200 gram.', harga: 15000, stok: 45, gambar: P('Kripik Pedas', 'dc2626'), id_umkm: u1.id_umkm }}),

    // UMKM 2
    prisma.produk.create({ data: { nama_produk: 'Nastar Bu Justia', deskripsi: 'Nastar isi selai nanas buatan rumahan dari Desa Alasbuluh. Tekstur lembut, manis pas, kemasan toples cantik ±30 pcs.', harga: 45000, stok: 30, gambar: P('Nastar', 'f59e0b'), id_umkm: u2.id_umkm }}),
    prisma.produk.create({ data: { nama_produk: 'Putri Salju Bu Justia', deskripsi: 'Kue putri salju bertabur gula halus. Rasa vanila harum, meleleh di mulut. Per stoples ±30 pcs.', harga: 40000, stok: 25, gambar: P('Putri Salju', 'fbbf24'), id_umkm: u2.id_umkm }}),

    // UMKM 3
    prisma.produk.create({ data: { nama_produk: 'Telur Asin Matang (10 butir)', deskripsi: 'Telur asin matang siap makan. Proses pengasinan tradisional 14 hari, kuning telur berminyak dan pasir. Dikemas per 10 butir.', harga: 28000, stok: 60, gambar: P('Telur Asin', 'f97316'), id_umkm: u3.id_umkm }}),
    prisma.produk.create({ data: { nama_produk: 'Telur Asin Mentah (10 butir)', deskripsi: 'Telur asin mentah untuk diolah sendiri. Cocok untuk nasi bakar, nasi goreng telur asin. Per 10 butir.', harga: 22000, stok: 40, gambar: P('Telur Mentah', 'ea580c'), id_umkm: u3.id_umkm }}),

    // UMKM 4
    prisma.produk.create({ data: { nama_produk: 'Kripik Pisang Manis', deskripsi: 'Kripik pisang kapok rasa manis dari Desa Alasrejo. Renyah tahan lama. Per bungkus 200 gram.', harga: 12000, stok: 35, gambar: P('Kripik Pisang', 'eab308'), id_umkm: u4.id_umkm }}),
    prisma.produk.create({ data: { nama_produk: 'Kripik Pisang Asin', deskripsi: 'Varian asin gurih dengan bumbu bawang putih dan garam. Per bungkus 200 gram.', harga: 12000, stok: 30, gambar: P('Kripik Pisang Asin', 'd97706'), id_umkm: u4.id_umkm }}),

    // UMKM 5
    prisma.produk.create({ data: { nama_produk: 'Kacang Asin Sidodadi', deskripsi: 'Kacang asin goreng khas Desa Sidodadi Utara. Pernah dikunjungi Bupati Banyuwangi. Renyah, gurih, tanpa pengawet. Per bungkus 250 gram.', harga: 18000, stok: 50, gambar: P('Kacang Asin', '84cc16'), id_umkm: u5.id_umkm }}),

    // UMKM 6
    prisma.produk.create({ data: { nama_produk: 'Rengginang Ketan', deskripsi: 'Rengginang ketan tradisional dari Dusun Mangaran, Desa Bajulmati. Dari ketan putih pilihan, dikeringkan dan digoreng kering. Gurih dan renyah.', harga: 20000, stok: 40, gambar: P('Rengginang', '65a30d'), id_umkm: u6.id_umkm }}),

    // UMKM 7
    prisma.produk.create({ data: { nama_produk: 'Marning Jagung Original (Pak Untazd)', deskripsi: 'Marning jagung goreng dari Dusun Badolan. Bumbu bawang dan garam, cocok untuk oleh-oleh Banyuwangi. Per bungkus 200 gram.', harga: 10000, stok: 60, gambar: P('Marning Jagung', 'ca8a04'), id_umkm: u7.id_umkm }}),
    prisma.produk.create({ data: { nama_produk: 'Marning Jagung Pedas (Pak Untazd)', deskripsi: 'Varian pedas marning Pak Untazd. Level pedas sedang, bumbu cabai merah alami. Per bungkus 200 gram.', harga: 10000, stok: 55, gambar: P('Marning Pedas', 'b45309'), id_umkm: u7.id_umkm }}),

    // UMKM 8
    prisma.produk.create({ data: { nama_produk: 'Marning Jagung Original (Pak Anam)', deskripsi: 'Marning jagung dari Pak Anam, Dusun Badolan. Tekstur renyah dengan bumbu rempah tradisional. Per bungkus 200 gram.', harga: 10000, stok: 45, gambar: P('Marning Anam', 'a16207'), id_umkm: u8.id_umkm }}),
    prisma.produk.create({ data: { nama_produk: 'Marning Jagung Pedas (Pak Anam)', deskripsi: 'Varian pedas dari Pak Anam. Pedas menggigit untuk penggemar camilan pedas. Per bungkus 200 gram.', harga: 10000, stok: 40, gambar: P('Marning Pedas Anam', '92400e'), id_umkm: u8.id_umkm }}),

    // UMKM 9
    prisma.produk.create({ data: { nama_produk: 'Es Cendol Badolan', deskripsi: 'Es cendol segar santan kelapa dan gula merah asli dari Dusun Badolan. Minuman tradisional menyegarkan. Tersedia musiman.', harga: 5000, stok: 0, gambar: P('Es Cendol', '0d9488'), id_umkm: u9.id_umkm }}),

    // UMKM 10
    prisma.produk.create({ data: { nama_produk: 'Marning Jagung Wongsorejo', deskripsi: 'Marning jagung dari selatan Masjid Desa Wongsorejo. Cita rasa gurih khas. Per bungkus 200 gram.', harga: 10000, stok: 50, gambar: P('Marning WS', '78716c'), id_umkm: u10.id_umkm }}),

    // UMKM 11
    prisma.produk.create({ data: { nama_produk: 'Air Minum Isi Ulang (per galon)', deskripsi: 'Air minum isi ulang dari Depot Haqiqi, Dusun Badolan. Filtrasi bertahap, harga terjangkau. Pesan antar tersedia untuk area sekitar.', harga: 5000, stok: 100, gambar: P('Air Minum', '0369a1'), id_umkm: u11.id_umkm }}),

    // UMKM 12
    prisma.produk.create({ data: { nama_produk: 'Aneka Kue Kering Mei Indah', deskripsi: 'Kue kering rumahan brand Mei Indah dari Dusun Krajan. Tersedia nastar, putri salju, kastengel, dan kue semprit. Per toples isi ±25–30 pcs.', harga: 50000, stok: 20, gambar: P('Kue Mei Indah', 'be185d'), id_umkm: u12.id_umkm }}),

    // UMKM 13
    prisma.produk.create({ data: { nama_produk: 'Paket Kuliner Desa BVC', deskripsi: 'Paket aneka kuliner dari Bangsring Village Community (BVC) — 50 pelaku usaha dari 3 desa. Tersedia gorengan, jajanan pasar, dan minuman lokal Banyuwangi.', harga: 25000, stok: 30, gambar: P('BVC Kuliner', '4f46e5'), id_umkm: u13.id_umkm }}),
  ])
  console.log(`✅ ${produkList.length} Produk dibuat`)

  // Shorthand produk untuk transaksi
  const [kripikOri, , nastar, putriSalju, telurMatang, , , , , , marningOriU7, , , , , , , airMinum, kueMeiIndah] = produkList

  // ── NEWS ───────────────────────────────────────────────────
  await Promise.all([
    prisma.news.create({ data: { judul: 'Marketplace UMKM Wongsorejo Resmi Diluncurkan', isi: 'Platform digital marketplace UMKM Kecamatan Wongsorejo kini resmi hadir, menampung 13 pelaku usaha dari berbagai desa. Produk lokal seperti kripik singkong, telur asin, marning jagung, dan aneka kue kering kini dapat diakses oleh pembeli dari seluruh wilayah. Platform dibangun berbasis Progressive Web App (PWA) sehingga dapat digunakan meski koneksi internet terbatas.', lokasi: 'Kecamatan Wongsorejo, Banyuwangi', id_admin: admin.id_admin }}),
    prisma.news.create({ data: { judul: 'BVC Bangsring: 50 Pelaku Usaha Kuliner Bersatu dalam Satu Platform', isi: 'Bangsring Village Community (BVC) menjadi UMKM unggulan dalam marketplace ini. BVC adalah paguyuban usaha kuliner pemuda beranggotakan 50 pelaku usaha dari tiga desa: Alasbuluh, Bengkak, dan Bangsring. Kolaborasi ini diharapkan dapat memperluas jangkauan pasar kuliner lokal yang selama ini hanya mengandalkan penjualan tatap muka.', lokasi: 'Desa Bangsring, Wongsorejo', id_admin: admin.id_admin }}),
    prisma.news.create({ data: { judul: 'Empat UMKM Wongsorejo Raih Pendampingan Diskopumdag Banyuwangi', isi: 'Sebanyak empat UMKM dari Kecamatan Wongsorejo berhasil mendapat pendampingan dari Bidang Usaha Mikro Dinas Diskopumdag Kabupaten Banyuwangi. Yaitu Kripik Singkong Pak Rizal, Kue Kering Bu Justia, Telur Asin Pak Rahmad, dan Kripik Pisang Bu Saimah. Pendampingan meliputi pelatihan pengemasan, pembukuan sederhana, dan strategi pemasaran digital.', lokasi: 'Wongsorejo, Banyuwangi', id_admin: admin.id_admin }}),
    prisma.news.create({ data: { judul: 'Dusun Badolan: Sentra Marning Jagung di Kecamatan Wongsorejo', isi: 'Dusun Badolan, Desa Bajulmati menjadi sentra produksi marning jagung. Terdapat tiga produsen aktif: Pak Untazd Masud, Pak Anam, dan satu usaha di selatan Masjid Desa Wongsorejo. Camilan jagung goreng ini memiliki cita rasa gurih dan renyah, mulai diminati sebagai oleh-oleh khas Banyuwangi.', lokasi: 'Dusun Badolan, Bajulmati', id_admin: admin.id_admin }}),
    prisma.news.create({ data: { judul: 'Kacang Asin Sidodadi Utara: Dari Balai Desa ke Meja Bupati', isi: 'Kacang asin dari Desa Sidodadi Utara sempat menarik perhatian Bupati Banyuwangi saat kunjungan ke balai desa. Produk ini kini mulai dikenal lebih luas berkat pemasaran digital. Meski belum mendapat pendampingan formal, produk ini memiliki potensi besar untuk dikembangkan lebih lanjut.', lokasi: 'Desa Sidodadi Utara, Wongsorejo', id_admin: admin.id_admin }}),
    prisma.news.create({ data: { judul: 'Program Digitalisasi UMKM Desa: Langkah Nyata Menuju Pasar Lebih Luas', isi: 'Dari 13 UMKM yang terdata di Kecamatan Wongsorejo, baru 4 yang sudah mendapat pendampingan resmi. Platform marketplace ini hadir sebagai langkah awal digitalisasi, memungkinkan seluruh UMKM — baik yang sudah maupun belum mendapat pendampingan — untuk memiliki kehadiran digital.', lokasi: 'Kecamatan Wongsorejo, Banyuwangi', id_admin: admin.id_admin }}),
  ])
  console.log('✅ 6 Berita dibuat')

  // ── QRIS CONFIG ────────────────────────────────────────────
  await prisma.qrisConfig.create({
    data: {
      gambar_url: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=UMKM-WONGSOREJO-DEMO',
      cloudinary_public_id: 'qris_config_placeholder',
      id_admin: admin.id_admin,
    },
  })
  console.log('✅ QRIS Config dibuat')

  // ── TRANSAKSI ──────────────────────────────────────────────
  const trx1 = await prisma.transaksi.create({ data: { total_harga: 33000, metode_pembayaran: 'COD', status: 'selesai', id_user: user1.id_user }})
  await prisma.detailTransaksi.createMany({ data: [
    { jumlah: 1, subtotal: 15000, id_transaksi: trx1.id_transaksi, id_produk: kripikOri.id_produk },
    { jumlah: 1, subtotal: 18000, id_transaksi: trx1.id_transaksi, id_produk: produkList[8].id_produk }, // kacang asin
  ]})

  const trx2 = await prisma.transaksi.create({ data: { total_harga: 85000, metode_pembayaran: 'QRIS', status: 'selesai', id_user: user2.id_user }})
  await prisma.detailTransaksi.createMany({ data: [
    { jumlah: 1, subtotal: 45000, id_transaksi: trx2.id_transaksi, id_produk: nastar.id_produk },
    { jumlah: 1, subtotal: 40000, id_transaksi: trx2.id_transaksi, id_produk: putriSalju.id_produk },
  ]})

  const trx3 = await prisma.transaksi.create({ data: { total_harga: 56000, metode_pembayaran: 'COD', status: 'diproses', id_user: user1.id_user }})
  await prisma.detailTransaksi.create({ data: { jumlah: 2, subtotal: 56000, id_transaksi: trx3.id_transaksi, id_produk: telurMatang.id_produk }})

  const trx4 = await prisma.transaksi.create({ data: { total_harga: 30000, metode_pembayaran: 'QRIS', status: 'pending', id_user: user3.id_user }})
  await prisma.detailTransaksi.createMany({ data: [
    { jumlah: 1, subtotal: 20000, id_transaksi: trx4.id_transaksi, id_produk: produkList[9].id_produk }, // rengginang
    { jumlah: 1, subtotal: 10000, id_transaksi: trx4.id_transaksi, id_produk: marningOriU7.id_produk },
  ]})

  const trx5 = await prisma.transaksi.create({ data: { total_harga: 50000, metode_pembayaran: 'COD', status: 'dibatalkan', id_user: user2.id_user }})
  await prisma.detailTransaksi.create({ data: { jumlah: 1, subtotal: 50000, id_transaksi: trx5.id_transaksi, id_produk: kueMeiIndah.id_produk }})

  console.log('✅ 5 Transaksi dibuat')

  // ── NOTIFIKASI ─────────────────────────────────────────────
  await prisma.notifikasi.createMany({ data: [
    { pesan: 'Selamat datang di Marketplace UMKM Wongsorejo! Temukan produk terbaik dari 13 UMKM desa kami.', status_baca: true,  id_user: user1.id_user },
    { pesan: 'Pesanan Kripik Singkong + Kacang Asin (COD) telah selesai. Terima kasih sudah berbelanja!',    status_baca: true,  id_user: user1.id_user },
    { pesan: 'Pesanan Telur Asin Matang x2 sedang diproses. Admin akan menghubungi untuk konfirmasi.',       status_baca: false, id_user: user1.id_user },
    { pesan: 'Selamat datang! Dukung produk lokal UMKM Wongsorejo.',                                         status_baca: true,  id_user: user2.id_user },
    { pesan: 'Pesanan Nastar + Putri Salju (QRIS) telah selesai. Semoga puas dengan produk kami!',           status_baca: true,  id_user: user2.id_user },
    { pesan: 'Pesanan Kue Kering Mei Indah telah dibatalkan. Hubungi admin jika ada pertanyaan.',             status_baca: false, id_user: user2.id_user },
    { pesan: 'Selamat datang! Jelajahi 13 UMKM dan 20 produk unggulan dari desa-desa Wongsorejo.',           status_baca: false, id_user: user3.id_user },
  ]})
  console.log('✅ 7 Notifikasi dibuat')

  console.log('\n🎉 Seeding selesai!')
  console.log('─────────────────────────────────────────────────────')
  console.log('📧 Admin  : admin@umkm-wongsorejo.id  | admin123')
  console.log('📧 User 1 : budi@test.com             | user123')
  console.log('📧 User 2 : siti@test.com             | user123')
  console.log('📧 User 3 : ahmad@test.com            | user123')
  console.log('─────────────────────────────────────────────────────')
  console.log(`📦 ${produkList.length} produk dari ${umkmRecords.length} UMKM`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
