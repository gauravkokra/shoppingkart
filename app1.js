let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
let cartIcon = document.querySelector('#cart-icon');

//Closing and opening of Cart

cartIcon.addEventListener('click', function() {
    cart.classList.add('active');
})



closeCart.addEventListener('click', function(){
    cart.classList.remove('active');
})


// Addition of Items into Cart


var addCart = document.getElementsByClassName("add-cart");

for (var i=0; i<addCart.length; i++){
    var button = addCart[i];
    button.addEventListener('click', addCartClicked)
}

function addCartClicked(event) {

    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();

}

function addProductToCart(title, price, productImg) {

    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-product-title");

    for (var i=0; i<cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('You already have this item in your Cart!');
            return;
    }
}

var CartBoxContent = `
                        <img src="${productImg}" class="cart-img">

                        <div class="detail-box">

                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">

                        </div>

                        <i class='bx bxs-trash-alt' id = 'cart-remove'></i>`;
                        
cartShopBox.innerHTML = CartBoxContent;
cartItems.append(cartShopBox)
//cartShopBox.getElementsByClassName('#cart-remove')[0].addEventListener('click', removeCartItem)
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
updateTotal();
}

// cartShopBox.innerHTML = CartBoxContent;
// cartItems.append(cartShopBox)
// cartShopBox.getElementsByClassName('#cart-remove')[0].addEventListener('click', removeCartItem)
// cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)

//Removal of Item added


if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}
else {
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName('#cart-remove');
    console.log(removeCartButtons);

    for (var i=0; i<removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
}

function removeCartItem (event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();    //To update Total after removal from Cart
}

//Quantity changing

var quantityInputs = document.getElementsByClassName("cart-quantity");
for (var i=0; i<quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged)
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <1){
        input.value = 1;
    }
    updateTotal();
}

//For Updating of Total

function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;

    for (var i=0; i<cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + price*quantity;

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;

    }

}

// Buy Button working

// document.getElementsByClassName('buy-button')('click', buybuttonClicked)

// function buybuttonClicked (){

//     alert('Your order is placed!')

//     var cartContent = document.getElementsByClassName('cart-content')

// }
