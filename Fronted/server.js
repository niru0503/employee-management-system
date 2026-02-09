const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const port = 8080;
const SECRET_KEY = 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Load users from db.json
function getUsers() {
  const dbPath = path.join(__dirname, 'db.json');
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  return data.users || [];
}

// Load employees from db.json
function getEmployees() {
  const dbPath = path.join(__dirname, 'db.json');
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  return data.employees || [];
}

// Save data to db.json
function saveData(data) {
  const dbPath = path.join(__dirname, 'db.json');
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

// Login endpoint
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required',
      data: null,
      timestamp: new Date().toISOString()
    });
  }

  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
      data: null,
      timestamp: new Date().toISOString()
    });
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: '24h' }
  );

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      username: user.username,
      email: user.email,
      id: user.id
    },
    timestamp: new Date().toISOString()
  });
});

// Get all employees
app.get('/api/employees', (req, res) => {
  const employees = getEmployees();
  res.json({
    success: true,
    message: 'Employees fetched',
    data: employees,
    timestamp: new Date().toISOString()
  });
});

// Get employee by ID
app.get('/api/employees/:id', (req, res) => {
  const employees = getEmployees();
  const employee = employees.find(e => e.id === parseInt(req.params.id));
  
  if (!employee) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found',
      data: null,
      timestamp: new Date().toISOString()
    });
  }

  res.json({
    success: true,
    message: 'Employee fetched',
    data: employee,
    timestamp: new Date().toISOString()
  });
});

// Create employee
app.post('/api/employees', (req, res) => {
  const { name, email, department, salary } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required',
      data: null,
      timestamp: new Date().toISOString()
    });
  }

  const dbPath = path.join(__dirname, 'db.json');
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  const nextId = data.employees.length > 0 
    ? Math.max(...data.employees.map(e => e.id)) + 1 
    : 1;

  const newEmployee = {
    id: nextId,
    name,
    email,
    department: department || '',
    salary: salary || 0
  };

  data.employees.push(newEmployee);
  saveData(data);

  res.status(201).json({
    success: true,
    message: 'Employee created',
    data: newEmployee,
    timestamp: new Date().toISOString()
  });
});

// Update employee
app.put('/api/employees/:id', (req, res) => {
  const { name, email, department, salary } = req.body;
  const dbPath = path.join(__dirname, 'db.json');
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  const employee = data.employees.find(e => e.id === parseInt(req.params.id));

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found',
      data: null,
      timestamp: new Date().toISOString()
    });
  }

  if (name) employee.name = name;
  if (email) employee.email = email;
  if (department !== undefined) employee.department = department;
  if (salary !== undefined) employee.salary = salary;

  saveData(data);

  res.json({
    success: true,
    message: 'Employee updated',
    data: employee,
    timestamp: new Date().toISOString()
  });
});

// Delete employee
app.delete('/api/employees/:id', (req, res) => {
  const dbPath = path.join(__dirname, 'db.json');
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  const index = data.employees.findIndex(e => e.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found',
      data: null,
      timestamp: new Date().toISOString()
    });
  }

  const deletedEmployee = data.employees.splice(index, 1)[0];
  saveData(data);

  res.json({
    success: true,
    message: 'Employee deleted',
    data: deletedEmployee,
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
  console.log(`\nDemo credentials: admin / admin123`);
});
