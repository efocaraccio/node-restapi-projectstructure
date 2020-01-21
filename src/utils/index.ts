import { Router, Request, Response, NextFunction } from "express";

type Wrapper = ((router: Router) => void);

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

type Route = {
  path: string;
  method: string;
  handler: Handler | Handler[];
};

// Iterates every function. 
export const applyMiddleware = (
  middleware: Wrapper[],
  router: Router
) => {
  for (const f of middleware) {
    f(router);
  }
};

//Iterates every route and add it
export const applyRoutes = (routes: Route[], router: Router) => {
  for (const route of routes) { 

    // Destructuring
    const { method, path, handler } = route;
    
    // Adds every endpoint to the router with it corresponding method (get,post,put,..) 
    (router as any)[method](path, handler);
  }
};