// https://flagman.top/about-business/php-i-t-p-uzelki/webpack
const path = require("path"); //connecting the built-in path module Node.JS
 
module.exports = {
  entry: "../src/tracker.js", 
  mode: "production",
  output: { 
    filename: "tracker.js",
    path: path.resolve("../")
  }
};
