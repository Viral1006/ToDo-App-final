// function getItems() {
//   db.collection("todo-items").onSnapshot((snapshot) => {
//     let items = [];
//     snapshot.docs.forEach((doc) => {
//       items.push({
//         id: doc.id,
//         ...doc.data(),
//       });
//     });
//     generateItems(items);
//   });
// }

// function generateItems(items) {
//   let todoItems = [];
//   items.forEach((item) => {
//     let todoItem = document.createElement("div");
//     todoItem.classList.add("todo-item");

//     let checkContainer = document.createElement("div");
//     checkContainer.classList.add("check");

//     let checkMark = document.createElement("div");
//     let deleteBox = document.createElement("div");
//     deleteBox.classList.add("delete");
//     deleteBox.innerHTML = "Delete";
//     deleteBox.addEventListener("click", function () {
//       deleteItem(item.id);
//     });

//     checkMark.classList.add("check-mark");
//     checkMark.innerHTML = '<img src="assets/icon-check.svg">';
//     checkMark.addEventListener("click", function () {
//       markCompleted(item.id);
//     });

//     checkContainer.appendChild(checkMark);

//     let todoText = document.createElement("div");
//     todoText.classList.add("todo-text");
//     todoText.innerText = item.text;

//     // Create a new div for displaying the date
//     let dateElement = document.createElement("div");
//     dateElement.classList.add("todo-date");
//     let date = new Date(item.date);
//     dateElement.innerText = formatDate(date);

//     if (item.status == "completed") {
//       checkMark.classList.add("checked");
//       todoText.classList.add("checked");
//     }

//     todoItem.appendChild(checkContainer);
//     todoItem.appendChild(todoText);
//     todoItem.appendChild(dateElement);
//     todoItem.appendChild(deleteBox);

//     todoItems.push(todoItem);
//   });
//   document.querySelector(".todo-items").replaceChildren(...todoItems);
// }

// function formatDate(date) {
//   // Format the date as desired (e.g., "YYYY-MM-DD HH:mm")
//   let year = date.getFullYear();
//   let month = String(date.getMonth() + 1).padStart(2, "0");
//   let day = String(date.getDate()).padStart(2, "0");
//   let hours = String(date.getHours()).padStart(2, "0");
//   let minutes = String(date.getMinutes()).padStart(2, "0");
//   return `${year}-${month}-${day} ${hours}:${minutes}`;
// }

// function addItem(event) {
//   event.preventDefault();
//   let text = document.getElementById("todo-input");
//   let newItem = db.collection("todo-items").add({
//     text: text.value,
//     status: "active",
//     date: new Date().toISOString(),
//   });
//   text.value = "";

//   // Display a notification when a new task is added
//   showNotification("Task Added", "New task has been added successfully!");
// }

// function showNotification(title, message) {
//   // ... (your existing notification code) ...
// }

// function markCompleted(id) {
//   // ... (your existing markCompleted function) ...
//   let item = db.collection("todo-items").doc(id);
//   item.get().then(function (doc) {
//     if (doc.exists) {
//       if (doc.data().status == "active") {
//         item.update({
//           status: "completed",
//         });
//       } else {
//         item.update({
//           status: "active",
//         });
//       }
//     }
//   });
// }

// function deleteItem(id) {
//   db.collection("todo-items")
//       .doc(id)
//       .delete()
//       .then(() => {
//         console.log("Document successfully deleted!");
//       })
//       .catch((error) => {
//         console.error("Error removing document: ", error);
//       });
// }

// let currentEditId = null;

// function generateItems(items) {
//   let todoItems = [];
//   items.forEach((item) => {
//     let todoItem = document.createElement("div");
//     todoItem.classList.add("todo-item");

//     let checkContainer = document.createElement("div");
//     checkContainer.classList.add("check");

//     let checkMark = document.createElement("div");
//     checkMark.classList.add("check-mark");
//     checkMark.innerHTML = '<img src="assets/icon-check.svg">';
//     checkMark.addEventListener("click", function () {
//       markCompleted(item.id);
//     });

//     checkContainer.appendChild(checkMark);

