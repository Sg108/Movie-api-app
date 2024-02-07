import {combineReducers} from 'redux'
import {REMOVE,ADD_LOADER,ADD_MOVIES,ADD_FAVOURITE,REMOVE_FAVOURITES,SET_SHOW_FAVOURITES,ADD_SEARCH_RESULT, ADD_MOVIE_TO_LIST,CLOSE} from '../actions'

const initialMoviesState={
    list:[],
    favourites:[],
    showFavourites:false
}
let data,favData,newFavdata;
export function movies(state=initialMoviesState,action){
 
    switch (action.type)
    {
        case ADD_MOVIES:
            favData = JSON.parse(localStorage.favData);
            return{
                ...state,
                list: action.movies,
                favourites:favData
            }
        case REMOVE:
            const listOfMovies = state.list.filter( 
                m => m.image !== action.movie.image
            )
            const listOfFavs= state.favourites.filter(
                f => f.image!== action.movie.image
            )
            //  data = JSON.parse(localStorage.data);
            //  newData= data.filter( 
            //     m => m.image !== action.movie.image
            // )
            localStorage.data=JSON.stringify(listOfMovies);
            localStorage.favData=JSON.stringify(listOfFavs);
            return{
                ...state,
                list:listOfMovies,
                favourites:listOfFavs
            }
        case ADD_FAVOURITE:
            favData = JSON.parse(localStorage.favData);
            newFavdata = [action.movie,...favData];
            localStorage.favData=JSON.stringify(newFavdata);
            return{
                ...state,
                favourites:[action.movie,...state.favourites]
            }
        case REMOVE_FAVOURITES:
            const filteredArray = state.favourites.filter( 
                movie => movie.image !== action.movie.image
            )
            localStorage.favData = JSON.stringify(filteredArray);
            

            return {
                ...state,
                favourites: filteredArray
            }
        case SET_SHOW_FAVOURITES:

            return {
                ...state,
                showFavourites: action.val
            }
        case ADD_MOVIE_TO_LIST:
            data = JSON.parse(localStorage.data);
            data = [action.movie,...data];
          
            localStorage.data=JSON.stringify(data);
                return{
                    ...state,
                    list:[action.movie,...state.list]
                }

        default :
            return state
        
    }
    
}
const initialSearchState = {
    result:{},
    showSearchResults:false,
    loading:false
}
export function search( state=initialSearchState, action ){
    switch(action.type){
        case ADD_LOADER:
            return{
                ...state,
                loading:true
            }
        case ADD_SEARCH_RESULT:
            return{
                ...state,
                result:action.movie,
                loading:false,
                showSearchResults:true,
               
            }
        case ADD_MOVIE_TO_LIST:
             return{
                    ...state,
                    showSearchResults:false
                }
        case CLOSE:
            return{
                ...state,
                showSearchResults:false
            }
            
        default:
            return state
    }
    
}

// const initialRootState={
//     movies:initialMoviesState,
//     search:initialSearchState
// }
// export default function rootReducer( state=initialRootState, action ){
//     return {
//         movies: movies(state.movies,action),
//         search: search(state.search,action)
//         //users:userReducer(state,action)
//     }
// }

export default combineReducers({
    movies,
    search
})