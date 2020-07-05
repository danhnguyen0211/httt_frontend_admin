import ContainerComponent from "containers/components/layout/container";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBSelect,
  MDBTable,
  MDBIcon,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from "mdbreact";
import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getAllAddressesAction } from "../../customer/redux/actions";
import { getAllItemsAction } from "../../item/redux/actions";
import { getAllPaymentsAction } from "../../payment/redux/actions";
import { getAllShippingsAction } from "../../shipping/redux/actions";
import { addOrderAction, setListItemsCartAction, addCartItemAction, addNewCustomerOrderAction } from "../redux/actions";
import { IState } from "./propState";

class AddOrderScreen extends React.Component<any> {
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
    listPayment: [],
    listShipping: [],
    name: null,
    phone: null,
    age: null,
    sex: "Male",
    username: null,
    password: null,
    id: null,
    address: null,
    zipCode: null,
    options: [
      {
        checked: true,
        text: "Male",
        value: "Male"
      },
      {
        text: "Female",
        value: "Female"
      },
      {
        text: "Other",
        value: "Other"
      }
    ]
  };

  static getDerivedStateFromProps(state, props) {
    if (props.listCart !== state.itemOrder) {
      return {
        itemOrder: props.listCart
      };
    }
    return null;
  }

  async componentDidMount() {
    this.props.getAllItemsAction();
    this.props.getAllAddressesAction();
    this.props.getAllPaymentsAction();
    this.props.getAllShippingsAction();
    const listPayments = await localStorage.getItem("listPayment");
    const listPayment = JSON.parse(listPayments);
    const listShippings = await localStorage.getItem("listShipping");
    const listShipping = JSON.parse(listShippings);

    this.setState({
      listPayment,
      listShipping
    });
  }

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
    const dataCart = this.props.listCart.dataCart;
    let new_item = {
      id: item.id,
      product: item.product,
      productId: item.productId,
      sale: item.sale,
      sellingPrice: item.sellingPrice,
      status: item.status,
      quantity: 1
    };
    if (dataCart && dataCart.length > 0) {
      let count = 0;
      dataCart.map(x => {
        if (x.id === new_item.id) {
          count = count + 1;
          x.quantity = x.quantity + 1;
          this.props.setListItemsCartAction(dataCart);
          this.setState({
            totalCost: this.state.totalCost + item.sellingPrice - (item.sellingPrice * item.sale) / 100
          });
        }
      });
      if (count === 0) {
        dataCart.push(new_item);
        this.props.setListItemsCartAction(dataCart);
        this.setState({
          totalCost: this.state.totalCost + item.sellingPrice - (item.sellingPrice * item.sale) / 100
        });
      }
    } else {
      dataCart.push(new_item);
      this.setState({
        totalCost: this.state.totalCost + item.sellingPrice - (item.sellingPrice * item.sale) / 100
      });
      this.props.setListItemsCartAction(dataCart);
    }
  };

  confirmOrder = async () => {
    const addressId = await localStorage.getItem("addressId");
    if (addressId) {
      this.props.addOrderAction(
        this.state.code,
        this.state.paymentStatus ? "paid" : "unpaid",
        this.state.totalCost,
        this.state.currentPayment,
        this.state.currentShipping,
        this.props.account.id,
        parseInt(addressId)
      );
    } else {
      this.props.addOrderAction(
        this.state.code,
        this.state.paymentStatus ? "paid" : "unpaid",
        this.state.totalCost,
        this.state.currentPayment,
        this.state.currentShipping,
        this.props.account.id,
        this.state.currentAddress.id
      );
    }

    localStorage.removeItem("addressId");
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

  saveAdd = () => {
    this.props.addNewCustomerAction(
      this.state.name,
      this.state.phone,
      this.state.age,
      this.state.sex,
      this.state.username,
      this.state.password
    );
    this.setState({
      modalAddStatus: !this.state.modalAddStatus
    });
  };

  handleSelectChange = event => {
    this.setState({ ...this.state, sex: event[0] });
  };

  handleChangeCustomer = (field: string) => (event: any) => {
    event.persist();
    this.setState(state => ({ ...state, [field]: event.target.value }));
  };

  toggleModalAdd = () => {
    this.clear();
    this.setState({
      modalAddStatus: !this.state.modalAddStatus
    });
  };

  clear = () => {
    this.setState({
      name: null,
      phone: null,
      age: null,
      sex: "Male",
      username: null,
      password: null
    });
  };

  addCustomer = () => {
    this.props.addNewCustomerOrderAction(
      this.state.name,
      this.state.phone,
      this.state.age,
      this.state.sex,
      this.state.username,
      this.state.password,
      this.state.address,
      this.state.zipCode
    );
    this.toggleModalAdd();
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
        width: "70px"
      },
      {
        name: "Quantity",
        selector: "product.quantity",
        sortable: true,
        width: "70px"
      },
      {
        name: "Options",
        cell: row => (
          <div>
            <MDBBtn floating size="sm" gradient="blue" onClick={this.addItem(row)}>
              <MDBIcon icon="plus" />
            </MDBBtn>
          </div>
        ),
        right: true,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "100px"
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
        width: "70px"
      },
      {
        name: "Quantity",
        selector: "quantity",
        sortable: true,
        width: "70px"
      },
      {
        name: "Options",
        cell: row => (
          <div>
            <MDBBtn floating size="sm" gradient="blue" onClick={this.delete(row)}>
              <MDBIcon icon="trash" />
            </MDBBtn>
          </div>
        ),
        right: true,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "100px"
      }
    ];

    const columnCustomer = [
      {
        name: "Name",
        selector: "customer.name",
        sortable: true,
        width: "130px"
      },
      {
        name: "Address",
        selector: "address",
        sortable: true,
        width: "170px"
      },
      {
        name: "Options",
        cell: row => (
          <div>
            <MDBBtn floating size="sm" gradient="blue" onClick={this.chooseCustomer(row)}>
              <MDBIcon icon="plus" />
            </MDBBtn>
          </div>
        ),
        right: true,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "70px"
      }
    ];

    const data = this.props.listItems.data.filter(x => {
      return x.product.name.toLowerCase().includes(this.state.searchKey.toLowerCase());
    });
    const dataCustomer = this.props.listAddresses.filter(x => {
      return x.customer.name.toLowerCase().includes(this.state.searchKeyCustomer.toLowerCase());
    });

    const modalAddUser = this.state.modalAddStatus ? (
      <MDBModal isOpen={this.state.modalAddStatus} toggle={this.toggleModalAdd}>
        <MDBModalHeader toggle={this.toggleModalAdd}>
          <strong>Add a new customer</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput
            label="Name"
            value={this.state.name ? this.state.name : ""}
            onChange={this.handleChangeCustomer("name")}
          />
          <MDBInput
            label="Phone"
            value={this.state.phone ? this.state.phone : ""}
            onChange={this.handleChangeCustomer("phone")}
          />
          <MDBInput
            label="Age"
            value={this.state.age ? this.state.age : ""}
            onChange={this.handleChangeCustomer("age")}
          />
          <MDBSelect
            options={this.state.options}
            selected="Choose Sex"
            label="Sex"
            getValue={this.handleSelectChange}
          />
          <MDBInput
            label="Address"
            value={this.state.address ? this.state.address : ""}
            onChange={this.handleChangeCustomer("address")}
          />
          <MDBInput
            label="Zipcode"
            value={this.state.zipCode ? this.state.zipCode : ""}
            onChange={this.handleChangeCustomer("zipCode")}
          />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggleModalAdd}>
            Close
          </MDBBtn>
          <MDBBtn color="primary" onClick={this.addCustomer}>
            Save
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    ) : null;

    return (
      <ContainerComponent>
        {modalAddUser}
        <MDBContainer>
          <MDBRow>
            <MDBRow>
              <MDBCol md="8">
                <DataTable
                  title="Items in cart"
                  columns={columnItem}
                  theme="solarized"
                  data={this.props.listCart.dataCart}
                  pagination={true}
                />
              </MDBCol>
              <MDBCol md="8">
                <MDBInput hint="Search" type="text" containerClass="mt-0" onChange={this.handleChange("searchKey")} />
                <DataTable title="Items" columns={columns} theme="solarized" data={data} pagination={true} />
              </MDBCol>
              <MDBCol md="4">
                <MDBRow>
                  <MDBCol>
                    Khách hàng:{" "}
                    {this.state.name
                      ? this.state.name
                      : this.state.currentAddress
                      ? this.state.currentAddress.customer.name
                      : null}
                  </MDBCol>
                </MDBRow>
                <MDBBtn gradient="blue" onClick={this.toggleModalAdd}>
                  Thêm khách hàng mới
                </MDBBtn>
                <MDBRow>
                  <MDBInput
                    hint="Search"
                    type="text"
                    containerClass="mt-0"
                    onChange={this.handleChange("searchKeyCustomer")}
                  />
                  <DataTable columns={columnCustomer} theme="solarized" data={dataCustomer} />
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
                      <MDBBtn gradient="blue" color="primary" onClick={this.confirmOrder}>
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
      addOrderAction,
      addCartItemAction,
      addNewCustomerOrderAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddOrderScreen);
