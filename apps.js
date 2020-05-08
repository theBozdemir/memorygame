const gameContainer = document.getElementById("game");
let first = null;
let sec = null;
let flip = 0;
let noClick = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");

    newDiv.classList.add(color);

    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
 
  if(noClick)
  return;
  if(event.target.classList.contains('flipped'))
  return;

  let card=event.target;
  card.style.backgroundColor=card.classList[0];

  if(!first || !sec){
      card.classList.add('flipped');
      first=first || card;
      sec=card===first?null:card;
  }
  if(first&&sec){
    noClick=true;
      let g1=first.className;
      let g2=sec.className;

    if(g1===g2){
        flip+=2;
        first.removeEventListener('click',handleCardClick);
        sec.removeEventListener('click', handleCardClick)
        first=null;
        sec=null;
        noClick=false
    }
    else{
        setTimeout(function(){
            first.style.backgroundColor="";
            sec.style.backgroundColor="";
            first.classList.remove('flipped');
            sec.classList.remove('flipped');
            first=null;
            sec=null;
            noClick=false;
        },1000);
    }
  }
  if(flip===COLORS.length)
alert("You finished!");
}


createDivsForColors(shuffledColors);
