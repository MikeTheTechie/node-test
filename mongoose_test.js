// mongoose_test.js
// In mongo shell, use db.blogposts.find(); to display all documents.
var sys=require('sys');
var mongoose=require('mongoose');
sys.debug("Starting ...");

var Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var Comments = new Schema({
    title     : String
  , body      : String
  , date      : Date
});

var BlogPost = new Schema({
    author    : String
  , title     : String
  , body      : String
  , date      : Date
  , comments  : [Comments]
  , meta      : {
        votes : Number
      , favs  : Number
    }
});

mongoose.model('Comments', Comments);
mongoose.model('BlogPost', BlogPost);

mongoose.connect('mongodb://localhost/my_blogs');
// Once we define a model through `mongoose.model('ModelName', mySchema)`, we can access it through the same function

    var myBlogPost = mongoose.model('BlogPost');

// We can then instantiate it, and save it:

    var post = new myBlogPost();
    post.author='mike';

    // create a comment
    post.comments.push({ title: 'My comment', body: 'My body text' });
    
    post.save(function (err) {
    	if (err) {
    		sys.debug("Error returned by save.  " + err );
    	}
    	else
    		{sys.debug("Worked!");};
    	process.exit(1);
      //
    });