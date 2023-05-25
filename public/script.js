const socket = io(); 


$('#chat-box').hide();


function emitMssg(){
    const msgText = $('#inp').val();
    $('#inp').val("");
    // console.log(msg);
    socket.emit('send-msg',{
        msg:msgText
    })

}


$('#send-btn').click(()=>{
    emitMssg();
})


console.log('Button  ',$('#send-btn'));
socket.on('rcvd-msg',(data)=>{
    console.log('chat',$('#chat'));
    $('#chat').append(`<li class="border p-2 ms=0 rounded-pill mb-2"> <span class="fw-bold">${data.username}</span> : <span>${data.recieved_msg}</span></li>`)
    // console.log('Recieved',data.recieved_msg);
})

// console.log(getEventListeners('#send-btn'));


$('#login-btn').click(()=>{
    const username = $('#username').val();
    console.log(username);

    socket.emit('login',{
        username:username
    });

    $('#login').hide();
    $('#chat-box').show();

    $('#username').val("");
})

$('#inp').on('keydown',(e)=>{
    if(e.which==13){
        emitMssg();
    }
})