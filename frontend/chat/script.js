const token = localStorage.getItem('token');

const authAxios = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { "Authorization": `Bearer ${token}` }
});

let localMsg;
window.addEventListener('DOMContentLoaded', async () => {
    localMsg = JSON.parse(localStorage.getItem('localMsg'));
    let lastId;
    if (localMsg === null) { lastId = 0 }
    if (localMsg.length > 0) { lastId = localMsg[localMsg.length - 1].id }
    // setInterval(() => {
    const response = await authAxios.get(`/?id=${lastId}`);//getting chats
    showChats(response.data);
    // }, 1000)

    const groups = await authAxios.get('/get-groups');//getting group list
    localStorage.setItem('groups',JSON.stringify(groups.data.groups));
    const groupSelect = JSON.parse(localStorage.getItem('groups'));
    selectGroup(groupSelect);
    showGroupList(groups.data.groups);

    const users = await authAxios.get('/admin/get-users');//getting user list
    showUserList(users.data);
});


// groups
async function createGroup(event) {
    event.preventDefault();
    const name = document.getElementById('create-group-input').value;
    const ress = await authAxios.post('/create-group', { name });
    console.log(ress.data);
}

async function getGroupChat(event) {
    try {
        event.preventDefault();
        const groupChatInputId = document.getElementById('group-chat-input-get').value;
        const ress = await authAxios.get(`/get-groupchat/?gId=${groupChatInputId}`);
        console.log(ress.data);
        showGroupChatOnScreen(ress.data);
    } catch (err) {
        console.log(err);
    }
}

function showGroupChatOnScreen(chat){
    const div=document.getElementById('group-chat-receive-box');
    div.innerHTML='';
    chat.gChat.forEach(chats=>{
        div.innerHTML+=`
            <div id="${chats.id}">${chats.name}:${chats.message}</div>
        `;
    });
}

async function sendGroupMsg(event){
    try{
        event.preventDefault();
        const input=document.getElementById('group-chat-input').value;
        const groupId=document.getElementById('group-id-select').value;
        const name=localStorage.getItem('name');
        const userId=localStorage.getItem('userId');
        const obj={
            message:input,
            name:name,
            userId:userId,
            groupId:groupId,
        }
        const ress = await authAxios.post('/chat', obj);
        console.log(ress);

    }catch (err) {
        console.log(err);
    }
}

function selectGroup(group){
    group.forEach((groups)=>{
        document.getElementById('group-id-select').innerHTML+=`
            <option value="${groups.id}">${groups.id}</option>
        `
        // console.log(groups.id);
    })
}

async function addUserToGroup(event) {
    event.preventDefault();
    const emailInput = document.getElementById('add-user-input').value;
    const groupIdInput = document.getElementById('add-group-id').value;
    const obj = {
        groupId: groupIdInput,
        email: emailInput
    }
    console.log(obj)
    const ress = await authAxios.post('/add-usertogroup', obj);
    console.log(ress.data);
    alert('successfully added to the group');
}

// single user
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
    authAxios.post('/chat', obj)
        .then((response) => {
            console.log(response.data);
            document.getElementById('message-input').value = '';
        }).catch(err => console.log(err));
};

function showChats(response) {
    let div = document.getElementById('message-container');
    // console.log(div)
    console.log('>>>backend<<<', response.chat);

    //localstorage
    let retrivedMsg = localMsg.concat(response.chat);
    console.log('>>>local<<<', retrivedMsg);

    //deleting old messages
    if (retrivedMsg.length > 100) {
        for (let i = 0; i < retrivedMsg.length - 100; i++) retrivedMsg.shift();
    }
    localStorage.setItem('localMsg', JSON.stringify(retrivedMsg));

    div.innerHTML = '';
    retrivedMsg.forEach(chat => {
        div.innerHTML += `<div id="${chat.id}>">${chat.name}:${chat.message}</div>`;
    });
}

// group list and user list
function showGroupList(groups) {
    const groupListDiv = document.getElementById('group-list');
    groupListDiv.innerHTML = '';
    groups.forEach(group => {
        groupListDiv.innerHTML += `
        <li id='${group.id}' style="padding:10px 0;">Id:${group.id} | Name:${group.name}
        </li>
        `;
    });
}

function showUserList(datas) {
    const userListDiv = document.getElementById('user-list');
    userListDiv.innerHTML = '';
    datas.user.forEach(user => {
        userListDiv.innerHTML += `
        <li id='${user.id}' style="padding:10px 0;">Name:${user.name} | Email:${user.email}
        </li>
        `;
    })
}