import { createActions } from "redux-actions";

const actions = createActions({
  LOG_IN_CUSTOMER_ACTION: (username, password) => ({ username, password }),
  SET_ACCOUNT_INFO_CUSTOMER_ACTION: data => ({ data }),
  GET_ACCOUNT_INFO_CUSTOMER_ACTION: access_token => ({ access_token })
});

export const { logInCustomerAction, setAccountInfoCustomerAction, getAccountInfoCustomerAction } = actions;
