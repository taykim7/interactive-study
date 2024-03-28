// 변수
let x = 0;
let y = 0;
let mx = 0;
let my = 0;
let speed = 0.05;
let scrollTop = 0;
let parallax_0, parallax_1, parallax_2, parallax_3, parallax_4, parallax_5, parallax_6;

window.onload = function(){
    progressBar = document.getElementsByClassName("progressBar")[0];
    parallax_0 = document.getElementById("parallax_0");
    parallax_1 = document.getElementById("parallax_1");
    parallax_2 = document.getElementById("parallax_2");
    parallax_3 = document.getElementById("parallax_3");
    parallax_4 = document.getElementById("parallax_4");
    parallax_5 = document.getElementById("parallax_5");
    parallax_6 = document.getElementById("parallax_6");

    window.addEventListener('mousemove', mouseMove, false);

    loop();
}

function loop() {
    mx += (x - mx) * speed;
    my += (y - my) * speed;

    // 마우스 위치에 따라 좌우 흔들
    // scale의 이유는 끝이 안보이게 하려고
    parallax_3.style.transform = "translate3d(" + mx / 140 + "px ," + -scrollTop * .22 + "px ,0px)";
    parallax_4.style.transform = "scale(1.0) translate("+ mx / 50 + "px ," + -scrollTop * .25 + "px)";
    parallax_5.style.transform = "scale(1.0) translate(" + -mx / 20 + "px ," + -my / 20 + "px)";
  
    window.requestAnimationFrame(loop);
}

function mouseMove (e) {
    // 마우스의 값이 아니라 .. 윈도우크기의 절반을 빼서 ...
    // 정 가운데가 0, 0 이 되도록 한 것 ... 똑똑하다
     x = (e.clientX - window.innerWidth / 2);
     y = (e.clientY - window.innerHeight / 2);
}