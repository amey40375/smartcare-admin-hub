
export interface Admin {
  email: string;
  password: string;
  createdAt: string;
}

export const adminAuth = {
  // Register admin baru
  register: (email: string, password: string): boolean => {
    try {
      const existingAdmins = adminAuth.getAllAdmins();
      
      // Cek apakah email sudah ada
      if (existingAdmins.some(admin => admin.email === email)) {
        return false;
      }

      const newAdmin: Admin = {
        email,
        password,
        createdAt: new Date().toISOString()
      };

      existingAdmins.push(newAdmin);
      localStorage.setItem('admins', JSON.stringify(existingAdmins));
      return true;
    } catch (error) {
      console.error('Error registering admin:', error);
      return false;
    }
  },

  // Login admin
  login: (email: string, password: string): boolean => {
    try {
      const admins = adminAuth.getAllAdmins();
      const admin = admins.find(a => a.email === email && a.password === password);
      
      if (admin) {
        localStorage.setItem('loggedInAdmin', JSON.stringify({
          email: admin.email,
          loginTime: new Date().toISOString()
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  },

  // Cek status login
  isLoggedIn: (): boolean => {
    return localStorage.getItem('loggedInAdmin') !== null;
  },

  // Get current admin
  getCurrentAdmin: (): { email: string; loginTime: string } | null => {
    const loggedAdmin = localStorage.getItem('loggedInAdmin');
    return loggedAdmin ? JSON.parse(loggedAdmin) : null;
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem('loggedInAdmin');
  },

  // Get all admins
  getAllAdmins: (): Admin[] => {
    const admins = localStorage.getItem('admins');
    return admins ? JSON.parse(admins) : [];
  },

  // Update admin password
  updateAdmin: (oldEmail: string, newEmail: string, newPassword: string): boolean => {
    try {
      const admins = adminAuth.getAllAdmins();
      const adminIndex = admins.findIndex(a => a.email === oldEmail);
      
      if (adminIndex !== -1) {
        admins[adminIndex] = {
          ...admins[adminIndex],
          email: newEmail,
          password: newPassword
        };
        localStorage.setItem('admins', JSON.stringify(admins));
        
        // Update logged in admin info if it's the current user
        const currentAdmin = adminAuth.getCurrentAdmin();
        if (currentAdmin && currentAdmin.email === oldEmail) {
          localStorage.setItem('loggedInAdmin', JSON.stringify({
            email: newEmail,
            loginTime: currentAdmin.loginTime
          }));
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating admin:', error);
      return false;
    }
  }
};
