import pg from "pg";

/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.addColumn(
        "users",
        {
            email: { type: "text", notNull: true, unique: true },
        }
    )

    pgm.addColumn(
        "users",
        {
            is_verified: { type: "boolean", notNull: true, default: false },
        }
    )

    pgm.createTable(
        "verify_codes",
        {
            user_id: {
                type: "integer",
                notNull: true,
                references: "users(id)",
                onDelete: "CASCADE",
            },
            verify_code: {
                type: "text",
                notNull: true,
            },
            created_at: {
                type: "timestamptz",
                notNull: true,
                default: pgm.func("current_timestamp"),
            },
        }
    )
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropColumn("users", ["email", "isVerified"]);
    pgm.dropTable("verify_codes");
};
