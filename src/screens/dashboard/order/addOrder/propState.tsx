interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getAllItemsAction?: () => void;
  getAllCustomersAction?: () => void;
  setListItemsCartAction?: (data: any) => void;
}

interface IStateToProps {
  listItems: any;
  listCustomers: any;
  listCart: any;
}

interface IState {
  modalAddStatus: boolean;
  modalEditStatus: boolean;
  searchKey: string;
  itemOrder?: any;
  totalCost: number;
  searchKeyCustomer: string;
  currentCustomer: any;
  currentPayment: any;
  currentShipping: any;
  currentAccount: any;
  currentAddress: any;
  code: string;
  paymentStatus: string;
}

export { IProps, IState };
