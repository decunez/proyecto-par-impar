class ParImparLista extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../style/main.css">
            <div class="par-impar-container">
                <div class="empty-message">Ingrese un rango de números para comenzar</div>
            </div>
        `;
    }

    connectedCallback() {
        document.addEventListener('rango-seleccionado', (e) => {
            this.generateList(e.detail.start, e.detail.end);
        });
    }

    generateList(start, end) {
        const container = this.shadowRoot.querySelector('.par-impar-container');
        container.innerHTML = '';

        if (start === undefined || end === undefined) {
            container.innerHTML = '<div class="empty-message">Datos inválidos</div>';
            return;
        }

        for (let i = start; i <= end; i++) {
            const item = document.createElement('div');
            item.className = `number-item ${i % 2 === 0 ? 'par' : 'impar'}`;
            item.textContent = `${i} - ${i % 2 === 0 ? 'Par' : 'Impar'}`;
            container.appendChild(item);
        }
    }
}

customElements.define('par-impar-lista', ParImparLista);