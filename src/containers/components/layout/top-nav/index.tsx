import {
  MDBBadge,
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
  MDBNavLink
} from "mdbreact";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

export default class TopNavComponent extends React.Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  logout = () => {
    localStorage.clear();
    location.reload();
  };

  public render() {
    return (
      <MDBContainer fluid>
        <Router>
          <MDBNavbar color="stylish-color" dark expand="md">
            <MDBNavbarBrand>
              <strong className="white-text">Nhà sách Nhã Nam</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
              <MDBNavbarNav left>
                <MDBNavItem active>
                  <MDBNavLink to="/home">Giới thiệu</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/shopping">Lịch sử giao dịch</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/about">Kiểm tra đơn hàng</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="/cart">
                    <MDBIcon icon="cart-plus"></MDBIcon>
                    <MDBBadge
                      color="danger"
                      style={{ borderRadius: 10, width: 20, height: 20, padding: 5 }}
                      className="ml-1"
                    >
                      4
                    </MDBBadge>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon="user" />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem href="#!">Settings</MDBDropdownItem>
                      <MDBDropdownItem onClick={this.logout}>Logout</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        </Router>
        <div className="width-100 justify-content-center">
          <div className="width-80 justify-content-center">
            <img
              className="width-100"
              src="https://tadc.vn/tadc/uploads/2019/01/Thi%E1%BA%BFt-k%E1%BA%BF-Banner-Website-ch%E1%BA%A1y-qu%E1%BA%A3ng-c%C3%A1o-chu%E1%BA%A9n-size-nh%E1%BA%A5t-2019-1.jpg"
            />
          </div>
        </div>
      </MDBContainer>
    );
  }
}
