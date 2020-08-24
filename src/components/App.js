import React, { Component } from "react";
import "../css/App.css";
import ListProducts from "./ListProducts";
import HeadBar from "./HeadBar";
import { findIndex } from "lodash";

class App extends Component {
  constructor() {
    super();
    this.state = {
      myProducts: [],
      cartProducts: [],
      lastIndex: 0,
      productsOnCart: 0,
    };
    this.decreaseProduct = this.decreaseProduct.bind(this);
    this.increaseProduct = this.increaseProduct.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.getProductsOnCart = this.getProductsOnCart.bind(this);
  }

  /**
   * Reduces the quantity of a product in the list by one. Adds it to the cart.
   *
   * @param {product to be added to the cart} prod
   */
  async decreaseProduct(prod) {
    if (this.state.myProducts[prod.prodId]["stockQuantity"] > 0) {
      let tempProducts = JSON.parse(JSON.stringify(this.state.myProducts));
      tempProducts[prod.prodId]["stockQuantity"] -= 1;

      await this.addToCart(prod);

      this.setState({
        myProducts: tempProducts,
        productsOnCart: this.getProductsOnCart(),
      });
    }
  }

  /**
   * Increases the quantity of a product in the list by one. Removes it from the cart.
   *
   * @param {product to be added to the cart} prod
   */
  async increaseProduct(prod) {
    let prodIndex = this.getProductIndex(this.state.cartProducts, prod.prodId);
    if (prodIndex !== -1) {
      let tempProducts = JSON.parse(JSON.stringify(this.state.myProducts));
      tempProducts[prod.prodId]["stockQuantity"] += 1;

      await this.removeFromCart(prod);

      this.setState({
        myProducts: tempProducts,
        productsOnCart: this.getProductsOnCart(),
      });
    }
  }

  /**
   * Adds a certain product quantity by one to the cart list. If the product does not yet exist, it is then added to the list.
   *
   * @param {product to be added} prod
   */
  addToCart(prod) {
    let tempCartProducts = JSON.parse(JSON.stringify(this.state.cartProducts));
    let prodIndex = findIndex(this.state.cartProducts, {
      prodId: prod.prodId,
    });
    if (prodIndex === -1) {
      let tempProduct = JSON.parse(JSON.stringify(prod));
      tempProduct["stockQuantity"] = 1;
      tempCartProducts.unshift(tempProduct);
    } else {
      tempCartProducts[prodIndex]["stockQuantity"] += 1;
    }
    this.setState({
      cartProducts: tempCartProducts,
    });
  }

  /**
   * Reduces a certain product quantity by one from the cart list. If the quantity of that product is zero, removes it from the list.
   *
   * @param {product to be removed} prod
   */
  removeFromCart(prod) {
    let prodIndex = this.getProductIndex(this.state.cartProducts, prod.prodId);
    let tempCartProducts = JSON.parse(JSON.stringify(this.state.cartProducts));
    tempCartProducts[prodIndex]["stockQuantity"] -= 1;
    if (tempCartProducts[prodIndex]["stockQuantity"] === 0) {
      tempCartProducts.splice(prodIndex, 1);
    }
    this.setState({
      cartProducts: tempCartProducts,
    });
  }

  /**
   * Retrieves the number of products present in the cart.
   */
  getProductsOnCart() {
    let nProds = 0;
    try {
      this.state.cartProducts.forEach((prod) => {
        nProds = nProds + prod["stockQuantity"];
      });
    } catch (error) {
      console.error("No items in array!");
      console.error(error);
    }
    return nProds;
  }

  /**
   * Retrieves the correct index for a product within a list. If product does not exist, retrieves -1.
   *
   * @param {list of products} list
   * @param {index to be found} index
   */
  getProductIndex(list, index) {
    let prodIndex = findIndex(list, {
      prodId: index,
    });
    return prodIndex;
  }

  componentDidMount() {
    fetch("./products.json")
      .then((response) => response.json())
      .then((result) => {
        const prods = result.map((item) => {
          item.prodId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        });
        this.setState({
          myProducts: prods,
        });
      });
  }

  render() {
    return (
      <main className="page bg-white">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <HeadBar productsOnCart={this.state.productsOnCart} />
                <ListProducts products={this.state.myProducts} increaseProduct={this.increaseProduct} decreaseProduct={this.decreaseProduct} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
