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