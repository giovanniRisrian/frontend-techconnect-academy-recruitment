
import ActionType from "./ActionType";


const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.LOGIN: {
    
      return {...state,token:action.token,name:action.name
      };
    }
    case ActionType.CHECK: {
   
      return state
    }
    case ActionType.LOGOUT: {
      return {
        ...state,
        token: null,
        name:null
      };
    }

    default:
      return state;
  }
};
  
  export default reducer