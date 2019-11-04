var baconianSubstitution = [
	{'letter':'a', 'code':'aaaaa'},
	{'letter':'b', 'code':'aaaab'},
	{'letter':'c', 'code':'aaaba'},
	{'letter':'d', 'code':'aaabb'},
	{'letter':'e', 'code':'aabaa'},
	{'letter':'f', 'code':'aabab'},
	{'letter':'g', 'code':'aabba'},
	{'letter':'h', 'code':'aabbb'},
	{'letter':'i', 'code':'abaaa'},
	{'letter':'j', 'code':'abaaa'},
	{'letter':'k', 'code':'abaab'},
	{'letter':'l', 'code':'ababa'},
	{'letter':'m', 'code':'ababb'},
	{'letter':'n', 'code':'abbaa'},
	{'letter':'o', 'code':'abbab'},
	{'letter':'p', 'code':'abbba'},
	{'letter':'q', 'code':'abbbb'},
	{'letter':'r', 'code':'baaaa'},
	{'letter':'s', 'code':'baaab'},
	{'letter':'t', 'code':'baaba'},
	{'letter':'u', 'code':'baabb'},
	{'letter':'v', 'code':'baabb'},
	{'letter':'w', 'code':'babaa'},
	{'letter':'x', 'code':'babab'},
	{'letter':'y', 'code':'babba'},
	{'letter':'z', 'code':'babbb'},
	{'letter':' ', 'code':' '}
]

$('#baconianCipherOutput').html('Result: ');

var baconianAlphabet = 'abcdefghijklmnopqrstuvwxyz';

function baconianCipher() {
	var baconianCase = 0;
	var baconianInput = ($('#baconianString').val()).toLowerCase();
	var baconianOutput = '';

	while (baconianCase < baconianInput.length) {
		var baconianToBeReplacedTemp = ('/'+baconianInput[baconianCase]+'/g');
		var baconianTempIndex = baconianSubstitution.findIndex(obj => obj.letter == baconianInput[baconianCase]);
		var baconianReplacementStringTemp = baconianSubstitution[baconianTempIndex].code;
		baconianCase = baconianCase + 1;
		baconianOutput += baconianSubstitution[baconianTempIndex].code + ' ';
		$('#baconianCipherOutput').html('Result: ' + baconianOutput);
	}
	
}

$(document).ready(function() {
  $('#baconianString').keypress(function(){
    setTimeout(function(){ baconianCipher(); },20);
  });
  $('#baconianString').blur(function(){
    baconianCipher();
  });
  $('#baconianString').change(function(){
    setTimeout(baconianCipher(),20);
  });
  
});
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var fullAlphabet = alphabet + alphabet + alphabet;
$('#caesarShiftFinal').html("Result: ");
function runCipher(){
  var cipherText = $('#caesarShiftString').val();
  var cipherOffset = $('#caesarShiftMag').val();
  cipherOffset = (cipherOffset % alphabet.length);
  var cipherFinish = '';

  for(i=0; i<cipherText.length; i++){
     var letter = cipherText[i];
     var upper = (letter == letter.toUpperCase());
     letter = letter.toLowerCase();
    
     var index = alphabet.indexOf(letter);
     if(index == -1){
       cipherFinish += letter;
     } else {
       index = ((index + cipherOffset) + alphabet.length);
       var nextLetter = fullAlphabet[index];
       if(upper) nextLetter = nextLetter.toUpperCase();
       cipherFinish += nextLetter;
     }
  }
    
  $('#caesarShiftFinal').html("Result: " + cipherFinish);
}

