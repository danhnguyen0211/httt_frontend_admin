import ContainerComponent from "containers/components/layout/container";
import { MDBContainer } from "mdbreact";
import React from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { IProps } from "./propState";
import { deleteUserAction, getAllUsersAction } from "./redux/actions";

class StatisticScreen extends React.Component<IProps> {
  state = {
    dataBar: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "% of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(113, 205, 205,0.4)",
            "rgba(170, 128, 252,0.4)",
            "rgba(255, 177, 101,0.4)"
          ],
          borderWidth: 2,
          borderColor: [
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(113, 205, 205, 1)",
            "rgba(170, 128, 252, 1)",
            "rgba(255, 177, 101, 1)"
          ]
        }
      ]
    },
    barChartOptions: {
      // responsive: true,
      maintainAspectRatio: false
      // scales: {
      //   xAxes: [
      //     {
      //       barPercentage: 1,
      //       gridLines: {
      //         display: true,
      //         color: "rgba(0, 0, 0, 0.1)"
      //       }
      //     }
      //   ],
      //   yAxes: [
      //     {
      //       gridLines: {
      //         display: true,
      //         color: "rgba(0, 0, 0, 0.1)"
      //       },
      //       ticks: {
      //         beginAtZero: true
      //       }
      //     }
      //   ]
      // }
    }
  };

  render() {
    return (
      <ContainerComponent>
        <MDBContainer>
          <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
        </MDBContainer>
      </ContainerComponent>
    );
  }
}

const mapStateToProps = state => {
  return {
    listUser: state.screen.user
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ getAllUsersAction, deleteUserAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StatisticScreen);
