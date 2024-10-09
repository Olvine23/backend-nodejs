import express from 'express';
import router from './router';
import morgan from 'morgan';
import { protect } from './modules/auth';
import { createUser, signIn } from './handlers/users';
import cors from 'cors';

const app = express();

// CORS setup
const corsOptions = {
  origin: 'http://localhost:4200', // Allow only requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));

// Middleware setup
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.holla = 'olaaaa';
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

app.use('/api', protect, router);

// Create new user
app.post('/user', createUser);
// Sign in user
app.post('/signin', signIn);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({ message: "Unauthorized" });
  } else if (err.type === 'input') {
    res.status(400).json({ message: "Invalid Input" });
  } else {
    res.status(500).json({ message: "Ooopsie that was on our end" });
  }
});

export default app;
