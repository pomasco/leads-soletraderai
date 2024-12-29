import { Router } from 'express';
import { z } from 'zod';
import { ValidationError } from '../utils/errors.js';

export const organizationsRouter = Router();

// Validation schemas
const createOrganizationSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['company', 'agency']),
  country: z.string().min(2),
  businessNumber: z.string().optional()
});

// Routes
organizationsRouter.post('/', async (req, res, next) => {
  try {
    const data = createOrganizationSchema.parse(req.body);
    // Implementation coming soon
    res.status(201).json({ message: 'Organization created' });
  } catch (error) {
    next(error);
  }
});