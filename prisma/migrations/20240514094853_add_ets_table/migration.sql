-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Establishment" (
    "id" SERIAL NOT NULL,
    "finess_et" TEXT NOT NULL,
    "finess_ej" TEXT NOT NULL,
    "name_short" TEXT NOT NULL,
    "name_long" TEXT,
    "address" TEXT NOT NULL,
    "category_libelle" TEXT,
    "siret" TEXT,
    "tel" TEXT,
    "fax" TEXT,
    "date_open" TIMESTAMP(3) NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "point" geometry,

    CONSTRAINT "Establishment_pkey" PRIMARY KEY ("id")
);
