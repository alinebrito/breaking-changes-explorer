var utilsDB = require('./utils/utilsMongoDB');

var findAllBreakingChanges = function(res){
	utilsDB.connectMongoDB(function(){
		utilsDB.getCollection().find({})
		.sort(utilsDB.filterOrder())
		.toArray(function(err, resp){
			if(err){
				utils.logError(err);
			}
			else{
				res.json(resp);
			}  
		});
	});
};

var findByCommitAndListBreakingChanges = function(commit, option){
	utilsDB.connectMongoDB(function(){
		utilsDB.getCollection().find({"commit": commit})
		.sort(utilsDB.filterOrder())
		.toArray(function(err, resp){
			if(err){
				utils.logError(err);
			}
			else{
				resp[0].breakingChanges.forEach(function(val){
					console.log('remove;' + commit + ';' + val._id + ';' + option);
				});
			}  
		});
	});
};


var removeAllBreakingChange = function(commit, option){
	if(commit){
		utilsDB.connectMongoDB(function(){
			findByCommitAndListBreakingChanges(commit, option);
			utilsDB.getCollection().remove({"commit" : commit});
		});
	}
};


var removeBreakingChangeById = function(commit, id, option){
	if(commit && id){
		utilsDB.connectMongoDB(function(){
			utilsDB.getCollection().find({"commit" : commit})
			.sort(utilsDB.filterOrder())
			.toArray(function(err, resp){
				if(err){
					utils.logError(err);
				}
				else{
					//console.log(resp[0])
					var breakingChangesCurrent = [];
					if(resp[0].breakingChanges.length == 1){
						removeAllBreakingChange(commit, option);
					}
					else{
						resp[0].breakingChanges.forEach(function(val){
						if(val._id != id){
							breakingChangesCurrent.push(val);
						}
						});
						utilsDB.getCollection().update({"commit" : commit}, {$set: {breakingChanges: breakingChangesCurrent}}, function(){
							console.log('remove;' + commit + ';' + id + ';' + option);
						});
					}
				}  
			});
		});
	}
};

module.exports = function(app) {

	app.post('/api/findAllBreakingChanges',  function(req, res) {
		findAllBreakingChanges(res);
	});

	app.post('/api/removeAllBreakingChange',  function(req, res) {
		removeAllBreakingChange(req.body.commit,req.body.option);
	});

	app.post('/api/removeBreakingChangeById',  function(req, res) {
		removeBreakingChangeById(req.body.commit, req.body.id, req.body.option);
	});

	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});
	
};
