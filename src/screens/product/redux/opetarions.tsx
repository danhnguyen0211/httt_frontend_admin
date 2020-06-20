import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { call, put, takeLatest } from "redux-saga/effects";
import { getItemById } from "../services";
import { getItemByIdAction, setItemAction } from "./actions";

function* getItemByIdWatcher() {
  yield takeLatest(getItemByIdAction, function*({ payload }: any) {
    try {
      const { id } = payload;
      yield put(onLoadingAction());
      const result = yield call(getItemById, id);
      if (result.success === true) {
        yield put(setItemAction(result.data));
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

export default { getItemByIdWatcher };
