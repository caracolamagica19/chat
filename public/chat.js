
// Hacer conexion
var socket = io.connect(window.location.host); // Cambiar de ip 

var chatWindow = document.getElementById('chat-window');
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

btn.addEventListener('click', function () {
    socket.emit("chat", {
        message: message.value,
        handle: handle.value
    });
    message.value = '';
});

message.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault;
        btn.click();
    }
});

message.addEventListener('keypress', function () {
    socket.emit('typing', { handle: handle.value });
});

// Escuchando los eventos
socket.on('chat', function (data) {
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + "</p>";
    feedback.innerHTML = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;
});

socket.on('typing', function (data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

