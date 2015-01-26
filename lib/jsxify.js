var tools = require("browserify-transform-tools");
var fs = require("fs");
var path = require("path");

var opts = {
  evaluateArguments: true
};

var fn = function (args, opts, cb) {
  var file = opts.file;
  var dir  = path.dirname(file);
  var relative = args[0];

  // Only look at local require statements
  if (relative[0] === "." || relative[0] === "/") {

    // Calculate absolute require path
    var absolute = path.resolve(dir, relative);

    // Check if path is a file in current directory
    // Otherwise, check if path is actually a directory with an index.jsx in it
    if (fs.existsSync(absolute + ".jsx")) {
      return cb(null, "require(\"" + absolute + ".jsx\")");
    } else if (fs.existsSync(absolute + "/index.jsx")) {
      return cb(null, "require(\"" + absolute + "/index.jsx\")");
    }

  }

  // Default behaviour - just return original
  return cb();
};

var transform = tools.makeRequireTransform("jsxify", opts, fn);

module.exports = transform;