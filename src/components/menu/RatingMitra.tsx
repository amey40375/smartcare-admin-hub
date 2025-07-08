
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { supabaseFetch } from '../../utils/supabaseConfig';
import { ArrowLeft, Star } from 'lucide-react';

interface Rating {
  id: string;
  user_id: string;
  mitra_id: string;
  pesanan_id: string;
  nilai_rating: number;
  komentar: string;
  tanggal_rating: string;
}

interface RatingMitraProps {
  onBack: () => void;
}

const RatingMitra: React.FC<RatingMitraProps> = ({ onBack }) => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const data = await supabaseFetch('rating?select=*&order=tanggal_rating.desc');
      setRatings(data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
      alert('Gagal memuat data rating');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getAverageRating = () => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, r) => sum + r.nilai_rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Memuat data rating...</p>
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
              <h1 className="text-2xl font-bold">Data Rating Mitra</h1>
              <p className="text-muted-foreground">
                {ratings.length} rating dari user
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Summary Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Ringkasan Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">{getAverageRating()}</div>
                <div className="flex justify-center mt-1">
                  {renderStars(Math.round(parseFloat(getAverageRating())))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Rating rata-rata</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{ratings.length}</div>
                <p className="text-sm text-muted-foreground">Total rating</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {ratings.filter(r => r.nilai_rating >= 4).length}
                </div>
                <p className="text-sm text-muted-foreground">Rating positif (4-5★)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ratings List */}
        {ratings.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Star className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum ada rating</h3>
              <p className="text-muted-foreground">Rating akan muncul setelah user memberikan penilaian.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {ratings.map((rating) => (
              <Card key={rating.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      Rating #{rating.id.slice(0, 8)}
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(rating.nilai_rating)}
                      <span className="ml-2 font-bold">{rating.nilai_rating}/5</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p><span className="font-medium">User ID:</span> {rating.user_id?.slice(0, 8) || 'N/A'}</p>
                      <p><span className="font-medium">Mitra ID:</span> {rating.mitra_id?.slice(0, 8) || 'N/A'}</p>
                      <p><span className="font-medium">Pesanan ID:</span> {rating.pesanan_id?.slice(0, 8) || 'N/A'}</p>
                      <p><span className="font-medium">Tanggal:</span> {new Date(rating.tanggal_rating).toLocaleDateString('id-ID')}</p>
                    </div>
                    <div>
                      {rating.komentar && (
                        <div>
                          <p className="font-medium mb-2">Komentar:</p>
                          <p className="text-sm bg-gray-50 p-3 rounded-lg">{rating.komentar}</p>
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

export default RatingMitra;
