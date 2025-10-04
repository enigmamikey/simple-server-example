const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')



function sendResponse(res, data, contentType = 'text/html') {
  res.writeHead(200, {'Content-Type': contentType})
  res.write(data)
  res.end()
}

function serveFile(res, filename, contentType = 'text/html') {
  fs.readFile(filename, (err,data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.end("Page not found")
      return
    }
    sendResponse(res,data,contentType)
  })
}

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  switch(page) {
    case '/': {
      serveFile(res,'index.html')
      break;
    }
    case '/otherpage': {
      serveFile(res,'otherpage.html')
      break;
    }
    case '/otherotherpage': {
      serveFile(res,'otherotherpage.html')
      break;
    }
    case '/api': {
      if('student' in params){
        if(params['student']== 'leon'){
          res.writeHead(200, {'Content-Type': 'application/json'});
          const objToJson = {
            name: "leon",
            status: "Boss Man",
            currentOccupation: "Baller"
          }
          res.end(JSON.stringify(objToJson));
        }//student = leon
        else if (params['student'] == 'flip') {
          let str
          Math.random < 1/2 ? str = 'head' : str = 'tail'
          console.log(str)
        }
        else if(params['student'] != 'leon'){
          res.writeHead(200, {'Content-Type': 'application/json'});
          const objToJson = {
            name: "unknown",
            status: "unknown",
            currentOccupation: "unknown"
          }
          res.end(JSON.stringify(objToJson));
        }//student != leon
      }//student if
      break;
    }  
    case '/css/style.css': {
      serveFile(res, 'css/style.css', 'text/css')
      break;
    }
    case '/js/main.js': {
      serveFile(res, 'js/main.js', 'application/javascript')
      break;
    }
    default: {
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.end("Page not found")
    }
  }
    
});

server.listen(8000);
