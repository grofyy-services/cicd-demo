SELECT 'CREATE DATABASE invoice_db'
WHERE NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'invoice_db')\gexec