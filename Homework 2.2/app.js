/**
* Write a program in the language of your choice that will remove the grade of type "homework" with the lowest score for each student from the dataset that you imported in HW 2.1. Since each *document is one grade, it should remove one document per student.
*/
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format,
	studentGrades = [];

  MongoClient.connect('mongodb://127.0.0.1:27017/students', function(err, db) {
    if(err) throw err;

    var collection = db.collection('grades');
    collection.find({'type':'homework'}).toArray(function(err, results) {
		for(key in results){
			var result = results[key];
			if(studentGrades[result.student_id]==null || studentGrades[result.student_id]>result.score){
				studentGrades[result.student_id] =  result.score;
			}
		}
		for(student_id in studentGrades){
			collection.remove({'student_id':parseInt(student_id), 'score':studentGrades[student_id]},function(err, numberOfRemovedDocs){
				console.log(numberOfRemovedDocs);
			});
		}
		
        // Let's close the db
        //db.close();
      });
  });