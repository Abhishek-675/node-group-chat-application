

function sendMsg(e) {
    e.preventDefault();
    const message = document.getElementById('message-input').value;
    const name = localStorage.getItem('name');
    const userId = localStorage.getItem('userId');
    const obj = {
        message: message,
        name: name,
        userId: userId
    };
    axios.post('http://localhost:3000/chat', obj)
        .then((response) => {
            console.log(response.data);
            document.getElementById('message-input').value='';
            // alert('message sent');
        }).catch(err => console.log(err));
};

window.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        axios.get('http://localhost:3000/')
            .then(response => {
                console.log(response.data);
                const div = document.getElementById('message-container');
                div.innerHTML='';
                response.data.chat.forEach(chat => {
                    div.innerHTML += `<div id="${chat.id}>">${chat.name}:${chat.message}</div>`
                });
            }).catch(err => console.log(err))
    }, 1000)
})