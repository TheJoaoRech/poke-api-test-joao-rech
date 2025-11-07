import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import pokemonRoutes from './routes/pokemonRoutes';

const app = express();
const PORT = process.env.PORT;
const API_BASE_PATH = process.env.API_BASE_PATH;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Too many requests, please try again later!',
  },
});

app.use(limiter);
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(morgan('dev'));

app.use(`${API_BASE_PATH}/pokemon`, pokemonRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Pokemon API is running!' });
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}!`);
});

export default app;
