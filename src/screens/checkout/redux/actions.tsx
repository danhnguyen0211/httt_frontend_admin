import { createActions } from "redux-actions";

const actions = createActions({
  // GET_ALL_ORDER_ACTION: () => ({}),
  SET_LIST_ORDER_ACTION: data => ({ data }),
  SET_LIST_ITEMS_CART_ACTION: data => ({ data }),
  ADD_ORDER_CLIENT_ACTION: (code, paymentStatus, totalCost, paymentId, shippingId, accountId, addressId) => ({
    code,
    paymentStatus,
    totalCost,
    paymentId,
    shippingId,
    accountId,
    addressId
  }),
  ADD_CART_ITEM_ACTION: data => ({ data }),
  ADD_NEW_CUSTOMER_ORDER_ACTION: (name, phone, age, sex, username, password, address, zipCode) => ({
    name,
    phone,
    age,
    sex,
    username,
    password,
    address,
    zipCode
  })
});

export const {
  // getAllOrderAction,
  setListOrderAction,
  setListItemsCartAction,
  addOrderClientAction,
  addCartItemAction,
  addNewCustomerOrderAction
} = actions;
