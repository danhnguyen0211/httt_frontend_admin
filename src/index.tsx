import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import { ConnectedRouter } from "connected-react-router";
import Page404Component from "containers/components/404";
import { SYSTEM } from "containers/contants";
import "mdbreact/dist/css/mdb.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import CartComponent from "screens/cart";
import CategoryComponent from "screens/category";
import CheckoutComponent from "screens/checkout";
import CustomerSignupComponent from "screens/customer-signup";
import CategoryScreenComponent from "screens/dashboard/category/component";
import DashBoardComponent from "screens/dashboard/component";
import AddAddressScreenComponent from "screens/dashboard/customer/addAddress/component";
import CustomerScreenComponent from "screens/dashboard/customer/component";
import ItemScreenComponent from "screens/dashboard/item/component";
import AddOrderScreenComponent from "screens/dashboard/order/addOrder/component";
import OrderScreenComponent from "screens/dashboard/order/component";
import PaymentScreenComponent from "screens/dashboard/payment/component";
import ProductScreenComponent from "screens/dashboard/product/component";
import ShippingScreenComponent from "screens/dashboard/shipping/component";
import StatsAccountComponent from "screens/dashboard/statistics-account/component";
import StatsCustomerComponent from "screens/dashboard/statistics-customer/component";
import StatsProductComponent from "screens/dashboard/statistics-product/component";
import StatisticScreenComponent from "screens/dashboard/statistics/component";
import UserScreenComponent from "screens/dashboard/user/component";
import HomeComponent from "screens/home";
import LoginComponent from "screens/login";
import ProductComponent from "screens/product";
import SignupComponent from "screens/signup";
import "./assets/scss/main.scss";
import configureStore from "./boot/configureStore";

const store = configureStore.setup();

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem(SYSTEM.TOKEN);
  const auth = props => (!token ? <Redirect to="/login" /> : <Component {...props} />);
  return <Route {...rest} render={auth} />;
};

ReactDOM.render(
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <ConnectedRouter history={configureStore.history}>
        <Switch>
          <Redirect from="/" exact to="/home" />
          <Route path="/home">
            <Route exact path="/home" component={HomeComponent} />
          </Route>
          <Route path="/product">
            <Route exact path="/product/:id" component={ProductComponent} />
          </Route>
          <Route path="/customer/signup">
            <Route exact path="/customer/signup" component={CustomerSignupComponent} />
          </Route>
          <Route path="/category">
            <Route exact path="/category/:category" component={CategoryComponent} />
          </Route>
          <Route path="/cart">
            <Route exact path="/cart" component={CartComponent} />
          </Route>
          <Route path="/checkout">
            <Route exact path="/checkout" component={CheckoutComponent} />
          </Route>
          <Route path="/login">
            <Route exact path="/login" component={LoginComponent} />
          </Route>
          <Route path="/signup">
            <Route exact path="/signup" component={SignupComponent} />
          </Route>
          <PrivateRoute path="/dashboard" component={DashBoardComponent}>
            <PrivateRoute exact path="/dashboard" component={DashBoardComponent} />
            <PrivateRoute exact path="/dashboard/user" component={UserScreenComponent} />
            <PrivateRoute exact path="/dashboard/product" component={ProductScreenComponent} />
            <PrivateRoute exact path="/dashboard/category" component={CategoryScreenComponent} />
            <PrivateRoute exact path="/dashboard/item" component={ItemScreenComponent} />
            <PrivateRoute exact path="/dashboard/order" component={OrderScreenComponent} />
            <PrivateRoute exact path="/dashboard/order/addOrder" component={AddOrderScreenComponent} />
            <PrivateRoute exact path="/dashboard/customer" component={CustomerScreenComponent} />
            <PrivateRoute exact path="/dashboard/customer/addAddress" component={AddAddressScreenComponent} />
            <PrivateRoute exact path="/dashboard/shipping" component={ShippingScreenComponent} />
            <PrivateRoute exact path="/dashboard/payment" component={PaymentScreenComponent} />
            <PrivateRoute exact path="/dashboard/statistic" component={StatisticScreenComponent} />
            <PrivateRoute exact path="/dashboard/statistic-account" component={StatsAccountComponent} />
            <PrivateRoute exact path="/dashboard/statistic-product" component={StatsProductComponent} />
            <PrivateRoute exact path="/dashboard/statistic-customer" component={StatsCustomerComponent} />
          </PrivateRoute>
          <Route path="/settings-page"></Route>
          <Route component={Page404Component} />
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("bitwage-root")
);
