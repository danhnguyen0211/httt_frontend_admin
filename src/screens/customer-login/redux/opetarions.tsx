import { SYSTEM } from "containers/contants";
import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { push } from "react-router-redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { checkLogin, getAccountInfo } from "../services";
import { logInCustomerAction, setAccountInfoCustomerAction, getAccountInfoCustomerAction } from "./actions";

function* logInCustomerWatcher() {
  yield takeLatest(logInCustomerAction, function*({ payload }: any) {
    const { username, password } = payload;
    try {
      yield put(onLoadingAction());
      const result = yield call(checkLogin, username, password);
      if (result.success) {
        yield localStorage.setItem("clientToken", result.access_token);
        const userInfo = yield call(getAccountInfo, result.access_token);
        console.log(userInfo, "user");
        yield put(setAccountInfoCustomerAction(userInfo.user));
        yield localStorage.setItem("router", userInfo.user.id);
        yield put(push("/customer/address"));
      } else {
        logError(result.message);
      }
    } catch (error) {
      logError(error);
    } finally {
      yield put(offLoadingAction());
    }
  });
}

function* getAccountInfoCustomerWatcher() {
  yield takeLatest(getAccountInfoCustomerAction, function*() {
    try {
      yield put(onLoadingAction());
      const token = yield localStorage.getItem(SYSTEM.TOKEN);
      const userInfo = yield call(getAccountInfo, token);
      console.log(userInfo, "userInfo");
      yield put(setAccountInfoCustomerAction(userInfo.user));
      yield localStorage.getItem("userInfo");
    } catch (error) {
      logError(error);
    } finally {
      yield put(offLoadingAction());
    }
  });
}

export default { logInCustomerWatcher, getAccountInfoCustomerWatcher };
