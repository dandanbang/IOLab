function add_item() {
    // get input content
    text = document.getElementsByTagName('input')[0].value;
    // if ( $.trim(text).length == 0) {
    //     alert("You must enter some text");
    //     return;
    // }
    var button = document.createElement("button");
    button.setAttribute("id", "todos");
    button.setAttribute("onclick", "move(this)");
    var t = document.createTextNode("completed")
    button.appendChild(t);
    var text_list = document.createElement("li");
    var tt = document.createTextNode(text);
    text_list.appendChild(tt);
    text_list.appendChild(button);
    var ul = document.getElementsByTagName('ul')[0];
    ul.insertBefore(text_list, ul.childNodes[0]);
    document.getElementsByTagName('input')[0].value = "";
}

function move(element) {
    var list = element.parentElement;
    list.getElementsByTagName('button')[0].innerHTML = "To-Do";
    list.getElementsByTagName('button')[0].setAttribute("onclick", "move_back(this)");
    var ul = document.getElementsByTagName('ul')[1];
    ul.insertBefore(list, ul.childNodes[0]);
}

function move_back(element) {
    var list = element.parentElement;
    list.getElementsByTagName('button')[0].innerHTML = "Completed";
    list.getElementsByTagName('button')[0].setAttribute("onclick", "move(this)");
    var ul = document.getElementsByTagName('ul')[0];
    ul.insertBefore(list, ul.childNodes[0]);
}
