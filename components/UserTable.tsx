
import React from 'react';
import { User, Role } from '../types';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { KeyIcon } from './icons/KeyIcon';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onResetPassword: (user: User) => void;
}

const roleColors: Record<Role, string> = {
  [Role.Superintendente]: 'bg-red-100 text-red-800',
  [Role.Gerente]: 'bg-blue-100 text-blue-800',
  [Role.Coordenador]: 'bg-yellow-100 text-yellow-800',
  [Role.Colaborador]: 'bg-green-100 text-green-800',
};

const RoleBadge: React.FC<{ role: Role }> = ({ role }) => {
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${roleColors[role]}`}>
      {role}
    </span>
  );
};

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete, onResetPassword }) => {
  if (users.length === 0) {
    return <div className="text-center py-10 text-gray-500">Nenhum usuário encontrado.</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usuário
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Permissão
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{user.username}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <RoleBadge role={user.role} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.forcePasswordChange ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Senha Temporária
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Ativo
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-3">
                  <button onClick={() => onResetPassword(user)} className="text-yellow-600 hover:text-yellow-900 transition-colors" title="Redefinir Senha">
                    <KeyIcon className="w-5 h-5" />
                  </button>
                  <button onClick={() => onEdit(user)} className="text-blue-600 hover:text-blue-900 transition-colors" title="Editar Usuário">
                    <EditIcon className="w-5 h-5" />
                  </button>
                  <button onClick={() => onDelete(user)} className="text-red-600 hover:text-red-900 transition-colors" title="Excluir Usuário">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
