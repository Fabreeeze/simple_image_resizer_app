/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */


const input = document.querySelector('input');
const preview = document.querySelector('.preview');
const output=document.querySelector('#output');
const downloadDiv=document.querySelector('#download');

input.style.opacity = 0;

input.addEventListener('change', updateImageDisplay);

const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon"
];

function validFileType(file) {
  return fileTypes.includes(file.type);
}



function returnFileSize(number) {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
}



function clearSelectedImages(){
    while(preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }
    downloadDiv.style.display='none';
}


const scrollAmount=100;

function updateImageDisplay() {
    clearSelectedImages();
    downloadDiv.style.display='block';
    //this removed previously selected files

    const curFiles = input.files;
    if (curFiles.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'No files currently selected for upload';
        preview.appendChild(para);
    } 
    else {
        const list = document.createElement('ol');
        preview.appendChild(list);
        let i=0;
        let liItemlist=[];
        for (const file of curFiles) {
            i++;
            const listItem = document.createElement('li');
            const para = document.createElement('p');
            if (validFileType(file)) {
                const image = document.createElement('img');
                image.src = URL.createObjectURL(file);
                console.log("image url="+image.src);
                image.style.height = '70px';
                image.style.width = '80px';
                
                image.classList.add('hoverZoom');
                image.classList.add('selected-pics');

                
                listItem.appendChild(image);
            } 
            else {
                para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
                listItem.appendChild(para);
            }

        liItemlist.push(listItem);
        // list.appendChild(listItem);
        }
        if(i<=5){
            for(let j=0;j<i;j++){
                list.appendChild(liItemlist[j]);
            }
        }
        if(i>5){
            for(let j=0;j<i;j++){
                list.appendChild(liItemlist[j]);
            }
            const nextBttn=document.createElement('button');
            nextBttn.setAttribute('class','next_back-Button');
            nextBttn.setAttribute('id','next-button');
            nextBttn.setAttribute('onClick','scrollPics(1)');
            nextBttn.textContent = '>';

            const backBttn=document.createElement('button');
            backBttn.setAttribute('class','next_back-Button');
            backBttn.setAttribute('id','back-button');
            backBttn.setAttribute('onClick','scrollPics(-1)');
            backBttn.textContent = '<';

            output.appendChild(backBttn);
            output.appendChild(nextBttn);

            const clearBttn=document.createElement('button');
            clearBttn.setAttribute('class','clear-Button');
            clearBttn.textContent = 'CLEAR';
            output.appendChild(clearBttn);
        }


    }
}


var btnLeft=document.getElementById("next-button");
function scrollPics(i) {
    output.scrollLeft+= i*scrollAmount;
}


