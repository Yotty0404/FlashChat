function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const roles = ["top","jg","mid","ad","sup"];
let isInputMode = false;
let timer = new Date('2000-1-1 0:1:0');
let flashTimeByRoles = [0,0,0,0,0];

$("body").keypress(function(e) {
  if (e.keyCode == 13) {
    if(isInputMode){
      isInputMode = false;
      const inputText = $("input").val();
      $("input").prop('disabled', true);
      $("input").val("");

      if(inputText != ""){
        $('input').before(`<div><span style="color: #2E9AFE;">You:</span>${inputText}</div>`);
        ShowFlashLog();
      }
    }
    else{
      isInputMode = true;
      $("input").prop('disabled', false);
      $("input").focus();
    }
  }
});

ShowFlashLog();

async function ShowFlashLog(){
  await sleep(1000);
  let roleNo = 0;
  
  while(true){
    roleNo = getRandomInt(5);
    AdvanceTimer();
    if(flashTimeByRoles[roleNo] == 0) break;
    
    var diff = timer.getTime() - flashTimeByRoles[roleNo].getTime();
    diff = diff / 1000
    if(diff < 300){
      continue;
    }
    
    if(timer.getMinutes() > 60){
      timer = new Date('2000-1-1 0:1:0');
      flashTimeByRoles = [0,0,0,0,0];
      continue;
    }
    
    break;
  }
  
  flashTimeByRoles[roleNo] = new Date(timer.getTime());
  let time = ('00' + timer.getMinutes()).slice(-2) + ":" + ('00' + timer.getSeconds()).slice(-2);
  let role = roles[roleNo];
  $('input').before(`<div>[${time}] <span style="color: red;">${role} </span><span style="color: #E59D00;">フラッシュ</span></div>`);
}

function AdvanceTimer(){
  const tempTimer = new Date(timer.getTime());
  while(tempTimer >= timer){
    timer.setMinutes(timer.getMinutes() + getRandomInt(3));
    timer.setSeconds(timer.getSeconds() + getRandomInt(60));
  }
}
