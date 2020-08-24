import React, { Component } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

class HeadBar extends Component {
  render() {
    return (
      <div className="card-header bg-primary text-white mt-2">
        <div className="mr-3">
          <button className="btn btn-sm btn-light mb-2 mr-2 mt-2">
            <AiOutlineShoppingCart />
          </button>
          <button className="btn btn-sm btn-light rounded-circle mb-2 mr-2 mt-2">{this.props.productsOnCart}</button>
          <span className="label-item mb-2 mr-2 mt-2">Items</span>
        </div>
      </div>
    );
  }
}

export default HeadBar;
