// Empty


const JSZip = require('jszip')
function zipEmUp(fileURLArray,fileName){
    
    // Create a new zip object
    var zip = new JSZip();
    console.log(fileURLArray.length);
    console.log(fileName.length);
    // Loop through the image urls and add them to the zip object
    for (var i = 0; i < fileName.length; i++) {
       // Add each image to the zip file with a unique name

       console.log("zip file name="+fileName[i]);
       console.log("zip file url="+fileURLArray[i]);
       zip.file(fileName[i], fileURLArray[i], { binary: true });




    //     // Fetch the image data as an array buffer using fetch API
    //     fetch(fileURLArray[i])
    //         .then(function(response) {
    //         return response.arrayBuffer();
    //         })
    //         .then(function(imageData) {
    //         // Add the image data to the zip object with the image name
    //         zip.file(imageName, imageData);
    //         })
    //         .catch(function(error) {
    //         // Handle any errors
    //         console.error(error);
    //         });
    }

    // Generate the zip file as a blob object
    zip.generateAsync({type:"blob"}).then(function(content) {
        var a=document.createElement('a');
        a.href=URL.createObjectURL(content);
        a.download="cropped images.zip";
        a.click();
    })

}

module.exports=zipEmUp;