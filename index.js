document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#guest-form");
  const nameInput = document.querySelector("#guest-name");
  const categorySelect = document.querySelector("#guest-category");
  const guestList = document.querySelector("#guest-list");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (guestList.children.length >= 10) {
      alert("Guest list is full. Max 10 guests allowed.");
      return;
    }

    const name = nameInput.value;
    const category = categorySelect.value;
    const time = new Date().toLocaleTimeString();

    if (!name) {
      alert("Please enter a name.");
      return;
    }

    const li = document.createElement("li");
    li.className = category;

    const nameSpan = document.createElement("span");
    nameSpan.textContent = `${name} (${category}) - Not Attending`;
    
    const timeStamp = document.createElement("small");
    timeStamp.textContent = `Added at: ${time}`;

   
    let currentName = name; 
    let isAttending = false; 

    //rsvp button
    const rsvpButton = document.createElement("button");
    rsvpButton.textContent = "Toggle RSVP";
    rsvpButton.addEventListener("click", () => {
    isAttending = !isAttending; // Toggle the status
    updateNameSpan();
    });


  //edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
    const newName = prompt("Edit guest name:", currentName);
    if (newName) {
      currentName = newName;
      updateNameSpan();
    }
  });

  
    function updateNameSpan() {
    const statusText = isAttending ? "Attending" : "Not Attending";
    nameSpan.textContent = `${currentName} (${category}) - ${statusText}`;
    }

    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove";
    deleteButton.addEventListener("click", () => li.remove());

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "buttons";
    buttonContainer.append(rsvpButton, editButton, deleteButton);


    li.append(nameSpan, buttonContainer, timeStamp);
    guestList.appendChild(li);


    form.reset();
  });
});