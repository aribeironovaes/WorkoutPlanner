-- --------------------------------------------------------
-- Host:                         us-cdbr-iron-east-03.cleardb.net
-- Server version:               5.5.45-log - MySQL Community Server (GPL)
-- Server OS:                    Linux
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for heroku_d74eb3977648752
CREATE DATABASE IF NOT EXISTS `heroku_d74eb3977648752` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `heroku_d74eb3977648752`;

-- Dumping structure for table heroku_d74eb3977648752.workouts
CREATE TABLE IF NOT EXISTS `workouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `value` varchar(5000) NOT NULL,
  `tags` set('endurance','sst','him','im','oly','lc','z5','z4','recovery','track','prog','paddles','speed') DEFAULT NULL,
  `creation_ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `duration_sec` int(11) DEFAULT NULL,
  `tss` int(11) DEFAULT NULL,
  `sport_type` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1212 DEFAULT CHARSET=utf8;

-- Dumping data for table heroku_d74eb3977648752.workouts: ~93 rows (approximately)
/*!40000 ALTER TABLE `workouts` DISABLE KEYS */;
INSERT INTO `workouts` (`id`, `title`, `value`, `tags`, `creation_ts`, `duration_sec`, `tss`, `sport_type`) VALUES
	(2, '10\' @ 85-90 / 20\'@93', '(12min, 55, 75)\n5[(45s, 75, 100), (15s, 55)]\n(3min, 55)\n3[(10min, 85, 90, 95)(4min, 55)]\n(20min, 93)\n(5min, 55, 55)\n(10min, 72)\n(5min, 55, 55)\n', 'sst,im,oly', NULL, 6120, 105, 1),
	(12, 'HIM Tempo', '(10min, 55, 74)\n3[(1min, 85), (1min, 55)]\n3[(12min, 85),(3min, 55)]', 'him', NULL, 3660, 60, 1),
	(22, 'HIM Race Week', '(10min, 55, 74)\n5[(30s, 45, single leg - left side), (15s, 45, both), (30s, 45, single leg - right side), (15s, 45, both)]\n5[(30s, 75, 90), (30s, 55)]\n5[(3min, 90, z4*), (2min, 65)]\n"* alternate aero and seated"\n(15min, 85, HIM - aero position)\n(10min, 55)', 'him', NULL, 4350, 64, 1),
	(32, 'Race Recon', '(30min, 65, ride 15 min out and back* and **)\n"*No intensity on the bike today just ride the first/last 15 mins of the course."\n"**Careful out there.  Make sure you work through all the gears and make some shifts under load.  Important you can shift cleanly and smoothly from big chain ring to small and vice versa."', '', NULL, 1800, 21, 1),
	(42, '2x15\'@90 / 20\'@85', '(15min, 55, 75)\n3[(3min, 85, 87, 90), (2min, 55)]\n2[(15min, 90), (5min, 55)]\n[(20min, 85), (5min, 55)]\n(15min, 65, relaxed riding)\n"Straight into the t-run"\n\n', 'him,oly', NULL, 6600, 108, 1),
	(52, '2x15\'@90', '(5min, 60, cadence 90+ rpm)\n(5min, 70, high cadence)\n(5min, 80, normal cadence aero)\n2[(15min, 90, z4), (5min, 55)]\n(5min, 55)', 'oly', NULL, 3600, 61, 1),
	(62, 'Outdoor ride from 75-85%', '(10mi, 55, 75, relaxed riding)\n3[(15mi, 75, 80, 85), (3mi, 55)]\n(10mi, 65, relaxed tempo but stay aero)\n"*Ride aero where you can and be conscious of carrying speed at every opportunity"', 'endurance,him,im', NULL, 13860, 205, 1),
	(72, '20\'@85 / 15\'@100', '(30min, 55, 75, focus on form and cadence)\n[(20min, 85), (5min, 55)]\n[(15min, 100), (5min, 55)]\n(5min, 115)\n(30min, 65, relaxed tempo)', 'him,z4', NULL, 6600, 108, 1),
	(92, 'USRP - 25/50/100', '(500y, +10, warmup)\n(200y, +10, pull)\n8[(50y, +0, build 1-4)]\n20[(25y, -5, on 45s)]\n10[(50y, -5, on 45s)]\n5[(100y, -2, on +20s rest)]\n\n', 'speed', NULL, 2012, 56, 0),
	(102, '10\'@LC / 6x90\'\'@110-120% / 20\'@85', '(5min, 55)\n(4min, 65)\n(3min, 75)\n4[(1min, 85, 90, 95, 100), (30s, 55)]\n(2min, 55)\n(10min, 80, Overgear)\n(5min, 55)\n6[(90s, 110, 112, 115, 115, 117, 120), (150s, 55)]\n(3min, 55)\n(20min, 85, Aero)\n(5min, 55)\n(10min, 72)\n(5min, 55)', 'lc,z5', NULL, 6120, 96, 1),
	(112, '20\'@90-100 / 20\'@95-105', '(15min, 55, 75)\n4[(4min, 85), (1min, 55)]\n[(20min, 90, 100), (5min, 55)]\n(20min, 95, 105)\n(15min, 55)', 'oly,z4', NULL, 5700, 106, 1),
	(122, '45\' Active Recovery', '(15min, 55)\n5[(30s, 60, spin ups to very high cadence),(30s, normal cadence)]\n2[(6min, 75), (2min, 55))]\n(10min, 55)\n', 'recovery', NULL, 2760, 29, 1),
	(132, 'HOP - 1', '(12, 55, 75)\n4[(45s, 75, 100), (25s, 55)]\n(3min,55)\n2[(85, 10min, aero), (3min, 55)]\n2[(90, 10min, aero), (3min, 55)]\n(5min, 55)', 'z4', NULL, 4600, 74, 1),
	(142, 'HOP - 2', '(12, 55, 75)\n4[(45s, 75, 100), (25s, 55)]\n(3min,55)\n[(20min, 85), (5min, 55)]\n[(20min, 95), (5min, 55)]\n(5min, 55)', 'z4', NULL, 4480, 76, 1),
	(152, 'HOP - 3', '(12, 55, 75)\n4[(45s, 75, 100), (25s, 55)]\n(3min,55)\n2[(90, 10min, aero), (3min, 55)]\n2[(95, 10min, aero), (3min, 55)]\n(5min, 55)', 'z4', NULL, 4600, 80, 1),
	(162, 'HOP - 4', '(12, 55, 75)\n4[(45s, 75, 100), (25s, 55)]\n(3min,55)\n[(20min, 90), (5min, 55)]\n[(20min, 95), (5min, 55)]\n(5min, 55)', 'z4', NULL, 4480, 79, 1),
	(172, 'HOP - 5', '(12, 55, 75)\n4[(45s, 75, 100), (25s, 55)]\n(3min,55)\n2[(95, 10min, aero), (3min, 55)]\n2[(100, 10min, aero), (3min, 55)]\n(5min, 55)', 'z4', NULL, 4600, 87, 1),
	(182, 'HOP - 6', '(12, 55, 75)\n4[(45s, 75, 100), (25s, 55)]\n(3min,55)\n[(20min, 95), (5min, 55)]\n[(20min, 100), (5min, 55)]\n(5min, 55)', 'z4', NULL, 4480, 86, 1),
	(192, 'HOP - 7', '(12, 55, 75)\n4[(45s, 75, 100), (25s, 55)]\n(3min,55)\n4[(100, 10min, aero), (3min, 55)]\n(5min, 55)', 'z4', NULL, 4600, 90, 1),
	(202, 'HOP - 8', '(12, 55, 75)\n4[(45s, 75, 100), (25s, 55)]\n(3min,55)\n2[(20min, 100), (5min, 55)]\n(5min, 55)', 'z4', NULL, 4480, 89, 1),
	(212, '5x100 / 200 w/ paddles', '(400y, easy, +10)\n(300y, pull, +10)\n(200y, kick, +10)\n8[(50y, build 1-4, -2)]\n2[5[(100y, CSS, +0)]\n(200y, paddles)\n(200y, pull)]\n', 'paddles', NULL, 3837, 74, 0),
	(222, '10\'@85 / 14\'@90 / 18\'@95', '(12, 55, 75)\n4[(45s, 75, 100), (15s, 55)]\n(4min, 55)\n[(10min, 85, LC), (5min, 55)]\n[(14min, 90, HC), (7min, 55)]\n[(18min, 95, HC), (5min, 55)]\n[(15min, 72), (5min, 55)]', 'him,oly,z4', NULL, 5940, 97, 1),
	(232, '30\', 20\' @ 80% LC', '[(5min, 55), (4min, 65),(3min, 75),(2min, 85),(1min, 90),(30s, 100),(4min, 55)]\n[(20min, 75, OG), (5min, 55)]\n[(30min, 80, OG), (5min, 55)]\n(15min, 72)\n(5min, 55)', 'endurance,lc', NULL, 5970, 86, 1),
	(242, '4x5\'@90 / 30\'@90', '(15min, 55, 75)\n[(4min, 75), (3min, 85), (2min, 90), (1min, 100), (5min, 55)]\n[(15min, 75, OG), (5min, 55)]\n4[(5min, 90), (5min, 55)]\n[(30min, 90), (5min 55)]\n(20min, 72)\n(5min, 55)', 'oly', NULL, 9000, 141, 1),
	(252, 'Long Ride w/ 85/90/105%', '(15min, 55, 75)\n4[(45s, 75, 100), (15s, 55)]\n(5min, 55)\n4[(10min, 75), (5min, 85), (5min, 55)]\n(5min, 55)\n4[(5min, 90), (1min, 105), (6min, 55)]\n(5min, 55)\n5[(5min, 72), (5min, 55)]', 'endurance,him,oly,z4', NULL, 12720, 175, 1),
	(262, '3x90@105/3x90@120/20\'@85', '(12min, 55, 75)\n3[(45s, 75, 100), (25s, 55)]\n(4min,55)\n(20min, 75)\n3[(90s, 105), (2min, 55)]\n3[(90s, 120), (3min, 55)]\n(20min, 85)\n(5min, 55)\n(10min, 72)\n(5min, 55)', 'z5,z4', NULL, 6210, 97, 1),
	(272, 'HIM - (10 days prior) - 20\'@85%', '(12, 55, 75)\n4[(45s, 75, 100), (25s, 55)]\n(4min, 55)\n(20min, 80, OG)\n(20min, 85, cadence > 95rpm)\n(5min, 55)\n(10min, 72)\n(5min, 55)', 'him', NULL, 4840, 74, 1),
	(282, 'PROG from 75-100 (Short intervals)', '(12, 55, 75)\n4[(45s, 75, 100), (25s, 55)]\n(4min, 55)\n[(12min, 75), (4min, 55)]\n[(10min, 80), (4min, 55)]\n[(8min, 85), (4min, 55)]\n[(6min, 90), (4min, 55)]\n[(4min, 95), (4min, 55)]\n[(2min, 100), (4min, 55)]\n(10min, 72)\n(5min, 55)', 'him,im,oly,z4', NULL, 6100, 88, 1),
	(292, 'Very Easy Recovery Spin', '(50, 60, 12min, warmup)\n3[(15min, 60), (5min, 55)]\n(8min, 55)', 'recovery', NULL, 4800, 45, 1),
	(302, '3x10\'@70 w/ 1\'@100', '(50, 60, 12min, warmup)\n5[(30s, 100), (30s, 55)]\n(5min, 55)\n3[(15min, 70), (1min, 100), (5min, 55)]\n(5min, 55)', 'endurance', NULL, 5400, 66, 1),
	(312, '2x15@75', '(50, 60, 12min, warmup)\n5[(45s, 75, 100), (25s, 55)]\n(5min, 55)\n5[(15min, 75), (4min, 55)]\n(3min, 55)', 'endurance,im', NULL, 7250, 96, 1),
	(322, '20\'@85/15\'@90/7\'@95', '(50, 60, 12min, warmup)\n5[(45s, 75, 100), (25s, 55)]\n(5min, 55)\n[(20min, 85), (4min, 55)]\n[(15min, 90), (4min, 55)]\n[(7min, 95), (4min, 55)]\n[(12min, 72), (5min, 55)]\n\n', 'him,oly,z4', NULL, 5630, 88, 1),
	(332, '5x10\'@65 w/ 1\'@100', '(55,75, 12min)\n5[(1min, 75, 85, 90, 100], (30s, 55)]\n5[(10min, 65), (1min, 100), (5min, 55)]', 'endurance', NULL, 6000, 72, 1),
	(342, 'PROG to HIM ', '(2km, 80)\n[(3km, 82.5), (2min, 80)]\n[(2km, 85), (2min, 80)]\n[(1km, 92), (2min, 80)]\n(2km, 80)', 'him,prog', NULL, 3189, 60, 2),
	(352, '20\'@70/20\'@80/10@85', '(12min, 55, 75)\n5[(45s, 75,100),(25s,55)]\n(3min, 55)\n(20min, 70)\n(20min, 80)\n(10min, 85)\n(5min, 55)\n(10min, 70)\n(5min, 55)', 'endurance,him', NULL, 5450, 79, 1),
	(362, '40\'@75/35\'@88', '(12min, 55, 75)\n4[(45s, 75, 100), (25s, 55)]\n(3min, 55)\n(40min, 75)\n(35min, 88)', 'sst,im', NULL, 5680, 97, 1),
	(372, '15\'@88/15\'@93', '(12min, 55, 75)\n4[(45s, 75, 100), (25s, 55)]\n(3min, 55)\n[(15min, 88), (5min,55)]\n[(5min, 70), (5min, 55)]\n[(15min, 93), (5min,55)]\n(20min, 70)\n(5min, 55)', 'sst', NULL, 5680, 86, 1),
	(382, '2x15\'@75/10\'@85/5\'@90', '(12min, 55, 75)\n4[(45s, 75, 100), (25s, 55)]\n(3min, 55)\n2[(15min, 75), (10min, 85), (5min, 90), (5min, 55)]\n(5min, 55)', 'him,im,oly', NULL, 5680, 88, 1),
	(392, 'Short intervals (90/100/105) - 90s@120', '(12min, 55, 75)\n5[(1min, 75, 85, 90, 95, 100), (1min, 55)]\n(5min, 55)\n(4min, 90), (3min, 55), (3min, 100), (3min, 55), (2min,105), (3min, 55)\n(10min, 72)\n(5min, 55)\n4[(90s, 120), (5min, 55)]\n(20min, 72)\n(10min, 55)\n\n', 'oly,z5,z4', NULL, 6960, 97, 1),
	(402, '12\'@72/80', '(12min, 55, 75)\n4[(45s, 75, 100), (25s, 55)]\n(3min, 55)\n3[(12min, 72), (3min, 55)]\n4[(12min, 80), (3min, 55)]\n3[(12min, 72), (3min, 55)]', 'endurance', NULL, 10180, 143, 1),
	(412, '5\'/5\'/10\'@75/80/90', '(12min, 55, 75)\n4[(1min, 85, 90, 95, 100),(1min, 55)]\n(3min, 55)\n2[(5min, 75, LC), (5min, 80, HC), (10, 90, HC), (5min, 55)]\n(12min, 72)\n(5min, 55)', 'him,im', NULL, 5400, 83, 1),
	(422, '1mi @ Oly/ 0.5mi@5K ', '(2mi, 80)\n[(1mi, 95), (0.5mi, 80)]\n2[(0.5mi, 105), (0.5mi, 80)]\n[(1mi, 102), (0.5mi, 80)]', 'oly,z5,track', NULL, 2955, 64, 2),
	(432, '30\'@88', '(12min, 55, 75)\n5[(45s, 75, 100), (30s)]\n(3min,55)\n(20min, 75, LC)\n(30min, 88)\n(5min,55)\n(10min, 72)\n(5min, 55)', 'sst', NULL, 5475, 87, 1),
	(442, '30\'@88', '(12min, 55, 75)\n4[(45s, 75, 100), (30s, 55)]\n(3min, 55)\n[(10min, 80, LC), (4min, 55)]\n[(10min, 90, LC), (4min, 55)]\n(30min, 88)\n(5min,55)\n(10min, 72)\n(5min,55)', 'sst', NULL, 5880, 96, 1),
	(452, '2mi@HIM / 1mi@T ', '(2mi, 80)\n[(2mi, 92), (1mi, 80)]\n[(1mi, 100), (0.5mi, 80)]\n[(2mi, 92), (0.5mi, 80)]', 'him,track', NULL, 3829, 81, 2),
	(462, '5\'/3\'/1\'@90/100/110', '(12min, 55, 75)\n5[(30s, 75, 100), (30s)]\n(3min,55)\n2[(10min, 75, LC), (5min, 85)]\n(5min,55)\n2[(5min, 90), (3min, 100), (1min, 110), (4min, 55)]\n(5min, 55)', 'oly,z4', NULL, 5160, 82, 1),
	(472, '20\'@90', '(12min, 55, 75)\n5[(1min, 75, 85, 90, 95, 100), (1min, 55)]\n(10min, 75, low cadence)\n(20min, 90)\n(10min, 55)', 'oly', NULL, 3720, 59, 1),
	(482, '2x15\'@88', '(12min, 55, 75)\n5[(30s, 75, 100), (30s)]\n(3min,55)\n3[(1min, 90, HC), (1min, 55)]\n2[(15min, 88), (5min,55)]\n(20min, 72)\n(5min, 55)', 'sst', NULL, 5460, 84, 1),
	(492, '6\'@85/10\'@100', '(12, 55, 75)\n4[(45s, 75, 100), (30s, 55)]\n(3min,55)\n4[(6min, 85), (4min, 73)]\n(4min, 55)\n(10min, 100)\n(5min, 55)', 'him,z4', NULL, 4740, 79, 1),
	(502, '20\'@85/10\'@90', '(5min, 55)\n(3min, 65)\n(2min, 70)\n4[(45s, 75, 100), (30s, 55)]\n(5min, 55)\n(20min, 85)\n(5min, 55)\n(10min, 90)\n(5min, 55)\n(10min, 72)\n(5min, 55)', 'him,oly', NULL, 4500, 67, 1),
	(512, '100-400-100 Piramid', '(300yards, free)\n(200yards, pull)\n(100yards, kick)\n6[(50yards, 100, build)]\n(100yards, 100)\n(200yards, 100)\n(400yards, 100)\n(400yards, 100)\n(200yards, 100)\n(100yards, 100)\n(200yards, free)\n\n\n\n\n', 'endurance', NULL, 2429, 46, 0),
	(522, '8x10\'@70', '(12min, 55, 75)\n4[(45s, 75, 100), (25s, 55)]\n(3min, 55)\n8[(10min, 70), (5min, 55)]\n', 'endurance', NULL, 8380, 100, 1),
	(532, '3x20\'@75/80/85', '(5min, 55)\n(4min, 60)\n(3min, 70)\n4[(45s, 75, 100), (30s, 55)]\n(3min,55)\n[(20min, 75, LC), (4min, 55), (20min, 80, HC), (4min, 55), (20min, 85, LC), (4min, 55)]\n(10min, 72)\n(5min, 55)', 'him,im', NULL, 6420, 95, 1),
	(542, 'CSS Test', '(300yards, free)\n(200yards, pull)\n(100yards, w/ fins)\n8[(50yards, build 1-4)]\n(100yards, pull)\n(400yards, For time)\n(100yards, pull)\n(200yards, For time)\n(100yards, pull)\n6[(100yards, Strong with 20s rest)]', 'speed', NULL, 5455, 46, 0),
	(552, '6x100 / 4x50', '(300yards, free)\n(200yards, pull)\n(100yards, kick)\n6[(50yards, build 1-3)]\n6[(100yards, Strong w/ 20s rest), 4[(50yards, scull)]]', 'speed', NULL, 3829, 32, 0),
	(562, 'SST - 1', '(12min, 55, 75)\n5[(45s, 75, 100), (30s, 55)]\n(2min, 55)\n(10min, 75, Lower Cadence - 65rpm)\n(3min, 55)\n[(15min, 88), (3min, 55)]\n[(10min, 93), (10min, 55)]', 'sst', NULL, 4275, 67, 1),
	(572, 'SST - 2', '(12min, 55, 75)\n5[(45s, 75, 100), (30s, 55)]\n(2min, 55)\n(10min, 75, Lower Cadence - 65rpm)\n(3min, 55)\n[(10min, 88), (3min, 55)]\n[(15min, 93), (10min, 55)]', 'sst', NULL, 4275, 68, 1),
	(582, '3x(200/100)', '"Warmup"\n(500yards, free)\n(200yards, pull)\n(300yards, as 50 kick w/ board - 50 free)\n4[(50yards, Swim GOLF - Descend each one), "10s rest"]\n4[(50yards, Swim descend 1-4), "10s rest"]\n"Main set"\n3[(200yards, fast), (100yards, easy pull)]\n5[(100yards, 100), "15s rest"]\n(100yards, free)', 'endurance', NULL, 27867, 639, 0),
	(592, '15\'@85/5\'@90', '(12min, 55, 75)\n5[(45s, 75, 100), (30s, 55)]\n(3min, 55)\n[(15min, 75, OG), (3min, 55)]\n2[(15min, 85), (5min, 90), (5min, 55)]', 'him,im', NULL, 5355, 86, 1),
	(602, '5x(20\'@65/5\'@75)', '(12min, 55, 75)\n5[(45s, 70, 100), (30s, 55)]\n(4min, 55)\n5[(20min, 65), (5min, 75)]\n(5min, 55)', 'endurance', NULL, 9135, 113, 1),
	(612, '4x100-2x200-400 Piramid', '(500yards, free)\n3[(50yards, kick w/ board), (50yards, free)]\n(200yards, pull)\n5[(50yards, build 1-5)]\n4[(100yards, fast on CSS + 20)]\n2[(200yards, neg split)]\n(400yards, free w/ fins)\n4[(100yards, fast on CSS + 20)]\n4[(50yards, Swim GOLF)]\n(100yards, free cooldown)', 'endurance', NULL, 2792, 60, 0),
	(632, '2x15\'@90', '(12min, 55, 75)\n5[(45s, 70, 100), (30s, 55)]\n(4min, 55)\n(8min, 80, Low cadence - 60rpm)\n(3min, 55)\n2[(15min, 90, High cadence), (5min, 55)]\n(15min, 72)\n(5min, 55)\n\n', 'oly', NULL, 5595, 87, 1),
	(642, '2x2km broken ', '(2km, 80)\n2[(2km, 85), (80s, rest), 2[(1km, 92), (1min, rest)], 4[(500m, 100), (45s, rest)]]\n(1km, 80)', 'track', NULL, 4630, 98, 2),
	(652, '20\'/15\'/10\' @ 80/85/90', '(12min, 55, 75)\n4[(45s, 75, 100), (25s, 55)]\n(3min, 55)\n[(20min, 80, Low cadence), (3min, 55)]\n[(15min, 85), (4min, 55)]\n[(10min, 90), (4min, 55)]\n[(10min, 72), (5min, 55)]', 'him,oly', NULL, 5440, 84, 1),
	(662, '2x3x1km @ Oly -> T', '(2km, 80)\n2[3[(1km, 92, 95, 100), ("45s static rest")]]\n(2km, 80)', 'track,prog', NULL, 2593, 57, 2),
	(672, '20\'/10\'@75/80 LC', '(20min, 55, 75)\n4[(45s, 55, 75), (20s, 55)]\n(5min, 55)\n[(20min, 75, Low cadence), (5min, 55)]\n[(10min, 80, Low cadence), (5min, 55)]\n[(20min, 72), (5min, 55)]', 'im,lc', NULL, 5660, 74, 1),
	(682, 'FTP Test', '(20, 55, 75)\n3[(1min, 100), (5min, 55)]\n[(5min, 90), (10min, 55)]\n(20min, TT)\n3[(10min, 72), (5min, 55)]', 'z4', NULL, 7080, 82, 1),
	(692, '10\' @ 75/85', '(12min, 55, 75)\n4[(45s, 75, 100), (30s, 55)]\n(3min, 55)\n[(10min, 75, LC), (3min, 55)]\n[(10min, 85, NC), (3min, 55)]\n[(10min, 75, LC), (3min, 55)]\n[(10min, 85, NC), (3min, 55)]\n[(10min, 75, LC), (3min, 55)]\n[(10min, 72), (5min, 55)]', 'him,im', NULL, 6000, 86, 1),
	(702, 'Core#1', '(10s, prep)\n3[(front plank, 45s), (rest, 15s), (left side plank, 45s), (rest, 15s), (right side plank, 45s), (rest, 15s)]\n3[(dead bug, 45s), (rest, 15s), (superman, 45s), (rest, 15s), (low cobra pose, 45s), (rest, 15s)]\n3[(left side lunge, 45s), (rest, 15s), (right side lunge, 45s), (rest, 15s), (single leg deadlift, 45s), (rest, 15s)]', '', NULL, 1630, 14, 3),
	(712, 'Broken 100\'s', '(400yards, free)\n(400yards, kick with fins)\n(400yards, pull)\n8[(50yards, descend 1-4)]\n2[5[(100yards, broken)]]\n(200yards, easy)\n"75 sprint, rest 20s, 25 sprint\n50 sprint, rest 15s, 50 sprint\n4x25 sprint, rest 10s\n100 easy\n100 sprint with fins"\n', 'speed', NULL, 2482, 53, 0),
	(722, '2x1mi @ Oly / 2mi@T', '(2km, 80)\n5[(400m, 92), (45s, 0, rest)]\n(5min, 80)\n2[(1km, 95), (30s, 0, rest)]\n(5min, 80)\n(2km, 100)\n(1km, 80)', 'track,prog', NULL, 3191, 67, 2),
	(732, '5x15\'@67', '(5min, 55)\n(5min, 65)\n(5min, 70)\n5[(15min, 67), (2min, 55)]\n(5min, 55)', 'endurance', NULL, 6300, 74, 1),
	(742, 'Broken 900\'s', '(600yards, free)\n8[(50yards, drill on first 25, free, build on second 50)]\n2[(300yards, +0, with 45s rest)\n2[(150yards, +0, with 30s rest)]\n3[(100yards, +0, with 15s rest)]]\n(200yards, free)\n', 'endurance', NULL, 2436, 61, 0),
	(752, '35\'@75 / 30\'@85', '(15min, 55, 75)\n4[(45s, 75, 100), (25s, 55)]\n(3min, 55)\n(35min, 75), (5min, 55)\n(30min, 85), (5min, 55)', 'him,im', NULL, 5860, 91, 1),
	(762, '4x100 / 300 w/ paddles', '(500yards, free)\n(200yards, pull)\n(200yards, kick with board)\n4[(50yards, descend)]\n"main set"\n3[4[(100yards, 90, with 15s rest)]\n(300yards, swim with paddles)]', 'paddles', NULL, 2777, 61, 0),
	(772, '3x9\'@90/95', '(12min, 55, 75)\n4[(45s, 75, 100), (30s, 55)]\n(3min, 55)\n[(12min, 80, LC), (3min, 55)]\n3[(1min, 95, 97, 100), (3min, 55)]\n3[(9min, 90, 95, 90, HC), (5min, 55)]\n(20min, 80, HC), (5min, 55)\n', 'oly,z4', NULL, 6840, 108, 1),
	(782, 'Ramps of pain - 1', '(5min, 65)\n(3min, 70)\n4[(1min, 75, 100), (1min, 55)]\n(3min, 55)\n[(10min, 80, low cadence), (4min, 55)]\n[(5min, 90), (5min, 95, 100), (5min, 55)]\n[(5min, 95), (5min, 96, 101), (5min, 55)]\n(10min, 55)\n\n', 'z4', NULL, 4380, 68, 1),
	(792, '800 w/ paddles', '(300yards, swim with fins)\n(300yards, pull)\n(200yards, kick with fins)\n4[(100yards, descend 1-4)]\n"Main set"\n(800yards, with paddles)\n4[(200yards, odd swim/even pull)]\n8[(100yards, strong)]', 'paddles', NULL, 4459, 96, 0),
	(802, '10x50 descending', '(300yards, swim with fins)\n(300yards, pull)\n(200yards, kick with fins)\n8[(50yards, descend 1-4)]\n"Main set"\n10[(50yards, at 45/50/55)]\n(400yards, fast)\n10[(50yards, at 45/50/55)]\n(300yards, fast)\n10[(50yards, at 45/50/55)]\n(100yards, easy)\n\n\n', 'speed', NULL, 4335, 93, 0),
	(812, '15\'@90/7\'@100', '(12min, 55, 75)\n4[(45s, 75, 100), (25s, 55)]\n[(24min, 80, LC), (4min, 55)]\n[(15min, 90), (5min, 55)]\n[(7min, 100), (3min, 55)]\n[(10min, 72), (5min, 55)]', 'oly,z4', NULL, 5380, 88, 1),
	(822, 'Broken 400\'s', '(500yards, swim with fins)\n(200yards, pull)\n(200yards, kick with fins)\n6[(50yards, build 1-3)]\n4[(100yards, add 25yards of hard swimming on every 100)]\n2[(200yards, first hard; second pull)]\n(400yards, negative split)\n2[(200yards, first pull; second hard)]\n4[(100yards, first pull; second build; third pull; fourth all out)]\n(200yards, free)', 'endurance', NULL, 3439, 74, 0),
	(832, '20\'/15\'/15\'@80/85/90', '(12min, 55, 75)\n4[(45s, 75, 100), (30s, 55)]\n(3min, 55)\n[(20min, 80, LC), (4min, 55)]\n[(15min, 85, NC), (4min, 55)]\n[(15min, 90, NC), (4min, 55)]\n(8min, 55)', 'him,oly', NULL, 5400, 85, 1),
	(842, 'Ramps of pain - 2', '(5min, 65)\n(3min, 70)\n4[(1min, 75, 100), (1min, 55)]\n(3min, 55)\n[(10min, 75, low cadence), (4min, 55)]\n[(5min, 90), (10min, 90, 95), (5min, 55)]\n[(5min, 95), (10min, 95, 100), (5min, 55)]\n(5min,55)\n\n', 'z4', NULL, 4680, 78, 1),
	(852, '30\'@80 / 20\'@88', '(5min, 55)\n(5min, 65)\n(5min, 75)\n4[(1min,75, 100), (1min, 55)]\n[(30min, 80), (5min, 55)]\n[(20min, 88), (5min, 55)]\n4[(10min, 72), (5min, 55)]\n(7min, 55)\n\n', 'sst', '2017-02-12 16:16:10', 9000, 129, 1),
	(872, 'DTD - Neuromuscular', '(5min, 55)\n(4min, 65)\n(2min, 75)\n4[(30s, 75, 100), (30s, 55)]\n(3min, 55, cadence @ 65rpm)\n(2min, 55, cadence @  95rpm)\n(3min, 55, cadence @ 70rpm)\n(2min, 55, cadence @ 100rpm)\n(3min, 55, cadence @ 75rpm)\n(2min, 55, cadence @ 105rpm)\n(3min, 55, cadence @ 80rpm)\n(2min, 55, cadence @ 110rpm)\n(3min, 55, cadence @ 85rpm)\n(2min, 55, cadence @ CHOICE)\n(3min, 60, cadence @ 70rpm)\n(2min, 60, cadence @ 95rpm)\n(3min, 60, cadence @ 75rpm)\n(2min, 60, cadence @ 100rpm)\n(3min, 60, cadence @ 80rpm)\n(2min, 60, cadence @ 105rpm)\n(3min, 60, cadence @ 85rpm)\n(2min, 60, cadence @ 110rpm)\n(3min, 60, cadence @ 90rpm)\n(2min, 60, cadence @ CHOICE)\n(15min, 55, cooldown)\n', '', '2017-02-13 18:10:44', 4800, 44, 1),
	(882, 'DTD - Mona/Turnover', '(20min, 80, warmup)\n2[(90s, 112), (90s, 0, walk or jog)]\n4[(60s, 112), (60s, 0, walk or jog)]\n4[(30s, 112), (30s, 0, walk or jog)]\n4[(15s, 112), (15s, 0, walk or jog)]\n(10min, 80, easy jogging)', '', '2017-02-13 18:33:27', 3000, 62, 2),
	(892, 'DTD -  Souplesse', '(10min, 55, 75)\n(30min, 70)\n4[(4min, 60, cadence 80rpm), (3min, 65, cadence 90rpm), (2min, 70, cadence 100rpm), (1min, 75, cadence 110rpm)]\n(10min, 55)', '', '2017-02-15 13:59:04', 5400, 65, 1),
	(902, 'Ramps of pain - 3', '(5min, 65)\n(3min, 70)\n4[(1min, 75, 100), (1min, 55)]\n(3min, 55)\n[(10min, 75, low cadence), (4min, 55)]\n2[(15min, 95), (5min, 55)]\n(5min,55)\n\n', '', '2017-02-19 16:19:47', 4680, 79, 1),
	(912, 'Aerobic Descends', '(300y, free)\n(200y, pull)\n4[(50y, desdend 1-4)]\n[4[(200yards, 100)], (100yards, +10)]\n[3[(200yards, 100)], (100yards, +10)]\n[2[(200yards, 100)], (100yards, +10)]\n[1[(200yards, 100)], (100yards, +10)]\n(200yards, cooldown)\n', '', '2017-02-25 19:22:26', 3771, 96, 0),
	(922, 'DTD - Fartlek HM', '(10min, 55, 80)\n[(1min, 98), (1min, walk)]\n2[(2min, 98), (1min, walk)]\n[(3min, 98), (1min, walk)]\n[(4min, 98), (1min, walk)]\n[(5min, 98), (1min, walk)]\n[(4min, 98), (1min, walk)]\n[(3min, 98), (1min, walk)]\n2[(2min, 98), (1min, walk)]\n[(1min, 98), (1min, walk)]\n(5min, 80)', '', '2017-02-25 19:42:05', 3300, 70, 2),
	(932, 'L5 - 1', '(15min, 55, 75)\n5[(45s, 75, 100), (30s, 55)]\n(5min, 55)\n6[(90s, 95, 100, 105, 110, 115, 120), (90s, 55)]\n(10min, 55)\n6[(90s, 110, 110, 115, 115, 120, 120), (2min, 55)]\n(5min, 55)', '', '2017-02-26 00:23:14', 4815, 75, 1),
	(942, 'L5 - 2', '(15min, 55, 75)\n5[(45s, 75, 100), (30s, 55)]\n(3min, 55)\n6[(90s, 100, 105, 105, 110, 115, 120), (90s, 55)]\n(3min, 55)\n6[(2min, 110, 110, 115, 115, 120, 120), (3min, 55)]\n(5min, 55)', '', '2017-03-05 13:25:43', 4815, 80, 1),
	(952, '100\'s and 50\'s', '(400y, with fins)\n(300y, kick with fins)\n(200y, pull)\n4[(75y, descend 1-4)]\n10[(100y, +0)]\n20[(50y, -1)]\n(200y, easy cooldown)', '', '2017-03-05 14:34:21', 4120, 104, 0),
	(982, 'CSS Validation Set', '(500yards, free)\n2[4[(50yards, as 50 first; 50 dog paddles; 25 sighting halfway through; 25 easy; 50 build with 10s rest)]])\n3[(400y, +0, with 40s rest)]\n4[(50y, +2, drill choice)]\n6[(100y, +0, with 10s rest)]\n(200y, cooldown choice)', '', '2017-03-09 17:10:16', 2507, 63, 0),
	(992, 'DTD - Pacing', '(300y, free)\n3[(100y, butterfly on the back)]\n(300y, pull)\n4[(100y, descend 1-4)]\n5[(500y, broken)]\n\n"1) [5 x 100 continuous, building effort each 100 so last one is Fast!]\n2) [5 x [50 surge,50 steady] continuous]\n3) [200 steady, 100 surge, 200 steady - continuous]\n4) [10 x [25 surge,25 steady] continuous]\n5) 500FC 70.3 race pace""', '', '2017-03-12 00:34:47', 3843, 83, 0),
	(1002, 'DTD - Long intervals', '(10min, 55, 75)\n4[(12min, 90), (3min, 70)]\n(5min, 55)', '', '2017-03-12 00:35:06', 4500, 84, 2),
	(1022, 'DTD - Medium Intervals', '(10min, 55, 75)\n(15min, 80)\n8[(4min, 100), (1min, 55)]\n(5min, 55)', '', '2017-03-12 00:50:08', 4200, 83, 2),
	(1032, 'DTD - God Intervals', '(12min, 55, 75)\n5[(10s, *, Sprint), (50s, *, easy)]\n(30min, 70)\n(3min, 55)\n5[(1min, 100), (3min, *, very easy)]\n3[(1min, *, BEST EFFORT), (3min, *, very easy)]\n(8min, 65, 55)', '', '2017-03-12 00:50:27', 5400, 64, 1),
	(1042, 'DTD - Short Intervals', '(12min, 55, 75)\n5[(10s, *, Sprint), (50s, *, easy)]\n(30min, 70)\n(3min, 55)\n(24min, *, work 16\' @ 112% w/ 8\' rest)\n(23min, 70)\n(8min, 65, 55)', '', '2017-03-12 00:51:03', 6300, 73, 1),
	(1072, '1200yrd Overspeed', '(500y, free)\n(200y, pull)\n3[(100y, single arm freestyle right side, free, single arm freestyle left side, free)]\n8[(50y, build 1-4)]\n6[(100yards, 110, as 75 overspeed - 25 normal)]\n4[(50y, 25 fist / 25 free / 25 scull / 25 free)]\n6[(100yards, 110, as 50 overspeed - 50 normal)]\n(200y, easy cooldown choice)', '', '2017-03-18 12:52:26', 4265, 89, 0),
	(1082, 'CSS Swimming (200-50)', '(500y, free)\n3[(100y, single arm freestyle right side, free, single arm freestyle left side, free)]\n4[(50y, build 1-4)]\n[(200y, at CSS), (150y, at CSS), (100y, at CSS), (50y, at CSS), (50y, at CSS), (100y, at CSS), (150y, at CSS), (200y, at CSS)]\n[(200y, at CSS), (150y, at CSS), (100y, at CSS), (50y, at CSS), (200y, at CSS), (150y, at CSS), (100y, at CSS), (50y, at CSS)]\n(100y, easy cooldown choice)', '', '2017-03-18 12:54:31', 3737, 95, 0),
	(1092, '40\' HIM Free ride', '(20min, 50, 80)\n(50min, 90, work 40\' at HIM pace w/ 10\' rest)\n(10min, 55)', '', '2017-03-18 13:14:30', 4800, 87, 2),
	(1102, 'IM Race Pace', '(12min, 55, 75)\n6[(20s, *, fast), (60s, *, easy)]\n(5min, 55)\n[(20min, 70, confortable endurance), (5min, 55)]\n4[(20min, 75), (5min, 85), (5min, 55)]\n(10min, 55)', '', '2017-03-18 13:19:57', 10800, 144, 1),
	(1112, 'Short FTP Test', '(12min, 55, 75)\n5[(10s, *, fast), (50s, *, easy)]\n(5min, 55)\n4[(1min, 85, 90, 95, 100), (2min, 55)]\n(5min, 55)\n(20min, *, TEST)\n(11min, 55)', '', '2017-03-18 13:26:17', 4200, 29, 1),
	(1122, 'Pacing', '(300y, swim with fins)\n(200y, kick with fins)\n(200y, pull)\n6[(50y, descend 1-3)]\n(200y, +4)\n(300y, with fins)\n4[(50y, +4)]\n(200y, +2)\n(300y, with fins and paddles)\n4[(50y, +2)]\n(200y, +1)\n(300y, with fins)\n4[(50y, +1)]', '', '2017-03-20 12:41:52', 2615, 61, 0),
	(1132, 'DTD - Russian Ladder', '(12.5min, 55, 75)\n(30s, 100), (2min, 55)\n3[(6s, *, max sprint), (1min, 55)]\n[(1:42min, 55)]\n(24min, 70),\n2[\n(15s, *, ON), (45s, *, OFF),\n(30s, *, ON), (30s, *, OFF),\n(45s, *, ON), (15s, *, OFF),\n(60s, *, ON), (60s, *, OFF),\n(45s, *, ON), (15s, *, OFF),\n(30s, *, ON), (30s, *, OFF),\n(15s, *, ON), (5:45min, *, OFF))\n]\n(20min, 70)\n(5min, 55)\n', '', '2017-03-22 02:25:20', 5700, 52, 1),
	(1142, '300/CSS', '(400y, free)\n2[4[(50y, descend 1-4)]]\n5[(300y, +0, with 30s rest)]\n3[(100y, +0, with 15s rest)]\n4[(50y, stroke no free - rest 10s)]\n(200y, free cooldown)', '', '2017-03-24 12:32:14', 3638, 91, 0),
	(1152, '400/Overpeed', '2[(200y, swim), (150y, swim with fins), (50y, scull)]\n4[(50y, descend 1-4)]\n(400y, reverse build -  start over speed and reduce to aerobic tempo with 30s rest)\n(100y, easy pull)\n4[(100y, alternate overspeed with easy free with 15s rest)]\n(100y, fingertip drag / free by 25) \n(400y, neg split at 200 first half aerobic/2nd half very hard - rest 40s)\n(100y, stroke no freestyle)\n4[(100y, swim descend on send off that gives no more than 10s rest after no1)]\n(100y, easy pull)\n(200y, free cooldown)', '', '2017-03-24 12:35:30', 4182, 90, 0),
	(1162, 'CSS Swimming (200-50) II', '(500y, free)\n3[(100y, single arm freestyle right side, free, single arm freestyle left side, free)]\n4[(50y, build 1-4)]\n[(200y, +0), (150y, +0), (100y, +0), (50y, +0), (50y, +0), (100y, +0), (150y, +0), (200y, +0)]\n[(200y, +0), (150y, +0), (100y, +0), (50y, +0), (200y, +0), (150y, +0), (100y, +0), (50y, +0)]\n(100y, easy cooldown choice)', '', '2017-03-24 16:43:41', 3347, 85, 0),
	(1192, 'DTD -  Specific Strength 2 II', '(12min, 55, 72)\n5[(10s, *, sprint), (*, 50s, easy)]\n(3min, 55)\n[(10min, 85, 65rpm), (10min, 88, 65rpm)]\n[(10min, 85, 95rpm), (10min, 88, 95rpm)]\n[(10min, 85, 80rpm), (10min, 88, 80rpm)]\n(10min, 65, 55)', '', '2017-03-29 12:45:09', 5400, 91, 1),
	(1202, 'DTD -  Specific Strength 1 II', '(12min, 55, 75)\n5[(10s, *, sprint), (*, 50s, easy)]\n(3min, 55)\n2[[(5min, 88, 65rpm), (5min, 90, 65rpm)], [(5min, 88, 80rpm), (5min, 90, 80rpm)], [(5min, 88, 95rpm), (5min, 90, 95rpm)]]\n(10min, 65, 55)', '', '2017-03-29 12:48:00', 5400, 95, 1);
/*!40000 ALTER TABLE `workouts` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;