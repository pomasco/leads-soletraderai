import { Router } from 'express';
import { organizationsRouter } from './organizations.js';
import { rolesRouter } from './roles.js';
import { verificationRouter } from './verification.js';

export const apiRouter = Router();

apiRouter.use('/organizations', organizationsRouter);
apiRouter.use('/roles', rolesRouter);
apiRouter.use('/verification', verificationRouter);