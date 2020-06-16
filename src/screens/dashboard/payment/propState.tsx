interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getAllPaymentsAction?: () => void;
  addNewPaymentAction?: (method: string, ownerName: string, ownerCardNumber: string) => void;
  editPaymentAction?: (id: number, method: string, ownerName: string, ownerCardNumber: string) => void;
  deletePaymentAction?: (id: number) => void;
}

interface IStateToProps {
  listPayment: any;
}

interface IState {
  modalAddStatus: boolean;
  modalEditStatus: boolean;
  method: string;
  ownerName: string;
  ownerCardNumber: string;
  id: number;
  searchKey: string;
}

export { IProps, IState };
