var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// Load Express Configuration
require('./expressConfig')(app, express);
app.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var hostName = null;
var url = null;
var removeDocument = function(db, selector, callback) {
  // Get the documents collection 
  var collection = db.collection('messages');
  // Insert some documents 
  collection.remove(selector, function(err, result) {
    callback(result);
  });    
}
var removeOldestMessages = function(messagesCollection, db, callback) {//console.log("sdf1")
    var oldest = null,
        maxMessages = 15;
    function removeOldest() {
        messagesCollection.find({}).toArray(function(err, allMessages) {//console.log("sdf")
            allMessages.forEach(function(element, index, array) {
                if(!oldest) {
                    oldest = element;
                }else {
                    if(element.date < oldest.date) {
                        oldest = element;
                    }
                }
            });
            if(allMessages.length > maxMessages) {
                removeDocument(db, oldest, function(result) {
                    if((allMessages.length - 1) > maxMessages) {
                        removeOldest();
                    }else {
                        callback.call(this, allMessages);
                        db.close();
                    }
                })
            }else {
                callback.call(this, allMessages);
            }
        });
    }
    removeOldest();
}                

var insertMessage = function(username, message, callback) {
    MongoClient.connect(url, function(err, db) {
        var messagesCollection = db.collection('messages');
        assert.equal(null, err);
        console.log("Connected correctly to server.");
        messagesCollection.find({}).toArray(function(err, messages) {
            console.log("Found the following records", messages.length);
            messagesCollection.insertOne({
                "username": username,
                "message": message,
                "date": +new Date()
            }, function(err, result) {
                assert.equal(err, null);
                console.log("Inserted a document into the messages.");
                removeOldestMessages(messagesCollection, db, function(allMessages) {
                    callback.call(this, allMessages);
                });
            });
        });
        
    });
};
var getMessages = function(callback) {
    console.log("host:",hostName);
    MongoClient.connect(url, function(err, db) {
        var messagesCollection = db.collection('messages');
        assert.equal(null, err);
        messagesCollection.find({}).toArray(function(err, messages) {
            callback.call(this, messages);
        });
        
    });
}
/*insertMessage("Maryana", "do you hear me?  hello ?", function(messages) {
    //console.log(messages);
});*/

console.log(app.settings.views)
app.get('/', function(req, res){
    hostName = req.headers.host;
    url = hostName == "localhost:8000" ? "mongodb://localhost:27017/chat" : "mongodb://Marcius:tifind96@ds047612.mongolab.com:47612/heroku_stmsh2q0"
    res.sendFile('index.html', {root: app.settings.views});
});
app.post("/chat", function(req, res) {console.log(req.body)
    insertMessage(req.body.username, req.body.message, function(messages) {
        res.json(JSON.stringify(messages));
    });
});
app.get("/chat", function(req, res) {
    getMessages(function(messages) {
        res.json(JSON.stringify(messages));
    });
});
module.exports = app;