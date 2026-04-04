/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("users", {
        id: "id",
        username: { type: "text", notNull: true, unique: true },
        password: { type: "text", notNull: true },
        created_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });

    pgm.createTable("products", {
        id: "id",
        name: { type: "text", notNull: true },
        price: { type: "numeric(10,2)", notNull: true },
        created_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });

    pgm.createTable("cart_items", {
        id: "id",
        user_id: {
            type: "integer",
            notNull: true,
            references: "users(id)",
            onDelete: "CASCADE",
        },
        product_id: {
            type: "integer",
            notNull: true,
            references: "products(id)",
            onDelete: "CASCADE",
        },
        quantity: {
            type: "integer",
            notNull: true,
            default: 1,
        },
        created_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });

    pgm.addConstraint("cart_items", "cart_unique_user_product", {
        unique: ["user_id", "product_id"],
    });

    pgm.createIndex("cart_items", "user_id");
    pgm.createIndex("cart_items", "product_id");

    pgm.sql(`
    INSERT INTO products (name, price)
    VALUES
      ('iPhone', 1000.00),
      ('MacBook', 2500.00),
      ('AirPods', 300.00)
  `);
};

exports.down = (pgm) => {
    pgm.dropTable("cart_items");
    pgm.dropTable("products");
    pgm.dropTable("users");
};