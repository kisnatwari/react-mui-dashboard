import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
const middlewares = applyMiddleware(thunk, logger);
const storage = createStore(() => { }, {}, middlewares);
export default storage;