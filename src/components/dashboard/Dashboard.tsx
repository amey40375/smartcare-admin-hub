
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { adminAuth } from '../../utils/adminAuth';
import {
  Users, UserCheck, Shield, Settings, DollarSign, 
  ClipboardList, MessageSquare, BarChart3, Star,
  Trash2, LogOut, Plus, Edit, AlertCircle
} from 'lucide-react';

interface DashboardProps {
  onMenuSelect: (menu: string) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onMenuSelect, onLogout }) => {
  const currentAdmin = adminAuth.getCurrentAdmin();

  const menuItems = [
    {
      id: 'verifikasi-mitra',
      title: 'Verifikasi Calon Mitra',
      description: 'Verifikasi data calon mitra',
      icon: UserCheck,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'daftar-mitra',
      title: 'Daftar Mitra Aktif',
      description: 'Kelola mitra aktif',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'daftar-user',
      title: 'Daftar User',
      description: 'Kelola data user',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'blokir-mitra',
      title: 'Blokir/Buka Blokir Mitra',
      description: 'Kelola status mitra',
      icon: Shield,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'pengaturan-admin',
      title: 'Pengaturan Akun Admin',
      description: 'Update profil admin',
      icon: Settings,
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'daftar-layanan',
      title: 'Daftar Layanan Aktif',
      description: 'Lihat semua layanan',
      icon: ClipboardList,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'tambah-layanan',
      title: 'Tambah Layanan Baru',
      description: 'Tambah layanan baru',
      icon: Plus,
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 'kelola-tarif',
      title: 'Kelola Tarif Layanan',
      description: 'Update harga layanan',
      icon: Edit,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'pesanan-masuk',
      title: 'Pesanan Masuk',
      description: 'Pesanan status pending',
      icon: AlertCircle,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'riwayat-pesanan',
      title: 'Riwayat Pesanan',
      description: 'Pesanan selesai/dibatalkan',
      icon: ClipboardList,
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'komplain-user',
      title: 'Keluhan/Komplain User',
      description: 'Kelola komplain user',
      icon: MessageSquare,
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'laporan',
      title: 'Laporan Harian/Bulanan',
      description: 'Analisa transaksi',
      icon: BarChart3,
      color: 'from-violet-500 to-violet-600'
    },
    {
      id: 'rating-mitra',
      title: 'Data Rating Mitra',
      description: 'Rating dan review mitra',
      icon: Star,
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 'reset-data',
      title: 'Reset Semua Data',
      description: 'Hapus semua data (Hati-hati!)',
      icon: Trash2,
      color: 'from-red-600 to-red-700'
    },
  ];

  const handleLogout = () => {
    if (confirm('Yakin ingin logout?')) {
      adminAuth.logout();
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                SmartCare Admin Dashboard
              </h1>
              <p className="text-muted-foreground text-sm">
                Welcome, {currentAdmin?.email}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur"
                onClick={() => onMenuSelect(item.id)}
              >
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center mb-3`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold line-clamp-2">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
