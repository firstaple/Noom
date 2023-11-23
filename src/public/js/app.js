const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
const msgForm = room.querySelector("#msg");
const nameForm = room.querySelector("#name");

room.hidden = true;

let roomName;

const addMessage = (message) => {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
};

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
};

const handleNicknameSubmit = (event) => {
  event.preventDefault();
  msgForm.hidden = false;
  nameForm.hidden = true;
  const input = room.querySelector("#name input");
  socket.emit("nickname", input.value);
};

const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerHTML = `Room ${roomName}`;

  msgForm.hidden = true;
  msgForm.addEventListener("submit", handleMessageSubmit);
  nameForm.addEventListener("submit", handleNicknameSubmit);
};

const handleRoomSubmit = (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
};

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
  addMessage(`${user} arrived!`);
});

socket.on("bye", (left) => {
  addMessage(`${left} left ㅠㅠ`);
});

socket.on("new_message", addMessage);
