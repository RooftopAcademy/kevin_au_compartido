import { productItem } from "../views/productItem.js";
import { productDetail } from "../views/productDetail.js";
var UI = (function () {
    function UI() {
    }
    UI.prototype.displayProducts = function (productListDOM, products) {
        products.forEach(function (product) { return productListDOM.appendChild(productItem(product)); });
    };
    UI.prototype.showProductDetail = function (DOMref, product) {
        DOMref.innerHTML = "";
        DOMref.appendChild(productDetail(product));
    };
    UI.prototype.displayLoading = function (loaderDOM, state) {
        state
            ? loaderDOM.classList.add("display")
            : loaderDOM.classList.remove("display");
    };
    UI.prototype.showDetails = function (productDetailDOM, productId, products) {
        var product = products.filter(function (p) { return p.id == productId; })[0];
        this.showProductDetail(productDetailDOM, product);
    };
    UI.prototype.updateCart = function (DOMref, value) {
    };
    return UI;
}());
export { UI };
