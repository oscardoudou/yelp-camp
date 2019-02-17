var express = require("express");
var router = express.Router();
var Campground = require("../models/campground")

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
router.post("/", function(req,res){
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
router.get("/new",function(req,res){
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

//not necessary to be named as router, just convention
module.exports = router;