// save item
const saveItem       = document.getElementById("save-item"),
      addToSliderBtn = document.querySelector('#add-to-slider');

// add event listener to the button
saveItem.addEventListener('click', e => {
    // initialize product id
    let products  = [], 
        productId = getProductId();
    
    // check to see if the item is not in the localStorage, then continue
    if (isAlreadyThere(productId) === false) {
        // check to see if the localStorage has product list
        if (localStorage.getItem('saved-product-list') !== null) {
            products = JSON.parse(localStorage.getItem('saved-product-list'));
    
            // add product id to products array
            products.push({ productId });
        } else {
            // add product id to products
            products.push({ productId });
        }
    
        // add item to the localStorage again
        localStorage.setItem('saved-product-list', JSON.stringify(products));

        // if one notification is not already on UI, then show it
        if (document.querySelector(".notice") === null) {
            // show alert
            const notice = new ToastNotification();
            notice.popupNotice(document.querySelector("#toast-notification"), "Item added successfully", 'success');
        }
    }
});

// function to get product id
function getProductId() {
    // get URL
    let url = document.URL;

    url = url.replace('https://www.', '');

    // url parts
    let urlParts = url.split('/');

    // product id
    return urlParts[urlParts.length - 1];
}

// function to check if the item is already in the localStorage
function isAlreadyThere(prodId) {
    // if key exists in the localStorage
    if (localStorage.getItem('saved-product-list') !== null) {
        const items = JSON.parse(localStorage.getItem('saved-product-list'));
        
        // loop over the array
        let found = items.find(item => item.productId == prodId );

        if (found) return true; 
        return false;
    } else { // if key is not present in the localStorage
        // if key is not present in the localStorage, then assume, item is not there, returrning false
        return false;
    }
}

// for adding into the slider
addToSliderBtn.addEventListener('click', addToSlider);

// add to slider
function addToSlider() {
    let productId = getProductId();
    let items;

    // if item is not in localStorage
    if (isItemInLS(productId) === false) {
        // add the product to the localStorage (specifically for the slider items)
        if (localStorage.getItem('ls-slider-items') !== null) {
            items = JSON.parse(localStorage.getItem('ls-slider-items'));
            items.push({ productId });
        } else {
            items = [];
            items.push({ productId });
        }

        // set the item into the localStorage
        localStorage.setItem('ls-slider-items', JSON.stringify(items));
    }
 
}

function isItemInLS(id) {
    if (localStorage.getItem('ls-slider-items') !== null) {
        // get the items from the localStorage
        let items = JSON.parse(localStorage.getItem('ls-slider-items'));

        // check to see if item is present in the localStorage
        let found = items.find(item => item.productId == id);
        
        if (found) return true;
        return false;
    }
    return false;
}