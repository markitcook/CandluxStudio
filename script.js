const cursor = document.querySelector('.cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Product data
const products = {
    1: {
        name: "Lavender Dream",
        description: "Aroma lavender yang menenangkan, dipadukan dengan sentuhan chamomile dan vanilla. Lilin aromaterapi ini dirancang khusus untuk membantu Anda rileks setelah hari yang panjang. Terbuat dari 100% lilin soy wax dengan waktu bakar hingga 40-50 jam. Cocok untuk kamar tidur atau ruang meditasi Anda. Dilengkapi dengan essential oil grade therapeutic untuk hasil aromaterapi yang optimal.",
        image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=500&auto=format",
        aroma: "Fresh",
        category: "Relaxation",
        price: 299000
    },
    2: {
        name: "Citrus Bliss",
        description: "Perpaduan sempurna dari jeruk mandarin, lemon, dan grapefruit yang menyegarkan. Aroma citrus yang energik ini akan membantu meningkatkan mood dan produktivitas Anda. Diformulasikan dengan campuran essential oil premium dan lilin soy wax berkualitas tinggi. Waktu bakar 35-45 jam dengan throw scent yang konsisten. Ideal untuk ruang kerja atau ruang keluarga.",
        image: "https://images.unsplash.com/photo-1608181831718-c9ffd8728e34?w=500&auto=format",
        aroma: "Fresh",
        category: "Energy",
        price: 299000
    },
    3: {
        name: "Vanilla Serenity",
        description: "Kehangatan aroma vanilla Madagascar yang dipadu dengan sentuhan kayu manis dan nutmeg. Menciptakan suasana nyaman dan menenangkan di ruangan Anda. Terbuat dari bahan-bahan alami dengan sumbu katun organik yang tidak berasap. Waktu bakar 40-50 jam. Throw scent medium-strong yang akan mengisi ruangan berukuran sedang hingga besar. Sempurna untuk menciptakan suasana hangat dan nyaman.",
        image: "https://images.unsplash.com/photo-1639501295122-28c362f2a571?w=500&auto=format",
        aroma: "Sweet",
        category: "Comfort",
        price: 299000
    },
    4: {
        name: "Ocean Breeze",
        description: "Rasakan kesegaran angin laut dengan paduan aroma air laut, mineral, dan sentuhan ringan citrus. Diformulasikan khusus untuk menciptakan suasana pantai yang menyegarkan di ruangan Anda. Menggunakan campuran essential oil premium dengan base note yang tahan lama. Waktu bakar 35-45 jam. Cocok untuk kamar mandi atau ruang spa pribadi Anda. Dilengkapi dengan tutup bamboo yang elegan.",
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&auto=format",
        aroma: "Fresh",
        category: "Relaxation",
        price: 349000
    },
    5: {
        name: "Mint Fresh",
        description: "Kombinasi menyegarkan dari peppermint dan spearmint dengan sentuhan eucalyptus. Aroma yang membangkitkan semangat dan menjernihkan pikiran. Terbuat dari lilin soy wax premium dengan essential oil grade therapeutic. Waktu bakar 35-45 jam dengan throw scent yang kuat. Sempurna untuk ruang yoga atau ruang kerja. Dilengkapi dengan crystalline lid yang menambah kesan mewah.",
        image: "https://images.unsplash.com/photo-1636716642701-01754aef1066?w=500&auto=format",
        aroma: "Fresh",
        category: "Energy",
        price: 349000
    },
    6: {
        name: "Honey Delight",
        description: "Kelembutan aroma madu alami yang dipadukan dengan vanilla dan amber. Menciptakan atmosfer hangat dan menenangkan. Menggunakan honey-infused soy wax yang ramah lingkungan dengan waktu bakar 40-50 jam. Throw scent yang lembut namun konsisten membuat ruangan terasa nyaman. Ideal untuk ruang keluarga atau ruang baca. Kemasan eksklusif dengan wooden box.",
        image: "https://images.unsplash.com/photo-1639501295122-28c362f2a571?w=500&auto=format",
        aroma: "Sweet",
        category: "Comfort",
        price: 349000
    },
    7: {
        name: "Forest Mist",
        description: "Rasakan kesejukan hutan pinus dengan paduan aroma cemara, moss, dan sentuhan light mist. Diformulasikan untuk menciptakan suasana alam yang menenangkan. Menggunakan teknologi slow-release untuk aroma yang tahan lama. Waktu bakar 45-55 jam. Throw scent yang kuat ideal untuk ruangan besar. Dilengkapi dengan wooden wick yang menciptakan suara gemericik kayu yang menenangkan.",
        image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=500&auto=format",
        aroma: "Fresh",
        category: "Relaxation",
        price: 399000
    },
    8: {
        name: "Lemon Zest",
        description: "Kesegaran lemon Sicily yang dipadukan dengan lime dan bergamot. Aroma citrus yang energik dan menyegarkan ini akan meningkatkan mood dan fokus Anda. Terbuat dari premium soy wax dan essential oil grade therapeutic. Waktu bakar 40-50 jam dengan throw scent yang konsisten. Cocok untuk dapur atau ruang makan. Dilengkapi dengan metal lid premium dan gift box eksklusif.",
        image: "https://images.unsplash.com/photo-1608181831718-c9ffd8728e34?w=500&auto=format",
        aroma: "Fresh",
        category: "Energy",
        price: 399000
    },
    9: {
        name: "Caramel Dream",
        description: "Kehangatan aroma caramel yang dipadu dengan butterscotch dan vanilla bourbon. Menciptakan suasana manis dan menenangkan di ruangan Anda. Menggunakan caramel-infused soy wax yang ramah lingkungan. Waktu bakar 45-55 jam dengan throw scent medium-strong. Ideal untuk ruang santai atau kamar tidur. Hadir dalam glass jar premium dengan wooden lid dan packaging mewah.",
        image: "https://images.unsplash.com/photo-1639501295122-28c362f2a571?w=500&auto=format",
        aroma: "Sweet",
        category: "Comfort",
        price: 399000
    }
    // ... existing products ...
};

// Product size prices (multipliers)
const sizePrices = {
    small: 0.8,  // 20% cheaper than medium
    medium: 1,   // base price
    large: 1.2   // 20% more expensive than medium
};

// Modal functionality
function initializeModal() {
    const modal = document.querySelector('.product-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (!modal || !closeBtn) {
        console.log('Modal elements not found');
        return;
    }
    
    function openModal(productId) {
        const product = products[productId];
        if (!product) {
            console.log('Product not found:', productId);
            return;
        }

        // Update modal content
        const modalImg = document.getElementById('modalProductImage');
        const modalName = document.getElementById('modalProductName');
        const modalDesc = document.getElementById('modalProductDescription');
        const modalAroma = document.getElementById('modalProductAroma');
        const modalCategory = document.getElementById('modalProductCategory');
        const modalPrice = document.getElementById('modalProductPrice');
        const modalAddToCart = document.getElementById('modalAddToCart');

        if (modalImg) modalImg.src = product.image;
        if (modalName) modalName.textContent = product.name;
        if (modalDesc) modalDesc.textContent = product.description;
        if (modalAroma) modalAroma.textContent = product.aroma;
        if (modalCategory) modalCategory.textContent = product.category;
        if (modalPrice) modalPrice.textContent = `Rp ${product.price.toLocaleString()}`;
        if (modalAddToCart) modalAddToCart.setAttribute('data-id', productId);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Add click event listeners to all view details buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            if (productCard) {
                const productId = productCard.getAttribute('data-id');
                console.log('Opening modal for product:', productId);
                openModal(productId);
            }
        });
    });

    // Close modal when clicking close button
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Add to cart functionality in modal
    const modalAddToCart = document.getElementById('modalAddToCart');
    if (modalAddToCart) {
        modalAddToCart.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = modalAddToCart.getAttribute('data-id');
            const product = products[productId];
            if (product && window.cart) {
                window.cart.addItem(productId, product.name, product.price, product.image);
                closeModal();
            }
        });
    }
}

