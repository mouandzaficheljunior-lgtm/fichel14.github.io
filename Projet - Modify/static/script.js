// === Fondu d’entrée de page ===
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');

    const pageTitle = document.title;

    // === Animation du titre ===
    const titre = document.querySelector('h1') || document.querySelector('h2');
    if (titre) {
        titre.style.opacity = 0;
        titre.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            titre.style.opacity = 1;
            titre.style.transform = 'translateY(0)';
        }, 100);
    }

    // === Barre de chargement + notification (tableau de bord) ===
    if (pageTitle.includes('Tableau de bord')) {
        const loader = document.createElement('div');
        loader.className = 'loader-bar';
        document.body.appendChild(loader);
        setTimeout(() => {
            loader.style.width = '100%';
        }, 100);
        setTimeout(() => {
            loader.style.opacity = '0';
        }, 2000);

        const notif = document.createElement('div');
        notif.className = 'notification';
        notif.textContent = "👋 Bonjour [Nom de l'étudiant] ! Ravi de vous revoir.";
        document.body.appendChild(notif);
        setTimeout(() => {
            notif.style.opacity = 1;
        }, 500);
        setTimeout(() => {
            notif.style.opacity = 0;
        }, 4000);
    }

    // === Validation du formulaire (formulaire.html) ===
    if (pageTitle.includes('Inscription')) {
        const form = document.querySelector('form');
        const email = document.querySelector('#email');
        const motDePasse = document.querySelector('#mot_de_passe');
        const bouton = document.querySelector('button');

        bouton.addEventListener('click', () => {
            bouton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                bouton.style.transform = 'scale(1)';
            }, 150);
        });

        form.addEventListener('submit', (e) => {
            let erreurs = [];

            if (!email.value.includes('@')) {
                erreurs.push("L'adresse email doit contenir '@'.");
            }

            if (motDePasse.value.length < 6) {
                erreurs.push("Le mot de passe doit contenir au moins 6 caractères.");
            }

            if (erreurs.length > 0) {
                e.preventDefault();
                alert(erreurs.join('\n'));
            } else {
                e.preventDefault(); // simulation
                form.style.display = 'none';
                const message = document.createElement('div');
                message.textContent = "✅ Inscription réussie ! Bienvenue 🎓";
                message.className = 'notification';
                document.body.appendChild(message);
                setTimeout(() => {
                    message.style.opacity = 1;
                }, 300);
                setTimeout(() => {
                    message.style.opacity = 0;
                }, 5000);
            }
        });
    }
});

// === Menu mobile (accessible globalement) ===
function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu) {
        menu.classList.toggle('open');
    }
}

// === Menu profil déroulant ===
function toggleProfileMenu() {
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
}

// === Fermer le menu profil si on clique ailleurs ===
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('profileDropdown');
    const profileImg = document.querySelector('.profile-menu img');
    if (dropdown && profileImg && !profileImg.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});