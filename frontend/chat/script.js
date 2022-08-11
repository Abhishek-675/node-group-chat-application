let message = document.getElementById('message-input').value;
let name = localStorage.getItem('name');
let userId = localStorage.getItem('userId');

function sendMsg(e) {
    e.preventDefault();
    message = document.getElementById('message-input').value;
    name = localStorage.getItem('name');
    userId = localStorage.getItem('userId');
    const obj = {
        message: message,
        name: name,
        userId: userId
    };
    axios.post('http://localhost:3000/chat', obj)
        .then((response) => {
            console.log(response.data);
            document.getElementById('message-input').value = '';
        }).catch(err => console.log(err));
};

const div = document.getElementById('message-container');
window.addEventListener('DOMContentLoaded', () => {
    const localMsg = JSON.parse(localStorage.getItem('localMsg'));
    let lastId;
    if (localMsg === null) {
        lastId = 0;
        localStorage.setItem('localMsg', '[]');
    }
    console.log(localMsg)

    if (localMsg.length > 0) { lastId = localMsg[localMsg.length - 1].id }
    console.log(localMsg.length);

    // setInterval(() => {
    axios.get(`http://localhost:3000/?id=${lastId}`)
        .then(response => {
            console.log('>>>backend<<<', response.data);
            //localstorage
            let retrivedMsg = localMsg.concat(response.data.chat);
            console.log('>>>local<<<', retrivedMsg);
            //deleting old messages
            if(retrivedMsg.length>100){
                for(let i=0;i<retrivedMsg.length-100;i++) retrivedMsg.shift();
            }
            localStorage.setItem('localMsg', JSON.stringify(retrivedMsg));

            if (response.data.chat.length > 0) showOnScreen(response.data.chat);
        }).catch(err => console.log(err))
    div.innerHTML = '';
    showOnScreen(localMsg);
    // }, 1000)
});

function showOnScreen(chat) {
    chat.forEach(chat => {
        div.innerHTML += `<div id="${chat.id}>">${chat.name}:${chat.message}</div>`;
    });
}