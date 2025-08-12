import React, { useState } from "react";
import chatIcon from "../assets/chat.png"
import toast from "react-hot-toast";
import createroom from "../Services/RoomService";
import joinRoom from "../Services/joinRoom";
import { useNavigate } from "react-router";
import ChatContext from "../Context/ChatContext";
import { useContext } from "react";
function JoinCreateChat()
{
    const[detail,setDetail]=useState({
        userName:"",
        roomId:"",
    });

    const navigate=useNavigate();

    const{roomId,userName,connected,setRoomId,setUsername,setConnected}=useContext(ChatContext);
    function validateForm()
    {
        if(detail.roomId==="" || detail.userName==="")
        {
            toast.error("Invalid data !!");
            return false;
        }
        return true;
    }

    async function joinChat()
    {
        if(validateForm())
        {
           
            let response=await joinRoom(detail.roomId);
            if(response.status===400)
            {
                toast.error("Room not found");
            }
            else
            {

             toast.success("Directing to room");
               
                setRoomId(detail.roomId);
                setUsername(detail.userName);
                setConnected(true);
     
                 navigate("/chat");

            }
               

        }
    }

    async function createRoom()
    {
        if(validateForm())
        {
          
            let response=await createroom(detail.roomId);
            console.log(response);
            if(response.status===400)
            {
              toast.error("Room already exists !!!");
            }
            else
            { toast.success("Room Created Successfully");
            
              setRoomId(detail.roomId);
                setUsername(detail.userName);
                setConnected(true);
                  navigate("/chat");
                }

             
        }
    }


    return(
        <>
            <div className="min-h-screen flex items-center justify-center  ">
                    <div className="p-8 w-full max-w-xl rounded bg-gray-900">
                        <div>
                            <img src={chatIcon} className="mx-auto w-20"/>
                        </div>
                        <h3 className="text-2xl font-semibold text-center mb6 font-bold">Join Room / Create Room</h3>
                        <div className="mt-9">
                            <label htmlFor="name" className="block mb-2 font-bold">Your Name</label>
                        <input type="text" placeholder="Enter your name" className="bg-gray-600 w-full rounded-full h-10 mt-3 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        onChange={(e)=>
                        {
                            setDetail({
                                userName:e.target.value,
                            })   
                        }
                        }
                        />
                        </div>
                        <div className="mt-5">
                            <label htmlFor="roomid" className=" font-bold">Room ID</label>
                        <input type="password" placeholder="Enter room ID" className="bg-gray-600 w-full rounded-full h-10 mt-3 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e)=>
                        {
                            setDetail({
                                ...detail,
                                roomId:e.target.value,
                            })
                            console.log(detail);
                        }
                        }
                        />
                        </div>
                        
                        <div className="flex items-center justify-center  mt-10 gap-50">
                                <button onClick={joinChat} className="bg-blue-500  p-2 pl-5 pr-5 rounded-full hover:bg-blue-300">Join Room</button>
                                <button onClick={createRoom} className="bg-green-500 p-2 rounded-full pl-5 pr-5 hover:bg-green-300">Create Room</button>
                        </div>
                    </div>
            </div>
        </>
    )
}
export default JoinCreateChat;