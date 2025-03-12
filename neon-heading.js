class NeonHeading extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['text', 'font-size', 'font-family', 'font-color', 'text-alignment', 'background-color'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    this.handleResize = () => this.render(); // Re-render on resize for responsiveness
    window.addEventListener('resize', this.handleResize);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    // Get attribute values with fallbacks
    const text = this.getAttribute('text') || 'NEON HEADING';
    const fontSize = parseFloat(this.getAttribute('font-size')) || 5; // In vw
    const fontFamily = this.getAttribute('font-family') || 'Montserrat'; // From original
    const fontColor = this.getAttribute('font-color') || '#ff006c'; // Neon pink base
    const textAlignment = this.getAttribute('text-alignment') || 'center';
    const backgroundColor = this.getAttribute('background-color') || '#000000'; // Black

    // Inject HTML and CSS into shadow DOM
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,600'); /* Ensure Montserrat is available */

        :host {
          width: 100vw;
          height: 100vh;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: ${backgroundColor};
          overflow: hidden;
        }

        .text-wrapper {
          max-width: 80vw; /* Limit width for wrapping */
          display: flex;
          justify-content: ${textAlignment === 'left' ? 'flex-start' : textAlignment === 'right' ? 'flex-end' : 'center'};
          align-items: center;
        }

        .neon-text {
          position: relative;
          font-family: ${fontFamily}, sans-serif;
          font-size: ${fontSize}vw;
          font-weight: 100; /* Light weight from original */
          color: ${fontColor};
          text-align: ${textAlignment};
          text-transform: uppercase;
          padding: 0;
          margin: 0;
          line-height: 1.2; /* Consistent line spacing */
          text-shadow: 
            0 0 10px ${fontColor}, 
            0 0 20px ${fontColor}, 
            0 0 30px ${fontColor}, 
            0 0 40px #ff417d, 
            0 0 70px #ff417d, 
            0 0 80px #ff417d, 
            0 0 100px #ff417d, 
            0 0 150px #ff417d; /* Neon glow effect */
          word-wrap: break-word; /* Enable text wrapping */
          overflow-wrap: break-word; /* Modern standard */
          white-space: normal; /* Allow multiple lines */
        }
      </style>
      <div class="text-wrapper">
        <h1 class="neon-text">${text}</h1>
      </div>
    `;
  }
}

customElements.define('neon-heading', NeonHeading);
