// select UI elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");

// Event listeners
productList.addEventListener("click", addProduct);
cartList.addEventListener("click", removeFromCart);
document.addEventListener("DOMContentLoaded", getProducts);

// Add a product
function addProduct(e) {
    if (e.target.classList.contains("add-to-cart")) {
        const tableRow = document.createElement("tr");
        const products = getProductsFromLocalStorage();
        let productFound;

        products.forEach(product => {
            if (product[0] === e.target.previousElementSibling.previousElementSibling.textContent.trim()) {
                productFound = true;
            }
        });

        if (productFound) {
            const container = document.querySelector(".container");
            const h3 = document.querySelector("h3");
            const div = document.createElement("div");

            div.className = "alert alert-danger mt-3";
            div.setAttribute("role", "alert");
            div.textContent = "Product already Added!";
            container.insertBefore(div, h3);

            const currentAlert = document.querySelector(".alert");

            setTimeout(() => {
                currentAlert.remove();
            }, 3000);
        } else {
            tableRow.innerHTML = `
            <td>${e.target.previousElementSibling.previousElementSibling.textContent.trim()}</td>
            <td>${e.target.previousElementSibling.textContent.trim()}</td>
            <button type="button" class="btn btn-light">Remove</button>`;
            cartList.appendChild(tableRow);

            const data = [
                e.target.previousElementSibling.previousElementSibling.textContent.trim(),
                e.target.previousElementSibling.textContent.trim()
            ];

            storeProductInlacalStorage(data);
        }
    }

    e.preventDefault();
}

// Remove a product from cart
function removeFromCart(e) {
    if (e.target.textContent === "Remove") {
        e.target.parentElement.remove();
        removeProductInlacalStorage(e.target.previousElementSibling.previousElementSibling.textContent.trim());
    }

    e.preventDefault();
}

// Store product in local storage
function storeProductInlacalStorage(product) {
    const products = getProductsFromLocalStorage();

    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
}

// Remove product in local storage
function removeProductInlacalStorage(productItem) {
    const products = getProductsFromLocalStorage();

    products.forEach((product, index) => {
        if (productItem === product[0]) {
            products.splice(index, 1);
        }
    });
    localStorage.setItem("products", JSON.stringify(products));
}

// Get products from local storage
function getProductsFromLocalStorage() {
    let products;

    if (localStorage.getItem("products") === null) {
        products = [];
    } else {
        products = JSON.parse(localStorage.getItem("products"));
    }

    return products;
}

function getProducts() {
    const products = getProductsFromLocalStorage();

    products.forEach(product => {
        const tableRow = document.createElement("tr");

        tableRow.innerHTML = `
        <td>${product[0]}</td>
        <td>${product[1]}</td>
        <button type="button" class="btn btn-light">Remove</button>`;
        cartList.appendChild(tableRow);
    });
}