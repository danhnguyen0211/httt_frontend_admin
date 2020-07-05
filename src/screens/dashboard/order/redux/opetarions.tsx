import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { push } from "react-router-redux";
import { call, put, takeLatest, select } from "redux-saga/effects";
import { addNewOrder, getAllOrder, addNewCartItem } from "../services";
import {
  addOrderAction,
  getAllOrderAction,
  setListOrderAction,
  addCartItemAction,
  addNewCustomerOrderAction,
  setListItemsCartAction
} from "./actions";
import { addNewCustomer, addNewAddress } from "screens/dashboard/customer/services";

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
      console.log(result, "abc");
      if (result.success) {
        const itemCart = yield select(state => state.screen.order.dataCart);
        console.log(itemCart, "itemcart");
        let cartItem = [];
        itemCart.map(x => {
          const new_item = {
            orderId: result.data.id,
            itemId: x.id,
            quantity: x.quantity,
            cost: (x.sellingPrice - (x.sellingPrice * x.sale) / 100) * x.quantity
          };
          cartItem.push(new_item);
        });
        const cartResult = yield call(addNewCartItem, cartItem);
        console.log(cartResult, "cart");
        if (cartResult.success) {
          const data = [];
          yield put(setListItemsCartAction(data));
          yield put(push("/dashboard/order"));
        }
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

function* addCartItemActionWatcher() {
  yield takeLatest(addCartItemAction, function*({ payload }: any) {
    try {
      const { data } = payload;
      yield put(onLoadingAction());
      const result = yield call(addNewCartItem, data);
      console.log(result, "data");
      if (result.success === true) {
        yield put(push("/dashboard/order"));
        localStorage.setItem("orderId", result.id);
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

function* addNewCustomerOrderActionWatcher() {
  yield takeLatest(addNewCustomerOrderAction, function*({ payload }: any) {
    try {
      yield put(onLoadingAction());
      const { name, phone, age, sex, username, password } = payload;
      const result = yield call(addNewCustomer, name, phone, age, sex, username, password);
      if (result && result.success === true) {
        const { address, zipCode } = payload;
        console.log(result.data.id, "result.data.id");
        const a = yield call(addNewAddress, address, zipCode, 1, result.data.id);
        console.log(a, "12");
        localStorage.setItem("addressId", a.data.id);
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
  getAllOrderActionWatcher,
  addOrderActionWatcher,
  addCartItemActionWatcher,
  addNewCustomerOrderActionWatcher
};
