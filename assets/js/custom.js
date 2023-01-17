window.addEventListener('load', function () {

    // scroll spy and start animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            var blinkItem = entry.target.querySelectorAll('path');
            if (entry.isIntersecting) {
                blinkEf(blinkItem, 10);
                if (entry.target.classList.contains('comet')) {
                    blinkEf(blinkItem, 2);
                }
            }
        });
    });
    
    const scrollSpyElements = document.querySelectorAll('.scroll-spy')
    scrollSpyElements.forEach((el) => observer.observe(el));
    
    // white blinks effect
    function blinkEf(blinkItems, timeOut) {
        blinkItems.forEach((element, blinkItems) => {
            setTimeout( () => {
                element.classList.add('white-blink--active');
            }, blinkItems * timeOut);
        });  
    }

    // country-slider
    var slider = tns({
        container: '.country-slider',
        slideBy: 2,
        autoplay: true,
        autoplayTimeout: 5000,
        mouseDrag: true,
        autoWidth: true,
        controls: false,
        nav: false,
        loop: true,
        rewind: false,
        autoplayButtonOutput: false,
        autoplayResetOnVisibility: false,
        gutter: 20,
        responsive: {
            350: {
              items: 3,
            },
            500: {
              items: 4
            },
            1024: {
                items: 5
            },
            1280: {
                items: 6
            }
          },
    });

})

