//
// global libs

function sliderInit() {    
    let items = document.getElementsByClassName('js-item');
    let prev = document.getElementsByClassName('js-prev')[0];
    let next = document.getElementsByClassName('js-next')[0];
    let dots = document.querySelectorAll('.js-dots');  
    let currentSlide = 0;  
    let length = items.length;  
    setInterval(function() {
        showSlides(currentSlide,items,dots);
        currentSlide = currentSlide === length - 1 ? 0 : currentSlide + 1;
    }, 4000); 
    function showSlides(n,items,dots) {
        for(let i = 0; i < items.length; i++) {
            items[i].style.display = 'none';
            dots[i].classList.remove('active');
        }
        items[n].style.display = 'block';
        dots[n].classList.add('active');
    }
    [prev,next].forEach(function(item) {
        item.addEventListener('click',function() {
            let state = this.classList.contains('js-prev') ? (currentSlide === 0 ? length - 1 : currentSlide - 1) : (currentSlide === length - 1 ? 0 : currentSlide + 1);
            currentSlide = state;
            showSlides(currentSlide,items,dots);
        });
    });
    dots.forEach(function(dot) {
        dot.addEventListener('click',function() {
            dots.forEach( _ => _.classList.remove('active'));
            this.classList.add('active');
            showSlides([].indexOf.call(dots,this),items,dots);
        });
    });

    showSlides(currentSlide,items,dots);
}

window.addEventListener('load', function() {
    sliderInit();
});