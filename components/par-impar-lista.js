class ParImparLista extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this.shadowRoot.innerHTML = `
            <style>
                .result-container {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .number-item {
                    padding: 10px;
                    border-radius: 4px;
                    background-color: #f8f9fa;
                }
                .number-item.par {
                    border-left: 4px solid #2ecc71;
                }
                .number-item.impar {
                    border-left: 4px solid #e74c3c;
                }
                .empty-message {
                    color: #7f8c8d;
                    text-align: center;
                    font-style: italic;
                }
            </style>
            <div class="result-container">
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
        const container = this.shadowRoot.querySelector('.result-container');
        container.innerHTML = ''; // Limpiar contenido anterior

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