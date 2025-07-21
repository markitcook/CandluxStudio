// Only declare Cart class if it hasn't been declared yet
if (!window.Cart) {
    // Cart class
    class Cart {
        constructor() {
            this.items = [];
            this.loadCart();
        }

        addItem(productId, name, price, image) {
            const existingItem = this.items.find(item => item.productId === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({ 
                    productId, 
                    name,
                    price, 
                    image,
                    quantity: 1 
                });
            }
            this.saveCart();
            this.showNotification('Produk berhasil ditambahkan ke keranjang');
            this.updateCartCount();
        }

        removeItem(productId) {
            const cartItem = document.querySelector(`[data-product-id="${productId}"]`);
            if (cartItem) {
                cartItem.classList.add('removing');
                setTimeout(() => {
                    cartItem.remove();
                    this.items = this.items.filter(item => item.productId !== productId);
                    this.saveCart();
                    this.updateCartCount();
                    
                    if (this.items.length === 0) {
                        const cartItemsContainer = document.querySelector('.cart-items');
                        if (cartItemsContainer) {
                            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
                        }
                    }
                    
                    const totalElement = document.querySelector('.cart-total');
                    if (totalElement) {
                        const total = this.getTotal();
                        totalElement.textContent = `Total: $${total.toFixed(2)}`;
                    }
                }, 300);
            }
        }

        updateQuantity(productId, quantity) {
            const item = this.items.find(item => item.productId === productId);
            if (item) {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartCount();
            }
        }

        getTotal() {
            return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        }

        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.items));
        }

        loadCart() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                this.items = JSON.parse(savedCart);
                this.updateCartCount();
            }
        }

        updateCartCount() {
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
                cartCount.textContent = totalItems;
                cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
            }
        }

        showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 2000);
        }

        updateCartDisplay() {
            const cartContainer = document.querySelector('.cart-items');
            if (!cartContainer) return;

            if (this.items.length === 0) {
                cartContainer.innerHTML = '<p class="empty-cart">Keranjang belanja Anda kosong</p>';
                return;
            }

            let total = 0;
            cartContainer.innerHTML = this.items.map(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                return `
                    <div class="cart-item" data-id="${item.productId}">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <p class="cart-item-price">Rp ${item.price.toLocaleString()}</p>
                            <div class="quantity-controls">
                                <button class="quantity-btn minus">-</button>
                                <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                                <button class="quantity-btn plus">+</button>
                            </div>
                        </div>
                        <button class="remove-item">&times;</button>
                    </div>
                `;
            }).join('');

            const totalElement = document.querySelector('.cart-total');
            if (totalElement) {
                totalElement.textContent = `Total: Rp ${total.toLocaleString()}`;
            }

            this.setupCartEventListeners();
        }

        setupCartEventListeners() {
            const cartContainer = document.querySelector('.cart-items');
            if (!cartContainer) return;

            cartContainer.addEventListener('click', (e) => {
                const cartItem = e.target.closest('.cart-item');
                if (!cartItem) return;

                const id = cartItem.dataset.id;
                
                if (e.target.classList.contains('remove-item')) {
                    this.removeItem(id);
                } else if (e.target.classList.contains('quantity-btn')) {
                    const input = cartItem.querySelector('.quantity-input');
                    let quantity = parseInt(input.value);
                    
                    if (e.target.classList.contains('minus')) {
                        quantity = Math.max(0, quantity - 1);
                    } else if (e.target.classList.contains('plus')) {
                        quantity = quantity + 1;
                    }
                    
                    input.value = quantity;
                    this.updateQuantity(id, quantity);
                }
            });

            cartContainer.addEventListener('change', (e) => {
                if (e.target.classList.contains('quantity-input')) {
                    const cartItem = e.target.closest('.cart-item');
                    const id = cartItem.dataset.id;
                    this.updateQuantity(id, e.target.value);
                }
            });
        }

        checkout() {
            if (this.items.length === 0) {
                alert('Keranjang belanja Anda kosong!');
                return;
            }

            // Get current hour to determine greeting
            const hour = new Date().getHours();
            let greeting = '';
            if (hour < 12) {
                greeting = 'selamat pagi';
            } else if (hour < 18) {
                greeting = 'selamat siang';
            } else {
                greeting = 'selamat malam';
            }

            // Format the message
            let message = `halo kak ${greeting}\nsaya ingin memesan:\n\n`;

            // Add each item to the message
            this.items.forEach(item => {
                message += `${item.name} (${item.quantity} pcs) - Rp ${(item.price * item.quantity).toLocaleString()}\n`;
            });

            // Add total
            const total = this.getTotal();
            message += `\nTotal: Rp ${total.toLocaleString()}`;

            // Encode the message for URL
            const encodedMessage = encodeURIComponent(message);

            // Open WhatsApp with the message
            window.open(`https://wa.me/6285179715309?text=${encodedMessage}`, '_blank');
        }
    }
    
    // Initialize cart only if it hasn't been initialized
    if (!window.cart) {
        window.cart = new Cart();
    }
}

// Add event listeners to "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const id = productCard.dataset.id;
            const name = productCard.querySelector('h3').textContent;
            const price = parseInt(productCard.dataset.price);
            const image = productCard.querySelector('img').src;
            
            cart.addItem(id, name, price, image);
        });
    });

    // Checkout button
    const checkoutButton = document.querySelector('.checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            cart.checkout();
        });
    }

    // Initialize cart display if we're on the cart page
    if (document.querySelector('.cart-items')) {
        cart.updateCartDisplay();
    }
}); 