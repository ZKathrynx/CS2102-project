DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Drivers CASCADE;
DROP TABLE IF EXISTS Passengers CASCADE;
DROP TABLE IF EXISTS BankAccounts CASCADE;
DROP TABLE IF EXISTS Cars CASCADE;
DROP TABLE IF EXISTS Rides CASCADE;
DROP TABLE IF EXISTS Binds CASCADE;
DROP TABLE IF EXISTS Owns CASCADE;
DROP TABLE IF EXISTS Complains CASCADE;
DROP TABLE IF EXISTS Bids CASCADE;
DROP TABLE IF EXISTS Deals CASCADE;
DROP TABLE IF EXISTS Evaluates CASCADE;

CREATE TABLE Users (
uid INTEGER,
name VARCHAR(20) NOT NULL,
password VARCHAR(50) NOT NULL,
phone VARCHAR(20) NOT NULL,
balance NUMERIC DEFAULT 0,
PRIMARY KEY (uid)
);
 
CREATE TABLE Drivers (
uid INTEGER REFERENCES Users,
PRIMARY KEY (uid)
);
 
CREATE TABLE Passengers (
uid INTEGER REFERENCES Users,
PRIMARY KEY (uid)
);
 
CREATE TABLE BankAccounts (
bid INTEGER,
bname VARCHAR(20) NOT NULL,
balance NUMERIC DEFAULT 49.99,
PRIMARY KEY (bid)
);
 
CREATE TABLE Cars (
plate INTEGER,
type VARCHAR(20),
model VARCHAR(20),
PRIMARY KEY (plate)
);
 
CREATE TABLE Rides (
uid INTEGER,
rdate DATE,
rtime TIME,
origin VARCHAR(30) NOT NULL,
destination VARCHAR(30) NOT NULL,
capacity INTEGER NOT NULL,
reached BOOLEAN DEFAULT FALSE,
PRIMARY KEY (uid, rdate, rtime),
FOREIGN KEY(uid) REFERENCES Drivers ON DELETE cascade
);
 
CREATE TABLE Binds (
uid INTEGER,
bid INTEGER,
PRIMARY KEY (uid,bid),
FOREIGN KEY (uid) REFERENCES Users,
FOREIGN KEY (bid) REFERENCES BankAccounts
);
 
CREATE TABLE Owns (
uid INTEGER,
cid INTEGER,
PRIMARY KEY (uid,cid),
FOREIGN KEY (uid) REFERENCES Users,
FOREIGN KEY (cid) REFERENCES Cars(plate)
);
 
CREATE TABLE Complains (
did INTEGER,
pid INTEGER,
cdate DATE NOT NULL,
ctime TIME NOT NULL,
description VARCHAR(100) NOT NULL,
PRIMARY KEY (did,pid),
FOREIGN KEY (did) REFERENCES Drivers(uid),
FOREIGN KEY (pid) REFERENCES Passengers(uid)
);
 
CREATE TABLE Bids (
did INTEGER,
pid INTEGER,
rdate DATE,
rtime TIME,
price NUMERIC NOT NULL,
is_pending BOOLEAN DEFAULT TRUE,
is_win BOOLEAN DEFAULT FALSE,
PRIMARY KEY (did, pid, rdate, rtime),
FOREIGN KEY (pid) REFERENCES Passengers(uid),
FOREIGN KEY (did,rdate,rtime) REFERENCES Rides(uid,rdate,rtime)
);
 
CREATE TABLE Deals (
did INTEGER,
pid INTEGER NOT NULL,
rdate DATE,
rtime TIME,
atime TIME NOT NULL,
dtime TIME DEFAULT NULL,
PRIMARY KEY (did, rdate, rtime),
FOREIGN KEY (did, pid, rdate, rtime) REFERENCES Bids(did, pid, rdate, rtime)
);
 
