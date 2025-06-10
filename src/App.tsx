import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Transactions from './components/Transactions';
import Overview from './components/Overview';
import Goals from './components/Goals';
import Budgets from './components/Budgets';
import Reports from './components/Reports';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case 'transactions':
        return <Transactions />;
      case 'overview':
        return <Overview />;
      case 'budgets':
        return <Budgets />;
      case 'goals':
        return <Goals />;
      case 'reports':
        return <Reports />;
      default:
        return <Overview />;
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-white" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-[#dbe0e6] z-10">
        <div className="flex items-center gap-3">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDuWtbnxy5h-w63nc-lIftAyVfya35mqHODVXrbrxqLe6nM9B7StIjlxcDg6FojqAhRUfR2DsmWSXqR2nrn6gmpBVx9INhQf_4p9sb-cFbTPZfX-1YwSLIIJJyDSry93k-PZMconaQsXDI7MPF_8piF3yMeDAvCLdGrAIGrIPjIYiTsTPODyXxZ-pRYkXU8TRrev3hvGF4YABMkIPq4af2sVHALCe4ek_P_8zAuwXprqVy9P8E3H8V_kMCz3VTHzjULJj15pgPMWA")'
            }}
          ></div>
          <h1 className="text-[#111418] text-base font-medium leading-normal">Olivia</h1>
        </div>
        <button 
          onClick={toggleMobileMenu}
          className="p-2 text-[#111418]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMobileMenu}></div>
      )}

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-[#dbe0e6] flex justify-between items-center">
          <h2 className="text-[#111418] font-semibold">Menu</h2>
          <button onClick={toggleMobileMenu} className="p-2 text-[#111418]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
            </svg>
          </button>
        </div>
        <div className="p-4">
          <Sidebar activeItem={activeView} onItemClick={(item) => { setActiveView(item); setIsMobileMenuOpen(false); }} />
        </div>
      </div>

      {/* Desktop Layout - Centralizado */}
      <div className="hidden md:flex justify-center h-full pt-6">
        <div className="flex max-w-7xl w-full h-full">
          {/* Desktop Sidebar */}
          <div className="h-full">
            <Sidebar activeItem={activeView} onItemClick={setActiveView} />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 px-8 py-10 overflow-y-auto hide-scrollbar">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
