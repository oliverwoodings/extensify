var expect = require("chai").expect;
var runTransform = require("browserify-transform-tools").runTransform;
var path = require("path");

var extensify = require("../lib/extensify.js").configure({
    extensions: ["jsx"]
});

function getFixturePath(fixture) {
  return path.resolve(__dirname, "fixtures", fixture);
}

describe("Extensify", function () {

  describe("when a file is required without the extension", function () {

    var fixturePath = getFixturePath("file");
    var err, result;
    before(function (done) {
      runTransform(extensify, path.join(fixturePath, "index.js"), function (_err, _result) {
        err = _err;
        result = _result;
        done();
      });
    });

    it("should not error", function () {
      expect(err).to.not.exist;
    });

    it("should rewrite the require call to include the extension", function () {
      expect(err).to.not.exist;
      expect(result).to.equal("require(\"" + path.join(fixturePath, "test.jsx") + "\");");
    });

  });

  describe("when a file and directory have the same name", function () {

    var fixturePath = getFixturePath("filedirectory");
    var err, result;
    before(function (done) {
      runTransform(extensify, path.join(fixturePath, "index.js"), function (_err, _result) {
        err = _err;
        result = _result;
        done();
      });
    });

    it("should not error", function () {
      expect(err).to.not.exist;
    });

    it("should prioritise the file", function () {
      expect(result).to.equal("require(\"" + path.join(fixturePath, "test.jsx") + "\");");
    });

  });

  describe("when a directory is required", function () {

    var fixturePath = getFixturePath("directory");
    var err, result;
    before(function (done) {
      runTransform(extensify, path.join(fixturePath, "index.js"), function (_err, _result) {
        err = _err;
        result = _result;
        done();
      });
    });

    it("should not error", function () {
      expect(err).to.not.exist;
    });

    it("should rewrite the require call to include index.jsx", function () {
      expect(result).to.equal("require(\"" + path.join(fixturePath, "test", "index.jsx") + "\");");
    });

  });

});