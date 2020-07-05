import categorySaga from "./dashboard/category/redux/opetarions";
import customerSaga from "./dashboard/customer/redux/opetarions";
import itemSaga from "./dashboard/item/redux/opetarions";
import orderSaga from "./dashboard/order/redux/opetarions";
import paymentSaga from "./dashboard/payment/redux/opetarions";
import productSaga from "./dashboard/product/redux/opetarions";
import shippingSaga from "./dashboard/shipping/redux/opetarions";
import userSaga from "./dashboard/user/redux/opetarions";
import homeSaga from "./home/redux/opetarions";
import loginSaga from "./login/redux/opetarions";
import productPageSaga from "./product/redux/opetarions";
import signupSaga from "./signup/redux/opetarions";
import checkoutSaga from "./checkout/redux/opetarions";
export default {
  ...loginSaga,
  ...userSaga,
  ...productSaga,
  ...categorySaga,
  ...itemSaga,
  ...orderSaga,
  ...customerSaga,
  ...signupSaga,
  ...shippingSaga,
  ...paymentSaga,
  ...homeSaga,
  ...productPageSaga,
  ...checkoutSaga
};
