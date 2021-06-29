# Lancer avec Docker

## Lancer le projet en local

### Cloner le projet

Via ssh

```
> git clone git@github.com:AClain/italks.git
```

Via https

```
> git clone https://github.com/AClain/italks.git
```

### Modifier les variables d'environnement

- Modifier les variables d'environnements

Variables d'environnement importantes à modifier dans /.env :
_(ce fichier n'étant pas présent lors de la première copie du repo, il vous faudra faire une copie de /.env.example)_

```
MYSQL_USER
MYSQL_PASSWORD
```

Variables d'environnement importantes à modifier dans /server/.env
_(ce fichier n'étant pas présent lors de la première copie du repo, il vous faudra faire une copie de /server/.env.example)_

```
DB_USERNAME
DB_PASSWORD
```

Les paires suivantes doivent être identiques :

```
MYSQL_DATABASE <=> DB_DATABASE
MYSQL_USER <=> DB_USERNAME
MYSQL_PASSWORD <=> DB_PASSWORD
```

- Construire les images

```
> cd quantify
> docker-compose up -d
mysql uses an image, skipping
Building laravel
(...)
Building nginx
(...)
Building react
(...)
```

- Côté serveur (Laravel)

Installer les dépendances :

```
> docker exec -it laravel /bin/bash
# composer install
Installing dependencies from lock file (including require-dev)
Generating optimized autoload files
```

Créer le lien symbolique pour le dossier `storage` :

```
# php artisan storage:link
The links have been created.
```

Effectuer les migrations :

```
# php artisan migrate:fresh
Dropped all tables successfully.
Migration table created successfully.
Migrating: ...
Migrated: ...
```

Quitter le conteneur

```
# exit
>
```

- Arrêter docker

```
> docker-compose down
```

- Lancer / Relancer docker (cela peut prendre quelques secondes)

```
> docker-compose up -d
```

- Accéder aux services

Accéder au client : localhost:13000
Accéder à l'api : localhost:18080
