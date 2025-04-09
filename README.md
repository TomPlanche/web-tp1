# TP React : Création d'un portfolio

## Énoncé
Exercice d'intégration React

À partir du cours et de la documentation officielle, créez une nouvelle application React dans laquelle on retrouvera plusieurs sections détaillant votre profil :

- Une première section avec une photo de vous, votre nom, votre prénom et une petite phrase d'accroche
- Une section avec une liste de vos derniers projets (titre + description)
- Un formulaire qui vous permet d'ajouter un nouveau projet

## Réalisation

J'ai utilisé React comme demandé, en ajoutant plusieurs fonctionnalités avancées.
J'ai retiré la partie formulaire, car je n'ai pas envie de le faire car je ne trouve pas de moyen esthétique de le faire. Je simule donc un ajout avec la méthode `addProject` dans le store Redux.

### 🚀 Fonctionnalités

#### 1. Gestion des thèmes
- Système de gestion des thèmes basé sur Redux
- Persistance du thème via localStorage
- Transitions fluides entre les thèmes
- Multiples schémas de couleurs avec variables CSS
- Synchronisation automatique du thème entre les composants

#### 2. Gestion des projets
- Store Redux pour les données des projets
- Validation des données avec Zod
- Persistance locale avec localStorage
- Fonctionnalités d'ajout, suppression et réinitialisation
- Implémentation sécurisée avec TypeScript

#### 3. Animations
- Animations propulsées par GSAP

### 🛠 Stack Technique

- React (Framework principal)
- TypeScript (Typage statique)
- Redux Toolkit (Gestion d'état)
- GSAP (Animations)
- SCSS (Styles)
- Zod (Validation des données)
- Vite (Build tool)

### 🏗 Structure du Projet

```
src/
├── components/    # Composants React
├── stores/       # Stores Redux
├── styles/       # Styles SCSS
└── utils/        # Fonctions utilitaires
```