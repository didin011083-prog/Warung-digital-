const products = [
    { id: 1, name: "Beras Premium 5kg", price: 65000, category: "Makanan" },
    { id: 2, name: "Mie Instan Goreng (Dus)", price: 110000, category: "Makanan" },
    { id: 3, name: "Susu UHT Kotak 1L", price: 18000, category: "Minuman" },
    { id: 4, name: "Teh Celup Melati", price: 9000, category: "Minuman" },
    { id: 5, name: "Bayam Segar (1 Ikat)", price: 4000, category: "Sayuran" },
    { id: 6, name: "Wortel Segar 500g", price: 8000, category: "Sayuran" },
    { id: 7, name: "Pisang Cavendish (Sisir)", price: 22000, category: "Buah-buahan" },
    { id: 8, name: "Jeruk Manis 1kg", price: 25000, category: "Buah-buahan" },
    { id: 9, name: "Bawang Merah 250g", price: 12000, category: "Bumbu" },
    { id: 10, name: "Cabai Rawit Merah 250g", price: 15000, category: "Bumbu" }
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
        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
            <div>
                <span class="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md font-medium">${p.category}</span>
                <h3 class="font-medium text-sm mt-1 text-gray-800">${p.name}</h3>
                <p class="text-emerald-600 text-xs font-semibold">Rp ${p.price.toLocaleString('id-ID')}</p>
            </div>
            <button onclick="addToCart(${p.id})" class="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-emerald-100 transition">Tambah</button>
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

function renderCart() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartList.innerHTML = `<p class="text-gray-400 py-2">Keranjang masih kosong</p>`;
        cartTotal.innerText = `Rp 0`;
        return;
    }

    let total = 0;
    cartList.innerHTML = cart.map(item => {
        let subtotal = item.price * item.qty;
        total += subtotal;
        return `
            <div class="py-2 flex justify-between items-center">
                <div>
                    <span class="font-medium">${item.name}</span>
                    <span class="text-gray-500 text-xs block">(${item.qty}x) - Rp ${subtotal.toLocaleString('id-ID')}</span>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 text-xs px-2 py-1 font-medium hover:underline">Hapus</button>
            </div>
        `;
    }).join('');

    cartTotal.innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Keranjang belanja masih kosong!");
        return;
    }
    let text = "Halo Warung Digital, saya mau pesan:\n\n";
    let total = 0;
    cart.forEach((item, index) => {
        let subtotal = item.price * item.qty;
        total += subtotal;
        text += `${index + 1}. ${item.name} (${item.qty}x) - Rp ${subtotal.toLocaleString('id-ID')}\n`;
    });
    text += `\n*Total Belanja: Rp ${total.toLocaleString('id-ID')}*`;
    
    window.open(`https://wa.me/6280000000000?text=${encodeURIComponent(text)}`, '_blank');
}

renderProducts();
