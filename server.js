const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/messages", function (req, res) {
  const data = req.body; 
  if(data.from.length > 0 && data.text.length ){
    data.id = messages.length;
    messages.push(data);
    res.send('hello ' + data.from);
  }else{
    res.sendStatus(400);
  }
  
});

app.get("/messages", function (req, res) {
    res.send(messages);
});

app.get("/messages/:id", function (req, res) {
    const {id} = req.params;
    let filteredMessages = messages.filter(message => message.id == id);
    res.send(filteredMessages);
});

app.delete("/messages/:id", function (req, res) {
    const {id} = req.params;
    messages.forEach((item,index) => {
      if(id == item.id){
        messages.splice(index,1);
        res.send(`Message with the id ${id} was deleted`);
      }
    })
});

app.listen(3000);
