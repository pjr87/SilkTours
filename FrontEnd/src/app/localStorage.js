
//This function gets the state that is stored in the localStorage
//If one does not exist then undefiend is returned and the state is loaded
//from the reducers initial state
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if( serializedState == null) {
      return undefined;
    }
    else{
      console.log("Loaded State");
      return JSON.parse(serializedState);
    }
  }
  catch (err) {
    return undefined;
  }
}

//This function saves the state in localStorage
//Errors will occur if the state is not serializable
export const saveState = (state) => {
  try {
    console.log("Saved State");
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  }
  catch (err) {
  }
}
