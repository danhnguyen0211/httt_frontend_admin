import Cart from "containers/components/layout/cart";
import {
  MDBCollapse,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink,
  MDBNav
} from "mdbreact";
import React from "react";
import { Link } from "react-router-dom";
import { IProps } from "./propState";
export default class TopNavComponent extends React.Component<any> {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  logout = () => {
    localStorage.clear();
    // location.reload();
    // this.props.history.push("/customer/login");
    location.reload();
  };

  icon = () => {
    return <MDBIcon icon="cart-plus"></MDBIcon>;
  };
  public render() {
    const clientToken = localStorage.getItem("clientToken");
    return (
      <MDBContainer className="client-top-nav-container" fluid>
        <MDBNavbar className="client-top-nav" color="stylish-color" dark expand="md">
          <MDBNavbarBrand>
            <Link to="/home" className="white-text">
              <p>Nhà sách Nhã Nam</p>
            </Link>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem>
                <MDBNavLink to="/home">Giới thiệu</MDBNavLink>
              </MDBNavItem>
              {/* <MDBNavItem>
                <MDBNavLink to="/shopping">Lịch sử giao dịch</MDBNavLink>
              </MDBNavItem> */}
              <MDBNavItem>
                <MDBNavLink to="/customer/order">Kiểm tra đơn hàng</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              {/* <MDBNavItem>
                <Cart title={this.icon()}></Cart>
              </MDBNavItem> */}
              {clientToken ? (
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon="user">
                        <MDBNavLink to="/checkout"></MDBNavLink>
                      </MDBIcon>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem href="#!">Settings</MDBDropdownItem>
                      <MDBDropdownItem onClick={this.logout}>Logout</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              ) : (
                <MDBNav>
                  <MDBNavItem>
                    <MDBNavLink to="/customer/login" link>
                      Login
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/customer/signup" link>
                      Signup
                    </MDBNavLink>
                  </MDBNavItem>
                </MDBNav>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        <div className="width-100 justify-content-center">
          <div className="width-80 justify-content-center">
            <img
              className="width-80"
              src="http://static.nhanam.com.vn/thumb/0x0/crop/Features/Images/2018/9/13/OJ4M48Q3.jpg"
            />
          </div>
        </div>
      </MDBContainer>
    );
  }
}
