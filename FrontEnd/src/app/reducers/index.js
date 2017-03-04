import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer";
import { reducer as formReducer } from 'redux-form'


const reducers = combineReducers({
  AuthReducer,
  form: formReducer
});

export default reducers;
