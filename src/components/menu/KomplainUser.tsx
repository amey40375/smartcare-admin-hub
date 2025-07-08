
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { supabaseFetch } from '../../utils/supabaseConfig';
import { ArrowLeft, MessageSquare } from 'lucide-react';

interface Komplain {
  id: string;
  user_id: string;
  mitra_id: string;
  pesanan_id: string;
  isi_komplain: string;
  status: string;
  tanggal_komplain: string;
}

interface KomplainUserProps {
  onBack: () => void;
}

const KomplainUser: React.FC<KomplainUserProps> = ({ onBack }) => {
  const [komplain, setKomplain] = useState<Komplain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKomplain();
  }, []);

  const fetchKomplain = async () => {
    try {
      setLoading(true);
      const data = await supabaseFetch('komplain?select=*&order=tanggal_komplain.desc');
      setKomplain(data);
    } catch (error) {
      console.error('Error fetching komplain:', error);
      alert('Gagal memuat data komplain');
    } finally {
      setLoading(false);
    }
  };

  const updateStatusKomplain = async (komplainId: string, newStatus: string) => {
    try {
      await supabaseFetch(`komplain?id=eq.${komplainId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });

      setKomplain(prev => prev.map(item => 
        item.id === komplainId 
          ? { ...item, status: newStatus }
          : item
      ));

      alert('Status komplain berhasil diperbarui');
    } catch (error) {
      console.error('Error updating komplain:', error);
      alert('Gagal memperbarui status komplain');
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'diproses':
        return 'default';
      case 'selesai':
        return 'default';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Memuat data komplain...</p>
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
              <h1 className="text-2xl font-bold">Keluhan/Komplain User</h1>
              <p className="text-muted-foreground">
                {komplain.length} komplain terdaftar
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {komplain.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum ada komplain</h3>
              <p className="text-muted-foreground">Semua user puas dengan layanan.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {komplain.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Komplain #{item.id.slice(0, 8)}
                    </div>
                    <Badge variant={getBadgeVariant(item.status)}>
                      {item.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p><span className="font-medium">User ID:</span> {item.user_id?.slice(0, 8) || 'N/A'}</p>
                        <p><span className="font-medium">Mitra ID:</span> {item.mitra_id?.slice(0, 8) || 'N/A'}</p>
                        <p><span className="font-medium">Pesanan ID:</span> {item.pesanan_id?.slice(0, 8) || 'N/A'}</p>
                      </div>
                      <div className="space-y-2">
                        <p><span className="font-medium">Tanggal:</span> {new Date(item.tanggal_komplain).toLocaleDateString('id-ID')}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-2">Isi Komplain:</p>
                      <p className="text-sm bg-gray-50 p-3 rounded-lg">{item.isi_komplain}</p>
                    </div>

                    {item.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => updateStatusKomplain(item.id, 'diproses')}
                        >
                          Proses
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateStatusKomplain(item.id, 'selesai')}
                        >
                          Selesai
                        </Button>
                      </div>
                    )}
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

export default KomplainUser;
