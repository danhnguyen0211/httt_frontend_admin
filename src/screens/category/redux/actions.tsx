import { createActions } from "redux-actions";

const actions = createActions({
  GET_ALL_ITEMS_ACTION: () => ({}),
  SET_LIST_ITEMS_ACTION: data => ({ data }),
  GET_ALL_CATEGORIES_ACTION: () => ({}),
  SET_LIST_CATEGORIES_ACTION: data => ({ data })
});

export const { getAllItemsAction, setListItemsAction, getAllCategoriesAction, setListCategoriesAction } = actions;
