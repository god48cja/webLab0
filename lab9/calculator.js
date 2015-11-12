"use strict"
window.onload = function () {
    var stack = [];
    var displayVal = "0";
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            var value = this.innerHTML;
			if(value == "AC"){
				displayVal = "0";
				stack=[];
			}
			else if(!isNaN(value)){
				if(displayVal==0 && value ==0){displayVal = "0";}
				else{
					if(displayVal == 0 || isNaN(displayVal)){
						displayVal="";
					}
					displayVal += value;
				}
			}
			else if(value=="."){
				if(displayVal.indexOf(".")== -1){
						displayVal += value;
				}
				else{
					return false;
				}
			}

			else{
				displayVal = value;
				stack.push(displayVal);
			}

			document.getElementById('result').innerHTML = displayVal;
			
			document.getElementById('expression').innerHTML = stack;
        };
    }
};
function factorial (x) {

}
function highPriorityCalculator(s, val) {

}
function calculator(s) {
    var result = 0;
    var operator = "+";
    for (var i=0; i< s.length; i++) {
        
    }
    return result;
}
