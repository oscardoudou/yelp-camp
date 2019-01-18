var express = require("express")
var app = express()
var bodyPaser = require("body-parser")

app.use(bodyPaser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/",function(req,res){
    res.render("landing")
})

var campgrounds = [
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
        ]
        
app.get("/campgrounds",function(req,res){
    
        //after L: is the data we actually pass in, before is just the name we give it
    res.render("campgrounds",{campgrounds: campgrounds})
})

app.post("/campgrounds", function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name
    var image = req.body.image 
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground)
    //redirect back to campgrounds page
    // res.send("You hit the post route")
    res.redirect("/campgrounds")
})

app.get("/campgrounds/new",function(req,res){
    res.render("new");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started")
})