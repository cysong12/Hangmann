

    // Your web app's Firebase configuration
    let firebaseConfig = {
        apiKey: "AIzaSyACMZdQoxFJogdRsoOtPbSUxAbPVFPDZ4Y",
        authDomain: "hangman-highscore.firebaseapp.com",
        databaseURL: "https://hangman-highscore.firebaseio.com",
        projectId: "hangman-highscore",
        storageBucket: "hangman-highscore.appspot.com",
        messagingSenderId: "512031509167",
        appId: "1:512031509167:web:e524c4daea32480f10e25a",
        measurementId: "G-CZ9J01XSB0"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    let db = firebase.firestore();
    let category = "";
    let score = 0;
    let lives = 7;
    let answer_array;
    let word;
    let wordBank; //category.innerHTML

    function highscoreDB() {
        document.getElementById("userScore").innerHTML = "Your score is " + score + "(" + wordBank.category + ")";
        let name = document.getElementById("name").value;
        db.collection("names").add({
            name: name,
            score: score,
            category: wordBank.category
        })

        .then(function() { // display message on console when the document is successfully added 
                console.log("success!");
            })
            .catch(function() { // display an error message on console when document could not be added
                console.error("error!");
            })

        highScoreDisplay();
    }

    function highScoreDisplay() {
        document.getElementById("highScoreDisplay").style.display = "block";
        document.getElementById("startingbuttons").style.display = "none";
        document.getElementById("game_over").style.display = "none";
        readStoreHsByCat();
    }

    function readStoreHsByCat() {
        //read top 10 names by category
        db.collection("names").where("category", "==", "sports").orderBy("score", "desc").limit(10).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                pNameElem = document.createElement("P");
                pScoreElem = document.createElement("P");
                pNameElem.innerHTML = doc.data().name;
                pNameElem.className = "sportsName";
                pScoreElem.className = "sportsScore";
                pScoreElem.innerHTML = doc.data().score;
                document.getElementById("cat1NameScores").appendChild(pNameElem);
                document.getElementById("cat1NameScores").appendChild(pScoreElem);
            })
        });
        db.collection("names").where("category", "==", "brands").orderBy("score", "desc").limit(10).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                pNameElem = document.createElement("P");
                pScoreElem = document.createElement("P");
                pNameElem.innerHTML = doc.data().name;
                pScoreElem.innerHTML = doc.data().score;
                pNameElem.className = "brandsName";
                pScoreElem.className = "brandsScore";
                document.getElementById("cat2NameScores").appendChild(pNameElem);
                document.getElementById("cat2NameScores").appendChild(pScoreElem);
            })
        });
        db.collection("names").where("category", "==", "countries").orderBy("score", "desc").limit(10).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                pNameElem = document.createElement("P");
                pScoreElem = document.createElement("P");
                pNameElem.innerHTML = doc.data().name;
                pScoreElem.innerHTML = doc.data().score;
                pNameElem.className = "countriesName";
                pScoreElem.className = "countriesScore";
                document.getElementById("cat3NameScores").appendChild(pNameElem);
                document.getElementById("cat3NameScores").appendChild(pScoreElem);
            })
        });
        db.collection("names").where("category", "==", "food").orderBy("score", "desc").limit(10).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                pNameElem = document.createElement("P");
                pScoreElem = document.createElement("P");
                pNameElem.innerHTML = doc.data().name;
                pScoreElem.innerHTML = doc.data().score;
                pNameElem.className = "foodName";
                pScoreElem.className = "foodScore";
                document.getElementById("cat4NameScores").appendChild(pNameElem);
                document.getElementById("cat4NameScores").appendChild(pScoreElem);
            })
        });
    }

    function Word(category) {
        let wordBank = {
            "sports": ["Archery", "Badminton", "Cricket", "Bowling", "Boxing", "Curling", "Tennis", "Skateboarding", "Surfing", "Hockey",
                "Figure skating", "Yoga", "Fencing", "Fitness", "Gymnastics", "Karate", "Volleyball", "Weightlifting", "Basketball", "Baseball", "Rugby", "Wrestling",
                "High jumping", "Hang gliding", "Car racing", "Cycling", "Running", "Table tennis", "Fishing", "Judo", "Climbing", "Billiards", "Shooting",
                "Horse racing", "Horseback riding", "Golf"
            ],
            "brands": ["Nike", "Adidas", "Puma", "Starbuks", "Blenz", "Waves", "Netflix", "Facebook", "Google",
                "Amazon", "Ebay", "Microsoft", "Macdonald", "Disney", "IBM", "Burgerking", "Subway", "Pepsi",
                "Audi", "BMW", "Benz", "Jeep", "Acura", "Ferrari", "Honda", "Hyundai", "Mazda", "Maserati",
                "Kia", "Mini", "Gucci", "Zara", "Prada", "Balenciaga", "Hermes", "Rolex", "Chanel", "Tomford",
                "Dior", "Versace", "Lacoste", "Boss", "Fendi", "Givenchy", "Burberry", "Valentino", "Fedex", "Samsung",
                "Lg", "Ikea", "Sony", "Apple", "Bestbuy", "Ford", "Subaru"
            ],
            "countries": ["South Korea", "United States", "Hong Kong", "Canada", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
                "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
                "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Botswana", "Brazil",
                "Bulgaria", "Burundi", "Cambodia", "Cameroon",
                "Chad", "Chile", "China", "Colombia", "Comoros", "Congo",
                "Cuba", "Cyprus", "Denmark", "Dominica", "Dominican Republic",
                "Ecudaor", "Egypt", "Eritrea", "Estonia", "Ethiopia", "Fiji",
                "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
                "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Haiti",
                "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iraq", "Ireland",
                "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
                "Kosovo", "Kuwait", "Kyrgyzstan", "Latvia", "Lebanon", "Lesotho", "Liberia",
                "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives",
                "Mali", "Malta", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico",
                "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
                "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue",
                "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal",
                "Puerto Rico", "Qatar", "Romania", "Russian", "Rwanda",
                "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
                "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
                "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland",
                "Taiwan", "Tajikistan", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
                "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
                "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam",
                "Yemen", "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"
            ],
            "food": ["Hamburger", "Lasagne", "Pizza", "Ramen", "Sushi", "Sashimi", "Kabob", "Curry", "Udon", "Steak",
                "Lobster", "Escargot", "Spaghetti", "Mooncake", "Linguine", "Macaroni", "Sandwich", "Burrito", "Quesadilla", "Taco", "Bagel",
                "Donut", "Poke", "Sausage", "Cheese", "Cookie", "Pie", "Cupcake", "Milk", "Pancake", "French fries", "Hot dog", "Muffin", "Salsa",
                "Bacon", "Brownie", "Lamb Chop", "Popcorn", "Pudding", "Onion ring", "Crepe", "Croissant", "Tamale", "Calzone", "Yogurt", " Egg", "Butter",
                "Pastrami", " Rib", "Brisket", "Pork chop"
            ]
        };
        this.category = category.toLowerCase();
        this.wordBank = wordBank[this.category];
        this.answer = "";
        this.answer_placement = "";
        this.linesArray = [];
        this.answerArray = [];

        this.answerPlacement = function() {
            this.answer_placement = "";
            console.log(this.linesArray);
            for (let i = 0; i < this.linesArray.length; i++) {
                if (this.linesArray[i] === ' ') {
                    this.answer_placement += ' ';
                } else {
                    this.answer_placement += this.linesArray[i];
                }
            }
            return this.answer_placement;
        };
        this.checkWordComplete = function() {
            console.log(this.answer_placement === this.answer);
            if (this.answer_placement === this.answer) {
                return true;
            }
        };
        this.nextCategory = function() {
            this.category = Object.keys(wordBank)[Math.floor(Math.random() * Object.keys(wordBank).length)]; // tested
            console.log(this.category);
            return wordBank[this.category];
        };
        this.popWord = function() {
            this.answerArray = [];
            console.log(this.wordBank, this.category);
            if (this.wordBank.length === 0) { // if category key's value is empty, delete it
                delete wordBank[this.category];
                console.log(wordBank);
                this.wordBank = this.nextCategory();
            }
            let generated_i = Math.floor(Math.random() * (this.wordBank.length));
            let generated_word = this.wordBank[generated_i].toUpperCase();
            this.answer = generated_word;
            this.wordBank.splice(generated_i, 1);
            for (let j = 0; j < generated_word.length; j++) {
                this.answerArray.push(generated_word[j].toUpperCase());
            }
            //this.answerPlacement = "";
            this.linesArray = [];

            for (let i = 0; i < this.answer.length; i++) {
                if (this.answer[i] === ' ') {
                    this.linesArray.push(' ');
                } else {
                    this.linesArray.push('_');
                }
                //this.answerPlacement += '_';
            }
            console.log(this.answer, this.answerArray);
            return generated_word;
        };
    }

    function restart() {
        resetStats();
        resetButtonsPressed();
        document.getElementById("game_over").style.display = "none";
        document.getElementById("game_play").style.display = "none";
        document.getElementById("highScoreDisplay").style.display = "none";
        document.getElementById("startingbuttons").style.display = "block";
        startScreenDisplay();
    }

    function resetStats() {
        answer_array = [];
        score = 0;
        lives = 7;
        hangmanImgUpdate();
        updateScoreLives();
    }

    function updateScoreLives() {
        document.getElementById("score_value").innerHTML = score;
        document.getElementById("lives_value").innerHTML = lives;
    }

    function updateAnswerBank() {
        document.getElementById("answer_bank").innerHTML = wordBank.answerPlacement();
        console.log("answer_array after update: " + wordBank.linesArray); //testing
    }

    function generateWord(category) { // category === onclick elem
        console.log(category, "HEY");
        word = wordBank.popWord();
        let answerPlacement = wordBank.answerPlacement();

        console.log(word, answerPlacement);
        document.getElementById("answer_bank").innerHTML = answerPlacement;
        console.log("answer_array before update: " + wordBank.linesArray); //testing
    }

    function letterButtons() {
        for (let i = 0; i < 26; i++) {
            let letter = String.fromCharCode(65 + i);
            let letterButton = document.createElement("button");
            letterButton.className = "letter_buttons"; //css purposes
            letterButton.innerHTML = letter;
            letterButton.onclick = checkGuess;
            document.getElementById("letter_buttons_block").appendChild(letterButton);
        }
    }

    function resetButtonsPressed() {
        let buttons = document.getElementsByTagName("button");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
        }
    }

    function checkGuess() {
        let wrongSound = new Audio("jayOuch.m4a");
        this.disabled = true; //disables button
        let guess = this.innerHTML.toUpperCase(); //works
        let answerFound = false;
        for (let i = 0; i < word.length; i++) {
            if (word[i] === guess) {
                wordBank.linesArray[i] = guess.toUpperCase();
                score++;
                answerFound = true;
            }
        }
        if (!answerFound) {
            lives--;
            wrongSound.play();
            score--;
        }
        console.log("answer_array: " + wordBank.linesArray); //test
        console.log(lives, score); //test
        updateScoreLives();
        updateAnswerBank();
        console.log(wordBank.checkWordComplete());
        if (wordBank.checkWordComplete()) {
            generateWord(category);
            resetButtonsPressed();
        }
        hangmanImgUpdate();
        if (lives === 0) {
            gameOver();
        }
    }
    let explosion = new Audio("explosion.wav");
    let gameOverImgRef = document.getElementById("game_over_img");
    gameOverImgRef.src = "images/nuclear.gif";
    function gameOverMedia() {
        explosion.play();
        gameOverImgRef.style.display = "block";
        setTimeout(function() {
            gameOverImgRef.style.visibility = "hidden";
        }, 2000);
    }

    function gameOver() {
        gameOverMedia();
        document.getElementById("game_play").style.display = "none";
        document.getElementById("game_over").style.display = "block";
    }

    function hangmanImgUpdate() {
        document.getElementById("hangman").setAttribute("height", "400px");
        document.getElementById("hangman").src = "images/" + String(lives) + ".jpg";
    }

    function clickedCategory(elem) {
        document.getElementById("game_play").style.display = "block";
        document.getElementById("categories").style.display = "none";
        category = elem.textContent;
        // console.log(category, typeof(category)); 
        main();
    }

    function clickedStart() {
        document.getElementById("categories").style.display = "block";
        document.getElementById("startingbuttons").style.display = "none";
    }

    function startScreenDisplay() {
        //document.getElementById("start_screen").style.display = "block";
        document.getElementById("game_over").style.display = "none";
        document.getElementById("game_play").style.display = "none";
        document.getElementById("categories").style.display = "none";
        document.getElementById("highScoreDisplay").style.display = "none";
    }
    letterButtons();
    function main() {
        hangmanImgUpdate();
        wordBank = new Word(category);
        generateWord();
    }
    startScreenDisplay();