module.exports = (err, req, res, next) => {
  // Handle malformed JSON body error from express.json()/body-parser
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Malformed JSON received:', err.message);
    return res.status(400).json({ msg: 'Invalid JSON payload' });
  }

  // Handle jsonwebtoken errors
  if (err.name === 'JsonWebTokenError') {
    console.error('JWT error:', err.message);
    return res.status(401).json({ msg: 'Invalid token' });
  }

  if (err.name === 'TokenExpiredError') {
    console.error('JWT expired:', err.message);
    return res.status(401).json({ msg: 'Token expired' });
  }

  console.error(err);
  res.status(500).json({ msg: 'Server error' });
};
