/**
 * Portafolio de David Gonzalez
 * Main JavaScript File
 */

'use strict';

// ======================
// NAVIGATION MODULE
// ======================
const Navigation = {
    init() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('href').substring(1);
                this.showSection(sectionId, link);
            });
        });
    },

    showSection(sectionId, clickedLink) {
        const section = document.getElementById(sectionId);

        if (!section) {
            console.error(`Section ${sectionId} not found`);
            return;
        }

        // Hide all sections
        document.querySelectorAll('.section').forEach(s => {
            s.classList.remove('active');
        });

        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Show selected section
        section.classList.add('active');

        // Add active class to clicked nav link
        if (clickedLink) {
            clickedLink.classList.add('active');
        }

        // Initialize diagram if diagrama section is selected
        if (sectionId === 'diagrama') {
            setTimeout(() => SkillsDiagram.init(), 100);
        }
    }
};

// Global function for onclick compatibility (legacy)
function showSection(sectionId, clickedLink) {
    Navigation.showSection(sectionId, clickedLink);
}

// ======================
// SKILLS DIAGRAM MODULE
// ======================
const SkillsDiagram = {
    initialized: false,
    nodes: {},
    connections: [],

    skills: {
        // Nodos principales (categorías)
        frontend: {
            type: 'category',
            class: 'frontend center-node',
            position: { x: 15, y: 25 },
            connections: ['javascript', 'html', 'vuejs', 'tailwind']
        },
        backend: {
            type: 'category',
            class: 'backend center-node',
            position: { x: 85, y: 25 },
            connections: ['php', 'laravel', 'python', 'django', 'vbnet']
        },
        database: {
            type: 'category',
            class: 'database center-node',
            position: { x: 50, y: 15 },
            connections: ['mysql', 'oracle', 'dataverse']
        },
        automation: {
            type: 'category',
            class: 'automation center-node',
            position: { x: 20, y: 70 },
            connections: ['uipath', 'powerautomate', 'vba']
        },
        tools: {
            type: 'category',
            class: 'tools center-node',
            position: { x: 80, y: 70 },
            connections: ['git', 'postman', 'powerapps', 'odoo']
        },
        methodologies: {
            type: 'category',
            class: 'methodologies center-node',
            position: { x: 50, y: 85 },
            connections: ['scrum', 'kanban']
        },
        // Tecnologías específicas
        javascript: {
            type: 'tech',
            class: 'frontend tech-node',
            position: { x: 5, y: 40 },
            connections: ['vuejs', 'php', 'postman']
        },
        html: {
            type: 'tech',
            class: 'frontend tech-node',
            position: { x: 25, y: 10 },
            connections: ['tailwind', 'javascript']
        },
        vuejs: {
            type: 'tech',
            class: 'frontend tech-node',
            position: { x: 35, y: 35 },
            connections: ['laravel', 'tailwind']
        },
        tailwind: {
            type: 'tech',
            class: 'frontend tech-node',
            position: { x: 30, y: 50 },
            connections: ['html', 'vuejs']
        },
        php: {
            type: 'tech',
            class: 'backend tech-node',
            position: { x: 70, y: 40 },
            connections: ['laravel', 'mysql', 'oracle']
        },
        laravel: {
            type: 'tech',
            class: 'backend tech-node',
            position: { x: 65, y: 50 },
            connections: ['php', 'mysql', 'vuejs']
        },
        python: {
            type: 'tech',
            class: 'backend tech-node',
            position: { x: 90, y: 40 },
            connections: ['django', 'mysql']
        },
        django: {
            type: 'tech',
            class: 'backend tech-node',
            position: { x: 95, y: 55 },
            connections: ['python']
        },
        vbnet: {
            type: 'tech',
            class: 'backend tech-node',
            position: { x: 75, y: 10 },
            connections: []
        },
        mysql: {
            type: 'tech',
            class: 'database tech-node',
            position: { x: 40, y: 5 },
            connections: ['php', 'laravel', 'python']
        },
        oracle: {
            type: 'tech',
            class: 'database tech-node',
            position: { x: 60, y: 5 },
            connections: ['php']
        },
        dataverse: {
            type: 'tech',
            class: 'database tech-node',
            position: { x: 50, y: 2 },
            connections: ['powerapps']
        },
        uipath: {
            type: 'tech',
            class: 'automation tech-node',
            position: { x: 10, y: 85 },
            connections: ['vba']
        },
        powerautomate: {
            type: 'tech',
            class: 'automation tech-node',
            position: { x: 30, y: 85 },
            connections: ['powerapps', 'vba']
        },
        vba: {
            type: 'tech',
            class: 'automation tech-node',
            position: { x: 5, y: 55 },
            connections: ['uipath', 'powerautomate']
        },
        git: {
            type: 'tech',
            class: 'tools tech-node',
            position: { x: 95, y: 75 },
            connections: ['laravel', 'django']
        },
        postman: {
            type: 'tech',
            class: 'tools tech-node',
            position: { x: 70, y: 85 },
            connections: ['php', 'laravel']
        },
        powerapps: {
            type: 'tech',
            class: 'tools tech-node',
            position: { x: 85, y: 85 },
            connections: ['powerautomate', 'dataverse']
        },
        odoo: {
            type: 'tech',
            class: 'tools tech-node',
            position: { x: 90, y: 10 },
            connections: []
        },
        scrum: {
            type: 'tech',
            class: 'methodologies tech-node',
            position: { x: 40, y: 95 },
            connections: ['kanban']
        },
        kanban: {
            type: 'tech',
            class: 'methodologies tech-node',
            position: { x: 60, y: 95 },
            connections: ['scrum']
        }
    },

    capitalize(str) {
        const specialCases = {
            'javascript': 'JavaScript',
            'html': 'HTML',
            'vuejs': 'Vue.js',
            'tailwind': 'Tailwind CSS',
            'php': 'PHP',
            'laravel': 'Laravel',
            'python': 'Python',
            'django': 'Django',
            'vbnet': 'VB.NET',
            'mysql': 'MySQL',
            'oracle': 'ORACLE',
            'dataverse': 'Dataverse',
            'uipath': 'UiPath',
            'powerautomate': 'Power Automate',
            'vba': 'VBA',
            'git': 'Git',
            'postman': 'Postman',
            'powerapps': 'Power Apps',
            'odoo': 'Odoo',
            'scrum': 'Scrum',
            'kanban': 'Kanban',
            'frontend': 'FRONTEND',
            'backend': 'BACKEND',
            'database': 'BASES DE DATOS',
            'automation': 'AUTOMATIZACIÓN',
            'tools': 'HERRAMIENTAS',
            'methodologies': 'METODOLOGÍAS'
        };
        return specialCases[str] || str.charAt(0).toUpperCase() + str.slice(1);
    },

    init() {
        if (this.initialized) return;

        const networkContainer = document.getElementById('network');
        if (!networkContainer) {
            console.error('Network container not found');
            return;
        }

        // Clear container
        networkContainer.innerHTML = '';

        // Create nodes
        Object.entries(this.skills).forEach(([id, skill]) => {
            const node = document.createElement('div');
            node.className = `node ${skill.class}`;
            node.id = id;
            node.textContent = this.capitalize(id);

            node.style.left = `${skill.position.x}%`;
            node.style.top = `${skill.position.y}%`;
            node.style.transform = 'translate(-50%, -50%)';

            networkContainer.appendChild(node);
            this.nodes[id] = node;
        });

        // Create connections
        Object.entries(this.skills).forEach(([id, skill]) => {
            skill.connections.forEach(targetId => {
                this.createConnection(id, targetId, networkContainer);
            });
        });

        // Setup interaction events
        this.setupInteractions();

        this.initialized = true;
    },

    createConnection(from, to, container) {
        const fromNode = this.nodes[from];
        const toNode = this.nodes[to];

        if (!fromNode || !toNode) return;

        const connection = document.createElement('div');
        connection.className = 'connection';
        connection.dataset.from = from;
        connection.dataset.to = to;

        this.updateConnectionPosition(connection, fromNode, toNode, container);

        container.appendChild(connection);
        this.connections.push(connection);
    },

    updateConnectionPosition(connection, fromNode, toNode, container) {
        const fromRect = fromNode.getBoundingClientRect();
        const toRect = toNode.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const fromX = fromRect.left + fromRect.width / 2 - containerRect.left;
        const fromY = fromRect.top + fromRect.height / 2 - containerRect.top;
        const toX = toRect.left + toRect.width / 2 - containerRect.left;
        const toY = toRect.top + toRect.height / 2 - containerRect.top;

        const distance = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
        const angle = Math.atan2(toY - fromY, toX - fromX) * (180 / Math.PI);

        connection.style.left = fromX + 'px';
        connection.style.top = fromY + 'px';
        connection.style.width = distance + 'px';
        connection.style.transform = `rotate(${angle}deg)`;
    },

    setupInteractions() {
        let activeConnections = [];

        const highlightConnections = (nodeId) => {
            activeConnections.forEach(conn => conn.classList.remove('active'));
            activeConnections = [];

            this.connections.forEach(connection => {
                if (connection.dataset.from === nodeId || connection.dataset.to === nodeId) {
                    connection.classList.add('active');
                    activeConnections.push(connection);
                }
            });

            document.querySelectorAll('.node').forEach(node => {
                node.classList.remove('active', 'pulse');
            });

            if (this.nodes[nodeId]) {
                this.nodes[nodeId].classList.add('active', 'pulse');

                if (this.skills[nodeId].connections) {
                    this.skills[nodeId].connections.forEach(connId => {
                        if (this.nodes[connId]) {
                            this.nodes[connId].classList.add('active');
                        }
                    });
                }
            }
        };

        const clearHighlights = () => {
            activeConnections.forEach(conn => conn.classList.remove('active'));
            activeConnections = [];
            document.querySelectorAll('.node').forEach(node => {
                node.classList.remove('active', 'pulse');
            });
        };

        // Events for nodes
        Object.keys(this.nodes).forEach(nodeId => {
            const node = this.nodes[nodeId];

            node.addEventListener('mouseenter', () => {
                highlightConnections(nodeId);
            });

            node.addEventListener('mouseleave', () => {
                clearHighlights();
            });

            node.addEventListener('click', () => {
                highlightConnections(nodeId);
                setTimeout(clearHighlights, 3000);
            });
        });
    }
};

