import { offLoadingAction, onLoadingAction } from "containers/redux/actions";
import { logError } from "containers/utils";
import { call, put, takeLatest } from "redux-saga/effects";
import { setListCategoryAction } from "../../dashboard/category/redux/actions";
import { getAllCategories, getAllItems } from "../services";
import { getAllCategoriesAction, getAllItemsAction, setListItemsAction } from "./actions";

function* getAllItemsActionWatcher() {
  yield takeLatest(getAllItemsAction, function*() {
    try {
      yield put(onLoadingAction());

      const result = yield call(getAllItems);
      if (result.success === true) {
        yield put(setListItemsAction(result.data));
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

function* getAllCategoriesActionWatcher() {
  yield takeLatest(getAllCategoriesAction, function*() {
    try {
      yield put(onLoadingAction());
      const result = yield call(getAllCategories);
      if (result.success === true) {
        yield put(setListCategoryAction(result.data));
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

export default { getAllCategoriesActionWatcher, getAllItemsActionWatcher };
