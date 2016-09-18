$(document).ready(function(){

  var count = 0;

  $("#new-item").on('click', function() {
      // once the document loads, create new item with this function
      var item = document.getElementsByTagName('input')[0].value;
      console.log("added "+ item);

      //increment count for unique id
      count+=1;

      var listItem = document.createElement("li");
      listItem.setAttribute("id", "item"+count);
      listItem.setAttribute("class","collection-item");

      //adding button to list item
      var itemButton = document.createElement("button");
      itemButton.setAttribute("class", "btn-flat waves-effect waves-light amber");
      text = document.createTextNode("Done");
      itemButton.appendChild(text);
      listItem.appendChild(itemButton);


      //adding the text to the list item
      var text = document.createTextNode("  "+item);
      listItem.appendChild(text);
      var list = document.getElementById('todoList');

      //adding item to list
      $(list).prepend(listItem);

  });

  $("#list_todo").on('click', "button", function() {
          // move from list_todo container to list_completed container
          //remove item from todo list
          var id = this.closest("li").id;
          console.log("removing "+id);
          var item = document.getElementById(id);
          $("#"+id).remove();

          //change values
          $(this).text("Not Done");
          this.setAttribute("class", "btn-flat waves-effect waves-light green lighten-3")

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

          //change values
          $(this).text("Done")
          this.setAttribute("class", "btn-flat waves-effect waves-light amber")

          //add item to todo list
          var list = document.getElementById('todoList');
          $(list).prepend(item);
  });

});
