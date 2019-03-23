//
// global libs

function sliderInit() {    
    let items = document.getElementsByClassName('js-item');
    let prev = document.getElementsByClassName('js-prev')[0];
    let next = document.getElementsByClassName('js-next')[0];
    let dots = document.getElementsByClassName('js-dots');  
    let currentSlide = 0;  
    let length = items.length;  
    let timerId = setInterval(function() {        
        showSlides(currentSlide,items,dots);
        currentSlide = currentSlide === length - 1 ? 0 : currentSlide + 1;
    }, 4000); 

    function showSlides(n,items,dots) {
        for(let i = 0; i < items.length; i++) {
            items[i].style.display = "none";
            dots[i].classList.remove("active");
        }
        items[n].style.display = "block";
        dots[n].classList.add("active");
    }
    prev.addEventListener('click',function() {
        currentSlide = currentSlide === 0 ? length - 1 : currentSlide - 1;
        showSlides(currentSlide,items,dots);
    });
    next.addEventListener('click',function() {
        currentSlide = currentSlide === length - 1 ? 0 : currentSlide + 1;
        showSlides(currentSlide,items,dots);
    });

    showSlides(currentSlide,items,dots);
}

window.addEventListener('load', function() {
    sliderInit();
});