CREATE TABLE Evaluates (
did INTEGER,
pid INTEGER,
rdate DATE,
rtime TIME,
edate DATE NOT NULL,
etime TIME NOT NULL,
rank INTEGER NOT NULL,
comment VARCHAR(100),
PRIMARY KEY (did, pid, rdate, rtime),
FOREIGN KEY (did, rdate, rtime) REFERENCES Deals(did, rdate, rtime),
FOREIGN KEY (pid) REFERENCES Passengers(uid)
);

--TRIGGER 1: update old bid
CREATE OR REPLACE FUNCTION check_bid ()
RETURNS TRIGGER AS $$
	DECLARE count NUMERIC;
	BEGIN
	SELECT COUNT(*) INTO count FROM Bids b
	WHERE NEW.did = b.did AND
	NEW.pid = b.pid AND
	NEW.rdate = b.rdate AND
	NEW.rtime = b.rtime;
	IF count > 0 THEN 
	RETURN UPDATE (OLD.did, OLD.pid, OLD.rdate, OLD.rtime, NEW.price);
	ELSE RETURN NEW;
	END IF;
	END; 
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_update_bid
BEFORE INSERT OR UPDATE ON Bids
EXECUTE PROCEDURE check_bid();

--TRIGGER 2: update old ride

CREATE OR REPLACE FUNCTION check_ride() 
RETURNS TRIGGER AS $$
	DECLARE count NUMERIC;
	BEGIN 
	SELECT COUNT(*) INTO count FROM Rides r
	WHERE NEW.uid = r.uid AND NEW.rdate = r.rdate AND NEW.rtime = r.rtime;
	IF count> 0 THEN
	RETURN UPDATE (OLD.uid, OLD.rdate, OLD.rtime, NEW.origin, NEW.destination, NEW.capacity);
	ELSE RETURN NEW;
	END IF;
	END; 
$$ LANGUAGE plpgsql; 

CREATE TRIGGER check_update_ride
BEFORE INSERT OR UPDATE ON Rides 
EXECUTE PROCEDURE check_ride();


--possible TRIGGER 3: all rank more than 5 is moderated to 5
CREATE OR REPLACE FUNCTION check_rank() 
RETURNS TRIGGER AS $$
	BEGIN 
	RETURN (OLD.did, OLD.pid, OLD.rdate, OLD.rtime, OLD.edate, OLD.etime,5,OLD.comment);
	END; 
$$ LANGUAGE plpgsql; 

CREATE TRIGGER check_new_rank
BEFORE INSERT OR UPDATE ON Evaluates
FOR EACH ROW WHEN (NEW.rank>5) 
EXECUTE PROCEDURE check_rank();

--dummy data
INSERT INTO Users VALUES ('1', 'A', 'passwordA', 'phoneA', '1000.0');
INSERT INTO Users VALUES ('2', 'B', 'passwordB', 'phoneB', '2000.0');
INSERT INTO Users VALUES ('3', 'C', 'passwordC', 'phoneC', '3000.0');
INSERT INTO Users VALUES ('4', 'D', 'passwordD', 'phoneD', '4000.0');
INSERT INTO Users VALUES ('5', 'E', 'passwordE', 'phoneE', '5000.0');
INSERT INTO Users VALUES ('6', 'F', 'passwordF', 'phoneF', '5000.0');
INSERT INTO Users VALUES ('7', 'G', 'passwordG', 'phoneG', '4000.0');
INSERT INTO Users VALUES ('8', 'H', 'passwordH', 'phoneH', '3000.0');
INSERT INTO Users VALUES ('9', 'I', 'passwordI', 'phoneI', '2000.0');
INSERT INTO Users VALUES ('10', 'J', 'passwordJ', 'phoneJ', '1000.0');


 
INSERT INTO Drivers VALUES ('1');
INSERT INTO Drivers VALUES ('2');
INSERT INTO Drivers VALUES ('3');
INSERT INTO Drivers VALUES ('4');
INSERT INTO Drivers VALUES ('5');
INSERT INTO Drivers VALUES ('6');

 
INSERT INTO Passengers VALUES ('5');
INSERT INTO Passengers VALUES ('6');
INSERT INTO Passengers VALUES ('7');
INSERT INTO Passengers VALUES ('8');
INSERT INTO Passengers VALUES ('9');
INSERT INTO Passengers VALUES ('10');

