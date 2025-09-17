
import React from 'react';
import { User } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { LogIcon } from './icons/LogIcon';
import { LogoutIcon } from './icons/LogoutIcon';

interface HeaderProps {
  currentUser: User;
  onAddUser: () => void;
  onShowLogs: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onAddUser, onShowLogs, onLogout }) => {
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
        <div className="flex items-center space-x-4">
            <div className="text-right">
                <p className="text-sm font-medium text-gray-800">Bem-vindo, {currentUser.username}</p>
                <p className="text-xs text-gray-500">{currentUser.role}</p>
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={onShowLogs}
                    className="flex items-center space-x-2 bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    title="Ver Logs"
                >
                    <LogIcon className="w-5 h-5" />
                    <span className="hidden md:inline">Logs</span>
                </button>
                <button
                onClick={onAddUser}
                className="flex items-center space-x-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                title="Adicionar Usuário"
                >
                <PlusIcon className="w-5 h-5" />
                <span className="hidden md:inline">Adicionar</span>
                </button>
                <button
                onClick={onLogout}
                className="flex items-center space-x-2 bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                title="Sair"
                >
                <LogoutIcon className="w-5 h-5" />
                <span className="hidden md:inline">Sair</span>
                </button>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
