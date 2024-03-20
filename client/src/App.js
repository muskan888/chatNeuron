import logo from './logo.svg';
import './App.css';
import './normal.css'
import {useState, useEffect} from 'react';

//use effect run once when app loads

function App() {
  useEffect(()=>{
    getEngines();

  },[])
  const [input,setInput]=useState("");
  const[models,setModels]=useState([]);
  const[currentModel,setCurrentModel]=useState("ada");

  const [chatLog, setChatLog]=useState([{
    user: "gpt",
    message:"How can I help you today"
  },{
    user:"me",
    message:"whhahahaat"
  }]);
  function clearChat(){
    setChatLog([]);
  }
  function getEngines(){
    fetch("http://localhost:3080/models")
    .then(res=>res.json())
    .then(data=>{
      console.log(data.models)
      setModels(data.models)})
  }
  async function handleSubmit(e){
    e.preventDefault();
    let chatLogNew=[...chatLog,{user:"me",message:`${input}`}]
     setInput("");
    const messages=chatLogNew.map((message)=>message.message).join("\n")
    const response=await fetch("http://localhost:3080/",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"

      },
      body:JSON.stringify({
        message:messages,
        currentModel,
      })
    });
    const data=await response.json();
    setChatLog([...chatLogNew,{user:"gpt",message:`${data.message}`}])
    console.log(data.message);
  }
  return (
    <div className="App">
      <aside className="sidemenu">
      <div className='side-menu-button ' onClick={clearChat}>
        <span> + </span>
        New Chat
      </div>
      <div className="models">
        <select onChange={(e)=>{
          setCurrentModel(e.target.value)
        }}>
          {models.map((model,index)=>(
            <option key={model.id} value={model.id}>{model.id}</option>
          ))}
        </select>
      </div>
      </aside>

      <section className="chatbox">
        <div className="chat-log">
    {chatLog.map((message,index)=>(
      <ChatMessage key={index} message={message}/>
    ))}
          <div className="chat-message-chatgpt">
     <div className="chat-message-center">
     <div className="avatar-chatgpt">
      <div className="avatarstyle">
  
</div>
      </div>
      <div className="message">

      </div>
     </div>
          </div>
        </div>
      <div className="chat-input-holder">
        <form onSubmit={handleSubmit}>
        <input
        rows="1"
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        className='chat-input-text-area'
        placeholder='Ask me anything'></input>
        </form>
      </div>

      </section>
      
    </div>
  );
}

const ChatMessage=({message})=>{
  return(
    <div className={`chat-message ${message.user==="gpt" && 
    "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avatar-chatgpt avatarstyle ${message.user==="gpt" && 
      "chatgpt"}`}>
          {message.user==="gpt" && <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <title>Spiral Avatar</title>
  <circle cx="50" cy="50" r="40" fill="none" stroke="white" stroke-width="2"/>
  <circle cx="50" cy="50" r="30" fill="none" stroke="white" stroke-width="2"/>
  <circle cx="50" cy="50" r="20" fill="none" stroke="white" stroke-width="2"/>
  <circle cx="50" cy="50" r="10" fill="none" stroke="white" stroke-width="2"/>
</svg> }
        </div>
        <div className="message">
            {message.message}
          </div>
      </div>
    </div>
  )
}
export default App;
