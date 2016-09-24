function new_item_function() {

	var item = document.getElementById("todo-item-input").value;
	var list_item = document.createElement("li");
	var node = document.createTextNode(" " +item);
    document.getElementById('todo-item-input').value = ""

    var btn = document.createElement("button");        
	var t = document.createTextNode("Completed");      
	btn.appendChild(t);  
	var att_id = document.createAttribute("id");       
	att_id.value = "button1"; 
	btn.setAttributeNode(att_id);  

	var att_click = document.createAttribute("onclick");       
	att_click.value = "button1_click()"; 
	btn.setAttributeNode(att_click);  
	
	list_item.appendChild(btn);
	list_item.appendChild(node);
    // document.getElementById("list_todo").appendChild(list_item);
    document.getElementById("list_todo").insertBefore(list_item,document.getElementById("list_todo").childNodes[0]);
	
}

function button1_click(){
	var q = $(this).getAttribute("onclick").value;
	alert(q);
	var x = document.this.parentElement();
	alert("clicked");
	document.getElementById('list_todo').removeChild(x);
    
}