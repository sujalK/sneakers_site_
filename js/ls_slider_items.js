/* 
    Save Items to the localStorage too if it's
    moved to the freestyle slider
*/
function addToLS(id) {
    let items = [];

    // if item is not in localStorage, then only save it into localStorage
    if (isItemInLS(id) === false) {
        // store items into a ls-slider-items key in localStorage
        if (localStorage.getItem('ls-slider-items') === null) {
            items.push({ productId: id });
        } else {
            items = JSON.parse(localStorage.getItem('ls-slider-items'));
            items.push({ productId: id });
        }
    
        // set the item into localStorage
        localStorage.setItem('ls-slider-items', JSON.stringify(items));
    }
}

// check to see if the item is already present in the localStorage
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