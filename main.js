const d = document;

//Cambio de cantidad de articulos ingresado por el usuario
const $userInput = d.querySelector('.input__number'),
$minusBtn = d.querySelector('.input__minus'),
$plusBtn = d.querySelector('.input__plus');

let userInputNumber = 0;

$plusBtn.addEventListener('click', ()=>{
    userInputNumber++;
    $userInput.value = userInputNumber;
});

$minusBtn.addEventListener('click', ()=>{
    if(!userInputNumber == 0) userInputNumber--;
    $userInput.value = userInputNumber;
})




//Agregar el total de productos al carrito cuando se presiona el boton ADD TO CART
const $addToCartBtn = d.querySelector('.details__button'),
$cartNotification = d.querySelector('.header__cart--notification');
let lastvalue = 0

$addToCartBtn.addEventListener('click', ()=>{
    lastvalue = lastvalue + userInputNumber;
    $cartNotification.textContent = lastvalue;
    
    lastvalue != 0
    ?$cartNotification.style.display = 'block'
    :$cartNotification.style.display = 'none';
    drawProductInModal();
    //$priceModal.innerHTML =`$125 x${lastvalue} <span>$${lastvalue*125}.00</span>`;
    
})




//Mostrar el modal con el detalle del carrito
const $cartIconBtn = d.querySelector('.header__cart'),
$cartModal = d.querySelector('.cart-modal'),
$productContainer = d.querySelector('.cart-modal__checkout-container');


$cartIconBtn.addEventListener('click', ()=>{
    $cartModal.classList.toggle('d-block');

    if(lastvalue > 0){
        drawProductInModal()
    } else{
        $productContainer.innerHTML = '<p class="cart-modal__empty">Your cart is empty!</p>';
    }
})




//Borrar el contenido del carrito
function deleteProduct(){
    const $deleteProductBtn = d.querySelector('.cart-modal__delete');

    $deleteProductBtn.addEventListener('click',()=>{
        $productContainer.innerHTML = '<p class="cart-modal__empty">Your cart is empty!</p>';
        lastvalue = 0;
        $cartNotification.textContent = lastvalue;
        $cartNotification.style.display = 'none';
    })   
}




//Cambiar las imagenes cuando se presionen los botones flecha
const $imageContainer = d.querySelector('.gallery__image-container'),
$nextGalleryBtn = d.querySelector('.gallery__next'),
$prevGalleryBtn = d.querySelector('.gallery__prev');
let imageIndex = 1;

$nextGalleryBtn.addEventListener('click', ()=>{
    changeImageIndex($imageContainer,1);
})

$prevGalleryBtn.addEventListener('click', ()=>{
    changeImageIndex($imageContainer,-1);
})





//Mostrar el modal de imagenes cuando haga click en la imagen principal
const $modalGallery = d.querySelector('.modal-gallery__background'),
$modalGalleryClose = d.querySelector('.modal-gallery__close'),
$body = d.querySelector('body');

$imageContainer.addEventListener('click', ()=>{
    if(window.innerWidth >= 1115){
        $modalGallery.style.display = 'flex';
        $body.style.overflow = 'hidden';
    }
    
})

$modalGalleryClose.addEventListener('click', ()=>{
    $modalGallery.style.display = 'none';
    $body.style.overflow = 'initial';
})




//Cambiar las imagenes desde los thumbnails
const $thumbnails = d.querySelectorAll('.gallery__thumbnail');

$thumbnails.forEach( $thumbnail => {
    $thumbnail.addEventListener('click', e =>{
        let thumbNumber = e.target.id.slice(1)
        $imageContainer.style.backgroundImage = `url(../images/image-product-${thumbNumber}.jpg)`;
    })
})




//Cambiar las imagenes desde los thumbnails del MODAL
const $modalThumbnails = d.querySelectorAll('.modal-gallery__thumbnail'),
$modalImageContainer = d.querySelector('.modal-gallery__image-container');

$modalThumbnails.forEach( $thumbnail => {
    $thumbnail.addEventListener('click', e =>{
        let thumbNumber = e.target.id.slice(1)
        $modalImageContainer.style.backgroundImage = `url(../images/image-product-${thumbNumber}.jpg)`;
    })
})




//Cambiar imagen principal del modal gallery con las flechas
const $nextModalGalleryBtn = d.querySelector('.modal-gallery__next'),
$prevModalGalleryBtn = d.querySelector('.modal-gallery__prev');
//let modalImageIndex = 1;

$nextModalGalleryBtn.addEventListener('click', ()=>{
    changeImageIndex($modalImageContainer,1);
})

$prevModalGalleryBtn.addEventListener('click', ()=>{
    changeImageIndex($modalImageContainer,-1);
})




//Mostrar el navbar cuando presiono el boton menu hamburguesa
const $btnMenu = d.querySelector('.header__menu'),
$modalNavbar = d.querySelector('.modal-navbar__background'),
$modalNavbarClose = d.querySelector('.modal-navbar__close-icon');

$btnMenu.addEventListener('click', ()=>{
    $modalNavbar.classList.add('move-x');
})

$modalNavbarClose.addEventListener('click', ()=>{
    $modalNavbar.classList.remove('move-x');
})

///FUNCIONES
function drawProductInModal(){
    $productContainer.innerHTML = `
        <div class="cart-modal__details-container">
          <img class="cart-modal__image" src="./images/image-product-1-thumbnail.jpg">
          <div>
            <p class="cart-modal__product">Autum Limited Edition...</p>
            <p class="cart-modal__price">$125 x3 <span>$375.00</span></p>
          </div>
          <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="delete">
        </div>
        <button class="cart-modal__checkout-btn">Checkout</button>`;
        deleteProduct();
        $priceModal = d.querySelector('.cart-modal__price');
        $priceModal.innerHTML =`$125 x${lastvalue} <span>$${lastvalue*125}.00</span>`;
}

function changeImageIndex(container,x){
    imageIndex += x;
    if (imageIndex > 4) imageIndex = 1
    if (imageIndex < 1) imageIndex = 4
    container.style.backgroundImage = `url(../images/image-product-${imageIndex}.jpg)`;
}