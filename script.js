// DATA MASTER SINYAL
const PAIRS = [
    { name: "XAUUSD", sl: "2315.40", tp: "2368.00", note: "Institutional Order Block H1" },
    { name: "BTCUSDT", sl: "61200", tp: "68000", note: "Liquidity Sweep detected" },
    { name: "EURUSD", sl: "1.0820", tp: "1.0950", note: "BOS Structure on M15" }
];

// FUNGSI NAVIGASI
function toggleSidebar() { 
    document.getElementById('sidebar').classList.toggle('active'); 
}

function switchPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    // Auto-close sidebar on mobile after click
    if(window.innerWidth < 1024) {
        document.getElementById('sidebar').classList.remove('active');
    }
}

// INISIALISASI APLIKASI
function initApp() {
    // Memuat TradingView Widget
    if (document.getElementById('tv-full-container')) {
        new TradingView.widget({
            "autosize": true,
            "symbol": "OANDA:XAUUSD",
            "interval": "15",
            "container_id": "tv-full-container",
            "theme": "dark",
            "style": "1",
            "locale": "id"
        });
    }

    // Memuat Daftar Pair ke Tabel
    const body = document.getElementById('pair-list-body');
    if (body) {
        body.innerHTML = ''; // Clear existing
        PAIRS.forEach(p => {
            body.innerHTML += `
                <tr onclick="selectPair('${p.name}')" class="border-b border-white/5 hover:bg-white/5 cursor-pointer">
                    <td class="p-4 font-bold italic">${p.name}</td>
                    <td class="p-4 text-[10px] text-blue-500 font-bold uppercase">SMC Scan</td>
                    <td class="p-4 text-right"><i class="fas fa-chevron-right"></i></td>
                </tr>`;
        });
    }
}

// FUNGSI MEMILIH PAIR
function selectPair(name) {
    const data = PAIRS.find(p => p.name === name);
    const displayArea = document.getElementById('signal-display-area');
    
    if (data && displayArea) {
        displayArea.classList.remove('hidden');
        document.getElementById('active-pair').innerText = data.name;
        document.getElementById('sig-sl').innerText = data.sl;
        document.getElementById('sig-tp').innerText = data.tp;
        document.getElementById('sig-note').innerText = data.note;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Jalankan fungsi saat window selesai load
window.onload = initApp;
