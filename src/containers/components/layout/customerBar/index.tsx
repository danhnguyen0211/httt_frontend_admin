import {
  MDBCollapse,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink
} from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllCategoryAction } from "screens/dashboard/category/redux/actions";
import { IProps } from "./propState";
class CustomerBar extends React.Component<IProps> {
  state = {
    isOpen: false
  };
  componentDidMount() {
    this.props.getAllCategoryAction();
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  logout = () => {
    localStorage.clear();
    location.reload();
  };

  public render() {
    const dropdownItem = () => {
      const tmp = this.props.listCategories.data.map(category => {
        return <MDBDropdownItem href={`category/${category.name}`}>{category.name}</MDBDropdownItem>;
      });
      return tmp;
    };
    return (
      <MDBNavbar className="pl-84 pr-84 customer-bar" dark expand="md">
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav className="justify-content-center">
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  Danh mục sản phẩm
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">{dropdownItem()}</MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/home">Sách bán chạy</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/home">Chương trình khuyến mại</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/home">Giảm giá đặc biệt</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    listCategories: state.screen.category
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ getAllCategoryAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerBar);
