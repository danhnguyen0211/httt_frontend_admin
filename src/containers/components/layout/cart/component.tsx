import config from "containers/config";
import { MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from "mdbreact";
import React from "react";
import { IProps, IState } from "./propState";
import { withRouter } from "react-router";

class Cart extends React.Component<any> {
  state: IState = {
    modal8: false,
    cartItems: [],
    totalCost: 0
  };

  setcartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    this.setState({ cartItems });
  };

  toggle = nr => () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    var total = 0;
    cartItems.map(item => {
      total += Number(item.quantity) * (item.item.sellingPrice - (item.item.sellingPrice * item.item.sale) / 100);
      return item;
    });
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
      cartItems,
      totalCost: total
    });
    localStorage.setItem("totalCost", JSON.stringify(total));
  };
  // goCheckout = () => {
  //   const cartItemMap = this.state.cartItems.map(item => {
  //     if (item.itemId == id) {
  //       console.log(item.item.product.quantity, "item.item.product.quantity");
  //       if (event.target.value <= item.item.product.quantity) {
  //         item.quantity = parseInt(event.target.value);
  //       } else {
  //         // event.target.value = item.item.product.quantity;
  //         // item.quantity = parseInt(item.item.product.quantity);
  //       }
  //     }
  //     return item;
  //   });
  // }
  handleInputChange = (id: Number) => (event: any) => {
    event.persist();
    var total = 0;

    const cartItemMap = this.state.cartItems.map(item => {
      if (item.itemId == id) {
        console.log(item.item.product.quantity, "item.item.product.quantity");
        if (event.target.value <= item.item.product.quantity) {
          item.quantity = parseInt(event.target.value);
        } else {
          // event.target.value = item.item.product.quantity;
          // item.quantity = parseInt(item.item.product.quantity);
          alert("Trong kho khong du san pham");
          event.target.value = item.item.product.quantity;
          item.quantity = parseInt(item.item.product.quantity);
        }
      }
      return item;
    });
    this.setState({ cartItems: cartItemMap });
    localStorage.setItem("cartItems", JSON.stringify(cartItemMap));

    this.state.cartItems.map(item => {
      total += Number(item.quantity) * (item.item.sellingPrice - (item.item.sellingPrice * item.item.sale) / 100);
      return item;
    });

    this.setState({ totalCost: total });
    localStorage.setItem("totalCost", JSON.stringify(total));
  };

  render() {
    const itemList = this.state.cartItems.map(item => (
      <MDBModalBody key={item.itemId}>
        <img
          className="cart-image"
          src={
            item.item.product.image[0]
              ? `${config.HOST_API}/${item.item.product.image[0].url}`
              : `${config.HOST_API}/noimage.jpg`
          }
        ></img>
        <p>{item.item.product.name}</p>
        <input
          type="number"
          min={0}
          max={item.item.product.quantity}
          defaultValue={item.quantity}
          onChange={this.handleInputChange(item.itemId)}
        ></input>
        <span> x {item.item.sellingPrice - (item.item.sellingPrice * item.item.sale) / 100}</span>
      </MDBModalBody>
    ));
    return (
      <MDBContainer fluid>
        <button className="cart" onClick={this.toggle(8)}>
          {this.props.title}
        </button>
        <MDBModal isOpen={this.state.modal8} toggle={this.toggle(8)} fullHeight position="right">
          <MDBModalHeader toggle={this.toggle(8)}>Giỏ hàng</MDBModalHeader>
          {itemList}
          <MDBModalFooter>Total: {this.state.totalCost}</MDBModalFooter>

          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle(8)}>
              Đóng
            </MDBBtn>
            <MDBBtn color="primary" onClick={this.props.goCheckout}>
              Thanh toán
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default withRouter(Cart);
