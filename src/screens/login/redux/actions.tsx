import { createActions } from "redux-actions";

const actions = createActions({
  LOG_IN_ACTION: (username, password) => ({ username, password }),
  SET_ACCOUNT_INFO_ACTION: data => ({ data }),
  GET_ACCOUNT_INFO_ACTION: access_token => ({ access_token })
});

export const { logInAction, setAccountInfoAction, getAccountInfoAction } = actions;
