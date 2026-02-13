✅ Run migrations in dev using TS directly (no need to build first)
✅ Automatically GENERATE migration by comparing Entities vs DB schema
Example: npm run migration:generate -- -n AddDiscountToProducts
✅ Create blank migration template (when you want custom SQL)
Example: npm run migration:create -- -n SeedProducts
✅ Prod migrations run against dist (after build)