import ContainerComponent from "containers/components/layout/container";
import { MDBContainer } from "mdbreact";
import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getAllOrderAction } from "screens/dashboard/order/redux/actions";
import { IProps } from "./propState";

class StatisticCustomerScreen extends React.Component<IProps> {
  state = {
    customers: [],
    values: []
  };

  componentDidMount() {
    this.props.getAllOrderAction();
  }

  render() {
    const { customers } = this.state;
    console.log(customers, "accounts");
    this.props.listOrder.data.map(x => {
      let item = {
        fullname: x.customer.name,
        id: x.customer.id,
        totalRevenue: x.totalCost
      };
      const accountsId = customers.map(x => {
        return x.id;
      });
      if (accountsId.indexOf(x.customer.id) === -1) {
        customers.push(item);
      }
      if (accountsId.indexOf(x.customer.id) !== -1) {
        customers.map(acc => {
          if (acc.id === x.customer.id) {
            acc.totalRevenue += x.totalCost;
          }
        });
      }
    });
    const accountNames = customers.map(x => {
      return x.fullname;
    });

    const accountRevenue = customers.map(x => {
      return x.totalRevenue;
    });

    const dataLine = {
      labels: accountNames,
      datasets: [
        {
          label: "Revenue based on employees",
          fill: false,
          backgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774", "#DA92DB"],
          borderColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#AC64AD"],
          borderWidth: 1,
          data: accountRevenue
        }
      ]
    };

    return (
      <ContainerComponent>
        <MDBContainer>
          <HorizontalBar data={dataLine} options={{ responsive: true }} />
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
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ getAllOrderAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StatisticCustomerScreen);
