import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Grid, Card, CardContent, CardActions, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const DoctorList = () => {
  const [doctores, setDoctores] = useState([]);
  const [filteredDoctores, setFilteredDoctores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [editDoctor, setEditDoctor] = useState(null);

  useEffect(() => {
    fetchDoctores();
  }, []);

  useEffect(() => {
    setFilteredDoctores(
      doctores.filter((doctor) =>
        doctor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, doctores]);

  const fetchDoctores = async () => {
    try {
      const response = await fetch('http://localhost:3034/visitantes');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDoctores(data);
    } catch (error) {
      setError(error);
      console.error('Error fetching doctores:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(`Attempting to delete doctor with id: ${id}`);
      const response = await fetch(`http://localhost:3034/visitantes/${id}`, {
        method: 'DELETE',
      });
      console.log(`Delete response status: ${response.status}`);
      if (!response.ok) {
        console.error(`Failed to delete doctor with id: ${id}, status: ${response.status}`);
        throw new Error('Network response was not ok');
      }
      console.log(`Doctor with id: ${id} successfully deleted`);
      fetchDoctores();
    } catch (error) {
      setError(error);
      console.error('Error deleting doctor:', error);
    }
  };

  const handleEdit = (doctor) => {
    setEditDoctor(doctor);
  };

  const handleClose = () => {
    setEditDoctor(null);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3034/visitantes/${editDoctor._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editDoctor),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchDoctores();
      handleClose();
    } catch (error) {
      setError(error);
      console.error('Error updating doctor:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditDoctor((prevDoctor) => ({ ...prevDoctor, [name]: value }));
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
       
      </Typography>
      {error && <Typography color="error">Error: {error.message}</Typography>}
      <TextField
        label="Buscar Doctor"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Grid container spacing={3}>
        {filteredDoctores.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {doctor.nombre}
                </Typography>
                <Typography color="textSecondary">
                  Email: {doctor.email}
                </Typography>
                <Typography color="textSecondary">
                  Teléfono: {doctor.telefono}
                </Typography>
                <Typography color="textSecondary">
                  Fecha de Registro: {new Date(doctor.fechaRegistro).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(doctor)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(doctor._id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!editDoctor} onClose={handleClose}>
        <DialogTitle>Editar Doctor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edita los campos del doctor y guarda los cambios.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Nombre"
            type="text"
            fullWidth
            name="nombre"
            value={editDoctor?.nombre || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            name="email"
            value={editDoctor?.email || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Teléfono"
            type="text"
            fullWidth
            name="telefono"
            value={editDoctor?.telefono || ''}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DoctorList;
