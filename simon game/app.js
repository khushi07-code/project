let gameSeq=[];
let userSeq=[];
let highScore=0;

let btns=["yellow","red","green","purple"];

let started=false;
let level=0;

let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false){
        started=true;
        console.log("game start");
    }
    levelUp();
  
})
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    },250);
}function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(()=>{
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randidx=Math.floor(Math.random()*4);
    let randcolor=btns[randidx];
    let randBtn=document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);
    console.log("game:",gameSeq);
    gameFlash(randBtn);

}
function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        console.log("user:",userSeq);
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000 );
        }
    }else{
        if(highScore<level){
            highScore=level;
        }
        h2.innerHTML=`Game over!  <b> your score was ${level}</b> <b>high score was ${highScore}</b> <br>press any key to start game`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}
function btnPress(){
    let btn=this;
    userFlash(btn);
    userColor=btn.id;
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    level=0;
    started=false;
    gameSeq=[];
}