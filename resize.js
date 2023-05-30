// Empty




// const input = document.querySelector('input');
// const preview = document.querySelector('.preview');
// const output=document.querySelector('#output');
// const downloadDiv=document.querySelector('#download');



         
function resizeAndDownload() {
  // Step 1: Get the image file from the input element
  const curFiles=input.files;
  for(const file of curFiles){


    // Step 2:convert the image file into a data URL
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    console.log("image url="+image.src);

    //Step 3: we define a function for when the image loads
    //we define the subsequent resizing  and saving code inside a 
    //function and not just openly because the "image" const element 
    //gets changed every iteration and hence the values like width 
    //and height will return 0 on every run as they are not joined to 
    //one fixed element

    //writing them with a function and calling that function on every 
    //iteration of that element allows the code inside it to consider
    //"image" as unique fo every run of code
    image.onload=function(){

  // Step 4: Create a new canvas element and get its context
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // Step 5: Set the canvas width and height and draw the resized image
        
        var width = image.width;
        var height = image.height;

        console.log("image width="+width);
        console.log("image height="+height);
        
        canvas.width = width*0.99;
        canvas.height = height*0.99;
        
        ctx.drawImage(image, 0, 0, width, height);
        // Step 6: Get the data URL of the resized image from the canvas
        const resizedDataURL = canvas.toDataURL('image/png');
        // Step 7: Save the data URL string to localStorage
        localStorage.setItem('resizedImage', resizedDataURL);

        console.log("resized pic url="+resizedDataURL);
    
        downloadFile(resizedDataURL, 'resizedImage.png');
    };


    }
  
}


function downloadFile(data, filename) {
    var a = document.createElement('a');
    a.style.display = 'none';
    a.href = data;
    console.log("downloaded pic url="+data);
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(data);
    document.body.appendChild(a);
}