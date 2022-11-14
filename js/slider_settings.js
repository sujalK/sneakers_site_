function initializeSlider(cls) {
  // console.log(cls);
  $(`.${cls}`).slick({
    slidesToShow: 3,
    dots: false,
    // centerMode: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
}

function initializeSliderStyles(clss) {
  $(`.${clss}`).slick({
    dots: false,
    infinite: true,
    arrows: true,
    prevArrow:"<button type='button' class='slick-prev pull-left'> &lt;</button>",
    nextArrow:"<button type='button' class='slick-next pull-right'> &gt; </button>",
    speed: 300,
    slidesToShow: 5,
    variableWidth: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          // slidesToShow: 3,
          // slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          // slidesToShow: 2,
          // slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          // slidesToShow: 1,
          // slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
}


$(document).ready(function () {
  initializeSlider(`slider`);
  initializeSlider(`shoes-list`);
  initializeSliderStyles(`scrollable-categories`);
});
