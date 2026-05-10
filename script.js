const fbURL = "https://ai-signalfx-default-rtdb.asia-southeast1.firebasedatabase.app/";
let currentUser = null;
let currentPair = "XAUUSD";

const ACCESS_KEYS = {
    "psbetung": { pass: "admin123", role: "ADMIN", status: "VIP", name: "PSBETUNG" },
    "trader": { pass: "guest123", role: "USER", status: "FREE", name: "GUEST" }
};

function handleLogin() {
    const u = document.getElementById('username').value.toLowerCase();
    const p = document.getElementById('password').value;
    if (ACCESS_KEYS[u] && ACCESS_KEYS[u].pass === p) {
        currentUser = ACCESS_KEYS[u];
        document.getElementById('login-screen').classList.add('hidden');
        initApp();
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
}

function initApp() {
    document.getElementById('display-name').innerText = currentUser.name;
    document.getElementById('status-badge').innerText = currentUser.status + " MEMBER";
    if(currentUser.role === 'ADMIN') document.getElementById('admin-nav').classList.remove('hidden');
    initTV("OANDA:XAUUSD");
    startLiveSync();
}

function toggleMenu() { document.getElementById('sidebar').classList.toggle('open'); }

function switchPage(pageId, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('nav-active'));
    if(el) el.classList.add('nav-active');
    if(window.innerWidth < 1024) toggleMenu();
}

function initTV(symbol) {
    new TradingView.widget({
        "autosize": true,
        "symbol": symbol,
        "interval": "15",
        "theme": "dark",
        "container_id": "tv-chart-box"
    });
}

function startLiveSync() {
    setInterval(async () => {
        const res = await fetch(fbURL + "signal.json");
        const data = await res.json();
        if(data) {
            document.getElementById('web-price').innerText = data.entry || '0.00';
            document.getElementById('web-sl').innerText = data.sl || '0.00';
            document.getElementById('web-tp').innerText = data.tp || '0.00';
            document.getElementById('web-zone').innerText = data.note || 'WAITING';
        }
    }, 3000);
    startCommunityFeed();
}

function startCommunityFeed() {
    const container = document.getElementById('user-pings');
    setInterval(async () => {
        const res = await fetch(fbURL + 'community_feed.json?limitToLast=10');
        const data = await res.json();
        if (data) {
            container.innerHTML = ""; 
            Object.values(data).reverse().forEach(item => {
                container.innerHTML += `
                    <div class="bg-[#161a1e] p-4 rounded-[24px] border-l-4 border-blue-500 shadow-xl">
                        <span class="text-[8px] font-black text-blue-400 uppercase">${item.user}</span>
                        <p class="text-[10px] text-gray-300 italic mt-1 uppercase">${item.msg}</p>
                    </div>`;
            });
        }
    }, 5000);
}

function logout() { location.reload(); }

