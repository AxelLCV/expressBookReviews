const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
      // Check if the user does not already exist
      if (!isValid(username)) {
          // Add the new user to the users array
          users.push({"username": username, "password": password});
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }
  // Return error if username or password is missing
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  var isbn = req.params.isbn;
  if (isbn)
  {
    return res.send(JSON.stringify(books[isbn]));
  }
  else
  {
    res.send("Unable to find book!");
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  var author = req.params.author;
  if (author)
  {
    return res.send(JSON.stringify(Object.values(books).filter(book => book.author==author)));
  }
  else
  {
    res.send("Unable to find books!");
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  var title = req.params.title;
  if (title)
  {
    return res.send(JSON.stringify(Object.values(books).filter(book => book.title==title)));
  }
  else
  {
    res.send("Unable to find books!");
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  var isbn = req.params.isbn;
  if (isbn)
  {
    return res.send(JSON.stringify(books[isbn].reviews));
  }
  else
  {
    res.send("Unable to find book!");
  }
});

module.exports.general = public_users;
