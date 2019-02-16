# YelpCamp

* landing page
* campgrounds page that list all campgrounds

Campgrounds would be a big array [{},{},{}]
Each campground has:
 * name
 * image
 
# Layout and basic styling
* create header and footer partials
* add in boostrap
when include partials rememeber path should be relative path to views

# create new campgrounds
* setup new campground post route(default redirect is as get)
* add in body-parser
* setup route to show form
* add basic unstyled form

note:
try to keep the name attribute of your form identical to your attribute of object in db
{name: name} this kind of thing remember first argument is always other gonna use, the 2nd argument is the one you provide in current context
eg. 1.when new object the latter name is the var has actual value, while the first is just how that object defined
    2.{data: data} 2nd data is what you retrieve from body when calling API by JSON.parse(body), while first one is what you gonna use in template 

/campgrounds.new is where show the form
/campgrounds as post is where to hit after we submit the form
/campgrounds as get is where to redirect after post(we create newcampground, and add it campgrounds) done

# styling campgrounds page
you can reload the page after each modification, unlike app.js no need to restart server
* add a better header/title
** leave space on page left right: make whole thing except header and footer inside a container
** make h1 and add link inside jumbotron, change link to button make it seperate line using <p>
** leave space in side jumbotron on left and right, recursive make it a container
* make campground display in a grid
* make each campground shown properly even shrink page using col-md-3(12 total so 4 in a row) inside row
* using thumbnail wrap name and image content, class caption wrap name 
* style="display:flex; flex-wrap: wrap;" should fix grid messup caused by different height
* remember not bring any extra div it would mess up the benifit flex bring before, also please use chrome see the effect, safari would expect some werid behavior

# style navbar and form
* add navbar to all templates(add it to header.ejs)
* style the new campground form(form-control, form-group, btn-block)
 
# mongo intro
* make sure run ./mongo in ~(where data folder resides) to let mongo deamon running
* mongo shell is better for debug and practice
* help 
* showdbs use
* C: db.dog.insert() where db is database we're using, dogs is the collection we are creating, insert() is trying to add some data into dog
* R: find()
* U: update() with {$set:{,}}
* D: remove()
 
# mongoose
* odm(object data mapper)
* Interact with a Mongo db using mongoose(all previous interaction with campgrounds array now replaced by interaction with mongodb campgrounds collection)
* make us easier to interact with mongo
```
mongoose.connect("mongodb://localhost:27017/cat_app",{useNewUrlParser: true})
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
})
var Cat = mongoose.model("Cat", catSchema)
```
* a way for us to write js interact with db, could be treated as js layer on top of mongodb
* model name by conventio should start with capital letter 
* workflow: install mongoose, connect db, schema, interact with db

# add mongoose
* install and config mongoose
* setup campground model(setup the campground schema and then compile it to a singular model, db will automatically create a collection with plural from)
* use campground model inside of our routes!(the modeld just create give us a bunch of method we could use inside js, specifically inside of route to replace those hardcoded array related stuff)

# show page
RESTFUL ROUTES
name     url         verb       desc.
==========================================
INDEX   /dogs       GET         Display a list of all dogs
NEW     /dogs/new   GET         Displays form to make a new dog
CREATE  /dogs       POST        Add new dog to db
SHOW    /dogs/:id   GET         Shows info about one dog
* review the RESTful routes so far
  1. get /campgrounds
  2. post /campgrounds
  3. get /campgrounds/new
* add description attribute to our campground model
* show db.collection.drop()
* add a show route as well as a templete(Model.findById())

# Refactor Mongoose Code
* Create a models directory
* Use moduel.exports
* Require everything correctly

# Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

# Add the Comment model!
* Make "cannot find module './models/comment'" errors go away(make new comment, associat with campground, reflect in db)
* Display comments on campground show page(working on show routes)