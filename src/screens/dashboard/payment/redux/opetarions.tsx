import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { addNewPayment, deletePayment, editPayment, getAllPayments } from "../services";
import {
  addNewPaymentAction,
  deletePaymentAction,
  editPaymentAction,
  getAllPaymentsAction,
  setListPaymentsAction
} from "./actions";
import _ from "lodash";

function* getAllPaymentsActionWatcher() {
  yield takeLatest(getAllPaymentsAction, function*() {
    try {
      yield put(onLoadingAction());
      const result = yield call(getAllPayments);
      if (result.success === true) {
        yield put(setListPaymentsAction(result.data));
        console.log(result.data, "11");
        let listPayments = [];

        result.data.map(x => {
          let listPayment = {
            text: x.method,
            value: x.id
          };
          listPayments.push(listPayment);
        });

        listPayments = _.uniqBy(listPayments, "value");
        console.log(listPayments, "listPayment");
        localStorage.setItem("listPayment", JSON.stringify(listPayments));
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

function* addNewPaymentActionWatcher() {
  yield takeLatest(addNewPaymentAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { method, ownerName, ownerCardNumber } = payload;
      const result = yield call(addNewPayment, method, ownerName, ownerCardNumber);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.payment);
        data.data.unshift(result.data);
        yield put(setListPaymentsAction(data.data));
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

function* editPaymentActionWatcher() {
  yield takeLatest(editPaymentAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { id, method, ownerName, ownerCardNumber } = payload;
      const result = yield call(editPayment, id, method, ownerName, ownerCardNumber);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.payment);
        data.data.map(x => {
          if (x.id === id) {
            x.method = method;
            x.ownerName = ownerName;
            x.ownerCardNumber = ownerCardNumber;
          }
        });
        yield put(setListPaymentsAction(data.data));
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

function* deletePaymentActionWatcher() {
  yield takeLatest(deletePaymentAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { id } = payload;
      const result = yield call(deletePayment, id);
      if (result && result.success === true) {
        const data = yield select(state => state.screen.payment);
        if (data) {
          data.data.map((x, index) => {
            if (x.id === id) {
              data.data.splice(index, 1);
            }
          });
        }
        yield put(setListPaymentsAction(data.data));
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
  getAllPaymentsActionWatcher,
  addNewPaymentActionWatcher,
  editPaymentActionWatcher,
  deletePaymentActionWatcher
};
