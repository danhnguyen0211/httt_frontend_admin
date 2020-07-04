import TopNavComponent from "containers/components/layout/client-top-nav";
import CustomerBar from "containers/components/layout/customerBar";
import config from "containers/config";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { IProps } from "./propState";
import { getAllCategoriesAction, getAllItemsAction } from "./redux/actions";
class CategoryComponent extends React.Component<IProps> {
  componentDidMount() {
    this.props.getAllItemsAction();
  }

  render() {
    const itemCol = category => {
      const items =
        this.props.listItems.data.length > 0
          ? this.props.listItems.data.filter(item => {
              return item.product.category.name == category;
            })
          : [];
      const row = index => {
        return items.slice(index, index + 4).map(item => (
          <MDBCol key={item.id} size="3">
            <Link to={`/product/${item.id}`}>
              <img
                src={`${config.HOST_API}/${item.product.image[0] ? item.product.image[0].url : "noimage.jpg"}`}
              ></img>
            </Link>
          </MDBCol>
        ));
      };
      return items.map((item, index) => {
        console.log(index);
        if (index % 4 == 0)
          return (
            <MDBContainer key={index}>
              <MDBRow className="item-row">{row(index)}</MDBRow>
              <img className="bookshelf" src="http://nhanam.com.vn/Content/images/book_bg.png"></img>
            </MDBContainer>
          );
      });
    };

    return (
      <MDBContainer fluid>
        <TopNavComponent />
        <CustomerBar></CustomerBar>
        <MDBContainer fluid className="content-container">
          {itemCol(this.props.match.params.category)}
        </MDBContainer>
      </MDBContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    listItems: state.screen.item,
    listCategories: state.screen.category
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ getAllItemsAction, getAllCategoriesAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);
