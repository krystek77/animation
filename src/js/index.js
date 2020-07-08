(function () {
    const meet = document.querySelector("#meet");
    const nav = document.querySelector(".site-nav");
    const navScrollHeight = nav.scrollHeight;
    const headerContent = document.querySelector('.header-content');
    const headerCue = document.querySelector('.header-cue');
    const apples = [...document.querySelectorAll('.apple')];

    function inViewport(element, height) {
        const { top, bottom } = element.getBoundingClientRect();
        return (top <= 0 && bottom >= 0 || top <= height && bottom >= height || top > 0 && bottom < height)
    }

    apples.forEach(apple => apple.style.animationDelay = `${Math.random() * 0.3 + 0.5}s`);

    function move() {
        const meetTop = meet.getBoundingClientRect().top;
        const meetOnTop = meetTop - navScrollHeight;
        const pageY = window.pageYOffset;
        const viewportHeight = window.innerHeight;
        apples.forEach(apple => {
            inViewport(apple, viewportHeight) === true ? apple.classList.add('inViewport') : apple.classList.remove('inViewport');
        })

        meetOnTop < 0 ? nav.classList.add("with-background") : nav.classList.remove("with-background");

        const headerContentTop = headerContent.getBoundingClientRect().top;
        headerContentTop < 0 ? headerCue.classList.add('d-none') : headerCue.classList.remove('d-none')
        headerContent.style.transform = `translateY(-${pageY / 1.5}px)`;
        window.requestAnimationFrame(move);

    }
    move();
    //scroll magic library
    const controller = new ScrollMagic.Controller();
    let friendTextTween = gsap.from('.friend-text', {
        y: 400,
        opacity: 0,
        duration: 2,
        ease: 'ease.inOut'
    });
    console.log(friendTextTween)
    new ScrollMagic.Scene({
        triggerElement: '#friend',
        // triggerHook: 0,
        // offset: -80,
        // // duration: 400,
        // reverse: false
    })
        .setTween(friendTextTween)
        .addIndicators({ name: "friend" })
        .addTo(controller);
    //gsap library
    let parachuteTween = new TimelineMax();
    parachuteTween
        .from('#parachute', {
            x: "100%",
            y: "-200%",
            rotation: -40,
            scale: .5,
            opacity: 0
        })
        .to('#parachute', {
            x: "30%",
            y: "20%",
            rotation: -40,
        })
        .to('#parachute', {
            x: "-80%",
            y: "450%",
            rotation: -40,
        })
    let parachuteScene = new ScrollMagic.Scene({
        triggerElement: "#friend",
        // duration: "170%",
        triggerHook: 0
    })
        .setTween(parachuteTween)
        .addIndicators({ name: "parachute" })
        .addTo(controller)

    let types = new TimelineMax();
    types.from('.type', {
        opacity: 0.25,
        scale: 0.9,
        stagger: 0.25
    })

    new ScrollMagic.Scene({
        triggerElement: "#types",
        triggerHook: 0,
        duration: 300
    }).setPin("#types")
        .setTween(types)
        .addIndicators({ name: "type" })
        .addTo(controller)

})()




