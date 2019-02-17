var express         = require("express"),
     app            = express(),
     bodyPaser      = require("body-parser"),
     mongoose       = require("mongoose"),
     passport       = require("passport"),
     LocalStrategy  = require("passport-local"),
     Campground     = require("./models/campground"),
     Comment        =  require("./models/comment"),
     User           = require("./models/user"),
     seedDB         = require("./seeds.js")

//requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundsRoutes   = require("./routes/campgrounds"),
    indexRoutes          = require("./routes/index")

mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true})
app.use(bodyPaser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"))
// seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Landing job in Google and Cisco",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
//to use authenticate method, have to have the pkg passportLocalMongoose in User.
passport.use(new LocalStrategy(User.authenticate()) );
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//our middleware (will run for every single route)
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    //this line is mandatory!
    next();
})
//require three routes we have and provide prefix for every single route in that file 
app.use(indexRoutes)
app.use("/campgrounds",campgroundsRoutes)
app.use("/campgrounds/:id/comments",commentRoutes)

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started")
})