import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// バリデーションエラーをチェックするミドルウェア
const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  // const errors = await validation.run(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export default { validate };
