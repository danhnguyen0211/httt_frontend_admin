interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getAllItemsAction?: () => void;
  getAllAddressesAction?: () => void;
  getAllShippingsAction?: () => void;
  getAllPaymentsAction?: () => void;
  setListItemsCartAction?: (data: any) => void;
  addOrderAction?: (
    code: string,
    paymentStatus: string,
    totalCost: number,
    paymentId: number,
    shippingId: number,
    accountId: number,
    addressId: number
  ) => void;
}

interface IStateToProps {
  listItems: any;
  listShipping: any;
  listPayment: any;
  listAddresses: any;
  listCart: any;
  account: any;
}

interface IState {
  modalAddStatus: boolean;
  modalEditStatus: boolean;
  searchKey: string;
  itemOrder?: any;
  totalCost: number;
  searchKeyCustomer: string;
  currentPayment: any;
  currentShipping: any;
  currentAccount: any;
  currentAddress: any;
  code: string;
  paymentStatus: boolean;
  optionPayments: any;
  optionShippings: any;
}

export { IProps, IState };
