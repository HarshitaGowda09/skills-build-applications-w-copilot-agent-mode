import { Router, Request, Response, NextFunction } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';

type Model = {
  find: () => { sort: (value: Record<string, 1 | -1>) => Promise<unknown[]> };
  create: (data: unknown) => Promise<unknown>;
};

function collectionRouter(model: Model) {
  const router = Router();

  router.get('/', async (_request: Request, response: Response, next: NextFunction) => {
    try {
      response.json(await model.find());
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request: Request, response: Response, next: NextFunction) => {
    try {
      const document = await model.create(request.body);
      response.status(201).json(document);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

const apiRouter = Router();
apiRouter.use('/users', collectionRouter(User));
apiRouter.use('/teams', collectionRouter(Team));
apiRouter.use('/activities', collectionRouter(Activity));
apiRouter.use('/leaderboard', collectionRouter(Leaderboard));
apiRouter.use('/workouts', collectionRouter(Workout));

export default apiRouter;
