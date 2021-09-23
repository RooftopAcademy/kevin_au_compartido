"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Catalog = void 0;
var Catalog = /** @class */ (function () {
    function Catalog() {
        this._products = [];
    }
    Catalog.prototype.addProduct = function (product) {
        this._products.push(product);
    };
    Catalog.prototype.findProductById = function (id) {
        return this._products.find(function (p) { return p.id == id; });
    };
    return Catalog;
}());
exports.Catalog = Catalog;
