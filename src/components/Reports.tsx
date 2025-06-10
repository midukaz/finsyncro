import React, { useState } from 'react';

interface ReportsProps {}

const Reports: React.FC<ReportsProps> = () => {
  // Estado para selecionar o tipo de relatório e período
  const [reportType, setReportType] = useState('receitas-despesas');
  const [period, setPeriod] = useState('mes');
  const [year, setYear] = useState('2024');
  const [month, setMonth] = useState('5'); // Maio
  
  // Períodos disponíveis
  const months = [
    { value: '1', label: 'Janeiro' },
    { value: '2', label: 'Fevereiro' },
    { value: '3', label: 'Março' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Maio' },
    { value: '6', label: 'Junho' },
    { value: '7', label: 'Julho' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' },
  ];
  
  const years = ['2022', '2023', '2024'];
  
  // Dados fictícios para os relatórios
  const monthlyData = {
    income: 3000,
    expenses: 650,
    savings: 2350,
    savingsRate: 78.3,
    categories: [
      { category: 'Alimentos', amount: 150, percentage: 23 },
      { category: 'Restaurantes', amount: 80, percentage: 12 },
      { category: 'Transporte', amount: 100, percentage: 15 },
      { category: 'Lazer', amount: 120, percentage: 18 },
      { category: 'Compras', amount: 200, percentage: 31 }
    ],
    monthlyHistory: [
      { month: 'Nov', income: 2800, expenses: 850 },
      { month: 'Dez', income: 2600, expenses: 750 },
      { month: 'Jan', income: 2700, expenses: 700 },
      { month: 'Fev', income: 2800, expenses: 700 },
      { month: 'Mar', income: 2900, expenses: 850 },
      { month: 'Abr', income: 2700, expenses: 500 },
      { month: 'Mai', income: 3000, expenses: 650 }
    ]
  };
  
  // Dados para o relatório anual (simplificado)
  const yearlyData = {
    income: 33700,
    expenses: 9000,
    savings: 24700,
    savingsRate: 73.3,
    categories: [
      { category: 'Alimentos', amount: 2100, percentage: 23 },
      { category: 'Restaurantes', amount: 1080, percentage: 12 },
      { category: 'Transporte', amount: 1350, percentage: 15 },
      { category: 'Lazer', amount: 1620, percentage: 18 },
      { category: 'Compras', amount: 2850, percentage: 32 }
    ],
    yearlyHistory: [
      { month: 'Jan', income: 2700, expenses: 700 },
      { month: 'Fev', income: 2800, expenses: 700 },
      { month: 'Mar', income: 2900, expenses: 850 },
      { month: 'Abr', income: 2700, expenses: 500 },
      { month: 'Mai', income: 3000, expenses: 650 },
      { month: 'Jun', income: 2800, expenses: 750 },
      { month: 'Jul', income: 2900, expenses: 800 },
      { month: 'Ago', income: 2700, expenses: 700 },
      { month: 'Set', income: 2800, expenses: 850 },
      { month: 'Out', income: 3000, expenses: 700 },
      { month: 'Nov', income: 2800, expenses: 850 },
      { month: 'Dez', income: 2600, expenses: 750 }
    ]
  };
  
  // Selecionar dados com base no período
  const reportData = period === 'mes' ? monthlyData : yearlyData;
  const historyData = period === 'mes' ? monthlyData.monthlyHistory : yearlyData.yearlyHistory;
  
  // Formatar valores monetários
  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };
  
  // Renderizar o gráfico de barras para receitas e despesas
  const renderBarChart = () => {
    const maxValue = Math.max(...historyData.map(item => Math.max(item.income, item.expenses)));
    const barWidth = 100 / (historyData.length * 2 + (historyData.length - 1)); // Espaço para barras e espaços
    const barSpacing = barWidth / 2;
    const totalWidth = barWidth * historyData.length * 2 + barSpacing * (historyData.length - 1);
    const marginLeft = (100 - totalWidth) / 2;
    
    return (
      <svg width="100%" height="250" className="mt-4">
        {/* Eixo X */}
        <line x1="0" y1="220" x2="100%" y2="220" stroke="#dbe0e6" strokeWidth="1" />
        
        {/* Barras */}
        {historyData.map((item, index) => {
          const incomeHeight = (item.income / maxValue) * 180;
          const expensesHeight = (item.expenses / maxValue) * 180;
          
          const incomeX = `${marginLeft + index * (barWidth * 2 + barSpacing)}%`;
          const expensesX = `${marginLeft + index * (barWidth * 2 + barSpacing) + barWidth}%`;
          
          return (
            <g key={item.month}>
              {/* Barra de Receitas */}
              <rect 
                x={incomeX} 
                y={220 - incomeHeight} 
                width={`${barWidth}%`} 
                height={incomeHeight} 
                fill="#16a34a" 
                rx="2" 
                ry="2" 
              />
              
              {/* Barra de Despesas */}
              <rect 
                x={expensesX} 
                y={220 - expensesHeight} 
                width={`${barWidth}%`} 
                height={expensesHeight} 
                fill="#dc2626" 
                rx="2" 
                ry="2" 
              />
              
              {/* Rótulo do mês */}
              <text 
                x={`${marginLeft + index * (barWidth * 2 + barSpacing) + barWidth}%`} 
                y="235" 
                textAnchor="middle" 
                fill="#60748a" 
                fontSize="12"
              >
                {item.month}
              </text>
            </g>
          );
        })}
        
        {/* Legenda */}
        <rect x="10" y="10" width="12" height="12" fill="#16a34a" rx="2" ry="2" />
        <text x="28" y="20" fill="#60748a" fontSize="12">Receitas</text>
        
        <rect x="100" y="10" width="12" height="12" fill="#dc2626" rx="2" ry="2" />
        <text x="118" y="20" fill="#60748a" fontSize="12">Despesas</text>
      </svg>
    );
  };
  
  // Renderizar o gráfico de pizza para categorias de despesas
  const renderPieChart = () => {
    const radius = 80;
    const centerX = 100;
    const centerY = 100;
    
    let startAngle = 0;
    const paths = [];
    
    for (const category of reportData.categories) {
      const angle = (category.percentage / 100) * 360;
      const endAngle = startAngle + angle;
      
      // Converter ângulos para radianos
      const startAngleRad = (startAngle - 90) * Math.PI / 180;
      const endAngleRad = (endAngle - 90) * Math.PI / 180;
      
      // Calcular pontos no círculo
      const x1 = centerX + radius * Math.cos(startAngleRad);
      const y1 = centerY + radius * Math.sin(startAngleRad);
      const x2 = centerX + radius * Math.cos(endAngleRad);
      const y2 = centerY + radius * Math.sin(endAngleRad);
      
      // Determinar se é mais de 180 graus (meio círculo)
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      // Criar o comando SVG path
      const d = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      
      // Gerar uma cor baseada no índice
      paths.push({ d, percentage: category.percentage, category: category.category });
      
      // Atualizar o ângulo de início para o próximo setor
      startAngle = endAngle;
    }
    
    // Cores para as categorias
    const colors = ['#2563eb', '#16a34a', '#dc2626', '#9333ea', '#ea580c'];
    
    return (
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-4">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {paths.map((path, index) => (
            <path 
              key={index} 
              d={path.d} 
              fill={colors[index % colors.length]} 
              stroke="white" 
              strokeWidth="1"
            />
          ))}
        </svg>
        
        <div className="flex flex-col gap-3">
          {reportData.categories.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <span className="text-[#111418] text-sm">{category.category}: {category.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full max-w-[960px] flex-1">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#111418] tracking-light text-2xl md:text-[32px] font-bold leading-tight min-w-0 md:min-w-72">Relatórios</p>
      </div>

      {/* Filtros de relatório */}
      <div className="px-4 py-3">
        <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
          <h2 className="text-[#111418] text-base font-semibold mb-4">Filtros</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="reportType" className="block text-[#60748a] text-sm mb-1">Tipo de relatório</label>
              <select
                id="reportType"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="receitas-despesas">Receitas e Despesas</option>
                <option value="categorias">Categorias de Gastos</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="period" className="block text-[#60748a] text-sm mb-1">Período</label>
              <select
                id="period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="mes">Mensal</option>
                <option value="ano">Anual</option>
              </select>
            </div>
            
            {period === 'mes' && (
              <div>
                <label htmlFor="month" className="block text-[#60748a] text-sm mb-1">Mês</label>
                <select
                  id="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>
            )}
            
            <div>
              <label htmlFor="year" className="block text-[#60748a] text-sm mb-1">Ano</label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <button className="bg-[#2563eb] text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM152,88V44l44,44Zm36,128H68V40h68V88a8,8,0,0,0,8,8h44ZM88,104a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H96A8,8,0,0,1,88,104Zm80,48a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm0-32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,120Zm0,64a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,184Z"></path>
              </svg>
              Exportar PDF
            </button>
          </div>
        </div>
      </div>

      {/* Resumo do relatório */}
      <div className="px-4 py-3">
        <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
          <h2 className="text-[#111418] text-base font-semibold mb-4">
            Resumo {period === 'mes' ? `de ${months.find(m => m.value === month)?.label} de ${year}` : `do Ano de ${year}`}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Receitas */}
            <div className="bg-[#f9fafb] border border-[#dbe0e6] rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="#16a34a" viewBox="0 0 256 256">
                    <path d="M128,24A104,104,0,1,0,232,128,104.13,104.13,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-88a8,8,0,0,1-8,8H136v28a8,8,0,0,1-16,0V136H92a8,8,0,0,1,0-16h28V92a8,8,0,0,1,16,0v28h28A8,8,0,0,1,168,128Z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[#60748a] text-sm">Receitas</p>
                  <p className="text-green-600 text-lg font-semibold">{formatCurrency(reportData.income)}</p>
                </div>
              </div>
            </div>
            
            {/* Despesas */}
            <div className="bg-[#f9fafb] border border-[#dbe0e6] rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="#dc2626" viewBox="0 0 256 256">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM168,128a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,128Z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[#60748a] text-sm">Despesas</p>
                  <p className="text-red-600 text-lg font-semibold">{formatCurrency(reportData.expenses)}</p>
                </div>
              </div>
            </div>
            
            {/* Saldo */}
            <div className="bg-[#f9fafb] border border-[#dbe0e6] rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="#2563eb" viewBox="0 0 256 256">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[#60748a] text-sm">Saldo</p>
                  <p className="text-blue-600 text-lg font-semibold">{formatCurrency(reportData.savings)}</p>
                </div>
              </div>
            </div>
            
            {/* Taxa de economia */}
            <div className="bg-[#f9fafb] border border-[#dbe0e6] rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="#ea580c" viewBox="0 0 256 256">
                    <path d="M208.1,72.69a99.76,99.76,0,0,0-152.2,128,8,8,0,0,0,13.82-8,83.75,83.75,0,0,1,127.58-107.4,8,8,0,1,0,10.8-11.83ZM226.76,49.66l-20,3.64L203.12,33a8,8,0,0,0-14.8,0l-3.65,20.31-20,3.64a8,8,0,0,0,0,15.62l20,3.64L188.32,96a8,8,0,0,0,14.8,0l3.65-20.31,20-3.64a8,8,0,0,0,0-15.62ZM88,132a12,12,0,1,1-12-12A12,12,0,0,1,88,132Zm60,36a12,12,0,1,1,12,12A12,12,0,0,1,148,168Zm23.14-67.16a8,8,0,0,1-11.3,1l-12-10a8,8,0,1,1,10.32-12.21l12,10A8,8,0,0,1,171.14,100.84ZM48,180a12,12,0,1,1,12,12A12,12,0,0,1,48,180Zm144,12a12,12,0,1,1,12-12A12,12,0,0,1,192,192Z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[#60748a] text-sm">Taxa de economia</p>
                  <p className="text-amber-600 text-lg font-semibold">{reportData.savingsRate.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="px-4 py-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Gráfico de receitas e despesas */}
          {reportType === 'receitas-despesas' && (
            <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
              <h2 className="text-[#111418] text-base font-semibold mb-2">Receitas e Despesas</h2>
              {renderBarChart()}
            </div>
          )}
          
          {/* Gráfico de categorias */}
          <div className="bg-white border border-[#dbe0e6] rounded-lg p-4">
            <h2 className="text-[#111418] text-base font-semibold mb-2">Despesas por Categoria</h2>
            {renderPieChart()}
          </div>
        </div>
      </div>

      {/* Dicas baseadas nos dados */}
      <div className="px-4 py-3">
        <div className="bg-[#f0f2f5] border border-[#dbe0e6] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-[#111418] text-sm font-semibold">Análise do seu relatório</h3>
              <p className="text-[#60748a] text-sm mt-1">
                Parabéns pela taxa de economia de {reportData.savingsRate.toFixed(1)}%! 
                Continue mantendo um controle rigoroso sobre seus gastos em 
                {reportData.categories.sort((a, b) => b.percentage - a.percentage)[0].category} 
                que representa a maior parte de suas despesas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 