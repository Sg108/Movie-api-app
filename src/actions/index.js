// {
//     type:'ADD_MOVIES',
//     movie:[]
// };
// {

// }
//types
export const ADD_MOVIES='ADD_MOVIES'
export const ADD_FAVOURITE='ADD_FAVOURITE'
export const REMOVE_FAVOURITES='REMOVE_FAVOURITES'
export const SET_SHOW_FAVOURITES='SET_SHOW_FAVOURITES'
export const ADD_MOVIE_TO_LIST='ADD_MOVIE_TO_LIST'
export const ADD_SEARCH_RESULT='ADD_SEARCH_RESULT'
//export const SET_SHOW_FAVOUIRTES
//creators
export function addMovies(movies){
    return{
        type :ADD_MOVIES,
        movies
    }
}

export function addFavourite(movie){
    return{
        type: ADD_FAVOURITE,
        movie
    }
}

export function removeFavourites(movie){
    return{
       type:REMOVE_FAVOURITES,
       movie
    }
    
}

export function setShowFavourite(val){
    return{
       type:SET_SHOW_FAVOURITES,
       val
    }
    
}
export function addMovieToList(movie){
    return{
        type:ADD_MOVIE_TO_LIST,
        movie
    }
}
export function handleMoviesSearch(movie){
    const url=`https://www.omdbapi.com/?apikey=83bca572&t=${movie}`
    console.log('www')
    return function (dispatch){
    fetch(url)
     .then(response=> response.json())
     .then(res=>{console.log(res)
      dispatch(addMovieSearchResult(res))    
    })
}
}
export function addMovieSearchResult(movie){
    return{
        type:ADD_SEARCH_RESULT,
        movie
    }
}
