import { Cart } from './Cart.js';
var Store = (function () {
    function Store() {
        this.cart = new Cart;
    }
    Store.prototype.getCart = function () {
        return this.cart;
    };
    return Store;
}());
export { Store };
