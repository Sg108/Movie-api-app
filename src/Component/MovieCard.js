import React from 'react';
import {addFavourite,removeFavourites,remove} from '../actions'

class MovieCard extends React.Component{

   
    handleFavouriteClick=()=>{
        const {movie}=this.props
        this.props.dispatch(addFavourite(movie))
    }
    handleUnFavouriteClick=()=>{
        const {movie} = this.props
        this.props.dispatch(removeFavourites(movie))
    }
    handleRemove=()=>{
        const {movie} = this.props
        this.props.dispatch(remove(movie))
    }

  render(){
      const {movie,isFavourite}=this.props;
    return (
        <div className="movie-card">
            <div className="left">
                <img src={movie.image_resource_url} alt="movie-poster" />
            </div>
            <div className="right">
                {/* <div className="title">{movie.Title}</div> */}
                <div className="plot">{movie.description}</div>
                <div className="footer">
                    {/* <div className="rating">{movie.imdbRating}</div> */}
                    {
                        isFavourite
                        ?<button className="unfavourite-btn" onClick={this.handleUnFavouriteClick} >UnFavourite</button>
                        :<button className="favourite-btn" onClick={this.handleFavouriteClick} >Favourite</button>                  
                    }
                    { !this.props.showFavourites && <button className="favourite-btn" onClick={this.handleRemove}>Remove</button> }
                </div>
            </div>

        </div>
      );
  }
}

export default MovieCard;
