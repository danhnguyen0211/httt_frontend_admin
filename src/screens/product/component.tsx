import Cart from "containers/components/layout/cart";
import TopNavComponent from "containers/components/layout/client-top-nav";
import CustomerBar from "containers/components/layout/customerBar";
import config from "containers/config";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IProps, IState } from "./propState";
import { getItemByIdAction } from "./redux/actions";

class ProductComponent extends React.Component<IProps> {
  state: IState = {
    quantity: 1
  };
  componentDidMount() {
    this.props.getItemByIdAction(this.props.match.params.id);
  }

  handleChange = (field: string) => (event: any) => {
    event.persist();
    this.setState(state => ({ ...state, [field]: event.target.value }));
  };

  setOrderCode = () => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const obj = {
      orderId: null,
      itemId: this.props.item.data.id,
      quantity: this.state.quantity,
      cost:
        this.state.quantity *
        (this.props.item.sellingPrice - (this.props.item.sellingPrice * this.props.item.sale) / 100),
      item: this.props.item.data
    };
    if (Number(obj.quantity) > 0) {
      if (cartItems) {
        var isExisting = false;
        const cartItemsMap = cartItems.map(cart => {
          if (cart.itemId == obj.itemId) {
            if (cart.quantity + obj.quantity < cart.item.quantity) {
              cart.quantity = Number(cart.quantity) + Number(obj.quantity);
              isExisting = true;
            } else {
              isExisting = true;
            }
          }
          return cart;
        });
        if (!isExisting) {
          cartItemsMap.push(obj);
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItemsMap));
      } else {
        cartItems = [obj];
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }
    }
  };

  render() {
    const item = this.props.item.data ? this.props.item.data : {};
    const url = item.product && item.product.image[0] ? item.product.image[0].url : "noimage.jpg";

    const priceTag = item => {
      return item ? (
        item.sale === 0 ? (
          <div>
            <div>
              <p className="price-tag">Giá sách: {item.sellingPrice}VNĐ</p>
            </div>
          </div>
        ) : (
          <div>
            <p className="old-price">
              Giá sách: <span>{item.sellingPrice}VNĐ</span>
            </p>
            <p className="price-tag">
              Giá khuyến mại: <span>{item.sellingPrice - (item.sellingPrice * item.sale) / 100}VNĐ</span>
            </p>
          </div>
        )
      ) : (
        {}
      );
    };

    const title = () => {
      return (
        <button className="cart-btn" onClick={() => this.setOrderCode()}>
          Thêm vào giỏ hàng
        </button>
      );
    };
    return (
      <MDBContainer fluid>
        <TopNavComponent />
        <CustomerBar></CustomerBar>
        <MDBContainer fluid className="product-info-container">
          <MDBContainer className="product-info">
            <MDBRow className="product-info">
              <MDBCol size="4">
                <img src={`${config.HOST_API}/${url}`}></img>
              </MDBCol>
              <MDBCol size="4">
                <h3>{item.product ? item.product.name : "noimage.jpg"}</h3>
                <p>
                  Mã sản phẩm: <span>{item.product ? item.product.code : ""}</span>
                </p>
                <p>
                  Tác giả: <span>{item.product ? item.product.author : ""}</span>
                </p>
                <p>
                  NXB: <span>{item.product ? item.product.publisher : ""}</span>
                </p>
                <p>
                  Thể loại: <span> {item.product ? item.product.category.name : ""}</span>
                </p>
                <p>
                  Số lượng: <span>{item.product ? item.product.quantity : ""} quyển</span>
                </p>
              </MDBCol>
              <MDBCol size="4">
                {priceTag(item)}
                <div>
                  <input
                    type="number"
                    defaultValue={1}
                    min={1}
                    max={item.product ? item.product.quantity : 1}
                    onChange={this.handleChange("quantity")}
                  ></input>
                  <Cart handleClick={this.setOrderCode} title={title()}></Cart>
                </div>
              </MDBCol>
            </MDBRow>
            <hr></hr>
            <MDBRow>
              <h2>Giới thiệu sách</h2>
              <p>{item.product ? item.product.description : ""}</p>
            </MDBRow>
            <MDBRow></MDBRow>
          </MDBContainer>
        </MDBContainer>
      </MDBContainer>
    );
  }
}

const mapStateToProps = state => ({
  item: state.screen.productPage
});

const mapDispatchToProps = dispatch => bindActionCreators({ getItemByIdAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
