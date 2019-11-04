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