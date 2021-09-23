var Cart = (function () {
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
export { Cart };
