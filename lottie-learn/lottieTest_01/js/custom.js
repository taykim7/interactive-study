    var params = {
        container: document.getElementById('lottie'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        //animationData: animationData
        path: 'data/data.json'
    };

    var anim;

    anim = lottie.loadAnimation(params);