

import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard'
import {addMovies,setShowFavourite} from '../actions'
import {StoreContext} from '../index';
console.log(data)
class App extends React.Component{
  componentDidMount (){
    const {store}=this.props;
    store.subscribe(()=>{
      console.log('UPDATED');
      this.forceUpdate();
    })
    store.dispatch(addMovies(data))
  }
  isMovieFavourite=(movie)=>{
   const {movies}=this.props.store.getState();
    const index=movies.favourites.indexOf(movie)
    if(index!==-1){
      return true
    }
    return false
  } 
  onChangeTab=(val)=>
  {
         this.props.store.dispatch(setShowFavourite(val))
  }
  render(){
    const {movies,search}=this.props.store.getState();
    const { list ,favourites,showFavourites}=movies
    console.log('RENDER',this.props.store.getState())
    const displayMovies=showFavourites?favourites:list 
  return(
       <div className="App">
       <Navbar search={search}/>
       <div className="main">
         <div className="tabs">
           <div className={`tab ${showFavourites ? '':'active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies</div>
           <div className={`tab ${showFavourites ? 'active-tabs':''}`} onClick={()=>this.onChangeTab(true)}>Favourites</div>
         </div>
 
         <div className="list">
             {
               displayMovies.map((movie,index)=>{
                return <MovieCard movie={movie} 
                key={`movie-${index}`} 
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieFavourite(movie)}/>
                })
             }
         </div>
 
       </div>
     </div>
   
  

    )
    
    
  }
}
class AppWrapper extends React.Component{
  render(){
    return(
      <StoreContext.Consumer>
        {(store)=><App store={store}/>}
      </StoreContext.Consumer>
    )
  }
}
export default AppWrapper;
// import {data} from '../data';
// import Navbar from './Navbar';
// import MovieCard from './MovieCard'
// import React from 'react';
// console.log(data)

// class App extends React.Component {

//   componentDidMount () {
//     const{store}=this.props;
//     store.subscribe(()=>{
//       console.log("updated");
//       this.forceUpdate();
//     })

//     store.dispatch({
//       type:'ADD_MOVIES',
//       movies:data
//     })

//     console.log('STATEE',this.props.store.getState());
//   }
//   // const movies=props.store.getState();
//   render(){
//     const movies=this.props.store.getState();
//     console.log('render');
//     return (
//       <div className="App">
//         <Navbar/>
//         <div className="main">
//           <div className="tabs">
//             <div className="tab">Movies</div>
//             <div className="tab">Favourites</div>
//           </div>

//           <div className="list">
//               {
//                 movies.map((movie,index)=>{
//                  return <MovieCard movie={movie} key={`movie-${index}`}/>
//                 })
//               }
//           </div>

//         </div>
//       </div>
//     );

//   }
//   }

// export default App