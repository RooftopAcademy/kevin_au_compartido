"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
var Cart_js_1 = require("./Cart.js");
var Catalog_js_1 = require("./Catalog.js");
var Store = /** @class */ (function () {
    function Store() {
        this._catalog = new Catalog_js_1.Catalog;
        this._cart = new Cart_js_1.Cart;
    }
    Store.prototype.fetchProducts = function () {
        this.catalog.addProduct(new Product);
    };
    Store.prototype.getCart = function () {
        return this._cart;
    };
    return Store;
}());
exports.Store = Store;
