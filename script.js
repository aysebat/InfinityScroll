const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let isInitialLoad = true;
let imagesLoaded = 0 ;
let totalImages = 0;
let photosArray = [];
let ready = false;

//Unsplash API
let initialCount = 5;
const apiKey = 'z76akkGjesKHhrvYl_Gjer0JDPNkDyLNtbTh_zpRwK0';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateAPIUrlWithNewCount(count) {
    const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
}

//Check if all images were loaded
function imageLoader() {
imagesLoaded++;
if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
}
}
// Helper Function to Set Attributes on DOM Elements
function setAttributes (element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}
//Create Element for Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded =0 ;
    totalImages = photosArray.length;
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item, {
            href : photo.links.html,
            target : '_blank'          
        });
        //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description,
        });
        img.addEventListener('load', imageLoader)
        //put <img> inside the <a>, then put both inside the imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);

    })
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) {
            updateAPIUrlWithNewCount(30);
            isInitialLoad = false;
        }
    } catch (error){
        //Catch Error Here
    }
}

//Check to see if scrolling near bottom of page, and Load More Photos
window.addEventListener('scroll', ()=> {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready) {
        getPhotos();
        ready = false;
    }
});

// On Load
getPhotos();