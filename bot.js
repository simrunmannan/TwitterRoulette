var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());

var
    twit = require('twit'),
    config = require('./config');

var Twitter = new twit(config);

Array.prototype.pick = function() {
    return this[Math.floor(Math.random()*this.length)];
}


//list of verbs, nouns, adjectives used for sentence building NEEDS EDITING AND THOUGHT BEHIND STRUCTURE
var verb = [
    "runs",
    "jumps",
    "holds",
    "drinks",
    "eats",
    "sleeps",
    "cycles",
    "sits",

];

//Niels verb (singular)
var singVerb = [

    "sit still",
    "run",
    "jump",
    "pet animals",
    "drink",
    "eat",
    "sleep",
    "cycle",
    "whisper",
    "invent things",
    "deceive",
    "force",
    "scare little kids",
];

var noun = [
    "table",
    "girl",
    "glass",
    "boy",
    "computer",
    "gun",
    "phone",
    "water",
    "coat",
    "pen",
    "ship",
    "star",
    "wealth",
    "purpose",
    "yarn",
    "fog",
    "dinosaur",
    "trip",
    "army",
    "boat",
    "art",
    "show",
];

var adjective = [
    "funny",
    "cold",
    "sad",
    "green",
    "tired",
    "emotional",
    "angry",
    "painful",
    "mammoth",
    "chunky",
    "unsightly",
    "fallacious",
    "barbarous",
    "giant",
    "thoughtful",
    "spotty",
    "dizzy",
    "unsightly",
    "puzzling",
    "deserted",
    "enormous",
    "shaggy",
    "wandering",
    "icky",
    "prickly",
    "tremendous",
    "agonizing",
    "tasteless",
    "uninterested",
    "scary",
    "nervous",
    "itchy",
    "magical",
    "noiseless",
];

var nounSecond = [
    "book",
    "chair",
    "bottle",
    "strawberry",
    "pen",
    "pasta",
    "jacket",
    "pillow",
    "car",
    "wind" ,
    "beginner",
    "snail",
    "airport",
    "morning",
    "downtown",
    "sisters",
    "sneeze",
    "brother",
    "shoes",
    "scissors",
    "man",
    "night",
    "mother",
    "color",
    "daughter",
    "skirt",

];


//Niels

var color = [
    "blue",
    "red",
    "yellow",
    "green",
    "purple",
    "pink",
    "beige",
    "white",
    "black",
    "grey",
    "transparent",
    "light",
    "dark",
    "dim",
    "gold",
    "violet",
    "deep pink",
    "tan",
];

var animal = [
    "moose",
    "goose",
    "cow",
    "snake",
    "horse",
    "sloth",
    "pig",
    "bird",
    "eagle",
    "cat",
    "dog",
    "skunk",
    "rat",
    "mouse",
    "chimpanzee",
    "chipmunk",
    "musk deer",
    "hog",
];



var people = [

    ["Katy Perry","@katyperry"],
    ["Justin Bieber","@justinbieber"],
    ["Barack Obama", "@BarackObama"],
    ["Taylor Swift", "@taylorswift13"],
    ["Rihanna", "@rihanna"],
    ["Ellen DeGeneres", "@TheEllenShow"],
    ["Lady Gaga","@ladygaga"],
    ["Cristiano Ronaldo", "@Cristiano"],
    ["Justin Timberlake", "@jtimberlake"],
    ["Kim Kardashian","@KimKardashian"],
    ["Britney Spears","@britneyspears"],
    ["Ariana Grande", "@ArianaGrande"],
    ["Selena Gomez","@selenagomez"],
    ["Demi Lovato", "@ddlovato"]
    ["Jimmy Fallon","@jimmyfallon"],
    ["Shakira","@shakira"],
    ["Jennifer Lopez","@JLo"],
    ["Donald J. Trump","@realDonaldTrump"],
    ["Bill Gates","@BillGates"],
    ["LeBron James","@KingJames"]


];



app.post('/LEDon', function(req, res) {
        console.log('LEDon button pressed!');

    var v = verb.pick();
    var n = noun.pick();
    var adj = adjective.pick();
    var ns = nounSecond.pick();
    var co = color.pick();
    var ani = animal.pick();
    var sv = singVerb.pick();

    //Pick these three people from the same array, people
    var peObj = people.pick();
    var peTwoObj = people.pick();
    var receiveObj = people.pick();

    //If first person and second person are the same, pick a new one
    while ( peObj === peTwoObj)
    {
        peTwoObj = people.pick()
    }

    // If the two people objects are same as the receiver, pick a new receiver 
    while ((peObj === receiveObj) || (peTwoObj === receiveObj))
    {
        receiveObj = people.pick()
    }

    //pick the people from the two different arrays inside the people array
    var pe = peObj[0];
    var peTwo = peTwoObj[0];
    var receive = receiveObj[1];

    switch(Math.floor(Math.random()*6)) {
        case 0:
            var sentence = "Hey " + receive + "! The " + adj + " " + n + " " + v + " with my " + ns + ".";
            break;
        case 1:
            var sentence = "Hey " + receive + "! A " + adj + " " + ani + " ate " + pe + "'s' " + ns + ".";
            break;
        case 2:
            var sentence = "Hey " + receive + "! Why did " + pe + " and " + peTwo + " " + sv + " together?";
            break;
        case 3:
            var sentence = "Hey " + receive + "! Tomorrow I will " + sv + " with " + pe + ", " + peTwo + " and their " + ani + ".";
            break;
        case 4:
            var sentence = "Hey " + receive + "! I love " + pe + "'s " + adj + " " + n + ".";
            break;
        case 5:
            var sentence = "Hey " + receive + "! I think " + pe + " looks like a " + co + " " + ani + "." ;
            break;
       
    }
    //posts to our account
    Twitter.post('statuses/update', { status: sentence }, function (error, data, response){
        res.status(204).send();
        console.log(sentence);
    });
    // Run your LED toggling code here
});



app.listen(1337);
