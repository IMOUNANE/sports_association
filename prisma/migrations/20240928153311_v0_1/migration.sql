/*
  Warnings:

  - You are about to drop the column `fisrtname` on the `members` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_members" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT,
    "lastname" TEXT,
    "email" TEXT NOT NULL,
    "contribution" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_members" ("contribution", "createdAt", "email", "id", "lastname", "updatedAt") SELECT "contribution", "createdAt", "email", "id", "lastname", coalesce("updatedAt", CURRENT_TIMESTAMP) AS "updatedAt" FROM "members";
DROP TABLE "members";
ALTER TABLE "new_members" RENAME TO "members";
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
