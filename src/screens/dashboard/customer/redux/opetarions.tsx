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
  addNewAddressAction,
  addNewCustomerAction,
  deleteCustomerAction,
  editCustomerAction,
  getAddressesByIdAction,
  getAllAddressesAction,
  getAllCustomersAction,
  setListAddressesAction,
  setListCustomersAction
} from "./actions";

function* getAllCustomersActionWatcher() {
  yield takeLatest(getAllCustomersAction, function*() {
    try {
      yield put(onLoadingAction());
      const result = yield call(getAllCustomers);
      if (result.success === true) {
        yield put(setListCustomersAction(result.data));
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

function* addNewCustomerActionWatcher() {
  yield takeLatest(addNewCustomerAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { name, phone, age, sex, username, password } = payload;
      const result = yield call(addNewCustomer, name, phone, age, sex, username, password);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.customer);
        data.data.unshift(result.data);
        yield put(setListCustomersAction(data.data));
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

function* editCustomerActionWatcher() {
  yield takeLatest(editCustomerAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { id, name, phone, age, sex, username, password } = payload;
      const result = yield call(editCustomer, id, name, phone, age, sex, username, password);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.customer);
        data.data.map(x => {
          if (x.id === id) {
            x.name = name;
            x.phone = phone;
            x.age = age;
            x.sex = sex;
            x.username = username;
            x.password = password;
          }
        });
        yield put(setListCustomersAction(data.data));
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

function* deleteCustomerActionWatcher() {
  yield takeLatest(deleteCustomerAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { id } = payload;
      const result = yield call(deleteCustomer, id);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.customer);
        if (data) {
          data.data.map((x, index) => {
            if (x.id === id) {
              data.data.splice(index, 1);
            }
          });
        }
        yield put(setListCustomersAction(data.data));
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

function* getAllAddressesActionWatcher() {
  yield takeLatest(getAllAddressesAction, function*({}: any) {
    try {
      yield put(onLoadingAction());
      const result = yield call(getAllAddresses);
      if (result.success === true) {
        console.log(result.data, "12");
        yield put(setListAddressesAction(result.data));
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

function* getAddressesByIdActionWatcher() {
  yield takeLatest(getAddressesByIdAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { id } = payload;
      const result = yield call(getAddressesById, id);
      if (result.success === true) {
        yield put(setListAddressesAction(result.data));
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

function* addNewAddressActionWatcher() {
  yield takeLatest(addNewAddressAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { address, zipCode, isDefault, customerId } = payload;
      const result = yield call(addNewAddress, address, zipCode, isDefault, customerId);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.customer);
        data.dataAddress.unshift(result.data);
        yield put(setListAddressesAction(data.dataAddress));
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

function* editAddressActionWatcher() {
  yield takeLatest(editCustomerAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { id, address, zipCode, isDefault, customerId } = payload;
      const result = yield call(editAddress, id, address, zipCode, isDefault, customerId);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.customer);
        data.data.map(x => {
          if (x.id === id) {
            x.address = address;
            x.zipCode = zipCode;
            x.isDefault = isDefault;
            x.customerId = customerId;
          }
        });
        yield put(setListAddressesAction(data.dataAddress));
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

function* deleteAddressActionWatcher() {
  yield takeLatest(deleteCustomerAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { id } = payload;
      const result = yield call(deleteAddress, id);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.customer);
        if (data) {
          data.data.map((x, index) => {
            if (x.id === id) {
              data.data.splice(index, 1);
            }
          });
        }
        yield put(setListAddressesAction(data.dataAddress));
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
  getAllCustomersActionWatcher,
  addNewCustomerActionWatcher,
  editCustomerActionWatcher,
  deleteCustomerActionWatcher,
  getAllAddressesActionWatcher,
  addNewAddressActionWatcher,
  editAddressActionWatcher,
  deleteAddressActionWatcher,
  getAddressesByIdActionWatcher
};
