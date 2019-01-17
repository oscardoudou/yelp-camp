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