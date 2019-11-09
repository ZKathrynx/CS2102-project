// SQL query list to be used in the application
module.exports = {

    // create
    add_user: 'INSERT INTO Users (uid, name, password, phone) VALUES($1, $2, $3, $4)',
    add_driver: 'INSERT INTO Drivers VALUES ($1)',
    add_passenger: 'INSERT INTO Passengers VALUES ($1)',
    add_bankaccount: 'INSERT INTO BankAccounts VALUES ($1,$2)',
    add_bind: 'INSERT INTO Binds VALUES ($1,$2)',
    add_car: 'INSERT INTO Cars VALUES($1,$2,$3)',
    add_own: 'INSERT INTO Owns VALUE($1,$2)',
    add_bid: 'INSERT INTO Bids (did,pid,rdate,rtime,price) VALUES ($1,$2,$3,$4,$5)',
    add_ride: 'INSERT INTO Rides VALUES ($1,$2,$3,$4,$5,$6)',
    add_deal: 'INSERT INTO Deals (did,pid,rdate,rtime,atime) VALUES ($1,$2,$3,$4,$5)',
    add_evaluate: 'INSERT INTO Evaluates VALUES ($1,$2.$3,$4,$5,$6,$7,$8)',
    add_complain: 'INSERT INTO Complains VALUES ($1,$2,$3,$4,$5)',
    
    // retrieve
    get_ride: 'SELECT * FROM Rides WHERE uid = $1 AND rdate = $2 AND rdate = $3',
    get_bids_driver: 'SELECT * FROM Bids WHERE did = $1 AND is_pending = TRUE',
    get_bids_passenger: 'SELECT * FROM Bids WHERE pid = $1',
    check_password: 'SELECT uid FROM Users WHERE uid = $1 and password = $2',
    get_account: 'SELECT * FROM Users WHERE uid = $1',
    get_car: 'SELECT * FROM Owns AS O JOIN Cars AS C ON O.cid = C.plate WHERE O.uid = $1',
    get_evaluations: 'SELECT * FROM Evaluates WHERE did = $1',

    // update
    add_balance: 'UPDATE Users SET balance = balance + $2 WHERE uid = $1',
    delete_balance: 'UPDATE Users SET balance = balance - $2 WHERE uid = $1',
    update_win_bid: 'UPDATE Bids SET is_pending = FALSE, is_win = TRUE WHERE did = $1 AND pid = $2 AND rdate = $3 AND rtime = $4',
    update_other_bid: 'UPDATE Bids SET is_pending  = FALSE WHERE did = $1 AND rdate = $2 AND rtime = $3 AND is_win = FALSE',
    update_deal_time: 'UPDATE Deals SET dtime = $4 WHERE did = $1 AND rdate = $2 AND rtime = $3',
    update_ride_status: 'UPDATE Rides SET reached = TRUE WHERE did = $1 AND rdate = $2 AND rtime = $3',

    // complex queries
    // 1: get all rides before current time
    get_all_rides: 'WITH X AS( SELECT * FROM Rides GROUP BY uid,rdate,rtime HAVING CAST (NOW() AS DATE)< rdate OR ( CAST (NOW() AS DATE)= rdate AND CAST (NOW() AS TIME)< rtime)) SELECT uid AS driver, rdate AS start_date, rtime AS start_time, origin, destination,capacity FROM X WHERE reached = FALSE ORDER BY uid',
    // 2: auto select bid
    auto_select: 'WITH X AS ( SELECT * FROM Bids WHERE did = $1 AND rdate = $2 AND rtime = $3 ORDER BY price DESC LIMIT 1) UPDATE Bids AS B SET is_win = TRUE, is_pending = FALSE FROM X WHERE B.did = X.did AND B.rdate = X.rdate AND B.rtime = X.rtime AND B.pid = X.pid',
    // 3: rank all rides according to driver ranking
    
	
	// get_upcoming_rides_driver: 'SELECT * FROM rides WHERE is_complete = FALSE AND username = $1',
	// get_upcoming_rides_passenger: 'SELECT * FROM rides NATURAL JOIN bids WHERE is_win = TRUE AND puname = $1 AND is_complete = FALSE', // bids won but ride not complete
	// complete_upcoming_rides_driver: 'UPDATE rides SET is_complete = TRUE WHERE username = $1 AND pickup = $2 AND dropoff = $3 AND ride_date = $4 AND start_time = $5',

	// driver_rating: 'SELECT ROUND(AVG(rating),2) FROM ratings GROUP BY duname HAVING duname = $1',
	// rides_search: 'SELECT * FROM rides r WHERE r.pickup = $1 AND r.dropoff = $2',
	// individualRide: 'SELECT * FROM rides r,bids b WHERE r.pickup = $1 AND r.dropoff = $2 AND r.ride_date = $3  AND r.start_time = $4 AND r.username = $5 AND b.pickup = $1 AND b.dropoff = $2 AND b.ride_date = $3  AND b.start_time = $4 AND b.duname = $5 ORDER BY b.amount DESC',
	// update_individual_bid: 'UPDATE bids SET is_win = \'TRUE\' WHERE b.pickup = $1 AND b.dropoff = $2 AND b.ride_date = $3  AND b.start_time = $4 AND b.duname = $5 AND b.puname = $6',
    // update_win_bid: 'WITH X AS (SELECT * FROM Bids b WHERE b.pickup = $1 AND b.dropoff = $2 AND b.ride_date = $3  AND b.start_time = $4 AND b.duname = $5 ORDER BY amount DESC LIMIT $6) UPDATE bids b SET is_win = \'TRUE\' FROM X WHERE b.puname = X.puname AND b.duname = X.duname AND b.pickup = X.pickup AND b.dropoff = X.dropoff AND b.start_time = X.start_time AND b.ride_date = X.ride_date' 

}