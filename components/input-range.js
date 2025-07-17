class InputRange extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../style/main.css">
            <div class="input-range-container">
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
        this.submitButton.disabled = !(start && end);
        if (this.errorElement.style.display === 'block') {
            this.errorElement.style.display = 'none';
        }
    }

    handleSubmit() {
        const start = parseInt(this.startInput.value);
        const end = parseInt(this.endInput.value);

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

        this.emitRangeSelected(start, end);
    }

    showError(message) {
        this.errorElement.textContent = message;
        this.errorElement.style.display = "block";
    }

    emitRangeSelected(start, end) {
        this.errorElement.style.display = "none";
        const event = new CustomEvent('rango-seleccionado', {
            detail: { start, end },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }
}

customElements.define('input-range', InputRange);