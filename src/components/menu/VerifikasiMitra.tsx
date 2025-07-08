
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { supabaseFetch } from '../../utils/supabaseConfig';
import { ArrowLeft, Check, X, User, Mail, Phone, CreditCard, FileText } from 'lucide-react';

interface CalonMitra {
  id: string;
  nama: string;
  email: string;
  nomor_hp: string;
  ktp: string;
  kk: string;
  alamat: string;
  jenis_layanan: string;
  created_at: string;
}

interface VerifikasiMitraProps {
  onBack: () => void;
}

const VerifikasiMitra: React.FC<VerifikasiMitraProps> = ({ onBack }) => {
  const [calonMitra, setCalonMitra] = useState<CalonMitra[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState<string | null>(null);

  useEffect(() => {
    fetchCalonMitra();
  }, []);

  const fetchCalonMitra = async () => {
    try {
      setLoading(true);
      const data = await supabaseFetch('calon_mitra?select=*&order=created_at.desc');
      setCalonMitra(data);
    } catch (error) {
      console.error('Error fetching calon mitra:', error);
      alert('Gagal memuat data calon mitra');
    } finally {
      setLoading(false);
    }
  };

  const verifikasiMitra = async (mitra: CalonMitra) => {
    if (!confirm(`Yakin ingin memverifikasi ${mitra.nama}?`)) return;
    
    try {
      setVerifying(mitra.id);
      
      // Pindahkan ke tabel mitras
      await supabaseFetch('mitras', {
        method: 'POST',
        body: JSON.stringify({
          nama: mitra.nama,
          email: mitra.email,
          nomor_hp: mitra.nomor_hp,
          ktp: mitra.ktp,
          kk: mitra.kk,
          alamat: mitra.alamat,
          jenis_layanan: mitra.jenis_layanan,
          status: 'aktif',
          saldo: 0,
          blokir: false
        }),
      });

      // Hapus dari calon_mitra
      await supabaseFetch(`calon_mitra?id=eq.${mitra.id}`, {
        method: 'DELETE',
      });

      alert(`${mitra.nama} berhasil diverifikasi dan dipindahkan ke mitra aktif!`);
      fetchCalonMitra();
    } catch (error) {
      console.error('Error verifying mitra:', error);
      alert('Gagal memverifikasi mitra');
    } finally {
      setVerifying(null);
    }
  };

  const tolakMitra = async (mitra: CalonMitra) => {
    if (!confirm(`Yakin ingin menolak ${mitra.nama}? Data akan dihapus.`)) return;
    
    try {
      await supabaseFetch(`calon_mitra?id=eq.${mitra.id}`, {
        method: 'DELETE',
      });
      
      alert(`${mitra.nama} berhasil ditolak dan dihapus.`);
      fetchCalonMitra();
    } catch (error) {
      console.error('Error rejecting mitra:', error);
      alert('Gagal menolak mitra');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Memuat data calon mitra...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Verifikasi Calon Mitra</h1>
              <p className="text-muted-foreground">
                {calonMitra.length} calon mitra menunggu verifikasi
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4">
        {calonMitra.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Tidak ada calon mitra</h3>
              <p className="text-muted-foreground">
                Semua calon mitra sudah diverifikasi atau belum ada yang mendaftar.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {calonMitra.map((mitra) => (
              <Card key={mitra.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {mitra.nama}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Mendaftar: {new Date(mitra.created_at).toLocaleDateString('id-ID')}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">Email:</span>
                        <span className="text-sm">{mitra.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">HP:</span>
                        <span className="text-sm">{mitra.nomor_hp}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium">KTP:</span>
                        <span className="text-sm">{mitra.ktp}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium">KK:</span>
                        <span className="text-sm">{mitra.kk}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-medium">Alamat:</span>
                        <span className="text-sm">{mitra.alamat}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Layanan:</span>
                        <span className="text-sm">{mitra.jenis_layanan}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={() => verifikasiMitra(mitra)}
                      disabled={verifying === mitra.id}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      {verifying === mitra.id ? 'Memverifikasi...' : 'Verifikasi'}
                    </Button>
                    <Button
                      onClick={() => tolakMitra(mitra)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Tolak
                    </Button>
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

export default VerifikasiMitra;
