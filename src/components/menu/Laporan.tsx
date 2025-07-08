
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { supabaseFetch } from '../../utils/supabaseConfig';
import { ArrowLeft, BarChart3, Users, DollarSign, ClipboardList } from 'lucide-react';

interface LaporanProps {
  onBack: () => void;
}

const Laporan: React.FC<LaporanProps> = ({ onBack }) => {
  const [stats, setStats] = useState({
    totalUser: 0,
    totalMitra: 0,
    totalPesanan: 0,
    totalPendapatan: 0,
    pesananSelesai: 0,
    pesananPending: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch semua data secara paralel
      const [users, mitras, pesanan] = await Promise.all([
        supabaseFetch('users?select=count'),
        supabaseFetch('mitras?select=count'),
        supabaseFetch('pesanan?select=*')
      ]);

      const totalPendapatan = pesanan.reduce((sum: number, p: any) => 
        sum + (p.total_bayar || 0), 0
      );

      const pesananSelesai = pesanan.filter((p: any) => p.status === 'selesai').length;
      const pesananPending = pesanan.filter((p: any) => p.status === 'pending').length;

      setStats({
        totalUser: users.length,
        totalMitra: mitras.length,
        totalPesanan: pesanan.length,
        totalPendapatan,
        pesananSelesai,
        pesananPending
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      alert('Gagal memuat data laporan');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Memuat laporan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Laporan & Analytics</h1>
              <p className="text-muted-foreground">Ringkasan data sistem SmartCare</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total User</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUser}</div>
              <p className="text-xs opacity-70">User terdaftar</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Mitra</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMitra}</div>
              <p className="text-xs opacity-70">Mitra aktif</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
              <ClipboardList className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPesanan}</div>
              <p className="text-xs opacity-70">Semua pesanan</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rp {stats.totalPendapatan.toLocaleString('id-ID')}
              </div>
              <p className="text-xs opacity-70">Semua transaksi</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pesanan Selesai</CardTitle>
              <BarChart3 className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pesananSelesai}</div>
              <p className="text-xs opacity-70">Transaksi selesai</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pesanan Pending</CardTitle>
              <BarChart3 className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pesananPending}</div>
              <p className="text-xs opacity-70">Menunggu proses</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Ringkasan Sistem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Status Pesanan</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Selesai:</span>
                    <span className="font-medium text-green-600">{stats.pesananSelesai}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending:</span>
                    <span className="font-medium text-yellow-600">{stats.pesananPending}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-bold">{stats.totalPesanan}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Aktivitas Sistem</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tingkat penyelesaian:</span>
                    <span className="font-medium">
                      {stats.totalPesanan > 0 
                        ? Math.round((stats.pesananSelesai / stats.totalPesanan) * 100)
                        : 0
                      }%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rata-rata per mitra:</span>
                    <span className="font-medium">
                      {stats.totalMitra > 0 
                        ? Math.round(stats.pesananSelesai / stats.totalMitra)
                        : 0
                      } pesanan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Laporan;
