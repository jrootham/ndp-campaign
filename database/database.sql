CREATE DATABASE campaign TEMPLATE template0 ENCODING='UTF8' LC_COLLATE='POSIX' LC_CTYPE='POSIX';
\c campaign;

CREATE TABLE election
(
	id				SERIAL 			PRIMARY KEY,
	name			VARCHAR
);

CREATE TABLE race
(
	id				SERIAL 			PRIMARY KEY,
	name			VARCHAR,
	electionId		INTEGER			REFERENCES election
);

CREATE TABLE district
(
	id				SERIAL 			PRIMARY KEY,
	name			VARCHAR,
	raceId			INTEGER			REFERENCES election
);

CREATE TABLE poll
(
	id				SERIAL 			PRIMARY KEY,
	name			VARCHAR
);

CREATE TABLE district_poll
(
	districtId		INTEGER			REFERENCES district,
	pollId			INTEGER			REFERENCES poll,
	PRIMARY KEY(districtId, pollId)
);

CREATE TABLE postalcode
(
	id				SERIAL 			PRIMARY KEY,
	name			VARCHAR(7)
);

CREATE TABLE street
(
	id				SERIAL 			PRIMARY KEY,
	street			VARCHAR			NOT NULL
);

CREATE TABLE address
(
	id				SERIAL 			PRIMARY KEY,
	postalcodeId	INTEGER			NOT NULL REFERENCES postalcode,
	streetId		INTEGER			NOT NULL REFERENCES street,
	address			VARCHAR			NOT NULL,
	apartment		VARCHAR,
	homephone		VARCHAR(12)
);

CREATE TABLE person
(
	id				SERIAL 			PRIMARY KEY,
	firstname		VARCHAR,
	lastname		VARCHAR			NOT NULL,
	cellphone		VARCHAR(12)
);

CREATE TABLE question
(
	id				SERIAL 			PRIMARY KEY,
	raceId			INTEGER			REFERENCES race,
	question		VARCHAR
);

CREATE TABLE answer
(
	id				SERIAL 			PRIMARY KEY,
	questionId		INTEGER			REFERENCES question,
	answer			VARCHAR
);
