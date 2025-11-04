const jsCode = `// ========================================
// LuxeMarket E-Commerce - JavaScript
// ========================================

// Product Data
const products = [
{ id: 1, name: 'Wireless Headphones Pro', price: 129.99, oldPrice: 199.99, icon: '🎧', badge: 'NEW', rating: '⭐⭐⭐⭐⭐',
category: 'electronics' },
{ id: 2, name: 'Smart Watch Ultra', price: 299.99, oldPrice: 449.99, icon: '⌚', badge: 'SALE', rating: '⭐⭐⭐⭐⭐',
category: 'electronics' },
{ id: 3, name: 'Premium Backpack', price: 79.99, oldPrice: null, icon: '🎒', badge: '', rating: '⭐⭐⭐⭐', category:
'fashion' },
{ id: 4, name: 'Designer Sunglasses', price: 159.99, oldPrice: null, icon: '🕶️', badge: 'NEW', rating: '⭐⭐⭐⭐⭐',
category: 'fashion' },
{ id: 5, name: 'Running Shoes Elite', price: 119.99, oldPrice: 169.99, icon: '👟', badge: 'SALE', rating: '⭐⭐⭐⭐',
category: 'sports' },
{ id: 6, name: 'Coffee Maker Deluxe', price: 89.99, oldPrice: null, icon: '☕', badge: '', rating: '⭐⭐⭐⭐⭐', category:
'home' },
{ id: 7, name: 'Gaming Mouse RGB', price: 69.99, oldPrice: null, icon: '🖱️', badge: 'NEW', rating: '⭐⭐⭐⭐', category:
'electronics' },
{ id: 8, name: 'Yoga Mat Premium', price: 49.99, oldPrice: 79.99, icon: '🧘', badge: 'SALE', rating: '⭐⭐⭐⭐⭐', category:
'sports' },
{ id: 9, name: 'Bluetooth Speaker', price: 89.99, oldPrice: null, icon: '🔊', badge: '', rating: '⭐⭐⭐⭐', category:
'electronics' },
{ id: 10, name: 'Leather Wallet', price: 59.99, oldPrice: null, icon: '👛', badge: 'NEW', rating: '⭐⭐⭐⭐⭐', category:
'fashion' },
{ id: 11, name: 'Fitness Tracker', price: 149.99, oldPrice: 199.99, icon: '⌚', badge: 'SALE', rating: '⭐⭐⭐⭐', category:
'sports' },
{ id: 12, name: 'Desk Lamp LED', price: 39.99, oldPrice: null, icon: '💡', badge: '', rating: '⭐⭐⭐⭐⭐', category: 'home'
}
];

// Global Variables
let cart = [];
let currentFilter = 'all';

// ========================================
// Product Functions
// ========================================

function generateProducts(filter = 'all') {
const grid = document.getElementById('productGrid');
let filteredProducts = products;

if (filter !== 'all') {
if (filter === 'sale') {
filteredProducts = products.filter(p => p.badge === 'SALE');
} else if (filter === 'new') {
filteredProducts = products.filter(p => p.badge === 'NEW');
} else if (filter === 'bestseller' || filter === 'featured') {
filteredProducts = products.filter(p => p.rating === '⭐⭐⭐⭐⭐');
}
}

grid.innerHTML = filteredProducts.map(product => \`
<div class="product-card">
    <div class="product-image">
        <button class="wishlist-btn" onclick="addToWishlist(\${product.id})">♡</button>
        <span style="font-size: 4rem;">\${product.icon}</span>
        \${product.badge ? \`<span
            class="product-badge \${product.badge === 'NEW' ? 'new' : ''}">\${product.badge}</span>\` : ''}
    </div>
    <div class="product-info">
        <h3>\${product.name}</h3>
        <div class="product-rating">\${product.rating}</div>
        <div class="product-price">
            <div>
                <span class="price">$\${product.price}</span>
                \${product.oldPrice ? \`<span class="old-price">$\${product.oldPrice}</span>\` : ''}
            </div>
            <button class="add-to-cart" onclick="addToCart(\${product.id})">Add</button>
        </div>
    </div>
</div>
\`).join('');
}

function filterProducts(filter) {
currentFilter = filter;
generateProducts(filter);

// Update active tab
document.querySelectorAll('.filter-tab').forEach(tab => {
tab.classList.remove('active');
});
event.target.classList.add('active');
}

function filterCategory(category) {
showNotification(\`Showing \${category} products\`, 'info');
scrollToSection('products');
}

// ========================================
// Cart Functions
// ========================================

function addToCart(productId) {
const product = products.find(p => p.id === productId);
cart.push(product);
updateCartCount();
updateCartDisplay();
showNotification(\`\${product.name} added to cart!\`, 'success');
animateCartIcon();
}

function removeFromCart(index) {
const removedItem = cart[index];
cart.splice(index, 1);
updateCartCount();
updateCartDisplay();
showNotification(\`\${removedItem.name} removed from cart\`, 'info');
}

function updateCartCount() {
document.getElementById('cartCount').textContent = cart.length;
}

function updateCartDisplay() {
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

if (cart.length === 0) {
cartItems.innerHTML = \`
<div class="empty-cart">
    <div class="empty-cart-icon">🛒</div>
    <p>Your cart is empty</p>
    <p style="font-size: 0.875rem;">Add some products to get started!</p>
</div>
\`;
cartTotal.textContent = '$0.00';
return;
}

cartItems.innerHTML = cart.map((item, index) => \`
<div class="cart-item">
    <div class="cart-item-icon">\${item.icon}</div>
    <div class="cart-item-info">
        <h4>\${item.name}</h4>
        <div class="cart-item-price">$\${item.price}</div>
    </div>
    <button class="remove-item" onclick="removeFromCart(\${index})">×</button>
</div>
\`).join('');

const total = cart.reduce((sum, item) => sum + item.price, 0);
cartTotal.textContent = \`$\${total.toFixed(2)}\`;
}

function toggleCart() {
const modal = document.getElementById('cartModal');
const overlay = document.getElementById('cartOverlay');
modal.classList.toggle('active');
overlay.classList.toggle('active');
updateCartDisplay();
}

function animateCartIcon() {
const cartIcon = document.querySelector('.cart-icon');
cartIcon.style.animation = 'none';
setTimeout(() => {
cartIcon.style.animation = 'bounce 0.5s ease';
}, 10);
}

function checkout() {
if (cart.length === 0) {
showNotification('Your cart is empty!', 'error');
return;
}
const total = cart.reduce((sum, item) => sum + item.price, 0);
showNotification(\`Proceeding to checkout... Total: $\${total.toFixed(2)}\`, 'success');
setTimeout(() => {
showNotification('Thank you for your order! 🎉', 'success');
cart = [];
updateCartCount();
toggleCart();
}, 2000);
}

// ========================================
// Wishlist & Notifications
// ========================================

function addToWishlist(productId) {
const product = products.find(p => p.id === productId);
showNotification(\`\${product.name} added to wishlist! ❤️\`, 'success');
}

function showNotification(message, type = 'success') {
const colors = {
success: 'linear-gradient(135deg, #14b8a6, #3b82f6)',
error: 'linear-gradient(135deg, #dc2626, #f97316)',
info: 'linear-gradient(135deg, #eab308, #f97316)'
};

const notification = document.createElement('div');
notification.textContent = message;
notification.style.cssText = \`
position: fixed;
top: 100px;
right: 20px;
background: \${colors[type]};
color: white;
padding: 1rem 2rem;
border-radius: 50px;
box-shadow: 0 10px 25px rgba(0,0,0,0.2);
z-index: 10002;
animation: slideIn 0.3s ease-out;
font-weight: 600;
max-width: 300px;
\`;
document.body.appendChild(notification);
setTimeout(() => {
notification.style.animation = 'slideOut 0.3s ease-out';
setTimeout(() => notification.remove(), 300);
}, 3000);
}

// ========================================
// Navigation & Search
// ========================================

function scrollToSection(sectionId) {
document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

function performSearch() {
const query = document.getElementById('searchInput').value;
if (query) {
showNotification(\`Searching for "\${query}"...\`, 'info');
scrollToSection('products');
}
}

// ========================================
// Newsletter
// ========================================

function subscribeNewsletter(e) {
e.preventDefault();
const email = document.getElementById('emailInput').value;
showNotification(\`Thanks for subscribing! Check \${email} for exclusive deals! 🎉\`, 'success');
e.target.reset();
}

// ========================================
// Countdown Timer
// ========================================

function updateCountdown() {
let hours = 12;
let minutes = 34;
let seconds = 56;

setInterval(() => {
seconds--;
if (seconds < 0) { seconds=59; minutes--; if (minutes < 0) { minutes=59; hours--; if (hours < 0) { hours=23; } } }
    document.getElementById('hours').textContent=hours.toString().padStart(2, '0' );
    document.getElementById('minutes').textContent=minutes.toString().padStart(2, '0' );
    document.getElementById('seconds').textContent=seconds.toString().padStart(2, '0' ); }, 1000); }
    //========================================// Initialize on Page Load
    //========================================document.addEventListener('DOMContentLoaded', function() {
    generateProducts(); updateCountdown(); });`; const copyToClipboard=async (text, fileName)=> {
    try {
    await navigator.clipboard.writeText(text);
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 2000);
    } catch (err) {
    console.error('Failed to copy:', err);
    }
    };

    const downloadFile = (content, fileName) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    };

    const files = [
    { name: 'index.html', content: htmlCode, language: 'html', color: 'bg-orange-500' },
    { name: 'styles.css', content: cssCode, language: 'css', color: 'bg-blue-500' },
    { name: 'script.js', content: jsCode, language: 'javascript', color: 'bg-yellow-500' }
    ];

    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-slate-800 mb-2">
                    🛍️ LuxeMarket E-Commerce Files
                </h1>
                <p className="text-lg text-slate-600">
                    Professional e-commerce website separated into HTML, CSS, and JavaScript files
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {files.map((file) => (
                <div key={file.name} className="bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200">
                    <div className={`${file.color} text-white px-6 py-4 flex items-center justify-between`}>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                            <h2 className="text-xl font-bold">{file.name}</h2>
                            <span className="text-sm opacity-90">({file.language})</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={()=> copyToClipboard(file.content, file.name)}
                                className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2
                                rounded-lg transition-all"
                                >
                                {copiedFile === file.name ? (
                                <>
                                    <Check size={16} />
                                    <span className="text-sm">Copied!</span>
                                </>
                                ) : (
                                <>
                                    <Copy size={16} />
                                    <span className="text-sm">Copy</span>
                                </>
                                )}
                            </button>
                            <button onClick={()=> downloadFile(file.content, file.name)}
                                className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2
                                rounded-lg transition-all"
                                >
                                <Download size={16} />
                                <span className="text-sm">Download</span>
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        <pre className="bg-slate-50 p-4 rounded-lg overflow-x-auto text-sm border border-slate-200">
                  <code className="text-slate-800">{file.content}</code>
                </pre>
                    </div>
                </div>
                ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-500 to-turquoise-500 rounded-lg shadow-lg p-6 text-white">
                <h3 className="text-2xl font-bold mb-4">📋 Setup Instructions</h3>
                <ol className="space-y-3 text-lg">
                    <li className="flex items-start gap-3">
                        <span
                            className="font-bold bg-white text-blue-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                        <span>Create a new folder for your project (e.g., "luxemarket-ecommerce")</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span
                            className="font-bold bg-white text-blue-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                        <span>Download or copy all three files (index.html, styles.css, script.js)</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span
                            className="font-bold bg-white text-blue-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                        <span>Place all files in the same folder</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span
                            className="font-bold bg-white text-blue-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">4</span>
                        <span>Open index.html in your web browser</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span
                            className="font-bold bg-white text-blue-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">5</span>
                        <span>Your e-commerce website is now ready to launch! 🚀</span>
                    </li>
                </ol>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-6 border-t-4 border-orange-500">
                    <h4 className="font-bold text-lg text-slate-800 mb-2">✨ Features</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Fully functional shopping cart</li>
                        <li>• Product filtering system</li>
                        <li>• Countdown timer</li>
                        <li>• Wishlist functionality</li>
                        <li>• Newsletter subscription</li>
                        <li>• Responsive design</li>
                    </ul>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-t-4 border-turquoise-500">
                    <h4 className="font-bold text-lg text-slate-800 mb-2">🎨 Color Palette</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Blue (#1e40af, #3b82f6)</li>
                        <li>• Orange (#f97316)</li>
                        <li>• Turquoise (#14b8a6)</li>
                        <li>• Gold (#eab308)</li>
                        <li>• Silver (#94a3b8)</li>
                        <li>• Red (#dc2626)</li>
                    </ul>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-t-4 border-gold-500">
                    <h4 className="font-bold text-lg text-slate-800 mb-2">📦 File Structure</h4>
                    <div className="text-sm text-slate-600 space-y-1">
                        <div className="font-mono bg-slate-50 p-2 rounded">
                            📁 your-project/<br />
                            ├── 📄 index.html<br />
                            ├── 📄 styles.css<br />
                            └── 📄 script.js
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-gold-500 to-orange-500 rounded-lg shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-3">🎯 What's Included:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <h4 className="font-bold mb-2">HTML (Structure)</h4>
                        <ul className="space-y-1 opacity-90">
                            <li>✓ Semantic HTML5 markup</li>
                            <li>✓ Complete page sections</li>
                            <li>✓ Linked CSS and JS files</li>
                            <li>✓ Accessible structure</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">CSS (Styling)</h4>
                        <ul className="space-y-1 opacity-90">
                            <li>✓ Custom color variables</li>
                            <li>✓ Advanced animations</li>
                            <li>✓ Responsive design</li>
                            <li>✓ Modern gradients</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">JavaScript (Functionality)</h4>
                        <ul className="space-y-1 opacity-90">
                            <li>✓ Shopping cart system</li>
                            <li>✓ Product filtering</li>
                            <li>✓ Countdown timer</li>
                            <li>✓ Notification system</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Ready to Deploy</h4>
                        <ul className="space-y-1 opacity-90">
                            <li>✓ No dependencies needed</li>
                            <li>✓ Works offline</li>
                            <li>✓ Cross-browser compatible</li>
                            <li>✓ Production-ready code</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center text-slate-600">
                <p className="text-sm">
                    💡 <strong>Pro Tip:</strong> You can customize colors, products, and content by editing the
                    respective files.
                    The CSS variables make it easy to rebrand the entire site!
                </p>
            </div>
        </div>
    </div>
    );
    