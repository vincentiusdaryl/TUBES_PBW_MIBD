//Javascript Code

var counter = document.querySelector('.counter');
let count = 1;

function changeCounter(button){
  if(count>0){
    if(button == add){
      count += 1;
    }else if( button == min ){
      count -= 1;
    }

    counter.innerHTML = count;
  }
}