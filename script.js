const API_KEY = "AIzaSyCm7mFTJ9TVmE7NVAYg7WDcQV5IrFsN-cY";

async function send() {
  const input = document.getElementById("text");
  const chat = document.getElementById("chat");

  const userText = input.value;
  if (!userText) return;

  chat.innerHTML += `<div class="msg user">${userText}</div>`;
  input.value = "";

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: userText }] }
          ]
        })
      }
    );

    const data = await res.json();
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text 
      || "No response";

    chat.innerHTML += `<div class="msg ai">${aiText}</div>`;
    chat.scrollTop = chat.scrollHeight;

  } catch (err) {
    chat.innerHTML += `<div class="msg ai">Error koneksi</div>`;
  }
}
