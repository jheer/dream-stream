var XHR = require("xmlhttprequest");
var http = require("http");
var url = require("url");
var querystring = require("querystring");
var verbose = true;

run(8889);

function range(start, end, step) {
  if (step===undefined) { step = 1; }
  var list = [];
  for (var i=start; i<end; i+=step) {
    list.push(i);
  }
  return list;
}

function run(port) {
  var count = 0;

  var server = http.createServer(function(request, response) {
	var qs = querystring.parse(url.parse(request.url).query);
	var query = qs["q"];
    var size = qs["imgsz"];

	request_google(query, size, count, function(images, query, index) {
      var json = images;
      response.writeHead(200, {"Content-Type": "application/json"});
      response.write(JSON.stringify(json));
      response.end();
    });
    console.log(count+": "+query);
	count += 1;
  });
  server.listen(port);
}

function request_google(query, size, index, callback) {
  var pageStart = 0;
  var pageEnd = 8; //64;
  var pageStep = 8;
  var numPages = pageEnd / pageStep;

  var url = "https://ajax.googleapis.com/ajax/services/search/images";
  var qs = "?v=1.0&rsz="+pageStep+"&q="+encodeURIComponent(query);
  if (size) qs += "&imgsz="+size;
  var imgs = [];

  var process = function(start) {
    var xhr = new XHR.XMLHttpRequest();
	xhr.onreadystatechange = function() { 
	  if (this.readyState === 4) {
		numPages -= 1;		
		try {
          var resp = JSON.parse(this.responseText);
          var data = resp.responseData;
          if (!data) {
            console.log(" "+index+"("+query+"): "+resp.responseDetails);
          } else {
            data.results.forEach(function(r) { imgs.push(r.url); });
          }
        } catch (err) { console.log(err); }
        if (numPages === 0) { callback(imgs, query, index); }
	  }
	};
	xhr.open("GET", url + qs + "&start=" + start);
	xhr.send();
  };

  if (verbose) { console.log(" QUERY "+index+": "+query); }
  range(pageStart,pageEnd,pageStep).forEach(process);
}