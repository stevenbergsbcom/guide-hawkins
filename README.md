# 🔦 Guide de Hawkins

> *Bienvenue à Hawkins, Indiana — Une petite ville avec de grands mystères.*

Site web fictif présentant la ville de Hawkins, inspiré de la série **Stranger Things**. Un guide touristique humoristique et mystérieux pour une ville où des choses étranges se passent...

![Stranger Things](images/StrangerThingslogo.png)

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Technologies](#technologies)
- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
- [Pages](#pages)
- [Fonctionnalités](#fonctionnalités)
- [Design](#design)
- [Accessibilité](#accessibilité)
- [Auteur](#auteur)

## 🎬 Aperçu

Ce projet est un site web statique multi-pages présentant la ville fictive de Hawkins, Indiana. Le site adopte un ton humoristique tout en reprenant l'esthétique sombre et mystérieuse des années 80 caractéristique de la série Stranger Things.

## 🛠 Technologies

- **HTML5** — Structure sémantique (header, main, section, article, footer)
- **CSS3** — Styles modernes avec variables CSS, Flexbox, Grid
- **JavaScript ES6+** — Vanilla JS, pas de frameworks
- **Google Fonts** — Playfair Display & Inter

### Pas de dépendances externes

Ce projet n'utilise aucun framework CSS (Bootstrap, Tailwind) ni bibliothèque JavaScript (jQuery, React). Tout est fait en vanilla HTML/CSS/JS pour un apprentissage optimal.

## 📁 Structure du projet

```
04-stranger-things/
├── index.html          # Page d'accueil
├── apropos.html        # À propos de Hawkins
├── lieux.html          # Lieux emblématiques
├── residents.html      # Résidents notables
├── conseils.html       # Conseils aux visiteurs
├── README.md           # Ce fichier
├── css/
│   └── style.css       # Feuille de styles principale
├── js/
│   └── script.js       # Scripts JavaScript
├── images/             # Images du site
│   ├── StrangerThingslogo.png
│   ├── hero-hawkins.jpg
│   └── ...
└── references/         # Maquettes de référence
    ├── hawkins-01-accueil.png
    ├── hawkins-02-apropos.png
    ├── hawkins-03-lieux.png
    ├── hawkins-04-residents.png
    └── hawkins-05-conseils.png
```

## 🚀 Installation

1. Clonez ou téléchargez ce dépôt
2. Ouvrez `index.html` dans votre navigateur

Aucune installation de dépendances n'est nécessaire. Le site fonctionne en local sans serveur.

Pour un développement avec rechargement automatique, vous pouvez utiliser l'extension **Live Server** de VS Code.

## 📄 Pages

| Page | Description |
|------|-------------|
| `index.html` | Page d'accueil avec Hero, lieux à découvrir, FAQ et newsletter |
| `apropos.html` | Histoire et présentation de la ville de Hawkins |
| `lieux.html` | Lieux emblématiques : Starcourt Mall, Hawkins Lab, Forêt... |
| `residents.html` | Résidents notables : familles Byers, Wheeler, Chef Hopper... |
| `conseils.html` | Conseils pratiques pour les visiteurs |

## ✨ Fonctionnalités

### Header
- Navigation fixe avec logo
- Fond transparent sur le Hero, devient semi-transparent au scroll
- Menu responsive (hamburger sur mobile)
- Dropdown pour les liens supplémentaires

### Hero
- Image de fond plein écran (100vh)
- Overlay dégradé pour la lisibilité
- Titre centré avec typographie Playfair Display
- Boutons d'action

### Sections
- **Lieux à ne pas manquer** — Carrousel de lieux avec tabs
- **Le cœur battant de Hawkins** — Présentation du Starcourt Mall
- **Features** — 3 arguments de vente sur fond rouge
- **FAQ** — Questions fréquentes en accordéon
- **CTA** — Appel à l'action avec image de fond
- **Newsletter** — Formulaire d'inscription

### Footer
- Logo et coordonnées
- Liens de navigation organisés en colonnes
- Réseaux sociaux
- Mentions légales

## 🎨 Design

### Palette de couleurs

| Couleur | Code | Utilisation |
|---------|------|-------------|
| Noir profond | `#0D0D0D` | Fond principal |
| Noir secondaire | `#1A1A1A` | Fond secondaire |
| Rouge néon | `#E50914` | Accent, CTA |
| Bleu électrique | `#0A84FF` | Liens, focus |
| Blanc cassé | `#F5F5F5` | Texte principal |
| Gris | `#AAAAAA` | Texte secondaire |

### Typographies

- **Titres** : Playfair Display (serif, élégant)
- **Corps** : Inter (sans-serif, lisible)

### Approche

- **Mobile First** — Les styles de base sont pour mobile, les media queries ajoutent les styles desktop
- **BEM** — Méthodologie de nommage CSS (Block Element Modifier)
- **Variables CSS** — Toutes les valeurs réutilisables dans `:root`

## ♿ Accessibilité

Le site respecte les bonnes pratiques d'accessibilité :

- ✅ Skip link pour sauter au contenu principal
- ✅ Balises sémantiques HTML5
- ✅ Attributs `alt` sur toutes les images
- ✅ Labels associés aux champs de formulaire
- ✅ États `:focus-visible` pour la navigation clavier
- ✅ Attributs ARIA (`aria-label`, `aria-expanded`)
- ✅ Contraste suffisant des couleurs
- ✅ Respect de `prefers-reduced-motion`

## 📱 Responsive

Le site s'adapte à toutes les tailles d'écran :

- **Mobile** : < 640px
- **Tablet** : ≥ 640px
- **Desktop** : ≥ 1024px
- **Large Desktop** : ≥ 1280px

## 👤 Auteur

Projet réalisé dans le cadre d'un apprentissage du développement web front-end.

---

*"Friends don't lie."* — Eleven


