
function sendMsg(e){
    e.preventDefault();
    const message=document.getElementById('message-input').value;
    const name=localStorage.getItem('name');
    const userId=localStorage.getItem('userId');
    axios.post('http://localhost:3000/chat',{message:message,name:name,userId:userId})
    .then((response)=>{
        console.log(response.data);
    }).catch(err=>console.log(err.response.data));
};

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/')
    .then(response=>{
        console.log(response.data);
        response.data.chat.forEach(chat=>{
        const div=document.getElementById('message-container');
        div.innerHTML+=`<div id="${chat.id}>">${chat.name}:${chat.message}</div>`
        });
    }).catch(err=>console.log(err.response.data))
})