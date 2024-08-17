import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Card, CardContent, CardActions, Link, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3034/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage('User created successfully');
      navigate('/login'); // Redirigir a la página de inicio de sesión después de registrarse
    } else {
      setMessage(data.error);
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid item xs={false} md={6} sx={{
        backgroundImage: 'url(https://images.pexels.com/photos/7089032/pexels-photo-7089032.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />
      <Grid item xs={12} md={6} container alignItems="center" justifyContent="center">
        <Container maxWidth="sm">
          <Card>
            <CardContent>
              <Typography variant="h5" component="h1" gutterBottom align="center">
                Registro
              </Typography>
              {message && <Typography color="error" align="center">{message}</Typography>}
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                />
                <CardActions sx={{ justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
                  <Button type="submit" variant="contained" color="primary" fullWidth sx={{ bgcolor: '#1877F2' }}>
                    Registrarme
                  </Button>
                  <Link href="/login" underline="none" sx={{ color: '#1877F2', fontSize: '14px', mt: 2 }}>
                    ¿Ya tienes una cuenta? Iniciar sesión
                  </Link>
                </CardActions>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Grid>
    </Grid>
  );
};

export default SignUp;
