CREATE DATABASE etablissement_db;
ALTER TABLE etudiants ADD photo_profil VARCHAR(255);

USE etablissement_db;

CREATE TABLE etudiants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(100),
    date_naissance DATE,
    mot_de_passe VARCHAR(255)
);