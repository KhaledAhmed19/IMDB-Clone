const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'khaled19',
    database : 'cinema club'
  }
});


const app = express();

app.use(cors())
app.use(bodyParser.json());


app.post('/signin', (req, res) => {

  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.emaill)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', req.body.emaill)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})




app.post('/register', (req, res) => {
  const { email, name, password, GUC_ID } = req.body;
  const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
            GUC_ID: GUC_ID 
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))


})

var imdb = require('imdb');
var nameToImdb = require("name-to-imdb");
 

app.post('/movie', (req, res) => {
  
nameToImdb({ name: req.body.name }, function(err, ress, inf) { 
imdb(ress, function(err, data) {
  if(err)
    console.log(err.stack);
 
  if(data)
    
    res.json(data);
   
})
    
})

  
})

app.post('/movieTable', (req, res) => {
  db('movies').insert({name: req.body.name})
  .then(entry=>{
    res.json(entry)
  })
  .catch(err => res.status(400).json('Movie already entered!!'))


})






app.put('/getLikes', (req, res) => {
  const { name } = req.body;
  db.select('likes').from('movies').where({name})
  .returning('likes')
    .then(likes => {
     res.json(likes[0].likes)
     
    })
    .catch(err => res.status(400).json('0'))
})


app.put('/orderMovies', (req, res) => {
  
  db('movies').orderBy('likes', 'desc')
  .returning('name')
    .then(name => {
     res.json(name[0].name)
     
    })
    .catch(err => res.status(400).json('No movies yet!!'))
})


app.put('/getAvg', (req, res) => {
  const { name } = req.body;
  db.select('ratings').from('movies').where({name})
  .returning('ratings')
    .then(ratings => {
    var sum = 0;
    var arrayR = ratings[0].ratings;
for( var i = 0; i < arrayR.length; i++ ){
    sum += parseInt( arrayR[i], 10 ); 
}

var avg = sum/arrayR.length;
res.json(avg)
     
     
    })
    .catch(err => res.status(400).json('0'))
})




app.put('/getLikers', (req, res) => {
  const { name } = req.body;
  db.select('likers').from('movies').where({name})
  .returning('likers')
    .then(likers => {
     res.json(likers[0].likers)
     
     
    })
    .catch(err => res.status(400).json('No likers yet'))
})


app.put('/getReviews', (req, res) => {
  const { name } = req.body;
  db.select('reviews').from('movies').where({name})
  .returning('reviews')
    .then(reviews => {
     res.json(reviews[0].reviews)
     
     
    })
    .catch(err => res.status(400).json('No reviews yet'))
})

app.put('/getReviewers', (req, res) => {
  const { name } = req.body;
  db.select('reviewers').from('movies').where({name})
  .returning('reviewers')
    .then(reviewers => {
     res.json(reviewers[0].reviewers)
     
     
    })
    .catch(err => res.status(400).json('No reviewers yet'))
})




app.put('/likeMovie', (req, res) => {
  const { title } = req.body;
  db('movies').where('name', '=', title)
  .increment('likes', 1)
  .returning('likes')
  .then(likes => {
    res.json(likes[0]);
  })
  .catch(err => res.status(400).json('unable to inc likes'))

})

app.put('/addLiker', (req, res) => {
  const { user,title} = req.body;
 db('movies')
 .where('name', '=', title)
    .update({
        likers: db.raw('array_append(likers, ?)', [user])
    })
    .then(liker => {
    res.json(liker);
  })
  .catch(err => res.status(400).json('unable to add liker'))

})


app.put('/addRating', (req, res) => {
  const { rating,title} = req.body;
 db('movies')
 .where('name', '=', title)
    .update({
        ratings: db.raw('array_append(ratings, ?)', [rating])
    })
    .then(rating => {
    res.json(rating);
  })
  .catch(err => res.status(400).json('unable to add rating'))

})


app.put('/addReview', (req, res) => {
  const { review,title} = req.body;
 db('movies')
 .where('name', '=', title)
    .update({
        reviews: db.raw('array_append(reviews, ?)', [review])
    })
    .then(review => {
    res.json(review);
  })
  .catch(err => res.status(400).json('unable to add review'))

})


app.put('/addReviewer', (req, res) => {
  const { user,title} = req.body;
 db('movies')
 .where('name', '=', title)
    .update({
        reviewers: db.raw('array_append(reviewers, ?)', [user])
    })
    .then(reviewer => {
    res.json(reviewer);
  })
  .catch(err => res.status(400).json('unable to add reviewer'))

})





app.listen(3001, ()=> {
  console.log('app is running on port 3001');
})






