
async function createroom(roomId)
{
    try{
         let response=await fetch("http://localhost:8080/api/rooms/createRoom",{
            method:"POST",
            headers:{
                        "Content-Type":"text/plain"
                    },
            body:roomId
         });
     return response;   
    }
    catch(error)
    {
        console.log(error.messsage);
    }
    
}
export default createroom;
