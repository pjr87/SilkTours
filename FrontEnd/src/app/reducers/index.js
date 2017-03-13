import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer";
import TourCreationReducer from "./TourCreationReducer";
import TourDetailReducer from "./TourDetailReducer";
import { reducer as formReducer } from 'redux-form'


const reducers = combineReducers({
  AuthReducer,
  TourCreationReducer,
  TourDetailReducer,
  form: formReducer
});

export default reducers;
