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
* header
** leave space on page left right: make whole thing except header and footer inside a container
** make h1 and add link inside jumbotron, change link to button make it seperate line using <p>
** leave space in side jumbotron on left and right, recursive make it a container
* grid
* make each campground shown properly even shrink page using col-md-3(12 total so 4 in a row) inside row
* using thumbnail wrap name and image content, class caption wrap name 
* style="display:flex; flex-wrap: wrap;" should fix grid messup caused by different height
* remember not bring any extra div it would mess up the benifit flex bring before, also please use chrome see the effect, safari would expect some werid behavior
* 