// Global function for legacy compatibility
function initSkillsNetwork() {
    SkillsDiagram.init();
}

// ======================
// PROJECTS FILTER MODULE
// ======================
const ProjectsFilter = {
    filterProjects(category) {
        const containers = document.querySelectorAll('.projects-container');
        const filters = document.querySelectorAll('[id^="filter-"]');

        // Remove active class from all filters
        filters.forEach(filter => {
            filter.style.background = 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(59, 130, 246, 0.05))';
            filter.style.transform = 'scale(1)';
            filter.style.boxShadow = 'none';
            filter.style.border = 'none';
        });

        // Add active class to selected filter
        const activeFilter = document.getElementById(`filter-${category}`);
        if (activeFilter) {
            activeFilter.style.background = 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(59, 130, 246, 0.1))';
            activeFilter.style.transform = 'scale(1.05)';
            activeFilter.style.boxShadow = '0 5px 15px rgba(37, 99, 235, 0.3)';
            activeFilter.style.border = '2px solid rgba(37, 99, 235, 0.3)';
            activeFilter.style.borderRadius = '10px';
        }

        if (category === 'all') {
            // Show all containers
            containers.forEach(container => {
                container.style.display = 'block';
                container.style.animation = 'fadeIn 0.5s ease';
            });
        } else {
            // Show only selected container
            containers.forEach(container => {
                if (container.dataset.category === category) {
                    container.style.display = 'block';
                    container.style.animation = 'fadeIn 0.5s ease';
                } else {
                    container.style.display = 'none';
                }
            });
        }
    }
};

