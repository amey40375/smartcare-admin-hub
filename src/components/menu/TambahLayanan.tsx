
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { supabaseFetch } from '../../utils/supabaseConfig';
import { ArrowLeft, Plus } from 'lucide-react';

interface TambahLayananProps {
  onBack: () => void;
}

const TambahLayanan: React.FC<TambahLayananProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    nama_layanan: '',
    deskripsi: '',
    tarif: '',
    kategori: ''
  });
  const [loading, setLoading] = useState(false);

  const kategoriOptions = [
    'Kebersihan',
    'Perawatan',
    'Perbaikan',
    'Instalasi',
    'Konsultasi',
    'Lainnya'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleKategoriChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      kategori: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nama_layanan || !formData.tarif) {
      alert('Nama layanan dan tarif wajib diisi');
      return;
    }

    setLoading(true);

    try {
      await supabaseFetch('layanan', {
        method: 'POST',
        body: JSON.stringify({
          nama_layanan: formData.nama_layanan,
          deskripsi: formData.deskripsi,
          tarif: parseFloat(formData.tarif),
          kategori: formData.kategori,
          aktif: true
        })
      });

      alert('Layanan berhasil ditambahkan');
      setFormData({
        nama_layanan: '',
        deskripsi: '',
        tarif: '',
        kategori: ''
      });
    } catch (error) {
      console.error('Error adding layanan:', error);
      alert('Gagal menambahkan layanan');
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
              <h1 className="text-2xl font-bold">Tambah Layanan Baru</h1>
              <p className="text-muted-foreground">Tambahkan layanan baru ke sistem</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Form Tambah Layanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nama_layanan">Nama Layanan *</Label>
                <Input
                  id="nama_layanan"
                  name="nama_layanan"
                  value={formData.nama_layanan}
                  onChange={handleInputChange}
                  placeholder="Contoh: Pembersihan AC"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi Layanan</Label>
                <Textarea
                  id="deskripsi"
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  placeholder="Deskripsi detail layanan..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tarif">Tarif (Rp) *</Label>
                <Input
                  id="tarif"
                  name="tarif"
                  type="number"
                  value={formData.tarif}
                  onChange={handleInputChange}
                  placeholder="50000"
                  min="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kategori">Kategori</Label>
                <Select onValueChange={handleKategoriChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {kategoriOptions.map((kategori) => (
                      <SelectItem key={kategori} value={kategori}>
                        {kategori}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Menambahkan...' : 'Tambah Layanan'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TambahLayanan;
