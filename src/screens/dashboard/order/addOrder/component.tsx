import ContainerComponent from "containers/components/layout/container";
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow, MDBSelect, MDBTable } from "mdbreact";
import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getAllAddressesAction } from "../../customer/redux/actions";
import { getAllItemsAction } from "../../item/redux/actions";
import { getAllPaymentsAction } from "../../payment/redux/actions";
import { getAllShippingsAction } from "../../shipping/redux/actions";
import { addOrderAction, setListItemsCartAction } from "../redux/actions";
import { IProps, IState } from "./propState";

class AddOrderScreen extends React.Component<IProps> {
  state: IState = {
    modalAddStatus: false,
    modalEditStatus: false,
    searchKey: "",
    itemOrder: [],
    totalCost: 0,
    searchKeyCustomer: "",
    currentPayment: null,
    currentShipping: null,
    currentAccount: null,
    currentAddress: null,
    code: moment(new Date()).format("hhmmssDDMMYYYY"),
    paymentStatus: null,
    optionPayments: [],
    optionShippings: []
  };

  static getDerivedStateFromProps(state, props) {
    if (props.listCart !== state.itemOrder) {
      return {
        itemOrder: props.listCart
      };
    }
    return null;
  }

  componentDidMount() {
    this.props.getAllItemsAction();
    this.props.getAllAddressesAction();
    this.props.getAllPaymentsAction();
    this.props.getAllShippingsAction();
  }

  toggleModalAdd = () => {
    this.setState({
      modalAddStatus: !this.state.modalAddStatus
    });
  };

  toggleModalEdit = () => {
    this.setState({
      modalEditStatus: !this.state.modalEditStatus
    });
  };

  saveAdd = () => {};

  saveEdit = () => {};

  delete = item => () => {
    this.props.listCart.dataCart.map((x, index) => {
      if (x.id === item.id) {
        this.props.listCart.dataCart.splice(index, 1);
        this.setState({
          totalCost: this.state.totalCost - (item.sellingPrice - (item.sellingPrice * item.sale) / 100)
        });
        this.props.setListItemsCartAction(this.props.listCart.dataCart);
      }
    });
  };

  chooseCustomer = address => () => {
    this.setState({
      currentAddress: address
    });
  };

  addItem = item => () => {
    let new_item = {
      id: item.id,
      product: item.product,
      productId: item.productId,
      sale: item.sale,
      sellingPrice: item.sellingPrice,
      status: item.status,
      quantity: 1
    };
    // if (this.state.itemOrder.dataCart && this.state.itemOrder.dataCart.length > 0) {
    //   this.state.itemOrder.dataCart.map(x => {
    //     if (x.id === new_item.id) {
    //       x.quantity = x.quantity + 1;
    //       this.props.setListItemsCartAction(this.state.itemOrder.dataCart);
    //     } else {
    //       this.state.itemOrder.dataCart.push(new_item);
    //       this.props.setListItemsCartAction(this.state.itemOrder.dataCart);
    //     }
    //   });
    // } else {
    this.props.listCart.dataCart.push(new_item);
    this.setState({
      totalCost: this.state.totalCost + new_item.sellingPrice - (new_item.sellingPrice * new_item.sale) / 100
    });
    this.props.setListItemsCartAction(this.props.listCart.dataCart);
    // }
  };

  confirmOrder = () => {
    console.log(
      this.state.code,
      this.state.paymentStatus,
      this.state.totalCost,
      this.state.currentPayment,
      this.state.currentShipping,
      this.props.account.id,
      this.state.currentAddress.id
    );
    this.props.addOrderAction(
      this.state.code,
      this.state.paymentStatus ? "paid" : "unpaid",
      this.state.totalCost,
      this.state.currentPayment,
      this.state.currentShipping,
      this.props.account.id,
      this.state.currentAddress.id
    );
  };

  handleSelectShippingChange = event => {
    this.setState({ ...this.state, currentShipping: event[0] });
  };

  handleSelectPaymentChange = event => {
    this.setState({ ...this.state, currentPayment: event[0] });
  };

  handleChange = (field: string) => (event: any) => {
    event.persist();
    this.setState(state => ({ ...state, [field]: event.target.value }));
  };

