CREATE TABLE IF NOT EXISTS "Mediciones" (
        "id"    INTEGER,
        "valor" varchar(20) NOT NULL,
        "fecha" varchar(10) NOT NULL,
        "latitud"       varchar(20) NOT NULL,
        "longitud"      varchar(20) NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
);