// Empty

const zipEmUp=require('./zipping.js')
    
const JSZip = require('jszip')
var zip = new JSZip();


function resizeAndDownload() {
  // Step 1: Get the image file from the input element
  const curFiles=input.files;
  const filenames=[];
  const resizedFileURLS=[];

  var i=0;
  var promises = [];
  for(const file of curFiles){
    filenames.push(file.name);
    // Step 2:convert the image file into a data URL
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    // console.log("image url="+image.src);

    //Step 3: we define a function for when the image loads
    //we define the subsequent resizing  and saving code inside a 
    //function and not just openly because the "image" const element 
    //gets changed every iteration and hence the values like width 
    //and height will return 0 on every run as they are not joined to 
    //one fixed element

    //writing them with a function and calling that function on every 
    //iteration of that element allows the code inside it to consider
    //"image" as unique fo every run of code

    i++;
    // Step 4: Create a new canvas element and get its context
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    var promise = new Promise(function(resolve,reject){

      image.onload=function(){

          // Step 5: Set the canvas width and height and draw the resized image
          
          var width = image.width;
          var height = image.height;

          const aspectRatio = width / height;
          const cropWidth = width * (90/ 100);
          const cropHeight = cropWidth / aspectRatio;
          
          console.log("image width="+width);
          console.log("image height="+height);
          
          canvas.width = cropWidth;
          canvas.height = cropHeight;

          console.log("crop image width="+cropWidth);
          console.log("crop image height="+cropHeight);
        
          ctx.drawImage(image, 0, 0,cropWidth,cropHeight);
          // Step 6: Get the data URL of the resized image from the canvas
          const resizedDataURL = canvas.toDataURL('image/jpeg');

          // Step 7: Save the data URL string to localStorage
          localStorage.setItem('resizedImage'+i, resizedDataURL);

          resizedFileURLS.push(resizedDataURL);
          console.log("current url array="+resizedFileURLS.length);
          
          var resizedImageData = localStorage.getItem('resizedImage'+i);
          // zip.file(file.name, resizedImageData,{binary:true});
          downloadFile(resizedImageData,file.name);
          JSZipUtils.getBinaryContent(resizedDataURL, function() {
          zip.file(file.name, resizedImageData, {binary:true, compression:"DEFLATE"});

      
          resolve();
      });
          

      };
    });

    promises.push(promise);
  }
  console.log("name array ="+filenames);
  console.log("url array ="+resizedFileURLS);

  Promise.all(promises).then(function() {
    // Calling the zip fucntion now
    // zipEmUp(resizedFileURLS,filenames); 
    zip.generateAsync({type:"blob"}).then(function(content) {
        var a=document.createElement('a');
        a.href=URL.createObjectURL(content);
        a.download="cropped images.zip";
        a.click();
    })
  });
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