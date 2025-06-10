import React, { useState } from 'react';

interface GoalProps {}

const Goals: React.FC<GoalProps> = () => {
  // Dados fictícios para metas financeiras
  const initialGoals = [
    { 
      id: 1, 
      name: 'Fundo de emergência', 
      targetAmount: 10000, 
      currentAmount: 5000, 
      deadline: '2024-12-31',
      category: 'Essencial',
      color: '#2563eb'
    },
    { 
      id: 2, 
      name: 'Viagem para Europa', 
      targetAmount: 15000, 
      currentAmount: 3000, 
      deadline: '2025-06-30',
      category: 'Lazer',
      color: '#16a34a'
    },
    { 
      id: 3, 
      name: 'Entrada apartamento', 
      targetAmount: 50000, 
      currentAmount: 12500, 
      deadline: '2026-01-31',
      category: 'Moradia',
      color: '#dc2626'
    },
  ];

  const [goals, setGoals] = useState(initialGoals);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: 0,
    currentAmount: 0,
    deadline: '',
    category: 'Essencial',
    color: '#2563eb'
  });

  // Formatar valores monetários
  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  // Calcular porcentagem de progresso
  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  // Calcular dias restantes
  const calculateRemainingDays = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Renderizar status com base nos dias restantes
  const renderStatus = (deadline: string) => {
    const daysRemaining = calculateRemainingDays(deadline);
    
    if (daysRemaining < 0) {
      return <span className="text-red-600 text-xs font-medium">Prazo expirado</span>;
    } else if (daysRemaining < 30) {
      return <span className="text-amber-500 text-xs font-medium">{daysRemaining} dias restantes</span>;
    } else {
      return <span className="text-green-600 text-xs font-medium">{daysRemaining} dias restantes</span>;
    }
  };

  // Adicionar nova meta
  const handleAddGoal = () => {
    if (!newGoal.name || newGoal.targetAmount <= 0 || !newGoal.deadline) {
      return; // Validação básica
    }
    
    const goal = {
      ...newGoal,
      id: goals.length + 1
    };
    
    setGoals([...goals, goal]);
    setShowAddModal(false);
    setNewGoal({
      name: '',
      targetAmount: 0,
      currentAmount: 0,
      deadline: '',
      category: 'Essencial',
      color: '#2563eb'
    });
  };

  // Manipular mudanças nos campos do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewGoal({
      ...newGoal,
      [name]: name === 'targetAmount' || name === 'currentAmount' ? parseFloat(value) : value
    });
  };

  return (
    <div className="flex flex-col w-full max-w-[960px] flex-1">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#111418] tracking-light text-2xl md:text-[32px] font-bold leading-tight min-w-0 md:min-w-72">Metas</p>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#2563eb] text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
          </svg>
          Nova Meta
        </button>
      </div>

      {/* Resumo de metas */}
      <div className="px-4 py-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total de metas */}
          <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
            <div className="flex flex-col">
              <p className="text-[#60748a] text-sm font-normal leading-normal">Total de metas</p>
              <p className="text-[#111418] text-2xl font-semibold mt-1">{goals.length}</p>
            </div>
          </div>

          {/* Meta mais próxima */}
          <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
            <div className="flex flex-col">
              <p className="text-[#60748a] text-sm font-normal leading-normal">Próxima meta</p>
              <p className="text-[#111418] text-lg font-semibold mt-1">
                {goals.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())[0]?.name || '-'}
              </p>
              <div className="flex items-center mt-1">
                {goals.length > 0 && renderStatus(goals.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())[0].deadline)}
              </div>
            </div>
          </div>

          {/* Valor total economizado */}
          <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
            <div className="flex flex-col">
              <p className="text-[#60748a] text-sm font-normal leading-normal">Total economizado</p>
              <p className="text-[#111418] text-2xl font-semibold mt-1">
                {formatCurrency(goals.reduce((sum, goal) => sum + goal.currentAmount, 0))}
              </p>
              <div className="flex items-center mt-1">
                <span className="text-[#60748a] text-xs">
                  Meta: {formatCurrency(goals.reduce((sum, goal) => sum + goal.targetAmount, 0))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de metas */}
      <div className="px-4 py-3">
        <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
          <h2 className="text-[#111418] text-base font-semibold mb-4">Suas metas</h2>
          
          <div className="space-y-6">
            {goals.map((goal) => (
              <div key={goal.id} className="bg-[#f9fafb] border border-[#dbe0e6] rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: goal.color }}
                      ></span>
                      <h3 className="text-[#111418] text-lg font-medium">{goal.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="bg-[#eef2ff] text-[#2563eb] text-xs px-2 py-1 rounded">
                        {goal.category}
                      </span>
                      <span className="text-[#60748a] text-xs">
                        Prazo: {formatDate(goal.deadline)}
                      </span>
                      <div>
                        {renderStatus(goal.deadline)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1 min-w-[140px]">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#60748a]">Progresso:</span>
                      <span className="text-[#111418] font-medium">{calculateProgress(goal.currentAmount, goal.targetAmount)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full" 
                        style={{ 
                          width: `${calculateProgress(goal.currentAmount, goal.targetAmount)}%`,
                          backgroundColor: goal.color
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-[#60748a]">{formatCurrency(goal.currentAmount)}</span>
                      <span className="text-[#60748a]">{formatCurrency(goal.targetAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {goals.length === 0 && (
              <div className="text-center py-6">
                <div className="text-[#60748a] mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" fill="currentColor" viewBox="0 0 256 256" className="mx-auto">
                    <path d="M128,24a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,24Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,200ZM173.66,82.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,82.34ZM128,72a16,16,0,1,1-16,16A16,16,0,0,1,128,72Zm0,96a16,16,0,1,1,16-16A16,16,0,0,1,128,168Z"></path>
                  </svg>
                </div>
                <p className="text-[#111418] text-lg font-medium">Nenhuma meta cadastrada</p>
                <p className="text-[#60748a] text-sm mt-1">Clique em "Nova Meta" para adicionar sua primeira meta financeira</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dicas para metas */}
      <div className="px-4 py-3">
        <div className="bg-[#f0f2f5] border border-[#dbe0e6] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-[#111418] text-sm font-semibold">Dica para alcançar suas metas</h3>
              <p className="text-[#60748a] text-sm mt-1">
                Divida metas grandes em objetivos menores e mais alcançáveis. Isso torna o processo mais gerenciável e você terá mais motivação ao ver progresso constante.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de adicionar meta */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[#111418] text-lg font-semibold">Nova Meta</h2>
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
                <label htmlFor="goalName" className="block text-[#60748a] text-sm mb-1">Nome da meta</label>
                <input
                  type="text"
                  id="goalName"
                  name="name"
                  value={newGoal.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Viagem para praia"
                />
              </div>
              
              <div>
                <label htmlFor="targetAmount" className="block text-[#60748a] text-sm mb-1">Valor alvo (R$)</label>
                <input
                  type="number"
                  id="targetAmount"
                  name="targetAmount"
                  value={newGoal.targetAmount || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0,00"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label htmlFor="currentAmount" className="block text-[#60748a] text-sm mb-1">Valor atual (R$)</label>
                <input
                  type="number"
                  id="currentAmount"
                  name="currentAmount"
                  value={newGoal.currentAmount || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0,00"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label htmlFor="deadline" className="block text-[#60748a] text-sm mb-1">Prazo</label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={newGoal.deadline}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-[#60748a] text-sm mb-1">Categoria</label>
                <select
                  id="category"
                  name="category"
                  value={newGoal.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Essencial">Essencial</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Moradia">Moradia</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Educação">Educação</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="color" className="block text-[#60748a] text-sm mb-1">Cor</label>
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={newGoal.color}
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
                  onClick={handleAddGoal}
                  className="px-4 py-2 bg-[#2563eb] text-white rounded-lg"
                >
                  Adicionar Meta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals; 