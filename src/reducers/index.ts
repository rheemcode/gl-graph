import { combineReducers } from "redux";
import { nodesFilter, connectorFilter } from "./nodesFilter";

export default combineReducers({ nodesFilter, connectorFilter });