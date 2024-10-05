import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client'
import Ourmsg from './component/Ourmsg';
import Othermsg from './component/Othermsg';
function App() {
  const socket = useMemo(() => io("http://localhost:8000"), [])
  const [Data, SetData] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`connected ${socket.id}`)
    })
    socket.on("message", (data) => {
      console.log(data)
      SetData((prevMessages) => [...prevMessages, data]);  // Add new message to array

    });
    return () => {
      socket.disconnect()
    };
  }, [socket])

  const [msg, setmsg] = useState("");

  const submit = (e) => {
    e.preventDefault();
    socket.emit("message", { id: socket.id, msg });
    setmsg("")

  }


  return (
    <>
      <div className="container">
        <div className="w-100 h-100">

          {Data.map((message, index) => (
            message.id === socket.id ? <Ourmsg key={index} msg={message.msg} />
              : <Othermsg key={index} msg={message.msg} />
          ))}
        </div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Send the message" aria-describedby="basic-addon2" value={msg} onChange={(e) => setmsg(e.target.value)} />
          <button className="btn btn-primary" id="basic-addon2" onClick={submit}>SEND</button>
        </div>
      </div>

    </>
  );
}

export default App;
