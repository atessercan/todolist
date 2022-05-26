refresh();
var textArea;
var text;

// getting tasks from local storage
function getTasks() {
  let ul = document.querySelector("#list");
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let li = document.createElement("li");
    li.innerHTML = localStorage.getItem(key);
    ul.appendChild(li);
  }
  refresh();
}

// creating new tasks
function newElement() {
  // take value of input area
  textArea = document.querySelector("#task");
  let ul = document.querySelector("#list");
  text = textArea.value;
  if (text != "") {
    // create new list item
    let li = document.createElement("li");
    // add x symbol as delete button to li and task name, text
    li.innerHTML =
      text +
      '<button type="button" class="close mt-1 mr-2 p-2" aria-label="Close"><span aria-hidden="true">&times;</span></button>';

    // append list item to the unordered list
    ul.appendChild(li);
    // adding LocalStorage
    addtoLocalStorage(li, text);
    // show task adding message
    showMsg("added");
    // reset text area
    document.querySelector("#form").reset();
    document.querySelector("#emptylist").classList.remove("d-inline");
    document.querySelector("#emptylist").classList.add("d-none");
  } else {
    showMsg("empty");
  }

  refresh();
}

function refresh() {
  //  refresh list of items and add eventlistener on them
  const listItems = document.querySelectorAll("li");
  listItems.forEach((element) => {
    element.addEventListener("click", taskDone);
  });
  //  deleteButtons and add EventListener on them
  const deleteButtons = document.querySelectorAll(".close");
  deleteButtons.forEach((element) => {
    element.addEventListener("click", taskDelete);
  });
}
var toggle = 0;
function taskDone() {
  if (toggle % 2 == 0) {
    this.setAttribute(
      "style",
      "text-decoration: line-through; font-style: italic;"
    );
    toggle++;
  } else {
    this.setAttribute("style", "text-decoration: none; font-style: normal;");
    toggle++;
  }
}
function taskDelete() {
  let key = this.parentElement.innerText.slice("0", "-2");
  this.parentElement.remove();
  removefromLocalStorage(key);
  showMsg("deleted");
  refresh();
}

function showMsg(msg) {
  const container = document.querySelector("#showmsg");
  const message = document.querySelector("#message");
  switch (msg) {
    case "empty": {
      msg = "Görev adı boş olamaz!";
      break;
    }
    case "added": {
      msg = "Yeni görev eklendi!";
      break;
    }
    case "deleted": {
      msg = "Görev silindi!";
      break;
    }
    default: {
      msg = "Bilinmeyen aktivite!";
    }
  }
  container.classList.add("d-block");
  message.innerHTML = msg;
  setTimeout(() => {
    container.classList.remove("d-block");
  }, 3000);
}

function addtoLocalStorage(li, text) {
  localStorage.setItem(text, li.innerHTML);
}

function removefromLocalStorage(param) {
  localStorage.removeItem(param);
}
