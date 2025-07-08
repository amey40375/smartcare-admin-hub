import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { adminAuth } from '../../utils/adminAuth';
import { Eye, EyeOff, Shield, Sparkles, Lock, Mail } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await adminAuth.login(email, password);
      if (success) {
        onLogin();
      } else {
        setError('Email atau password salah');
      }
    } catch (error) {
      setError('Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>

      {/* Professional Login Card */}
      <Card className="w-full max-w-md glass-card border-0 shadow-2xl animate-fade-in relative z-10">
        <CardHeader className="text-center pb-6">
          {/* Professional Logo */}
          <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-6 shadow-xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold gradient-text flex items-center justify-center gap-2">
              SmartCare Admin
              <Sparkles className="w-6 h-6 text-blue-500" />
            </CardTitle>
            <p className="text-muted-foreground font-medium">
              Professional Dashboard System
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"></div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Professional Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder:text-muted-foreground"
                  placeholder="smartcare@gmail.com"
                  required
                />
              </div>
            </div>

            {/* Professional Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-500" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-input bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder:text-muted-foreground"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm animate-fade-in">
                {error}
              </div>
            )}

            {/* Professional Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 btn-gradient text-white font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Sign In to Dashboard
                </div>
              )}
            </Button>
          </form>

          {/* Professional Demo Credentials */}
          <div className="mt-6 p-4 rounded-xl bg-blue-50/80 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Demo Credentials
            </h4>
            <div className="space-y-1 text-sm text-blue-700">
              <p><span className="font-medium">Email:</span> smartcare@gmail.com</p>
              <p><span className="font-medium">Password:</span> Bandung123</p>
            </div>
          </div>

          {/* Professional Footer */}
          <div className="text-center pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              SmartCare Admin Dashboard v2.0
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Secure • Professional • Reliable
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
