var static = require('node-static');

const APP_UPLOAD_PATH = '/home/kalpesh/projects/mdm-app/public';
const DEFAULT_IMG = '/uploads/apk_store/android-app.png';
const PORT = 3500;
var fileServer = new static.Server(APP_UPLOAD_PATH);
console.log('Starting node static server on Port:', PORT);
require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    fileServer.serve(request, response, function (e, res) {

      if (e && (e.status === 404)) { // If the file wasn't found
        fileServer.serveFile(DEFAULT_IMG, 200, {}, request, response);
        console.log("GET ", request.url , ':: Serving default image file:', DEFAULT_IMG);
      } else {
        console.log("GET ", request.url);
      }
    });
  }).resume();
}).listen(PORT);
