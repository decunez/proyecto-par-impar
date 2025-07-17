class InputRange extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this.shadowRoot.innerHTML = `
            <style>
                .input-container {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    padding: 15px;
                    background-color: #f8f9fa;
                    border-radius: 8px;
                }
                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                label {
                    font-weight: bold;
                    color: #2c3e50;
                    font-size: 14px;
                }
                input {
                    padding: 10px 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                    transition: border-color 0.3s;
                }
                input:focus {
                    outline: none;
                    border-color: #3498db;
                }
                button {
                    background-color: #3498db;
                    color: white;
                    border: none;
                    padding: 12px 15px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.3s;
                    margin-top: 10px;
                }
                button:hover {
                    background-color: #2980b9;
                }
                button:disabled {
                    background-color: #95a5a6;
                    cursor: not-allowed;
                }
                .error {
                    color: #e74c3c;
                    font-size: 13px;
                    margin-top: 5px;
                    display: none;
                }
            </style>
            <div class="input-container">
                <div class="input-group">
                    <label for="start">Número inicial:</label>
                    <input type="number" id="start" placeholder="Ej: 1">
                </div>
                <div class="input-group">
                    <label for="end">Número final:</label>
                    <input type="number" id="end" placeholder="Ej: 10">
                    <div class="error" id="error"></div>
                </div>
                <button id="submit" disabled>Generar lista</button>
            </div>
        `;

        this.startInput = null;
        this.endInput = null;
        this.submitButton = null;
        this.errorElement = null;
    }

    connectedCallback() {
        this.startInput = this.shadowRoot.getElementById('start');
        this.endInput = this.shadowRoot.getElementById('end');
        this.submitButton = this.shadowRoot.getElementById('submit');
        this.errorElement = this.shadowRoot.getElementById('error');

        // Habilitar el botón solo cuando ambos campos tengan valor
        [this.startInput, this.endInput].forEach(input => {
            input.addEventListener('input', () => {
                this.validateInputs();
            });
        });

        this.submitButton.addEventListener('click', () => {
            this.handleSubmit();
        });
    }

    validateInputs() {
        const start = this.startInput.value.trim();
        const end = this.endInput.value.trim();

        // Habilitar botón solo si ambos campos tienen valor
        this.submitButton.disabled = !(start && end);

        // Limpiar errores al escribir
        if (this.errorElement.style.display === 'block') {
            this.errorElement.style.display = 'none';
        }
    }

    handleSubmit() {
        const start = parseInt(this.startInput.value);
        const end = parseInt(this.endInput.value);

        // Validaciones
        if (isNaN(start)) {
            this.showError("El valor inicial debe ser un número válido");
            return;
        }

        if (isNaN(end)) {
            this.showError("El valor final debe ser un número válido");
            return;
        }

        if (start > end) {
            this.showError("El número inicial debe ser menor o igual al final");
            return;
        }

        // Si las validaciones pasan, emitir el evento
        this.emitRangeSelected(start, end);
    }

    showError(message) {
        this.errorElement.textContent = message;
        this.errorElement.style.display = "block";
    }

    emitRangeSelected(start, end) {
        this.errorElement.style.display = "none";

        const event = new CustomEvent('rango-seleccionado', {
            detail: {
                start: start,
                end: end
            },
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(event);
    }
}

customElements.define('input-range', InputRange);