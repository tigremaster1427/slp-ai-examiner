const recognition = new webkitSpeechRecognition();

recognition.lang = "en-US";

function startListening() {
  recognition.start();
}

recognition.onresult = function(event) {
  let text = event.results[0][0].transcript;
  document.getElementById("transcript").innerText = text;

  sendToAI(text);
};
async function sendToAI(text) {

  const response = await fetch("/api/ai", {
    method: "POST",
    body: JSON.stringify({ message: text })
  });

  const data = await response.json();

  document.getElementById("response").innerText = data.reply;

  speechSynthesis.speak(new SpeechSynthesisUtterance(data.reply));
}
