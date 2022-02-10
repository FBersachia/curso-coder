let products;


fetch('/api/products').then(result=>result.json()).then(json=>{
    products = json.productos;
    let container = document.getElementById('product-container');
    products.forEach(product => {
        let card = document.createElement('div');
        card.setAttribute('class', 'product-card');
        let title = document.createElement('p');
        title.setAttribute('class','product-text');
        title.innerHTML = product.title;
        let price = document.createElement('p');
        price.setAttribute('class','product-text');
        price.innerHTML = product.price;
        let file = document.createElement('img'); 
        file.src = product.thumbnail;
        card.append(title);
        card.append(price);
        card.append(file);
        card.append(container);
        console.log(product)
    });
    //console.log(json)
})

let form = document.getElementById('productForm');
if (typeof browser === "undefined") {
    var browser = chrome;
}

const handleSubmit = (evt, form, route) =>{
    evt.preventDefault();
    let formData = new FormData(form);
    fetch(route,{
        method:"POST",
        body: formData
    }).then(result=>result.json()).then(json=>console.log(json));
    form.reset();
}

form.addEventListener('submit', (e)=>handleSubmit(e, e.target, '/api/products')); 