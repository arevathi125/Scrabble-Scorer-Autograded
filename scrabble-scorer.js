// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
   	  }
	}
	return letterPoints;
 }

 //console.log(oldScrabbleScorer(initialPrompt()));

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

  function initialPrompt() {
   console.log("Let's play some scrabble! ");
  let userInput = input.question("Enter a word to score : ");
     let result = scrabbleScorer(userInput);
     console.log(result);
   // return userInput;
};

//console.log(initialPrompt());

   function simpleScorer(word){
      word = word.toUpperCase();
      let score = 0;
   
      for(item in word){
        score++;
      }
         return score;
      }
        
   //  console.log(simpleScorer(userInput));
 
   let vowelBonusScorer = function(word){
            let score = 0;
      const vowels = ['a','e','i','o','u'];
      word = word.split('');
     // word = word.toUpperCase();
           for(item in word)  {  
            if (vowels.includes(word[item])){
              score += 3;
           }
          else {
             score += 1;
           }
          }      
        return score;
      };

    //console.log(vowelBonusScorer(userInput));

     //let scrabbleScorer = oldScrabbleScorer(userInput);
    //console.log(scrabbleScorer);

    let newPointStructure = transform(oldPointStructure);
    //console.log(typeof Number(newPointStructure['a']));
    
    //Bonus Part
   //  newPointStructure['']=0;
   //  console.log(newPointStructure);

    let scrabbleScorer = function(word){
      let letterPoints = 0;
      let newArray = word.split('');
      newArray.forEach(elem =>{
      letterPoints += Number(newPointStructure[elem]);
      })         
      return letterPoints;
    }

    let simpleScore = {
      name: "Simple Score",
      description : "Each letter is worth 1 point.",
      scorerFunction : simpleScorer
   };
   
   let vowelBonusScore = {
     name: "Bonus Vowels",
     description : "Vowels are 3 pts, consonants are 1 pt.",
     scorerFunction : vowelBonusScorer
   };
   
   let scrabbleScore = {
   name: "Scrabble",
   description : "The traditional scoring algorithm.",
   scorerFunction : scrabbleScorer
   };
   
     const scoringAlgorithms = [simpleScore, vowelBonusScore, scrabbleScore];

   //   console.log(scoringAlgorithms[0]["name"]);
   //   console.log(scoringAlgorithms[1].description);
   //   console.log(scoringAlgorithms[1].scoringFunction("Javascript"));

   // console.log(scoringAlgorithms[0].scorerFunction("Javascript"));
   // console.log(scoringAlgorithms[1].scorerFunction("Scrabble"));
   // console.log(scoringAlgorithms[2].scorerFunction("zox"));

function scorerPrompt() {
    console.log("Let's play some scrabble! ");
    let userInput = input.question("Enter a word to score : ");
    console.log('Which scoring algorithm would you like to use?\n\n0 - Simple : One point per character\n1 - Vowel Bonus : Vowels are worth 3 points\n2- Scrabble : Uses scrabble point system');
   
    //Bonus Part
    let inputNumber = Number(input.question("Enter 0, 1, or 2 : "));
    while(inputNumber > 2 || inputNumber < 0 || isNaN(inputNumber)){
       inputNumber = Number(input.question("Invalid input. Please Enter 0, 1, or 2 : "));
    }
    
    let value = scoringAlgorithms[inputNumber].scorerFunction(userInput);
    console.log(`Score for '${userInput}' : ${value} `);
   // return {
   //    word : userInput,
   //    algoNumber : inputNumber
   // }
}
    
function transform(oldStructure) {
      newStructure = { };
   for(item in oldStructure){
      newArray = oldStructure[item];
      for(let i = 0; i < newArray.length; i++){
          newStructure[newArray[i].toLowerCase()] = Number(item);
      }
   }
   return newStructure;
};

 
 //console.log(transform(oldPointStructure));
// console.log("Letters with score '4':", oldPointStructure['4']);
// console.log("3rd letter within the key '4' array:", oldPointStructure['4'][2]);

// let letters = oldPointStructure['8'];
// console.log("Letters with score '8':", letters);
// console.log("2nd letter within the key '8' array:", letters[1]);

//  console.log("Scrabble scoring values for");
//  console.log("letter a : ", newPointStructure.a);
//  console.log("letter j : ", newPointStructure.j);
//  console.log("letter z : ", newPointStructure["z"]);
 
function runProgram() {
   initialPrompt();
   scorerPrompt();
   //  let userInputObj = scorerPrompt();
   //  console.log(`Score for '${userInputObj.word}': ${scoringAlgorithms[userInputObj.algoNumber].scorerFunction(userInputObj.word)}`)
}

  // runProgram();

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
