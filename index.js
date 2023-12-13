let deckId
let playerScore = 0
let computerScore = 0
const newDeckBtn = document.getElementById("new-deck-btn")
const remainingCards = document.getElementById("remaining-cards")
const drawCardsBtn = document.getElementById("draw-cards-btn")
const cardsContainer = document.getElementById("cards-container")
const header = document.getElementById("header")
const heaer = document.getElementById("header")
const computerScoreEl = document.getElementById("computer-score-el")
const playerScoreEl = document.getElementById("player-score-el")

newDeckBtn.addEventListener("click", getNewDeck)

function getNewDeck(){
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle")
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id   
            remainingCards.textContent = `Remaining Cards: ${data.remaining}`
            
            cardsContainer.children[0].innerHTML = ""
            cardsContainer.children[1].innerHTML = ""
            playerScore = 0
            computerScore = 0
            computerScoreEl.textContent = `Computer AI score: ${computerScore}`
            playerScoreEl.textContent = `Scrimba score: ${playerScore}`
        })
}

drawCardsBtn.addEventListener("click", handleDraw2Cards)

function handleDraw2Cards(){
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(response => response.json())
        .then(data => {
            cardsContainer.children[0].innerHTML = `
                <img class="card-img" src=${data.cards[0].image}>
                `
            cardsContainer.children[1].innerHTML = `
                <img class="card-img" src=${data.cards[1].image}>
                `
            remainingCards.textContent = `Remaining Cards: ${data.remaining}`
            
            header.textContent = determineCardWinner(data.cards[0], data.cards[1])
            computerScoreEl.textContent = `Computer AI score: ${computerScore}`
            playerScoreEl.textContent = `Scrimba score: ${playerScore}`
            
            if(data.remaining === 0){
                drawCardsBtn.disabled = true;
                
                if(computerScore > playerScore){
                    header.textContent = "THE ULTIMATE WINNER IS THE COMPUTER AI"
                }
            
                else if(computerScore < playerScore){
                    header.textContent = "THE ULTIMATE WINNER IS THE SCRIMBA STUDENT"
                }
                else{
                    header.textContent = "THERE COULD BE NO WINNER.."
                }
            }
        })
}

function determineCardWinner(card1, card2){
    const valueOptions = {
        1:1,
        2:2,
        3:3,
        4:4,
        5:5,
        6:6,
        7:7,
        8:8,
        9:9,
        10:10,
        JACK:11,
        QUEEN:12,
        KING:13,
        ACE:14
    }
    
    const card1value = valueOptions[card1.value]
    const card2value = valueOptions[card2.value]

    if(card1value > card2value){
        computerScore ++
        return "COMPUTER AI WINS THIS ROUND..."
    }
    else if(card2value > card1value){
        playerScore ++
        return "SCRIMBA STUDENT WINS THIS ROUND..."
    }
    else{
        return "THIS IS WAR, NO VICTOR..."
    }
}