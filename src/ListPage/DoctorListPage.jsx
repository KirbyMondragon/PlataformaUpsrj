import React from 'react';
import DoctorList from './DoctorList';
import { Container, Typography } from '@mui/material';

const DoctorListPage = () => {
  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Doctores registrados
      </Typography>
      <DoctorList />
    </Container>
  );
};

export default DoctorListPage;
