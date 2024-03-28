// 변수
let x = 0;
let y = 0;
let mx = 0;
let my = 0;
let speed = 0.03;
let scrollTop = 0;
let parallax_0, parallax_1, parallax_2, parallax_3, parallax_4, parallax_5, parallax_6;

window.onload = function() {
    // 가져와
    progressBar = document.getElementsByClassName("progressBar")[0];
    parallax_0 = document.getElementById("parallax_0");
    parallax_1 = document.getElementById("parallax_1");
    parallax_2 = document.getElementById("parallax_2");
    parallax_3 = document.getElementById("parallax_3");
    parallax_4 = document.getElementById("parallax_4");
    parallax_5 = document.getElementById("parallax_5");
    parallax_6 = document.getElementById("parallax_6");

    // 이벤트
    window.addEventListener('resize', stageResize, false);
    window.addEventListener('mousemove', mouseMove, false);
    window.addEventListener('scroll', scrollFunc, false);

    stageResize();
    loop();
}

function scrollFunc(e) {
    // 스크롤값 가져와
    scrollTop = document.documentElement.scrollTop;

    // 스크롤 퍼센테이지 구하기
    let per = Math.ceil(scrollTop / (_documentNum - _windowNum) * 100);

    // 그 퍼센테이지로 화면에 동적구현 ㄷㄷ
    progressBar.style.width = per + "%";
    
    // 가져온 스크롤값으로 동적구현 ㄷㄷ
    // 0은 젤 마지막 배경 .. 위로 올라감 나머지는 아래로 다 다르게
    parallax_0.style.transform = "translate3d(0px, " + scrollTop * .03 + "px, 0px)";
    parallax_1.style.transform = "translate3d(0px, " + -scrollTop * .03 + "px, 0px)";
    parallax_2.style.transform = "translate3d(0px, " + -scrollTop * .12 + "px, 0px)";
    parallax_3.style.transform = "translate3d(0px, " + -scrollTop * .16 + "px, 0px)";
    parallax_4.style.transform = "translate3d(0px, " + -scrollTop * .22 + "px, 0px)";
    parallax_5.style.transform = "translate3d(0px, " + -scrollTop * .25 + "px, 0px)";

}

function stageResize() {
    // 퍼센트를 위해 도큐먼트사이즈랑 윈도우사이즈 가져온것
    _documentNum = document.body.offsetHeight;
    _windowNum = window.outerHeight;
}

function loop() {
    mx += (x - mx) * speed;
    my += (y - my) * speed;

    // 마우스 위치에 따라 좌우 흔들
    // scale의 이유는 끝이 안보이게 하려고
    parallax_4.style.transform = "translate3d(" + mx / 140 + "px ," + -scrollTop * .22 + "px ,0px)";
    parallax_5.style.transform = "scale(1.1) translate("+ mx / 50 + "px ," + -scrollTop * .25 + "px)";
    parallax_6.style.transform = "scale(1.2) translate(" + -mx / 20 + "px ," + -my / 20 + "px)";
  
    window.requestAnimationFrame(loop);
}


function mouseMove (e) {
    // 마우스의 값이 아니라 .. 윈도우크기의 절반을 빼서 ...
    // 정 가운데가 0, 0 이 되도록 한 것 ... 똑똑하다
     x = (e.clientX - window.innerWidth / 2);
     y = (e.clientY - window.innerHeight / 2);
}
