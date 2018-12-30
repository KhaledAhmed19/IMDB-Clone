import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn,orderMovies }) => {
    if (isSignedIn===1) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
          <p onClick={() => orderMovies()} className='f3 link dim black underline pa3 pointer'>Most Liked Movie!!</p>
        </nav>
      );
    } else if (isSignedIn===0) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
          <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
        </nav>
      );
    }

    else if (isSignedIn===3) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('Card')} className='f3 link dim black underline pa3 pointer'>Back</p>
        </nav>
      );
    }

    else  {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('home')} className='f3 link dim black underline pa3 pointer'>Home</p>
        </nav>
      );
    }
}

export default Navigation;