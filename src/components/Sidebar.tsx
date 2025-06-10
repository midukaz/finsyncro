import React, { useState } from 'react';

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('light');
  
  // Definição dos itens do menu
  const menuItems = [
    {
      id: 'overview',
      label: 'Visão Geral',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V88H40V56Zm0,144H40V104H216v96Z"></path>
        </svg>
      ),
    },
    {
      id: 'transactions',
      label: 'Transações',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-68a28,28,0,0,1-28,28h-4v8a8,8,0,0,1-16,0v-8H104a8,8,0,0,1,0-16h36a12,12,0,0,0,0-24H116a28,28,0,0,1,0-56h4V72a8,8,0,0,1,16,0v8h16a8,8,0,0,1,0,16H116a12,12,0,0,0,0,24h24A28,28,0,0,1,168,148Z"></path>
        </svg>
      ),
    },
    {
      id: 'budgets',
      label: 'Orçamentos',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M40,106.67,128,165.33l88-58.66V176a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16ZM56,64H200a16,16,0,0,1,16,16v1.1s0,.06,0,.09L128,138.67,40,81.2V80A16,16,0,0,1,56,64Z"></path>
        </svg>
      ),
    },
    {
      id: 'goals',
      label: 'Metas',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M128,24a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,24Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,200ZM173.66,82.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,82.34ZM128,72a16,16,0,1,1-16,16A16,16,0,0,1,128,72Zm0,96a16,16,0,1,1,16-16A16,16,0,0,1,128,168Z"></path>
        </svg>
      ),
    },
    {
      id: 'reports',
      label: 'Relatórios',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-42.34-77.66a8,8,0,0,1-11.32,11.32L136,139.31V184a8,8,0,0,1-16,0V139.31l-10.34,10.35a8,8,0,0,1-11.32-11.32l24-24a8,8,0,0,1,11.32,0Z"></path>
        </svg>
      ),
    },
  ];

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    if (!isUserMenuOpen) {
      setIsThemeMenuOpen(false);
    }
  };

  const toggleThemeMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsThemeMenuOpen(!isThemeMenuOpen);
  };

  const handleThemeChange = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode);
    setIsThemeMenuOpen(false);
    setIsUserMenuOpen(false);
    // Aqui você pode implementar a lógica para alterar o tema da aplicação
  };

  const handleLogout = () => {
    // Implementar lógica de logout
    console.log('Logout');
  };

  return (
    <div className="flex flex-col h-full w-[280px] bg-white pt-4 pb-2">
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        {/* Logo do FinSyncro */}
        <div className="mb-8 mt-2">
          <h1 className="text-2xl font-bold text-blue-600">FinSyncro</h1>
          <p className="text-xs text-gray-500">Gerenciamento financeiro inteligente</p>
        </div>

        {/* Itens do menu */}
        <div className="flex flex-col gap-1 overflow-y-auto hide-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center gap-3 w-full rounded-lg px-3 py-2 ${
                activeItem === item.id
                  ? 'text-[#2563eb] bg-[#eef2ff]'
                  : 'text-[#60748a] hover:text-[#1f2937] hover:bg-[#f5f7fa]'
              }`}
              onClick={() => onItemClick(item.id)}
            >
              <span className="size-6 flex justify-center items-center">{item.icon}</span>
              <span className="text-[15px] font-normal leading-normal">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Footer com foto de perfil */}
      <div className="p-4 pt-2 relative">
        <div 
          className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          onClick={toggleUserMenu}
        >
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDuWtbnxy5h-w63nc-lIftAyVfya35mqHODVXrbrxqLe6nM9B7StIjlxcDg6FojqAhRUfR2DsmWSXqR2nrn6gmpBVx9INhQf_4p9sb-cFbTPZfX-1YwSLIIJJyDSry93k-PZMconaQsXDI7MPF_8piF3yMeDAvCLdGrAIGrIPjIYiTsTPODyXxZ-pRYkXU8TRrev3hvGF4YABMkIPq4af2sVHALCe4ek_P_8zAuwXprqVy9P8E3H8V_kMCz3VTHzjULJj15pgPMWA")'
            }}
          ></div>
          <div className="flex flex-col w-full overflow-hidden">
            <h1 className="text-[#111418] text-base font-medium leading-normal">Olivia</h1>
            <p className="text-[#60748a] text-sm font-normal leading-normal">olivia@mail.com</p>
          </div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20px" 
            height="20px" 
            fill="currentColor" 
            viewBox="0 0 256 256" 
            className={`text-gray-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
          >
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm33.66,137.66a8,8,0,0,1-11.32,0L128,139.31l-22.34,22.35a8,8,0,0,1-11.32-11.32l28-28a8,8,0,0,1,11.32,0l28,28A8,8,0,0,1,161.66,161.66Z"></path>
          </svg>
        </div>

        {/* Menu dropdown do usuário */}
        {isUserMenuOpen && (
          <div className="absolute bottom-full left-0 right-0 mb-2 mx-4 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10">
            <div className="py-1">
              <button 
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                </svg>
                Perfil
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
                </svg>
                Configuração
              </button>
              
              {/* Opção de tema com submenu */}
              <div className="relative">
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                  onClick={toggleThemeMenu}
                >
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M240,96a8,8,0,0,1-8,8H216v24a8,8,0,0,1-16,0V104H184a8,8,0,0,1,0-16h16V72a8,8,0,0,1,16,0V88h16A8,8,0,0,1,240,96ZM144,56h8v8a8,8,0,0,0,16,0V56h8a8,8,0,0,0,0-16h-8V32a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16Zm72.77,97a8,8,0,0,1,1.43,11.2A96,96,0,1,1,91.8,37.8a8,8,0,1,1,12.4,10.11,80,80,0,1,0,101.57,94.66A8,8,0,0,1,216.77,153Z"></path>
                    </svg>
                    Tema
                  </div>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16px" 
                    height="16px" 
                    fill="currentColor" 
                    viewBox="0 0 256 256" 
                    className={`text-gray-500 transition-transform ${isThemeMenuOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                  </svg>
                </button>
                
                {/* Submenu de temas */}
                {isThemeMenuOpen && (
                  <div className="bg-gray-50 px-4 py-2">
                    <div className="flex flex-col gap-1 pl-6">
                      <button 
                        className={`w-full text-left px-2 py-1 text-sm rounded ${themeMode === 'light' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => handleThemeChange('light')}
                      >
                        Claro
                      </button>
                      <button 
                        className={`w-full text-left px-2 py-1 text-sm rounded ${themeMode === 'dark' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => handleThemeChange('dark')}
                      >
                        Escuro
                      </button>
                      <button 
                        className={`w-full text-left px-2 py-1 text-sm rounded ${themeMode === 'system' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => handleThemeChange('system')}
                      >
                        Sistema
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200">
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L196.69,120H104a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,221.66,122.34Z"></path>
                  </svg>
                  Sair
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar; 