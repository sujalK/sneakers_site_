// Utils constructor
function Utils() {}

Utils.prototype = {
    constructor: Utils,
    isElementInView: function (element, fullyInView) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
};

// Utils instance
var Utils = new Utils();

// for inactive tab
function inactive(className) {
    // make the div in the grid view
    document.querySelector(`.${className}`).style = 'display: grid;';

    // make all the cards into flex column
    let cards = Array.from(document.querySelectorAll(`.${className} .card`));
    cards.forEach(card => {
        card.style = 'display: flex; flex-direction: column;';
    });

    // make the image width to original size: for all images
    let picksImages = Array.from(document.querySelectorAll(`.${className} .img-container`));

    // looping over the images
    picksImages.forEach(eachImageContainer => {
        eachImageContainer.style = 'max-width: 280px;';
    });

    // if slider is already present, remove the slider
    if (document.querySelector(`.${className}`).classList.contains('slick-initialized')) {
        // remove the slider from the container
        $(`.${className}`).slick("unslick");
    }
}

// when there is active tab
function active(className) {
    // removing the grid
    document.querySelector(`.${className}`).style = 'display: block !important;';

    // make all the cards into flex row
    let cards = Array.from(document.querySelectorAll(`.${className} .card`));
    cards.forEach(card => {
        card.style = 'display: flex; flex-direction: row; align-items: center;';
    });

    // make the image width smaller: for all images
    let picksImages = Array.from(document.querySelectorAll(`.${className} .img-container`));
    
    // looping over the images
    picksImages.forEach(eachImageContainer => {
        eachImageContainer.style = 'max-width: 150px;';
    });

    // initialize the slider
    // check if it's already initialized
    if (!document.querySelector(`.${className}`).classList.contains('slick-initialized')) {
        initializeSlider(`${className}`);
    }

}

// adding scroll event to the window object
window.addEventListener("scroll", (e) => {

    // if no tabs is clicked on the webpage
    if (document.querySelector('.active-tab') === null) {
        // TODO: Make top-20-picks, featured, new-releases, shop-by-category
        // into smaller size images

        // for top-20-picks view
        let isTop20PicksInView = Utils.isElementInView($('#top-20-picks'), false);
        if (isTop20PicksInView) {
            inactive("picks");
        }

        // for new-releases view
        let isNewReleasesInView = Utils.isElementInView($("#new-releases"), false);
        if (isNewReleasesInView) {
            inactive("releases");
        }

        // for featured-items
        let isFeaturedItemsInView = Utils.isElementInView($("#featured"), false);
        if (isFeaturedItemsInView) {
            inactive("featured-items");
        }

    } else {
        // TODO: If there is any one of the active tab,
        // then if -->> visible on the screen top-20-picks, featured, new-releases, shop-by-category
        // Make their images smaller

        // for #top-20-picks view
        let isTop20PicksInView = Utils.isElementInView($('#top-20-picks'), false);
        if (isTop20PicksInView) {
            active("picks");
        }

        // for #new-releases view
        let isNewReleasesInView = Utils.isElementInView($("#new-releases"), false);
        if (isNewReleasesInView) {
            active("releases");
        }

        // for featured-items
        let isFeaturedItemsInView = Utils.isElementInView($("#featured"), false);
        if (isFeaturedItemsInView) {
            active("featured-items");
        }

    }

});

// adding event listener to the body : to make sections display into grid, and slider, and remove it
document.body.addEventListener("click", function(e) {
    let activeTabsLength = Array.from(document.querySelectorAll('.active-tab')).length;
    
    // inactive
    if (activeTabsLength === 0 ) {
        inactive("releases");
        inactive("picks");
        inactive("featured-items");
    }

    // active
    if (activeTabsLength > 0) {
        active("releases");
        active("picks");
        active("featured-items");
    }
});