/**
* Your task is to write a program to remove every image from the images collection that appears in no album. Or put another way, if an image does not appear in at least one album, it's an orphan and should be removed from the images collection. 
*/
var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect('mongodb://127.0.0.1:27017/m101', function(err, db) {
    if(err) throw err;

    var images = db.collection('images'),
		albums = db.collection('albums');
    images.find().toArray(function(err, results) {
		results.forEach(function(image){
			var image_id = image._id;
			albums.findOne({images: image_id},function(err, image){
				if(image==null){
					console.log('orphan id:' + image_id);
					images.remove({_id:image_id}, function(err, numberOfRemovedDocs) {});
				}
			});
		});
		
        // Let's close the db
        //db.close();
      });
  });