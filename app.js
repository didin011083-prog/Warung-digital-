const products = [
    { id: 1, name: "Beras Premium 5kg", price: 65000, category: "Makanan", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=200&q=80" },
    { id: 2, name: "Mie Instan Goreng (Dus)", price: 110000, category: "Makanan", image: "https://images.unsplash.com/photo-1612927601101-413e17273962?auto=format&fit=crop&w=200&q=80" },
    { id: 3, name: "Susu UHT Kotak 1L", price: 18000, category: "Minuman", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=200&q=80" },
    { id: 4, name: "Teh Celup Melati", price: 9000, category: "Minuman", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=200&q=80" },
    { id: 11, name: "Aqua Botol 450ml", price: 3500, category: "Minuman", image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=200&q=80" },
    { id: 12, name: "Aqua Botol 600ml", price: 4500, category: "Minuman", image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=200&q=80" },
    { id: 5, name: "Bayam Segar (1 Ikat)", price: 4000, category: "Sayuran", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=200&q=80" },
    { id: 6, name: "Wortel Segar 500g", price: 8000, category: "Sayuran", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=200&q=80" },
    { id: 7, name: "Pisang Cavendish (Sisir)", price: 22000, category: "Buah-buahan", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=200&q=80" },
    { id: 8, name: "Jeruk Manis 1kg", price: 25000, category: "Buah-buahan", image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=200&q=80" },
    { id: 9, name: "Bawang Merah 250g", price: 12000, category: "Bumbu", image: "https://images.unsplash.com/photo-1618512496248-a00fe9548b8c?auto=format&fit=crop&w=200&q=80" },
    { id: 10, name: "Cabai Rawit Merah 250g", price: 15000, category: "Bumbu", image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=200&q=80" }
];

let cart = [];
let currentCategory = 'semua';

function filterCategory(category) {
    currentCategory = category;
    document.getElementById('category-title').innerText = category === 'semua' ? 'Semua Produk' : `Kategori: ${category}`;
    
    document.querySelectorAll('.cat-btn').forEach(btn => {
        if (btn.innerText.toLowerCase() === category.toLowerCase() || (category === 'semua' && btn.innerText === 'Semua')) {
            btn.className = "cat-btn bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition";
        } else {
            btn.className = "cat-btn bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition hover:bg-gray-200";
        }
    });

    renderProducts();
}

function renderProducts() {
    const filtered = currentCategory === 'semua' ? products : products.filter(p => p.category === currentCategory);
    const listEl = document.getElementById('product-list');

    if (filtered.length === 0) {
        listEl.innerHTML = `<p class="text-gray-400 text-sm py-4 text-center">Belum ada produk dalam kategori ini.</p>`;
        return;
    }

    listEl.innerHTML = filtered.map(p => `
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
                <img src="${p.image}" alt="${p.name}" class="w-14 h-14 object-cover rounded-lg border border-gray-100 flex-shrink-0">
                <div>
                    <span class="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md font-medium">${p.category}</span>
                    <h3 class="font-medium text-sm mt-1 text-gray-800">${p.name}</h3>
                    <p class="text-emerald-600 text-xs font-semibold">Rp ${p.price.toLocaleString('id-ID')}</p>
                </div>
            </div>
            <button onclick="addToCart(${p.id})" class="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-emerald-100 transition flex-shrink-0">Tambah</button>
        </div>
    `).join('');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    renderCart();
}

function decreaseQty(id) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        if (existing.qty > 1) {
            existing.qty -= 1;
        } else {
            cart = cart.filter(item => item.id !== id);
        }
    }
    renderCart();
}

function increaseQty(id) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    }
    renderCart();
}

function renderCart() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    const cartBadge = document.getElementById('cart-badge');
    
    let totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    if (totalItems > 0) {
        cartBadge.innerText = totalItems;
        cartBadge.classList.remove('hidden');
    } else {
        cartBadge.classList.add('hidden');
    }

    if (cart.length === 0) {
        cartList.innerHTML = `<p class="text-gray-400 py-4 text-center">Keranjang masih kosong</p>`;
        cartTotal.innerText = `Rp 0`;
        return;
    }

    let total = 0;
    cartList.innerHTML = cart.map(item => {
        let subtotal = item.price * item.qty;
        total += subtotal;
        return `
            <div class="py-2 flex justify-between items-center gap-2">
                <div class="flex-1">
                    <span class="font-medium text-gray-800 text-sm">${item.name}</span>
                    <span class="text-gray-500 text-xs block">(${item.qty}x) - Rp ${subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div class="flex items-center gap-1 flex-shrink-0">
                    <button onclick="decreaseQty(${item.id})" class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold w-6 h-6 rounded flex items-center justify-center text-xs transition">-</button>
                    <button onclick="increaseQty(${item.id})" class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold w-6 h-6 rounded flex items-center justify-center text-xs transition">+</button>
                    <button onclick="removeFromCart(${item.id})" class="text-red-500 text-xs px-2 py-1 font-medium hover:bg-red-50 rounded transition">Hapus</button>
                </div>
            </div>
        `;
    }).join('');

    cartTotal.innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Keranjang belanja masih kosong!");
        return;
    }

    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;

    let text = "Halo Warung Digital, saya ingin memesan:\n\n";
    let total = 0;
    cart.forEach((item, index) => {
        let subtotal = item.price * item.qty;
        total += subtotal;
        text += `${index + 1}. ${item.name} (${item.qty}x) - Rp ${subtotal.toLocaleString('id-ID')}\n`;
    });
    text += `\n*Total Belanja: Rp ${total.toLocaleString('id-ID')}*`;
    text += `\n*Metode Pembayaran: ${selectedPayment}*`;
    text += `\n*Catatan Pengantaran: Jam 18.30 s/d 20.30 Setiap Hari (Tanpa Minimal Belanja)*`;
    text += `\n\nMohon segera diproses ya, terima kasih!`;

    const phoneNumber = "6287784542093"; 
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
}

renderProducts();
renderCart();
