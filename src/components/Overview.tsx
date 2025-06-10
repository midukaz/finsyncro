import React from 'react';

interface OverviewProps {}

const Overview: React.FC<OverviewProps> = () => {
  // Dados fictícios para o resumo financeiro
  const financialSummary = {
    currentBalance: 2350.00,
    income: 3000.00,
    expenses: 650.00,
    savingsRate: 78, // 78% da receita foi poupada
  };

  // Dados fictícios para gastos por categoria
  const expensesByCategory = [
    { category: 'Alimentos', amount: 150.00, percentage: 23 },
    { category: 'Restaurantes', amount: 80.00, percentage: 12 },
    { category: 'Transporte', amount: 100.00, percentage: 15 },
    { category: 'Lazer', amount: 120.00, percentage: 18 },
    { category: 'Compras', amount: 200.00, percentage: 31 },
  ];

  // Dados fictícios para transações recentes
  const recentTransactions = [
    { id: 1, description: 'Salário', amount: 3000.00, date: '14 de maio', type: 'income' },
    { id: 2, description: 'Compra no supermercado', amount: -150.00, date: '15 de maio', type: 'expense' },
    { id: 3, description: 'Jantar fora', amount: -80.00, date: '12 de maio', type: 'expense' },
  ];

  // Dados para os gráficos de linha
  const balanceHistory = [1950, 1850, 2000, 2100, 2050, 2200, 2350];
  const months = ['Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'];
  
  const incomeHistory = [2800, 2600, 2700, 2800, 2900, 2700, 3000];
  const expenseHistory = [850, 750, 700, 700, 850, 500, 650];

  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return `R$ ${Math.abs(value).toFixed(2).replace('.', ',')}`;
  };

  // Função para calcular a variação do mês
  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };

  // Função para renderizar o SVG do gráfico de linha de saldo
  const renderBalanceChart = () => {
    const width = 300;
    const height = 180;
    const padding = 30;
    
    // Encontrar o maior valor para escala
    const maxValue = Math.max(...balanceHistory);
    
    // Calcular pontos no gráfico
    const points = balanceHistory.map((value, index) => {
      const x = padding + (index * ((width - padding * 2) / (balanceHistory.length - 1)));
      const y = height - padding - ((value / maxValue) * (height - padding * 2));
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width={width} height={height} className="w-full">
        {/* Eixo X */}
        <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="#dbe0e6" strokeWidth="1" />
        
        {/* Meses no eixo X */}
        {months.map((month, index) => {
          const x = padding + (index * ((width - padding * 2) / (months.length - 1)));
          return (
            <text 
              key={month} 
              x={x} 
              y={height-10} 
              textAnchor="middle" 
              fontSize="10" 
              fill="#60748a"
            >
              {month}
            </text>
          );
        })}
        
        {/* Linha do gráfico */}
        <polyline
          fill="none"
          stroke="#2563eb"
          strokeWidth="2"
          points={points}
        />
        
        {/* Área preenchida sob a linha */}
        <polyline
          fill="rgba(37, 99, 235, 0.1)"
          stroke="none"
          points={`${padding},${height-padding} ${points} ${width-padding},${height-padding}`}
        />
        
        {/* Pontos no gráfico */}
        {balanceHistory.map((value, index) => {
          const x = padding + (index * ((width - padding * 2) / (balanceHistory.length - 1)));
          const y = height - padding - ((value / maxValue) * (height - padding * 2));
          return (
            <circle 
              key={index} 
              cx={x} 
              cy={y} 
              r="3" 
              fill="white" 
              stroke="#2563eb" 
              strokeWidth="2"
            />
          );
        })}
      </svg>
    );
  };

  // Função para renderizar o SVG do gráfico de linha de receitas e despesas
  const renderIncomeExpenseChart = () => {
    const width = 300;
    const height = 180;
    const padding = 30;
    
    // Encontrar o maior valor para escala
    const maxValue = Math.max(...incomeHistory, ...expenseHistory);
    
    // Calcular pontos para receitas
    const incomePoints = incomeHistory.map((value, index) => {
      const x = padding + (index * ((width - padding * 2) / (incomeHistory.length - 1)));
      const y = height - padding - ((value / maxValue) * (height - padding * 2));
      return `${x},${y}`;
    }).join(' ');
    
    // Calcular pontos para despesas
    const expensePoints = expenseHistory.map((value, index) => {
      const x = padding + (index * ((width - padding * 2) / (expenseHistory.length - 1)));
      const y = height - padding - ((value / maxValue) * (height - padding * 2));
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width={width} height={height} className="w-full">
        {/* Eixo X */}
        <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="#dbe0e6" strokeWidth="1" />
        
        {/* Meses no eixo X */}
        {months.map((month, index) => {
          const x = padding + (index * ((width - padding * 2) / (months.length - 1)));
          return (
            <text 
              key={month} 
              x={x} 
              y={height-10} 
              textAnchor="middle" 
              fontSize="10" 
              fill="#60748a"
            >
              {month}
            </text>
          );
        })}
        
        {/* Linha de receitas */}
        <polyline
          fill="none"
          stroke="#16a34a"
          strokeWidth="2"
          points={incomePoints}
        />
        
        {/* Linha de despesas */}
        <polyline
          fill="none"
          stroke="#dc2626"
          strokeWidth="2"
          points={expensePoints}
        />
        
        {/* Pontos de receitas */}
        {incomeHistory.map((value, index) => {
          const x = padding + (index * ((width - padding * 2) / (incomeHistory.length - 1)));
          const y = height - padding - ((value / maxValue) * (height - padding * 2));
          return (
            <circle 
              key={`income-${index}`} 
              cx={x} 
              cy={y} 
              r="3" 
              fill="white" 
              stroke="#16a34a" 
              strokeWidth="2"
            />
          );
        })}
        
        {/* Pontos de despesas */}
        {expenseHistory.map((value, index) => {
          const x = padding + (index * ((width - padding * 2) / (expenseHistory.length - 1)));
          const y = height - padding - ((value / maxValue) * (height - padding * 2));
          return (
            <circle 
              key={`expense-${index}`} 
              cx={x} 
              cy={y} 
              r="3" 
              fill="white" 
              stroke="#dc2626" 
              strokeWidth="2"
            />
          );
        })}
        
        {/* Legenda */}
        <circle cx={padding} cy={15} r="3" fill="white" stroke="#16a34a" strokeWidth="2" />
        <text x={padding + 8} y={18} fontSize="10" fill="#60748a">Receitas</text>
        
        <circle cx={padding + 60} cy={15} r="3" fill="white" stroke="#dc2626" strokeWidth="2" />
        <text x={padding + 68} y={18} fontSize="10" fill="#60748a">Despesas</text>
      </svg>
    );
  };

  return (
    <div className="flex flex-col w-full max-w-[960px] flex-1">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#111418] tracking-light text-2xl md:text-[32px] font-bold leading-tight min-w-0 md:min-w-72">Visão geral</p>
      </div>

      {/* Cards de resumo */}
      <div className="px-4 py-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Saldo atual */}
          <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
            <div className="flex flex-col">
              <p className="text-[#60748a] text-sm font-normal leading-normal">Saldo atual</p>
              <p className="text-[#111418] text-2xl font-semibold mt-1">{formatCurrency(financialSummary.currentBalance)}</p>
              <div className="flex items-center mt-2">
                <span className="text-green-600 text-xs font-medium">▲ 12.4% do mês anterior</span>
              </div>
            </div>
          </div>

          {/* Receitas do mês */}
          <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
            <div className="flex flex-col">
              <p className="text-[#60748a] text-sm font-normal leading-normal">Receitas do mês</p>
              <p className="text-green-600 text-2xl font-semibold mt-1">{formatCurrency(financialSummary.income)}</p>
              <div className="flex items-center mt-2">
                <span className="text-green-600 text-xs font-medium">▲ 5.2% do mês anterior</span>
              </div>
            </div>
          </div>

          {/* Despesas do mês */}
          <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
            <div className="flex flex-col">
              <p className="text-[#60748a] text-sm font-normal leading-normal">Despesas do mês</p>
              <p className="text-red-600 text-2xl font-semibold mt-1">{formatCurrency(financialSummary.expenses)}</p>
              <div className="flex items-center mt-2">
                <span className="text-red-600 text-xs font-medium">▼ 3.1% do mês anterior</span>
              </div>
            </div>
          </div>

          {/* Taxa de economia */}
          <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
            <div className="flex flex-col">
              <p className="text-[#60748a] text-sm font-normal leading-normal">Taxa de economia</p>
              <p className="text-[#111418] text-2xl font-semibold mt-1">{financialSummary.savingsRate}%</p>
              <div className="flex items-center mt-2">
                <span className="text-green-600 text-xs font-medium">▲ 8.5% do mês anterior</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="px-4 py-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Gráfico de histórico de saldo */}
        <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
          <h2 className="text-[#111418] text-base font-semibold mb-4">Histórico de saldo</h2>
          <div className="flex justify-center overflow-hidden">
            {renderBalanceChart()}
          </div>
        </div>

        {/* Gráfico de receitas e despesas */}
        <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
          <h2 className="text-[#111418] text-base font-semibold mb-4">Receitas vs. Despesas</h2>
          <div className="flex justify-center overflow-hidden">
            {renderIncomeExpenseChart()}
          </div>
        </div>
      </div>

      {/* Despesas por categoria */}
      <div className="px-4 py-3">
        <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
          <h2 className="text-[#111418] text-base font-semibold mb-4">Despesas por categoria</h2>
          
          <div className="space-y-4">
            {expensesByCategory.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[#111418] text-sm font-medium">{item.category}</span>
                  <span className="text-[#60748a] text-sm">{formatCurrency(item.amount)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right">
                  <span className="text-[#60748a] text-xs">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transações recentes */}
      <div className="px-4 py-3">
        <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[#111418] text-base font-semibold">Transações recentes</h2>
            <a href="#" className="text-blue-600 text-sm font-medium">Ver todas</a>
          </div>
          
          <div className="divide-y divide-[#dbe0e6]">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="text-[#111418] text-sm font-medium">{transaction.description}</p>
                  <p className="text-[#60748a] text-xs">{transaction.date}</p>
                </div>
                <p className={`text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Dicas financeiras */}
      <div className="px-4 py-3">
        <div className="bg-[#f0f2f5] border border-[#dbe0e6] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-[#111418] text-sm font-semibold">Dica do mês</h3>
              <p className="text-[#60748a] text-sm mt-1">
                Sua taxa de economia está excelente! Continue assim e considere investir parte do dinheiro poupado para fazer seu patrimônio crescer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview; 