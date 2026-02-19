# IPSEIS - Frontend

**Plateforme web pour un organisme de formation innovant, certifie Qualiopi.**

> Site vitrine + espace personnel multi-roles pour la gestion de formations professionnelles dans le secteur de la sante.

## Apercu

IPSEIS est une plateforme complete destinee a un organisme de formation specialise dans le secteur de la sante. Le frontend combine un site vitrine public (presentation, catalogue, contact) avec un espace personnel securise offrant des dashboards adaptes a chaque role utilisateur.

## Stack technique

| Technologie | Usage |
|---|---|
| **Next.js 14** | Framework React avec App Router, SSR et ISR |
| **TypeScript** | Typage statique |
| **Tailwind CSS** | Styling avec theme personnalise |
| **Ant Design** | Composants UI (formulaires, notifications, tables) |
| **Socket.io** | Notifications et messagerie en temps reel |
| **Axios** | Client HTTP avec proxy API integre |
| **pdf-lib** | Generation et filigrane de documents PDF |
| **Vercel** | Deploiement et analytics |

## Fonctionnalites

### Site public

- **Page d'accueil** - Presentation de l'organisme et formulaire de contact
- **Catalogue** - Navigation par themes avec rendu server-side et cache intelligent
- **Pedagogie** - Methodes innovantes (active, immersive)
- **Secteur sante** - Contenu specialise pour les professionnels de sante
- **Qualite** - Certification Qualiopi et engagements qualite
- **Telecharger le catalogue** - Formulaire de capture de leads avec envoi PDF
- **Contact** - Formulaire multi-champs avec notification email
- **SEO** - Metadata dynamiques, JSON-LD (Organization, BreadcrumbList, FAQPage)

### Espace personnel (authentification JWT)

Systeme d'authentification complet avec 3 roles :

**Administrateur :**
- Dashboard avec statistiques en temps reel (prospects, utilisateurs, formations, contrats)
- Gestion des utilisateurs et codes d'activation
- CRUD formations avec controle de visibilite
- Gestion des contrats (brouillon, envoi, suivi des signatures)
- Distribution de ressources pedagogiques
- Messagerie interne et gestion des prospects
- Checklists de suivi

**Apprenant :**
- Suivi des contrats (en attente, signes, refuses)
- Acces aux ressources de formation
- Messagerie interne

**Professionnel :**
- Acces aux ressources et documents
- Messagerie interne

### Fonctionnalites transverses

- **Temps reel** - Socket.io pour les compteurs de messages et notifications
- **Messagerie interne** - Conversations avec archivage
- **Gestion de contrats** - Workflow complet avec telechargement PDF
- **Filigrane PDF** - Securisation des documents
- **Bandeau cookies** - Conformite RGPD
- **Responsive** - Mobile-first

## Architecture

```
src/
├── app/                    # App Router (pages et layouts)
│   ├── catalogue/          # Catalogue formations (SSR)
│   ├── contact/            # Formulaire de contact
│   ├── espace-personnel/   # Zone protegee (JWT)
│   │   ├── connexion/
│   │   ├── inscription/
│   │   ├── administrateur/ # Dashboard admin
│   │   ├── apprenant/      # Dashboard apprenant
│   │   └── professionnel/  # Dashboard professionnel
│   ├── api/proxy/          # Proxy API vers le backend
│   └── ...                 # Pages publiques
├── components/
│   ├── global/             # Header, Footer, Button, CookieBanner
│   ├── espace-personnel/   # LoginForm, RegisterForm, Dashboards
│   ├── sections/           # Sections de pages (Pedagogie, Sante...)
│   ├── formations/         # Composants catalogue
│   └── home/               # ContactForm, Hero
├── context/                # AuthContext, SocketContext
├── lib/                    # API calls, cache, PDF utils
└── middleware.ts           # Protection des routes (JWT)
```

## Design system

Theme Tailwind personnalise avec 4 couleurs principales :

| Nom | Hex | Usage |
|---|---|---|
| `univers` | `#263C27` | Vert fonce - couleur principale |
| `cohesion` | `#FF4E00` | Orange - accents et CTAs |
| `maitrise` | `#6F9271` | Vert moyen - secondaire |
| `support` | `#FFFCE8` | Creme - arriere-plans clairs |

Typographies : **CLT Halibut** (serif, titres) et **DM Sans** (sans-serif, corps).

## Demarrage rapide

### Prerequis

- Node.js 18+
- Yarn
- Backend IPSEIS en cours d'execution (port 3098)

### Installation

```bash
yarn install
```

### Variables d'environnement

Creer un fichier `.env.local` :

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3098
```

### Lancer le serveur de developpement

```bash
yarn dev
```

L'application est accessible sur [http://localhost:4001](http://localhost:4001).

### Build de production

```bash
yarn build
yarn start
```

## Deploiement

Deploye sur **Vercel** avec deploiement automatique depuis GitHub.

- Branche `main` : production
- Branche `stg` : staging
- Branche `dev` : developpement

## Strategie de cache (Next.js)

| Donnee | Duree | Revalidation |
|---|---|---|
| Themes | 1 heure | On-demand |
| Formations par theme | 30 minutes | On-demand |
| Formation individuelle | 1 heure | On-demand |
| Toutes les formations | 2 heures | On-demand |

## Liens

- **Backend** : [ipseis-backend](https://github.com/Jyok1m/ipseis-backend)
