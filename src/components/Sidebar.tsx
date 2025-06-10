import React from 'react';

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
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

  return (
    <div className="flex flex-col gap-1 h-full max-h-full w-full max-w-[340px]">
      {/* Cabeçalho do sidebar com foto de perfil */}
      <div className="hidden md:flex pb-8 w-full">
        <div className="flex gap-3 items-center">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDuWtbnxy5h-w63nc-lIftAyVfya35mqHODVXrbrxqLe6nM9B7StIjlxcDg6FojqAhRUfR2DsmWSXqR2nrn6gmpBVx9INhQf_4p9sb-cFbTPZfX-1YwSLIIJJyDSry93k-PZMconaQsXDI7MPF_8piF3yMeDAvCLdGrAIGrIPjIYiTsTPODyXxZ-pRYkXU8TRrev3hvGF4YABMkIPq4af2sVHALCe4ek_P_8zAuwXprqVy9P8E3H8V_kMCz3VTHzjULJj15pgPMWA")'
            }}
          ></div>
          <div className="flex flex-col w-full overflow-hidden">
            <h1 className="text-[#111418] text-base font-medium leading-normal">Olivia</h1>
            <p className="text-[#60748a] text-sm font-normal leading-normal">olivia@mail.com</p>
          </div>
        </div>
      </div>

      {/* Itens do menu */}
      <div className="flex flex-col gap-1">
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
  );
};

export default Sidebar; 