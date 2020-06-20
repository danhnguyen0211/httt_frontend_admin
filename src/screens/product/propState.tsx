interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getItemByIdAction?: (id: Number) => void;
}

interface IStateToProps {
  item: any;
  match: any;
}

interface IState {}

export { IProps, IState };
