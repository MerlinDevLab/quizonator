document.getElementById("generate").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: generateFlashcards,
    });
  });
  
  function generateFlashcards() {
    const text = document.body.innerText;
    const sentences = text.split('.').map(s => s.trim()).filter(s => s.length > 40);
  
    const cards = sentences.slice(0, 5).map(s => {
      const words = s.split(' ');
      const question = words.slice(0, words.length - 4).join(' ') + '...?';
      const answer = words.slice(-4).join(' ');
      return { question, answer };
    });
  
    let html = "";
    for (const card of cards) {
      html += `<b>Q:</b> ${card.question}<br/><b>A:</b> ${card.answer}<br/><br/>`;
    }
  
    const div = document.createElement("div");
    div.innerHTML = html;
    document.body.appendChild(div);
  }
  