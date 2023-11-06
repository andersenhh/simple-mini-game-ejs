const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let posts = require("./db/posts.json");
var users = require("./db/posts.json")


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("main.ejs");
})

app.get("/game", function (req, res) {
    res.render("game.ejs");
})

app.get("/login", function (req, res) {
    res.render("login.ejs");
})

app.get("/welcome", function (req, res) {
    res.render("welcome.ejs");
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(i => {
        return i.username == username && i.password == password
    });

    console.log(user);

    if (user) {
        console.log("success login");
        res.redirect('/game');
        return;
    } else {
        console.log("fail login");
        res.render('login', {
            message: 'Invalid username or password',
        });
    }
});

/* 
GET all data
endpoint: http://localhost:8000/api/v1/posts for get all data, method -> GET
*/

app.get("/api/v1/posts", (req, res) => {
    res.status(200).json(posts)
})

/*
GET data by id
endpoint: http://localhost:8000/api/v1/posts/1 for get by id, method -> GET
*/
app.get("/api/v1/posts/:id", (req, res) => {
    const post = posts.find((i) => i.id === +req.params.id);
    res.status(200).json(post);
});

app.post("/api/v1/posts", (req, res) => {
    /**
     * Menghandle request body
     * Call req.body
     */
    const { username, password } = req.body;

    // GET id
    const id = posts[posts.length - 1].id + 1;
    const post = {
        id,
        username,
        password,
    };
    // Save data in array
    posts.push(post);
    res.status(201).json(post);
});
/**
 * PUT
 * endpoint: http://localhost:8000/api/v1/posts/1 for post a data -> method PUT
 */
app.put("/api/v1/posts/:id", (req, res) => {
    let post = posts.find((i) => i.id === +req.params.id);
  
    const params = {
      username: req.body.username,
      password: req.body.password,
    };
  
    post = { ...post, ...params };
  
    post = posts.map((i) => (i.id === post.id ? post : i));
  
    res.status(200).json(post);
  });
  
/**
 * DELETE
 * endpoint: http://localhost:8000/api/v1/posts/1 for delete, use DELETE Method
 */
app.delete("/api/v1/posts/:id", (req, res) => {
    posts = posts.filter((i) => i.id !== +req.params.id);
  
    res.status(200).json({
      message: `Post dengan id ${req.params.id} sudah berhasil dihapus`,
    });
  
});
  


app.listen(8000, function () {

    console.log("The server has started at port 8000");
});

