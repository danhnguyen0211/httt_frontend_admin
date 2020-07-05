interface IProps {
  title: any;
  handleClick?: () => void;
  history?: any;
}

interface IState {
  modal8: boolean;
  cartItems: any;
  totalCost: Number;
}

export { IProps, IState };
