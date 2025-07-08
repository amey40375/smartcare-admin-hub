
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { adminAuth } from '../../utils/adminAuth';
import {
  Users, UserCheck, Shield, Settings, DollarSign, 
  ClipboardList, MessageSquare, BarChart3, Star,
  Trash2, LogOut, Plus, Edit, AlertCircle, Sparkles
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
      description: 'Verifikasi data calon mitra baru',
      icon: UserCheck,
      color: 'from-blue-500 via-blue-600 to-cyan-600',
      stats: 'Pending'
    },
    {
      id: 'daftar-mitra',
      title: 'Daftar Mitra Aktif',
      description: 'Kelola mitra yang sudah aktif',
      icon: Users,
      color: 'from-emerald-500 via-green-600 to-teal-600',
      stats: 'Active'
    },
    {
      id: 'daftar-user',
      title: 'Daftar User',
      description: 'Kelola data pengguna aplikasi',
      icon: Users,
      color: 'from-purple-500 via-violet-600 to-indigo-600',
      stats: 'Registered'
    },
    {
      id: 'blokir-mitra',
      title: 'Blokir/Buka Blokir',
      description: 'Kelola status akses mitra',
      icon: Shield,
      color: 'from-red-500 via-rose-600 to-pink-600',
      stats: 'Blocked'
    },
    {
      id: 'pengaturan-admin',
      title: 'Pengaturan Admin',
      description: 'Update profil dan akun admin',
      icon: Settings,
      color: 'from-gray-500 via-slate-600 to-zinc-600',
      stats: 'Profile'
    },
    {
      id: 'daftar-layanan',
      title: 'Daftar Layanan',
      description: 'Lihat semua layanan tersedia',
      icon: ClipboardList,
      color: 'from-indigo-500 via-blue-600 to-purple-600',
      stats: 'Services'
    },
    {
      id: 'tambah-layanan',
      title: 'Tambah Layanan',
      description: 'Buat layanan baru untuk mitra',
      icon: Plus,
      color: 'from-cyan-500 via-teal-600 to-blue-600',
      stats: 'New'
    },
    {
      id: 'kelola-tarif',
      title: 'Kelola Tarif',
      description: 'Update harga dan tarif layanan',
      icon: Edit,
      color: 'from-orange-500 via-amber-600 to-yellow-600',
      stats: 'Pricing'
    },
    {
      id: 'pesanan-masuk',
      title: 'Pesanan Masuk',
      description: 'Monitor pesanan baru masuk',
      icon: AlertCircle,
      color: 'from-yellow-500 via-orange-600 to-red-600',
      stats: 'Incoming'
    },
    {
      id: 'riwayat-pesanan',
      title: 'Riwayat Pesanan',
      description: 'Lihat semua riwayat transaksi',
      icon: ClipboardList,
      color: 'from-teal-500 via-cyan-600 to-blue-600',
      stats: 'History'
    },
    {
      id: 'komplain-user',
      title: 'Keluhan User',
      description: 'Tangani komplain dan feedback',
      icon: MessageSquare,
      color: 'from-pink-500 via-rose-600 to-red-600',
      stats: 'Support'
    },
    {
      id: 'laporan',
      title: 'Laporan & Analytics',
      description: 'Analisa performa dan statistik',
      icon: BarChart3,
      color: 'from-violet-500 via-purple-600 to-indigo-600',
      stats: 'Reports'
    },
    {
      id: 'rating-mitra',
      title: 'Rating Mitra',
      description: 'Monitor rating dan review mitra',
      icon: Star,
      color: 'from-amber-500 via-yellow-600 to-orange-600',
      stats: 'Reviews'
    },
    {
      id: 'reset-data',
      title: 'Reset Data',
      description: 'Hapus semua data (Hati-hati!)',
      icon: Trash2,
      color: 'from-red-600 via-red-700 to-rose-700',
      stats: 'Danger'
    },
  ];

  const handleLogout = () => {
    if (confirm('Yakin ingin logout?')) {
      adminAuth.logout();
      onLogout();
    }
  };

  return (
    <div className="min-h-screen">
      {/* Professional Header with Glass Effect */}
      <div className="glass-card border-0 border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold gradient-text">
                    SmartCare Admin
                  </h1>
                  <p className="text-muted-foreground font-medium">
                    Professional Dashboard System
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">
                  Welcome back, <span className="font-semibold text-foreground">{currentAdmin?.email}</span>
                </span>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Professional Menu Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Management Dashboard</h2>
          <p className="text-muted-foreground">Kelola semua aspek aplikasi SmartCare dengan mudah</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={item.id}
                className="group cursor-pointer glass-card hover-lift hover-glow border-0 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => onMenuSelect(item.id)}
              >
                <CardHeader className="pb-4 relative">
                  {/* Background Gradient Decoration */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </CardTitle>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${item.color} text-white`}>
                        {item.stats}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 relative z-10">
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Hover Arrow Indicator */}
                  <div className="mt-4 flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    <span>Klik untuk masuk</span>
                    <div className="ml-2 w-4 h-4 rounded-full bg-current/10 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                      <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Professional Footer Stats */}
        <div className="mt-12 glass-card rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">14</div>
              <div className="text-sm text-muted-foreground">Menu Tersedia</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">100%</div>
              <div className="text-sm text-muted-foreground">Database Connected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">24/7</div>
              <div className="text-sm text-muted-foreground">System Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">Pro</div>
              <div className="text-sm text-muted-foreground">Admin Dashboard</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
