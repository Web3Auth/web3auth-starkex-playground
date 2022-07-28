/* eslint-disable import/extensions */
import { configureStore } from "redux";

import reducer from "./reducer";

const store = configureStore(reducer);
