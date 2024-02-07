// {
//     type:'ADD_MOVIES',
//     movie:[]
// };
// {

// }
//types
//require('dotenv').config()
import 'dotenv/config'
export const ADD_MOVIES='ADD_MOVIES'
export const ADD_FAVOURITE='ADD_FAVOURITE'
export const REMOVE_FAVOURITES='REMOVE_FAVOURITES'
export const SET_SHOW_FAVOURITES='SET_SHOW_FAVOURITES'
export const ADD_MOVIE_TO_LIST='ADD_MOVIE_TO_LIST'
export const ADD_SEARCH_RESULT='ADD_SEARCH_RESULT'
export const CLOSE='CLOSE'
export const ADD_LOADER='ADD_LOADER'
export const REMOVE='REMOVE'
//export const SET_SHOW_FAVOUIRTES
//creators
export function remove(movie){
    return {
        type: REMOVE,
        movie
    }
}
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
export function addLoader(){
    return {
        type:ADD_LOADER
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
export function closeResults(){
    return{
        type:CLOSE
    }
}
export function handleMoviesSearch(movie){
    // const url=`https://www.omdbapi.com/?apikey=83bca572&t=${movie}`
    // console.log('www')
    // return function (dispatch){
    // fetch(url)
    //  .then(response=> response.json())
    //  .then(res=>{console.log(res)
    //   dispatch(addMovieSearchResult(res))    
    // })}
    console.log('process :',process.env.REACT_APP_API_KEY)
    const options = {
        method: 'POST',
        headers: {Authorization:`Bearer ${process.env.REACT_APP_API_KEY}`,accept: 'application/json', 'content-type': 'application/json'},
        body: JSON.stringify({
          response_as_dict: true,
          attributes_as_list: false,
          show_original_response: false,
          resolution: '256x256',
          num_images: 1,
          providers: 'openai',
          text: `${movie}`
        })
      };
      return function (dispatch){
      fetch('https://api.edenai.run/v2/image/generation', options)
        .then(response => response.json())
        .then(response =>{ console.log(response);
        dispatch(addMovieSearchResult(response.openai.items[0])) })
        .catch(err => console.error(err));
      }

}
export function addMovieSearchResult(movie){
    return{
        type:ADD_SEARCH_RESULT,
        movie
    }
}
