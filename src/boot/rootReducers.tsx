import { connectRouter } from "connected-react-router";
import commonReducer from "containers/redux/reducers";
import { History } from "history";
import { combineReducers } from "redux";
import screenReducer from "screens/screenReducers";

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    common: commonReducer,
    screen: screenReducer
  });
