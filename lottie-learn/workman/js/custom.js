var ani = document.getElementById('lottie');

var params = bodymovin.loadAnimation({
    container: ani,
    path: 'data/data.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
    //animationData: animationData
});

ani.addEventListener('click', () => {
  params.goToAndPlay(0, 0)
});