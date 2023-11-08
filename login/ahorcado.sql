-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-11-2023 a las 01:30:27
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `deberescs`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ahorcado`
--

CREATE TABLE `ahorcado` (
  `user` text NOT NULL,
  `password` text NOT NULL,
  `points` int(20) NOT NULL DEFAULT 0,
  `attemps` int(20) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ahorcado`
--

INSERT INTO `ahorcado` (`user`, `password`, `points`, `attemps`) VALUES
('jesus', '155812j', 0, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ahorcado`
--
ALTER TABLE `ahorcado`
  ADD PRIMARY KEY (`user`(20));
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