//     let todoText = document.createElement("div");
//     todoText.classList.add("todo-text");
//     todoText.innerText = item.text;

//     let dateElement = document.createElement("div");
//     dateElement.classList.add("todo-date");
//     let date = new Date(item.date);
//     dateElement.innerText = formatDate(date);

//     let editButton = document.createElement("button");
//     editButton.classList.add("edit-btn");
//     editButton.innerText = "Edit";
//     editButton.addEventListener("click", function() {
//       openEditModal(item.id, item.text);
//     });

//     let deleteBox = document.createElement("div");
//     deleteBox.classList.add("delete");
//     deleteBox.innerHTML = "Delete";
//     deleteBox.addEventListener("click", function () {
//       deleteItem(item.id);
//     });

//     if (item.status == "completed") {
//       checkMark.classList.add("checked");
//       todoText.classList.add("checked");
//     }

//     todoItem.appendChild(checkContainer);
//     todoItem.appendChild(todoText);
//     todoItem.appendChild(dateElement);
//     todoItem.appendChild(editButton);
//     todoItem.appendChild(deleteBox);

//     todoItems.push(todoItem);
//   });
//   document.querySelector(".todo-items").replaceChildren(...todoItems);
// }

// function formatDate(date) {
//   const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//   return date.toLocaleDateString('en-US', options);
// }

// function openEditModal(id, text) {
//   currentEditId = id;
//   document.getElementById("editTaskInput").value = text;
//   document.getElementById("editModal").style.display = "block";
// }

// function updateTask() {
//   if (currentEditId) {
//     let newText = document.getElementById("editTaskInput").value;
//     db.collection("todo-items").doc(currentEditId).update({
//       text: newText
//     }).then(() => {
//       console.log("Document successfully updated!");
//       document.getElementById("editModal").style.display = "none";
//     }).catch((error) => {
//       console.error("Error updating document: ", error);
//     });
//   }
// }

// // Close modal when clicking on the close button or outside the modal
// window.onclick = function(event) {
//   let modal = document.getElementById("editModal");
//   if (event.target == modal || event.target.className == "close") {
//     modal.style.display = "none";
//   }
// }

// // Call the getItems function to load tasks on page load
// getItems();

// Initialize Firebase Auth
const auth = firebase.auth();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('todo-container').style.display = 'block';
    
    // Display user's name
    const userName = user.email.split('@')[0]; // This gets the part before @ in the email
    document.getElementById('user-name').textContent = `Welcome, ${userName}!`;
    
    getItems(); // Load todos for the logged-in user
  } else {
    // User is signed out
    document.getElementById('auth-container').style.display = 'block';
    document.getElementById('todo-container').style.display = 'none';
    
    // Clear user name when logged out
    document.getElementById('user-name').textContent = '';
  }
});

function logout() {
  firebase.auth().signOut().then(() => {
    console.log('User signed out successfully');
    // The onAuthStateChanged listener will handle UI updates
  }).catch((error) => {
    console.error('Error signing out:', error);
  });
}

function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("User logged in:", user);
    })
    .catch((error) => {
      console.error("Login error:", error);
      alert("Login failed: " + error.message);
    });
}

function signup() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log("User signed up:", user);
    })
    .catch((error) => {
      console.error("Signup error:", error);
      alert("Signup failed: " + error.message);
    });
}

function logout() {
  auth.signOut().then(() => {
    console.log("User signed out");
  }).catch((error) => {
    console.error("Logout error:", error);
  });
}

function toggleForms() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  if (loginForm.style.display === 'none') {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
  } else {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  }
}


let currentEditId = null;

// function getItems() {
//   db.collection("todo-items").onSnapshot((snapshot) => {
//     let items = [];
//     snapshot.docs.forEach((doc) => {
//       items.push({
//         id: doc.id,
//         ...doc.data()
//       });
//     });
//     generateItems(items);
//   });
// }

function getItems() {
  const user = firebase.auth().currentUser;
  if (user) {
    db.collection("users").doc(user.uid).collection("todo-items").onSnapshot((snapshot) => {
      let items = [];
      snapshot.docs.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data()
        });
      });
      generateItems(items);
    });
  }
}

