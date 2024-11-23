import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Header from './Header.jsx';
import { UserList } from './UserList.jsx';
import { NotFound } from './NotFound.jsx';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
