
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { supabaseFetch } from '../../utils/supabaseConfig';
import { ArrowLeft, Shield, Users } from 'lucide-react';

interface Mitra {
  id: string;
  nama: string;
  email: string;
  nomor_hp: string;
  jenis_layanan: string;
  status: string;
  blokir: boolean;
  created_at: string;
}

interface BlokirMitraProps {
  onBack: () => void;
}

const BlokirMitra: React.FC<BlokirMitraProps> = ({ onBack }) => {
  const [mitras, setMitras] = useState<Mitra[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMitras();
  }, []);

  const fetchMitras = async () => {
    try {
      setLoading(true);
      const data = await supabaseFetch('mitras?select=*&order=created_at.desc');
      setMitras(data);
    } catch (error) {
      console.error('Error fetching mitras:', error);
      alert('Gagal memuat data mitra');
    } finally {
      setLoading(false);
    }
  };

  const toggleBlokir = async (mitraId: string, currentBlokir: boolean) => {
    try {
      await supabaseFetch(`mitras?id=eq.${mitraId}`, {
        method: 'PATCH',
        body: JSON.stringify({ blokir: !currentBlokir })
      });
      
      setMitras(prev => prev.map(mitra => 
        mitra.id === mitraId 
          ? { ...mitra, blokir: !currentBlokir }
          : mitra
      ));
      
      alert(currentBlokir ? 'Mitra berhasil dibuka blokirnya' : 'Mitra berhasil diblokir');
    } catch (error) {
      console.error('Error updating mitra:', error);
      alert('Gagal mengubah status blokir mitra');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Memuat data mitra...</p>
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
              <h1 className="text-2xl font-bold">Blokir/Buka Blokir Mitra</h1>
              <p className="text-muted-foreground">Kelola status blokir mitra</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {mitras.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum ada mitra</h3>
              <p className="text-muted-foreground">Belum ada mitra yang terdaftar.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {mitras.map((mitra) => (
              <Card key={mitra.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      {mitra.nama}
                    </div>
                    <Badge variant={mitra.blokir ? 'destructive' : 'default'}>
                      {mitra.blokir ? 'Diblokir' : 'Aktif'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p><span className="font-medium">Email:</span> {mitra.email}</p>
                      <p><span className="font-medium">HP:</span> {mitra.nomor_hp}</p>
                      <p><span className="font-medium">Layanan:</span> {mitra.jenis_layanan}</p>
                    </div>
                    <div className="flex items-center justify-end">
                      <Button
                        onClick={() => toggleBlokir(mitra.id, mitra.blokir)}
                        variant={mitra.blokir ? 'default' : 'destructive'}
                      >
                        {mitra.blokir ? 'Buka Blokir' : 'Blokir Mitra'}
                      </Button>
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

export default BlokirMitra;
