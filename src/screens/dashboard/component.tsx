import ContainerComponent from "containers/components/layout/container";
import { MDBContainer } from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAccountInfoAction } from "screens/login/redux/actions";

class DashBoardComponent extends React.Component<any, any> {
  componentDidMount() {
    this.props.getAccountInfoAction();
  }
  render() {
    return (
      <ContainerComponent>
        <MDBContainer></MDBContainer>
      </ContainerComponent>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getAccountInfoAction }, dispatch);

export default connect(null, mapDispatchToProps)(DashBoardComponent);
