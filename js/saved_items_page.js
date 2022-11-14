// [SCRIPT] for saved_items.html page
// Add event listener to the document
document.addEventListener("DOMContentLoaded", () => {
    // Load the items using ajax when the content gets loaded 
});

// add event listener to the parent : to remove the item from the localStorage
document.querySelector(".saved-items").addEventListener("click", e => {
    // product id
    let productId;

    // When clicked on the icon
    if (e.target.className === 'lnr lnr-trash') {
        productId = e.target.parentElement.parentElement.parentElement.parentElement.id.trim();
        removeByIdFromLS(productId);

        // remove the item itself from UI
        e.target.parentElement.parentElement.parentElement.parentElement.remove();

        // check to see if the .notice is already on UI
        if (document.querySelector(".notice") === null) {
            // show alert
            const notice = new ToastNotification();
            notice.popupNotice(document.querySelector("#toast-notification"), "Item removed successfully.", 'error');
        }
    }

    // check to see if click is made on the text
    if (e.target.classList.contains('remove-saved-item')) {
        // console.log("Logged");

        productId = e.target.parentElement.parentElement.parentElement.id.trim();
        removeByIdFromLS(productId);

        // remove the item itself from UI
        e.target.parentElement.parentElement.parentElement.remove();

        // check to see if the .notice is already on UI
        if (document.querySelector(".notice") === null) {
            // show alert
            const notice = new ToastNotification();
            notice.popupNotice(document.querySelector("#toast-notification"), "Item removed successfully.", 'error');
        }
    }
});

// function to remove from localStorage
function removeByIdFromLS(idFromUI) {
    // console.log(idFromUI);
    
    // variable to store items from the localStorage
    let itemFromLS;

    if (localStorage.getItem('_sneakers_products_') !== null) {
        // get Items from localStorage
        itemFromLS = JSON.parse(localStorage.getItem('_sneakers_products_'));

        // filter out the product
        // remove the product with ID from the UI
        filteredItems = itemFromLS.filter( LSItem => LSItem.productId !== idFromUI );

        // set the item again to LocalStorage
        localStorage.setItem('_sneakers_products_', JSON.stringify(filteredItems));
    }

}

// Default text of there is nothing on the localStorage
if (localStorage.getItem('_sneakers_products_') === null || localStorage.getItem('_sneakers_products_').toString() === '[]') {
    // show no saved items text on the UI
    document.querySelector(".saved-items").innerHTML = '<h4 style="padding: 1.25rem .5rem;">You\'ve not saved any items, please <a href="index.html" class="underline">visit</a> here to save items for purchasing.</h4>';
}

// for closing the toast notification
document.addEventListener("click", e => {
    if (e.target.className === 'close-notice') {
        e.target.parentElement.remove();
    }
});