  render() {
    const columns = [
      {
        name: "Product Name",
        selector: "product.name",
        sortable: true,
        width: "200px"
      },
      {
        name: "Product Code",
        selector: "product.code",
        sortable: true,
        width: "100px"
      },
      {
        name: "Selling Price",
        selector: "sellingPrice",
        sortable: true,
        width: "100px"
      },
      {
        name: "Sale",
        selector: "sale",
        sortable: true,
        width: "100px"
      },
      {
        name: "Quantity",
        selector: "product.quantity",
        sortable: true,
        width: "100px"
      },
      {
        name: "Options",
        cell: row => (
          <div>
            <MDBBtn onClick={this.addItem(row)}>Add</MDBBtn>
          </div>
        ),
        right: true,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "200px"
      }
    ];

    const columnItem = [
      {
        name: "Product Name",
        selector: "product.name",
        sortable: true,
        width: "200px"
      },
      {
        name: "Product Code",
        selector: "product.code",
        sortable: true,
        width: "100px"
      },
      {
        name: "Selling Price",
        selector: "sellingPrice",
        sortable: true,
        width: "100px"
      },
      {
        name: "Sale",
        selector: "sale",
        sortable: true,
        width: "100px"
      },
      {
        name: "Quantity",
        selector: "quantity",
        sortable: true,
        width: "100px"
      },
      {
        name: "Options",
        cell: row => (
          <div>
            <MDBBtn onClick={this.delete(row)}>Delete</MDBBtn>
          </div>
        ),
        right: true,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "200px"
      }
    ];

    const columnCustomer = [
      {
        name: "Name",
        selector: "customer.name",
        sortable: true,
        width: "200px"
      },
      {
        name: "Address",
        selector: "address",
        sortable: true,
        width: "100px"
      },
      {
        name: "Options",
        cell: row => (
          <div>
            <MDBBtn onClick={this.chooseCustomer(row)}>Add</MDBBtn>
          </div>
        ),
        right: true,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "200px"
      }
    ];

    const data = this.props.listItems.data.filter(x => {
      return x.product.name.toLowerCase().includes(this.state.searchKey.toLowerCase());
    });
    const dataCustomer = this.props.listAddresses.filter(x => {
      return x.customer.name.toLowerCase().includes(this.state.searchKeyCustomer.toLowerCase());
    });

    this.props.listPayment.data.map(x => {
      let listPayment = {
        text: x.method,
        value: x.id
      };
      this.state.optionPayments.push(listPayment);
    });

    this.props.listShipping.data.map(x => {
      let listShipping = {
        text: x.type,
        value: x.id
      };
      this.state.optionShippings.push(listShipping);
    });

    return (
      <ContainerComponent>
        <MDBContainer>
          <MDBRow>
            <MDBRow>
              <MDBCol md="9">
                <DataTable
                  title="Items in cart"
                  columns={columnItem}
                  theme="solarized"
                  data={this.props.listCart.dataCart}
                  pagination={true}
                />
              </MDBCol>
              <MDBCol md="9">
                <MDBInput hint="Search" type="text" containerClass="mt-0" onChange={this.handleChange("searchKey")} />
                <DataTable title="Items" columns={columns} theme="solarized" data={data} pagination={true} />
              </MDBCol>
              <MDBCol md="3">
                <MDBRow>
                  <MDBCol>
                    Khách hàng: {this.state.currentAddress ? this.state.currentAddress.customer.name : null}
                  </MDBCol>
                </MDBRow>
                <MDBBtn onClick={this.handleChange("searchKeyCustomer")}>Thêm khách hàng mới</MDBBtn>
                <MDBRow>
                  <MDBInput hint="Search" type="text" containerClass="mt-0" />
                  <DataTable columns={columnCustomer} theme="solarized" data={dataCustomer} />
                </MDBRow>
                <MDBRow>
                  <MDBSelect
                    options={this.state.optionPayments}
                    selected="Choose payment method"
                    label="Payment Method"
                    getValue={this.handleSelectPaymentChange}
                  />
                </MDBRow>
                <MDBRow>
                  <MDBSelect
                    options={this.state.optionShippings}
                    selected="Choose shipping info"
                    label="Shipping Info"
                    getValue={this.handleSelectShippingChange}
                  />
                </MDBRow>
                <MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <MDBTable>
                        <tr>
                          <td>Tổng tiền</td>
                          <td>{this.state.totalCost}</td>
                        </tr>
                      </MDBTable>
                      <MDBInput
                        checked={this.state.paymentStatus}
                        label="Default unchecked"
                        type="checkbox"
                        id="checkbox1"
                        onChange={() => {
                          this.setState({
                            paymentStatus: !this.state.paymentStatus
                          });
                        }}
                      />
                      <MDBBtn color="primary" onClick={this.confirmOrder}>
                        Thanh toán
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBRow>
        </MDBContainer>
      </ContainerComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    listItems: state.screen.item,
    listAddresses: state.screen.customer.dataAddress,
    listCart: state.screen.order,
    listShipping: state.screen.shipping,
    listPayment: state.screen.payment,
    account: state.screen.accountInfo.accountInfo
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAllItemsAction,
      getAllAddressesAction,
      setListItemsCartAction,
      getAllShippingsAction,
      getAllPaymentsAction,
      addOrderAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddOrderScreen);
