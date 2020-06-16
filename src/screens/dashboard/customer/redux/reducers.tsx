import { handleActions } from "redux-actions";
import { setListAddressesAction, setListCustomersAction } from "./actions";
import IActionState from "./state";

export default handleActions<IActionState, any>(
  {
    [setListCustomersAction.toString()]: (state, action) => ({
      ...state,
      data: action.payload.data
    }),
    [setListAddressesAction.toString()]: (state, action) => ({
      ...state,
      dataAddress: action.payload.data
    })
  },
  {
    data: [],
    dataAddress: []
  }
);
