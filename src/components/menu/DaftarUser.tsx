
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { supabaseFetch } from '../../utils/supabaseConfig';
import { ArrowLeft, User, Mail, Phone, MapPin, DollarSign } from 'lucide-react';

interface User {
  id: string;
  nama: string;
  email: string;
  nomor_hp: string;
  alamat: string;
  saldo: number;
  created_at: string;
}

interface DaftarUserProps {
  onBack: () => void;
}

const DaftarUser: React.FC<DaftarUserProps> = ({ onBack }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await supabaseFetch('users?select=*&order=created_at.desc');
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Gagal memuat data user');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Memuat data user...</p>
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
              <h1 className="text-2xl font-bold">Daftar User</h1>
              <p className="text-muted-foreground">
                Total {users.length} user terdaftar
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4">
        {users.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum ada user</h3>
              <p className="text-muted-foreground">
                Belum ada user yang terdaftar dalam sistem.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {users.map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {user.nama}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Bergabung: {new Date(user.created_at).toLocaleDateString('id-ID')}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">Email:</span>
                        <span className="text-sm">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">HP:</span>
                        <span className="text-sm">{user.nomor_hp}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-orange-600 mt-0.5" />
                        <span className="text-sm font-medium">Alamat:</span>
                        <span className="text-sm">{user.alamat}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium">Saldo:</span>
                        <span className="text-sm font-bold text-green-600">
                          Rp {user.saldo?.toLocaleString('id-ID') || '0'}
                        </span>
                      </div>
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

export default DaftarUser;
