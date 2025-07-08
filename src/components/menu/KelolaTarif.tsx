
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { supabaseFetch } from '../../utils/supabaseConfig';
import { ArrowLeft, Edit, DollarSign } from 'lucide-react';

interface Layanan {
  id: string;
  nama_layanan: string;
  deskripsi: string;
  tarif: number;
  kategori: string;
  aktif: boolean;
}

interface KelolaTarifProps {
  onBack: () => void;
}

const KelolaTarif: React.FC<KelolaTarifProps> = ({ onBack }) => {
  const [layanan, setLayanan] = useState<Layanan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTarif, setNewTarif] = useState<string>('');

  useEffect(() => {
    fetchLayanan();
  }, []);

  const fetchLayanan = async () => {
    try {
      setLoading(true);
      const data = await supabaseFetch('layanan?select=*&order=nama_layanan.asc');
      setLayanan(data);
    } catch (error) {
      console.error('Error fetching layanan:', error);
      alert('Gagal memuat data layanan');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (layanan: Layanan) => {
    setEditingId(layanan.id);
    setNewTarif(layanan.tarif.toString());
  };

  const handleSave = async (layananId: string) => {
    if (!newTarif || parseFloat(newTarif) <= 0) {
      alert('Tarif harus diisi dengan nilai yang valid');
      return;
    }

    try {
      await supabaseFetch(`layanan?id=eq.${layananId}`, {
        method: 'PATCH',
        body: JSON.stringify({ tarif: parseFloat(newTarif) })
      });

      setLayanan(prev => prev.map(item => 
        item.id === layananId 
          ? { ...item, tarif: parseFloat(newTarif) }
          : item
      ));

      setEditingId(null);
      setNewTarif('');
      alert('Tarif berhasil diperbarui');
    } catch (error) {
      console.error('Error updating tarif:', error);
      alert('Gagal memperbarui tarif');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setNewTarif('');
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
              <h1 className="text-2xl font-bold">Kelola Tarif Layanan</h1>
              <p className="text-muted-foreground">Update harga layanan</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {layanan.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <DollarSign className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum ada layanan</h3>
              <p className="text-muted-foreground">Tambahkan layanan terlebih dahulu.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {layanan.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{item.nama_layanan}</span>
                    <Badge variant={item.aktif ? 'default' : 'secondary'}>
                      {item.aktif ? 'Aktif' : 'Nonaktif'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {item.deskripsi || 'Tidak ada deskripsi'}
                      </p>
                      {item.kategori && (
                        <Badge variant="outline">{item.kategori}</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      {editingId === item.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            type="number"
                            value={newTarif}
                            onChange={(e) => setNewTarif(e.target.value)}
                            placeholder="Tarif baru"
                            min="0"
                            className="w-32"
                          />
                          <Button 
                            size="sm" 
                            onClick={() => handleSave(item.id)}
                          >
                            Simpan
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={handleCancel}
                          >
                            Batal
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between flex-1">
                          <span className="font-bold text-green-600">
                            Rp {item.tarif?.toLocaleString('id-ID') || '0'}
                          </span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>
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

export default KelolaTarif;
