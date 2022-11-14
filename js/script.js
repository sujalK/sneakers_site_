// UI vars
const hamburgerBtn = document.getElementById("hamburger-menu"),
      closeBtn     = document.getElementById("close-btn"),
      navBar       = document.getElementById("navbar");

// add event listener to hamburger button, to show the menu
hamburgerBtn.addEventListener("click", function(e) {
    navBar.classList.add("show");
});

// to close the menu
closeBtn.addEventListener("click", () => {
    navBar.classList.remove("show");
});

/* For showing the appropriate tab, in the homepage */
// UI vars
const tabs        = Array.from(document.querySelectorAll(".tab")),
      tabContents = Array.from(document.querySelectorAll(".tab-content-item"));

// adding event listener to each tab
tabs.forEach(tab => {
    tab.addEventListener("click", function(e) {
        // current element id
        let currentId;
        if (e.target.parentElement.classList.contains("tab")) {
            currentId = e.target.parentElement.id;
        } else {
            currentId = e.target.id;
        }

        // hide all other tab-contents
        // hideTabContents();

        // show only selected item content
        document.getElementById(`${currentId}-content`).classList.add("show-tab");
        
        // remove border from all tabs
        removeBorder();

        // add border to selected one
        if (e.target.parentElement.classList.contains("tab")) {
            e.target.parentElement.classList.add("active-tab");
        } else {
            e.target.classList.add("active-tab");
        }
    });
});

// hide all tab contents
function hideTabContents() {
    tabContents.forEach(tabContent => {
        tabContent.classList.remove("show-tab");
        // tabContent.classList.add("hide");
    });
}

// remove border
function removeBorder() {
    tabs.forEach(tab => {
        tab.classList.remove("active-tab");
    });
}