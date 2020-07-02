import config from "containers/config";
import { MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from "mdbreact";
import React from "react";
import { IProps, IState } from "./propState";

class Cart extends React.Component<IProps> {
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
      total += Number(item.quantity) * Number(item.item.sellingPrice);
      return item;
    });
    console.log(total);
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber],
      cartItems,
      totalCost: total
    });
  };

  handleInputChange = (id: Number) => (event: any) => {
    event.persist();
    const cartItemMap = this.state.cartItems.map(item => {
      if (item.itemId == id) {
        item.quantity = event.target.value;
      }
      return item;
    });
    console.log("SASDASD");
    this.setState({ cartItems: cartItemMap });
    localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
  };

  render() {
    const itemList = this.state.cartItems.map(item => (
      <MDBModalBody key={item.itemId}>
        <img
          src={
            item.item.product.image[0]
              ? `${config.HOST_API}/${item.item.product.image[0].url}`
              : `${config.HOST_API}/noimage.jpg`
          }
        ></img>
        <span>{item.item.product.name}</span>
        <input type="number" defaultValue={item.quantity} onChange={this.handleInputChange(item.itemId)}></input>
        <span>x {item.item.sellingPrice}</span>
      </MDBModalBody>
    ));
    return (
      <MDBContainer>
        <MDBBtn color="info" onClick={this.toggle(8)}>
          {this.props.title}
        </MDBBtn>
        <MDBModal isOpen={this.state.modal8} toggle={this.toggle(8)} fullHeight position="right">
          <MDBModalHeader toggle={this.toggle(8)}>Giỏ hàng</MDBModalHeader>
          {itemList}
          <MDBModalFooter>Total: {this.state.totalCost}</MDBModalFooter>

          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle(8)}>
              Đóng
            </MDBBtn>
            <MDBBtn color="primary">Thanh toán</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default Cart;
