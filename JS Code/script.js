const fromText = document.querySelector(".from-text"),
    toText = document.querySelector(".to-text"),
    selectTag = document.querySelectorAll("select"),
    exchangeIcon = document.querySelector(".exchange"),
    icons = document.querySelectorAll(".row"),
    translateBtn = document.querySelector("button");

selectTag.forEach(
    (tag, id) => {
        for (const countryCode in countries) {
            // Selecting Engilsh by default as FROM &  Hindi as To Language.
            let selected;
            if (id == 0 && countryCode == "en-GB") {
                selected = "Selected";
            } else if (id == 1 && countryCode == "hi-IN") {
                selected = "Selected";
            }
            let option = `<option value = "${countryCode}" ${selected}>${countries[countryCode]}</option>`;
            tag.insertAdjacentHTML("beforeEnd", option); // Adding Option tag inside select tag
        }
    }
)

translateBtn.addEventListener("click", () => {
    let text = fromText.value,
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value;

    if (!text) return;
    toText.setAttribute("placeholder", "Translating..");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "Translation");
    });
});

exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value,
        tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
});

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
})
