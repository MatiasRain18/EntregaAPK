const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tellevoapp'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

// API para obtener usuarios
app.get('/api/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API para crear un usuario
app.post('/api/usuarios', (req, res) => {
  const nuevoUsuario = req.body;
  db.query('INSERT INTO usuarios SET ?', nuevoUsuario, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Usuario creado', id: result.insertId });
  });
});

app.post('/api/viajes', (req, res) => {
  const { conductor_id, destino, costo, asientos_disponibles, hora_salida, fecha } = req.body;
  
  const query = 'INSERT INTO viajes (conductor_id, destino, costo, asientos_disponibles, hora_salida, fecha) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [conductor_id, destino, costo, asientos_disponibles, hora_salida, fecha], (error, results) => {
    if (error) {
      console.error('Error al crear viaje:', error);
      return res.status(500).json({ error: 'Error al crear el viaje' });
    }
    res.status(201).json({ message: 'Viaje creado con éxito', id: results.insertId });
  });
});



// API para obtener viajes
app.get('/api/viajes', (req, res) => {
  db.query('SELECT * FROM viajes', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Ruta para crear un viaje
app.post('/api/viajes', (req, res) => {
  const { conductor_id, destino, costo, asientos_disponibles, hora_salida, fecha } = req.body;
  
  const query = 'INSERT INTO viajes (conductor_id, destino, costo, asientos_disponibles, hora_salida, fecha) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [conductor_id, destino, costo, asientos_disponibles, hora_salida, fecha], (error, results) => {
    if (error) {
      console.error('Error al crear viaje:', error);
      return res.status(500).json({ error: 'Error al crear el viaje' });
    }
    res.status(201).json({ message: 'Viaje creado con éxito', id: results.insertId });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.post('/api/usuarios/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM usuarios WHERE username = ?', [username], (err, results) => {
    if (err) throw err;
    if (results.length > 0 && results[0].password === password) {
      res.json({ success: true, user: results[0] });
    } else {
      res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  });
});

// API para crear una reserva
app.post('/api/reservas', (req, res) => {
  const { viaje_id, pasajero_id } = req.body;

  const viajeQuery = 'SELECT * FROM viajes WHERE id = ?';
  const pasajeroQuery = 'SELECT * FROM usuarios WHERE id = ?';

  db.query(viajeQuery, [viaje_id], (err, viajeResult) => {
    if (err) {
      console.error('Error en la consulta del viaje:', err);
      return res.status(500).json({ error: 'Error en la consulta del viaje' });
    }
    if (viajeResult.length === 0) return res.status(404).json({ error: 'Viaje no encontrado' });

    db.query(pasajeroQuery, [pasajero_id], (err, pasajeroResult) => {
      if (err) {
        console.error('Error en la consulta del pasajero:', err);
        return res.status(500).json({ error: 'Error en la consulta del pasajero' });
      }
      if (pasajeroResult.length === 0) return res.status(404).json({ error: 'Pasajero no encontrado' });

      // Crear la reserva
      const insertQuery = 'INSERT INTO reservas (viaje_id, pasajero_id) VALUES (?, ?)';
      db.query(insertQuery, [viaje_id, pasajero_id], (err, result) => {
        if (err) {
          console.error('Error al crear la reserva:', err);
          return res.status(500).json({ error: 'Error al crear la reserva' });
        }
        res.json({ message: 'La reserva se hizo exitosamente', id: result.insertId });
      });
    });
  });
});


