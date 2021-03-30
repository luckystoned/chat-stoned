// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();

    const message = newChatForm.message.value.trim();

    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
})

//update user name
newNameForm.addEventListener('submit', e => {
    e.preventDefault();

    //update name via chatroom
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);

    //reset the form
    newNameForm.reset();

    //show then hide the update message
    updateMssg.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => updateMssg.innerText = '', 3000);

})

//update chat room

rooms.addEventListener('click', e => {

    if(e.target.tagName === 'BUTTON') {
        ChatIU.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => ChatIU.render(chat));
    }
})

//check local storage for a name
const username = localStorage.username ? localStorage.username : 'Luckystoned'

//class instances
const ChatIU = new ChatUI(chatList);
const chatroom = new Chatroom('weed', username);

//get chats render
chatroom.getChats(data => ChatIU.render(data));