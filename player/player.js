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
                
//variable that will increment through the images
var num=0

// set the delay between images
var timeDelay
 
//preload the images in the cache so that the images load faster
//create new instance of images in memory 



var imagePreload=new Array()
for (i=0;i<image.length;i++)
{
   imagePreload[i]=new Image()
// set the src attribute
imagePreload[i].src=image[i]
}

function nextImage()
{
    num++;
    $("#MainImage").attr("src",imagePreload[num].src);
}

function auto()
{
       timeDelay=setTimeout("slideshow_automatic()",timings[num++]) 
}

function slideshow_automatic()
{
    if (num > 10) num = 0;
    $("#MainImage").attr("src",imagePreload[num].src);
    timeDelay=setTimeout("slideshow_automatic()",timings[num++]) 

}
