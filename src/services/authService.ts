interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

class AuthService {
  private readonly USERS_KEY = 'finance_app_users';
  private readonly CURRENT_USER_KEY = 'finance_app_current_user';
  private users: User[] = [];
  private currentUser: User | null = null;

  constructor() {
    this.loadUsers();
    this.loadCurrentUser();
  }

  private loadUsers(): void {
    const storedUsers = localStorage.getItem(this.USERS_KEY);
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      // Adicionar um usuário padrão para facilitar testes
      const defaultUser: User = {
        id: '1',
        name: 'Olivia',
        email: 'olivia@mail.com',
        password: '123456',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuWtbnxy5h-w63nc-lIftAyVfya35mqHODVXrbrxqLe6nM9B7StIjlxcDg6FojqAhRUfR2DsmWSXqR2nrn6gmpBVx9INhQf_4p9sb-cFbTPZfX-1YwSLIIJJyDSry93k-PZMconaQsXDI7MPF_8piF3yMeDAvCLdGrAIGrIPjIYiTsTPODyXxZ-pRYkXU8TRrev3hvGF4YABMkIPq4af2sVHALCe4ek_P_8zAuwXprqVy9P8E3H8V_kMCz3VTHzjULJj15pgPMWA'
      };
      this.users = [defaultUser];
      this.saveUsers();
    }
  }

  private loadCurrentUser(): void {
    const storedUser = localStorage.getItem(this.CURRENT_USER_KEY);
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  private saveUsers(): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(this.users));
  }

  private saveCurrentUser(): void {
    if (this.currentUser) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem(this.CURRENT_USER_KEY);
    }
  }

  public register(name: string, email: string, password: string): User | null {
    // Verificar se o email já está em uso
    if (this.users.some(user => user.email === email)) {
      return null;
    }

    // Criar novo usuário
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password
    };

    // Adicionar à lista de usuários
    this.users.push(newUser);
    this.saveUsers();

    return newUser;
  }

  public login(email: string, password: string): User | null {
    const user = this.users.find(user => user.email === email && user.password === password) || null;
    if (user) {
      // Armazenar usuário atual no localStorage (sem a senha)
      this.currentUser = user;
      this.saveCurrentUser();
    }
    return user;
  }

  public logout(): void {
    this.currentUser = null;
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  public updateProfile(userId: string, data: Partial<User>): User | null {
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex === -1) return null;

    // Não permitir atualização de senha através deste método
    const { password, ...safeData } = data;
    
    // Atualizar usuário
    this.users[userIndex] = { ...this.users[userIndex], ...safeData };
    
    // Se for o usuário atual, atualizar também
    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser = { ...this.users[userIndex] };
      this.saveCurrentUser();
    }
    
    this.saveUsers();
    return this.users[userIndex];
  }
}

const authService = new AuthService();
export default authService; 