var express = require("express")
var app = express()
var bodyPaser = require("body-parser")
var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true})
app.use(bodyPaser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
})

var Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"
//     }, function(err, campground){
//         if(err){
//             console.log(err)
//         }else{
//             console.log("NEWLY CREATED CAMPGROUND:")
//             console.log(campground)
//         }
//     })

app.get("/",function(req,res){
    res.render("landing")
})
        
app.get("/campgrounds",function(req,res){
    //Get all campgrounds from DB
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            //now data we pass in is retrieve from db, send it to campgrounds.ejs template
            res.render("campgrounds", {campgrounds: allCampgrounds})
        }
    })
    //after : is the data we actually pass in, before is just the name we give it
    // res.render("campgrounds",{campgrounds: campgrounds})
    
})

app.post("/campgrounds", function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name
    var image = req.body.image 
    var newCampground = {name: name, image: image}
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

app.get("/campgrounds/new",function(req,res){
    res.render("new");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started")
})