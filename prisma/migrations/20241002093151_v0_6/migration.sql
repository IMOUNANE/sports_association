-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_subscribe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "member_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "subscribe_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_subscribe" ("course_id", "createdAt", "id", "member_id", "updatedAt") SELECT "course_id", "createdAt", "id", "member_id", "updatedAt" FROM "subscribe";
DROP TABLE "subscribe";
ALTER TABLE "new_subscribe" RENAME TO "subscribe";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
