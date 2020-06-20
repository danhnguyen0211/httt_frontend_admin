import CustomerBar from "containers/components/layout/customerBar";
import TopNavComponent from "containers/components/layout/top-nav";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { IProps } from "./propState";
import { getAllCategoriesAction, getAllItemsAction } from "./redux/actions";
class HomeComponent extends React.Component<IProps> {
  componentDidMount() {
    this.props.getAllItemsAction();
    this.props.getAllCategoriesAction();
  }

  render() {
    const itemCol = category => {
      const items =
        this.props.listItems.data.length > 0
          ? this.props.listItems.data
              .filter(item => {
                return item.product.category.name == category;
              })
              .slice(0, 4)
          : [];

      const row = items.map(item => (
        <MDBCol key={item.id} size="3">
          <Link to={`/product/${item.id}`}>
            <img
              src={`http://localhost:9605/${item.product.image[0] ? item.product.image[0].url : "noimage.jpg"}`}
            ></img>
          </Link>
        </MDBCol>
      ));
      return row;
    };
    const categoryRow = () => {
      const categories =
        this.props.listCategories.data.length > 0
          ? this.props.listCategories.data.map(category => {
              return (
                <MDBContainer key={category.id}>
                  <a>
                    <div className="title">
                      <img src="http://nhanam.com.vn/Content/images2/lbcenter.png"></img>
                      <span>{category.name}</span>
                    </div>
                  </a>

                  <MDBRow className="item-row">{itemCol(category.name)}</MDBRow>
                  <img className="bookshelf" src="http://nhanam.com.vn/Content/images/book_bg.png"></img>
                </MDBContainer>
              );
            })
          : [];
      return categories;
    };
    console.log(this.props, "Third");
    return (
      <MDBContainer fluid>
        <TopNavComponent />

        <CustomerBar></CustomerBar>
        <MDBContainer fluid className="content-container">
          {categoryRow()}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
