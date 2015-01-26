var tools = require("browserify-transform-tools");
var fs = require("fs");
var path = require("path");

// Given an absolute (clean) path, check if it can be resolved to a .jsx file
// If it can, return the path to the .jsx file
var cache = {};
function resolveJsxPath(jsxPath) {

  // Check cache first for efficiency
  if (cache.hasOwnProperty(jsxPath)) {
    return cache[jsxPath];
  }

  // Check if path either exists with .jsx extension or is a directory with an index
  var jsxFile = jsxPath + ".jsx";
  var jsxDir = path.join(jsxPath, "index.jsx");
  var resolved = null;
  if (fs.existsSync(jsxFile)) {
    resolved = jsxFile;
  } else if (fs.existsSync(jsxDir)) {
    resolved = jsxDir;
  }

  // If resolved, cache the result
  if (resolved) {
    cache[jsxPath] = resolved;
  }
  return resolved;
}

// Transform function
function transform(args, opts, cb) {
  var relativeRequire = args[0];
  var relativeRequireBase = path.basename(relativeRequire);

  // Only look at local require statements without an extension
  if (relativeRequireBase.indexOf(".") === -1 && (relativeRequire[0] === "." || relativeRequire[0] === "/")) {

    // Calculate absolute require path then resolve
    var dir = path.dirname(opts.file);
    var absoluteRequire = path.resolve(dir, relativeRequire);

    var resolvedRequire = resolveJsxPath(absoluteRequire);
    if (resolvedRequire) {
      return cb(null, "require(\"" + resolvedRequire + "\")");
    }

  }

  // Default behaviour - just return original
  return cb();
}

// Transform options
var opts = {
  evaluateArguments: true
};

// Export transform
module.exports = tools.makeRequireTransform("jsxify", opts, transform);