import ContainerComponent from "containers/components/layout/container";
import { MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from "mdbreact";
import moment from "moment";
import React from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getAllOrderAction } from "screens/dashboard/order/redux/actions";
import { IProps } from "./propState";

class StatisticScreen extends React.Component<IProps> {
  state = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0
  };

  componentDidMount() {
    this.props.getAllOrderAction();

    // this.props.listOrder.data.map(x => {});
  }

  render() {
    this.props.listOrder.data.map(x => {
      moment(x.createdDate).month;
      let month = parseInt(moment(x.createdDate).format("M"));
      if (month === 1) {
        this.state.Jan += x.totalCost;
      }
      if (month === 2) {
        this.state.Feb += x.totalCost;
      }
      if (month === 3) {
        this.state.Mar += x.totalCost;
      }
      if (month === 4) {
        this.state.Apr += x.totalCost;
      }
      if (month === 5) {
        this.state.May += x.totalCost;
      }
      if (month === 6) {
        this.state.Jun += x.totalCost;
      }
      if (month === 7) {
        this.state.Jul += x.totalCost;
      }
      if (month === 8) {
        this.state.Aug += x.totalCost;
      }
      if (month === 9) {
        this.state.Sep += x.totalCost;
      }
      if (month === 10) {
        this.state.Oct += x.totalCost;
      }
      if (month === 11) {
        this.state.Nov += x.totalCost;
      }
      if (month === 12) {
        this.state.Dec += x.totalCost;
      }
    });
    const dataLine = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Revenue",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(184, 185, 210, .3)",
          borderColor: "rgb(35, 26, 136)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(35, 26, 136)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [
            this.state.Jan,
            this.state.Feb,
            this.state.Mar,
            this.state.Apr,
            this.state.May,
            this.state.Jun,
            this.state.Jul,
            this.state.Aug,
            this.state.Sep,
            this.state.Oct,
            this.state.Nov,
            this.state.Dec
          ]
        }
      ]
    };

    // console.log(moment(this.props.listOrder.data[0].createdDate).month(), "mot");
    return (
      <ContainerComponent>
        <MDBContainer>
          <MDBDropdown>
            <MDBDropdownToggle caret color="primary">
              Thống kê doanh thu
            </MDBDropdownToggle>
            <MDBDropdownMenu basic>
              <MDBDropdownItem>Thống kê doanh thu theo thời gian</MDBDropdownItem>
              <MDBDropdownItem>Thống kê doanh thu theo khách hàng</MDBDropdownItem>
              <MDBDropdownItem>Thống kê doanh thu theo sản phẩm</MDBDropdownItem>
              <MDBDropdownItem>Thống kê doanh thu theo nhân viên bán hàng</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
          <Line data={dataLine} options={{ responsive: true }} />
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
