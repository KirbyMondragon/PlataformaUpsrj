import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const AddDoctor = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [empleado, setEmpleado] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3034/visitantes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, email, telefono, empleado }),
    });
    if (response.ok) {
      alert('Doctor agregado correctamente');
      setNombre('');
      setEmail('');
      setTelefono('');
      setEmpleado('');
    } else {
      alert('Error al agregar el doctor');
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Panel de Administración
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Nombre" variant="outlined" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <TextField label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        <TextField label="Teléfono" variant="outlined" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        <Button type="submit" variant="contained" color="primary">
          Agregar Doctor
        </Button>
      </Box>
    </Container>
  );
};

export default AddDoctor;
