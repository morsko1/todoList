var todo = (function () {
	function Todo (name, done) {
		this.name = name,
		this.done = done
	}
	var input = document.getElementById("input"),
		del = document.getElementById("del"),
		done = document.getElementById("done"),
		listOuter = document.getElementById("list-outer"),
		todos = [],
		doneItemsArr = [],
		prevent = function () {
			document.forms[0].addEventListener("submit", function (event) {
				event.preventDefault();
				return false;
			});
		},
		showItems = function (todos) {
			function markItem (event) {
				var target = event.target;
				if (target.id === 'list') return;
				if (event.which === 1) {
					target.classList.toggle("item-marked");
				}
			} //end markItem
			if (todos.length>0) {
				listOuter.innerHTML = "";
				var listTodos = document.createElement("div");
				listTodos.id = "list";
				listTodos.classList.add("list");
				for (var i = 0; i < todos.length; i++) {
					var item = todos[i];
					var itemDiv = document.createElement("div");
					itemDiv.classList.add("item");
					itemDiv.innerHTML = item.name;
					if (item.done === true) {
						itemDiv.classList.add("item-done");
					}
					itemDiv.dataset.count = i;
					listTodos.appendChild(itemDiv);
					listTodos.addEventListener("click", markItem);
				} //end for
				listOuter.appendChild(listTodos);
			} //end if
			else {
				listOuter.innerHTML = "";
			}
		}, //end showItems
		addItem = function () {
			if (input.value) {
				todos.push(new Todo(input.value, false));
				input.value = "";
				input.focus();
			}
			showItems(todos);
		},
		doneItems = function () {
			var marked = document.querySelectorAll(".item-marked");
			console.log(marked);
			for (var i = marked.length-1; i>=0; i--) {
				var item = marked[i];
				var num = item.dataset.count;
				num = parseInt(num);
				if (todos[num].done === false) {
					todos[num].done = true;
				}
				else {
					todos[num].done = false
				}
			}
			showItems(todos);
		},
		delItems = function () {
			var marked = document.querySelectorAll(".item-marked");
			console.log(marked);
			for (var i = marked.length-1; i>=0; i--) {
				var item = marked[i];
				var num = item.dataset.count;
				num = parseInt(num);
				todos.splice(num, 1);
			}
			console.log(todos);
			showItems(todos);
		},
		addListeners = function () {
			prevent();
			document.forms[0].addEventListener("submit", addItem);
			done.addEventListener("click", doneItems);
			del.addEventListener("click", delItems);
			addEventListener("load", showItems(todos));
		},
		init = function () {
			addListeners();
		};
		return {
			init: init
		};
}());

todo.init();