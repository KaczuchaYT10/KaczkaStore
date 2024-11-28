// Koszyk
const cartItems = [];
const cartElement = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Dodawanie produktów do koszyka
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        const productPrice = parseFloat(button.getAttribute('data-price'));

        cartItems.push({ name: productName, price: productPrice });
        updateCart();
    });
});

// Aktualizacja koszyka
function updateCart() {
    cartElement.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.name} - ${item.price.toFixed(2)} PLN`;
        cartElement.appendChild(cartItem);
        total += item.price;
    });

    totalPriceElement.textContent = `${total.toFixed(2)} PLN`;
}
// Łączna kwota
function calculateTotalPrice() {
    let total = 0;
    cartItems.forEach(item => total += item.price);
    return total.toFixed(2);
}

// Konfiguracja PayPal
paypal.Buttons({
    createOrder: (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: calculateTotalPrice(), // Łączna kwota
                }
            }]
        });
    },
    onApprove: (data, actions) => {
        return actions.order.capture().then(details => {
            alert(`Dziękujemy, ${details.payer.name.given_name}! Twoja płatność została zakończona.`);
            cartItems.length = 0; // Czyszczenie koszyka
            updateCart();
        });
    },
    onCancel: () => {
        alert('Płatność została anulowana.');
    },
    onError: (err) => {
        console.error('Błąd płatności PayPal:', err);
        alert('Wystąpił problem z płatnością. Spróbuj ponownie.');
    }
}).render('#paypal-button-container');
