import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Card, CardContent, CardActions, Link, Grid, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlertMessage('Por favor, ingrese un correo electrónico válido.');
      setAlertSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    const response = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setAlertMessage('Usuario creado con éxito');
      setAlertSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/login'); // Redirigir a la página de inicio de sesión después de un breve tiempo
      }, 2000);
    } else {
      setAlertMessage(data.error || 'Error en el registro. Intente de nuevo.');
      setAlertSeverity('error');
      setOpenSnackbar(true);
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
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Correo Electrónico"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

      {/* Snackbar para mostrar alertas */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default SignUp;
