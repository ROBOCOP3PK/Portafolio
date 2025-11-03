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
// INITIALIZATION
// ======================
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    Animations.init();
    MobileMenu.init();
});
