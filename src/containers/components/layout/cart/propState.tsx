interface IProps {
  title: any;
  handleClick?: () => void;
}

interface IState {
  modal8: boolean;
  cartItems: any;
  totalCost: Number;
}

export { IProps, IState };
