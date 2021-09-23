"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
var Cart = /** @class */ (function () {
    function Cart() {
        this.products = [];
    }
    Cart.prototype.add = function (product) {
        if (product) {
            this.products.push(product);
        }
        else {
            throw new Error('Invalid Product');
        }
    };
    return Cart;
}());
exports.Cart = Cart;
