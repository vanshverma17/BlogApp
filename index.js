import express from "express";
import bodyParser from "body-parser";
import moment from "moment";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs",{ posts : posts,moment : moment});
});

app.get("/posts",(req,res) => {
    res.render("posts.ejs");
});

const posts = [];

app.post("/posts", (req,res) => {
    const title = req.body["title"];
    const content = req.body["content"];
    const tags = req.body.tags.split(",").map(tag => tag.trim());
    const timestamp = new Date();

    const newPosts = {"title" : title,"content" : content, "tags" : tags, "timestamp" : timestamp };
    posts.push(newPosts);

    console.log(posts["title"]);

    res.redirect("/success");

});


app.get("/success", (req,res) => {
    res.render("success.ejs", {title : "Post Published Successfully!"});
});


app.get("/dashboard",(req,res) =>{
    res.render("dashboard.ejs",{posts : posts});
});


app.get("/logout",(req,res) => {
    res.render("logout.ejs");
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});