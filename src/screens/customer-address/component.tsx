import ContainerComponent from "containers/components/layout/container";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBRow,
  MDBNavLink
} from "mdbreact";
import React from "react";
import TopNavComponent from "containers/components/layout/client-top-nav";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import {
  addNewAddressAction,
  getAddressesByIdAction,
  setListAddressesAction,
  editAddressAction,
  deleteAddressAction
} from "screens/dashboard/customer/redux/actions";
import { IProps, IState } from "./propState";

class CustomerAddressScreen extends React.Component<any> {
  state: IState = {
    modalAddStatus: false,
    modalEditStatus: false,
    searchKey: "",
    zipcode: null,
    address: null,
    isDefault: false,
    customerId: null,
    id: null
  };

  async componentDidMount() {
    let id = await localStorage.getItem("router");
    this.setState({
      customerId: id
    });
    this.props.getAddressesByIdAction(id);
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

  openModalEdit = (id: number, address: string, zipcode: string, isDefault: number) => () => {
    this.setState({
      modalEditStatus: true,
      id,
      address,
      zipcode,
      isDefault
    });
  };

  saveAdd = () => {
    this.props.addNewAddressAction(
      this.state.address,
      this.state.zipcode,
      this.state.isDefault ? 1 : 0,
      parseInt(this.state.customerId.toString())
    );
    this.toggleModalAdd();
  };

  saveEdit = () => {
    this.props.editAddressAction(
      this.state.id,
      this.state.address,
      this.state.zipcode,
      this.state.isDefault ? 1 : 0,
      this.state.customerId
    );
    this.toggleModalEdit();
  };

  delete = (id: number) => () => {
    this.props.deleteAddressAction(id);
    this.props.listCustomers.dataAddress.map((x, index) => {
      if (x.id === id) {
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
    const modalAddUser = this.state.modalAddStatus ? (
      <MDBModal isOpen={this.state.modalAddStatus} toggle={this.toggleModalAdd}>
        <MDBModalHeader toggle={this.toggleModalAdd}>
          <strong>Add a new address</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput
            label="Address"
            value={this.state.address ? this.state.address : ""}
            onChange={this.handleChange("address")}
          />
          <MDBInput
            label="Zipcode"
            value={this.state.zipcode ? this.state.zipcode : ""}
            onChange={this.handleChange("zipcode")}
          />
          <MDBInput
            label="Is default?"
            type="checkbox"
            id="checkbox1"
            checked={this.state.isDefault}
            onChange={() => {
              this.setState({
                isDefault: !this.state.isDefault
              });
            }}
          />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggleModalAdd}>
            Close
          </MDBBtn>
          <MDBBtn color="primary" onClick={this.saveAdd}>
            Save
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    ) : null;

    const modalEditUser = this.state.modalEditStatus ? (
      <MDBModal isOpen={this.state.modalEditStatus} toggle={this.toggleModalEdit}>
        <MDBModalHeader toggle={this.toggleModalEdit}>
          <strong>Edit the address</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput
            label="Address"
            value={this.state.address ? this.state.address : ""}
            onChange={this.handleChange("address")}
          />
          <MDBInput
            label="Zipcode"
            value={this.state.zipcode ? this.state.zipcode : ""}
            onChange={this.handleChange("zipcode")}
          />
          <MDBInput
            label="Is default?"
            type="checkbox"
            id="checkbox1"
            checked={this.state.isDefault}
            onChange={() => {
              this.setState({
                isDefault: !this.state.isDefault
              });
            }}
          />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggleModalEdit}>
            Close
          </MDBBtn>
          <MDBBtn color="primary" onClick={this.saveEdit}>
            Save
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    ) : null;
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
        name: "Options",
        cell: row => (
          <div>
            <MDBBtn onClick={this.openModalEdit(row.id, row.address, row.zipCode, row.isDefault)}>Edit</MDBBtn>
            <MDBBtn onClick={this.delete(row.id)}>Delete</MDBBtn>
          </div>
        ),
        right: true,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "200px"
      }
    ];

    const data = this.props.listCustomers.dataAddress.filter(x => {
      return x.address.toLowerCase().includes(this.state.searchKey.toLowerCase());
    });

    return (
      <div>
        {modalAddUser}
        {modalEditUser}
        <MDBContainer>
          <MDBRow>
            <MDBCol sm="12" md="12" lg="12" xl="12" className="mx-auto my-auto">
              <TopNavComponent />

              <MDBRow>
                <MDBBtn onClick={this.toggleModalAdd}>Add a new address</MDBBtn>
                <MDBCol md="12">
                  <MDBInput hint="Search" type="text" containerClass="mt-0" onChange={this.handleChange("searchKey")} />
                  <DataTable title="Address" columns={columns} theme="solarized" data={data} pagination={true} />
                  <MDBNavLink to="/checkout" link>
                    Go to checkout
                  </MDBNavLink>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listCustomers: state.screen.customer
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { addNewAddressAction, getAddressesByIdAction, setListAddressesAction, editAddressAction, deleteAddressAction },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAddressScreen);
