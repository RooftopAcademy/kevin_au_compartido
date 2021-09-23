export var productItem = function (product) {
    var div = document.createElement('div');
    div.classList.add('laptop__content');
    div.innerHTML = "\n      <img src=" + product.imgUrl + " alt=" + product.name + " class=\"laptop__img\" />\n      <h3 class=\"laptop__title\">" + product.name + "</h3>\n      <span>" + product.category + "</span>\n      <span>$" + product.price + "</span>\n      <a href=\"#detail__section\" data-laptop-id=\"" + product.id + "\" class=\"button laptop__button\">View More</a>\n  ";
    return div;
};
