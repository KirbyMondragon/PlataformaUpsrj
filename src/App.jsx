import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import AddDoctorPage from './AddPage/AddDoctorPage';
import DoctorListPage from './ListPage/DoctorListPage';
import SignUp from './User/SignUp';
import Login from './User/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gestión de Doctores
          </Typography>
          {isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} to="/">Lista de Doctores</Button>
              <Button color="inherit" component={Link} to="/add">Agregar Doctor</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route exact path="/" element={isLoggedIn ? <DoctorListPage /> : <Login onLogin={handleLogin} />} />
          <Route path="/add" element={isLoggedIn ? <AddDoctorPage /> : <Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
