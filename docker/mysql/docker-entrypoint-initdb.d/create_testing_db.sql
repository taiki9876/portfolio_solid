CREATE DATABASE IF NOT EXISTS `db_testing`;
CREATE USER IF NOT EXISTS 'test_user'@'%' IDENTIFIED BY 'test_password';
GRANT ALL ON `db_testing`.* TO 'test_user'@'%';