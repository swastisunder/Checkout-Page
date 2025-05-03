document.addEventListener("DOMContentLoaded", function () {
  const products = [
    { id: 1, name: "Casio CT-X 900in", price: 24090 },
    { id: 2, name: "Yamaha F310 Guitar", price: 12700 },
    { id: 3, name: "Punam Flutes G#", price: 5700 },
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  // Display products
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <span>${product.name} - ₹${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  // Load cart if available
  renderCart();

  // Add to cart
  productList.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      const productId = parseInt(event.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveCart();
    renderCart();
  }

  // Save to localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Render cart
  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
          ${item.name} - ₹${item.price.toFixed(2)}
          <button class="remove-btn" data-id="${index}">Remove</button>
        `;
        cartItems.appendChild(cartItem);
      });

      totalPriceDisplay.textContent = `₹${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
      totalPriceDisplay.textContent = "$0.00";
    }
  }

  // Remove item from cart
  cartItems.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-btn")) {
      const indexToRemove = parseInt(event.target.getAttribute("data-id"));
      if (indexToRemove !== -1) {
        cart.splice(indexToRemove, 1);
        saveCart();
        renderCart();
      }
    }
  });

  // Checkout
  checkOutBtn.addEventListener("click", function () {
    if (cart.length > 0) {
      alert("Checkout Successful!");
      cart = [];
      saveCart();
      renderCart();
    } else {
      alert("Your cart is empty.");
    }
  });
});
