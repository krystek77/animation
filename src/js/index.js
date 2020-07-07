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


})()




