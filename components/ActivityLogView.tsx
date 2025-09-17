import React, { useState, useEffect, useMemo } from 'react';
import { ActivityLog } from '../types';

interface ActivityLogViewProps {
  onBack: () => void;
}

const ACTION_TYPES = [
  'Login',
  'Logout',
  'Usuário Criado',
  'Usuário Excluído',
  'Senha Redefinida',
];

const ActivityLogView: React.FC<ActivityLogViewProps> = ({ onBack }) => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [filterAction, setFilterAction] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    setLogs(storedLogs);
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const actionMatch = filterAction ? log.action === filterAction : true;
      // Compare only the date part (YYYY-MM-DD) of the timestamp
      const dateMatch = filterDate ? log.timestamp.startsWith(filterDate) : true;
      return actionMatch && dateMatch;
    });
  }, [logs, filterAction, filterDate]);
  
  const handleClearFilters = () => {
    setFilterAction('');
    setFilterDate('');
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-700">Log de Atividades</h2>
            <p className="mt-1 text-gray-500">Filtre e visualize os eventos importantes do sistema.</p>
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-200 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Voltar
          </button>
        </div>

        <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                    <label htmlFor="action-filter" className="block text-sm font-medium text-gray-700 mb-1">
                        Filtrar por Ação
                    </label>
                    <select
                        id="action-filter"
                        value={filterAction}
                        onChange={(e) => setFilterAction(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                        <option value="">Todas as Ações</option>
                        {ACTION_TYPES.map(action => (
                            <option key={action} value={action}>{action}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
                        Filtrar por Data
                    </label>
                    <input
                        type="date"
                        id="date-filter"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <button
                        onClick={handleClearFilters}
                        className="w-full md:w-auto px-4 py-2 bg-white text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Limpar Filtros
                    </button>
                </div>
            </div>
        </div>

        <div className="p-6">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              {logs.length > 0 ? "Nenhuma atividade encontrada com os filtros aplicados." : "Nenhuma atividade registrada."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ação
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuário Alvo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data e Hora
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.action}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.targetUsername}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(log.timestamp).toLocaleString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ActivityLogView;