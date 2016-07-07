$(function() {

    // The taskHtml method takes in a JavaScript representation
    // of the task and produces an HTML representation using
    // <li> tags
    function taskHtml(task) {
      var checkedStatus = task.done ? "checked" : "";
      var liClass = task.done? "completed" : "";
      var liElement = '<li id="listItem-' + task.id + '" class="' + liClass + '">' + '<div class="view"><input class="toggle" type="checkbox"' +
        " data-id='" + task.id + "'" + checkedStatus +
        '><label>' + task.title + '</label></div></li>';

      return liElement;
    }

    // toggleTask takes in an HTML representation of the
    // an event that fires from an HTML representation of
    // the toggle checkbox and  performs an API request to toggle
    // the value of the `done` field
    function toggleTask(e) {
      var itemID = $(e.target).data("id");

      var doneValue = Boolean($(e.target).is(':checked'));

      $.post("/tasks/" + itemID, {
        _method: "PUT",
        task: {
          done: doneValue
        }
      }).success(function(data) {
        var liHtml = taskHtml(data);
        var $li = $("#listItem-" + data.id);
        $li.replaceWith(liHtml);
        $(".toggle").change(toggleTask);
      });
    }

    $.get("/tasks").success( function( data ) {
      var htmlString = "";

      $.each(data, (function( index, task ) {

        htmlString += taskHtml( task );
      }));

      var ulTodos = $(".todo-list");
      ulTodos.html(htmlString);

      $(".toggle").change(toggleTask);

    });

    // submits the new todo into the database
    $('#new-form').submit(function(event) {
      event.preventDefault();
      // INCORRECT WAY
      // var textbox = $('.new-todo');
      //   if (textbox.val() !== '') {
      //     var payload = {
      //     task: {
      //       title: textbox.val()
      //     }
      //   };
      // };
      $.post("/tasks", $('#new-form').serialize()).success(function( data ) {
        var htmlString = taskHtml(data);
        var ulTodos = $(".todo-list");
        ulTodos.append(htmlString);
        $(".toggle").click(toggleTask);
        $(".new-todo").val('');
      })

      .fail(function( data ) {
        var emptyTodo = "Todo has to be at least 3 characters";
        var placeHolder = $("#new-form input").attr("placeholder", emptyTodo);

        placeHolder.toggleClass("empty-todo-error");

        setTimeout(function() {
          placeHolder.toggleClass("empty-todo-error");
          placeHolder = placeHolder.attr("placeholder", "Add a new todo...");
        }, 3000);

      });
    });

  });