import { Request, Response, NextFunction } from 'express';

export function validatePokemonParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id, name, limit, offset } = req.query;

  if (id !== undefined && (isNaN(Number(id)) || Number(id) <= 0)) {
    return res.status(400).json({ error: 'ID must be a positive number.' });
  }

  if (name !== undefined && typeof name !== 'string') {
    return res.status(400).json({ error: 'Name must be a string.' });
  }
  if (name !== undefined && String(name).trim() === '') {
    return res.status(400).json({ error: 'Name cannot be empty.' });
  }

  if (limit !== undefined && (isNaN(Number(limit)) || Number(limit) <= 0)) {
    return res.status(400).json({ error: 'Limit must be a positive number.' });
  }
  if (offset !== undefined && (isNaN(Number(offset)) || Number(offset) < 0)) {
    return res
      .status(400)
      .json({ error: 'Offset must be zero or a positive number.' });
  }

  next();
}
