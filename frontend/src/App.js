import React, { Component } from 'react';
import Particles from 'react-particles-js';
import MovieCard from './components/MovieCard/MovieCard';
import LikesForm from './components/LikesForm/LikesForm';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';


var pressed = false;
var pressed2 = false;


const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 80
      }
    }
  }
}

const initialState = {
      input: '',
      imageUrl: '',
      title:'',
      year:'',
      description:'',
      rating:'',
      metascore:'',
      likes:0,
      avg:0,
      likers:[],
      reviews:[],
      reviewers:[],
      route: 'signin',
      isSignedIn:0,
      user: {
        id: '',
        name: '',
        email: '',
        GUC_ID:'',
        joined: ''
      }
    }

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      title:'',
      year:'',
      description:'',
      rating:'',
      metascore:'',
      likes:0,
      avg:0,
      likers:[],
      reviews:[],
      reviewers:[],
      route: 'signin',
      isSignedIn:0,
      user: {
        id: '',
        name: '',
        email: '',
        GUC_ID:'',
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      GUC_ID: data.GUC_ID,
      joined: data.joined
    }})
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    }
     else if (route === 'home') {
      this.setState({isSignedIn: 1})
      pressed = false;
      pressed2 = false;
    } else if (route === 'Card') {
      this.setState({isSignedIn: 2})
    }

    else if (route === 'Likes') {
      this.setState({isSignedIn: 3})
    }
    this.setState({route: route});
  }


  

  

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  viewRev=() => {
    this.onRouteChange('Likes');
    fetch('http://localhost:3001/getLikers', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.title,
        
      })
    }).then(response => response.json())
            .then(likers => {
               this.setState({likers: likers});
            
            })

  
    fetch('http://localhost:3001/getAvg', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.title,
        
      })
    }).then(response => response.json())
            .then(avg => {
               this.setState({avg: avg});
            
            })

                   

      fetch('http://localhost:3001/getReviews', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.title,
        
      })
    }).then(response => response.json())
            .then(reviews => {
               this.setState({reviews: reviews});
               
            })

      fetch('http://localhost:3001/getReviewers', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.title,
        
      })
    }).then(response => response.json())
            .then(reviewers => {
               this.setState({reviewers: reviewers});
               
            })
  }






  onButtonSubmit = () => {
    

   document.documentElement.style.overflowX = 'hidden';

    this.onRouteChange('Card');

    fetch('http://localhost:3001/movie', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.input,
        
      })
    })
    .then(response => response.json())
      .then(movie => {
        this.setState({imageUrl: movie.poster});
        this.setState({title: movie.title});
        this.setState({year: movie.year});
        this.setState({description: movie.description});
        this.setState({rating: movie.rating});
        this.setState({metascore: movie.metascore});
        fetch('http://localhost:3001/movieTable', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.title,
        
      })
    })

      fetch('http://localhost:3001/getLikes', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.title,
        
      })
    }).then(response => response.json())
            .then(likes => {
               this.setState({likes: likes});
            })
        

  
      })
  }


likeMovie = () => {

if(pressed === false) {


 fetch('http://localhost:3001/likeMovie', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              title: this.state.title
            })
          })
            .then(response => response.json())
            .then(likes => {
              this.setState({likes: likes})
              
            })

      fetch('http://localhost:3001/addLiker', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user:this.state.user.name,
        title: this.state.title
        
      })
    })
      pressed = true;
     }  
}


addReview = () => {
  alert("Your review has been added!!");
  fetch('http://localhost:3001/addReview', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        review: document.getElementById("review").value,
        title: this.state.title
      })
    })

fetch('http://localhost:3001/addReviewer', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user:this.state.user.name,
        title: this.state.title
      })
    })


}

  addRating = () => {
    if(pressed2 ===false){
  alert("Your rating has been added!!");
  fetch('http://localhost:3001/addRating', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        rating: document.getElementById("rating").value,
        title: this.state.title
      })
    })
  pressed2 = true;
}
}

orderMovies = () => {
    
  fetch('http://localhost:3001/orderMovies', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      })
    }).then(response => response.json())
            .then(name => {
              alert("The most liked movie is: "+ name)
              
            })

}

  
  render() {
    const { isSignedIn, imageUrl, route, box, title,year,description,rating,metascore,likes,likers,reviews,reviewers,avg } = this.state;
    return (
      <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} orderMovies={this.orderMovies}/>
        { route === 'home'
          ? <div>
              <Logo />
            
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                
              />

              
             
            </div>
          : (
             route === 'signin'
             ? <div>
             <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                
              


               </div>

             : (route === 'Card' ?
             <MovieCard box={box} imageUrl={imageUrl} title={title} 
              year={year} description={description} rating={rating} 
              metascore={metascore} likeMovie={this.likeMovie} 
              likes={likes} addReview={this.addReview} viewRev={this.viewRev} addRating={this.addRating} />
              :(route === 'Likes' ?
              <LikesForm likers={likers} reviews={reviews} reviewers={reviewers} avg={avg} />
              :

             <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             )
             )
            )
        }
      </div>
    );
  }
}

export default App;

