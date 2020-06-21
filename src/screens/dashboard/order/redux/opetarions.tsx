import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { push } from "react-router-redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { addNewOrder, getAllOrder } from "../services";
import { addOrderAction, getAllOrderAction, setListOrderAction } from "./actions";

function* getAllOrderActionWatcher() {
  yield takeLatest(getAllOrderAction, function*() {
    try {
      yield put(onLoadingAction());
      const result = yield call(getAllOrder);
      if (result.success === true) {
        yield put(setListOrderAction(result.data));
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

function* addOrderActionWatcher() {
  yield takeLatest(addOrderAction, function*({ payload }: any) {
    try {
      const { code, paymentStatus, totalCost, paymentId, shippingId, accountId, addressId } = payload;
      yield put(onLoadingAction());
      const result = yield call(
        addNewOrder,
        code,
        paymentStatus,
        totalCost,
        paymentId,
        shippingId,
        accountId,
        addressId
      );
      if (result.success === true) {
        yield put(push("/order"));
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

export default { getAllOrderActionWatcher, addOrderActionWatcher };
