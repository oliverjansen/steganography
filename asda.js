/ This contains some of the most fun I've had with JavaScript so far. Maybe because I didn't need to study any new concepts for once! The pleasure of doing things for kicks instead of learning, I suppose.

$(document).ready(function(){
  
  $("#topInput").on("submit", function() { 

    $("#topResults").text(
      textToBinary($("#topInputField").val())
    );
    return false; // This prevents the page from refreshing after form submit. Without it the answer just flickered and went away.
 

});
  
  $("#bottomInput").on("submit", function() {
    
    $("#bottomResults").text(binaryToText($("#bottomInputField").val())
    );
    return false;
  });
  
});


// Convert the binary string entered into text:

function binaryToText(binaryString) {
  var byteArray = binaryString.split(" "); // We want to fiddle with each individual byte. Arrays are nice for that.
  var decimalArray = []; // We'll be adding the decimal value of each byte to this.
  
  for (i = 0; i < byteArray.length; i++) { // Iterate through all the bytes. 
    var decimalValue = 0; // Depending on a bit's position in the current byte, add an appropriate amount to a counter.
    if (byteArray[i][0] == 1) {
      decimalValue += 128; // These values can be found in a table like this: http://library.automationdirect.com/wp-content/uploads/2013/09/Table-2-Binary-Decimal.jpg
    }
    if (byteArray[i][1] == 1) {
      decimalValue += 64; // Computer binary stops at eight positions, so half of that table isn't relevant. Has something to do with powers of 2 (binary is base 2). Mathy stuff. 
    }
    if (byteArray[i][2] == 1) {
      decimalValue += 32;
    }
    if (byteArray[i][3] == 1) {
      decimalValue += 16;
    }
    if (byteArray[i][4] == 1) {
      decimalValue += 8;
    }
    if (byteArray[i][5] == 1) {
      decimalValue += 4;
    }
    if (byteArray[i][6] == 1) {
      decimalValue += 2;
    }
    if (byteArray[i][7] == 1) {
      decimalValue += 1;
    }
    decimalArray.push(decimalValue); // After these eight if statements, we have a number we can push to an empty array. Repeat for all of the bytes in your big string of binary.
  }
  // We now have an array of decimal values.
  
  var characterArray = [];  // Every letter has a character code. "a" is 97, "b" is 98, and so on. Capital "A" is different from lower case "a": 41 vs 97.
  for (i = 0; i < decimalArray.length; i++) {
    characterArray.push(String.fromCharCode(decimalArray[i])); // For each of our decimal values, we can get an associated letter, punctuation mark, or even a blank space.                
  }
  // Now we have a big array of letters, punctuation, and spaces.
  
  var textString = characterArray.join(""); //Pop our big array of letters, punctuation, and spaces into one single string.
  return textString;
}


// Convert the text entered into a binary string:

function textToBinary(string) {

	var decimalArray = []; 
	for (i = 0; i < string.length; i++) {
		decimalArray.push(string.charCodeAt(i)); //Turning letters, punctuation, and spaces into their character codes.
	}

	var binaryArray = [];
	for (i = 0; i < decimalArray.length; i++) { 
		binaryArray.push([]); // We're nesting an array within binaryArray every time we build another byte, and we'll plop our bits into it.
		var currentNumber = decimalArray[i]; // First character code is up. We don't want to change that number itself, but rather start with its value.
		if (currentNumber >= 128) { // I used the technique in this video: https://www.youtube.com/watch?v=tfKe8PPI2zs . Math stuff. 
			binaryArray[i].push(1); // I wanted to replicate a by-hand method myself instead of looking up a calculator version.
			currentNumber -= 128;
		} else {
			binaryArray[i].push(0);
		}
		if (currentNumber >= 64) { // Basically, if the currentNumber can have these powers of 2 (binary is base 2) subtracted without going negative, do so and push a "1" bit into the byte we're building.
			binaryArray[i].push(1);
			currentNumber -= 64;
		} else {
			binaryArray[i].push(0); // If it's too small after the previous subtraction to have this power of 2 subtracted without going negative, push a "0" bit to the byte we're building.
		}
		if (currentNumber >= 32) { // It just kinda works out that way. Because of math I don't understand. Neat, eh?
			binaryArray[i].push(1);
			currentNumber -= 32;
		} else {
			binaryArray[i].push(0);
		}
		if (currentNumber >= 16) {
			binaryArray[i].push(1);
			currentNumber -= 16;
		} else {
			binaryArray[i].push(0);
		}
		if (currentNumber >= 8) {
			binaryArray[i].push(1);
			currentNumber -= 8;
		} else {
			binaryArray[i].push(0);
		}
		if (currentNumber >= 4) {
			binaryArray[i].push(1);
			currentNumber -= 4;
		} else {
			binaryArray[i].push(0);
		}
		if (currentNumber >= 2) {
			binaryArray[i].push(1);
			currentNumber -= 2;
		} else {
			binaryArray[i].push(0);
		}
		if (currentNumber >= 1) {
			binaryArray[i].push(1);
			currentNumber -= 1;
		} else {
			binaryArray[i].push(0);
		}
    
		binaryArray[i] = binaryArray[i].join("");	// binaryArray[i] is an array of the 8 bits we just produced, so this brings them together into a byte at the end of each loop.
	}
	
   var binaryString = binaryArray.join(" "); // And bringing the array of bytes into the nice neat string.
  return binaryString;// HHHHBLLLEEAAaahh...
}