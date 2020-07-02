interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getItemByIdAction?: (id: Number) => void;
}

interface IStateToProps {
  item: any;
  match: any;
}

interface IState {
  quantity: number;
}

export { IProps, IState };
