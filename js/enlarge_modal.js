// enlarge the product into modal
const imageContainer  = Array.from(document.querySelectorAll('.img-container'));
const enlargeModal    = document.querySelector('#enlarge-modal');
const closeEnlargeBtn = document.querySelector('#enlarge-modal .enlarged-modal-container .close-modal');

// loop over all the image containers
imageContainer.forEach(imageC => {
    // add event listener to all the image containers
    imageC.addEventListener('click', e => {
        console.log('clicked');
        // check to see if user clicked only on the image
        if (e.target.parentElement.classList.contains('img-container')) {
            // if clicked (target) element has src attribute
            if (e.target.src) {
                // get the image source (location of the image)
                let imageSource = e.target.src;
                
                // show the modal
                enlargeModal.classList.add('hidden-enlarge');

                // place the image inside that modal
                enlargeModal.children[0].children[1].children[0].src = `${imageSource}`
            }
        }
    });
});

// close modal
closeEnlargeBtn.addEventListener('click', () => {
    // hide the modal
    enlargeModal.classList.toggle('hidden-enlarge');
});

// add click handler to the image-div container
document.querySelector('.image-div').addEventListener('click', e => {
    if (!e.target.classList.contains('enlarge-image')) {
        enlargeModal.classList.toggle('hidden-enlarge');
    }
});

// add event listener to body to make sure the newly added item in slider enlarges
document.body.addEventListener('click', e => {
    if (e.target.parentElement.classList.contains('img-container')) {
        // if clicked (target) element has src attribute
        if (e.target.src) {
            // get the image source (location of the image)
            let imageSource = e.target.src;
            
            // show the modal
            enlargeModal.classList.toggle('hidden-enlarge');

            // place the image inside that modal
            enlargeModal.children[0].children[1].children[0].src = `${imageSource}`
        }
    }
});