// Options Modal functionality
function initializeOptionsModal() {
    const optionsModal = document.querySelector('.options-modal');
    const closeOptionsBtn = document.querySelector('.close-options');
    const quantityInput = document.querySelector('#product-quantity');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const sizeInputs = document.querySelectorAll('input[name="size"]');
    const confirmAddToCartBtn = document.querySelector('.confirm-add-to-cart');
    let currentProduct = null;

    function updateTotalPrice() {
        if (!currentProduct) return;

        const quantity = parseInt(quantityInput.value);
        const selectedSize = document.querySelector('input[name="size"]:checked').value;
        const basePrice = currentProduct.price;
        const total = basePrice * sizePrices[selectedSize] * quantity;

        document.getElementById('optionsTotalPrice').textContent = `Rp ${total.toLocaleString()}`;
    }

    function openOptionsModal(product) {
        currentProduct = product;
        
        // Update modal content
        document.getElementById('optionsProductImage').src = product.image;
        document.getElementById('optionsProductName').textContent = product.name;
        document.getElementById('optionsProductPrice').textContent = `Rp ${product.price.toLocaleString()}`;
        
        // Reset options
        quantityInput.value = 1;
        document.getElementById('size-medium').checked = true;
        
        // Update total
        updateTotalPrice();
        
        // Show modal
        optionsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeOptionsModal() {
        optionsModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentProduct = null;
    }

    // Quantity controls
    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
            updateTotalPrice();
        }
    });

    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
            updateTotalPrice();
        }
    });

    quantityInput.addEventListener('change', () => {
        let value = parseInt(quantityInput.value);
        if (isNaN(value) || value < 1) value = 1;
        if (value > 10) value = 10;
        quantityInput.value = value;
        updateTotalPrice();
    });

    // Size selection
    sizeInputs.forEach(input => {
        input.addEventListener('change', updateTotalPrice);
    });

    // Close modal
    closeOptionsBtn.addEventListener('click', closeOptionsModal);
    optionsModal.addEventListener('click', (e) => {
        if (e.target === optionsModal) {
            closeOptionsModal();
        }
    });

    // Add to cart
    confirmAddToCartBtn.addEventListener('click', () => {
        if (!currentProduct) return;

        const quantity = parseInt(quantityInput.value);
        const selectedSize = document.querySelector('input[name="size"]:checked').value;
        const sizeMultiplier = sizePrices[selectedSize];
        const finalPrice = currentProduct.price * sizeMultiplier;

        // Add to cart with size information
        if (window.cart) {
            window.cart.addItem(
                currentProduct.id,
                `${currentProduct.name} (${selectedSize.toUpperCase()})`,
                finalPrice,
                currentProduct.image,
                quantity
            );
        }

        closeOptionsModal();
    });

    return openOptionsModal;
}

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let filters = JSON.parse(localStorage.getItem('filters')) || {
    category: 'all',
    price: 'all',
    sort: 'default'
};

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add to cart function
function addToCart(productId, quantity, size) {
    const existingItem = cart.find(item => item.id === productId && item.size === size);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            quantity: quantity,
            size: size
        });
    }
    
    updateCartCount();
    showCartNotification('Item added to cart!');
}

