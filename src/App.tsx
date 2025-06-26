import React from 'react';
import Button from './components/Button';
import UserCard from './components/UserCard';
import useToggle from './hooks/useToggle';
import { useArray } from './hooks/useArray';
import { User, Status } from './types';

const App: React.FC = () => {
  const [showUsers, toggleUsers] = useToggle();
  const { array: users, push } = useArray<User>([]);

  const status: Status = "success"; // Union type in use

  const addUser = () => {
    const newUser: User = {
      id: users.length + 1,
      name: `User ${users.length + 1}`,
      email: `user${users.length + 1}@mail.com`
    };
    push(newUser);
  };

  return (
    <div>
      <h1>React + TypeScript Demo</h1>
      <p>Status: {status}</p>
      <Button label="Toggle Users" onClick={toggleUsers} />
      <Button label="Add User" onClick={addUser} />

      {showUsers && (
        <div>
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
