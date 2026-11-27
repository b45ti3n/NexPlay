# Frontend NexPlay

## Prérequis

- Node.js (version LTS)
- pnpm (version indiquée dans `package.json` à la racine)

Si `pnpm` n'est pas installé, installe-le depuis un répertoire hors du dépôt :

```bash
npm install --global pnpm@12.18.0
```

## Lancer en développement

Depuis la racine du dépôt :

```bash
pnpm install
pnpm dev
```

Ouvre ensuite [http://localhost:5173](http://localhost:5173). Vite peut choisir un autre port si celui-ci est déjà utilisé ; dans ce cas, l’adresse apparaît dans le terminal.

Pour démarrer uniquement le frontend sans le raccourci racine :

```bash
pnpm --filter @nexplay/web dev
```

## Compiler pour la production

```bash
pnpm --filter @nexplay/web build
```
