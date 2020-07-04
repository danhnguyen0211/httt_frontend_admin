import { handleActions } from "redux-actions";
import { setListCategoryAction } from "../../dashboard/category/redux/actions";
import { setListItemsAction } from "./actions";
import IActionState from "./state";

export default handleActions<IActionState, any>(
  {
    [setListItemsAction.toString()]: (state, action) => ({
      ...state,
      data: action.payload.data
    }),
    [setListCategoryAction.toString()]: (state, action) => ({
      ...state,
      categoriesList: action.payload.data
    })
  },
  {
    data: [],
    categoriesList: []
  }
);
