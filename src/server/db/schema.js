import { sequelize } from './index.js';

// Columns the models expect that the database lacks, as "table.column".
// sync() creates missing tables but never adds a column to an existing one,
// so a schema change leaves an older database with this list non-empty.
export async function missingColumns() {
  const queryInterface = sequelize.getQueryInterface();
  const missing = [];
  for (const model of Object.values(sequelize.models)) {
    const table = model.getTableName();
    const columns = await queryInterface.describeTable(table);
    for (const attribute of Object.values(model.rawAttributes)) {
      if (!(attribute.field in columns))
        missing.push(`${table}.${attribute.field}`);
    }
  }
  return missing;
}

// Required columns the models no longer have, as "table.column". Every insert
// into such a table fails, because the model never fills the column in.
export async function leftoverColumns() {
  const queryInterface = sequelize.getQueryInterface();
  const leftover = [];
  for (const model of Object.values(sequelize.models)) {
    const table = model.getTableName();
    const columns = await queryInterface.describeTable(table);
    const fields = new Set(
      Object.values(model.rawAttributes).map((attribute) => attribute.field),
    );
    for (const [name, column] of Object.entries(columns)) {
      if (!fields.has(name) && !column.allowNull && column.defaultValue == null)
        leftover.push(`${table}.${name}`);
    }
  }
  return leftover;
}

// Drops every table and enum type in the public schema. Used by db:reset.
export async function dropEverything() {
  const [tables] = await sequelize.query(
    "SELECT tablename FROM pg_tables WHERE schemaname = 'public'",
  );
  if (tables.length) {
    const names = tables.map((t) => `"${t.tablename}"`).join(', ');
    await sequelize.query(`DROP TABLE IF EXISTS ${names} CASCADE`);
  }
  const [types] = await sequelize.query(
    "SELECT t.typname FROM pg_type t JOIN pg_namespace n ON n.oid = t.typnamespace WHERE n.nspname = 'public' AND t.typtype = 'e'",
  );
  if (types.length) {
    const names = types.map((t) => `"${t.typname}"`).join(', ');
    await sequelize.query(`DROP TYPE IF EXISTS ${names} CASCADE`);
  }
  return tables.length;
}
