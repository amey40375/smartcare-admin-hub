
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { supabaseFetch } from '../../utils/supabaseConfig';
import { ArrowLeft, ClipboardList, DollarSign } from 'lucide-react';

interface Layanan {
  id: string;
  nama_layanan: string;
  deskripsi: string;
  tarif: number;
  kategori: string;
  aktif: boolean;
  created_at: string;
}

interface DaftarLayananProps {
  onBack: () => void;
}

const DaftarLayanan: React.FC<DaftarLayananProps> = ({ onBack }) => {
  const [layanan, setLayanan] = useState<Layanan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLayanan();
  }, []);

  const fetchLayanan = async () => {
    try {
      setLoading(true);
      const data = await supabaseFetch('layanan?select=*&order=created_at.desc');
      setLayanan(data);
    } catch (error) {
      console.error('Error fetching layanan:', error);
      alert('Gagal memuat data layanan');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Memuat data layanan...</p>
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
              <h1 className="text-2xl font-bold">Daftar Layanan Aktif</h1>
              <p className="text-muted-foreground">
                Total {layanan.length} layanan terdaftar
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {layanan.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <ClipboardList className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum ada layanan</h3>
              <p className="text-muted-foreground">Belum ada layanan yang terdaftar.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {layanan.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg">{item.nama_layanan}</span>
                    <Badge variant={item.aktif ? 'default' : 'secondary'}>
                      {item.aktif ? 'Aktif' : 'Nonaktif'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {item.deskripsi || 'Tidak ada deskripsi'}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-bold text-green-600">
                        Rp {item.tarif?.toLocaleString('id-ID') || '0'}
                      </span>
                    </div>
                    
                    {item.kategori && (
                      <div className="pt-2">
                        <Badge variant="outline">{item.kategori}</Badge>
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      Dibuat: {new Date(item.created_at).toLocaleDateString('id-ID')}
                    </p>
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

export default DaftarLayanan;
