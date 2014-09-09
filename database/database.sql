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

CREATE TABLE region
(
	id				SERIAL 			PRIMARY KEY,
	name			VARCHAR,
	raceId			INTEGER			REFERENCES election,
	parentId		INTEGER			REFERENCES region
);

CREATE TABLE district
(
	id				SERIAL 			PRIMARY KEY,
	name			VARCHAR,
	raceId			INTEGER			REFERENCES election,
	regionId		INTEGER			REFERENCES region
);

CREATE TABLE poll
(
	id				SERIAL 			PRIMARY KEY,
	name			VARCHAR
);

CREATE TABLE districtPoll
(
	districtId		INTEGER			REFERENCES district,
	pollId			INTEGER			REFERENCES poll,
	PRIMARY KEY(districtId, pollId)
);

CREATE TABLE postalcode
(
	id				SERIAL 			PRIMARY KEY,
	name			VARCHAR(7)		NOT NULL
);

CREATE TABLE street
(
	id				SERIAL 			PRIMARY KEY,
	name			VARCHAR			NOT NULL
);

CREATE TABLE address
(
	id				SERIAL 			PRIMARY KEY,
	postalcodeId	INTEGER			REFERENCES postalcode,
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
	addressId		INTEGER			REFERENCES address
);

CREATE TABLE telephone
(
	id				SERIAL 			PRIMARY KEY,
	name			VARCHAR,
	number			VARCHAR(12)
	personId		INTEGER			REFERENCES person
)

CREATE TABLE recruit
(
	id				SERIAL 			PRIMARY KEY,
	personId		INTEGER			NOT NULL REFERENCES person,
	token			VARCHAR
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

CREATE TABLE permissionType
(
	id				SERIAL 			PRIMARY KEY,
	name			VARCHAR
);

INSERT INTO permissionType (name)
	VALUES('Superuser'),('Organizer'),('Canvasser'),('Campaign Manager'),('Data Editor'));

CREATE TABLE permission
(
	id				SERIAL 			PRIMARY KEY,
	ownerId			INTEGER			NOT NULL REFERENCES recruit,
	recruitId		INTEGER			NOT NULL REFERENCES recruit,
	type			INTEGER			NOT NULL REFERENCES permissionType,
	thing			INTEGER			NOT NULL
);

CREATE TABLE contact
(
	id				SERIAL 			PRIMARY KEY,
	ownerId			INTEGER			REFERENCES recruit,
	contactWhen		TIMESTAMP WITH TIME ZONE	DEFAULT NOW()
);

CREATE TABLE result
(
	id				SERIAL 			PRIMARY KEY,
	contactId		INTEGER			REFERENCES contact,
	answerId		INTEGER			REFERENCES answer
);

CREATE TABLE comment
(
	id				SERIAL 			PRIMARY KEY,
	contactId		INTEGER			REFERENCES contact,
	comment			VARCHAR
);
