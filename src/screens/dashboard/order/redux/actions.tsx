import { createActions } from "redux-actions";

const actions = createActions({
  GET_ALL_ORDER_ACTION: () => ({}),
  SET_LIST_ORDER_ACTION: data => ({ data }),
  SET_LIST_ITEMS_CART_ACTION: data => ({ data }),
  ADD_ORDER_ACTION: (code, paymentStatus, totalCost, paymentId, shippingId, accountId, addressId) => ({
    code,
    paymentStatus,
    totalCost,
    paymentId,
    shippingId,
    accountId,
    addressId
  })
});

export const { getAllOrderAction, setListOrderAction, setListItemsCartAction, addOrderAction } = actions;
