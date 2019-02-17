var express = require("express");
//mergeParams make the param through the routes
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground")
var Comment = require("../models/comment")

//NEW display form to add comment to campground
router.get("/new",isLoggedIn, function(req, res) {
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
router.post("/", isLoggedIn,function(req, res) {
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
                    //add username and id to comment, here suing req.user or res.local.currentUser both work
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    //3.connect the new comment to campground
                    campground.comments.push(comment)
                    campground.save()
                    console.log(comment);
                    //4.redirect to campground show
                    res.redirect("/campgrounds/"+req.params.id)
                    // below works same as above
                    // res.redirect("/campgrounds/"+campground._id)
                }
            })
        }
    })
})

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router