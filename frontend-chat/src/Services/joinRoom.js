async function joinRoom(roomId)
{
    try{
       let response= await fetch(`http://localhost:8080/api/rooms/join/${roomId}`)
        
        return response;
    }
    catch(error)
    {
        console.log(error.messsage);
    }
}
export default joinRoom;