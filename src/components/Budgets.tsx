import React, { useState } from 'react';

interface BudgetProps {}

const Budgets: React.FC<BudgetProps> = () => {
  // Dados fictícios para os orçamentos
  const initialBudgets = [
    { 
      id: 1, 
      category: 'Alimentação', 
      budgetAmount: 800, 
      spentAmount: 450, 
      period: 'Maio 2024',
      color: '#2563eb'
    },
    { 
      id: 2, 
      category: 'Transporte', 
      budgetAmount: 400, 
      spentAmount: 320, 
      period: 'Maio 2024',
      color: '#16a34a'
    },
    { 
      id: 3, 
      category: 'Lazer', 
      budgetAmount: 600, 
      spentAmount: 580, 
      period: 'Maio 2024',
      color: '#dc2626'
    },
    { 
      id: 4, 
      category: 'Moradia', 
      budgetAmount: 1200, 
      spentAmount: 1200, 
      period: 'Maio 2024',
      color: '#9333ea'
    },
    { 
      id: 5, 
      category: 'Saúde', 
      budgetAmount: 300, 
      spentAmount: 150, 
      period: 'Maio 2024',
      color: '#ea580c'
    },
  ];

  const [budgets, setBudgets] = useState(initialBudgets);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Maio 2024');
  const [newBudget, setNewBudget] = useState({
    category: '',
    budgetAmount: 0,
    spentAmount: 0,
    period: 'Maio 2024',
    color: '#2563eb'
  });

  // Períodos disponíveis (meses)
  const availablePeriods = ['Abril 2024', 'Maio 2024', 'Junho 2024'];

  // Formatar valores monetários
  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  // Calcular porcentagem de uso
  const calculateUsage = (spent: number, budget: number) => {
    return Math.min(Math.round((spent / budget) * 100), 100);
  };

  // Calcular status de orçamento
  const getBudgetStatus = (spent: number, budget: number) => {
    const usage = calculateUsage(spent, budget);
    
    if (usage >= 100) {
      return { label: 'Esgotado', color: 'text-red-600' };
    } else if (usage >= 85) {
      return { label: 'Crítico', color: 'text-amber-600' };
    } else if (usage >= 60) {
      return { label: 'Atenção', color: 'text-amber-500' };
    } else {
      return { label: 'Adequado', color: 'text-green-600' };
    }
  };

  // Adicionar novo orçamento
  const handleAddBudget = () => {
    if (!newBudget.category || newBudget.budgetAmount <= 0) {
      return; // Validação básica
    }
    
    const budget = {
      ...newBudget,
      id: budgets.length + 1,
      period: selectedPeriod
    };
    
    setBudgets([...budgets, budget]);
    setShowAddModal(false);
    setNewBudget({
      category: '',
      budgetAmount: 0,
      spentAmount: 0,
      period: selectedPeriod,
      color: '#2563eb'
    });
  };

  // Manipular mudanças nos campos do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBudget({
      ...newBudget,
      [name]: name === 'budgetAmount' || name === 'spentAmount' ? parseFloat(value) : value
    });
  };

  // Filtrar orçamentos por período
  const filteredBudgets = budgets.filter(budget => budget.period === selectedPeriod);

  // Calcular totais
  const totalBudget = filteredBudgets.reduce((sum, budget) => sum + budget.budgetAmount, 0);
  const totalSpent = filteredBudgets.reduce((sum, budget) => sum + budget.spentAmount, 0);
  const overallUsage = totalBudget > 0 ? Math.min(Math.round((totalSpent / totalBudget) * 100), 100) : 0;

  return (
    <div className="flex flex-col w-full max-w-[960px] flex-1">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#111418] tracking-light text-2xl md:text-[32px] font-bold leading-tight min-w-0 md:min-w-72">Orçamentos</p>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-[#dbe0e6] rounded-lg px-3 py-2 text-sm bg-white"
          >
            {availablePeriods.map((period) => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#2563eb] text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
            </svg>
            Novo Orçamento
          </button>
        </div>
      </div>

      {/* Resumo de orçamentos */}
      <div className="px-4 py-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Orçamento total */}
          <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
            <div className="flex flex-col">
              <p className="text-[#60748a] text-sm font-normal leading-normal">Orçamento total</p>
              <p className="text-[#111418] text-2xl font-semibold mt-1">{formatCurrency(totalBudget)}</p>
              <div className="flex items-center mt-2">
                <span className="text-[#60748a] text-xs">Para {selectedPeriod}</span>
              </div>
            </div>
          </div>

          {/* Gasto atual */}
          <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
            <div className="flex flex-col">
              <p className="text-[#60748a] text-sm font-normal leading-normal">Gasto atual</p>
              <p className="text-[#111418] text-2xl font-semibold mt-1">{formatCurrency(totalSpent)}</p>
              <div className="flex items-center mt-2">
                <span className={`text-xs ${totalSpent <= totalBudget ? 'text-green-600' : 'text-red-600'}`}>
                  {totalSpent <= totalBudget 
                    ? `R$ ${(totalBudget - totalSpent).toFixed(2).replace('.', ',')} disponível` 
                    : `R$ ${(totalSpent - totalBudget).toFixed(2).replace('.', ',')} acima do orçamento`}
                </span>
              </div>
            </div>
          </div>

          {/* Progresso geral */}
          <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
            <div className="flex flex-col">
              <p className="text-[#60748a] text-sm font-normal leading-normal">Progresso geral</p>
              <p className="text-[#111418] text-2xl font-semibold mt-1">{overallUsage}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className={`h-2.5 rounded-full ${
                    overallUsage >= 90 ? 'bg-red-600' : 
                    overallUsage >= 75 ? 'bg-amber-500' : 'bg-green-600'
                  }`}
                  style={{ width: `${overallUsage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de orçamentos */}
      <div className="px-4 py-3">
        <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
          <h2 className="text-[#111418] text-base font-semibold mb-4">Seus orçamentos para {selectedPeriod}</h2>
          
          <div className="space-y-4">
            {filteredBudgets.map((budget) => {
              const usage = calculateUsage(budget.spentAmount, budget.budgetAmount);
              const status = getBudgetStatus(budget.spentAmount, budget.budgetAmount);
              
              return (
                <div key={budget.id} className="border-b border-[#dbe0e6] pb-4 last:border-b-0 last:pb-0">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: budget.color }}
                      ></span>
                      <h3 className="text-[#111418] text-base font-medium">{budget.category}</h3>
                    </div>
                    
                    <div className={`text-sm ${status.color} font-medium`}>
                      {status.label}
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#60748a]">Gasto: {formatCurrency(budget.spentAmount)}</span>
                      <span className="text-[#60748a]">Orçamento: {formatCurrency(budget.budgetAmount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          usage >= 100 ? 'bg-red-600' : 
                          usage >= 85 ? 'bg-amber-500' : 
                          usage >= 60 ? 'bg-amber-400' : 'bg-green-600'
                        }`}
                        style={{ width: `${usage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-end text-sm mt-1">
                      <span className="text-[#60748a]">{usage}% utilizado</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredBudgets.length === 0 && (
              <div className="text-center py-6">
                <div className="text-[#60748a] mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" fill="currentColor" viewBox="0 0 256 256" className="mx-auto">
                    <path d="M40,106.67,128,165.33l88-58.66V176a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16ZM56,64H200a16,16,0,0,1,16,16v1.1s0,.06,0,.09L128,138.67,40,81.2V80A16,16,0,0,1,56,64Z"></path>
                  </svg>
                </div>
                <p className="text-[#111418] text-lg font-medium">Nenhum orçamento cadastrado</p>
                <p className="text-[#60748a] text-sm mt-1">Clique em "Novo Orçamento" para começar a planejar seus gastos</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Categorias sem orçamento */}
      {filteredBudgets.length > 0 && (
        <div className="px-4 py-3">
          <div className="bg-[#f0f2f5] border border-[#dbe0e6] rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="text-amber-500 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,202.1a8.5,8.5,0,0,1-7.48,4.25H40.55a8.5,8.5,0,0,1-7.48-4.25,7.59,7.59,0,0,1,0-7.72L120.52,42.5a8.75,8.75,0,0,1,15,0l87.45,151.88A7.59,7.59,0,0,1,222.93,202.1ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-[#111418] text-sm font-semibold">Sugestão para seu orçamento</h3>
                <p className="text-[#60748a] text-sm mt-1">
                  Considere adicionar orçamentos para categorias importantes como "Educação" e "Emergências" para ter um controle financeiro mais completo.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de adicionar orçamento */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[#111418] text-lg font-semibold">Novo Orçamento</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-[#60748a] hover:text-[#111418]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="category" className="block text-[#60748a] text-sm mb-1">Categoria</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={newBudget.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Alimentação"
                />
              </div>
              
              <div>
                <label htmlFor="budgetAmount" className="block text-[#60748a] text-sm mb-1">Valor do orçamento (R$)</label>
                <input
                  type="number"
                  id="budgetAmount"
                  name="budgetAmount"
                  value={newBudget.budgetAmount || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0,00"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label htmlFor="spentAmount" className="block text-[#60748a] text-sm mb-1">Valor já gasto (R$)</label>
                <input
                  type="number"
                  id="spentAmount"
                  name="spentAmount"
                  value={newBudget.spentAmount || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0,00"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label htmlFor="color" className="block text-[#60748a] text-sm mb-1">Cor</label>
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={newBudget.color}
                  onChange={handleInputChange}
                  className="w-full h-10 p-1 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#dbe0e6] rounded-lg text-[#60748a]"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddBudget}
                  className="px-4 py-2 bg-[#2563eb] text-white rounded-lg"
                >
                  Adicionar Orçamento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets; 