-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 27 Bulan Mei 2023 pada 22.36
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `buffer-labs`
--
CREATE DATABASE IF NOT EXISTS `buffer-labs` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `buffer-labs`;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengerjaan`
--

DROP TABLE IF EXISTS `pengerjaan`;
CREATE TABLE IF NOT EXISTS `pengerjaan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `misi` varchar(4) NOT NULL,
  `soal` tinyint(4) NOT NULL,
  `waktuPertama` datetime DEFAULT NULL COMMENT 'waktu pertama mulai',
  `waktuBenar` datetime DEFAULT NULL COMMENT 'waktu benar pertama kali',
  `tries` int(11) NOT NULL DEFAULT 0 COMMENT 'jumlah coba',
  PRIMARY KEY (`id`),
  KEY `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=693 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sekolah`
--

DROP TABLE IF EXISTS `sekolah`;
CREATE TABLE IF NOT EXISTS `sekolah` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sekolah` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `sekolah`
--

INSERT INTO `sekolah` (`id`, `sekolah`) VALUES
(1, 'SMA ST. Angela');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) NOT NULL,
  `gender` tinyint(4) DEFAULT 0,
  `sekolah` int(11) NOT NULL,
  `tingkat` tinyint(4) NOT NULL,
  `absen` tinyint(4) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `lastLogin` datetime DEFAULT NULL,
  `token` varchar(50) NOT NULL,
  `numLogin` int(11) NOT NULL DEFAULT 0,
  `power` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`) USING BTREE,
  KEY `bersekolah` (`sekolah`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `pengerjaan`
--
ALTER TABLE `pengerjaan`
  ADD CONSTRAINT `user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Ketidakleluasaan untuk tabel `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `bersekolah` FOREIGN KEY (`sekolah`) REFERENCES `sekolah` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
