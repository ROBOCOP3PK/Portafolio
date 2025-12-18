/**
 * Roboto Font Loader for jsPDF
 * Loads Roboto font with UTF-8 support (tildes, ñ, etc.)
 */
const RobotoFontLoader = {
    fontLoaded: false,
    fontData: null,

    // URLs de fuentes Roboto desde Google Fonts CDN
    fontUrls: {
        regular: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf',
        bold: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAw.ttf'
    },

    /**
     * Carga una fuente desde URL y la convierte a base64
     */
    async loadFont(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error cargando fuente');
            const arrayBuffer = await response.arrayBuffer();
            return this.arrayBufferToBase64(arrayBuffer);
        } catch (error) {
            console.error('Error cargando fuente:', error);
            return null;
        }
    },

    /**
     * Convierte ArrayBuffer a base64
     */
    arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    },

    /**
     * Inicializa las fuentes en el documento jsPDF
     */
    async initFonts(doc) {
        if (!this.fontData) {
            // Cargar ambas fuentes en paralelo
            const [regularFont, boldFont] = await Promise.all([
                this.loadFont(this.fontUrls.regular),
                this.loadFont(this.fontUrls.bold)
            ]);

            this.fontData = {
                regular: regularFont,
                bold: boldFont
            };
        }

        if (this.fontData.regular) {
            doc.addFileToVFS('Roboto-Regular.ttf', this.fontData.regular);
            doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
        }

        if (this.fontData.bold) {
            doc.addFileToVFS('Roboto-Bold.ttf', this.fontData.bold);
            doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
        }

        this.fontLoaded = true;
        return this.fontLoaded;
    }
};

// Exponer globalmente
window.RobotoFontLoader = RobotoFontLoader;
