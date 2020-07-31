import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  addNewAddress,
  addNewCustomer,
  deleteAddress,
  deleteCustomer,
  editAddress,
  editCustomer,
  getAddressesById,
  getAllAddresses,
  getAllCustomers
} from "../services";
import {
  addNewAddressClientAction,
  addNewCustomerClientAction,
  deleteAddressAction,
  deleteCustomerAction,
  editAddressAction,
  editCustomerAction,
  getAddressesByIdAction,
  getAllAddressesAction,
  getAllCustomersAction,
  setListAddressesAction,
  setListCustomersAction
} from "./actions";
import { push } from "connected-react-router";

function* addNewCustomerActionWatcher() {
  yield takeLatest(addNewCustomerClientAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { name, phone, age, sex, username, password } = payload;
      const result = yield call(addNewCustomer, name, phone, age, sex, username, password);
      if (result && result.success === true) {
        yield localStorage.setItem("router", result.data.id);
        const data = yield select(state => state.screen.customer);
        data.data.unshift(result.data);
        yield put(setListCustomersAction(data.data));
        // yield put(push("/customer/login"));
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

export default {
  addNewCustomerActionWatcher
};
