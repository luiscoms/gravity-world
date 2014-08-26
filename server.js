var http = require('http'),
    fs = require('fs');

// http.createServer(function(request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.write("Hello World");
//   response.end();
// }).listen(process.env.PORT || 7777);

// fs.readFile('index.html', function (err, html) {
//     if (err) {
//         throw err;
//     }
//     http.createServer(function(request, response) {
//         response.writeHeader(200, {"Content-Type": "text/html"});
//         response.write(html);
//         response.end();
//     }).listen(process.env.PORT || 7777);
// });

http.createServer(function (req, res) {

    console.log(req.url);

    if (req.url == '/' || req.url.indexOf('.html') != -1) { //req.url has the pathname, check if it conatins '.html'
      fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    } else {
      fs.readFile(__dirname + req.url, function (err, data) {
        if (err) console.log(err);
        res.writeHead(200);
        res.write(data);
        res.end();
      });
    }

    // if (req.url == '/' || req.url.indexOf('.html') != -1) { //req.url has the pathname, check if it conatins '.html'

    //   fs.readFile(__dirname + '/index.html', function (err, data) {
    //     if (err) console.log(err);
    //     res.writeHead(200, {'Content-Type': 'text/html'});
    //     res.write(data);
    //     res.end();
    //   });

    // }

    // if(req.url.indexOf('.js') != -1) { //req.url has the pathname, check if it conatins '.js'

    //   fs.readFile(__dirname + '/js/app.min.js', function (err, data) {
    //     if (err) console.log(err);
    //     res.writeHead(200, {'Content-Type': 'text/javascript'});
    //     res.write(data);
    //     res.end();
    //   });

    // }

    // if(req.url.indexOf('.css') != -1) { //req.url has the pathname, check if it conatins '.css'

    //   fs.readFile(__dirname + '/css/index.css', function (err, data) {
    //     if (err) console.log(err);
    //     res.writeHead(200, {'Content-Type': 'text/css'});
    //     res.write(data);
    //     res.end();
    //   });

    // }
}).listen(process.env.PORT || 7777);
console.log('Server running at http://127.0.0.1:', process.env.PORT || 7777, '/');
