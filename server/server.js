const Database = require("./Database/JsonDatabaseApi.js");
const db = new Database();
var connections = [];
var disconnecting = []; // Incase of refresh

function UserConnect(user, s) {
  // Avoid same user connecting several times
  if (!connections.includes(user)) {
    connections.push(user);

    // Make sure they are disconnecting
    if (!disconnecting.includes(user)) {
      const msg = {
        user: "",
        date: new Date(),
        message: [user, true],
      };
      db.addMessage(msg);

      // Broadcast Connection
      s.broadcast.emit("recieve-message", msg);
    }
  }
}
async function UserDisconnect(user, s) {
  // Avoid same user disconnecting several times
  if (!disconnecting.includes(user)) {
    disconnecting.push(user);

    // Wait 5 seconds to make sure not refreashing
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // User in connections == refreash
    if (!connections.includes(user)) {
      const msg = {
        user: "",
        date: new Date(),
        message: [user, false],
      };
      db.addMessage(msg);

      // Broadcast Disconnection
      s.broadcast.emit("recieve-message", msg);
    }

    // Remove from disconnecting
    const i = disconnecting.indexOf(user);
    disconnecting.splice(i, 1);
  }
}

// Create Socket
const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // If logged inn send connection message
  const user = socket.handshake.query.username;
  if (user) UserConnect(user, socket);

  // Handle messages
  socket.on("get-messages", () => {
    socket.emit("recieve-messages", db.getMessages());
  });
  socket.on("send-message", (msg) => {
    res = db.addMessage(msg);
    if (res) {
      socket.emit("recieve-message", msg);
      socket.broadcast.emit("recieve-message", msg);
    } else {
      socket.emit("err", {
        err: "Could not add message to database",
        payload: msg,
      });
    }
  });
  socket.on("disconnect", () => {
    // If user disconnect send disconnection message
    if (user) {
      const i = connections.indexOf(user);
      connections.splice(i, 1);
      UserDisconnect(user, socket);
    }
  });
});
