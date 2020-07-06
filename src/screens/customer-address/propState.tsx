interface IProps extends IDispatchToProps, IStateToProps {
  id: number;
}

interface IDispatchToProps {
  getAllItemsAction?: () => void;
  getAddressesByIdAction?: (id) => void;
  setListAddressesAction?: (data: any) => void;
  addNewAddressAction?: (address: string, zipcode: string, isDefault: number, customerId: number) => void;
  editAddressAction?: (id: number, address: string, zipcode: string, isDefault: number, customerId: number) => void;
  deleteAddressAction?: (id: number) => void;
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
  zipcode: string;
  address: string;
  isDefault: boolean;
  customerId: number;
  id: number;
}

export { IProps, IState };
