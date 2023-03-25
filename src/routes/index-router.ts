import express from 'express';
import { Request, Response } from 'express';

export default function IndexRouter() {
  const router = express.Router()
  router.get('/', async (req: Request, res: Response) => {
      res.send('This is Library backoffice app');
  });
  return router;
}