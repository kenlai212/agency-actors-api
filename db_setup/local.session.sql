CREATE DATABASE IF NOT EXISTS agency_actors_api;
CREATE USER 'system_acct' @'%' IDENTIFIED BY '{password}';
GRANT ALL PRIVILEGES ON agency_actors_api.* TO 'system_acct' @'%';
FLUSH PRIVILEGES;
SHOW GRANTS FOR system_acct