
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { supabaseFetch } from '../../utils/supabaseConfig';
import { ArrowLeft, ClipboardList } from 'lucide-react';

interface Pesanan {
  id: string;
  user_id: string;
  mitra_id: string;
  layanan_id: string;
  status: string;
  total_bayar: number;
  alamat_pesanan: string;
  catatan: string;
  tanggal_pesanan: string;
  tanggal_selesai: string;
}

interface RiwayatPesananProps {
  onBack: () => void;
}

const RiwayatPesanan: React.FC<RiwayatPesananProps> = ({ onBack }) => {
  const [pesanan, setPesanan] = useState<Pesanan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPesanan();
  }, []);

  const fetchPesanan = async () => {
    try {
      setLoading(true);
      const data = await supabaseFetch('pesanan?status=in.(selesai,dibatalkan)&select=*&order=tanggal_pesanan.desc');
      setPesanan(data);
    } catch (error) {
      console.error('Error fetching pesanan:', error);
      alert('Gagal memuat riwayat pesanan');
    } finally {
      setLoading(false);
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'selesai':
        return 'default';
      case 'dibatalkan':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Memuat riwayat pesanan...</p>
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
              <h1 className="text-2xl font-bold">Riwayat Pesanan</h1>
              <p className="text-muted-foreground">
                {pesanan.length} pesanan selesai/dibatalkan
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {pesanan.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <ClipboardList className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum ada riwayat</h3>
              <p className="text-muted-foreground">Riwayat pesanan akan muncul di sini.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {pesanan.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="w-5 h-5" />
                      Pesanan #{item.id.slice(0, 8)}
                    </div>
                    <Badge variant={getBadgeVariant(item.status)}>
                      {item.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p><span className="font-medium">User ID:</span> {item.user_id?.slice(0, 8) || 'N/A'}</p>
                      <p><span className="font-medium">Mitra ID:</span> {item.mitra_id?.slice(0, 8) || 'N/A'}</p>
                      <p><span className="font-medium">Layanan ID:</span> {item.layanan_id?.slice(0, 8) || 'N/A'}</p>
                      <p><span className="font-medium">Alamat:</span> {item.alamat_pesanan || 'Tidak ada alamat'}</p>
                    </div>
                    <div className="space-y-2">
                      <p><span className="font-medium">Total Bayar:</span> 
                        <span className="font-bold text-green-600 ml-1">
                          Rp {item.total_bayar?.toLocaleString('id-ID') || '0'}
                        </span>
                      </p>
                      <p><span className="font-medium">Tanggal Pesanan:</span> {new Date(item.tanggal_pesanan).toLocaleDateString('id-ID')}</p>
                      {item.tanggal_selesai && (
                        <p><span className="font-medium">Tanggal Selesai:</span> {new Date(item.tanggal_selesai).toLocaleDateString('id-ID')}</p>
                      )}
                      {item.catatan && (
                        <p><span className="font-medium">Catatan:</span> {item.catatan}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RiwayatPesanan;
