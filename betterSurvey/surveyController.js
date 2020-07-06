// required packages
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var fs = require('fs');

// read the data file
function readData(fileName){
    let dataRead = fs.readFileSync('./data/' + fileName + '.json');
    let infoRead = JSON.parse(dataRead);
    console.log('info:',infoRead)
    return infoRead;
}

// read the data file
function writeData(info, fileName){
    //console.log('data:',info)
    data = JSON.stringify(info);
    //console.log('stringified:',data)

    fs.writeFileSync('./data/' + fileName + '.json', data);
}

// update the data file, I use "name" to be equal to fruit, or animal or color
// to match with the file names
// I assume we always just add 1 to a single item
function combineCounts(name, value){
    // console.log(value);
    var itemArr = [];
    info = readData(name);
     // will be useful for text entry, since the item typed in might not be in the list
    var found = 0;
    console.log('wtf',info[name], value, info.length )
    for (var i=0; i<info.length; i++){
        console.log('wtfff',info[i][name] )

        if (info[i][name] === value || info[name]===value){
            console.log('derp',info[name])
            info[i].count = parseInt(info[i].count) + 1;
            found = 1;
        }
    }

    if (found === 0){
        //info = {
          //  [name:
        //}
        //info.[name] = name;
        //info[name] = value;
        //info.count = 1;
        //info[count] = 1;


        info.push({[name] : value, count: 1});
    }
    writeData(info, name);
}

// This is the controler per se, with the get/post
module.exports = function(app){

    // when a user goes to localhost:3000/analysis
    // serve a template (ejs file) which will include the data from the data files
    app.get('/analysis', function(req, res){
        var color = readData("color");
        var fruit = readData("fruit");
        var animal = readData("animal");
        var school = readData("school");
        var giftSpend = readData("giftSpend");
        var yearBorn = readData("yearBorn");

        res.render(__dirname+'/views/pages/showResults', {results: [color, fruit, animal, school, giftSpend, yearBorn]});
        console.log([color, fruit, animal, school, giftSpend, yearBorn]);
    });



    // when a user goes to localhost:3000/niceSurvey
    // serve a static html (the survey itself to fill in)
    /*app.get('/', function(req, res){
        //res.sendFile(__dirname+'/views/pages/index.ejs');
        res.render(__dirname+'/views/pages/index.ejs');

    });*/

    app.get('/', function(req, res){
        //res.sendFile(__dirname+'/views/pages/index.ejs');
        res.render(__dirname+'/views/pages/index.ejs');

    });

    // when a user types SUBMIT in localhost:3000/niceSurvey 
    // the action.js code will POST, and what is sent in the POST
    // will be recuperated here, parsed and used to update the data files
    app.post('/survey', urlencodedParser, function(req, res){
        //console.log('bodeh',req.body);
        var json = req.body;
        for (var key in json){
            console.log(key + ": " + json[key]);
            //if()
            // in the case of checkboxes, the user might check more than one
            //if ((key.substr(0,5) === "color") && (json[key].length === 3)){

                //for (var item in json[key]){
                   // console.log('reach ifff?',key.substr(0,5),json[key][item],item)

                 //   combineCounts(key.substr(0,5), json[key][item]);
               // }
            //}
            //else {
            if(json[key]!=='' && key.substr(key.length-1)!== ']'){
                combineCounts(key, json[key]);
            }else if(json[key]!==''){
                console.log('test',)
                combineCounts(key.substr(0,5), json[key]);
            }
                //combineCounts(key, json[key]);
            //}
        }
        // mystery line... (if I take it out, the SUBMIT button does change)
        // if anyone can figure this out, let me know!
        res.sendFile(__dirname + "/views/pages/index.ejs");
    });
    

};