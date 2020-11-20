-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.5.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for crudapi
CREATE DATABASE IF NOT EXISTS `crudapi` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `crudapi`;

-- Dumping structure for table crudapi.account
CREATE TABLE IF NOT EXISTS `account` (
  `account_id` int(11) NOT NULL,
  `account_type` varchar(20) NOT NULL,
  `account_balance` int(11) DEFAULT NULL,
  `monthly_expense_limit` int(11) DEFAULT NULL,
  `thresold_amount` int(11) DEFAULT NULL,
  `username` varchar(20) NOT NULL,
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table crudapi.account: ~22 rows (approximately)
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
REPLACE INTO `account` (`account_id`, `account_type`, `account_balance`, `monthly_expense_limit`, `thresold_amount`, `username`) VALUES
	(1211, 'savings', 500, 1000, 70, 'user121'),
	(1212, 'credit', 500, 1000, 70, 'user121'),
	(1221, 'savings', 500, 1000, 70, 'user122'),
	(1222, 'credit', 500, 1000, 70, 'user122'),
	(1231, 'savings', 240, 1000, 70, 'user123'),
	(1232, 'credit', 500, 1000, 70, 'user123'),
	(1233, 'current', 500, 1000, 70, 'user123'),
	(1241, 'savings', 550, 1000, 70, 'user124'),
	(1242, 'credit', 500, 1000, 70, 'user124'),
	(1243, 'current', 500, 1000, 70, 'user124'),
	(1251, 'savings', 500, 1000, 70, 'user125'),
	(1252, 'credit', 500, 1000, 70, 'user125'),
	(1261, 'savings', 500, 1000, 70, 'user126'),
	(1262, 'credit', 500, 1000, 70, 'user126'),
	(1271, 'savings', 500, 1000, 70, 'user127'),
	(1272, 'credit', 500, 1000, 70, 'user127'),
	(1281, 'savings', 500, 1000, 70, 'user128'),
	(1282, 'credit', 500, 1000, 70, 'user128'),
	(1291, 'savings', 500, 1000, 70, 'user129'),
	(1292, 'credit', 500, 1000, 70, 'user129'),
	(1301, 'savings', 500, 1000, 70, 'user130'),
	(1302, 'credit', 500, 1000, 70, 'user130');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;

-- Dumping structure for table crudapi.customer
CREATE TABLE IF NOT EXISTS `customer` (
  `username` varchar(20) NOT NULL,
  `PASSWORD` varchar(20) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table crudapi.customer: ~10 rows (approximately)
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
REPLACE INTO `customer` (`username`, `PASSWORD`) VALUES
	('user121', '121'),
	('user122', '122'),
	('user123', '123'),
	('user124', '124'),
	('user125', '125'),
	('user126', '126'),
	('user127', '127'),
	('user128', '128'),
	('user129', '129'),
	('user130', '130');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;

-- Dumping structure for table crudapi.transaction
CREATE TABLE IF NOT EXISTS `transaction` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `from_account_id` int(11) NOT NULL,
  `to_account_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `TRANSACTION_type` varchar(20) NOT NULL,
  `available_balance` int(11) NOT NULL,
  `remark` varchar(100) DEFAULT NULL,
  `DATE` date NOT NULL,
  PRIMARY KEY (`transaction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Dumping data for table crudapi.transaction: ~5 rows (approximately)
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
REPLACE INTO `transaction` (`transaction_id`, `from_account_id`, `to_account_id`, `amount`, `TRANSACTION_type`, `available_balance`, `remark`, `DATE`) VALUES
	(6, 1231, 0, 100, 'debit', 400, 'fd', '2020-11-20'),
	(7, 1231, 0, 10, 'debit', 390, 'fd', '2020-11-20'),
	(8, 1231, 0, 100, 'debit', 290, 'fd', '2020-11-20'),
	(9, 1231, 1241, 50, 'debit', 240, '#recharge', '2020-11-20'),
	(10, 1241, 1231, 50, 'credit', 550, '#recharge', '2020-11-20');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
