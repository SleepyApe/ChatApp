const { readFileSync, writeFileSync } = require("fs");
const DATA_PATH = "./Database/ChatApp.json";

// Database API
class DatabaseApi {
  getMessages() {
    const res = ReadJSON(DATA_PATH);
    if (res) return res.messages;
    return;
  }

  addMessage(msg) {
    return WriteJSON(DATA_PATH, msg);
  }
}

// Reads and parses JSON file
function ReadJSON(path) {
  try {
    const file = readFileSync(path, "utf-8");

    // If file is empty - create a json object
    if (file.length === 0) file = '{"messages":[]}';

    return JSON.parse(file);
  } catch (err) {
    console.log(err);
    return 0;
  }
}
// Write to JSON file
function WriteJSON(path, msg) {
  // Get messages from JSON file and add message to it
  const msgs = ReadJSON(path);
  msg.msg_id = msgs.messages.length + 1;
  msgs.messages.push(msg);

  // Write new JSON object to file
  try {
    writeFileSync(path, JSON.stringify(msgs, null, 2));
    return 1;
  } catch (err) {
    console.log(err);
    return 0;
  }
}

module.exports = DatabaseApi;
