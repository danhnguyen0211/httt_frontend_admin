import TopNavComponent from "containers/components/layout/top-nav";
import { MDBContainer } from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IProps } from "./propState";
import { getItemByIdAction } from "./redux/actions";

class ProductComponent extends React.Component<IProps> {
  componentDidMount() {
    this.props.getItemByIdAction(this.props.match.params.id);
  }
  render() {
    console.log(this.props, "Item");
    return (
      <MDBContainer fluid>
        <TopNavComponent />
      </MDBContainer>
    );
  }
}

const mapStateToProps = state => ({
  item: state.screen.productPage
});

const mapDispatchToProps = dispatch => bindActionCreators({ getItemByIdAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
