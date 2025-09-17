
import React, { useState, useEffect } from 'react';
import { User, Role } from '../types';

interface UserModalProps {
  user: User | null;
  onClose: () => void;
  onSave: (user: Omit<User, 'id'> & { id?: number }) => void;
  roles: Role[];
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose, onSave, roles }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>(roles[roles.length - 1]); // Default to the last role
  const [forcePasswordChange, setForcePasswordChange] = useState(true);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setRole(user.role);
      setForcePasswordChange(user.forcePasswordChange);
      setPassword(''); // Password field is always cleared for editing
    } else {
      // Reset for new user
      setUsername('');
      setEmail('');
      setPassword('');
      setRole(roles[roles.length - 1]);
      setForcePasswordChange(true);
    }
  }, [user, roles]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === null && !password) {
      alert("A senha é obrigatória para novos usuários.");
      return;
    }
    onSave({ id: user?.id, username, email, role, forcePasswordChange });
  };

  const isNewUser = user === null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 transform transition-transform scale-100" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">{isNewUser ? 'Adicionar Novo Usuário' : 'Editar Usuário'}</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nome de Usuário
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha {isNewUser ? '(Obrigatória)' : '(Deixe em branco para não alterar)'}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={isNewUser}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Permissão
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <input
                id="forcePasswordChange"
                type="checkbox"
                checked={forcePasswordChange}
                onChange={(e) => setForcePasswordChange(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="forcePasswordChange" className="ml-2 block text-sm text-gray-900">
                Exigir troca de senha no próximo login
              </label>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-sm font-medium text-white border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
