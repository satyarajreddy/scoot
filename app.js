var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Rider = require("./models/rider");
//connect mongoose to mongodb
mongoose.connect("mongodb://localhost:27017/scootdb",{ useNewUrlParser: true } );

//flash
var flash = require("connect-flash");
app.use(flash());

//auth
app.use(require("express-session")({
    secret:"Hello World",
    resave:false,
    saveUninitialized:false
}));
 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Rider.authenticate()));
passport.serializeUser(Rider.serializeUser());
passport.deserializeUser(Rider.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
 });
 

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));



//routes
app.get("/", function(req,res){
    res.render("landing");
});

app.get("/index",function(req,res){
    res.render("index");
});

app.get("/contact", function(req,res){
    res.render("contact");
});

app.get("/about", function(req,res){
    res.render("about");
});

app.get("/login", function(req,res){
    res.render("login");
});

app.get("/newfaqs", function(req,res){
    res.render("newfaqs");
});

app.get("/payment", function(req,res){
    res.render("payment");
});

app.get("/pricing", function(req,res){
    res.render("pricing");
});

app.get("/register", function(req,res){
    res.render("register");
});

app.get("/pricing", isLoggedIn, function(req,res){
    res.render("pricing");
});

app.get("/payment",isLoggedIn, function(req,res){
    res.render("payment");
});

app.get("/faq", function(req,res){
    res.render("faq");
});

app.get("/ridefare", function (req, res) {
    res.render("ridefare");
});

app.get("/fleet", function (req, res) {
    res.render("fleet");
});
app.get("/profile", function (req, res) {
    res.render("profile");
});


app.get("/ridefare2", function (req, res) {
    res.render("ridefare2");
});
app.get("/ridefare3", function (req, res) {
    res.render("ridefare3");
});
app.get("/ridefare4", function (req, res) {
    res.render("ridefare4");
});
app.get("/referral", isLoggedIn, function (req, res) {
    res.render("referral");
});
app.get("/calculator", function (req, res) {
    res.render("calculator");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");

}


app.get("/newprofile", function (req, res) {
    res.render("newprofile");
});

app.get("/rides", function (req, res) {
    res.render("rides");
});

app.get("/pr",isLoggedIn, function (req, res) {
    res.render("pr");
});



//register route
app.post("/register", function(req,res){
    var newRider = new Rider({username:req.body.username,
    email:req.body.email,aadhar:req.body.aadhar_no,bday:req.body.bday,gender:req.body.gender,mobile:req.body.mobile});
    Rider.register(newRider , req.body.password, function(err,user){
        if(err){
            console.log(err);
            req.flash("error", "Username or Aadhar already taken")
            res.redirect("register");
        }else{
            passport.authenticate("local")(req,res, function(){
                res.redirect("/index");
            })
        }
    })
});


app.get("/login", function(req,res){
    res.render("login");
});

app.post("/login", passport.authenticate("local",
{
    successRedirect: "/index",
    failureRedirect:"/login",
    badRequestMessage : 'Missing username or password.',
    failureFlash: true
}),  function(req,res){
    // empty callback no need
});

//logout
app.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged you out")
    res.redirect("/index");
});

app.get("/creditcard",isLoggedIn, function (req, res) {
    res.render("creditcard");
});

app.get("/calculator", function (req, res) {
    res.render("calculator");
});

<<<<<<< HEAD
=======
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
>>>>>>> 5a4af65eac8af9f1c31a65aeb47f80f155de8c83

}

//port
app.listen(3000,function(){
    console.log("Started on port 3000");
});