// import { getFirestore, doc, deleteDoc } from "firebase/firestore";
function getItems() {
  db.collection("todo-items").onSnapshot((snapshot) => {
    let items = [];
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    generateItems(items);
  });
}

function generateItems(items) {
  let todoItems = [];
  items.forEach((item) => {
    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    let checkContainer = document.createElement("div");
    checkContainer.classList.add("check");

    let checkMark = document.createElement("div");
    let deleteBox = document.createElement("div");
    deleteBox.classList.add("delete");
    deleteBox.innerHTML = "Delete";
    deleteBox.addEventListener("click", function () {
      deleteItem(item.id);
    });

    checkMark.classList.add("check-mark");
    checkMark.innerHTML = '<img src="assets/icon-check.svg">';
    checkMark.addEventListener("click", function () {
      markCompleted(item.id);
    });

    checkContainer.appendChild(checkMark);

    let todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    todoText.innerText = item.text;

    // Create a new div for displaying the date
    let dateElement = document.createElement("div");
    dateElement.classList.add("todo-date");
    let date = new Date(item.date);
    dateElement.innerText = formatDate(date);

    if (item.status == "completed") {
      checkMark.classList.add("checked");
      todoText.classList.add("checked");
    }

    todoItem.appendChild(checkContainer);
    todoItem.appendChild(todoText);
    todoItem.appendChild(dateElement);
    todoItem.appendChild(deleteBox);

    todoItems.push(todoItem);
  });
  document.querySelector(".todo-items").replaceChildren(...todoItems);
}

function formatDate(date) {
  // Format the date as desired (e.g., "YYYY-MM-DD HH:mm")
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function addItem(event) {
  event.preventDefault();
  let text = document.getElementById("todo-input");
  let newItem = db.collection("todo-items").add({
    text: text.value,
    status: "active",
    date: new Date().toISOString(),
  });
  text.value = "";

  // Display a notification when a new task is added
  showNotification("Task Added", "New task has been added successfully!");
}

function showNotification(title, message) {
  // ... (your existing notification code) ...
}

function markCompleted(id) {
  // ... (your existing markCompleted function) ...
  let item = db.collection("todo-items").doc(id);
  item.get().then(function (doc) {
    if (doc.exists) {
      if (doc.data().status == "active") {
        item.update({
          status: "completed",
        });
      } else {
        item.update({
          status: "active",
        });
      }
    }
  });
}

function deleteItem(id) {
  // ... (your existing deleteItem function) ...
  db.collection("todo-items")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
}

// Call the getItems function to load tasks on page load
getItems();
