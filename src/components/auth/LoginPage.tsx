
import React, { useState, useEffect } from 'react';
import { adminAuth } from '../../utils/adminAuth';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Shield, Mail, Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Redirect jika sudah login
    if (adminAuth.isLoggedIn()) {
      onLogin();
    }
  }, [onLogin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validasi input
    if (!email || !password) {
      setError('Email dan password wajib diisi');
      setIsLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Konfirmasi password tidak sesuai');
      setIsLoading(false);
      return;
    }

    if (isLogin) {
      // Login
      const success = adminAuth.login(email, password);
      if (success) {
        onLogin();
      } else {
        setError('Email atau password salah');
      }
    } else {
      // Register
      const success = adminAuth.register(email, password);
      if (success) {
        setError('');
        setIsLogin(true);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        alert('Admin berhasil didaftarkan! Silakan login.');
      } else {
        setError('Email sudah terdaftar');
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            SmartCare Admin
          </CardTitle>
          <p className="text-muted-foreground">
            {isLogin ? 'Masuk ke Dashboard Admin' : 'Daftar Admin Baru'}
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@smartcare.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
              />
            </div>
            
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Konfirmasi Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Konfirmasi password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12"
                />
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : (isLogin ? 'Masuk' : 'Daftar')}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
              }}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {isLogin ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Masuk'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
