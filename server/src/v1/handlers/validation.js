const { body, validationResult } = require("express-validator");

// バリデーションエラーをチェックするミドルウェア
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  // const errors = await validation.run(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
