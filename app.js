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

mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true})
app.use(bodyPaser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"))
seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Landing job in Google and Cisco",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
//to use authenticate method, have to have the pkg passportLocalMongoose in User.
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res){
    res.render("landing")
})
//==========================
//CAMPGROUNDS ROUTES
//==========================
//INDEX - show all campgrounds        
app.get("/campgrounds",function(req,res){
    //Get all campgrounds from DB
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            //now data we pass in is retrieve from db, send it to campgrounds.ejs template
            res.render("campgrounds/index", {campgrounds: allCampgrounds})
        }
    })
    //after : is the data we actually pass in, before is just the name we give it
    // res.render("campgrounds",{campgrounds: campgrounds})
    
})

//CREATE - add new campgrounds to db
app.post("/campgrounds", function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var newCampground = {name: name, image: image, description: description}
    //Creata a new campground and save to db
    Campground.create(newCampground,function(err,campground){
        if(err){
            console.log(err)
        }else{
            //redirect back to campgrounds page
            //most important: we dont need to manually push, when redirect it will retrieve newly created one as well
            res.redirect("/campgrounds")
        }
    })
    // campgrounds.push(newCampground)
    // res.send("You hit the post route")
    
})

//NEW - display form to create new campground
app.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new")
})

//SHOW - show info of particular campground
app.get("/campgrounds/:id", function(req,res){
    //find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground)
           //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })
    
})

// ========================
// COMMENTS ROUTES
// ========================
//NEW display form to add comment to campground
app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req, res) {
    //find the campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            console.log(campground)
            res.render("comments/new",{campground: campground})
        }
    })
})

//CREATE add new comment to db
app.post("/campgrounds/:id/comments", isLoggedIn,function(req, res) {
    //1.lookup campground using id
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err)
            res.redirect("/campgrounds")
        }else{
            console.log(req.body.comment)
            //2.create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                }else{
                    //3.connect the new comment to campground
                    campground.comments.push(comment)
                    campground.save()
                    //4.redirect to campground show
                    res.redirect("/campgrounds/"+req.params.id)
                    // below works same as above
                    // res.redirect("/campgrounds/"+campground._id)
                }
            })
        }
    })
})

//========================
//AUTH ROUTES
//========================

//show register form
app.get("/register",function(req, res) {
    res.render("register")
})

//handle sign up logic
app.post("/register",function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.redirect("/register")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds")
        })
    })
})

// show login form
app.get("/login", function(req, res) {
    res.render("login")
})

// handle login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }),function(req,res){
    //this callback really do nothing, just aware authenticate is a middleware
})

// logout logic
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started")
})