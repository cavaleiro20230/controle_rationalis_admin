
import React from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { LogIcon } from './icons/LogIcon';

interface HeaderProps {
  onAddUser: () => void;
  onShowLogs: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddUser, onShowLogs }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 013 5.197M15 21a6 6 0 00-9-5.197" />
                </svg>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Sistema de Administração</h1>
        </div>
        <div className="flex items-center space-x-2">
            <button
                onClick={onShowLogs}
                className="flex items-center space-x-2 bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
                <LogIcon className="w-5 h-5" />
                <span className="hidden md:inline">Ver Logs</span>
            </button>
            <button
            onClick={onAddUser}
            className="flex items-center space-x-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
            <PlusIcon className="w-5 h-5" />
            <span className="hidden md:inline">Adicionar Usuário</span>
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
