import { createActions } from "redux-actions";

const actions = createActions({
  GET_ALL_USERS_ACTION: () => ({}),
  SET_LIST_USERS_ACTION: data => ({ data }),
  DELETE_USER_ACTION: id => ({ id }),
  GET_ALL_ADDRESSES_ACTION: () => ({}),
  SET_LIST_ADDRESSES_ACTION: data => ({ data }),
  DELETE_ADDRESS_ACTION: id => ({ id })
});

export const {
  getAllUsersAction,
  setListUsersAction,
  deleteUserAction,
  getAllAddressesAction,
  setListAddressesAction,
  deleteAddressAction
} = actions;
