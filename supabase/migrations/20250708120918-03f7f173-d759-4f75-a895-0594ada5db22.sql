
-- Tabel calon mitra (data mitra yang belum diverifikasi)
CREATE TABLE public.calon_mitra (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nama TEXT NOT NULL,
  email TEXT NOT NULL,
  nomor_hp TEXT NOT NULL,
  ktp TEXT NOT NULL,
  kk TEXT NOT NULL,
  alamat TEXT,
  jenis_layanan TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabel mitra aktif (mitra yang sudah diverifikasi)
CREATE TABLE public.mitras (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nama TEXT NOT NULL,
  email TEXT NOT NULL,
  nomor_hp TEXT NOT NULL,
  ktp TEXT NOT NULL,
  kk TEXT NOT NULL,
  alamat TEXT,
  jenis_layanan TEXT,
  status TEXT DEFAULT 'aktif',
  saldo DECIMAL(15,2) DEFAULT 0,
  blokir BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabel users
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nama TEXT NOT NULL,
  email TEXT NOT NULL,
  nomor_hp TEXT NOT NULL,
  alamat TEXT,
  saldo DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabel layanan
CREATE TABLE public.layanan (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nama_layanan TEXT NOT NULL,
  deskripsi TEXT,
  tarif DECIMAL(15,2) NOT NULL,
  kategori TEXT,
  aktif BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabel pesanan
CREATE TABLE public.pesanan (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id),
  mitra_id UUID REFERENCES public.mitras(id),
  layanan_id UUID REFERENCES public.layanan(id),
  status TEXT DEFAULT 'pending',
  total_bayar DECIMAL(15,2),
  alamat_pesanan TEXT,
  catatan TEXT,
  tanggal_pesanan TIMESTAMP WITH TIME ZONE DEFAULT now(),
  tanggal_selesai TIMESTAMP WITH TIME ZONE
);

-- Tabel komplain
CREATE TABLE public.komplain (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id),
  mitra_id UUID REFERENCES public.mitras(id),
  pesanan_id UUID REFERENCES public.pesanan(id),
  isi_komplain TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  tanggal_komplain TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabel rating
CREATE TABLE public.rating (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id),
  mitra_id UUID REFERENCES public.mitras(id),
  pesanan_id UUID REFERENCES public.pesanan(id),
  nilai_rating INTEGER CHECK (nilai_rating >= 1 AND nilai_rating <= 5),
  komentar TEXT,
  tanggal_rating TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security untuk semua tabel
ALTER TABLE public.calon_mitra ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mitras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.layanan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pesanan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.komplain ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rating ENABLE ROW LEVEL SECURITY;

-- Karena admin menggunakan localStorage, kita buat policy yang memungkinkan akses tanpa auth untuk admin
-- Policy untuk membaca semua data (admin dapat melihat semua)
CREATE POLICY "Admin can read all calon_mitra" ON public.calon_mitra FOR SELECT USING (true);
CREATE POLICY "Admin can insert calon_mitra" ON public.calon_mitra FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can update calon_mitra" ON public.calon_mitra FOR UPDATE USING (true);
CREATE POLICY "Admin can delete calon_mitra" ON public.calon_mitra FOR DELETE USING (true);

CREATE POLICY "Admin can read all mitras" ON public.mitras FOR SELECT USING (true);
CREATE POLICY "Admin can insert mitras" ON public.mitras FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can update mitras" ON public.mitras FOR UPDATE USING (true);
CREATE POLICY "Admin can delete mitras" ON public.mitras FOR DELETE USING (true);

CREATE POLICY "Admin can read all users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Admin can insert users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can update users" ON public.users FOR UPDATE USING (true);
CREATE POLICY "Admin can delete users" ON public.users FOR DELETE USING (true);

CREATE POLICY "Admin can read all layanan" ON public.layanan FOR SELECT USING (true);
CREATE POLICY "Admin can insert layanan" ON public.layanan FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can update layanan" ON public.layanan FOR UPDATE USING (true);
CREATE POLICY "Admin can delete layanan" ON public.layanan FOR DELETE USING (true);

CREATE POLICY "Admin can read all pesanan" ON public.pesanan FOR SELECT USING (true);
CREATE POLICY "Admin can insert pesanan" ON public.pesanan FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can update pesanan" ON public.pesanan FOR UPDATE USING (true);
CREATE POLICY "Admin can delete pesanan" ON public.pesanan FOR DELETE USING (true);

CREATE POLICY "Admin can read all komplain" ON public.komplain FOR SELECT USING (true);
CREATE POLICY "Admin can insert komplain" ON public.komplain FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can update komplain" ON public.komplain FOR UPDATE USING (true);
CREATE POLICY "Admin can delete komplain" ON public.komplain FOR DELETE USING (true);

CREATE POLICY "Admin can read all rating" ON public.rating FOR SELECT USING (true);
CREATE POLICY "Admin can insert rating" ON public.rating FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can update rating" ON public.rating FOR UPDATE USING (true);
CREATE POLICY "Admin can delete rating" ON public.rating FOR DELETE USING (true);
