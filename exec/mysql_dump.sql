CREATE DATABASE  IF NOT EXISTS `prod` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `prod`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: k9b107.p.ssafy.io    Database: prod
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime NOT NULL,
  `modified_time` datetime NOT NULL,
  `board_content` varchar(255) NOT NULL,
  `board_hit` bigint NOT NULL,
  `board_title` varchar(50) NOT NULL,
  `report_id` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`board_id`),
  KEY `FKfyf1fchnby6hndhlfaidier1r` (`user_id`),
  CONSTRAINT `FKfyf1fchnby6hndhlfaidier1r` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,'2023-11-15 17:16:44','2023-11-16 16:29:51','처음보는 기술 면접인데 다 모르겠어요...',138,'첫 기술면접!','65547e1209b6185e5cbe8df2',2);
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime NOT NULL,
  `modified_time` datetime NOT NULL,
  `comment_content` varchar(255) NOT NULL,
  `board_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKlij9oor1nav89jeat35s6kbp1` (`board_id`),
  KEY `FK8kcum44fvpupyw6f5baccx25c` (`user_id`),
  CONSTRAINT `FK8kcum44fvpupyw6f5baccx25c` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKlij9oor1nav89jeat35s6kbp1` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'2023-11-15 17:17:23','2023-11-15 17:17:23','잘모르겠습니다가 많아요...',1,12),(2,'2023-11-15 17:30:37','2023-11-15 17:30:37','Umm..',1,14),(3,'2023-11-15 17:40:55','2023-11-15 17:40:55','프로세스와 스레드의 차이점은 백엔드 기술면접에 빈출되는 부분이니 공부해두시는걸 추천합니당',1,4),(4,'2023-11-16 14:18:15','2023-11-16 14:18:15','good',1,28);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resume`
--

DROP TABLE IF EXISTS `resume`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resume` (
  `resume_id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime NOT NULL,
  `modified_time` datetime NOT NULL,
  `company_name` varchar(30) NOT NULL,
  `interview_date` date DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`resume_id`),
  KEY `FKiqntisdlc7ta7sjr6d8rj5ae2` (`user_id`),
  CONSTRAINT `FKiqntisdlc7ta7sjr6d8rj5ae2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resume`
--

