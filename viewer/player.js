var speechData = 0;
/*
// The list of images to display in the slideshow
//creating a array of the image object
var image=new Array("images/image1.jpg",
                    "images/image2.jpg",
                    "images/image3.jpg",
                    "images/image4.jpg",
                    "images/image5.jpg",
                    "images/image6.jpg",
                    "images/image7.jpg",
                    "images/image8.jpg",
                    "images/image9.jpg",
                    "images/image10.jpg"
                    
                    )


var timings = new Array(1000, 5000,1000, 10000, 100, 100, 1000, 5000,1000, 10000);
*/
                
//variable that will increment through the images
var num=0

// set the delay between images
var timeDelay
 
//preload the images in the cache so that the images load faster
//create new instance of images in memory 

var imagePreload=new Array()


function setup()
{
  d3.select("#menu")
    .on("change", function() {
      load(d3.select(this).property("value"));
    })
  .selectAll("option.new")
    .data(files)
  .enter().append("option")
    .property("value", function(d) { return d; })
    .text(function(d) { return d; });
}
 
function preload()
{


    for (i=0;i<speechData.length;i++) {
	imagePreload[i]=new Image();
	imagePreload[i].src=speechData[i].image;
    }
    $("#caption").html( speechData[0].text);    
}

//$(preload);

$(setup);

function nextImage()
{
    num++;
    $("#MainImage").attr("src",imagePreload[num].src);
}


function auto()
{
    if (num < speechData.length) {
       timeDelay=setTimeout("slideshow_automatic()",speechData[num+1].start-speechData[num++].start) 
    } 

}

function slideshow_automatic()
{
    $("#MainImage").attr("src", speechData[num++].image[0]);
    $("#caption").html( speechData[num].query);

//    timeDelay=setTimeout("slideshow_automatic()",speechData[num+1].start-speechData[num++].start);
    timeDelay=setTimeout("slideshow_automatic()",2000);

}


function visualize(data)
{
    speechData = data;
}