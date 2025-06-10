import React, { useState, useEffect } from 'react';
import dataService, { Transaction } from '../services/dataService';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<number | null>(null);
  
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: 0,
    type: 'expense' as 'income' | 'expense',
    category: '',
    account: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Carregar transações ao montar o componente
  useEffect(() => {
    setTransactions(dataService.getAllTransactions());
  }, []);

  // Filtrar transações com base no termo de pesquisa e na aba ativa
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'income') return matchesSearch && transaction.type === 'income';
    if (activeTab === 'expense') return matchesSearch && transaction.type === 'expense';
    return matchesSearch;
  });

  // Lidar com mudanças nos campos do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: name === 'amount' ? parseFloat(value) : value
    });
  };

  // Adicionar nova transação
  const handleAddTransaction = () => {
    // Validação básica
    if (!newTransaction.description || newTransaction.amount <= 0 || !newTransaction.category || !newTransaction.account) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    // Preparar o objeto de transação
    const transactionToAdd = {
      ...newTransaction,
      amount: newTransaction.type === 'expense' ? -Math.abs(newTransaction.amount) : Math.abs(newTransaction.amount)
    };

    // Adicionar transação usando o serviço
    const addedTransaction = dataService.addTransaction(transactionToAdd);
    
    // Atualizar o estado local
    setTransactions([...transactions, addedTransaction]);
    
    // Limpar formulário e fechar modal
    setNewTransaction({
      description: '',
      amount: 0,
      type: 'expense',
      category: '',
      account: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddModal(false);
  };

  // Iniciar a edição de uma transação
  const handleEditStart = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    
    // Configurar o formulário de edição
    setNewTransaction({
      description: transaction.description,
      amount: Math.abs(transaction.amount),
      type: transaction.amount >= 0 ? 'income' : 'expense',
      category: transaction.category,
      account: transaction.account,
      date: transaction.date
    });
    
    setShowEditModal(true);
  };

  // Salvar a transação editada
  const handleEditSave = () => {
    if (!transactionToEdit) return;
    
    // Validação básica
    if (!newTransaction.description || newTransaction.amount <= 0 || !newTransaction.category || !newTransaction.account) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    // Preparar o objeto de transação atualizado
    const updatedTransaction: Transaction = {
      id: transactionToEdit.id,
      description: newTransaction.description,
      amount: newTransaction.type === 'expense' ? -Math.abs(newTransaction.amount) : Math.abs(newTransaction.amount),
      type: newTransaction.type,
      category: newTransaction.category,
      account: newTransaction.account,
      date: newTransaction.date,
      displayDate: transactionToEdit.displayDate
    };

    // Atualizar a transação usando o serviço
    const result = dataService.updateTransaction(updatedTransaction);
    
    // Atualizar o estado local
    setTransactions(transactions.map(t => t.id === result.id ? result : t));
    
    // Limpar formulário e fechar modal
    setTransactionToEdit(null);
    setNewTransaction({
      description: '',
      amount: 0,
      type: 'expense',
      category: '',
      account: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowEditModal(false);
  };

  // Iniciar exclusão de uma transação
  const handleDeleteStart = (id: number) => {
    setTransactionToDelete(id);
    setShowConfirmDelete(true);
  };

  // Confirmar exclusão de uma transação
  const handleDeleteConfirm = () => {
    if (transactionToDelete === null) return;
    
    // Excluir a transação usando o serviço
    dataService.deleteTransaction(transactionToDelete);
    
    // Atualizar o estado local
    setTransactions(transactions.filter(t => t.id !== transactionToDelete));
    
    // Limpar e fechar modal
    setTransactionToDelete(null);
    setShowConfirmDelete(false);
  };

  // Renderizar ações para cada transação
  const renderActions = (transaction: Transaction) => (
    <div className="flex gap-2">
      <button 
        onClick={() => handleEditStart(transaction)}
        className="p-1 text-blue-600 hover:text-blue-800"
        title="Editar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.32,64l24-24L216,84.69Z"></path>
        </svg>
      </button>
      <button 
        onClick={() => handleDeleteStart(transaction.id)}
        className="p-1 text-red-600 hover:text-red-800"
        title="Excluir"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
        </svg>
      </button>
    </div>
  );

  return (
    <div className="flex flex-col w-full max-w-[960px] flex-1">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#111418] tracking-light text-2xl md:text-[32px] font-bold leading-tight min-w-0 md:min-w-72">Transações</p>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-white text-[#111418] border border-[#dbe0e6] rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2 hover:bg-[#f9fafb]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
          </svg>
          Nova Transação
        </button>
      </div>
      
      {/* Search */}
      <div className="px-4 py-3">
        <label className="flex flex-col min-w-0 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-[#60748a] flex border-none bg-[#f0f2f5] items-center justify-center pl-4 rounded-l-lg border-r-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <input
              placeholder="Pesquisar transações"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-full placeholder:text-[#60748a] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </label>
      </div>

      {/* Tabs */}
      <div className="pb-3">
        <div className="flex border-b border-[#dbe0e6] px-4 gap-4 md:gap-8 overflow-x-auto">
          <a 
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('all'); }}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 whitespace-nowrap ${
              activeTab === 'all' 
                ? 'border-b-[#111418] text-[#111418]' 
                : 'border-b-transparent text-[#60748a]'
            }`}
          >
            <p className={`text-sm font-bold leading-normal tracking-[0.015em] ${
              activeTab === 'all' ? 'text-[#111418]' : 'text-[#60748a]'
            }`}>Todas</p>
          </a>
          <a 
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('income'); }}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 whitespace-nowrap ${
              activeTab === 'income' 
                ? 'border-b-[#111418] text-[#111418]' 
                : 'border-b-transparent text-[#60748a]'
            }`}
          >
            <p className={`text-sm font-bold leading-normal tracking-[0.015em] ${
              activeTab === 'income' ? 'text-[#111418]' : 'text-[#60748a]'
            }`}>Receitas</p>
          </a>
          <a 
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('expense'); }}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 whitespace-nowrap ${
              activeTab === 'expense' 
                ? 'border-b-[#111418] text-[#111418]' 
                : 'border-b-transparent text-[#60748a]'
            }`}
          >
            <p className={`text-sm font-bold leading-normal tracking-[0.015em] ${
              activeTab === 'expense' ? 'text-[#111418]' : 'text-[#60748a]'
            }`}>Despesas</p>
          </a>
        </div>
      </div>

      {/* Table */}
      <div className="px-4 py-3">
        <div className="flex overflow-hidden rounded-lg border border-[#dbe0e6] bg-white">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white">
                  <th className="px-4 py-3 text-left text-[#111418] min-w-[120px] text-sm font-medium leading-normal">Data</th>
                  <th className="px-4 py-3 text-left text-[#111418] min-w-[150px] text-sm font-medium leading-normal">Descrição</th>
                  <th className="px-4 py-3 text-left text-[#111418] min-w-[120px] text-sm font-medium leading-normal">Categoria</th>
                  <th className="px-4 py-3 text-left text-[#111418] min-w-[140px] text-sm font-medium leading-normal">Conta</th>
                  <th className="px-4 py-3 text-left text-[#111418] min-w-[100px] text-sm font-medium leading-normal">Valor</th>
                  <th className="px-4 py-3 text-right text-[#111418] min-w-[80px] text-sm font-medium leading-normal">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t border-t-[#dbe0e6]">
                    <td className="h-[72px] px-4 py-2 text-[#60748a] text-sm font-normal leading-normal">
                      {transaction.displayDate}
                    </td>
                    <td className="h-[72px] px-4 py-2 text-[#111418] text-sm font-normal leading-normal">
                      {transaction.description}
                    </td>
                    <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-medium leading-normal w-full">
                        <span className="truncate">{transaction.category}</span>
                      </button>
                    </td>
                    <td className="h-[72px] px-4 py-2 text-[#60748a] text-sm font-normal leading-normal">
                      {transaction.account}
                    </td>
                    <td className="h-[72px] px-4 py-2 text-[#60748a] text-sm font-normal leading-normal whitespace-nowrap">
                      {transaction.type === 'income' ? '+' : '-'}R$ {Math.abs(transaction.amount).toFixed(2).replace('.', ',')}
                    </td>
                    <td className="h-[72px] px-4 py-2 text-right">
                      {renderActions(transaction)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile View - Cards (Alternative for very small screens) */}
      <div className="px-4 py-3 block sm:hidden">
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <div key={`mobile-${transaction.id}`} className="border border-[#dbe0e6] rounded-lg p-4 bg-white">
              <div className="flex justify-between mb-2">
                <p className="text-[#111418] font-medium">{transaction.description}</p>
                <p className={`font-medium whitespace-nowrap ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'income' ? '+' : '-'}R$ {Math.abs(transaction.amount).toFixed(2).replace('.', ',')}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="inline-flex px-2 py-1 text-xs font-medium bg-[#f0f2f5] text-[#111418] rounded-lg">
                  {transaction.category}
                </span>
                <span className="inline-flex px-2 py-1 text-xs font-medium text-[#60748a]">
                  {transaction.account}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-[#60748a]">{transaction.displayDate}</p>
                {renderActions(transaction)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de adicionar transação */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[#111418] text-lg font-semibold">Nova Transação</h2>
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
                <label htmlFor="description" className="block text-[#60748a] text-sm mb-1">Descrição</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={newTransaction.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Compra no supermercado"
                />
              </div>
              
              <div>
                <label htmlFor="amount" className="block text-[#60748a] text-sm mb-1">Valor (R$)</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={newTransaction.amount || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0,00"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label htmlFor="type" className="block text-[#60748a] text-sm mb-1">Tipo</label>
                <select
                  id="type"
                  name="type"
                  value={newTransaction.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="income">Receita</option>
                  <option value="expense">Despesa</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-[#60748a] text-sm mb-1">Categoria</label>
                <select
                  id="category"
                  name="category"
                  value={newTransaction.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione uma categoria</option>
                  {dataService.getCategories().map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="account" className="block text-[#60748a] text-sm mb-1">Conta</label>
                <select
                  id="account"
                  name="account"
                  value={newTransaction.account}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione uma conta</option>
                  {dataService.getAccounts().map(account => (
                    <option key={account} value={account}>{account}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="date" className="block text-[#60748a] text-sm mb-1">Data</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newTransaction.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  onClick={handleAddTransaction}
                  className="px-4 py-2 bg-[#2563eb] text-white rounded-lg"
                >
                  Adicionar Transação
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de editar transação */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[#111418] text-lg font-semibold">Editar Transação</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-[#60748a] hover:text-[#111418]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="edit-description" className="block text-[#60748a] text-sm mb-1">Descrição</label>
                <input
                  type="text"
                  id="edit-description"
                  name="description"
                  value={newTransaction.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Compra no supermercado"
                />
              </div>
              
              <div>
                <label htmlFor="edit-amount" className="block text-[#60748a] text-sm mb-1">Valor (R$)</label>
                <input
                  type="number"
                  id="edit-amount"
                  name="amount"
                  value={newTransaction.amount || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0,00"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label htmlFor="edit-type" className="block text-[#60748a] text-sm mb-1">Tipo</label>
                <select
                  id="edit-type"
                  name="type"
                  value={newTransaction.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="income">Receita</option>
                  <option value="expense">Despesa</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="edit-category" className="block text-[#60748a] text-sm mb-1">Categoria</label>
                <select
                  id="edit-category"
                  name="category"
                  value={newTransaction.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione uma categoria</option>
                  {dataService.getCategories().map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="edit-account" className="block text-[#60748a] text-sm mb-1">Conta</label>
                <select
                  id="edit-account"
                  name="account"
                  value={newTransaction.account}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione uma conta</option>
                  {dataService.getAccounts().map(account => (
                    <option key={account} value={account}>{account}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="edit-date" className="block text-[#60748a] text-sm mb-1">Data</label>
                <input
                  type="date"
                  id="edit-date"
                  name="date"
                  value={newTransaction.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#dbe0e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-[#dbe0e6] rounded-lg text-[#60748a]"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEditSave}
                  className="px-4 py-2 bg-[#2563eb] text-white rounded-lg"
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,202.1a8.5,8.5,0,0,1-7.48,4.25H40.55a8.5,8.5,0,0,1-7.48-4.25,7.59,7.59,0,0,1,0-7.72L120.52,42.5a8.75,8.75,0,0,1,15,0l87.45,151.88A7.59,7.59,0,0,1,222.93,202.1ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"></path>
                </svg>
              </div>
              <h2 className="text-[#111418] text-lg font-semibold">Confirmar Exclusão</h2>
            </div>
            
            <p className="text-[#60748a] mb-6">
              Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita.
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2 border border-[#dbe0e6] rounded-lg text-[#60748a]"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions; 