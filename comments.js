// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = [];
http.createServer(function (req, res) {
    // parse url
    var parseObj = url.parse(req.url, true);
    var pathname = parseObj.pathname;
    if (pathname === '/') {
        fs.readFile('./view/index.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found.');
            }
            res.end(data);
        });
    } else if (pathname === '/post') {
        // get comment
        var comment = parseObj.query;
        comment.dateTime = '2017-11-2 17:11:22';
        comments.unshift(comment);
        // redirect
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    } else if (pathname === '/comments') {
        // comments
        var str = JSON.stringify(comments);
        res.end(str);
    } else if (pathname.indexOf('/public/') === 0) {
        // public
        fs.readFile('.' + pathname, function (err, data) {
            if (err) {
                return res.end('404 Not Found.');
            }
            res.end(data);
        });
    } else {
        fs.readFile('./view/404.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found.');
            }
            res.end(data);
        });
    }
}).listen(3000, function () {
    console.log('running...');
});