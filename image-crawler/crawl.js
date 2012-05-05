var fs = require("fs");
var XHR = require("xmlhttprequest");

var verbose = true;
var delay = 1000;
var outd = "output/";

var inputFile = null;
if (process.argv[2]) {
  inputFile = process.argv[2];
} else {
  console.log('Image Crawler - Given newline-delimited strings, query for images');
  console.log(' USAGE: node crawl.js <filename>');
  console.log(' Image URLs will be written to files in "'+outd+'"');
  process.exit(1);
}

function range(start, end, step) {
  if (step===undefined) { step = 1; }
  var list = [];
  for (var i=start; i<end; i+=step) {
    list.push(i);
  }
  return list;
}

function getFilename(file) {
  var idx0 = file.lastIndexOf("/") + 1;
  var idx1 = file.lastIndexOf(".");
  return file.substring(idx0, idx1);
}

function write(list, file) {
  fs.writeFile(file, list.join("\n"));
}

function crawlFor(file) {
  var lines = fs.readFileSync(file).toString().split("\n");
  var name = getFilename(file);
  try {
    fs.mkdirSync(outd + name);
  } catch (err) {
    if (err.errno!==47) console.log(err);
  }
  if (verbose) { console.log("CRAWLING FOR: "+file); }

  var run = function(t,i) { request_google(t, outd+name+"/"+i, i); };
  if (delay <= 0) {
    lines.forEach(run);
  } else {
    lines.forEach(function(t,i) {
      setTimeout(function() { run(t, i); }, i*delay);
    });
  }
}

function request_google(query, file, index) {
  var pageStart = 0;
  var pageEnd = 8; //64;
  var pageStep = 8;
  var numPages = pageEnd / pageStep;

  var url = "https://ajax.googleapis.com/ajax/services/search/images";
  var qs = "?v=1.0&rsz=" + pageStep + "&q=" + encodeURIComponent(query);
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
        } catch (err) {
          console.log(err);
        }
        if (numPages === 0) { write(imgs, file); }
	  }
	};
	xhr.open("GET", url + qs + "&start=" + start);
	xhr.send();
  };

  if (verbose) { console.log(" QUERY "+index+": "+query); }
  range(pageStart,pageEnd,pageStep).forEach(process);
}

crawlFor(inputFile);