const wsUrl = "wss://echo-ws-service.herokuapp.com";

const supportButton = document.querySelector(".support-button");
const chatBox = document.querySelector(".chat-box");
const closeButton = chatBox.querySelector(".close-button");
const input = document.getElementById("input");
const output = document.getElementById("output");
const sendButton = chatBox.querySelector(".send-button");
const wrap = chatBox.querySelector(".wrap");

let websocket;

// вывод нового сообщения в форму
function writeToScreen(message) {
  let mess = document.createElement("p");
  mess.className = "message";
  mess.innerHTML = message;
  wrap.appendChild(mess);
}

// открытие чат - бокса
supportButton.addEventListener("click", function () {
  chatBox.classList.add("active");
  websocket = new WebSocket(wsUrl);

  // состояние обработчика - onopen
  websocket.onopen = function (event) {
    writeToScreen("CONNECTED");
  };

  // состояние обработчика - onclose
  websocket.onclose = function (event) {
    console.log("Сообщение с сервером завершено");
  };

  // состояние обработчика - onmessage - поступление сообщений от сервера
  websocket.onmessage = function (event) {
    writeToScreen(`SERVER: ${input.value}`);
    document.getElementById("input").value = ""; /*очистка поля input */
  };

  // состояние обработчика - onerror
  websocket.onerror = function (event) {
    writeToScreen("ERROR");
  };
});

// закрытие чат - бокса
closeButton.addEventListener("click", () => {
  chatBox.classList.remove("active");
  websocket.close();
  websocket = null;
});

// отправка сообщений
sendButton.addEventListener("click", () => {
  if (!input.value.length) {
    sendButton.preventDefault();
  } else {
    const message = input.value;
    writeToScreen(`YOU: ${message}`);
    websocket.send(message);
  }
});

// Geolocation  =========================
const sendGeolocationButton = document.querySelector(
  ".send-geolocation-button"
);

// Функция, выводящая текст об ошибке
const geolocationError = () => {
  console.log("Error");
};

// Функция, срабатывающая при успешном получении геолокации
const successGeolocationSend = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const link = document.createElement("a");
  link.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  link.setAttribute("target", "_blank");
  link.textContent = "Ссылка на карту";
  writeToScreen(`Широта: ${latitude} °, Долгота: ${longitude} °, ${link}`);

  // состояние обработчика - onmessage - поступление сообщений от сервера
  websocket.onmessage = function (event) {
    console.log(
      "Ответное сообщение от сервера, которое не нужно выводить в диалоговое окно"
    );
  };
};

sendGeolocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocation не поддерживается вашим браузером");
  } else {
    alert("Geolocation устанавливается");
    navigator.geolocation.getCurrentPosition(
      successGeolocationSend,
      geolocationError
    );
  }
});
