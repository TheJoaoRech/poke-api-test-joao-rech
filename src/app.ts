import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pokemonRoutes from './routes/pokemonRoutes';

const app = express();
const PORT = process.env.PORT;
const API_BASE_PATH = process.env.API_BASE_PATH;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.use(`${API_BASE_PATH}/pokemon`, pokemonRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Pokemon API is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(
    `📍 API available at http://localhost:${PORT}${API_BASE_PATH}/pokemon`
  );
  console.log(
    `🏥 Health check at http://localhost:${PORT}${process.env.HEALTH_CHECK_ENDPOINT}`
  );
});

export default app;
