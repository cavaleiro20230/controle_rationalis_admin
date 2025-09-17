
import React, { useState, useEffect } from 'react';
import { ActivityLog } from '../types';

interface ActivityLogViewProps {
  onBack: () => void;
}

const ActivityLogView: React.FC<ActivityLogViewProps> = ({ onBack }) => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
    setLogs(storedLogs);
  }, []);

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-700">Log de Atividades</h2>
            <p className="mt-1 text-gray-500">Registro de eventos importantes do sistema.</p>
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-200 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Voltar
          </button>
        </div>
        <div className="p-6">
          {logs.length === 0 ? (
            <div className="text-center py-10 text-gray-500">Nenhuma atividade registrada.</div>
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
                  {logs.map((log) => (
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
