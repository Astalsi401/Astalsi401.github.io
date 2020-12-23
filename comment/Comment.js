window.onload = function(){
	var oMessageBox = document.getElementById("messageBox");
	var oInput = document.getElementById("myInput");
	var oPostBtn = document.getElementById("doPost");
		
	oPostBtn.onclick = function(){
		if(oInput.value){
			//寫入發表留言的時間
			var oTime = document.createElement("div");
			oTime.className = "time";
			var myDate = new  Date();
			oTime.innerHTML = myDate.toLocaleString();
			oMessageBox.appendChild(oTime);
			
			//寫入留言內容
			var oMessageContent = document.createElement("div");
			oMessageContent.className = "message_content";
			oMessageContent.innerHTML = oInput.value;
			oInput.value = "";
			oMessageBox.appendChild(oMessageContent);
		}
	}
}