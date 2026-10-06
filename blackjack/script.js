let DealerHand = [];
let PlayerHand = [];

const imgscr = "52-kaarten/";
const Nummers = ['aas', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const Rangen = ['klaveren', 'harten', 'ruiten', 'schoppen'];
const Hofkaarten = ['boer', 'vrouw', 'heer'];


function newdeck() {
    const deck = [];
    for (const nummer of Nummers) {
        for (const rang of Rangen) {
            const kaart = {
                waarde: nummer,
                rang: rang
            };

            deck.push(kaart);
        }
    }

    for (const hof of Hofkaarten) {
        for (const rang of Rangen) {
            const kaart = {
                waarde: hof,
                rang: rang
            };

            deck.push(kaart);
        }
    }

    return deck;
}

const deck = newdeck();
console.log(deck);

function drawcard() {
    if (deck.length === 0) {
        return 0;
    }
    const randomkaart = Math.floor(Math.random() * deck.length);
    const kaart = deck.splice(randomkaart, 1)[0]

    const img = document.createElement("img");

    img.src = `${imgscr}${kaart.waarde} ${kaart.rang}.png`;
    img.width = 125;
    img.height = 200;



    return kaart;

}

function delen() {
    const dealerkaart1 = drawcard();
    const playercard1 = drawcard();

    const dealerverborgen2 = drawcard();
    const playercard2 = drawcard();

    DealerHand = [dealerkaart1, dealerverborgen2];
    PlayerHand = [playercard1, playercard2];

    console.log(dealerkaart1);
    console.log(dealerverborgen2);

    console.log(playercard1);
    console.log(playercard2);

    console.log(berekenScore)
    console.log(toonSpelerscore())

    deelknop.textContent = 'Hit';
    deelknop.onclick = hit;

    Pas.style.display = 'inline-block'
}

function hit() {
    const nieuwekaart = drawcard();

    PlayerHand.push(nieuwekaart);

    console.log(PlayerHand);

}

function pas() {
    const nieuwekaart = drawcard();

    DealerHand.push(nieuwekaart);

    console.log(DealerHand);
}

const pasKnop = document.getElementById('Pas');

pasKnop.onclick = pas;

const deelknop = document.getElementById('Delen');

deelknop.textContent = 'Delen';
deelknop.onclick = delen;

function berekenScore(hand) {
    let score = 0;
    let aantalazen = 0;

    for (const kaart of hand) {
        if (kaart.waarde === 'aas') {
            score += 11;
            aantalazen++;
        } else if (['boer', 'vrouw', 'heer'].includes(kaart.waarde)) {
            score += 10;
        } else {
            score += Number(kaart.waarde);
        }
    }

    while (score > 21 && aantalazen > 0) {
        score -= 10;
        aantalazen--;
    }

    return score;
}

function toonSpelerscore() {
    const score = berekenScore(PlayerHand);

    if (score === 21) {
        'Blackjack Je hebt gewonnen.';
        deelknop.disabled = true;
        pasKnop.style.display = 'none';
    } else if (score > 21) {
        'Je hebt verloren';
        deelknop.disabled = true;
        pasKnop.style.display = 'none';
    }

    document.getElementById('score').textContent = `Jouw Kaarten: ${score}`;
}

