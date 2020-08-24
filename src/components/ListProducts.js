import React, { Component } from "react";
import { TiPlus, TiMinus } from "react-icons/ti";

class ListProducts extends Component {
  render() {
    return (
      <div className="mb-3">
        {this.props.products.map((item) => (
          <div key={item.prodId} className="col media py-3">
            <div className="media-body">
              <div className="d-flex">
                <span>
                  <img className="manImg" src={item.imageURL} alt="logo product"></img>
                </span>
              </div>

              <div>
                <span>{item.productName}</span>
              </div>
              <div>{item.productDescription}</div>
            </div>

            <div className="mr-3">
              <button className="btn btn-sm btn-primary" onClick={() => this.props.decreaseProduct(item)}>
                <TiPlus />
              </button>
            </div>
            <div className="mr-3">
              <button className="btn btn-sm btn-primary" onClick={() => this.props.increaseProduct(item)}>
                <TiMinus />
              </button>
            </div>
            <div className="mr-3">
              <button
                className={`btn btn-sm ${
                  item.stockQuantity > 15
                    ? "btn-success"
                    : item.stockQuantity >= 6
                    ? "btn-yellow"
                    : item.stockQuantity >= 1
                    ? "btn-warning"
                    : "btn-danger"
                }`}
              >
                {item.stockQuantity}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ListProducts;