// Filter products
function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const price = document.getElementById('price-filter').value;
    const sort = document.getElementById('sort-filter').value;
    
    filters = { category, price, sort };
    localStorage.setItem('filters', JSON.stringify(filters));
    
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        const productCategory = product.dataset.category;
        const productPrice = parseFloat(product.dataset.price);
        
        let showProduct = true;
        
        if (category !== 'all' && productCategory !== category) {
            showProduct = false;
        }
        
        if (price !== 'all') {
            const [min, max] = price.split('-').map(Number);
            if (productPrice < min || productPrice > max) {
                showProduct = false;
            }
        }
        
        product.style.display = showProduct ? 'block' : 'none';
    });
    
    sortProducts(sort);
}

// Initialize filters from localStorage
function initializeFilters() {
    const { category, price, sort } = filters;
    document.getElementById('category-filter').value = category;
    document.getElementById('price-filter').value = price;
    document.getElementById('sort-filter').value = sort;
    filterProducts();
}

// Initialize cart from localStorage
function initializeCart() {
    updateCartCount();
}

// FAQ Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            // Set initial state
            answer.style.maxHeight = '0';
            answer.style.opacity = '0';
            answer.style.visibility = 'hidden';
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        otherItem.classList.remove('active');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                            otherAnswer.style.opacity = '0';
                            setTimeout(() => {
                                otherAnswer.style.visibility = 'hidden';
                            }, 300); // Match transition duration
                        }
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    // Close current item
                    item.classList.remove('active');
                    answer.style.maxHeight = '0';
                    answer.style.opacity = '0';
                    setTimeout(() => {
                        answer.style.visibility = 'hidden';
                    }, 300); // Match transition duration
                } else {
                    // Open current item
                    item.classList.add('active');
                    answer.style.visibility = 'visible';
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.opacity = '1';
                }
            });
        }
    });
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopButton = document.createElement('a');
    backToTopButton.href = '#';
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing functionality...');
    
    // Initialize FAQ
    initializeFAQ();
    
    // Initialize modal
    initializeModal();

    // Initialize filters if they exist
    const filterPopup = document.querySelector('.filter-popup');
    if (filterPopup) {
        const filterButton = document.querySelector('.filter-button');
        const filterCloseButton = document.querySelector('.filter-close');
        
        if (filterButton) {
            filterButton.addEventListener('click', () => {
                filterPopup.classList.add('active');
            });
        }

        if (filterCloseButton) {
            filterCloseButton.addEventListener('click', () => {
                filterPopup.classList.remove('active');
            });
        }

        // Initialize filter state
        window.activeFilters = {
            categories: [],
            aromas: [],
            priceRange: { min: 0, max: Infinity }
        };

        // Apply initial filters
        if (typeof applyFilters === 'function') {
            applyFilters();
        }
    }

    // Initialize options modal
    const openOptionsModal = initializeOptionsModal();

    // Update add to cart buttons to open options modal
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            if (productCard && window.cart) {
                const productId = productCard.getAttribute('data-id');
                const product = products[productId];
                if (product) {
                    openOptionsModal({
                        id: productId,
                        ...product
                    });
                }
            }
        });
    });

    // Update modal add to cart button
    const modalAddToCart = document.getElementById('modalAddToCart');
    if (modalAddToCart) {
        modalAddToCart.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = modalAddToCart.getAttribute('data-id');
            const product = products[productId];
            if (product) {
                openOptionsModal({
                    id: productId,
                    ...product
                });
                // Close the product details modal
                document.querySelector('.product-modal').classList.remove('active');
                document.body.style.overflow = 'hidden'; // Keep body fixed for options modal
            }
        });
    }

    // Add event listeners for filters
    document.getElementById('category-filter').addEventListener('change', filterProducts);
    document.getElementById('price-filter').addEventListener('change', filterProducts);
    document.getElementById('sort-filter').addEventListener('change', filterProducts);
    
    // Add event listeners for cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const quantity = parseInt(document.getElementById('product-quantity').value);
            const size = document.querySelector('input[name="size"]:checked').value;
            addToCart(productId, quantity, size);
        });
    });

    // Initialize back to top button
    initializeBackToTop();
});

function removeFromCart(productId) {
    const cartItem = document.querySelector(`[data-product-id="${productId}"]`);
    if (cartItem) {
        cartItem.classList.add('removing');
        cartItem.addEventListener('transitionend', () => {
            const index = cart.findIndex(item => item.id === productId);
            if (index !== -1) {
                cart.splice(index, 1);
                updateCart();
                saveCartToLocalStorage();
            }
        }, { once: true });
    }
}

// ... rest of your existing code ...