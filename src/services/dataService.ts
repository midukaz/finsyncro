import transactionsData from '../data/transactions.json';
import budgetsData from '../data/budgets.json';
import goalsData from '../data/goals.json';

// Interface para transações
export interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  account: string;
  amount: number;
  type: 'income' | 'expense';
  displayDate: string;
}

// Interface para orçamentos
export interface Budget {
  id: number;
  category: string;
  budgetAmount: number;
  spentAmount: number;
  period: string;
  color: string;
}

// Interface para metas
export interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  color: string;
}

// Função para formatar a data para exibição
const formatDisplayDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.getDate() + ' de ' + 
    new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date);
};

// Função para gerar um novo ID baseado nos itens existentes
const generateNewId = <T extends { id: number }>(items: T[]): number => {
  if (items.length === 0) return 1;
  return Math.max(...items.map(item => item.id)) + 1;
};

// Classe singleton para gerenciar dados
class DataService {
  private transactions: Transaction[] = [];
  private budgets: Budget[] = [];
  private goals: Goal[] = [];
  private categories: string[] = [];
  private accounts: string[] = [];
  private periods: string[] = [];
  private goalCategories: string[] = [];

  constructor() {
    // Inicializar dados a partir dos arquivos JSON
    this.transactions = [...(transactionsData.transactions as Transaction[])];
    this.budgets = [...budgetsData.budgets];
    this.goals = [...goalsData.goals];
    this.categories = [...transactionsData.categories];
    this.accounts = [...transactionsData.accounts];
    this.periods = [...budgetsData.periods];
    this.goalCategories = [...goalsData.categories];
  }

  // Métodos para transações
  getAllTransactions(): Transaction[] {
    return [...this.transactions];
  }

  addTransaction(transaction: Omit<Transaction, 'id' | 'displayDate'>): Transaction {
    const newTransaction = {
      ...transaction,
      id: generateNewId(this.transactions),
      displayDate: formatDisplayDate(transaction.date)
    };
    
    this.transactions.push(newTransaction);
    this.saveToLocalStorage();
    return newTransaction;
  }

  updateTransaction(transaction: Transaction): Transaction {
    const index = this.transactions.findIndex(t => t.id === transaction.id);
    if (index === -1) throw new Error('Transação não encontrada');
    
    this.transactions[index] = transaction;
    this.saveToLocalStorage();
    return transaction;
  }

  deleteTransaction(id: number): void {
    this.transactions = this.transactions.filter(t => t.id !== id);
    this.saveToLocalStorage();
  }

  // Métodos para orçamentos
  getAllBudgets(): Budget[] {
    return [...this.budgets];
  }

  getBudgetsByPeriod(period: string): Budget[] {
    return this.budgets.filter(b => b.period === period);
  }

  addBudget(budget: Omit<Budget, 'id'>): Budget {
    const newBudget = {
      ...budget,
      id: generateNewId(this.budgets)
    };
    
    this.budgets.push(newBudget);
    this.saveToLocalStorage();
    return newBudget;
  }

  updateBudget(budget: Budget): Budget {
    const index = this.budgets.findIndex(b => b.id === budget.id);
    if (index === -1) throw new Error('Orçamento não encontrado');
    
    this.budgets[index] = budget;
    this.saveToLocalStorage();
    return budget;
  }

  deleteBudget(id: number): void {
    this.budgets = this.budgets.filter(b => b.id !== id);
    this.saveToLocalStorage();
  }

  // Métodos para metas
  getAllGoals(): Goal[] {
    return [...this.goals];
  }

  addGoal(goal: Omit<Goal, 'id'>): Goal {
    const newGoal = {
      ...goal,
      id: generateNewId(this.goals)
    };
    
    this.goals.push(newGoal);
    this.saveToLocalStorage();
    return newGoal;
  }

  updateGoal(goal: Goal): Goal {
    const index = this.goals.findIndex(g => g.id === goal.id);
    if (index === -1) throw new Error('Meta não encontrada');
    
    this.goals[index] = goal;
    this.saveToLocalStorage();
    return goal;
  }

  deleteGoal(id: number): void {
    this.goals = this.goals.filter(g => g.id !== id);
    this.saveToLocalStorage();
  }

  // Métodos para categorias e contas
  getCategories(): string[] {
    return [...this.categories];
  }

  getAccounts(): string[] {
    return [...this.accounts];
  }

  getPeriods(): string[] {
    return [...this.periods];
  }

  getGoalCategories(): string[] {
    return [...this.goalCategories];
  }

  // Salvar dados no localStorage
  private saveToLocalStorage(): void {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
    localStorage.setItem('budgets', JSON.stringify(this.budgets));
    localStorage.setItem('goals', JSON.stringify(this.goals));
  }

  // Carregar dados do localStorage (chamado durante a inicialização)
  loadFromLocalStorage(): void {
    const storedTransactions = localStorage.getItem('transactions');
    const storedBudgets = localStorage.getItem('budgets');
    const storedGoals = localStorage.getItem('goals');

    if (storedTransactions) {
      this.transactions = JSON.parse(storedTransactions) as Transaction[];
    }

    if (storedBudgets) {
      this.budgets = JSON.parse(storedBudgets) as Budget[];
    }

    if (storedGoals) {
      this.goals = JSON.parse(storedGoals) as Goal[];
    }
  }
}

// Exportar uma instância única do serviço
const dataService = new DataService();
dataService.loadFromLocalStorage();

export default dataService; 