$(document).ready(function() {
  $('#caesarShiftString').keypress(function(){
    setTimeout(function(){ runCipher(); },20);
  });
  $('#caesarShiftString').blur(function(){
    runCipher();
  });
  $('#caesarShiftMag').change(function(){
    setTimeout(runCipher(),20);
  });
  
});
class Playfair {
  setKey(key) {
    if (key) {
      // create grid from key
      const alphabet = ['abcdefghiklmnopqrstuvwxyz'];
      const sanitizedKey = key.toLowerCase().replace('j', 'i').replace(/[^a-z]/g, '');
      const keyGrid = [...new Set(`${sanitizedKey}${alphabet}`)];
      this.grid = [];
      for (let i = 0; i < keyGrid.length; i += 5) {
        this.grid.push(keyGrid.slice(i, i + 5));
      }
    } else {
      this.grid = [
        ['a', 'b', 'c', 'd', 'e'],
        ['f', 'g', 'h', 'i', 'k'],
        ['l', 'm', 'n', 'o', 'p'],
        ['q', 'r', 's', 't', 'u'],
        ['v', 'w', 'x', 'y', 'z']
      ];
    }
  }
  preProcess({ input, decrypt }) {
    // split into duples, fixing double-letters (hello => he lx lo) and padding
    const text = input.toLowerCase().replace(/[^a-z]/g, '').replace(/j/g, 'i').split('').filter(x => x !== ' ');
    const duples = [];
    for (let i = 0; i < text.length; i += 2) {
      const currentDuple = text.slice(i, i + 2);
      if (!decrypt && currentDuple.length !== 2) {
        currentDuple.push('x');
        duples.push(currentDuple);
      } else if (!decrypt && currentDuple[0] === currentDuple[1]) {
        text.splice(i + 1, 0, 'x');
        duples.push(text.slice(i, i + 2));
      } else {
        duples.push(currentDuple);
      }
    }

    // find row and column for each letter in duple
    const coordinates = [];
    duples.forEach((duple) => {
      coordinates.push(duple.map((letter) => {
        let col;
        const row = this.grid.findIndex(row => {
          const rowIdx = row.findIndex(x => x === letter);
          if (rowIdx >= 0) {
            col = rowIdx;
            return true;
          }
          return false;
        });
        return [row, col];
      }));
    });

    return coordinates;
  }
  process({ input, decrypt }) {
    if (!this.grid) return 'First set the key!';
    if (input && decrypt && input.length % 2 !== 0) return 'Invalid ciphertext';
    const coordinates = this.preProcess({ input, decrypt });

    // set modifiers to respond appropriately based on decrypt switch
    const modifier = decrypt ? -1 : 1;
    const wall = decrypt ? 0 : 4;
    const phase = decrypt ? 4 : -4;

    const processedLocs = [];
    coordinates.forEach((loc) => {
      // loc: [ [ firstLetterR, firstLetterC ], [ secondLetterR, secondLetterC ] ]
      // modified: [ [ newFirstLetterR, newFirstLetterC ], [ newSecondLetterR, newSecondLetter R ] ]

      let modifiedLoc = [];

      // handle letters on the same row
      if (loc[0][0] === loc[1][0]) {
        // increment/decrement the column
        modifiedLoc[0] = loc[0][1] === wall ? [loc[0][0], wall + phase] : [loc[0][0], loc[0][1] + modifier];
        modifiedLoc[1] = loc[1][1] === wall ? [loc[1][0], wall + phase] : [loc[1][0], loc[1][1] + modifier];
        return processedLocs.push(modifiedLoc);
      }

      // handle letters in the same column
      if (loc[0][1] === loc[1][1]) {
        // increment/decrement the row
        modifiedLoc[0] = loc[0][0] === wall ? [wall + phase, loc[0][1]] : [loc[0][0] + modifier, loc[0][1]];
        modifiedLoc[1] = loc[1][0] === wall ? [wall + phase, loc[1][1]] : [loc[1][0] + modifier, loc[1][1]];
        return processedLocs.push(modifiedLoc);
      }

      // handle different rows, different columns
      modifiedLoc[0] = [loc[0][0], loc[1][1]];
      modifiedLoc[1] = [loc[1][0], loc[0][1]];
      processedLocs.push(modifiedLoc);
    });

    // translate coordinates into ciphertext
    const processedText = processedLocs
      .map((loc) => [this.grid[loc[0][0]][loc[0][1]], this.grid[loc[1][0]][loc[1][1]]].join(''))
      .join('');

    return processedText.toUpperCase();
  }
}

function playfairEncrypt() {
  const pf = new Playfair();
  var playfairKeyTemp = $('#playfairKeySqaureInput').val();
  pf.setKey(playfairKeyTemp);
  var playfairEncryptInputText = $('#playfairEncryptInput').val();
  var playfairEncryptedText = pf.process({ input: playfairEncryptInputText });
  $('#playfairEncryptedOutput').html("Encrypted text: "+playfairEncryptedText);
}

function playfairDecrypt() {
  const pf = new Playfair();
  var playfairKeyTemp = $('#playfairKeySqaureInput').val();
  pf.setKey(playfairKeyTemp);
  var playfairDecryptInputText = $('#playfairDecryptInput').val();
  var playfairDecryptedText = pf.process({ input: playfairDecryptInputText, decrypt: true });
  $('#playfairDecryptedOutput').html("Decrypted text: "+ playfairDecryptedText);
}

$(document).ready(function() {
  $('#playfairKeySqaureInput').keypress(function(){
    setTimeout(function(){
      playfairEncrypt();
    }, 20);
  });
  $('#playfairKeySqaureInput').blur(function(){
    playfairEncrypt();
  });
  $('#playfairKeySqaureInput').change(function(){
    setTimeout(playfairEncrypt(),20);
  });

  $('#playfairKeySqaureInput').keypress(function(){
    setTimeout(function(){
      playfairDecrypt();
    }, 20);
  });
  $('#playfairKeySqaureInput').blur(function(){
    playfairDecrypt();
  });
  $('#playfairKeySqaureInput').change(function(){
    setTimeout(playfairDecrypt(),20);
  });
  
});

$(document).ready(function() {
  $('#playfairEncryptInput').keypress(function(){
    setTimeout(function(){
      playfairEncrypt();
    }, 20);
  });
  $('#playfairEncryptInput').blur(function(){
    playfairEncrypt();
  });
  $('#playfairEncryptInput').change(function(){
    setTimeout(playfairEncrypt(),20);
  });  
});

$(document).ready(function() {
  $('#playfairDecryptInput').keypress(function(){
    setTimeout(function(){
      playfairDecrypt();
    }, 20);
  });
  $('#playfairDecryptInput').blur(function(){
    playfairDecrypt();
  });
  $('#playfairDecryptInput').change(function(){
    setTimeout(playfairDecrypt(),20);
  });  
});