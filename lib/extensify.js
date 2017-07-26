var tools = require("browserify-transform-tools");
var fs = require("fs");
var path = require("path");

// Given an absolute (clean) path, resolve it to a file with any of the given
// extensions or a directory with an index. Returns resolved path if found.
var cache = {};
function resolveRequirePath(exts, toResolve) {

  // Check cache first for efficiency
  if (cache.hasOwnProperty(toResolve)) {
    return cache[toResolve];
  }

  // Check if path either exists with .jsx extension or is a directory with an index
  var resolved = null;
  exts.forEach(function (ext) {
    var file = toResolve + "." + ext;
    var dir = path.join(toResolve, "index." + ext);
    if (fs.existsSync(file)) {
      resolved = file;
    } else if (fs.existsSync(dir)) {
      resolved = dir;
    }
    if (resolved) {
      return false;
    }
  });

  // If resolved, cache the result
  if (resolved) {
    cache[toResolve] = resolved;
  }
  return resolved;
}

// Transform function
function transform(args, opts, cb) {
  var relativeRequire = args[0];
  var relativeRequireBase = path.basename(relativeRequire);

  // Only look at local require statements without an extension
  if (path.extname(relativeRequireBase) === "" && (relativeRequire[0] === "." || relativeRequire[0] === "/")) {

    // Calculate absolute require path then resolve
    var dir = path.dirname(opts.file);
    var absoluteRequire = path.resolve(dir, relativeRequire);

    var resolvedRequire = resolveRequirePath(opts.config.extensions, absoluteRequire);
    if (resolvedRequire) {
      var base = path.dirname(opts.file);
      var relativeResolvedRequire = "./" + path.relative(base, resolvedRequire);
      return cb(null, "require(\"" + relativeResolvedRequire + "\")");
    }

  }

  // Default behaviour - just return original
  return cb();
}

// Transform options
var opts = {
  evaluateArguments: true,
  jsFilesOnly: true
};

// Export transform
module.exports = tools.makeRequireTransform("extensify", opts, transform);
