import ContainerComponent from "containers/components/layout/container";
import { MDBContainer } from "mdbreact";
import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getAllOrderAction } from "screens/dashboard/order/redux/actions";
import { IProps } from "./propState";

class StatisticScreen extends React.Component<IProps> {
  state = {
    accounts: [],
    values: []
  };

  componentDidMount() {
    this.props.getAllOrderAction();
  }

  render() {
    const { accounts } = this.state;
    console.log(accounts, "accounts");
    this.props.listOrder.data.map(x => {
      let item = {
        username: x.account.username,
        fullname: x.account.fullName,
        id: x.account.id,
        totalRevenue: x.totalCost
      };
      const accountsId = accounts.map(x => {
        return x.id;
      });
      if (accountsId.indexOf(x.account.id) === -1) {
        accounts.push(item);
      }
      if (accountsId.indexOf(x.account.id) !== -1) {
        accounts.map(acc => {
          if (acc.id === x.account.id) {
            acc.totalRevenue += x.totalCost;
          }
        });
      }
    });
    const accountNames = accounts.map(x => {
      return x.username;
    });

    const accountRevenue = accounts.map(x => {
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

export default connect(mapStateToProps, mapDispatchToProps)(StatisticScreen);
