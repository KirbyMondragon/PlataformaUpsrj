import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Card, CardContent, CardActions, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://hook.us1.make.com/88w29h3pcwetqbbm16tp1sudcu8hdn1q', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      setMessage('Login successful');
      onLogin();
      navigate('/'); // Redirigir a la lista de doctores
    } else {
      setMessage(data.error);
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup'); // Redirigir a la página de registro
  };

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1877F2' }}>MedicPlus</Typography>
            <Typography variant="h5" sx={{ mt: 2 }}>Andresiño division of medical group</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h1" gutterBottom align="center">
                Iniciar sesión
              </Typography>
              {message && <Typography color="error" align="center">{message}</Typography>}
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Correo electrónico "
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label="Contraseña"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                />
                <CardActions sx={{ justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
                  <Button type="submit" variant="contained" color="primary" fullWidth sx={{ bgcolor: '#1877F2' }}>
                    Iniciar sesión
                  </Button>
                  <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }} onClick={handleSignUpRedirect}>
                    Crear cuenta nueva
                  </Button>
                </CardActions>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
