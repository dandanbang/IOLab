$(document).ready(function(){

  var count = 0;

  $("#new-item").on('click', function() {
      // once the document loads, create new item with this function
      var item = document.getElementsByTagName('input')[0].value;
      console.log("added "+ item);
      count+=1;
      //adding list item to list
      var listItem = document.createElement("li");
      listItem.setAttribute("id", "item"+count);
      var text = document.createTextNode(item);
      listItem.appendChild(text);
      var list = document.getElementById('todoList');


      //adding button to list
      var itemButton = document.createElement("button");
      //itemButton.setAttribute("id", "item"+count);
      text = document.createTextNode("Done");
      itemButton.appendChild(text);
      listItem.appendChild(itemButton);
      $(list).prepend(listItem);

  });

  $("#list_todo").on('click', "button", function() {
          // move from list_todo container to list_completed container
          //remove item from todo list
          var id = this.closest("li").id;
          console.log("removing "+id);
          var item = document.getElementById(id);
          $("#"+id).remove();
          $(this).text("Not Done")
          //add item to completed list
          var list = document.getElementById('completedList');
          $(list).prepend(item);

  });

  $("#list_completed").on('click', "button", function() {
          // move back from list_completed container to list_todo container
          //remove item from completed list
          var id = this.closest("li").id;
          console.log("removing "+id);
          var item = document.getElementById(id);
          $("#"+id).remove();
          $(this).text("Done")
          //add item to todo list
          var list = document.getElementById('todoList');
          $(list).prepend(item);
  });

});
