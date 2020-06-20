interface IProps extends IDispatchToProps, IStateToProps {}

interface IDispatchToProps {
  getAllItemsAction?: () => void;
  getAllCategoriesAction?: () => void;
}

interface IStateToProps {
  listItems: any;
  listCategories: any;
}

interface IState {}

export { IProps, IState };
