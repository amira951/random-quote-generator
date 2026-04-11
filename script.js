const quoteText = document.querySelector(".quote");
const quoteBtn = document.querySelector("button");
const authorname = document.querySelector(".author .name");
const soundBtn = document.querySelector(".sound");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");

function randomQuote() {
    quoteBtn.innerText = "Loading Quote... ";
    fetch("https://dummyjson.com/quotes/random")
        .then(res => res.json())
        .then(result => {
            quoteText.innerText = result.quote;
            authorname.innerText = result.author;
            quoteBtn.innerText = "New Quote";
        })
        .catch(error => console.log("Erreur:", error));
}

soundBtn.addEventListener("click", () => {
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorname.innerText}`);
    speechSynthesis.speak(utterance);
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(`${quoteText.innerText} — ${authorname.innerText}`)
        .then(() => alert("Citation copiée !"))
        .catch(err => console.log("Impossible de copier :", err));
});
twitterBtn.addEventListener("click", () => {
    const tweetText = `${quoteText.innerText} — ${authorname.innerText}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);