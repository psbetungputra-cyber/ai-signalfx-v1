body { 
    background-color: #0b0e11; 
    color: white; 
    font-family: sans-serif; 
    overflow-x: hidden; 
}

.glass { 
    background: rgba(255, 255, 255, 0.03); 
    backdrop-filter: blur(10px); 
    border-radius: 24px; 
    border: 1px solid rgba(255, 255, 255, 0.05); 
}

.page { display: none; }
.page.active { display: block; }

.menu-item {
    padding: 1rem;
    border-radius: 0.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    font-style: italic;
    transition: 0.2s;
}

.menu-item:hover {
    background: rgba(255, 255, 255, 0.05);
}

/* Responsif Mobile */
@media (max-width: 1024px) {
    #sidebar {
        position: fixed;
        left: -100%;
        width: 280px;
        height: 100vh;
        z-index: 999;
        transition: 0.3s ease-in-out;
        background: #0f1216;
    }
    #sidebar.active { left: 0; }
}
