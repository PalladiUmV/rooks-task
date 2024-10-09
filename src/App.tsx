import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import UserList from './components/UserList/UserList';
import UserProfile from './components/UserProfile/UserProfile';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserProfile />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;