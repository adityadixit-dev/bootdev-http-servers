import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "./custom-errors.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`Error in Request from ${req.url}`);
  console.log(err.message);

  if (err instanceof BadRequestError) {
    res.status(err.statusCode).json({
      error: `${err.message}`,
    });
  } else {
    res.status(500).json({
      error: "Something went wrong on our end",
    });
  }

  next();
}

// use asyncErrHandler(handlerFunction)
// return type of asyncErrHandler = (req,res,next)=>Promise<void>
// input type of asyncErrHandler = (req,res)=>Promise<void>
//

type HandlerFunction = (req: Request, res: Response) => Promise<void>;

export function asyncErrHandler(handlerFn: HandlerFunction) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await handlerFn(req, res);
    } catch (err) {
      next(err);
    }
  };
}
