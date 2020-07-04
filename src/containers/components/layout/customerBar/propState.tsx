interface IProps extends IDispatchToProps {
  listCategories: any;
}

interface IDispatchToProps {
  getAllCategoryAction?: () => void;
}

interface IState {}

export { IProps, IState };
