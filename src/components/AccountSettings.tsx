
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from './AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Settings, Key, Users, User } from 'lucide-react';

export const AccountSettings: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Password baru tidak cocok",
        variant: "destructive"
      });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password minimal 6 karakter",
        variant: "destructive"
      });
      return;
    }

    setIsChangingPassword(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword
      });

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Password berhasil diubah"
      });

      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal mengubah password",
        variant: "destructive"
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteEmail) {
      toast({
        title: "Error",
        description: "Email diperlukan",
        variant: "destructive"
      });
      return;
    }

    setIsInviting(true);
    
    try {
      // For now, just show a message since invite functionality needs backend implementation
      toast({
        title: "Fitur Segera Hadir",
        description: "Fitur undang pengguna akan segera tersedia",
      });
      setInviteEmail('');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal mengirim undangan",
        variant: "destructive"
      });
    } finally {
      setIsInviting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Pengaturan
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Pengaturan Akun</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="security">
              <Key className="h-4 w-4 mr-2" />
              Keamanan
            </TabsTrigger>
            <TabsTrigger value="team">
              <Users className="h-4 w-4 mr-2" />
              Tim
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Profil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input value={user?.email || ''} disabled />
                </div>
                <div>
                  <Label>Nama</Label>
                  <Input value={user?.name || ''} disabled />
                </div>
                <div>
                  <Label>Tanggal Pernikahan</Label>
                  <Input value={user?.weddingDate || 'Belum diatur'} disabled />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ubah Password</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <Label htmlFor="newPassword">Password Baru</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      placeholder="Masukkan password baru"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Konfirmasi password baru"
                    />
                  </div>
                  <Button type="submit" disabled={isChangingPassword}>
                    {isChangingPassword ? 'Mengubah...' : 'Ubah Password'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Undang Anggota Tim</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInviteUser} className="space-y-4">
                  <div>
                    <Label htmlFor="inviteEmail">Email</Label>
                    <Input
                      id="inviteEmail"
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="Masukkan email untuk diundang"
                    />
                  </div>
                  <Button type="submit" disabled={isInviting}>
                    {isInviting ? 'Mengirim...' : 'Kirim Undangan'}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Anggota Tim</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Users className="h-12 w-12 mx-auto mb-4" />
                  <p>Belum ada anggota tim</p>
                  <p className="text-sm mt-2">Undang orang lain untuk berkolaborasi</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
