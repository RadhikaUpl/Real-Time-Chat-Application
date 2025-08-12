import { MdAttachFile } from "react-icons/md";
import { MdSend } from "react-icons/md";
import React, { useState, useRef, useContext, useEffect } from "react";
import ChatContext from "../Context/ChatContext";
import { useNavigate } from "react-router";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import toast from "react-hot-toast";
import timeAgo from "../config/helper";
function ChatPage()
{
   
const[messages , setMessages]=useState([]);

const[input,setInput]=useState("");
const inputRef=useRef(null);
const chatBoxRef=useRef(null);
const[stompClient, setStompClient]=useState(null);
const {roomId,userName,connected, setRoomId,setUsername,setConnected} = useContext(ChatContext);

useEffect(()=>
{
    const client=new Client({
        webSocketFactory:()=>new SockJS("http://localhost:8080/chat"),
        reconnectDelay:5000,
        debug:(str)=>console.log(str)
    });

    client.onConnect=(frame)=>
    {
        setStompClient(client);
        toast.success("Connected");

        client.subscribe(
            `/topic/room/${roomId}`,
            (message)=>{
                const Messages =JSON.parse(message.body);
                setMessages((prev)=>[...prev,Messages])
            }
        )
    }

    client.activate();
    return()=>
    {
        client.deactivate();
    }
},[roomId]);

useEffect(()=>
{   
   
    const loadMessage=async ()=>
    {
        try{
           let response = await fetch(`http://localhost:8080/api/rooms/${roomId}/messages?size=50&page=0`);
            response=await response.json();
            
            setMessages(response);
        }
        catch(e)
        {
            console.log(e.message);
        }
    }
    if(connected)
    {
         loadMessage();
    }
},[])

//scroll down 
useEffect(()=>
{
    if(chatBoxRef.current)
    {
        chatBoxRef.current.scroll({
            top:chatBoxRef.current.scrollHeight,
            behavior:"smooth",
        });
    }
},[messages]);
const navigate=useNavigate();
useEffect(()=>
{   
    if(!connected)
    {
        navigate('/');
    }

},[connected,roomId,userName])

//send message handle
const sendMessage=()=>
{
    if(stompClient && connected && input.trim() )
    {
        console.log(input);
         const message={
            content:input,
            sender:userName,
            roomId:roomId
         }

         stompClient.publish({destination:`/app/sendMessage/${roomId}`,body:JSON.stringify(message)});
         setInput("");
    }
}

function handleLogout()
{
    stompClient.deactivate();
    setConnected(false);
    setRoomId('');
    setUsername('');
    navigate('/');
}
    return(
        <>
        <div className="">
            {/*this is a header */}
            <header className="flex bg-gray-900 w-full fixed border border-gray-700 shadow justify-around items-center py-3">
               {/*room name */} 
                <div>
                    <h1 className="text-xl font-semibold">
                        Room : <span>{roomId}</span>
                    </h1>
                </div>
                {/*username */}
                <div>
                    <h1 className="text-xl font-semibold">
                        User : <span>{userName}</span>
                    </h1>
                </div>
                {/*leave button */}
                <div>
                    <button onClick={handleLogout} className="bg-red-500 border-none rounded-lg hover:bg-red-700 px-3 py-2">Leave Room</button>
                </div>
            </header>

            <main ref={chatBoxRef} className="py-20  w-2/3 bg-slate-600 mx-auto h-screen overflow-auto px-15">
                {
                    messages.map((message, index)=>
                    (
                        <div key={index} className={`flex ${message.sender===userName?'justify-end':'justify-start'}`}>
                              <div className={`my-2 ${message.sender===userName?'bg-gray-900':'bg-gray-50 text-gray-900'}  p-2 max-w-xs rounded-2xl`}>
                            <div className="flex flex-row gap-2">
                            {message.sender===userName?<img src="https://avatar.iran.liara.run/public/job/farmer/female" className="h-6 w-6"/>:  <img src="https://avatar.iran.liara.run/public/job/farmer/male" className="h-6 w-6"/>}
                                <div className=" flex flex-col gap-1">
                                    <p className="text-sm font-bold">{message.sender}</p>
                                    <p>{message.content}</p>
                                    <p className="text-xs">{timeAgo(message.timestamp)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))
                }
            </main>

            <div className="fixed bottom-2 w-full h-14">
                <div className="h-full bg-gray-900 rounded-full w-3/5 mx-auto flex justify-around items-center ">
                    <input
                      value={input}
                      onChange={(e)=>{setInput(e.target.value)}}  
                      type="text"
                      placeholder="Type your message here..." 
                      className="px-3 py-3 w-4/5 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                      onKeyDown={(e)=>
                      {
                        if(e.key==='Enter')
                        {
                            sendMessage();
                        }
                      }}
                      ></input>
                  <div className="flex gap-5">
                    <button className="bg-purple-600 h-10 w-10 flex justify-center items-center rounded-full">
                        <MdAttachFile />
                    </button>
                    <button 
                    onClick={sendMessage}
                    className="bg-green-600 h-10 w-10 flex justify-center items-center rounded-full">
                        <MdSend />
                    </button>
                  </div>
                </div>
            </div>
           
        </div>
        </>
    )
}
export default ChatPage;