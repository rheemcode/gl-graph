import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import nodesFilter from "../reducers";


const store = createStore(nodesFilter, compose(applyMiddleware(thunk)));

export type RootDispatch = ReturnType<typeof store.dispatch>;
export type RootState = ReturnType<typeof store.getState>;
export default store;
