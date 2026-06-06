-- CreateEnum
CREATE TYPE "MetodePembayaran" AS ENUM ('COD', 'QRIS');

-- CreateEnum
CREATE TYPE "StatusTransaksi" AS ENUM ('pending', 'diproses', 'selesai', 'dibatalkan');

-- CreateTable
CREATE TABLE "users" (
    "id_user" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "alamat" TEXT,
    "no_hp" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "admins" (
    "id_admin" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "umkm" (
    "id_umkm" SERIAL NOT NULL,
    "nama_umkm" TEXT NOT NULL,
    "pemilik" TEXT,
    "desa" TEXT NOT NULL,
    "dusun" TEXT,
    "kecamatan" TEXT NOT NULL DEFAULT 'Wongsorejo',
    "kategori" TEXT NOT NULL,
    "status_pendampingan" TEXT NOT NULL,
    "deskripsi" TEXT,
    "logo" TEXT,
    "kontak" TEXT,
    "id_admin" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "umkm_pkey" PRIMARY KEY ("id_umkm")
);

-- CreateTable
CREATE TABLE "produk" (
    "id_produk" SERIAL NOT NULL,
    "nama_produk" TEXT NOT NULL,
    "deskripsi" TEXT,
    "harga" DECIMAL(65,30) NOT NULL,
    "stok" INTEGER NOT NULL DEFAULT 0,
    "gambar" TEXT,
    "id_umkm" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "produk_pkey" PRIMARY KEY ("id_produk")
);

-- CreateTable
CREATE TABLE "transaksi" (
    "id_transaksi" SERIAL NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_harga" DECIMAL(65,30) NOT NULL,
    "metode_pembayaran" "MetodePembayaran" NOT NULL,
    "status" "StatusTransaksi" NOT NULL DEFAULT 'pending',
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "transaksi_pkey" PRIMARY KEY ("id_transaksi")
);

-- CreateTable
CREATE TABLE "detail_transaksi" (
    "id_detail" SERIAL NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "subtotal" DECIMAL(65,30) NOT NULL,
    "id_transaksi" INTEGER NOT NULL,
    "id_produk" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "detail_transaksi_pkey" PRIMARY KEY ("id_detail")
);

-- CreateTable
CREATE TABLE "notifikasi" (
    "id_notifikasi" SERIAL NOT NULL,
    "pesan" TEXT NOT NULL,
    "status_baca" BOOLEAN NOT NULL DEFAULT false,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "notifikasi_pkey" PRIMARY KEY ("id_notifikasi")
);

-- CreateTable
CREATE TABLE "news" (
    "id_news" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "lokasi" TEXT,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_admin" INTEGER NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id_news")
);

-- CreateTable
CREATE TABLE "qris_config" (
    "id" SERIAL NOT NULL,
    "gambar_url" TEXT NOT NULL,
    "cloudinary_public_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_admin" INTEGER NOT NULL,

    CONSTRAINT "qris_config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- AddForeignKey
ALTER TABLE "umkm" ADD CONSTRAINT "umkm_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "admins"("id_admin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produk" ADD CONSTRAINT "produk_id_umkm_fkey" FOREIGN KEY ("id_umkm") REFERENCES "umkm"("id_umkm") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaksi" ADD CONSTRAINT "transaksi_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_transaksi" ADD CONSTRAINT "detail_transaksi_id_transaksi_fkey" FOREIGN KEY ("id_transaksi") REFERENCES "transaksi"("id_transaksi") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_transaksi" ADD CONSTRAINT "detail_transaksi_id_produk_fkey" FOREIGN KEY ("id_produk") REFERENCES "produk"("id_produk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifikasi" ADD CONSTRAINT "notifikasi_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "admins"("id_admin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qris_config" ADD CONSTRAINT "qris_config_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "admins"("id_admin") ON DELETE RESTRICT ON UPDATE CASCADE;
