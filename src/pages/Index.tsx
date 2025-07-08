
import React, { useState, useEffect } from 'react';
import LoginPage from '../components/auth/LoginPage';
import Dashboard from '../components/dashboard/Dashboard';
import VerifikasiMitra from '../components/menu/VerifikasiMitra';
import DaftarMitra from '../components/menu/DaftarMitra';
import DaftarUser from '../components/menu/DaftarUser';
import BlokirMitra from '../components/menu/BlokirMitra';
import PengaturanAdmin from '../components/menu/PengaturanAdmin';
import DaftarLayanan from '../components/menu/DaftarLayanan';
import TambahLayanan from '../components/menu/TambahLayanan';
import KelolaTarif from '../components/menu/KelolaTarif';
import PesananMasuk from '../components/menu/PesananMasuk';
import RiwayatPesanan from '../components/menu/RiwayatPesanan';
import KomplainUser from '../components/menu/KomplainUser';
import Laporan from '../components/menu/Laporan';
import RatingMitra from '../components/menu/RatingMitra';
import ResetData from '../components/menu/ResetData';
import { adminAuth } from '../utils/adminAuth';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('dashboard');

  useEffect(() => {
    setIsLoggedIn(adminAuth.isLoggedIn());
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentMenu('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentMenu('dashboard');
  };

  const handleMenuSelect = (menu: string) => {
    setCurrentMenu(menu);
  };

  const handleBackToDashboard = () => {
    setCurrentMenu('dashboard');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Render menu yang dipilih
  switch (currentMenu) {
    case 'verifikasi-mitra':
      return <VerifikasiMitra onBack={handleBackToDashboard} />;
    case 'daftar-mitra':
      return <DaftarMitra onBack={handleBackToDashboard} />;
    case 'daftar-user':
      return <DaftarUser onBack={handleBackToDashboard} />;
    case 'blokir-mitra':
      return <BlokirMitra onBack={handleBackToDashboard} />;
    case 'pengaturan-admin':
      return <PengaturanAdmin onBack={handleBackToDashboard} />;
    case 'daftar-layanan':
      return <DaftarLayanan onBack={handleBackToDashboard} />;
    case 'tambah-layanan':
      return <TambahLayanan onBack={handleBackToDashboard} />;
    case 'kelola-tarif':
      return <KelolaTarif onBack={handleBackToDashboard} />;
    case 'pesanan-masuk':
      return <PesananMasuk onBack={handleBackToDashboard} />;
    case 'riwayat-pesanan':
      return <RiwayatPesanan onBack={handleBackToDashboard} />;
    case 'komplain-user':
      return <KomplainUser onBack={handleBackToDashboard} />;
    case 'laporan':
      return <Laporan onBack={handleBackToDashboard} />;
    case 'rating-mitra':
      return <RatingMitra onBack={handleBackToDashboard} />;
    case 'reset-data':
      return <ResetData onBack={handleBackToDashboard} />;
    default:
      return (
        <Dashboard
          onMenuSelect={handleMenuSelect}
          onLogout={handleLogout}
        />
      );
  }
};

export default Index;
