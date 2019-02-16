var mongoose = require("mongoose")
var Campground = require("./models/campground")
var Comment = require("./models/comment")

var data = [
    {
        name: "Granite Hill", 
        image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg", 
        description: "This is a huge granite hill, no bath water only beautiful granite!"
    },
    {
        name: "Yosemite National Park", 
        image: "https://previews.dropbox.com/p/thumb/AAViFcReJPcnFtHEs80QexUgg9mFWkdBn99CuKkDdOx04ugtsYja5CNwvHeRwmflqAPVRBm50rQQKr8xF_AiN1EzzhdduBxI3VhQ_L4BzdmSTNwrIR5UGgZIRlQEdwj8L-ivtCDcPI9dcHwXFL6nYixlFh55jc5fH5C6pflJ0s_AXZirHqy1CAyI7LFrqgNSLpLEkBP8kQRThMAk_QKM0mNKHL0BX5KACss8eESDZhOhQeGErwjI-4cwxR24LxjOeYg/p.jpeg?size_mode=5", 
        description: "Really snowy, remember bring your gortex boots"
    },
    {
        name: "Yosemite National Park", 
        image: "https://previews.dropbox.com/p/thumb/AAViFcReJPcnFtHEs80QexUgg9mFWkdBn99CuKkDdOx04ugtsYja5CNwvHeRwmflqAPVRBm50rQQKr8xF_AiN1EzzhdduBxI3VhQ_L4BzdmSTNwrIR5UGgZIRlQEdwj8L-ivtCDcPI9dcHwXFL6nYixlFh55jc5fH5C6pflJ0s_AXZirHqy1CAyI7LFrqgNSLpLEkBP8kQRThMAk_QKM0mNKHL0BX5KACss8eESDZhOhQeGErwjI-4cwxR24LxjOeYg/p.jpeg?size_mode=5", 
        description: "Really snowy, remember bring your gortex boots"
    }
    ]
function seedDB(){
    //remove all campgrounds
    Campground.remove({},function(err){
        if(err){
            console.log(err)
        }
        console.log("removed campgrounds")
        Comment.remove({},function(err){
            if(err){
                console.log(err)
            }
            console.log("removed comments")
            //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed,function(err,campground){
                    if(err)
                        console.log(err)
                    else{
                        console.log("added a campground") 
                        //add a few comments
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",  
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err)
                                }else{
                                    campground.comments.push(comment)
                                    campground.save()
                                    console.log("created new comment")
                                }
                            })
                    }
                })
            })
        })
    })
    
}
//export seedDB() function
module.exports = seedDB;


