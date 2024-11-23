import './App.css';
import { Button, HStack } from '@chakra-ui/react';
import Login from './Login.jsx';
import Header from './Header.jsx';
import { UserList } from './UserList.jsx';
import { NotFound } from './NotFound.jsx';

function App() {
  return (
    <>
      <Header />
      <Login />
      <UserList />
      <NotFound />
    </>
  );
}

export default App;
