const path = require('path');
const exprssi = require('exprssi');

const baseDir = path.join(process.cwd(), process.env.SSI_DIR || '');
const ext = process.env.SSI_EXT || '.shtml';

const ssi = exprssi({
  baseDir,
  ext,
});

module.exports = function(req, res, next) {
  if (req.url === '/') {
    res.statusCode = 302;
    res.setHeader('Location', '/index' + ext);
    res.end();
  } else if (req.url.endsWith(ext)) {
    ssi(req, res, next);
  } else {
    next();
  }
};
