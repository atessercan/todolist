refresh();
/* creating new tasks */
function newElement() {
  // take value of input area
  textArea = document.querySelector("#task");
  const text = textArea.value;
  if (text != "") {
    // create new list item
    let li = document.createElement("li");
    // add x symbol as delete button to li and task name, text
    li.innerHTML =
      text +
      '<button type="button" class="close mt-1 mr-2 p-2" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    var ul = document.querySelector("#list");
    // append list item to the unordered list
    ul.appendChild(li);
    // show task adding message
    showMsg("added");
    // reset text area
    document.querySelector("#form").reset();
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

function taskDone() {
  this.setAttribute(
    "style",
    "text-decoration: line-through; font-style: italic;"
  );
}
function taskDelete() {
  this.parentElement.remove();
  showMsg("deleted");
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