LOCK TABLES `resume` WRITE;
/*!40000 ALTER TABLE `resume` DISABLE KEYS */;
INSERT INTO `resume` VALUES (1,'2023-11-15 16:03:26','2023-11-15 16:03:26','미라콤아이앤씨','2023-12-09',3),(2,'2023-11-15 17:03:27','2023-11-15 17:03:27','ㅁㅁ','2023-11-19',7),(3,'2023-11-16 12:39:54','2023-11-16 12:39:54','SSAFY','2023-11-17',17),(4,'2023-11-16 12:40:02','2023-11-16 12:40:02','SSAFY','2023-11-17',1),(5,'2023-11-16 12:42:12','2023-11-16 12:42:12','SSAFY','2023-12-04',2),(6,'2023-11-16 12:48:30','2023-11-16 12:48:30','삼성 청년 SW 아카데미','2022-12-21',3),(8,'2023-11-16 13:12:41','2023-11-16 13:12:41','싸피','2023-11-17',12),(9,'2023-11-16 13:49:58','2023-11-16 13:49:58','현대 오토에버','2023-11-30',2),(10,'2023-11-16 13:50:12','2023-11-16 13:50:12','신한은행','2023-11-17',17),(11,'2023-11-16 13:51:39','2023-11-16 13:51:39','신한은행','2023-10-27',1),(12,'2023-11-16 13:51:44','2023-11-16 13:51:44','안랩','2023-11-30',2),(14,'2023-11-16 14:15:59','2023-11-16 14:15:59','LG CNS','2025-11-11',28),(15,'2023-11-16 14:33:52','2023-11-16 14:33:52','현대 캐피탈','2023-12-11',2),(16,'2023-11-16 16:24:50','2023-11-16 16:24:50','싸피','2023-11-17',12);
/*!40000 ALTER TABLE `resume` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resume_item`
--

DROP TABLE IF EXISTS `resume_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resume_item` (
  `resume_item_id` bigint NOT NULL AUTO_INCREMENT,
  `resume_answer` varchar(1500) NOT NULL,
  `resume_question` varchar(255) NOT NULL,
  `resume_id` bigint DEFAULT NULL,
  PRIMARY KEY (`resume_item_id`),
  KEY `FK9pegbq7oybqsg5m2bds909d0i` (`resume_id`),
  CONSTRAINT `FK9pegbq7oybqsg5m2bds909d0i` FOREIGN KEY (`resume_id`) REFERENCES `resume` (`resume_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resume_item`
--

LOCK TABLES `resume_item` WRITE;
/*!40000 ALTER TABLE `resume_item` DISABLE KEYS */;
INSERT INTO `resume_item` VALUES (5,'[도전적인 정신을 가진 개발자]\n대학교 때는 AI 관련 여러 프로젝트들 진행했습니다. 캡스톤 디자인을 진행하던 중 AI모델을 탑재할 서비스의 필요성을 느끼게 되었고 웹 개발 역량을 강화하기 위해 삼성 청년 SW 아카데미(SSAFY)에 지원하게 되었습니다. SSAFY 2학기 첫 번째 프로젝트에서는 1학기에 사용했던 SQL문을 직접 작성하는 Mybatis가 아닌 ORM 기반의 Spring Data JPA를 사용했습니다. 개념을 잡기 위해 여러 블로그와 인프런 강의를 참고하여 기초를 탄탄히 쌓았고, 이를 기반으로 온라인 캠스터디 프로젝트 \"타티\"에서 백엔드로 참여하여 스터디 관련 기능들을 모두 개발하였습니다. 두 번째 프로젝트에서는 기프티콘 이미지의 OCR기술이 필요하여 Pytesseract 모델을 사용하여 데이터 후처리를 통해 OCR 기능의 완성도를 높였습니다. 현재는 마지막 프로젝트를 마무리하고 있는데 6명의 백엔드 개발 지망생들로 팀을 구성하여 팀장으로 참가했습니다. 백엔드 서버를 먼저 구축하고 6명 모두 React를 활용하여 프론트엔드 개발 역량을 향상시켰습니다. 또한 AWS EC2에 Docker와 Jenkins를 활용하여 SpringBoot, React, FastAPI를 모두 자동 배포 했습니다. 이처럼 처음 접하는 분야에도 할 수 있는 방법들을 동원하여 해결하려는 도전적인 정신을 가진 개발자라고 생각합니다.\n\n[다양한 방법 도입으로 인한 개발 시간 증가]\n도전적으로 기능 개발에 대해 여러 방법들을 시도하기 때문에 남들보다 개발시간이 더 걸리는 편입니다. 기프티콘 이미지 OCR 모델을 만든 후 FastAPI를 통해 프록시 서버를 구축하였을 때 OCR 모델을 직접 학습도 하고 이미 만들어진 모델들을 사용하면서 기능 개발 시간이 생각보다 오래 걸렸던 경험이 있습니다. 하지만 저는 여러 방법으로 개발을 한 후 가장 최적화나 성능이 좋은 기능을 도입하는 것을 선호합니다. 이러한 저의 개발 성향은 미라콤아이앤씨에서 오히려 장점으로 적용될 것으로 생각됩니다. ','간단한 자기소개(성격의 장단점)',1),(6,'미라콤아이앤씨는 스마트팩토리에 대한 첨단 기술과 혁신적인 솔루션으로 글로벌 시장에서 선도적인 위치에 있는 기업으로서, 그동안의 성장과 탄탄한 신뢰를 바탕으로 향후에도 산업을 선도할 것입니다. 미라콤아이앤씨의 추구하는 가치와 제가 추구하는 사용자 중심의 개발 성향이 비슷합니다. 사용자 만족을 최우선으로 두는 미라콤아이앤씨와 함께하여, 사용자 입장을 고려하여 모든 경우에 대한 예외처리, 테스트를 통하여 고품질의 소프트웨어를 제공하고 사용자 경험을 극대화하고자 합니다.\n\n입사 후 포부는 미라콤아이앤씨의 혁신적이고 복잡한 프로.젝트에 참여하면서 새로운 기술을 습득하고, 사용자 중심의 솔루션을 개발하는 데에 기여하는 것입니다. 또한, 팀원들과의 협업을 통해 서로의 강점을 살려 효율적인 팀워크를 구축하고 회사의 비전을 실현하고자 합니다. 대학교부터 쌓아온 AI, 빅데이터 전공 지식과 역량과 삼성 청년 SW 아카데미(SSAFY)를 통해 얻은 웹/앱 개발 역량, AWS EC2에 Docker와 Jenkins를 통해 CI/CD 파이프라인 구축의 경험을 바탕으로 저의 모든 역량을 적극 발휘하여 AI 모델 학습, 웹/앱 서비스 개발, 클라우드 배포 등의 역량을 미라콤아이앤씨와 함께 성장하고 싶습니다. 또한 저의 장점인 기술적인 도전과 낙천적인 성격을 활용하여 팀 내 협업뿐만 아니라 다른 팀과의 협업에서도 배우는 것에 대한 즐거움을 느끼며 저의 커리어를 쌓아나가고 싶습니다.','입사동기 및 입사 후 포부',1),(7,'ㅇㄴㄹㅇㄴ','ㅁㅇ',2),(8,'웹 프로그래밍 역량을 키워 개발자로 성장하겠습니다.','지원동기',3),(9,'대학 생활 중 두 번의 캡스톤 프로젝트에서 각각 “비대면 강의 수강 시 출결 관리를 위한 모바일 앱”, “이미지 형태의 기프티콘을 관리할 수 있는 모바일 앱”을 제작한 경험이 있습니다. 두 번 모두 백엔드 개발을 담당하였는데, 주제는 달랐지만 서비스를 기획하고 설계하고 이를 구현해나가는 과정을 반복하다 보니 스스로 개선된 점을 발견할 수 있었습니다. 첫번째 프로젝트에서는 막연히 실행되는 코드를 작성하는 데에만 집중했지만 두번째 프로젝트에서는 api를 만들 때 데이터를 CRUD 관점에서 놓친 부분은 없는지, api문서는 어떻게 제공해 주는 것이 좋은지 고민하였고, 코드를 모듈화하여 소스파일을 분할하는 등 코드 개선에도 좀더 노력을 기울였습니다. 이를 통해 아직 부족한 점이 너무 많다고 느꼈고, 나아가 좀더 기본이 탄탄한 소프트웨어 개발자고 성장하고 싶다는 생각으로 이어지게 되었습니다. 싸피에서 좀더 체계적인 교육을 받고 실무에 가까운 프로젝트를 경험할 수 있는 기회가 주어진다면 단순히 원하는 기능을 구현하는 것에 그치지 않고 협업하기에 좋고, 유지보수하기 좋고, 읽기 좋고, 탄탄한 프로그램을 구현할 수 있는 개발자로 성장할 수 있을 것이라 생각합니다.','향후 어떤 SW 개발자로 성장하고 싶은지 SW 관련 경험을 토대로 기술하고, SSAFY에 지원하신 동기에 대해서도 작성 바랍니다. SW 관련 경험: SW 개발, SW 프로젝트 및 SW 경진대회 경험(참여, 수상 등), IT 관련 자격증 취득 등  (500자 내외. 최대 600자)',4),(10,'저의 가장 어려웠던 경험은 3-match 퍼즐 게임을 만드는 팀 프로젝트이며 이 프로젝트를 통해 소통의 중요성을 깨닫게 되었습니다. \n5인 팀 프로젝트의 팀장을 맡으면서 처음에는 팀원들과 제대로 된 소통을 하지 않고 각자 할 일을 하며 가끔 확인만 하는 형식적인 소통만 하였습니다. \n하지만 다른 팀원의 작업 진행도를 잘 몰랐기 때문에 전체적인 팀 프로젝트 일정이 지연되기 시작했습니다. \n저는 소통이 잘못되었다는 것을 깨닫게 되었고, 이러한 상황을 타파하기 위해 매일 작업을 시작하기 전에 스크럼을 진행하였습니다.\n그 후 해당 사항을 노션에 정리하여 프로젝트 일정을 관리할 수 있었습니다. \n팀원간 소통이 계속되면서 원래 일정을 거의 따라잡아 결국 완성된 게임을 제출할 수 있었습니다.\n팀 프로젝트를 하면서 사용자의 데이터를 안전하게 관리할 수 있는 데이터 베이스에 대해 관심이 있었고, SSAFY를 통해 데이터베이스에 대해 더 학습하고 싶습니다.\n그리고 위의 팀 프로젝트와 같이 소통만 하는 것이 끝이 아닌 소통을 통해서 더 나은 결과물을 만들고, 매 프로젝트마다 발전하며 실수를 발판삼아 더 많은 것을 배우는 개발자가 되고 싶기 때문에 지원하게 되었습니다.\n','학업 및 취업준비를 하며 가장 어려웠던 경험과 이를 해결하기 위해 했던 노력을 기술하고,  ssafy에 지원하신 동기에 대해서도 작성바랍니다. ',5),(11,'안녕하세요 이번 SSAFY 9기','1분자기소개',6),(14,'저의 가장 어려웠던 경험은 3-match 퍼즐 게임을 만드는 팀 프로젝트이며 이 프로젝트를 통해 소통의 중요성을 깨닫게 되었습니다. \n5인 팀 프로젝트의 팀장을 맡으면서 처음에는 팀원들과 제대로 된 소통을 하지 않고 각자 할 일을 하며 가끔 확인만 하는 형식적인 소통만 하였습니다. \n하지만 다른 팀원의 작업 진행도를 잘 몰랐기 때문에 전체적인 팀 프로젝트 일정이 지연되기 시작했습니다. \n저는 소통이 잘못되었다는 것을 깨닫게 되었고, 이러한 상황을 타파하기 위해 매일 작업을 시작하기 전에 스크럼을 진행하였습니다.\n그 후 해당 사항을 노션에 정리하여 프로젝트 일정을 관리할 수 있었습니다. \n팀원간 소통이 계속되면서 원래 일정을 거의 따라잡아 결국 완성된 게임을 제출할 수 있었습니다.\n팀 프로젝트를 하면서 사용자의 데이터를 안전하게 관리할 수 있는 데이터 베이스에 대해 관심이 있었고, SSAFY를 통해 데이터베이스에 대해 더 학습하고 싶습니다.\n그리고 위의 팀 프로젝트와 같이 소통만 하는 것이 끝이 아닌 소통을 통해서 더 나은 결과물을 만들고, 매 프로젝트마다 발전하며 실수를 발판삼아 더 많은 것을 배우는 개발자가 되고 싶기 때문에 지원하게 되었습니다.','학업 및 취업준비를 하며 가장 어려웠던 경험과 이를 해결하기 위해 했던 노력을 기술하고,  ssafy에 지원하신 동기에 대해서도 작성바랍니다',8),(15,'제가 해당 직무에 지원한 이유는 현대 오토에버의 MaaS 기술과 함께 발전하여 모빌리티 SW 전문성을 기르고, 고객의 안전한 주행을 돕는 SW를 개발하고 싶기 때문에 지원하였습니다. 제가 학부생 시절 들었던 스마트 자동차 공학이라는 강의에서 스마트카란 단순한 이동수단이 아닌 안전, 편의, 환경의 자동차의 핵심 가치가 조화롭게 실현된 자동차라는 말을 듣고 스마트카에 적용된 다양한 전자 장치들과 ICT기술들에 흥미가 생겼습니다.\n스마트카에 흥미가 생기면서 이러한 전자 장치를 통해 얻은 정보를 바탕으로 스마트폰과 연결되어 사고 도로 회피나 주변에 빈자리가 있는 주차장을 확인해 주는 서비스를 만들 수 있을 것이라고 생각을 했습니다.\n\n또한 서비스를 만들기 위해 어떤 기술이 필요한지 알아보면서, 현대 오토에버의 모빌리티 플랫폼 서비스의 백엔드 개발 직무에 관심을 갖게 되었고 Spring Boot 프레임워크와 MySQL 데이터베이스를 학습하며 역량을 길렀습니다.\n현대 오토에버에 입사하며 모빌리티 SW 전문성을 기르고, 고객에게 편리한 모빌리티 서비스를 개발하는 꿈을 키워 나가고 싶기 때문에 해당 직무에 지원하게 되었습니다.\n\n저는 처음에는 신입으로써 모르는 용어도 많고, 새롭게 학습해야 할 기술도 많기 때문에 업무에 지장을 주지 않기 위해 열심히 공부할 것입니다. 동기분들과 사내 스터디를 만들어 알게 된 것이 있으면 공유하고, 모르는 것이 있다면 학습할 것입니다.\n그리고 경력을 쌓아나가면서 스마트카, 커넥티드카에 대한 학습을 꾸준히 할 것입니다. 도메인에 대한 지식이 많아야 모빌리티 플랫폼 서비스를 개발할 때 도메인에 맞는 서비스를 개발할 수 있을 것이라고 생각하기 때문입니다.\n최종적으로 프로젝트 매니저가 되어 제가 기획한 모빌리티 서비스를 개발하고 싶습니다.\nV2X 기술을 통해 다양한 사물과 통신하며 서비스를 제공하는 프로젝트를 이끌어보고 싶습니다.','현대오토에버의 해당 직무에 지원한 이유와 앞으로 현대오토에버에서 키워 나갈 커리어 계획을 작성해주시기 바랍니다.',9),(16,'제가 가지고 있는 역량은 크게 3가지로 나눌 수 있습니다.\n첫 번째는 웹 서버 프로그래밍 역량입니다.\nSSAFY에서 프로젝트를 진행하면서 Spring Boot와 MySQL, JPA를 활용하여 웹 서버를 구축해 본 경험이 있습니다.\n프로젝트의 주제는 기프티콘을 관리와 경매, 물물교환하는 서비스입니다. 프로젝트에서 필터를 통해 기프티콘 목록을 불러오는 기능을 구현할 때 처음에는 필터의 개수가 많지 않고 검색어의 유무만 판단하면 된다고 생각을 했고, 모든 경우의 수에 맞게 하나하나 다른 쿼리문을 작성했습니다.\n하지만 이후 필터가 추가되면서 쿼리문을 추가해야 하는 상황에 맞닥트렸습니다.\n따라서 기능의 확장성과 복잡한 쿼리를 유연하게 처리하기 위해 동적쿼리를 사용해야겠다는 판단을 했습니다.\n동적쿼리를 JPA에서 사용하기 위해 QueryDSL을 도입하여 구현함으로써 이미 작성되어 있던 쿼리문을 수정하고, 복잡한 쿼리를 사용하는 기능들을 사용자 요청에 따라 동적으로 쿼리문을 실행할 수 있도록 하였습니다.\n이 경험을 통해 문제를 해결하기 위해 새로운 기술을 학습하고, 도입할 수 있는 역량을 얻었습니다.\n\n두 번째는 MSA 구성 경험입니다.\n저는 프로젝트를 진행하면서 모놀리식 아키텍처로 된 웹 서버를 구축한 경험이 있습니다. 그리고 모놀리식 서버와 MSA 서버의 장/단점과 성능을 비교해 보기 위해 모놀리식 서버를 MSA로 전환을 해본 경험이 있습니다.\nMSA를 구성하기 위해 kafka를 사용하여 마이크로 서비스 간 요청을 하고 데이터베이스에 있는 데이터의 동기화를 하였습니다.\n또한 Spring Cloud Gateway를 통해 리버스 프록시를 하여 같은 주소로 요청이 오더라도 각각 다른 서버로 요청을 할 수 있도록 하였습니다.\n각각의 마이크로 서비스마다 개발 환경을 맞춰주기 위해 Docker 컨테이너를 사용하여 따로 서버를 만들어주었습니다.\n그 결과 모놀리식 서버는 통합 테스트를 하며 개발하기 편하고, 빠르게 개발할 수 있었습니다. MSA는 하나의 기능을 수정할 때에 서버 전체를 빌드하는 것이 아니라 그 기능만 빌드하고 배포할 수 있기 때문에 유지보수에 장점이 있었습니다.\n이를 통해 MSA가 어떤 방식으로 설계되고, 데이터를 주고받는지 알 수 있었습니다.\n\n세 번째는 모빌리티 도메인 관련 지식입니다.\n저는 전자공학을 전공하면서 스마트자동차공학과 융합전공을 하였습니다.\n따라서 스마트자동차공학 전공 수업을 들으면서 CAN과 Ethernet과 같은 자동차에서 사용하는 통신방식이나 자동차의 센서와 같은 스마트카 도메인에 대한 지식을 쌓을 수 있었습니다.\n이러한 지식이 백엔드 개발자로서는 도움이 안 될 수 있지만, 차량의 정보를 통한 모빌리티 서비스를 개발하는 데에는 도움이 될 수 있을 것입니다.\n\n이러한 역량들을 활용하여 현대 오토에버에서 다양한 모빌리티 플랫폼 서비스를 개발하고 싶습니다.','지원 직무와 관련하여 어떠한 역량을(지식/기술 등) 강점으로 가지고 있는지, 그 역량을 갖추기 위해 무슨 노력과 경험을 했는지 구체적으로 작성해주시기 바랍니다.',9),(17,'[여행 웹 개발 프로젝트]\n기간: 2023.05.18 ~ 2023.05.26\n역할 : 백엔드, 프론트엔드\n사용기술, 프로그램 : Spring Boot, Vue.js, Mysql\n\n SSAFY 교육 과정에서 여행을 주제로 웹개발 프로젝트를 수행하였고, 해당 프로젝트에서 최우수상을 수상하게 \nSpring boot와 vue.js를 기반으로 백엔드와 프론트의 전반적인 이해를 바탕으로 웹개발을 진행하였습니다.\n  여행사 상품 판매를 핵심 서비스로 사용자에게 적절할 정보를 제공할 수 있도록 DB설계부터 진행하였습니다.\n  백엔드에서 CRUD를 기본으로 개발을 진행하고 , 쿼리문을 작성하여 후기 게시판 별점 높은 순으로 상품을 웹 홈화면에 보여주는 등 사용자에게 필요한 정보를 우선적으로 보일 수 있도록 하였습니다.\n  프로젝트를 진행하며 웹 개발을 처음부터 끝까지 풀스택으로 진행하면서 개발 역량을 키울 수 있었고 특히, CRUD, SQL쿼리를 직접 다뤄보면서 백엔드, DB에 대한 이해도를 높일 수 있었습니다. 또한, 팀원과 노션, git을 활용한 커뮤니케이션 과정을 통해 즉각적으로 상호 평가가 가능했고, 사용자에게 가치를 극대화할 수 있도록 사이트를 구상할 수 있었습니다.','본인이 수행한 디지털/ICT 관련 프로젝트와 업무 경험(경력 포함)을 모두 기술해 주세요. 단, 프로젝트 및 업무의 내용, 기간, 본인의 역할, 사용한 기술/지식/프로그램, 결과/성과 등을 구체적으로 작성하고, 특히 본인의 기여에 대해 구체적으로 작성해 주세요.',10),(23,'저는 안랩닷컴 Web 개발 직무를 통해 보안에 대한 정보를 제공하고, 서비스를 이용하고 싶은 고객들에게 더욱 쉽고 편리하게 이용할 수 있도록 안랩닷컴을 만들고 싶습니다.\n안랩닷컴과 ASEC 블로그를 통해 제공하는 보안 자료들을 확인하기 쉽게 하여 최근에는 어떤 보안 이슈들이 있는지 확인하고 대비를 할 수 있도록 하고 싶습니다.\n그리고 저의 Spring Framework와 JPA 역량을 통해 안랩닷컴을 이용하는 사용자들에게 빠른 정보 제공을 하여 좋은 이미지를 얻고 싶습니다.\n그로 인해 안랩닷컴의 페이지 이탈률을 줄여 사용자들이 서비스를 더 많이 이용하도록 하고 싶습니다.\n한국을 대표하는 정보보안 업체인 안랩의 안전해서 더욱 자유로운 세상이라는 비전을 따라 사용자들이 보안 위협에 신속하게 대응할 수 있도록 돕는 기능을 개발해 바이러스에 안전한 한국을 만드는 것에 기여하고 싶습니다.','안랩의 일원으로서, 지원직무를 통해 우리 사회에 또는 내 주위에 어떠한 기여를 하고 싶나요?',12),(24,'저는 마이크로 서비스 아키텍처에 관심을 가지고 있습니다.\n최근 클라우드 컴퓨팅이 대세로 자리 잡으면서 클라우드 서버에 각각의 서비스를 따로 구축해서 연결하는 MSA를 점점 많은 기업에서 채택하고 있습니다.\nMSA에는 서비스 간 의존성을 낮추고, 배포에 대한 비용이 낮아진다는 장점이 있지만, 데이터 관리가 어렵고 성능 저하가 생길 수 있기 때문에 MSA를 도입할 때에는 신중하게 결정해야 한다고 생각합니다.\n트래픽이 단기간에 집중되어 올라가지 않거나 규모가 작은 서비스에서는 모놀리식 아키텍처가 낫다고 생각합니다.\n하지만 각각 서버를 나눠 띄우면서 CI/CD를 하고, 쿠버네티스를 통해 컨테이너를 관리하고, 카프카를 통해 각 서버에서의 요청을 관리하는 것에 흥미를 느끼고 있기 때문에 전에 했던 프로젝트를 MSA로 다시 구축해 MSA에 대해 학습하고 있습니다.\n결국 두 아키텍처의 장단점을 알고 있어야 알맞을 상황에서 적용할 수 있기 때문에 학습하여 알고 있는 것이 중요하다고 생각합니다.','현재 본인이 관심을 가지고 있는 최신기술이나 트렌드에 대하여 본인의 생각을 자유롭게 작성해주세요.',12),(25,'저는 독단적으로 일을 하는 팀원과의 소통 문제를 극복한 경험이 있습니다.\n백엔드 개발을 하면서 한 프론트엔드 개발자와의 협업 경험이 있습니다.\n그 팀원은 프로젝트 초기부터 프로젝트 설계작업에 참여하지 않고, 다른 팀원들이 와이어프레임과 API 명세서,  ERD를 작성하는 동안 혼자서 앱 개발을 시작했습니다.\n그 팀원은 설계를 토대로 개발을 한다고 약속했고, 다른 팀원들은 그 말을 믿고 개발을 시작했습니다.\n\n그러나 실제로 앱을 실행해 보니 기획과 다른 부분이 있었고, 그 팀원은 자신이 생각한 서비스 로직으로 개발을 한 것이었습니다.\n이 문제를 해결하기 위해 그 팀원과 적극적으로 소통하며 설계를 수정하여 팀의 의견을 일치시켰습니다.\n\n이 경험으로 형식적인 소통이상으로 실질적인 개발 진척상황을 확인하는 것이 중요하고, \'알아서 잘하고 있겠지\'라는 생각을 버려야 한다는 것을 깨달았습니다.\n이를 통해 앞으로의 프로젝트에서도 적극적인 소통을 통해 문제를 예방하고 해결할 수 있을 것입니다.','프로젝트나 과제 수행 중 협업을 통해 문제를 해결하거나 갈등을 극복했던 경험을 작성해주세요. ',12),(26,'저의 강점은 새로운 기술을 빠르게 학습하고 이해하는 것, 도전을 두려워하지 않는 것, 약속을 잘 지키는 것입니다.\n첫 번째 강점은 프로젝트를 진행하면서 원하는 기능을 구현하기 위해 WebRTC, OpenCV, QueryDSL과 같은 기술이 필요했습니다. 그때마다 빠르게 학습해서 프로젝트에 적용하여 원하는 기능을 성공적으로 구현할 수 있었습니다.\n\n두 번째 강점은 전자공학을 전공하며 Java와 같은 언어와 웹 프레임워크를 학습한 경험이 없었지만 자신이 좋아하고 흥미가 있는 일을 하고 싶었기 때문에 두려워하지 않고 도전하여 웹 프로그래밍을 배우고 팀 프로젝트를 성공적으로 완성할 수 있었습니다.\n\n세 번째 강점은 팀 프로젝트 데드라인이든, 개인 약속이든, 항상 시간을 엄수해 왔습니다. 프로젝트의 기능 구현에 기한이 정해져 있으면 밤을 새워서라도 어떻게든 기한에 맞추었고, 일상에서의 약속도 매번 30분 전에 도착하는 것을 목표로 해 주변에서 시간을 칼 같이 지킨다는 말을 자주 들었습니다.','본인의 강점 3가지를 자랑해주세요.',12),(35,'1. 2021.03~ 2021.10\n\n모바일 기술 연구실에서 학부연구생으로 활동하면서 약 8개월 동안 과제를 수행한 경험이 있습니다. 숙면을 위한 AI 모션베드 및 빅데이터 플랫폼을 개발하는 과제였으며, 빅데이터 플랫폼 설계 업무를 담당하였습니다. 이를 통해 프로젝트 주관 기관의 요구사항을 분석하고, 제품을 제작하는 외주 업체와의 소통을 경험할 수 있었습니다. 또한 고객의 문제를 충분히 이해하고 문제 해결을 위해 시스템을 설계하는 방법을 배울 수 있었습니다.\n\n2. 2021.09 ~ 2022.06\n\n21년도 2학기, 22년도 1학기 두 번의 캡스톤 프로젝트에서 Node.js와 MySQL을 이용한 백엔드 개발을 담당했습니다. 3학년 2학기에는 학교 이러닝 사이트의 강의 및 과제 정보를 크롤링 하여 비대면 강의 수강 시 출결 관리를 위한 모바일 앱을 제작하였습니다. 백엔드 개발을 담당하여 앱 개발을 맡은 팀원과 크롤링을 맡은 팀원 각각과 논의하며 중간 다리의 역할을 수행하면서 프로젝트의 큰 구조에 대해 이해할 수 있었습니다. 해당 프로젝트를 통해 협업을 할 때 자신이 담당한 포지션 뿐 아니라 클라이언트와 서버가 각각 어떤 일을 수행하는지 파악하는 것이 중요하다는 것을 배울 수 있었습니다. \n\n이를 바탕으로 4학년 1학기에는 이미지 형태의 기프티콘 관리 앱을 주제로 프로젝트를 진행하였습니다. 단순히 기능 구현을 하는 코드를 작성하는 데 그치지 않고 비슷한 일을 수행하는 코드들을 모듈화하거나, ORM을 사용하여 더 직관적인 객체 지향적인 코드를 작성하는 등 재사용 및 유지보수하기 좋은 코드에 대한 고민을 많이 하게 되었습니다.\n\n3. 2022.01 ~ 2022.12\n\n대학생들끼리 모인 창업팀에서 모바일 어플리케이션 개발을 경험했습니다. 프로젝트는 군대 정보글을 제공하고 유저들이 보직썰을 작성할 수 있는 군생활 플랫폼이었습니다. 안드로이드와 ios용 모바일 앱을 혼자 맡아 개발해야 했기 때문에 크로스 플랫폼 프레임워크인 flutter와 dart 언어를 단기간에 익혀 사용하게 되었습니다. 사업팀, CX팀, 디자인팀, 개발팀으로 이루어진 집단에서 각자 다른 역할을 맡은 팀원들과 소통하고 협업 하는 방법을 배웠고, 일정 기한 내에 정의된 설계대로 개발하는 경험을 할 수 있었습니다.\n\n4. 2023.07 ~ 2023.08\n\n삼성 청년 SW아카데미에서 온라인 캠스터디 플랫폼을 주제로 Spring boot, JPA를 사용한 백엔드 개발과 WebRTC 기술 도입을 담당하여 프로젝트를 진행하였습니다. 6명이 프로젝트를 진행하다 보니 서로가 어떤 업무를 진행하고 있는지 파악하기 위해 git, jira와 같은 협업 툴을 사용하고, 매일 진행상황을 공유하는 회의를 진행하면서 개발 중 혼자 해결하기 어려운 문제나 도움이 필요한 부분을 이야기하는 시간을 가졌습니다. 또한 개발을 할 때에도 팀원들이 읽기 좋고 이해하기 좋은 코드가 무엇인지에 대한 고민을 하게 되었고, 초기에 팀의 개발 컨벤션을 정하고 이를 지키는 것 또한 중요한 부분이라는 것을 배울 수 있었습니다.','본인이 수행한 디지털/ICT 관련 프로젝트와 업무 경험(경력 포함)을 모두 기술해 주세요. 단, 프로젝트 및 업무의 내용, 기간, 본인의 역할, 사용한 기술/지식/프로그램, 결과/성과 등을 구체적으로 작성하고, 특히 본인의 기여에 대해 구체적으로 작성해 주세요. (최대 1,500자 입력가능)',11),(36,'SW교육을 통해 얻은 경험과 기술\n\n삼성 청년 SW 아카데미를 통해 DX Engineer 직무에서 요구하는 역량을 강화했습니다.. Python 언어 기반의 교육을 바탕으로 Django, Vue.js 프레임워크를 통한 웹 개발에 대해 배우며 교육 과정에 적극적으로 임해 교육과정 1학기 동안 성적 우수상과 프로젝트 우수상을 수상했습니다. 더불어, 컴퓨터사이언스 지식을 보충하기 위해 교육과정과 별도로 공부하며 정보처리기사와 SQLD 자격증을 취득했습니다.\n기술스택에 국한되지 않고 프로젝트에 필요한 기술이 있다면 습득하기 위해 노력하고 있습니다. 화상회의 기능이 필요한 프로젝트에서는 WebSocket을 학습하였으며, 또한 현재 빅데이터 관련 프로젝트를 수행하면서 hadoop 분산 시스템에 대해 경험하며 배우고 있습니다. 필요한 기술에 대해 실행력 있고 빠르게 습득할 자신이 있습니다. 이런 역량을 통해 빠르게 진화하는 기술 환경에 대응하겠습니다.','지원분야와 관련된 지식이나 경험을 기재하여 주십시오.',14),(37,'기존의 업무를 더 편리하게\n\n제가 소프트웨어 개발을 선택한 이유는 기존의 업무를 더 효율적으로 처리하고자 했기 때문입니다. 이전에 글로벌 유통 스타트업의 초창기 멤버로 일하면서, 고객 통계 데이터 분석과 주문 내역 데이터 처리와 같은 반복 업무를 엑셀을 이용하여 처리했습니다. 그러던 중 \'자동으로 데이터를 정제해 주는 프로그램\'이 있으면 편하겠다는 생각이 들어 소프트웨어 개발을 배우기로 결심했고 삼성 청년 SW아카데미에 입과하게 되었습니다.\nLG CNS는 DX전문기업으로, 다양한 솔루션을 통해 기업의 업무를 더 편리하게 만들어주고 있습니다. 이전 경험을 통해 업무를 더 편리하게 만들어보려는 저의 열정과 LG CNS의 목표가 일치한다고 생각하여 지원하게 되었습니다. 입사 후에는 디지털 금융 분야에서 새로운 시스템을 개발해 고객들에게 더 나은 솔루션을 제공하며 편리한 서비스를 제공하는데 기여하고 싶습니다.','LG CNS에 지원한 동기와 입사 이후 꿈꾸는 것은 무엇인가요?',14),(38,'저는 현대캐피탈의 다양한 도메인을 경험한 팀원들을 통해 성장하고 싶기 때문에 지원하게 되었습니다.\n또한 좋은 프로그램을 만들기 위해 지속적으로 노력하는 점이 좋은 개발 문화를 가진 것 같다는 생각을 했습니다.\n현대캐피탈에 입사하여 백엔드 api를 개발하며 금융을 통해 모빌리티를 선도하며 같이 성장하는 개발자가 되고 싶습니다.\n\n저는 팀 프로젝트에서 코드의 구조 개선을 위해 새로운 기술을 도입한 경험이 있습니다.\n팀 프로젝트 중 필터를 사용한 검색 기능을 구현했었습니다. 처음에는 모든 경우의 수를 따져서 필터 기능을 구현했지만 필터가 많아지면서 경우의 수도 증가하였고, QueryDSL을 사용하여 동적 쿼리문을 작성해야겠다는 생각을 했습니다.\nQueryDSL을 학습하고 도입하여 구현함으로써 이미 작성되어 있던 쿼리문을 수정하고, 복잡한 쿼리를 사용하는 기능들을 사용자 요청에 따라 동적으로 쿼리문을 실행할 수 있도록 하였습니다.','현대캐피탈에 지원하게 된 동기와 지원 직무에 필요한 역량을 기르기 위해 노력했던 경험을 기술해 주십시오.',15),(39,'제가 얻은 깨달음은 \"포기하지 않으면 무엇이든지 가능하다\"입니다.\n대학시절, 저는 전자공학을 전공했습니다. 3학년 말 졸업작품을 제작하면서 IoT와 같은 하드웨어와 결합된 소프트웨어 개발보다 웹 개발과 같은 소프트웨어 중심인 개발을 해보고 싶다는 생각을 했습니다.\n\n웹 개발에 쓰이는 언어와 프레임워크, 데이터베이스와 같은 기술은 학습해 본 경험이 없었기 때문에 이미 해왔던 것을 내려놓고 새로운 일에 도전하는 것이 두려웠습니다.\n그리고 주위에 같은 목표를 가진 사람들이 없었기 때문에 자신이 잘하고 있는지 의문도 들었습니다.\n\n하지만 자신이 좋아하고 흥미가 있는 일을 하고 싶었기 때문에 포기할 수 없었습니다.\n그래서 같은 목표를 가지고 있는 사람들이 있고, 웹 개발을 학습하는데 도움을 줄 수 있는 부트캠프를 찾아보았고,\n삼성 청년 소프트웨어 아카데미에 도전하여 두려움을 극복할 수 있었습니다.\n이러한 경험을 통해 두려워하지 않고 도전하는 것이 중요하다는 것을 알 수 있었습니다.','실패에 대한 두려움을 극복하고 새로운 일에 도전하여 깨달음을 얻은 경험에 대해 기술해 주십시오.',15),(40,'저는 팀 프로젝트를 통해 독단적으로 일을 하는 팀원과의 소통 역량을 높였습니다.\n백엔드 개발을 하면서 한 프론트엔드 개발자와의 협업 경험이 있습니다.\n그 팀원은 프로젝트 초기부터 프로젝트 설계작업에 참여하지 않고, 다른 팀원들이 와이어프레임과 API 명세서,  ERD를 작성하는 동안 혼자서 앱 개발을 시작했습니다.\n그 팀원은 설계를 토대로 개발을 한다고 했고, 다른 팀원들은 그 말을 믿고 개발을 시작했습니다.\n\n그러나 실제로 앱을 실행해보니 기획과 다른 부분이 있었고, 그 팀원은 자신이 생각한 서비스 로직으로 개발을 한 것이었습니다.\n이 문제를 해결하기 위해 그 팀원과 적극적으로 소통하며 설계를 수정하여 팀의 의견을 일치시켰습니다.\n\n이 경험으로 형식적인 소통이상으로 실질적인 개발 진척상황을 확인하는 것이 중요하고, \'알아서 잘 하고 있겠지\'라는 생각을 버려야 한다는 것을 깨달았습니다.\n이를 통해 독단적으로 일하는 사람과도 협업할 수 있는 능력을 키울 수 있었습니다.','가치관이 다른 구성원들과 협업했던 과정에서 본인의 역할은 무엇이었는지, 그 경험을 통해 어떤 역량이 향상되었는지 기술해 주십시오.',15),(41,'저의 가장 어려웠던 경험은 3-match 퍼즐 게임을 만드는 팀 프로젝트이며 이 프로젝트를 통해 소통의 중요성을 깨닫게 되었습니다.\n5인 팀 프로젝트의 팀장을 맡으면서 처음에는 팀원들과 제대로 된 소통을 하지 않고 각자 할 일을 하며 가끔 확인만 하는 형식적인 소통만 하였습니다.\n하지만 다른 팀원의 작업 진행도를 잘 몰랐기 때문에 전체적인 팀 프로젝트 일정이 지연되기 시작했습니다.\n저는 소통이 잘못되었다는 것을 깨닫게 되었고, 이러한 상황을 타파하기 위해 매일 작업을 시작하기 전에 스크럼을 진행하였습니다.\n그 후 해당 사항을 노션에 정리하여 프로젝트 일정을 관리할 수 있었습니다.\n팀원간 소통이 계속되면서 원래 일정을 거의 따라잡아 결국 완성된 게임을 제출할 수 있었습니다.\n팀 프로젝트를 하면서 사용자의 데이터를 안전하게 관리할 수 있는 데이터 베이스에 대해 관심이 있었고, SSAFY를 통해 데이터베이스에 대해 더 학습하고 싶습니다.\n그리고 위의 팀 프로젝트와 같이 소통만 하는 것이 끝이 아닌 소통을 통해서 더 나은 결과물을 만들고, 매 프로젝트마다 발전하며 실수를 발판삼아 더 많은 것을 배우는 개발자가 되고 싶기 때문에 지원하게 되었습니다.','학업 및 취업준비를 하며 가장 어려웠던 경험과 이를 해결하기 위해 했던 노력을 기술하고, ssafy에 지원하신 동기에 대해서도 작성바랍니다.',16);
/*!40000 ALTER TABLE `resume_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_id` bigint NOT NULL AUTO_INCREMENT,
  `employment_type` varchar(3) NOT NULL,
  `review_content` varchar(2000) NOT NULL,
  `review_job` varchar(10) NOT NULL,
  `review_order` varchar(5) NOT NULL,
  `review_question` varchar(50) NOT NULL,
  `resume_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `FK91r8jxl4vyb087rcxc6gnc04o` (`resume_id`),
  KEY `FKiyf57dy48lyiftdrf7y87rnxi` (`user_id`),
  CONSTRAINT `FK91r8jxl4vyb087rcxc6gnc04o` FOREIGN KEY (`resume_id`) REFERENCES `resume` (`resume_id`),
  CONSTRAINT `FKiyf57dy48lyiftdrf7y87rnxi` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `provider` varchar(255) DEFAULT NULL,
  `provider_id` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `user_email` varchar(30) NOT NULL,
  `user_nickname` varchar(30) NOT NULL,
  `user_profile_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'kakao','seoyeonlee0723@gmail.com','USER','seoyeonlee0723@gmail.com','서연','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg'),(2,'kakao','zlzl_321@naver.com','USER','zlzl_321@naver.com','대화','http://k.kakaocdn.net/dn/rHMMK/btrN2V5qlGX/QIVOLfY1gloUo41waExmh1/img_640x640.jpg'),(3,'naver','jBPOrn9Z7eN5LLSaaLwiGTxovd3dhVUqBCHm6vQD6ZE','USER','holizon9@naver.com','박재현','https://ssl.pstatic.net/static/pwe/address/img_profile.png'),(4,'kakao','ekclstkfka44@naver.com','USER','ekclstkfka44@naver.com','풋데브','http://k.kakaocdn.net/dn/xQlXR/btsy8m9dcrX/68hi6NrEdTv7aYRXDUxqSk/img_640x640.jpg'),(5,'google','108207917743179749869','USER','dondegi5@gmail.com','유창재','https://lh3.googleusercontent.com/a/ACg8ocIgWGIrqBgeUbXbuRCNDubn1q8-SInJdijH8sV1A7Gr=s96-c'),(6,'google','112628701189710324202','USER','58suzukitomoko@gmail.com','김재아','https://lh3.googleusercontent.com/a/ACg8ocINcr4QBmSMbHBJk0MVX-8qman0cUxFKzu8EQx9_rNC2g=s96-c'),(7,'kakao','nwhjin@naver.com','USER','nwhjin@naver.com','이효진','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg'),(8,'kakao','money4857@naver.com','USER','money4857@naver.com','임규돈','http://k.kakaocdn.net/dn/deEbhm/btsp2adi8hh/LqzvXK6qMkWOdWF0He1rqk/img_640x640.jpg'),(9,'kakao','math_star@naver.com','USER','math_star@naver.com','정내혁','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg'),(10,'kakao','godzz733@naver.com','USER','godzz733@naver.com','여현빈','http://k.kakaocdn.net/dn/lCtm3/btsqYDSmM2L/ctiAwm8Hqt1lmxoVQO8vvK/img_640x640.jpg'),(11,'google','100494123152125469408','USER','wbo1026@gmail.com','우수인 (우수인)','https://lh3.googleusercontent.com/a/ACg8ocKIT4WKPWo_dL2sSpM1hYJXqnl_u1ZpGR8CHwvkIsDa=s96-c'),(12,'google','103426638716218720532','USER','okip0428@gmail.com','박영기','https://lh3.googleusercontent.com/a/ACg8ocI4YXM8Awdr9oI2PgaIsIOgh0T5KzbonNIe8Ed2gdnQ=s96-c'),(13,'kakao','les0908@kakao.com','USER','les0908@kakao.com','은돌','http://k.kakaocdn.net/dn/cpGduq/btsuG4NpZ7m/pvIGkcWEcT1MY0zwvTcILk/img_640x640.jpg'),(14,'google','100037369638312798097','USER','980430nys@gmail.com','윤식노','https://lh3.googleusercontent.com/a/ACg8ocIADqUTV4jWU8z1c01CvOb4_GoC7w1QtnsNC7OMEsuu=s96-c'),(15,'google','115071904587894571312','USER','yoonmy7@gmail.com','MY Y','https://lh3.googleusercontent.com/a/ACg8ocL68L15zoiqhuYncOGOPHQaMlG95bQ8EJtqCnCq9pMK=s96-c'),(16,'google','111353353544649571657','USER','kjwkjw1104@gmail.com','won','https://lh3.googleusercontent.com/a/ACg8ocLZbcY7VeJhrl80bW0ikHNgP9OtmyfUkDPFO-J_hpSwIQ=s96-c'),(17,'google','102744193889160884014','USER','adh3576@gmail.com','안도희','https://lh3.googleusercontent.com/a/ACg8ocIwSudxOgpOp1jqSnUW7nSmNEXyJjuh3ougHdLsnDSQ=s96-c'),(18,'kakao','hyokyoung@kakao.com','USER','hyokyoung@kakao.com','효경','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg'),(19,'kakao','adh1120@naver.com','USER','adh1120@naver.com','안도희','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg'),(20,'google','106601057603036357672','USER','hklee1926@gmail.com','hk lee','https://lh3.googleusercontent.com/a/ACg8ocLY2ndTa8satDaqplgq182WnA-4zZsjggZwyFSQiqh0=s96-c'),(21,'kakao','kodhdh09@gmail.com','USER','kodhdh09@gmail.com','고다혜','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg'),(22,'kakao','sseq7526@naver.com','USER','sseq7526@naver.com','신준호','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg'),(23,'google','102287185874829135799','USER','jyr4941@gmail.com','정영록','https://lh3.googleusercontent.com/a/ACg8ocIT9t_Xi4S-ufv54vBqtURD4rGUpskK_k_tDBB0BY_T=s96-c'),(24,'kakao','ych0716@naver.com','USER','ych0716@naver.com','이찬희','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg'),(25,'google','106355339647273954795','USER','shin421179@gmail.com','신현철','https://lh3.googleusercontent.com/a/ACg8ocLXkWZ_gJT79PEQzpLDexF1ZkDu82G266n7x0yIOP1tvnk=s96-c'),(26,'kakao','wjd5126@naver.com','USER','wjd5126@naver.com','정형준','http://k.kakaocdn.net/dn/ejUUZ5/btsnwo5ashO/8RCyZ91NUGLAq6uchTbs8K/img_640x640.jpg'),(27,'google','117522729031955588407','USER','engus5860@gmail.com','[대전_1반_B101_김두현]','https://lh3.googleusercontent.com/a/ACg8ocI6JKyTg_sbk0UBfz71Z09Yci5kNNxtvssm9sGoej_hsGA=s96-c'),(28,'google','115632026497400225899','USER','daepo333@gmail.com','hyo','https://lh3.googleusercontent.com/a/ACg8ocL1yDHydmJU1rRlOFE8_64S-eX7UWuSbeJlS7UL-W0W=s96-c'),(29,'google','107191579559473502952','USER','taekputer@gmail.com','[대전_4반_박기택]','https://lh3.googleusercontent.com/a/ACg8ocKUSbmp0oKQg-Z-YdPIw2DFQd7KDKrvdi7rB6tFTjPS=s96-c'),(30,'google','112052140951965378349','USER','hzim0422@gmail.com','홍지민','https://lh3.googleusercontent.com/a/ACg8ocLOW3-hqAzk9zIyNnDjAzO-WDso5zUZiVfnpAZ_gIJ-=s96-c');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-16 16:34:23
