const socket = new WebSocket(`ws://${window.location.host}`);

const handleOpen = () => {
  console.log("Connected to Server ✅");
};

socket.addEventListener("open", handleOpen);

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected form Server ❌");
});

setTimeout(() => {
  socket.send("hello from the browser!");
}, 10000);