INSERT INTO BankAccounts VALUES ('1', 'BankA', '1000.0');
INSERT INTO BankAccounts VALUES ('2', 'BankB', '1999.0');
INSERT INTO BankAccounts VALUES ('3', 'BankC', '2999.0');
INSERT INTO BankAccounts VALUES ('4', 'BankD', '3999.0');
INSERT INTO BankAccounts VALUES ('5', 'BankE', '4999.0');
INSERT INTO BankAccounts VALUES ('6', 'BankA', '30.0');
INSERT INTO BankAccounts VALUES ('7', 'BankB', '98.0');
INSERT INTO BankAccounts VALUES ('8', 'BankC', '128.0');
INSERT INTO BankAccounts VALUES ('9', 'BankD', '328.0');
INSERT INTO BankAccounts VALUES ('10', 'BankE', '648.0');


INSERT INTO Cars VALUES ('1', 'CarA', 'ModelA');
INSERT INTO Cars VALUES ('2', 'CarB', 'ModelB');
INSERT INTO Cars VALUES ('3', 'CarC', 'ModelC');
INSERT INTO Cars VALUES ('4', 'CarD', 'ModelD');
INSERT INTO Cars VALUES ('5', 'CarE', 'ModelE');
INSERT INTO Cars VALUES ('6', 'CarF', 'ModelF');

INSERT INTO Binds VALUES ('1', '1');
INSERT INTO Binds VALUES ('2', '2');
INSERT INTO Binds VALUES ('3', '3');
INSERT INTO Binds VALUES ('4', '4');
INSERT INTO Binds VALUES ('5', '5');
INSERT INTO Binds VALUES ('6', '6');
INSERT INTO Binds VALUES ('7', '7');
INSERT INTO Binds VALUES ('8', '8');
INSERT INTO Binds VALUES ('9', '9');
INSERT INTO Binds VALUES ('10', '10');

INSERT INTO Owns VALUES ('1', '1');
INSERT INTO Owns VALUES ('2', '2');
INSERT INTO Owns VALUES ('3', '3');
INSERT INTO Owns VALUES ('4', '4');
INSERT INTO Owns VALUES ('5', '5');
INSERT INTO Owns VALUES ('6', '6');

INSERT INTO Rides VALUES ('1', '2019-1-1', '00:00:00', 'NUS', 'NTU', '4');
INSERT INTO Rides VALUES ('2', '2019-1-1', '00:00:00', 'NUS', 'NTU', '4');
INSERT INTO Rides VALUES ('3', '2019-1-1', '01:00:00', 'NUS', 'NTU', '4');
INSERT INTO Rides VALUES ('4', '2019-12-1', '02:00:00', 'NUS', 'NTU', '4');
INSERT INTO Rides VALUES ('5', '2019-12-1', '03:00:00', 'NUS', 'NTU', '4');
INSERT INTO Rides VALUES ('6', '2019-12-1', '04:00:00', 'NUS', 'NTU', '4');
INSERT INTO Rides VALUES ('4', '2019-12-1', '01:00:00', 'NUS', 'NTU', '4');
INSERT INTO Rides VALUES ('6', '2019-12-1', '01:00:00', 'NUS', 'NTU', '4');