function generateItems(items) {
  let todoItems = [];
  items.forEach((item) => {
    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    let checkContainer = document.createElement("div");
    checkContainer.classList.add("check");

    let checkMark = document.createElement("div");
    checkMark.classList.add("check-mark");
    checkMark.innerHTML = '<img src="assets/icon-check.svg">';
    checkMark.addEventListener("click", function () {
      markCompleted(item.id);
    });

    checkContainer.appendChild(checkMark);

    let todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    todoText.innerText = item.text;

    let dateElement = document.createElement("div");
    dateElement.classList.add("todo-date");
    let date = new Date(item.date);
    dateElement.innerText = formatDate(date);

    let editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", function() {
      openEditModal(item.id, item.text);
    });

    let deleteBox = document.createElement("div");
    deleteBox.classList.add("delete");
    deleteBox.innerHTML = "Delete";
    deleteBox.addEventListener("click", function () {
      deleteItem(item.id);
    });

    if (item.status == "completed") {
      checkMark.classList.add("checked");
      todoText.classList.add("checked");
    }

    todoItem.appendChild(checkContainer);
    todoItem.appendChild(todoText);
    todoItem.appendChild(dateElement);
    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteBox);

    todoItems.push(todoItem);
  });
  document.querySelector(".todo-items").replaceChildren(...todoItems);
}

// function addItem(event) {
//   event.preventDefault();
//   let text = document.getElementById("todo-input");
//   let newItem = db.collection("todo-items").add({
//     text: text.value,
//     status: "active",
//     date: new Date().toISOString(),
//   });
//   text.value = "";
// }

function addItem(event) {
  event.preventDefault();
  const user = firebase.auth().currentUser;
  if (user) {
    let text = document.getElementById("todo-input");
    db.collection("users").doc(user.uid).collection("todo-items").add({
      text: text.value,
      status: "active",
      date: new Date().toISOString(),
    });
    text.value = "";
  }
}

// function markCompleted(id) {
//   const user = firebase.auth().currentUser;
//   if (user) {
//   let item = db.collection("users").doc(user.uid).collection("todo-items");
//   item.get().then(function (doc) {
//     if (doc.exists) {
//       if (doc.data().status == "active") {
//         item.update({
//           status: "completed"
//         });
//       } else {
//         item.update({
//           status: "active"
//         });
//       }
//     }
//   });
//  }
// }

// function deleteItem(id) {
//   db.collection("todo-items")
//     .doc(id)
//     .delete()
//     .then(() => {
//       console.log("Document successfully deleted!");
//     })
//     .catch((error) => {
//       console.error("Error removing document: ", error);
//     });
// }

function markCompleted(id) {
  const user = firebase.auth().currentUser;
  if (user) {
    let item = db.collection("users").doc(user.uid).collection("todo-items").doc(id);
    item.get().then(function (doc) {
      if (doc.exists) {
        if (doc.data().status === "active") {
          item.update({
            status: "completed"
          });
        } else {
          item.update({
            status: "active"
          });
        }
      }
    }).catch((error) => {
      console.error("Error getting document: ", error);
    });
  }
}

function deleteItem(id) {
  const user = firebase.auth().currentUser;
  if (user) {
    db.collection("users").doc(user.uid).collection("todo-items").doc(id).delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }
}

function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-US', options);
}

function openEditModal(id, text) {
  currentEditId = id;
  document.getElementById("editTaskInput").value = text;
  document.getElementById("editModal").style.display = "block";
}

function updateTask() {
  if (currentEditId) {
    let newText = document.getElementById("editTaskInput").value;
    db.collection("todo-items").doc(currentEditId).update({
      text: newText
    }).then(() => {
      console.log("Document successfully updated!");
      document.getElementById("editModal").style.display = "none";
    }).catch((error) => {
      console.error("Error updating document: ", error);
    });
  }
}

// Close modal when clicking on the close button or outside the modal
window.onclick = function(event) {
  let modal = document.getElementById("editModal");
  if (event.target == modal || event.target.className == "close") {
    modal.style.display = "none";
  }
}

// Call getItems to load tasks when the page loads
getItems();