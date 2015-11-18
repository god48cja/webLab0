'use strict';
var interval = 3000;
var numberOfBlocks = 9;
var numberOfTarget = 3;
var targetBlocks = [];
var selectedBlocks = [];
var timer;

document.observe('dom:loaded', function(){
	$("start").onclick = stopToStart;
	$("stop").onclick = stopGame;
});

function stopToStart(){
    stopGame();
    startToSetTarget();
}

function stopGame(){
	$("state").update("Stop");
	$("answer").update("0/0");
	timer = 0;
	targetBlocks = [];
	selectedBlocks =[];
	
	var block =$$(".block");
	for(var i=0; i < numberOfBlocks; i++){
		block[i].addClassName("normal");
	}
}

function startToSetTarget(){
	$("state").update("Ready!");
	timer = 0;
	targetBlocks = [];
	selectedBlocks =[];
	
	
	for(var i=0;i<3;i++){
		var r = Math.floor(Math.random()*10);
		while(r ==9 || targetBlocks.indexOf(r) != -1){
			r = Math.floor(Math.random()*10);
		}
		targetBlocks[i] = r;
	}
	
	timer = setTimeout(setTargetToShow,interval);
}

function setTargetToShow(){
	$("state").update("Memorize!");
	
	var block =$$(".block");
	for(var i=0; i < numberOfTarget; i++){
		block[targetBlocks[i]].addClassName("target");
	}
	
	timer = setTimeout(showToSelect,interval);
}

function showToSelect(){
	$("state").update("Select!");
	
	var block = $$(".block");
	for(var i=0; i < numberOfTarget; i++){
		block[targetBlocks[i]].removeClassName("target");
	}
	
	for(var i=0; i<numberOfBlocks; i++){
		block[i].observe("click",function(event){
			this.addClassName("selected");
			selectedBlocks.push(this.getAttribute("data-index"));
		});
	}
	
	timer = setTimeout(selectToResult,interval);
	
}

function selectToResult(){
	$("state").update("Checking");
	
	var correct = 0;
	var block = $$(".block");
	for(var i=0; i < selectedBlocks.length; i++){
		block[selectedBlocks[i]].removeClassName("seleced");
	}
	
	for(var i=0;i<numberOfBlocks;i++){
		block[i].stopObserving("click");
	}
	for(var i=0;i<numberOfTarget;i++){
		for(var j=0;j<numberOfTarget;j++){
			if(targetBlocks[i] == selectedBlocks[j]){
				correct++;
			}
		}
	}
	$("answer").update(correct + "/"+ )
	timer = setTimeout(startToSetTarget,interval);
}
