// src/components/MenuBar.js
import React from 'react';
import { Button, AppBar, Toolbar, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function MenuBar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Container sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {/* Other content, if any, can go here */}

          {/* Menu buttons aligned to the right */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Button
              component={Link}
              to="/students"
              variant="contained"
              color="primary"
              sx={{
                margin: '0 10px',
                padding: '10px 20px',
                borderRadius: '5px',
                '&:hover': {
                  backgroundColor: '#1976d2', // Custom hover color
                },
              }}
            >
              Students
            </Button>

            <Button
              component={Link}
              to="/faculties"
              variant="contained"
              color="secondary"
              sx={{
                margin: '0 10px',
                padding: '10px 20px',
                borderRadius: '5px',
                '&:hover': {
                  backgroundColor: '#d32f2f', // Custom hover color
                },
              }}
            >
              Faculties
            </Button>

            <Button
              component={Link}
              to="/add"
              variant="contained"
              color="success"
              sx={{
                margin: '0 10px',
                padding: '10px 20px',
                borderRadius: '5px',
                '&:hover': {
                  backgroundColor: '#388e3c', // Custom hover color
                },
              }}
            >
              Add
            </Button>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default MenuBar;
