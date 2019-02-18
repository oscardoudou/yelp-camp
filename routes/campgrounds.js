var express = require("express");
var router = express.Router();
var Campground = require("../models/campground")
var middleware = require("../middleware")

//INDEX - show all campgrounds        
router.get("/",function(req,res){
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
router.post("/",middleware.isLoggedIn, function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: description, author: author}
    //Creata a new campground and save to db, newCampground is the one you pass, and campground is what db return
    Campground.create(newCampground,function(err,campground){
        if(err){
            console.log(err)
        }else{
            //redirect back to campgrounds page
            //most important: we dont need to manually push, when redirect it will retrieve newly created one as well
            console.log(campground)
            res.redirect("/campgrounds")
        }
    })
    // campgrounds.push(newCampground)
    // res.send("You hit the post route")
    
})

//NEW - display form to create new campground
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new")
})

//SHOW - show info of particular campground
router.get("/:id", function(req,res){
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

//EDIT Campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id,function(err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground})
    })    
})

//UPDATE Campground route
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res) {
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds")
        }else{
            //updatedCampground._id works
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
    //redirect somewhere(show page)
})

//DESTORY campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds")
        }else{
            res.redirect("/campgrounds")
        }
    })
})


//not necessary to be named as router, just convention
module.exports = router;