import React,{createContext} from 'react';
import App from './Component/App';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore,applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk'




// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name:'Superman'}]
// })

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name:'Batman'}]
// })

// const thunk=({dispatch,getstate})=>(next)=>(action)=>{
//  if(typeof action ==='function'){
//    action(dispatch)
//    return
//  }
//   next(action)
// }
const logger=({dispatch,getstate})=>(next)=>(action)=>{
  if(typeof action!=='function'){
    console.log("ACTION TYPE : ",action.type);
  }
  next(action)
}
const store=createStore(rootReducer,applyMiddleware(logger,thunk));
export const StoreContext=createContext();
console.log('')
class Provider extends React.Component{
  render(){
    const {store}=this.props
return <StoreContext.Provider value={store}>
       {this.props.children}
   </StoreContext.Provider>
  }
}
// console.log("store",store);
// console.log("STATE",store.getState());
// console.log('after dispatch', store.getState());

ReactDOM.render(
   <Provider store={store}>
    <App store={store}/>
    </Provider>,
  document.getElementById('root')
);
