import { createActions } from "redux-actions";

const actions = createActions({
  GET_ALL_CUSTOMERS_ACTION: () => ({}),
  SET_LIST_CUSTOMERS_ACTION: data => ({ data }),
  ADD_NEW_CUSTOMER_ACTION: (name, phone, age, sex, username, password) => ({
    name,
    phone,
    age,
    sex,
    username,
    password
  }),
  EDIT_CUSTOMER_ACTION: (id, name, phone, age, sex, username, password) => ({
    id,
    name,
    phone,
    age,
    sex,
    username,
    password
  }),
  DELETE_CUSTOMER_ACTION: id => ({ id }),
  GET_ALL_ADDRESSES_ACTION: () => ({}),
  GET_ADDRESSES_BY_ID_ACTION: id => ({ id }),
  SET_LIST_ADDRESSES_ACTION: data => ({ data }),
  ADD_NEW_ADDRESS_ACTION: (address, zipCode, isDefault, customerId) => ({
    address,
    zipCode,
    isDefault,
    customerId
  }),
  EDIT_ADDRESS_ACTION: (id, address, zipCode, isDefault, customerId) => ({
    id,
    address,
    zipCode,
    isDefault,
    customerId
  }),
  DELETE_ADDRESS_ACTION: id => ({ id })
});

export const {
  getAllCustomersAction,
  setListCustomersAction,
  addNewCustomerAction,
  editCustomerAction,
  deleteCustomerAction,
  getAllAddressesAction,
  getAddressesByIdAction,
  setListAddressesAction,
  addNewAddressAction,
  editAddressAction,
  deleteAddressAction
} = actions;
