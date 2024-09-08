document.addEventListener('DOMContentLoaded', () => {
    const cartSummary = document.getElementById('cart-summary');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartSummary.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let totalPrice = 0;
    let content = '<h2>Your Cart Items</h2>';

    cart.forEach((item) => {
        totalPrice += item.quantity * (item.discountedPrice || item.price);
        content += `
            <div class="cart-item">
                <img src="${item.image.url}" alt="${item.title}" style="width:100px; height:100px; margin-right: 20px;">
                <div class="item-details">
                    <h4>${item.title}</h4>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: $${item.discountedPrice || item.price} each</p>
                </div>
            </div>
        `;
    });

    content += `<h3>Total Price: $${totalPrice.toFixed(2)}</h3>`;
    cartSummary.innerHTML = content;

    setupPaymentForm(totalPrice);
});

function setupPaymentForm(totalPrice) {
    const paymentForm = document.getElementById('payment-form');
    paymentForm.onsubmit = (e) => {
        e.preventDefault();
    };
}
