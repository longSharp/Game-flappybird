window.onload = function () {
    let canv = document.querySelector("canvas"),
        conText = canv.getContext("2d"),
        mark = document.querySelector(".mark"),
        dataBox = document.querySelector(".data"),
        markH1=document.querySelector("h1"),
        markImg=document.querySelector(".markWrap img"),
        btn=document.querySelector(".btn"),
        bgI=document.querySelector(".bgI");

    let birdImg = new Image();
    let bgX=0;
    let birdX=100,birdY=100,birdTimer=null,bgxTimer;
    let markS=0;
    birdImg.src = "images/flappybird/bird0_0.png";
    birdImg.onload = function () {
        if(birdTimer==null){
            birdTimer=setInterval(function(){
                if(birdY<=355){
                    birdY++;
                }
                conText.clearRect(0,0,canv.width,canv.height);
                drawColumn();
                conText.drawImage(birdImg, birdX, birdY);
            },10 );
        }
    }

    function bgMove(){
        bgxTimer=setInterval(function(){
            bgX--;
            canv.style.backgroundPositionX=`${bgX}px`;
            bgI.style.backgroundPositionX=`${bgX}px`;
        },10);
    }

    bgMove();

    document.onmousedown=function(){
        birdImg.src = "images/flappybird/bird0_2.png";
        birdY-=34;
    }

    document.onmouseup=function(){
        birdImg.src = "images/flappybird/bird0_0.png";
    }

    function rand(min,max){
        return Math.random()*(max-min)+min;
    }

    let columnArr=[];
    let columnTimer;
    let same=null;

    function createColumn() {
        columnTimer = setInterval(function () {
            let column = {};
            column.positionX = 800;
            column.positionY = -Math.round(rand(150,300));
            // console.log(column.positionY)
            column.columnA = new Image();
            column.columnB = new Image();
            column.columnA.src = "images/flappybird/pipe_down.png";
            column.columnB.src = "images/flappybird/pipe_up.png";
            column.id = new Date().getTime();
            columnArr.push(column);
            // console.log(columnArr)
        }, 2000);
    }
    createColumn();



    function drawColumn(){
        for(let i=0;i<columnArr.length;i++){
            columnArr[i].positionX--;
            conText.drawImage(columnArr[i].columnA,columnArr[i].positionX,columnArr[i].positionY);
            conText.drawImage(columnArr[i].columnB,columnArr[i].positionX,columnArr[i].positionY+420);
            if(birdX+38>=columnArr[i].positionX&&birdX-52<=columnArr[i].positionX){
                if(columnArr[i].id!=same){
                    markS++;
                    same=columnArr[i].id;
                    mark.innerHTML="得分："+markS;
                    
                }
                if(birdY+10<columnArr[i].positionY+320||birdY+38>columnArr[i].positionY+420){
                    clearInterval(birdTimer);
                    clearInterval(columnTimer);
                    clearInterval(bgxTimer);
                    // console.log(1)
                    dataBox.classList.add("active");
                    markH1.innerHTML=`得分：${markS}`;
                    if(markS>0&&markS<10){
                        markImg.src="images/flappybird/medals_0.png";
                    }
                    if(markS>10&&markS<50){
                        markImg.src="images/flappybird/medals_1.png";
                    }
                    if(markS>50&&markS<100){
                        markImg.src="images/flappybird/medals_2.png";
                    }
                    if(markS>100){
                        markImg.src="images/flappybird/medals_3.png";
                    }
                    btn.onmouseenter=function(){
                        this.children[0].src="images/flappybird/play2.jpg";
                        this.onmouseleave=function(){
                            this.children[0].src="images/flappybird/play1.jpg";
                        }
                    }
                    btn.onclick=function(){
                        location.reload();
                    }
                }
            }
        }
    }
}