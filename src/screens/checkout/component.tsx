import TopNavComponent from "containers/components/layout/top-nav";
import { MDBBtn, MDBCol, MDBInput, MDBRow, MDBSelect, MDBNavLink } from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import { getAllShippingsAction } from "screens/dashboard/shipping/redux/actions";
import { getAllPaymentsAction } from "screens/dashboard/payment/redux/actions";
import DataTable from "react-data-table-component";
import moment from "moment";
import { addOrderClientAction } from "./redux/actions";
import { Link } from "react-router-dom";

class CheckoutComponent extends React.Component<any, any> {
  state: any = {
    username: "",
    password: "",
    repeat_password: "",
    flipped: false,
    currentPayment: null,
    currentShipping: null,
    dataCart: [],
    code: moment(new Date()).format("hhmmssDDMMYYYY"),
    listItem: [],
    listPayment: [],
    listShipping: []
  };

  async componentDidMount() {
    const cartItems = await localStorage.getItem("cartItems");
    let listItem = [];
    cartItems ? (listItem = JSON.parse(cartItems)) : null;
    const listPayments = await localStorage.getItem("listPayment");
    const listPayment = JSON.parse(listPayments);
    const listShippings = await localStorage.getItem("listShipping");
    const listShipping = JSON.parse(listShippings);

    this.setState({
      listItem,
      listPayment,
      listShipping
    });
  }

  handleSelectShippingChange = event => {
    this.setState({ ...this.state, currentShipping: event[0] });
  };

  handleSelectPaymentChange = event => {
    this.setState({ ...this.state, currentPayment: event[0] });
  };

  confirmOrder = async () => {
    const totalCost = await localStorage.getItem("totalCost");
    this.props.addOrderClientAction(
      this.state.code,
      "paid",
      totalCost,
      this.state.currentPayment,
      this.state.currentShipping,
      2,
      5
    );

    localStorage.removeItem("cartItems");
  };

  render() {
    console.log(this.state.listItem, "lis");
    const totalCost = localStorage.getItem("totalCost");

    const columnItem = [
      {
        name: "Product Name",
        selector: "item.product.name",
        sortable: true,
        width: "200px"
      },
      {
        name: "Product Code",
        selector: "item.product.code",
        sortable: true,
        width: "100px"
      },
      {
        name: "Selling Price",
        selector: "item.sellingPrice",
        sortable: true,
        width: "100px"
      },
      {
        name: "Sale",
        selector: "item.sale",
        sortable: true,
        width: "70px"
      },
      {
        name: "Quantity",
        selector: "quantity",
        sortable: true,
        width: "70px"
      }
    ];
    return (
      <MDBRow>
        <MDBCol sm="12" md="12" lg="12" xl="12" className="mx-auto my-auto">
          <TopNavComponent />
          <MDBRow style={{ margin: 50 }}>
            <MDBCol sm="12" md="12" lg="12" xl="12" style={{ textAlign: "center" }}>
              <strong style={{ fontWeight: "bold", fontSize: 30 }}>Checkout</strong>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol sm="4" md="2" lg="2" xl="2"></MDBCol>
            <MDBCol
              sm="12"
              md="5"
              lg="5"
              xl="5"
              style={{ backgroundColor: "#fff", border: "0.5px solid grey", padding: 30, borderRadius: 8 }}
            >
              <MDBRow>
                {this.state.listItem.length > 0 ? (
                  <DataTable
                    title="Items in cart"
                    columns={columnItem}
                    theme="solarized"
                    data={this.state.listItem ? this.state.listItem : null}
                    pagination={true}
                  />
                ) : (
                  <div>
                    <p>You haven't choose any items to buy?</p>
                    <Link to="/home">Shopping now!</Link>
                  </div>
                )}
                {this.state.listItem.length > 0 ? (
                  <DataTable
                    title="Items in cart"
                    columns={columnItem}
                    theme="solarized"
                    data={this.state.listItem ? this.state.listItem : null}
                    pagination={true}
                  />
                ) : null}
              </MDBRow>
              {this.state.listItem.length > 0 ? (
                <MDBRow>
                  <MDBCol sm="12" md="12" lg="12" xl="12" style={{ marginTop: 20 }}>
                    <p>Total: {totalCost}</p>
                    <MDBBtn color="primary" onClick={this.confirmOrder}>
                      Thanh toán
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              ) : null}
            </MDBCol>
            <MDBCol
              sm="12"
              md="3"
              lg="3"
              xl="3"
              style={{
                backgroundColor: "#fff",
                border: "0.5px solid grey",
                padding: 30,
                borderRadius: 8,
                marginLeft: 20
              }}
            >
              <MDBRow>
                <MDBCol sm="10" md="3" lg="3" xl="3">
                  <MDBInput label="Fullname" disabled />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol sm="10" md="3" lg="3" xl="3">
                  <MDBInput label="Username" disabled />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol sm="10" md="5" lg="5" xl="5">
                  <MDBInput label="Address" disabled />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBSelect
                  options={this.state.listPayment}
                  selected="Choose payment method"
                  label="Payment Method"
                  getValue={this.handleSelectPaymentChange}
                />
              </MDBRow>
              <MDBRow>
                <MDBSelect
                  options={this.state.listShipping}
                  selected="Choose shipping info"
                  label="Shipping Info"
                  getValue={this.handleSelectShippingChange}
                />
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    );
  }
}

const mapStateToProps = state => {
  return {
    listShipping: state.screen.shipping,
    listPayment: state.screen.payment,
    account: state.screen.accountInfo.accountInfo
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAllShippingsAction, getAllPaymentsAction, addOrderClientAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutComponent);
