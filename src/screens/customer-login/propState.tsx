interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  logInAction?: (username: string, password: string) => void;
}

interface IStateToProps {}

interface IState {
  username: string;
  password: string;
  repeat_password: string;
  flipped: boolean;
}

export { IProps, IState };
