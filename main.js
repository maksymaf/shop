let cart = []; // cart array
let cnt = 0;

// getting products

async function getProducts(id='') {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const products = await response.json();
    return products;
}

// rendering products 

async function renderProducts() {
    const productContainer = document.querySelector('.products-container');
    const products = await getProducts();
    products.forEach(item => {
        // product item
        const productItem = document.createElement('div');
        productItem.id = item.id;
        productItem.classList.add('product-item'); // adding the class
        // product title
        const productTitle = document.createElement('h3');
        productTitle.innerHTML = item.title;
        // product image
        const productImage = document.createElement('img');
        productImage.src = item.image;
        // product description
        const productDescription = document.createElement('p');
        productDescription.innerHTML = item.description;
        // product price
        const productPrice = document.createElement('p');
        productPrice.style.color = 'green';
        productPrice.style.fontSize = '1.5em';
        productPrice.style.fontWeight = '700';
        productPrice.style.marginTop = '10px';
        productPrice.innerHTML = '$' + item.price;
        // add-to-card btn

        const container = document.createElement('div');
        container.classList.add('price-container');
        
        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = '+';
        addToCartBtn.classList.add('add-to-cart-button');

        addToCartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productsAmount = document.querySelector('.products-amount');
            
            productsAmount.innerHTML = ++cnt;
            addToCart(item);
        });

        container.appendChild(productPrice);
        container.appendChild(addToCartBtn);

        productItem.appendChild(productImage);
        productItem.appendChild(productTitle);
        productItem.appendChild(productDescription);
        productItem.appendChild(container);
        productContainer.appendChild(productItem);
    });
}

const attachProductPopUpLogic = async () => {
    const promiseAwait = await renderProducts();
    const popUp = document.querySelector('.pop-up');
    const products = document.getElementsByClassName('product-item');
    const productTitle = document.querySelector('.pop-up-product-title');
    const productImage = document.querySelector('.pop-up-product-image');
    const productDescription = document.querySelector('.pop-up-product-description');
    const priceContainer = document.querySelector('.price-container');
    priceContainer.classList.add('price-container');
    const productPrice = document.querySelector('.product-price');

    const close = document.querySelector('.pop-up-header i');
    close.addEventListener('click', (e) => {
        popUp.classList.remove('shown');
    });
    
    [...products].forEach(item => {
        item.addEventListener('click', (e) => {
            popUp.classList.add('shown');
            const product = getProducts(`${item.id}`)
                                .then(data => {
                                    productTitle.innerHTML = data.title;
                                    productImage.src = data.image;
                                    productDescription.innerHTML = data.description;
                                    productPrice.innerHTML = '$' + data.price;
                                })
        });
    });
}

attachProductPopUpLogic();

function addToCart(product) {
    const found = cart.find(item => item.id === product.id);
    if (found) {
        found.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCartItems();
}

function renderCartItems() {
    const cartList = document.querySelector('.shopping-cart-list');
    cartList.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" style="width: 50px">
            <p>${item.title}</p>
            <p>$${item.price} x ${item.quantity}</p>
        `;

        cartList.appendChild(cartItem);
    });
}

const openCart = document.querySelector('.shopping-cart-container');
const closeCart = document.getElementById('close-cart');
const cartWindow = document.querySelector('.shopping-cart-window');
openCart.addEventListener('click', () => {
    cartWindow.style.transform = 'translate(0, -50%)';
});

closeCart.addEventListener('click', () => {
    cartWindow.style.transform = 'translateY(-50%) translateX(430px)'; 
});