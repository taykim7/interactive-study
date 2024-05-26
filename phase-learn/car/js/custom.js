var ani = document.getElementById('lottie');

var params = bodymovin.loadAnimation({
    container: ani,
    path: 'data/car_lottie.json',
    renderer: 'svg',
    loop: true,
    autoplay: false,
    //animationData: animationData
});

ani.addEventListener('click', () => {
  params.goToAndPlay(0, 0)
});
