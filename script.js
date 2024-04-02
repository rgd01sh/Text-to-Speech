document.addEventListener('DOMContentLoaded', function () {
    const gameContainer = document.getElementById('gameContainer');
    const sentenceDisplay = document.getElementById('sentenceDisplay');
    const languageSelect = document.getElementById('languageSelect');
    const sentenceSelect = document.getElementById('sentenceSelect');
    const speedSelect = document.getElementById('speedSelect');
    const startGameButton = document.getElementById('startGameButton');
    const readSentenceButton = document.getElementById('readSentenceButton');
    const userInput = document.getElementById('userInput');

    const languages = {
        'English': [
            "Hello, how are you?",
            "What is your name?",
            "Let's learn a new language!",
            "PixelPal Language Odyssey is fun!",
            "Practice makes perfect."
        ],
        'Arabic': [
            "مرحبا، كيف حالك؟",
            "ما اسمك؟",
            "دعونا نتعلم لغة جديدة!",
            "رحلة لغة بيكسل بال ممتعة!",
            "التمرين يجعل الكمال."
        ],
        'Chinese': [
            "你好，你好吗？",
            "你叫什么名字？",
            "让我们学习一门新的语言！",
            "PixelPal语言奥德赛很有趣！",
            "熟能生巧。"
        ],
        'Spanish': [
            "Hola, ¿cómo estás?",
            "¿Cuál es tu nombre?",
            "¡Aprendamos un nuevo idioma!",
            "PixelPal Language Odyssey es divertido!",
            "La práctica hace al maestro."
        ],
        'French': [
            "Salut, comment ça va?",
            "Quel est ton nom?",
            "Apprenons une nouvelle langue!",
            "PixelPal Language Odyssey est amusant!",
            "La pratique rend parfait."
        ],
        'Japanese': [
            "こんにちは、お元気ですか？",
            "あなたの名前は何ですか？",
            "新しい言語を学びましょう！",
            "PixelPal Language Odysseyは楽しいです！",
            "練習は完璧を生む。"
        ],
        'Korean': [
            "안녕하세요, 어떻게 지내세요?",
            "당신의 이름은 무엇인가요?",
            "새로운 언어를 배워 봅시다!",
            "PixelPal 언어 오디세이는 재미 있어요!",
            "연습은 완벽을 만든다."
        ]
    };

    let currentLanguage = 'English';
    let currentSentenceIndex = 0;
    let currentSpeed = 1;

    // Add languages to the dropdown menu
    for (let language in languages) {
        const option = document.createElement('option');
        option.value = language;
        option.text = language;
        languageSelect.appendChild(option);
    }

    // Add sentences to the dropdown menu
    function updateSentenceOptions() {
        // Clear existing options
        sentenceSelect.innerHTML = '';
        // Add new options
        languages[currentLanguage].forEach((sentence, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.text = sentence;
            sentenceSelect.appendChild(option);
        });
    }
    updateSentenceOptions();

    // Update the current language when a new one is selected
    languageSelect.addEventListener('change', function () {
        currentLanguage = this.value;
        updateSentenceOptions();
        displayNextSentence();
    });

    // Update the current sentence when a new one is selected
    sentenceSelect.addEventListener('change', function () {
        currentSentenceIndex = this.value;
        displayNextSentence();
    });

    // Update the current speed when a new one is selected
    speedSelect.addEventListener('change', function () {
        currentSpeed = parseFloat(this.value);
    });

    function startGame() {
        currentSentenceIndex = 0;
        displayNextSentence();
        startGameButton.disabled = true;
        readSentenceButton.disabled = false;
    }

    function displayNextSentence() {
        sentenceDisplay.textContent = languages[currentLanguage][currentSentenceIndex];
    }

    function readSentence() {
        const utterance = new SpeechSynthesisUtterance(languages[currentLanguage][currentSentenceIndex]);
        utterance.lang = currentLanguage === 'English' ? 'en' : currentLanguage === 'Arabic' ? 'ar-sa' :
            currentLanguage === 'Chinese' ? 'zh-CN' : currentLanguage === 'Spanish' ? 'es' :
                currentLanguage === 'French' ? 'fr' : currentLanguage === 'Japanese' ? 'ja' :
                    currentLanguage === 'Korean' ? 'ko' : 'en';
        utterance.pitch = 1; // Change the pitch. Range is 0 to 2.
        utterance.rate = currentSpeed; // Change the rate based on user selection.
        speechSynthesis.speak(utterance);
    }

    // Event listener for when speech ends
    speechSynthesis.addEventListener('end', function () {
        currentSentenceIndex++;
        if (currentSentenceIndex < languages[currentLanguage].length) {
            displayNextSentence();
            readSentenceButton.disabled = false;
        } else {
            startGameButton.disabled = false;
            readSentenceButton.disabled = true;
        }
    });

    startGameButton.addEventListener('click', startGame);
    readSentenceButton.addEventListener('click', readSentence);

    // Additional functionality for user input
    userInput.addEventListener('input', function () {
        const text = this.value;
        if (text.trim() !== '') {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = currentLanguage === 'English' ? 'en' : currentLanguage === 'Arabic' ? 'ar-sa' :
                currentLanguage === 'Chinese' ? 'zh-CN' : currentLanguage === 'Spanish' ? 'es' :
                    currentLanguage === 'French' ? 'fr' : currentLanguage === 'Japanese' ? 'ja' :
                        currentLanguage === 'Korean' ? 'ko' : 'en';
            utterance.pitch = 1;
            utterance.rate = currentSpeed;
            speechSynthesis.speak(utterance);
        }
    });
});
