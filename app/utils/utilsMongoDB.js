/*
	Módulo com funções utilitárias para conexão e acesso MongoDB.
*/
var mongoClient = require('mongodb').MongoClient;
var host = 'mongodb://127.0.0.1:27017/';

var dbName = 'APIs-BreakingChange-survey';
var nameCollection = "day_35_comJavadocCodigoGroupCommit";

var dbUrl = host + dbName;
var db = null;
var collection = null;

module.exports = {
  connectMongoDB: function (callback) {
	  	if(!db){
	  		console.log("Estabelecendo conexão com MongoDB... ");
				mongoClient.connect(dbUrl, function (err, dbMongo) {
					if(err) {
				  		console.log("Erro ao conectar em " + dbUrl);
					}
					else{
						console.log("Conectado em " + dbUrl);
						db = dbMongo;
						callback();	
					}
				});
			}
			else{
				 callback();	
			}
	},
	getDB: function(){
		return db;
	},
	getCollection: function(){
		return db.collection(nameCollection);
	},
	filterOrder: function(){
		return {"author": -1}
	}
}
