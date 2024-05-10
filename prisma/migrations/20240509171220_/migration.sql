-- CreateTable
CREATE TABLE "LibelleProfession" (
    "id" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "LibelleProfession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agreement" (
    "id" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "Agreement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SesamVitale" (
    "id" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "SesamVitale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Procedure" (
    "id" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "Procedure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Practitioner" (
    "id" SERIAL NOT NULL,
    "civility" TEXT NOT NULL,
    "tel" TEXT,
    "agreement" TEXT,
    "sesamVitale" TEXT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "profession" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "city" TEXT,
    "reimbursement" TEXT,
    "procedure" TEXT,

    CONSTRAINT "Practitioner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LibelleProfession_libelle_key" ON "LibelleProfession"("libelle");

-- CreateIndex
CREATE UNIQUE INDEX "Agreement_libelle_key" ON "Agreement"("libelle");

-- CreateIndex
CREATE UNIQUE INDEX "SesamVitale_libelle_key" ON "SesamVitale"("libelle");

-- CreateIndex
CREATE UNIQUE INDEX "Procedure_libelle_key" ON "Procedure"("libelle");

-- CreateIndex
CREATE UNIQUE INDEX "City_libelle_key" ON "City"("libelle");