INSERT INTO Bids VALUES ('1', '10','2019-1-1', '00:00:00', '1');
INSERT INTO Bids VALUES ('1', '9', '2019-1-1', '00:00:00', '0.5');
INSERT INTO Bids VALUES ('2', '9', '2019-1-1', '00:00:00', '2');
INSERT INTO Bids VALUES ('2', '8', '2019-1-1', '00:00:00', '1');
INSERT INTO Bids VALUES ('3', '8', '2019-1-1', '01:00:00',  '2');
INSERT INTO Bids VALUES ('4', '7', '2019-12-1', '02:00:00',  '2');
INSERT INTO Bids VALUES ('5', '6', '2019-12-1', '03:00:00',  '2');
INSERT INTO Bids VALUES ('6', '5', '2019-12-1', '04:00:00', '2');
INSERT INTO Bids VALUES ('4', '10','2019-12-1', '01:00:00',  '2');
INSERT INTO Bids VALUES ('6', '9', '2019-12-1', '01:00:00',  '2');

INSERT INTO Deals VALUES ('1', '10','2019-1-1', '00:00:00', '00:15:00', '00:30:00');
INSERT INTO Deals VALUES ('2', '9', '2019-1-1', '00:00:00', '00:15:00', '00:30:00');
INSERT INTO Deals VALUES ('3', '8', '2019-1-1', '01:00:00', '01:15:00', '01:30:00');
INSERT INTO Deals VALUES ('4', '7', '2019-12-1', '02:00:00', '02:15:00', '02:30:00');
INSERT INTO Deals VALUES ('5', '6', '2019-12-1', '03:00:00', '03:15:00', '03:30:00');
INSERT INTO Deals VALUES ('6', '5', '2019-12-1', '04:00:00', '04:15:00', '04:30:00');
INSERT INTO Deals VALUES ('4', '10','2019-12-1', '01:00:00', '01:15:00', '01:30:00');
INSERT INTO Deals VALUES ('6', '9', '2019-12-1', '01:00:00', '01:15:00', '01:30:00');

INSERT INTO Evaluates VALUES ('1', '10','2019-1-1', '00:00:00', '2019-1-1', '00:30:00', '1', 'CommentA');
INSERT INTO Evaluates VALUES ('2', '9', '2019-1-1', '00:00:00', '2019-1-1', '00:30:00', '2', 'CommentB');
INSERT INTO Evaluates VALUES ('3', '8', '2019-1-1', '01:00:00', '2019-1-1', '01:30:00', '1', 'CommentC');
INSERT INTO Evaluates VALUES ('4', '7', '2019-12-1', '02:00:00', '2019-1-1', '02:30:00', '2', 'CommentD');
INSERT INTO Evaluates VALUES ('5', '6', '2019-12-1', '03:00:00', '2019-1-1', '03:30:00', '1', 'CommentE');
INSERT INTO Evaluates VALUES ('6', '5', '2019-12-1', '04:00:00', '2019-1-1', '04:30:00', '2', 'CommentF');
INSERT INTO Evaluates VALUES ('4', '10','2019-12-1', '01:00:00', '2019-1-1', '01:30:00', '1', 'CommentG');
INSERT INTO Evaluates VALUES ('6', '9', '2019-12-1', '01:00:00', '2019-1-1', '01:30:00', '2', 'CommentH');

INSERT INTO Complains VALUES ('1', '10','2019-1-1', '00:10:00', 'ComplainA');
INSERT INTO Complains VALUES ('2', '9', '2019-1-1', '00:05:00', 'ComplainB');
INSERT INTO Complains VALUES ('3', '8', '2019-1-1', '01:05:00', 'ComplainC');
INSERT INTO Complains VALUES ('4', '7', '2019-12-1', '02:05:00', 'ComplainD');
INSERT INTO Complains VALUES ('5', '6', '2019-12-1', '03:05:00', 'ComplainE');
INSERT INTO Complains VALUES ('6', '5', '2019-12-1', '04:05:00', 'ComplainF');
INSERT INTO Complains VALUES ('4', '10','2019-12-1', '01:05:00', 'ComplainG');
INSERT INTO Complains VALUES ('6', '9', '2019-12-1', '01:05:00', 'ComplainH');
