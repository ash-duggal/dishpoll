import { createContext, useContext, useReducer } from "react";

const Dishpoll = createContext(null);

const pollReducer = (state,action) =>{
    switch (action.type) {

        case "login":  
        return{ ...state, user :action.payload,isAuthenticated:true}
        
        case "logout":return{
            ...state,user:null,isAuthenticated:false
        }
        case "add":
            return{...state,data:action.payload}
        default:
          return state;
      }
}

const ServerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pollReducer, {
    data: 0,
    isAuthenticated: false,
    user: null
  });
  return (
    <Dishpoll.Provider value={{ state, dispatch }}>
      {children}
    </Dishpoll.Provider>
  );
};

const useServer = () => useContext(Dishpoll);

export { ServerProvider, useServer };