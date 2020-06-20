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
import { BrowserRouter as Router } from "react-router-dom";

export default class CustomerBar extends React.Component {
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
      <Router>
        <MDBNavbar className="pl-84 pr-84" color="default-color" dark expand="md">
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav className="justify-content-center">
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    Danh mục sản phẩm
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default">
                    <MDBDropdownItem href="#!">Sách này</MDBDropdownItem>
                    <MDBDropdownItem>Sách kia</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
              <MDBNavItem active>
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
      </Router>
    );
  }
}
