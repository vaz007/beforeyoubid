const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "CONTACT_INFORMATION":
      return { ...state, savedContact: action.payload };
    default:
      return state;
  }
};

export default userReducer;
