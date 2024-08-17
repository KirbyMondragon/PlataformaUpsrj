import React from 'react';
import AddDoctor from './AddDoctor';
import { Container, Typography } from '@mui/material';

const AddDoctorPage = () => {
  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Agregar Doctor
      </Typography>
      <AddDoctor />
    </Container>
  );
};

export default AddDoctorPage;
