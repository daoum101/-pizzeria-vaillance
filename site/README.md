# Pizzeria Vaillance — Version Premium 10/10

Site vitrine professionnel, 100% statique (HTML / CSS / JS).
Hébergeable partout : Netlify, Vercel, OVH, Hostinger, serveur Apache/Nginx, etc.

## ✨ Ce qui a été refait

### Design & Identité
- **Nouvelle palette** : espresso, terracotta, or chaud, crème — inspirée des trattorias italiennes authentiques
- **Typographie premium** : Fraunces (titre) + Inter (corps) + Caveat (touches manuscrites)
- **Texture grain** légère sur toute la page pour donner du caractère
- **Micro-interactions** soignées (hover, reveal, parallaxe, marquee italien)
- **Lightbox galerie** avec zoom sur les photos

### Nouvelles sections / fonctionnalités
- 🟢 **Badge "Ouvert maintenant"** en temps réel selon l'heure
- 📖 **Section Histoire** avec badge "17 ans de passion"
- 🍕 **Menu interactif** avec filtres par catégorie (Pizzas / Pâtes / Entrées / Boissons)
- 🏷️ Tags "signature", "chef", "végétarien", "épicé" sur les plats
- 📸 **Galerie bento grid** avec lightbox fullscreen
- ❓ **FAQ** accordéon (réservation, livraison, groupes…)
- 🗺️ **Google Maps intégré** dans la section Contact
- 📱 **Menu mobile drawer** élégant (plus de hamburger basique)
- 📊 **Barre de progression** scroll en haut
- ⭐ **Statistiques** hero : points forts restaurant, livraison, appel

### SEO & Performance
- Schema.org **Restaurant** structuré (Google Rich Results)
- Open Graph + Twitter Cards
- Meta description & keywords optimisés
- Images en `loading="lazy"`
- Preconnect des fonts

### Accessibilité
- Contrastes respectés (AA+)
- `aria-label` sur les boutons icônes
- `data-testid` sur tous les éléments interactifs
- Focus visibles + navigation clavier

## 📁 Structure des fichiers

```
pizzeria-vaillance-premium/
├── index.html       # Page principale
├── styles.css       # Design premium complet
├── script.js        # Interactions (filtres, lightbox, live hours, etc.)
├── maison-base.jpg  # Photo ambiance
├── menu-base.jpg    # Photo plat
└── README.md        # Ce fichier
```

## 🚀 Comment mettre en ligne ?

### Option 1 — Netlify (gratuit, 2 minutes)
1. Va sur https://app.netlify.com/drop
2. Glisse le dossier `pizzeria-vaillance-premium` dans la fenêtre
3. Ton site est en ligne ✨

### Option 2 — Hébergeur classique (OVH / Hostinger / etc.)
1. Connecte-toi en FTP
2. Upload les fichiers à la racine (`public_html` ou `www`)
3. Terminé

### Option 3 — Local
Ouvre simplement `index.html` dans ton navigateur.

## 💡 Conseils pour aller encore plus loin

- **Vraies photos** : remplace `maison-base.jpg` et `menu-base.jpg` par des photos HD du restaurant
- **Google My Business** : vérifie que tes horaires, adresse et téléphone sont bien mis à jour
- **Nom de domaine** : achète `pizzeriavaillance.be` pour le pro (~10€/an)
- **Analytics** : ajoute Google Analytics 4 ou Plausible pour suivre tes visiteurs
- **Formulaire contact** : Netlify Forms / Formspree pour recevoir les messages directement par mail

---

Fait avec ❤️ — Le vrai goût de l'Italie à Anderlecht.


## Mise à jour
- Menu complet intégré dans le site premium.
- Mention “vin italien” retirée.
- Filtres de menu ajoutés.

- Ajout parking premium : bloc visible, avantage client et SEO local.
