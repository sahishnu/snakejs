function setup(){hpadding=windowWidth-windowWidth%scl,vpadding=windowHeight-windowHeight%scl,createCanvas(hpadding,vpadding);var e={apiKey:"AIzaSyDS6UXulI-e_xed3iQx1HWUk-6mF6CKw4A",authDomain:"snekjs-932e0.firebaseapp.com",databaseURL:"https://snekjs-932e0.firebaseio.com",storageBucket:"snekjs-932e0.appspot.com",messagingSenderId:"600064049611"};firebase.initializeApp(e),database=firebase.database(),vex.dialog.prompt({message:"Enter your name:",callback:function(e){e?(name=e,console.log("Successful"),modelout=!0):console.log("Error.")}});var a=database.ref("scores");a.on("value",gotData,errData),snake=new Snake,food=new Food,frameRate(level),temphighscore=0}function draw(){if(background(50),snake.update(),snake.show(),snake.crash(),food.show(),tmphighscore(),mutex=!1,snake.eat(food)){food.pickLocation();for(var e=createVector(food.x,food.y),a=0;a<snake.tail.length;a++){var t=createVector(snake.tail[a].x,snake.tail[a].y),s=dist(e.x,e.y,t.x,t.y);3>s&&(console.log("Oops"),food.pickLocation())}nextLevel(),frameRate(level)}snake.gameOver&&(snake.score>temphighscore&&(temphighscore=snake.score),abcxyz(snake.score),level=10,frameRate(level),snake.gameOver=!1)}function tmphighscore(){textAlign(CENTER),textSize(20),fill(65),text(temphighscore,width/2,height/2+height/22)}function keyPressed(){modelout&&!mutex&&(mutex=!0,keyCode==UP_ARROW||87==keyCode?snake.dir(0,-1):keyCode==DOWN_ARROW||83==keyCode?snake.dir(0,1):keyCode==LEFT_ARROW||65==keyCode?snake.dir(-1,0):(keyCode==RIGHT_ARROW||68==keyCode)&&snake.dir(1,0))}function nextLevel(){0==count?(frameRate(level++),count=5):count--}function abcxyz(e){var a={name:name,score:e},t=database.ref("scores");t.push(a)}function gotData(e){for(var a,t=e.val(),s=Object.keys(t),n=t[s[0]].score,o=0;o<s.length;o++){var r=s[o],i=t[r].score;i>n&&(n=i,a=t[r].name)}var c=document.getElementsByClassName("user-name")[0],d=document.getElementsByClassName("user-score")[0],l=document.getElementsByClassName("snakes-killed-number")[0];c.innerHTML=a,d.innerHTML=n,l.innerHTML=s.length}function errData(e){console.log("Error"),console.log(e)}function getHighestScore(){var e=new XMLHttpRequest;e.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var a=JSON.parse(e.responseText),t=document.getElementsByClassName("user-name")[0],s=document.getElementsByClassName("user-score")[0];a&&a.length>0&&a[0]&&(t.innerHTML=a[0].user,s.innerHTML=a[0].score)}},e.open("GET","http:sbodiwala:3000/api/getHighestScore",!0),e.send()}function setNewHighScore(e){var a=new XMLHttpRequest;a.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=JSON.parse(a.responseText),t=document.getElementsByClassName("user-name")[0],s=document.getElementsByClassName("user-score")[0];e&&e.length>0&&e[0]&&(t.innerHTML=e[0].user,s.innerHTML=e[0].score)}},a.open("POST","http:sbodiwala:3000/api/addHighScore",!0),a.setRequestHeader("Content-Type","application/json; charset=UTF-8"),a.send(JSON.stringify({user:name,score:e})),getHighestScore()}var snake,scl=40,food,joystick,name,level=10,count=5,database,modelout=!1,mutex=!1,hpadding,vpadding,temphighscore;