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
workflow: create comments.js, define commentSchema, compile and export model, make two table works separate as wish(add comments array to campground), 
improve show route(populate comment array) so inside the campground object we retrieve is not just id, finally modify template to reflect comment 
* Make "cannot find module './models/comment'" errors go away(make new comment, associat with campground, reflect in db)
* Display comments on campground show page(working on show routes)

# Comment New/Create 
* Learn nested routes(comment dependent on campground)

RESTFUL ROUTES
name     url                                verb       desc.
==========================================
INDEX   /campgrounds                        GET         Display a list of all campgrounds
NEW     /campgrounds/new                    GET         Displays form to make a new campgrounds
CREATE  /campgrounds                        POST        Add new campgrounds to db
SHOW    /campgrounds/:id                    GET         Shows info about one campgrounds

NEW     /campgrounds/:id/comments/new       GET         Displays form to make a new comments for specific campground
CREATE  /campgrounds/:id/comments           POST        Add new campgrounds to specific campground to db

* Add the comment new and create route
* Add the new comment form

logic:
both new and create need look up campground first. Once done with look up, new always continue with rendering the form, while create always involve create the object, then push it into related model and save.
Final step of create need redirect back to object/model's show page
work flow:
(make new work first, leave it after, then work on create route. manually test how new work, add button jumping to form later after create done. always finish core logic first)
0. add new.ejs for comment, need split the view dir into two half. Also need change partials/ header footer path in some ejs
1. since comment associate to campground, u need pass campground to get campground._id in new.ejs so that you could make correct action )
2. group property of comment so easy pass the whole comment object in app.js
3. redirect in create also need specify id, no ejs syntax <%= %> needed here
4. add button jumping to form in show.ejs, u need specify campground._id as well, exact same as new.ejs'action which proceed to create

# Style show page
* Add sidebar to show page
col-mid-3 for sidebar rest of the 9 for thumbnail, use two div inside one row to arrange sierbar and thumbnail's relative position
* Display comments nicely

logic:
first css in the project: main.css inside public inside stylesheets, the front end js will also reside in this public folder as well
to actually use that pulic directory. u have to in app.js to tell express to serve that directory, using __dirname to avoid unexpected location
to finally connect the css, include the href of css file relative to the public directory path you served in partials/header.ejs

# Auth Pt. 1 Add User Model
* Install all package needed for auth
* Define User model

# Auth Pt.2 Register
* Configure Passport
* Add register routes
* Add register template

# Auth Pt.3 Login
* Add login routes
* Add login template

# Auth Pt.4 Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

# Auth Pt. 5 Show/Hide Links
* Show/hide auth links correctly
takeout: use req.user of passport. res.local combine with middleware, nice way to dry code

# Refactor the Routes
* Use express router to reorganize all routes

# User <-> Comments
* Associate users and comments
* Save author's name to a comment automatically
workflow: 
1.extend commentsSchema author parts, so it could automatically get value in User using user._id. But here since we print author name with text each time, 
2.it would time consuming to lookup user.username by user._id each time, so we retrieve the username field value and store it in author.username.
3.After done with schema modification, go ahead to actually save comments in new fashion
dont forgot to remove author field in comments/new.js and update how print author in campgrounds/show.js 

# User <-> Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

# Edit Campgrounds
* Add method-override
* Add edit route for campgrounds
* Add link to edit page
* Add update Routes

# Delete campgrounds
* Add destory route
* Add delete button

# Authorization 1 for campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons(trivial)

workflow: define our middleware for checking Ownership before three route which involvs campgrounds ownership(create new wont ownership until campground created, so basically only these 3)
middleware logic authenticate first then authorize, as long as not the owner redirect("back")
hide the button for edit and delete, using similar trick used in middleware, namely compare campground.author.id whether equals current user, only difference is 
in route we have access to both req.user and currentUser while in template you only have access to currentUser, so in template is like: campground.author.id.equals(currentuser._id)
but either case the id in user is inherent string, the id in campground is actually mongoose ObjectID we extend to associate user and campground.

# Edit Comment
* Add edit route for comment
* Add edit button
* Add update route
comment routes would be more nested, but thanks to we require the commentRoutes in app.js
```
/campgrounds/:id/new
/campgrounds/:id/comments/:comment_id/new
```
findByIdAndUpdate take 3 parameter, distinguish different id in params elegantly

# Delete Comment
* Add delete route for comment
* Add delete button
```
/campgrounds/:id
/campgrounds/:id/comments/:comment_id
```
test delete route work need a delete form so far, also we need user?_method=Delete to override the disguised method=post

# Authorization 2 for comments
* User can only edit his/her own comment
* User can only delete his/her own comment
* Hide/show edit and delete button

# Refactor middleware

# develop locallly in vm 