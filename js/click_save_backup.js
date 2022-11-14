// adding a method to the Document.prototype:
Document.prototype.getElementsByRegex = function (attr, reg) {
    // attr: String, an attribute of the element you wish to search by,
    // reg: a RegExp literal which should perform the search.
  
    // here we find all elements in the document with the specific attribute:
    var superSet = document.querySelectorAll('[' + attr + ']');
  
    // if there are no elements with that attribute, we return null:
    if (!superSet.length) {
      return null;
    }
    else {
      // otherwise we return a filtered array, of those elements
      // which have an attribute matching the regular expression:
      return [].filter.call(superSet, function (el) {
        // we're using 'el.getAttribute(attr),' rather than el[attr],
        // because searching by class would require el[className], and 'for'
        // would require el[HTMLFor]; getAttribute irons out those kinks:
        return reg.test(el.getAttribute(attr));
  
        // Note that this method returns an Array, not a NodeList (live or otherwise)
        // unlike document.getElementsByClassName() for example
  
      });
    }
};

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

// hide the save-button at first
document.querySelector(".save-button").style.display = 'none';

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

    // show alert
    
}

// save event listener
const saveBtn = document.getElementById("save-btn");

// adding event listener for the save button
saveBtn.addEventListener("click", (e) => {
    // get all the selected products
    const products             = Array.from(document.querySelectorAll(".redish"));
    let UIProductIDs           = [];
    let localStorageProductIds = [];

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

// getItemsFromLS
function getItemsFromLS() {
    if (localStorage.getItem("_sneakers_products_") === null) {
        return null;
    } else {
        const items = JSON.parse(localStorage.getItem("_sneakers_products_"));
        return items;
    }
}