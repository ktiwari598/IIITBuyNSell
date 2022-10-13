const flipCard = (element) => {
    let firstParent = element.parentElement;
    let product = firstParent.parentElement;
    if(firstParent.classList.contains('front-product')) {
        product.style.transform = 'rotateY(180deg)';
    }
    else {
        product.style.transform = 'rotateY(0deg)';
    }
}