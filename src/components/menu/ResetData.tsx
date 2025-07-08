
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { supabaseFetch } from '../../utils/supabaseConfig';
import { ArrowLeft, Trash2, AlertTriangle } from 'lucide-react';

interface ResetDataProps {
  onBack: () => void;
}

const ResetData: React.FC<ResetDataProps> = ({ onBack }) => {
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (confirmText !== 'RESET SEMUA DATA') {
      alert('Konfirmasi tidak sesuai. Ketik: RESET SEMUA DATA');
      return;
    }

    if (!confirm('PERINGATAN! Tindakan ini akan menghapus SEMUA data dari sistem dan tidak dapat dibatalkan. Yakin ingin melanjutkan?')) {
      return;
    }

    setLoading(true);

    try {
      // Reset data secara berurutan (karena ada foreign key constraints)
      await supabaseFetch('rating', { method: 'DELETE' });
      await supabaseFetch('komplain', { method: 'DELETE' });
      await supabaseFetch('pesanan', { method: 'DELETE' });
      await supabaseFetch('layanan', { method: 'DELETE' });
      await supabaseFetch('mitras', { method: 'DELETE' });
      await supabaseFetch('calon_mitra', { method: 'DELETE' });
      await supabaseFetch('users', { method: 'DELETE' });

      alert('Semua data berhasil dihapus dari sistem');
      setConfirmText('');
    } catch (error) {
      console.error('Error resetting data:', error);
      alert('Gagal mereset data. Periksa console untuk detail error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-red-600">Reset Semua Data</h1>
              <p className="text-muted-foreground">Hapus semua data dari sistem (HATI-HATI!)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        <Card className="border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              PERINGATAN KERAS!
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">Tindakan ini akan menghapus:</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Semua data user dan mitra</li>
                  <li>• Semua pesanan dan transaksi</li>
                  <li>• Semua layanan dan tarif</li>
                  <li>• Semua rating dan komplain</li>
                  <li>• Semua calon mitra yang belum diverifikasi</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 font-medium">
                  ⚠️ Data yang sudah dihapus TIDAK DAPAT dikembalikan lagi!
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm">
                  Ketik <code className="bg-gray-100 px-2 py-1 rounded">RESET SEMUA DATA</code> untuk konfirmasi:
                </Label>
                <Input
                  id="confirm"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="RESET SEMUA DATA"
                  className="font-mono"
                />
              </div>

              <Button
                onClick={handleReset}
                disabled={loading || confirmText !== 'RESET SEMUA DATA'}
                variant="destructive"
                className="w-full"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Menghapus data...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    RESET SEMUA DATA
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetData;
