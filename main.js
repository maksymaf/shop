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

        productItem.appendChild(productImage);
        productItem.appendChild(productTitle);
        productItem.appendChild(productDescription);
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
                                })
        });
    });
}

attachProductPopUpLogic()