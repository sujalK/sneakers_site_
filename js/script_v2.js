// UI vars
const hamburgerBtn = document.getElementById("hamburger-menu"),
  closeBtn         = document.getElementById("close-btn"),
  navBar           = document.getElementById("navbar");

// add event listener to hamburger button, to show the menu
hamburgerBtn.addEventListener("click", function (e) {
  navBar.classList.add("show");
});

// to close the menu
closeBtn.addEventListener("click", () => {
  navBar.classList.remove("show");
});

/* For showing the appropriate tab, in the homepage */
// UI vars
const tabs = Array.from(document.querySelectorAll(".tab")),
  tabContents = Array.from(document.querySelectorAll(".tab-content-item"));

// adding event listener to each tab
tabs.forEach((tab) => {
  tab.addEventListener("click", function (e) {
    let sliderCls;

    // current element id
    let currentId;
    if (e.target.parentElement.classList.contains("tab")) {
      currentId = e.target.parentElement.id;

      sliderCls = e.target.parentElement.dataset.sliderId;
      // console.log(e.target.parentElement.dataset.sliderId);
    } else {
      currentId = e.target.id;
      sliderCls = e.target.dataset.sliderId;
      // console.log(e.target.dataset.sliderId);
    }

    // const sliderCls = e.target.dataset[`slider-id`];
    // console.log(e.target);



    
    // scroll to #tabs div if clicked on tabs
    document.querySelector('#goto-div').scrollIntoView({
      behavior: 'smooth'
    });





    // hide all other tab-contents
    // hideTabContents();

    // scroll on appear
    // scroll to the shown content area
    // document.querySelector(`#${currentId}-slide-to`).scrollIntoView({
    //     behavior: 'smooth'
    // });

    // show only selected item content

    // remove border from all tabs
    // removeBorder();

    // add border to selected one
    // if (e.target.parentElement.classList.contains("tab")) {
    //   e.target.parentElement.classList.add("active-tab");
    // } else {
    //   e.target.classList.add("active-tab");
    // }

    if ($(`#${currentId}`).data("show") == "yes") {
        //hide the content & set the attribute to no
        $(`#${currentId}`).removeClass("active-tab");
        
        document
        .getElementById(`${currentId}-content`)
        .classList.remove("show-tab");

        // 
        $(`#${currentId}`).data("show", "no");

        // removing slider to this specific element
        $(`.${sliderCls}`).slick("unslick");
    } else {
      //show the content & set the attribute to yes
      $(`#${currentId}`).addClass("active-tab");
      document.getElementById(`${currentId}-content`).classList.add("show-tab");
      $(`#${currentId}`).data("show", "yes");
      initializeSlider(sliderCls);
    }
  });
});

// hide all tab contents
function hideTabContents() {
  tabContents.forEach((tabContent) => {
    tabContent.classList.remove("show-tab");
    // tabContent.classList.add("hide");
  });
}

// remove border
function removeBorder() {
  tabs.forEach((tab) => {
    tab.classList.remove("active-tab");
  });
}

// for search modal to display
const searchBtn = document.querySelector(".search");

searchBtn.addEventListener("click", function(e) {
  // add show class to the modal
  document.querySelector("#search-modal").classList.add("show");

  // make focus on the search bar
  document.querySelector("#search_products").focus();
});

// for closing of the search div
document.querySelector(".top-right-escape")
  .addEventListener("click", function(e) {
    // remove the show class from search modal
    document.querySelector("#search-modal").classList.remove("show");
  });

// for escape key event
document.addEventListener("keydown", (e) => {
  if (e.key === 'Escape') {
    // remove the show class from search modal
    document.querySelector("#search-modal").classList.remove("show");
  }
});

// for redirecting to homepage
document.querySelector(".logo").addEventListener("click", () => {
  window.location.href = 'index.html'
});

document.querySelector(".logo").style = 'cursor: pointer';