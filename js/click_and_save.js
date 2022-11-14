// If the browser doesn't have localStorage initalized, initialize it at first
if (localStorage.getItem("_sneakers_products_") === null) {
    localStorage.setItem("_sneakers_products_", JSON.stringify([]));
}

let localStorageProductIds = [];

if (localStorage.getItem("_sneakers_products_") !== null) {
    let lsProducts = JSON.parse(localStorage.getItem("_sneakers_products_"));

    lsProducts.forEach(lsProduct => {
        localStorageProductIds.push(lsProduct.productId);
    });
}

// selecting all the products on the webpage
const products = document.getElementsByRegex("id", /\bPROD_\w+\b/);

// adding event listener to each of the product
products.forEach( product => {
    product.addEventListener("click", (e) => {
        // if the clicked part is the image, then 
        if (e.target.parentElement.classList.contains('img-container')) {
            // make the selected background to be redish
            e.target.parentElement.parentElement.classList.toggle('redish');

            // make the save button visible if any one of the card is clicked
            document.querySelector(".save-button").style.display = 'block';

        }
    });
});

// check to see if the page contains save button, if yes, remove it at first
if (document.querySelector(".save-button")) {
    // hide the save-button at first
    document.querySelector(".save-button").style.display = 'none';
}

// attaching event listener to the body: to remove the save button if the selection is not made
document.body.addEventListener("click", (e) => {
    // selectedItems
    const selectedItems = Array.from(document.querySelectorAll(".redish"));

    // hide the save button if there is no selected item on the page
    if (selectedItems.length === 0) {
        document.querySelector(".save-button").style.display = 'none';
    }
});

// save into localStorage
function saveIntoLocalStorage(prodId) {
    
    // items: stores the array of objects from the localStorage
    let items;

    if (localStorage.getItem('_sneakers_products_') === null) { // if the key doesn't exist: for new users
        items = [{ productId: prodId }];
    } else {

        // grab all the items from the localStorage
        items = JSON.parse(localStorage.getItem('_sneakers_products_'));
        
        // product DS
        const product = {
            productId: prodId
        };

        // add it to the items
        items.push(product);
    }

    // set item
    localStorage.setItem('_sneakers_products_', JSON.stringify(items));

    // check to see if the notice is alreay on the UI, if not, then only show
    if (document.querySelector(".notice") === null) {
        // show alert
        const toast = new ToastNotification();

        // popup notice
        toast.popupNotice(document.getElementById("toast-notification"), "Saved successfully", 'success');
    }
}


// check to see if save button exists, then only show it.
if (document.querySelector("#save-btn")) {
    // save event listener
    const saveBtn = document.getElementById("save-btn");

    // adding event listener for the save button
    saveBtn.addEventListener("click", (e) => {
        // get all the selected products
        const products             = Array.from(document.querySelectorAll(".redish"));
        let UIProductIDs           = [];
        let localStorageProductIds = [];
    
        // get items from the localStorage
        let lsItems = getItemsFromLS();
    
        // store product ids into productIDs
        products.forEach(product => {
            UIProductIDs.push(product.id);
        });
    
        // check if the localstorage has items in it
        if (lsItems.length > 0) {
            // store items in localStorageProductId
            lsItems.forEach(lsItem => localStorageProductIds.push(lsItem.productId));
    
            // Looping over the UI Product ID
            UIProductIDs.forEach(UIProdId => {
                if (!localStorageProductIds.includes(UIProdId)) {
                    saveIntoLocalStorage(UIProdId);
                }
            });
    
        } else {
            // If localstorage has no items in it, store as it is
            products.forEach(product => {
                saveIntoLocalStorage(product.id);
            });
        }
    });
} 


// getItemsFromLS
function getItemsFromLS() {
    if (localStorage.getItem("_sneakers_products_") === null) {
        return null;
    } else {
        const items = JSON.parse(localStorage.getItem("_sneakers_products_"));
        return items;
    }
}

/* 
    For hide and show feature: when clicked on hide button of each categories
*/
const UIHideBtns = Array.from(document.querySelectorAll(".hide-show-btn"));

// add event listener to each of the button
UIHideBtns.forEach( button => {
    button.addEventListener("click", function(e) {
        // check to see if the clicked target element has class name of hide-show-btn
        if (e.target.classList.contains('hide-show-btn')) {
            // hide the category (the whole container)
            e.target.parentElement.parentElement.parentElement.classList.add("hide");

            // category text, and id
            let text = e.target.previousSibling.textContent.trim(),
                id   = e.target.parentElement.parentElement.parentElement.id;

            // check the button of specific div to then position the left sidebar div
            if (text === 'new releases') {
                showButtonOnLeft(text, id, '28'); // 28%
            } else if (text === 'top 20 picks') {
                showButtonOnLeft(text, id, '70'); // 70%
            } else if (text === 'air jordan') {
                showButtonOnLeft(text, id, '90'); // 90%
            }

        }
    });
});

// create a show button on the left: on top of the save button
function showButtonOnLeft(text, id, topPosition) {
    // create an element
    const sidebarElement = document.createElement("div");

    // add a text content
    sidebarElement.textContent = text;

    // add a class name
    sidebarElement.className = `red-sidebar-click top-${topPosition} ${id}-category`;

    // add the element before the save-btn
    const UISaveBtn = document.getElementById("save-btn");
    
    // insert the left button just before the save button
    UISaveBtn.insertAdjacentElement("beforebegin", sidebarElement);
}

// remove function
function remove(target) {
    // remove the target element
    target.remove();
}

// event listener to show the category div again
document.body.addEventListener("click", function(e) {
    // show the related category div
    if (e.target.classList.contains('new-releases-category')) {
        // remove the selected div
        remove(e.target);

        // remove the hide: to show the category container
        document.querySelector("#new-releases").classList.remove("hide");
    } else if (e.target.classList.contains('top-20-picks-category')) {
        // remove the selected div
        remove(e.target);

        // remove the hide: to show the category container
        document.querySelector("#top-20-picks").classList.remove("hide");
    } else if (e.target.classList.contains('featured-category')) {
        // remove the selected div
        remove(e.target);

        // remove the hide: to show the category container
        document.querySelector("#featured").classList.remove("hide");
    }
});

// for closing the toast notification
document.addEventListener("click", e => {
    if (e.target.className === 'close-notice') {
        e.target.parentElement.remove();
    }
});