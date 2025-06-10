interface User {
  id: string;
  name: string;
  email: string;
}

class AuthService {
  public register(name: string, email: string, password: string): User | null {
    // Simulação de registro - em uma aplicação real, isso seria uma chamada API
    if (name && email && password) {
      const user: User = {
        id: '1',
        name: name,
        email: email
      };
      
      // Salvar o token e usuário no localStorage
      localStorage.setItem('authToken', 'fake-token-' + Math.random());
      localStorage.setItem('user', JSON.stringify(user));
      
      return user;
    }
    
    return null;
  }

  public login(email: string, password: string): User | null {
    // Simulação de login - em uma aplicação real, isso seria uma chamada API
    // No mundo real, não armazenaríamos senhas no front-end
    if (email && password) {
      const user: User = {
        id: '1',
        name: 'Olivia',
        email: email
      };
      
      // Salvar o token e usuário no localStorage
      localStorage.setItem('authToken', 'fake-token-' + Math.random());
      localStorage.setItem('user', JSON.stringify(user));
      
      return user;
    }
    
    return null;
  }

  public logout(): void {
    // Remover dados de autenticação do localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  public getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  public updateProfile(userId: string, data: Partial<User>): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    const user: User = JSON.parse(userStr);
    if (user.id !== userId) return null;
    
    // Atualizar usuário
    const updatedUser = { ...user, ...data };
    
    // Salvar usuário atualizado
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    return updatedUser;
  }
}

const authService = new AuthService();
export default authService; 