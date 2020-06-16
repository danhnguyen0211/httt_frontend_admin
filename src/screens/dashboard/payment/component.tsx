import ContainerComponent from "containers/components/layout/container";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader
} from "mdbreact";
import React from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IProps, IState } from "./propState";
import { addNewPaymentAction, deletePaymentAction, editPaymentAction, getAllPaymentsAction } from "./redux/actions";

class PaymentScreen extends React.Component<IProps> {
  state: IState = {
    modalAddStatus: false,
    modalEditStatus: false,
    method: null,
    ownerName: null,
    ownerCardNumber: null,
    id: null,
    searchKey: ""
  };

  componentDidMount() {
    this.props.getAllPaymentsAction();
  }

  toggleModalAdd = () => {
    this.clear();
    this.setState({
      modalAddStatus: !this.state.modalAddStatus
    });
  };

  openModalEdit = (id: number, method: string, ownerName: string, ownerCardNumber: string) => () => {
    this.setState({
      modalEditStatus: true,
      id,
      method,
      ownerName,
      ownerCardNumber
    });
  };

  closeModalEdit = () => {
    this.clear();
    this.setState({
      modalEditStatus: false
    });
  };

  clear = () => {
    this.setState({
      method: null,
      ownerName: null,
      ownerCardNumber: null,
      id: null
    });
  };

  saveAdd = () => {
    this.props.addNewPaymentAction(this.state.method, this.state.ownerName, this.state.ownerCardNumber);
    this.toggleModalAdd();
  };

  saveEdit = () => {
    this.props.editPaymentAction(this.state.id, this.state.method, this.state.ownerName, this.state.ownerCardNumber);
    this.closeModalEdit();
  };

  delete = (id: number) => () => {
    this.props.deletePaymentAction(id);
    this.props.listPayment.data.map((x, index) => {
      if (x.id === x) {
        this.props.listPayment.data.splice(index, 1);
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
          <strong>Add a new payment method</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput
            label="Method"
            value={this.state.method ? this.state.method : ""}
            onChange={this.handleChange("method")}
          />
          <MDBInput
            label="Owner Name"
            value={this.state.ownerName ? this.state.ownerName : ""}
            onChange={this.handleChange("ownerName")}
          />
          <MDBInput
            label="Owner Card Number"
            value={this.state.ownerCardNumber ? this.state.ownerCardNumber : ""}
            onChange={this.handleChange("ownerCardNumber")}
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
      <MDBModal isOpen={this.state.modalEditStatus} toggle={this.closeModalEdit}>
        <MDBModalHeader toggle={this.closeModalEdit}>
          <strong>Edit the user</strong>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput
            label="Method"
            value={this.state.method ? this.state.method : ""}
            onChange={this.handleChange("method")}
          />
          <MDBInput
            label="Owner Name"
            value={this.state.ownerName ? this.state.ownerName : ""}
            onChange={this.handleChange("ownerName")}
          />
          <MDBInput
            label="Owner Card Number"
            value={this.state.ownerCardNumber ? this.state.ownerCardNumber : ""}
            onChange={this.handleChange("ownerCardNumber")}
          />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.closeModalEdit}>
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
        name: "#",
        selector: "id",
        sortable: true,
        width: "70px"
      },
      {
        name: "Method",
        selector: "method",
        sortable: true,
        width: "300px"
      },
      {
        name: "Owner Name",
        selector: "ownerName",
        sortable: true,
        width: "200px"
      },
      {
        name: "Owner Card Number",
        selector: "ownerCardNumber",
        sortable: true,
        width: "250px"
      },
      {
        name: "Options",
        cell: row => (
          <div>
            <MDBBtn onClick={this.openModalEdit(row.id, row.method, row.ownerName, row.ownerCardNumber)}>Edit</MDBBtn>
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
    const data = this.props.listPayment.data.filter(x => {
      return x.method.toLowerCase().includes(this.state.searchKey.toLowerCase());
    });
    return (
      <ContainerComponent>
        {modalAddUser}
        {modalEditUser}
        <MDBContainer>
          <MDBBtn onClick={this.toggleModalAdd}>Add a new payment method</MDBBtn>
          <MDBCol md="6">
            <MDBInput hint="Search" type="text" containerClass="mt-0" onChange={this.handleChange("searchKey")} />
          </MDBCol>
          <DataTable columns={columns} theme="solarized" data={data} pagination={true} />
        </MDBContainer>
      </ContainerComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    listPayment: state.screen.payment
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ getAllPaymentsAction, addNewPaymentAction, editPaymentAction, deletePaymentAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
