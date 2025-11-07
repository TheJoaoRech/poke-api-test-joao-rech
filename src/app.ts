import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pokemonRoutes from './routes/pokemonRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/pokemon', pokemonRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Pokemon API is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api/pokemon`);
});

export default app;
