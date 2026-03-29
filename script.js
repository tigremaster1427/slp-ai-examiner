const recognition = new webkitSpeechRecognition();

recognition.lang = "en-US";
recognition.continuous = false;

let startTime;

function startListening() {

  if (!startTime) startTime = Date.now();

  let elapsed = (Date.now() - startTime) / 60000;

  if (elapsed > 20) {
    alert("Exam finished");
    return;
  }

  recognition.start();
}

recognition.onresult = function(event) {

  let text = event.results[0][0].transcript;

  document.getElementById("transcript").innerText = text;

  sendToAI(text);
};

async function sendToAI(text){

  const response = await fetch("/api/ai",{
    method:"POST",
    body: JSON.stringify({message:text})
  });

  const data = await response.json();

  document.getElementById("response").innerText = data.reply;

  // reproducir respuesta en voz
  speechSynthesis.speak(new SpeechSynthesisUtterance(data.reply));

  // guardar última sesión
  localStorage.setItem("lastResult", data.reply);
}
