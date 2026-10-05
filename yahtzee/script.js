const NUMBER_OF_DICE = 5;
let count = {};
let worpen = [];
const txtThreeOfAKind = document.getElementById('txtThreeOfAKind');
document.getElementById("txtThreeOfAKind").innerHTML = threeOfAKind();

const txtFourOfAKind = document.getElementById('txtFourOfAKind')
document.getElementById('txtFourOfAKind').innerHTML = fourOfAKind();

//const txtFullHouse = document.getElementById('txtFullHouse')
document.getElementById('txtFullHouse').innerHTML = FullHouse();

const txtKleineStraat = document.getElementById('txtKleineStraat')
document.getElementById('txtKleineStraat').innerHTML = Kleinestraat();

const txtGrotestraat = document.getElementById('txtGrotestraat')
document.getElementById('txtGrotestraat').innerHTML = Grotestraat();


const txtTopscore = document.getElementById('txtTopscore')
document.getElementById('txtTopscore').innerHTML = topscore();

const txtChange = document.getElementById('txtChange');
document.getElementById('txtChange').innerHTML = Change();

const txtTotaalOnder = document.getElementById('txtTotaalOnder');
document.getElementById('txtTotaalOnder').innerHTML = TotaalOnder();

const txtTotaalboven = document.getElementById('txtTotaalboven');
document.getElementById('txtTotaalboven').innerHTML = TotaalBoven();

const txtTotaalGeneraal = document.getElementById('txtTotaalGeneraal');
document.getElementById('txtTotaalGeneraal').innerHTML = TotaalGeneraal();


function Gegooied() {
    worpen = [];

    for (let i = 0; i < NUMBER_OF_DICE; i++) {
        let worp = Math.floor(Math.random() * 6) + 1;
        worpen.push(worp);
    }

    console.log(worpen);

}

function firstBlock() {
    count = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
    };

    for (let worp of worpen) {
        count[worp]++;
    }

    console.table(count);

    let cellen = document.getElementsByClassName("count");

    for (let worp in count) {
        cellen[worp - 1].innerHTML = count[worp] * worp;
    };
}

function secondBlock() {
    // todo: roep alle scores uit 2e blok aan en zet ze in 2e tabel
    txtThreeOfAKind.innerHTML = threeOfAKind();
    txtFourOfAKind.innerHTML = fourOfAKind();
    txtFullHouse.innerHTML = FullHouse();
    txtKleineStraat.innerHTML = Kleinestraat();
    txtGrotestraat.innerHTML = Grotestraat();
    txtTopscore.innerHTML = topscore();
    txtChange.innerHTML = Change();
    txtTotaalOnder.innerHTML = TotaalOnder();
    txtTotaalboven.innerHTML = TotaalBoven();
    txtTotaalGeneraal.innerHTML = TotaalGeneraal();
}

// todo: maak voor iedere rij (score) in de 2e tabel een eigen functie die kijkt of die combinatie van stenen voorkomt
function threeOfAKind() {
    const diceCounts = Object.values(count);
    const filteredDiceCounts = diceCounts.filter((item) => item === 3);

    if (filteredDiceCounts.length > 0) {
        return diceSum();
    } else {
        return 0;
    }
}
// four of kind functie maken
function fourOfAKind() {
    const diceCounts = Object.values(count);
    const filteredDiceCounts = diceCounts.filter((item) => item === 4);

    if (filteredDiceCounts.length > 0) {
        return diceSum();
    } else {
        return 0;
    }
}

function FullHouse() {
    const diceCounts = Object.values(count);

    const threeofakind = diceCounts.includes(3)
    const twoofakind = diceCounts.includes(2)

    if (threeofakind && twoofakind) {
        return 25;
    } else {
        return 0;
    }
}

function Kleinestraat() {
    if (
        count[1] && count[2] && count[3] && count[4] ||
        count[2] && count[3] && count[4] && count[5] ||
        count[3] && count[4] && count[5] && count[6]
    ) {
        return 30;
    }
    return 0;
}

function Grotestraat() {
    if (
        count[1] && count[2] && count[3] && count[4] && count[5] ||
        count[2] && count[3] && count[4] && count[5] && count[6]

    ) {
        return 40;
    }
    return 0;
}


function topscore() {
    const diceCounts = Object.values(count);
    const filteredDiceCounts = diceCounts.filter((item) => item === 5);

    if (filteredDiceCounts.length > 0) {
        return 50;
    } else {
        return 0;
    }
}

function Change() {
    return diceSum();
}

function TotaalOnder() {
    return (
        threeOfAKind() +
        fourOfAKind() +
        FullHouse() +
        Kleinestraat() +
        Grotestraat() +
        topscore() +
        Change()
    )

}

function TotaalBoven() {
    return diceSum();
}


function TotaalGeneraal() {
    return (
        threeOfAKind() +
        fourOfAKind() +
        FullHouse() +
        Kleinestraat() +
        Grotestraat() +
        topscore() +
        Change() +
        TotaalBoven()
    )
}


// todo: maak functie die totaal van alle ogen returned (gebruik reduce functie)
function diceSum() {
    return worpen.reduce((acc, curr) => {
        return acc + curr;
    }, 0);
}



let element = document.getElementById("Gooien");

element.addEventListener("click", () => {
    Gegooied();
    firstBlock();
    secondBlock();
});