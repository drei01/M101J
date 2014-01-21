/**
* Write a program in the language of your choice that will remove the lowest homework score for each student. Since there is a single document for each student containing an array of scores, you will need to update the scores array and remove the homework.
*/
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

  MongoClient.connect('mongodb://127.0.0.1:27017/school', function(err, db) {
    if(err) throw err;

    var collection = db.collection('students');
    collection.find().toArray(function(err, results) {
		for(key in results){
			var lowestHomeworkScore = {score:9999};
			var student = results[key];
			for(scoreKey in student.scores){
				var score = student.scores[scoreKey];
				if(score.type === 'homework' && score.score < lowestHomeworkScore.score){
					lowestHomeworkScore = score;
				}
			}
			
			student.scores.splice(student.scores.indexOf(lowestHomeworkScore),1);
				
			collection.save(student,function(){});
				
			console.log(student.scores);
		}
		
        // Let's close the db
        //db.close();
      });
  });