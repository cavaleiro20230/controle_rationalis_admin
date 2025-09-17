
import React, { useState, useMemo, useCallback } from 'react';
import { User, Role, ActivityLog } from './types';
import { ROLES } from './constants';
import Header from './components/Header';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';
import SearchBar from './components/SearchBar';
import ConfirmationModal from './components/ConfirmationModal';
import ActivityLogView from './components/ActivityLogView';

const initialUsers: User[] = [
  { id: 1, username: 'ana.silva', email: 'ana.silva@example.com', role: Role.Superintendente, forcePasswordChange: false },
  { id: 2, username: 'bruno.costa', email: 'bruno.costa@example.com', role: Role.Gerente, forcePasswordChange: true },
  { id: 3, username: 'carla.dias', email: 'carla.dias@example.com', role: Role.Coordenador, forcePasswordChange: false },
  { id: 4, username: 'daniel.gomes', email: 'daniel.gomes@example.com', role: Role.Colaborador, forcePasswordChange: false },
  { id: 5, username: 'eliana.faria', email: 'eliana.faria@example.com', role: Role.Gerente, forcePasswordChange: false },
  { id: 6, username: 'fabio.lima', email: 'fabio.lima@example.com', role: Role.Colaborador, forcePasswordChange: true },
];

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'users' | 'logs'>('users');

  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToReset, setUserToReset] = useState<User | null>(null);

  const logActivity = useCallback((action: string, targetUsername: string) => {
    try {
      const newLog: ActivityLog = {
        id: `log-${Date.now()}-${Math.random()}`,
        action,
        targetUsername,
        timestamp: new Date().toISOString(),
      };
      const existingLogs: ActivityLog[] = JSON.parse(localStorage.getItem('activityLogs') || '[]');
      // Prepend new logs and keep the list to a reasonable size (e.g., 100 entries)
      const updatedLogs = [newLog, ...existingLogs].slice(0, 100);
      localStorage.setItem('activityLogs', JSON.stringify(updatedLogs));
    } catch (error) {
      console.error("Failed to write to activity log:", error);
    }
  }, []);

  const filteredUsers = useMemo(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    return users.filter(user =>
      user.username.toLowerCase().includes(lowercasedFilter) ||
      user.email.toLowerCase().includes(lowercasedFilter)
    );
  }, [users, searchTerm]);

  const handleOpenModal = useCallback((user: User | null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingUser(null);
  }, []);

  const handleSaveUser = useCallback((user: Omit<User, 'id'> & { id?: number }) => {
    if (user.id) {
      // Edit user
      setUsers(prevUsers =>
        prevUsers.map(u => (u.id === user.id ? { ...u, ...user } as User : u))
      );
    } else {
      // Add user
      const newUser: User = {
        ...(user as Omit<User, 'id'>),
        id: Math.max(...users.map(u => u.id), 0) + 1,
      };
      setUsers(prevUsers => [...prevUsers, newUser]);
      logActivity('Usuário Criado', newUser.username);
    }
    handleCloseModal();
  }, [users, handleCloseModal, logActivity]);

  const handleDeleteUser = useCallback((user: User) => {
    setUserToDelete(user);
  }, []);

  const confirmDelete = useCallback(() => {
    if (userToDelete) {
      logActivity('Usuário Excluído', userToDelete.username);
      setUsers(prevUsers => prevUsers.filter(u => u.id !== userToDelete.id));
      setUserToDelete(null);
    }
  }, [userToDelete, logActivity]);

  const handleResetPassword = useCallback((user: User) => {
    setUserToReset(user);
  }, []);

  const confirmResetPassword = useCallback(() => {
    if(userToReset){
      alert(`Senha para o usuário '${userToReset.username}' foi redefinida para 'FEMAR@${new Date().getFullYear()}'. O usuário precisará alterá-la no próximo login.`);
      logActivity('Senha Redefinida', userToReset.username);
      setUsers(prevUsers => prevUsers.map(u => u.id === userToReset.id ? {...u, forcePasswordChange: true} : u));
      setUserToReset(null);
    }
  }, [userToReset, logActivity]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header 
        onAddUser={() => handleOpenModal(null)} 
        onShowLogs={() => setCurrentView('logs')}
      />
      
      {currentView === 'users' ? (
        <main className="container mx-auto p-4 md:p-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-700">Gerenciamento de Usuários</h2>
              <p className="mt-1 text-gray-500">
                Adicione, edite e gerencie as permissões dos usuários do sistema.
              </p>
            </div>
            <div className="p-6">
              <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
              <UserTable
                users={filteredUsers}
                onEdit={handleOpenModal}
                onDelete={handleDeleteUser}
                onResetPassword={handleResetPassword}
              />
            </div>
          </div>
        </main>
      ) : (
        <ActivityLogView onBack={() => setCurrentView('users')} />
      )}

      {isModalOpen && (
        <UserModal
          user={editingUser}
          onClose={handleCloseModal}
          onSave={handleSaveUser}
          roles={ROLES}
        />
      )}

      {userToDelete && (
         <ConfirmationModal
            isOpen={!!userToDelete}
            title="Confirmar Exclusão"
            message={`Tem certeza de que deseja excluir o usuário '${userToDelete.username}'? Esta ação não pode ser desfeita.`}
            onConfirm={confirmDelete}
            onCancel={() => setUserToDelete(null)}
            confirmButtonText="Excluir"
            confirmButtonClass="bg-red-600 hover:bg-red-700"
        />
      )}
      
      {userToReset && (
         <ConfirmationModal
            isOpen={!!userToReset}
            title="Confirmar Redefinição de Senha"
            message={`Tem certeza de que deseja redefinir a senha do usuário '${userToReset.username}'? Uma senha temporária será gerada.`}
            onConfirm={confirmResetPassword}
            onCancel={() => setUserToReset(null)}
            confirmButtonText="Redefinir"
            confirmButtonClass="bg-yellow-500 hover:bg-yellow-600"
        />
      )}
    </div>
  );
};

export default App;
