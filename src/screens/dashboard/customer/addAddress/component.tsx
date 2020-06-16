import ContainerComponent from "containers/components/layout/container";
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdbreact";
import React from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getAddressesByIdAction, setListAddressesAction } from "../redux/actions";
// import {getAllShippingsAction} from "../../"
import { IProps, IState } from "./propState";

class AddAddressScreen extends React.Component<IProps> {
  state: IState = {
    modalAddStatus: false,
    modalEditStatus: false,
    searchKey: "",
    itemOrder: [],
    totalCost: 0,
    searchKeyCustomer: "",
    currentCustomer: null,
    currentPayment: null,
    currentShipping: null,
    currentAccount: null,
    currentAddress: null,
    code: null,
    paymentStatus: null
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
    // this.props.getAllAddressesAction();
    let id = await localStorage.getItem("router");
    this.props.getAddressesByIdAction(id);
    console.log(this.props.listCustomers.dataAddress, "0");
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
    this.props.listCustomers.dataAddress.map((x, index) => {
      if (x.id === item.id) {
        this.props.listCustomers.dataAddress.splice(index, 1);
        this.props.setListAddressesAction(this.props.listCustomers.dataAddress);
      }
    });
  };

  handleChange = (field: string) => (event: any) => {
    event.persist();
    this.setState(state => ({ ...state, [field]: event.target.value }));
  };

  render() {
    const columns = [
      {
        name: "Address",
        selector: "address",
        sortable: true,
        width: "200px"
      },
      {
        name: "Zip Code",
        selector: "zipCode",
        sortable: true,
        width: "100px"
      },
      {
        name: "Default",
        selector: "isDefault",
        sortable: true,
        width: "100px"
      },
      {
        name: "Customer",
        selector: "customerId",
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

    // const data = this.props.listCustomers.dataAddress.filter(x => {
    //   return x.address.toLowerCase().includes(this.state.searchKey.toLowerCase());
    // });

    return (
      <ContainerComponent>
        <MDBContainer>
          <MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <MDBInput hint="Search" type="text" containerClass="mt-0" onChange={this.handleChange("searchKey")} />
                <DataTable
                  title="Address"
                  columns={columns}
                  theme="solarized"
                  data={this.props.listCustomers.dataAddress}
                  pagination={true}
                />
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
    listCustomers: state.screen.customer
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ getAddressesByIdAction, setListAddressesAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddAddressScreen);
