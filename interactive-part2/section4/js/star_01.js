

//https://www.youtube.com/watch?v=lyf7UkkcI1I
//[스타벅스 현대카드] 별이 쏟아지는, 스타벅스 현대카드]

window.onload = function(){

    var starBg = document.querySelector(".starBg");
    var title = document.querySelector(".title");

    //스크롤 이벤트
    window.addEventListener("scroll", function(event){
        // scrollTop = document.documentElement.scrollTop;
        
        // 한번 스크롤하면 100~200 정도
        var scroll = this.scrollY;
        // console.log(scrollY / 5)

        // 스크롤 차이를 줘서 입체감을 줌
        starBg.style.transform = "translateY("+ -scroll/3 +"px)";
        title.style.transform = "translateY("+ scroll/1.7 +"px)";
    });

    // 2초 뒤 스크롤 이동
    setTimeout(function(){
        // 방법 1 -- .bottom이 top으로 가라
        window.scrollTo({
            top: document.querySelector('.bottom').offsetTop
            ,behavior: 'smooth'
        });
        
        // 방법 2 -- .bottom 을 바로 보러 감
        // document.querySelector('.bottom').scrollIntoView({ behavior: 'smooth' });

    }, 2000)
}


