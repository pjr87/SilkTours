import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer";
import TourReducer from "./TourReducer";
import { reducer as formReducer } from 'redux-form'


const reducers = combineReducers({
  AuthReducer,
  TourReducer,
  form: formReducer
});

export default reducers;
