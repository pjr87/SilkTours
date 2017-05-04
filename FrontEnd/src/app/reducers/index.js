import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer";
import TourCreationReducer from "./TourCreationReducer";
import TourDetailReducer from "./TourDetailReducer";
import SearchReducer from "./SearchReducer";
import PendingReviewReducer from "./PendingReviewReducer";
import TourEditReducer from "./TourEditReducer";
import { reducer as formReducer } from 'redux-form'


const reducers = combineReducers({
  AuthReducer,
  TourCreationReducer,
  TourDetailReducer,
  TourEditReducer,
  SearchReducer,
  PendingReviewReducer,
  form: formReducer
});

export default reducers;
