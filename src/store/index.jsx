import { createStore } from "redux";

import rootReducer from "./modules/root.Reducer";

const store = createStore(rootReducer);

export default store;