// Global function for legacy compatibility
function filterProjects(category) {
    ProjectsFilter.filterProjects(category);
}

// ======================
// ANIMATIONS MODULE
// ======================
const Animations = {
    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            observer.observe(card);
        });
    }
};

// ======================
// MOBILE MENU MODULE
// ======================
const MobileMenu = {
    init() {
        // Create hamburger button
        const nav = document.querySelector('.nav-tabs');
        if (!nav) return;

        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.innerHTML = '<span></span><span></span><span></span>';

        nav.appendChild(hamburger);

        const navList = document.querySelector('.nav-list');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navList.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
            });
        });
    }
};

// ======================
// DARK MODE MODULE
// ======================
const DarkMode = {
    init() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.icon = this.themeToggle.querySelector('i');

        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || this.getPreferredTheme();
        this.setTheme(currentTheme);

        // Listen for toggle clicks
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    },

    getPreferredTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    },

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateIcon(theme);
    },

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    },

    updateIcon(theme) {
        if (theme === 'dark') {
            this.icon.classList.remove('fa-moon');
            this.icon.classList.add('fa-sun');
        } else {
            this.icon.classList.remove('fa-sun');
            this.icon.classList.add('fa-moon');
        }
    }
};

// ======================
// IMAGE GALLERY MODULE
// ======================
const ImageGallery = {
    changeImage(thumb, projectId) {
        const gallery = document.querySelector(`.project-gallery[data-project="${projectId}"]`);
        if (!gallery) return;

        const mainImage = gallery.querySelector('.gallery-main img');
        const thumbs = gallery.querySelectorAll('.thumb');

        // Update main image
        mainImage.src = thumb.src;
        mainImage.alt = thumb.alt;

        // Update active thumb
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    },

    openModal(imageSrc) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');

        modalImage.src = imageSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    closeModal() {
        const modal = document.getElementById('imageModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    },

    init() {
        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Prevent modal close when clicking on image
        const modalImage = document.getElementById('modalImage');
        if (modalImage) {
            modalImage.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }
};

// Global functions for onclick compatibility
function changeGalleryImage(thumb, projectId) {
    ImageGallery.changeImage(thumb, projectId);
}

function openImageModal(imageSrc) {
    ImageGallery.openModal(imageSrc);
}

function closeImageModal() {
    ImageGallery.closeModal();
}

// ======================
// CV GENERATOR MODULE
// ======================
const CVGenerator = {
    // Colores del tema
    colors: {
        primary: [37, 99, 235],      // Azul principal
        dark: [30, 41, 59],          // Texto oscuro
        gray: [100, 116, 139],       // Texto secundario
        light: [241, 245, 249],      // Fondo claro
        white: [255, 255, 255]
    },

    // Datos del CV
    data: {
        personal: {
            nombre: 'David Steven Gonzalez Padilla',
            titulo: 'Desarrollador Full Stack | Laravel + Vue.js',
            telefono: '+57 305 759 4088',
            email: 'davidsgonzalez98@hotmail.com',
            ubicacion: 'Bogotá, Colombia',
            linkedin: 'linkedin.com/in/david-steven-gonzalez-padilla',
            github: 'github.com/ROBOCOP3PK'
        },
        perfil: 'Desarrollador Full Stack con más de 3 años de experiencia creando soluciones web para el sector público y empresarial. Especializado en Laravel y Vue.js, con sólida experiencia en automatización de procesos (RPA) y desarrollo de aplicaciones empresariales con Power Platform. Enfoque en código limpio, buenas prácticas y entrega de valor.',
        experiencia: [
            {
                cargo: 'Desarrollador Full Stack',
                empresa: 'TurriSystem',
                periodo: 'Dic 2024 - Actualidad',
                ubicacion: 'Bogotá (Híbrido)',
                logros: [
                    'Desarrollo de sistemas para el sector público con Laravel y Vue.js',
                    'Gestión de bases de datos MySQL y ORACLE',
                    'Implementación de APIs RESTful y módulos completos',
                    'Interfaces responsivas con Tailwind CSS'
                ]
            },
            {
                cargo: 'Desarrollador RPA',
                empresa: 'Thomas Greg and Sons',
                periodo: 'Feb 2023 - Nov 2024',
                ubicacion: 'Bogotá (Híbrido)',
                logros: [
                    'Automatización de procesos con UiPath y Power Automate',
                    'Desarrollo de aplicaciones internas con Power Apps',
                    'Creación de 5+ asistentes virtuales para procesos críticos',
                    'Reducción de tiempos operativos mediante automatización'
                ]
            },
            {
                cargo: 'Auxiliar II Mejora Continua',
                empresa: 'Thomas Greg and Sons',
                periodo: 'Sep 2021 - Ene 2023',
                ubicacion: 'Bogotá',
                logros: [
                    'Automatización de tareas con scripts y macros',
                    'Apoyo en proyectos de transformación digital',
                    'Levantamiento de información y casos de usuario'
                ]
            }
        ],
        educacion: [
            {
                titulo: 'Especialización en Gestión de TI',
                institucion: 'Universidad CUN',
                periodo: 'En curso - 2026'
            },
            {
                titulo: 'Ingeniería Electrónica',
                institucion: 'Universidad Cooperativa de Colombia',
                periodo: 'Finalizada - 2022'
            }
        ],
        habilidades: {
            tecnicas: [
                'PHP / Laravel',
                'JavaScript / Vue.js',
                'MySQL / ORACLE',
                'Tailwind CSS',
                'Python / Django',
                'Git / Postman',
                'UiPath / Power Automate',
                'Power Apps / Dataverse'
            ],
            blandas: [
                'Resolución de problemas',
                'Trabajo en equipo',
                'Comunicación efectiva',
                'Adaptación al cambio'
            ]
        },
        idiomas: [
            { idioma: 'Español', nivel: 'Nativo' },
            { idioma: 'Inglés', nivel: 'B2 - Intermedio' }
        ],
        certificaciones: [
            'Six Sigma - Universidad EAN',
            'UiPath Developer - UiPath Academy',
            'Power Apps - Microsoft Learn'
        ]
    },

    async generate() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');

        // Cargar fuentes con soporte UTF-8
        await window.RobotoFontLoader.initFonts(doc);

        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 15;
        const contentWidth = pageWidth - (margin * 2);
        let y = 0;

        // === HEADER CON FONDO AZUL ===
        doc.setFillColor(...this.colors.primary);
        doc.rect(0, 0, pageWidth, 52, 'F');

        // Nombre
        doc.setTextColor(...this.colors.white);
        doc.setFontSize(24);
        doc.setFont('Roboto', 'bold');
        doc.text(this.data.personal.nombre, margin, 20);

        // Titulo profesional
        doc.setFontSize(12);
        doc.setFont('Roboto', 'normal');
        doc.text(this.data.personal.titulo, margin, 28);

        // Informacion de contacto en header
        doc.setFontSize(9);
        const contactLine1 = `${this.data.personal.telefono}  |  ${this.data.personal.email}  |  ${this.data.personal.ubicacion}`;
        const contactLine2 = `${this.data.personal.linkedin}  |  ${this.data.personal.github}`;
        doc.text(contactLine1, margin, 38);
        doc.text(contactLine2, margin, 44);

        y = 60;

        // === PERFIL PROFESIONAL ===
        y = this.addSection(doc, 'PERFIL PROFESIONAL', y, margin);
        doc.setTextColor(...this.colors.dark);
        doc.setFontSize(10);
        doc.setFont('Roboto', 'normal');
        const perfilLines = doc.splitTextToSize(this.data.perfil, contentWidth);
        doc.text(perfilLines, margin, y);
        y += perfilLines.length * 5 + 8;

        // === EXPERIENCIA LABORAL ===
        y = this.addSection(doc, 'EXPERIENCIA LABORAL', y, margin);

        this.data.experiencia.forEach(exp => {
            // Check if we need a new page
            if (y > pageHeight - 50) {
                doc.addPage();
                y = 20;
            }

            // Cargo y empresa
            doc.setTextColor(...this.colors.dark);
            doc.setFontSize(11);
            doc.setFont('Roboto', 'bold');
            doc.text(exp.cargo, margin, y);

            doc.setFontSize(10);
            doc.setFont('Roboto', 'normal');
            doc.setTextColor(...this.colors.primary);
            doc.text(exp.empresa, margin, y + 5);

            // Periodo y ubicacion (alineado a la derecha)
            doc.setTextColor(...this.colors.gray);
            doc.setFontSize(9);
            const periodoText = `${exp.periodo} | ${exp.ubicacion}`;
            const periodoWidth = doc.getTextWidth(periodoText);
            doc.text(periodoText, pageWidth - margin - periodoWidth, y);

            y += 12;

            // Logros
            doc.setTextColor(...this.colors.dark);
            doc.setFontSize(9);
            exp.logros.forEach(logro => {
                doc.text(`•  ${logro}`, margin + 3, y);
                y += 4.5;
            });

            y += 6;
        });

        // === DOS COLUMNAS: EDUCACION Y HABILIDADES ===
        if (y > pageHeight - 80) {
            doc.addPage();
            y = 20;
        }

        const colWidth = (contentWidth - 10) / 2;
        const leftCol = margin;
        const rightCol = margin + colWidth + 10;
        let yLeft = y;
        let yRight = y;

        // COLUMNA IZQUIERDA: EDUCACION
        yLeft = this.addSection(doc, 'EDUCACIÓN', yLeft, leftCol, colWidth);

        this.data.educacion.forEach(edu => {
            doc.setTextColor(...this.colors.dark);
            doc.setFontSize(10);
            doc.setFont('Roboto', 'bold');
            const tituloLines = doc.splitTextToSize(edu.titulo, colWidth);
            doc.text(tituloLines, leftCol, yLeft);
            yLeft += tituloLines.length * 4;

            doc.setFont('Roboto', 'normal');
            doc.setTextColor(...this.colors.primary);
            doc.setFontSize(9);
            doc.text(edu.institucion, leftCol, yLeft);
            yLeft += 4;

            doc.setTextColor(...this.colors.gray);
            doc.text(edu.periodo, leftCol, yLeft);
            yLeft += 8;
        });

        // Certificaciones
        yLeft += 4;
        doc.setTextColor(...this.colors.primary);
        doc.setFontSize(10);
        doc.setFont('Roboto', 'bold');
        doc.text('CERTIFICACIONES', leftCol, yLeft);
        yLeft += 6;

        doc.setTextColor(...this.colors.dark);
        doc.setFontSize(9);
        doc.setFont('Roboto', 'normal');
        this.data.certificaciones.forEach(cert => {
            doc.text(`•  ${cert}`, leftCol, yLeft);
            yLeft += 4.5;
        });

        // COLUMNA DERECHA: HABILIDADES
        yRight = this.addSection(doc, 'HABILIDADES TÉCNICAS', yRight, rightCol, colWidth);

        doc.setTextColor(...this.colors.dark);
        doc.setFontSize(9);
        doc.setFont('Roboto', 'normal');

        // Skills en dos sub-columnas
        const skillsPerCol = Math.ceil(this.data.habilidades.tecnicas.length / 2);
        const subColWidth = colWidth / 2;

        this.data.habilidades.tecnicas.forEach((skill, index) => {
            const isLeftSubCol = index < skillsPerCol;
            const xPos = isLeftSubCol ? rightCol : rightCol + subColWidth;
            const skillY = yRight + (isLeftSubCol ? index : index - skillsPerCol) * 5;
            doc.text(`•  ${skill}`, xPos, skillY);
        });

        yRight += skillsPerCol * 5 + 6;

        // Habilidades blandas
        doc.setTextColor(...this.colors.primary);
        doc.setFontSize(10);
        doc.setFont('Roboto', 'bold');
        doc.text('HABILIDADES BLANDAS', rightCol, yRight);
        yRight += 6;

        doc.setTextColor(...this.colors.dark);
        doc.setFontSize(9);
        doc.setFont('Roboto', 'normal');
        this.data.habilidades.blandas.forEach(skill => {
            doc.text(`•  ${skill}`, rightCol, yRight);
            yRight += 4.5;
        });

        yRight += 6;

        // Idiomas
        doc.setTextColor(...this.colors.primary);
        doc.setFontSize(10);
        doc.setFont('Roboto', 'bold');
        doc.text('IDIOMAS', rightCol, yRight);
        yRight += 6;

        doc.setTextColor(...this.colors.dark);
        doc.setFontSize(9);
        doc.setFont('Roboto', 'normal');
        this.data.idiomas.forEach(lang => {
            doc.text(`•  ${lang.idioma}: ${lang.nivel}`, rightCol, yRight);
            yRight += 4.5;
        });

        // === FOOTER ===
        const finalY = Math.max(yLeft, yRight) + 10;
        if (finalY < pageHeight - 15) {
            doc.setDrawColor(...this.colors.light);
            doc.setLineWidth(0.5);
            doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

            doc.setTextColor(...this.colors.gray);
            doc.setFontSize(8);
            doc.text('CV generado desde portafolio web', margin, pageHeight - 7);

            const dateText = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long' });
            const dateWidth = doc.getTextWidth(dateText);
            doc.text(dateText, pageWidth - margin - dateWidth, pageHeight - 7);
        }

        // Descargar
        doc.save('David_Gonzalez_CV.pdf');
    },

    addSection(doc, title, y, x, maxWidth = null) {
        doc.setTextColor(...this.colors.primary);
        doc.setFontSize(11);
        doc.setFont('Roboto', 'bold');
        doc.text(title, x, y);

        // Linea bajo el titulo
        const titleWidth = maxWidth || doc.getTextWidth(title);
        doc.setDrawColor(...this.colors.primary);
        doc.setLineWidth(0.5);
        doc.line(x, y + 1.5, x + Math.min(titleWidth, 50), y + 1.5);

        return y + 8;
    }
};

// ======================
// INITIALIZATION
// ======================
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    Animations.init();
    MobileMenu.init();
    DarkMode.init();
    ImageGallery.init();
});
