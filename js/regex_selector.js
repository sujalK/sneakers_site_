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