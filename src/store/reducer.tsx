/* eslint-disable @typescript-eslint/default-param-last */
const providerState = {
  provider: null,
};
const reducer = (state = providerState, action: any) => {
  switch (action.type) {
    case "UPDATE_PROVIDER":
      return { ...state, provider: action.payload.provider };
    case `REMOVE_PROVIDER`:
      return { ...state, provider: null };
    default:
      return state;
  }
};
export default reducer;
