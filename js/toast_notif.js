// for toast notification
class ToastNotification {
    // accepts the element name to be created
    constructor(elementName = "div", className = "notice") {
        this.elementName = elementName;
        this.className   = className;
    }

    // popupOnUI
    popupNotice(parentElement, message, msgType) {
        // setUp message type
        this.msgType = msgType;
        // insert the notice
        parentElement.insertAdjacentElement('beforeend', this.prepareElement(message));
    }

    // prepare the toast notification
    prepareElement(noticeText) {
        // createElement
        const element = this.createElement();

        // add class Name
        element.className = this.className;

        if (this.msgType === 'error') {
            // element.style = 'z-index: 1000000000';

            element.innerHTML = `
            <span class="check-circle redish-notice">
                <i class="lnr lnr-checkmark-circle"></i> 
            </span>
            <span class="saved-text">${noticeText}</span>
            <!-- <span class="close-notice">&times;</span> -->
            `;

            // remove the element after few seconds
            setTimeout(function() {
                element.remove();
            }, 3000);

        } else if (this.msgType === 'success') {
            // console.log("SUCCESS - ")
            // add text content to the element
            element.innerHTML = `
            <span class="check-circle">
                <i class="lnr lnr-checkmark-circle"></i> 
            </span>
            <span class="saved-text">${noticeText} <a href="saved_items.html" class="underline">show</a></span>
            <!-- <span class="close-notice">&times;</span> -->
            `;
        }

        return element;
    }

    // create an element
    createElement() {
        return document.createElement(this.elementName);
    }
}