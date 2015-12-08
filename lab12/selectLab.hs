"use strict";

document.observe("dom:loaded", function() {
	/* Make necessary elements Dragabble / Droppables 
	(Hint: use $$ function to get all images).
	 * All Droppables should call 'labSelect' function on 'onDrop' event. 
	 (Hint: set revert option appropriately!)
	 * 필요한 모든 element들을 Dragabble 혹은 Droppables로 만드시오 
	 (힌트 $$ 함수를 사용하여 모든 image들을 찾으시오).
	 * 모든 Droppables는 'onDrop' 이벤트 발생시 'labSelect' function을 부르도록 작성 하시오. 
	 (힌트: revert옵션을 적절히 지정하시오!)
	 */
	var labs = $$("#labs > img");
	for(var i=0;i<labs.length;i++){
		new Draggable(labs[i],{revert:true});
	}
	Droppables.add("selectpad",{onDrop:labSelect});
});

function labSelect(drag, drop, event) {
	/* Complete this event-handler function 
	 * 이 event-handler function을 작성하시오.
	 */
	//alert("You select!");
	
	var pad_item = $$("#selectpad > img");
	if(pad_item.length<3 && drag.parentNode.getAttribute("id") == "labs"){
		//이미지 생성
		var img = document.createElement("img");
		img.src = drag.getAttribute("src");
		img.alt = drag.getAttribute("alt");
		
		drag.parentNode.removeChild(drag);
		var item = document.getElementById("selectpad");
		item.appendChild(img);
		
		 new Draggable(img,{revert:true});
		 Droppables.add("labs",{onDrop:labSelect});	
		 
		 //리스트 생성
		 var list = document.createElement("Li");
		 var text = drag.getAttribute("alt");
		 var li_text = document.createTextNode(text);
		 list.appendChild(li_text);
		 
		 setTimeout(function(){
			var ol = document.getElementById("selection");
			ol.appendChild(list);
			list.pulsate({
				duration:1.0,
				pulses:2
			});
		 },500);
	}
	else{
		var img = document.createElement("img");
		img.src = drag.getAttribute("src");
		img.alt = drag.getAttribute("alt");
		
		drag.parentNode.removeChild(drag);
		var item = document.getElementById("labs");
		item.appendChild(img);
		
		new Draggable(img,{revert:true});
		Droppables.add("labs",{onDrop:labSelect});
	}	

}
