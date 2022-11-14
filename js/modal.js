// UI elements
const infoModalClose   = document.querySelector(".close-info-modal-btn"),
      modal            = document.getElementById("info-modal"),
      okBtn            = document.querySelector(".ok-close-btn"),
      confirmationText = document.querySelector(".info-confirmation-text");

// add event listener for close icon
infoModalClose.addEventListener("click", () => {
    modal.classList.remove("show-info-modal");
});

// add event listener for OK button (close)
okBtn.addEventListener("click", e => {
    // check to see if the click is made on the little check icon 
    if(e.target.classList.contains('lnr-checkmark-circle')) {
        // if the checkbox is clicked, then remove the modal
        if (e.target.parentElement.previousElementSibling.children[0].children[0].checked === true) {
            modal.classList.remove("show-info-modal");
            // set the message to hide
            setMessageInfoToHide();
        }
    }

    // check to see if the click is made on the button
    if (e.target.classList.contains('ok-close-btn')) {
        // if the checkbox is clicked, then remove the modal
        if (e.target.previousElementSibling.children[0].children[0].checked === true) {
            modal.classList.remove("show-info-modal");
            // set the message to hide
            setMessageInfoToHide();
        }
    }
});

let check = false;
// when confirmation text is clicked, check the checkbox
confirmationText.addEventListener("click", e => {
    if (!check) {
        e.target.previousElementSibling.checked = true; // make checked to true
        check = true;
    } else {
        e.target.previousElementSibling.checked = false; // make checked to false
        check = false;
    }
});

// store the checked value on the localStorage
document.addEventListener("DOMContentLoaded", () => {
    // if message_info_status is set to 'hide' then hide
    if (localStorage.getItem('message_info_status') === 'hide') {
        // hide the modal
        modal.classList.remove("show-info-modal");
    }
});

// setMessageInfoToHide : in the localStorage
function setMessageInfoToHide() {
    // declaring message status key
    let msgStatusKey;

    if (localStorage.getItem('message_info_status') === null) {
        // set the message status key to hide
        msgStatusKey = 'hide';

        // set to hide
        localStorage.setItem('message_info_status', msgStatusKey);
    }
}