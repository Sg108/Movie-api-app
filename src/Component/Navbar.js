import React from 'react';
import {StoreContext} from '../index';
// import {data} from '../data';
import {addMovieToList,handleMoviesSearch,closeResults,addLoader} from '../actions';

class Navbar extends React.Component{

  constructor(props){
    super(props);
    this.state={
      searchText:''
    };
  }

  handleAddToMovies=(movie)=>{
    movie.description=this.state.searchText;
   this.props.dispatch(addMovieToList(movie))
    // this.setState({
    //   showSearchResults:fals
    // })
  }
  closeSearchResults=()=>{
    const {showSearchResults}=this.props.search;
    if(showSearchResults)
    {
    this.props.dispatch(closeResults())
    }
    
  }
  handleSearch=()=>{
    const {searchText}=this.state;
    this.props.dispatch(addLoader());
    console.log("p")
    this.props.dispatch(handleMoviesSearch(searchText));
  }

  handleChange=(e)=>{
    this.setState({
      searchText:e.target.value
    })
  }

  render(){
    // const {showSearchResults}=this.state;
    const {result:movie,showSearchResults}=this.props.search;
    return (
        <div className="nav"  onClick={this.closeSearchResults}>
          <div className="search-container">
              <input onChange={this.handleChange}/>
              <button id="search-btn" onClick={this.handleSearch}>Search</button>
              
              {  
                showSearchResults && 
                <div className="search-results">
                  <div className="search-result">
                    <img src={movie.image_resource_url} alt="search-pic" />
                    <div className="movie-info">
                      <span>{movie.Title}</span>
                      <button onClick={()=>this.handleAddToMovies(movie)}>
                        Save Image
                      </button>
                    </div>
                  </div>
                </div>
                
               } 
          </div>
        </div>
      );
  }
}
class NavbarWrapper extends React.Component{
  render(){
    return(
      <StoreContext.Consumer>
        {(store)=><Navbar dispatch={store.dispatch} search={this.props.search}/>}
      </StoreContext.Consumer>
    )
  }
}
export default NavbarWrapper;
