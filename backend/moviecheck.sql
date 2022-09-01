\echo 'Delete and recreate moviecheck db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE moviecheck;
CREATE DATABASE moviecheck;
\connect moviecheck

\i moviecheck-schema.sql
\i moviecheck-seed.sql

\echo 'Delete and recreate moviecheck_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE moviecheck_test;

CREATE DATABASE moviecheck_test;
\connect moviecheck_test

\i moviecheck-schema.sql
