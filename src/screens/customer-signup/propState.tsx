interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  addNewCustomerClientAction?: (
    name: string,
    phone: string,
    age: number,
    sex: string,
    username: string,
    password: string
  ) => void;
}

interface IStateToProps {}

interface IState {
  username: string;
  password: string;
  repeat_password: string;
  name: string;
  option: any;
  phone: string;
  age: number;
  sex: string;
}

export { IProps, IState };
