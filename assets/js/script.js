$(document).ready(function(){

    // Toggle Search Function 
    $('#search-icon').click(() => {
        const headerSearch = $('.header__search');
        headerSearch.toggleClass('show');
    });

    // Close Search Function
    $('#close-search').click(() => {
        const headerSearch = $('.header__search');
        headerSearch.removeClass('show');
    });

    // Toggle Shopping Cart Function
    $('#shopping-cart').click(() => {
        const shoppingCart = $('.shopping-cart');
        shoppingCart.toggleClass('show');
    });


    $('.count-minus').click(function(){
        let productCount = $(this).siblings('input[type="number"]');

        let productPrice = $(this).closest('.shopping-cart__input').siblings('.shopping-cart__price').children('span');
        let price = Number(productCount.data('price'));

        if(Number(productCount.val()) > 1){
            let productCountValue = Number(productCount.val()) + -1;
            productCount.val(productCountValue);
            productPrice.html((Number(productCount.val()) * price).toFixed(2));
        }

        

    });

    $('.count-plus').click(function(){
        let productCount = $(this).siblings('input[type="number"]');

        let productPrice = $(this).closest('.shopping-cart__input').siblings('.shopping-cart__price').children('span');
        let price = Number(productCount.data('price'));

        let productCountValue = Number(productCount.val()) + 1;

        productCount.val(productCountValue);
        productPrice.html((Number(productCount.val()) * price).toFixed(2));


        productCount.val(productCountValue);
    });

});