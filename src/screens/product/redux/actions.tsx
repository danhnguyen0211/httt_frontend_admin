import { createActions } from "redux-actions";

const actions = createActions({
  GET_ITEM_BY_ID_ACTION: id => ({ id }),
  SET_ITEM_ACTION: data => ({ data })
});

export const { getItemByIdAction, setItemAction } = actions;
