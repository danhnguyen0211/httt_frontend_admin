import ContainerComponent from "containers/components/layout/container";
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBNavLink } from "mdbreact";
import React from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IProps, IState } from "./propState";
import { getAllOrderAction } from "./redux/actions";
import { getAccountInfoAction } from "screens/login/redux/actions";

class OrderScreen extends React.Component<IProps> {
  state: IState = {
    searchKey: ""
  };

  componentDidMount() {
    this.props.getAccountInfoAction();
    this.props.getAllOrderAction();
  }

  handleChange = (field: string) => (event: any) => {
    event.persist();
    this.setState(state => ({ ...state, [field]: event.target.value }));
  };

  delete = (id: number) => () => {
    console.log(id);
  };

  render() {
    const columns = [
      {
        name: "#",
        selector: "id",
        sortable: true,
        width: "70px"
      },
      {
        name: "Created Date",
        selector: "createdDate",
        sortable: true,
        width: "150px"
      },
      {
        name: "Code",
        selector: "code",
        sortable: true,
        width: "100px"
      },
      {
        name: "Payment Status",
        selector: "paymentStatus",
        sortable: true,
        width: "100px"
      },
      {
        name: "Total Cost",
        selector: "totalCost",
        sortable: true,
        width: "100px"
      },
      {
        name: "Payment Method",
        selector: "payment.method",
        sortable: true,
        width: "100px"
      },
      {
        name: "Shipping Info",
        selector: "shipping.type",
        sortable: true,
        width: "150px"
      },
      {
        name: "Customer",
        selector: "customer.name",
        sortable: true,
        width: "150px"
      },
      {
        name: "Address",
        selector: "address.address",
        sortable: true,
        width: "200px"
      },
      {
        name: "Options",
        cell: row => (
          <div>
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
    const data = this.props.listOrder.data.filter(x => {
      return x.code.toLowerCase().includes(this.state.searchKey.toLowerCase());
    });
    return (
      <ContainerComponent>
        <MDBContainer>
          <MDBBtn>
            <MDBNavLink to="/dashboard/order/addOrder" style={{ color: "#ffffff" }}>
              Add a new order
            </MDBNavLink>
          </MDBBtn>
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
    listOrder: state.screen.order
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ getAllOrderAction, getAccountInfoAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
