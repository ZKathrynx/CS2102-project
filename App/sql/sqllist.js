// SQL query list to be used in the application
module.exports = {

    // create
    add_user: 'INSERT INTO Users (uid, name, password, phone) VALUES($1, $2, $3, $4)',
    add_driver: 'INSERT INTO Drivers VALUES ($1)',
    add_passenger: 'INSERT INTO Passengers VALUES ($1)',
    add_bankaccount: 'INSERT INTO BankAccounts VALUES ($1,$2)',
    add_bind: 'INSERT INTO Binds VALUES ($1,$2)',
    add_car: 'INSERT INTO Cars VALUES($1,$2,$3)',
    add_own: 'INSERT INTO Owns VALUES($1,$2)',
    add_bid: 'INSERT INTO Bids (did,pid,rdate,rtime,price) VALUES ($1,$2,$3,$4,$5)',
    add_ride: 'INSERT INTO Rides VALUES ($1,$2,$3,$4,$5,$6)',
    add_deal: 'INSERT INTO Deals (did,pid,rdate,rtime,atime) VALUES ($1,$2,$3,$4,CAST (NOW() AS TIME))',
    add_evaluate: 'INSERT INTO Evaluates VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
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
    update_start_time: 'UPDATE Deals SET dtime = CAST (NOW() AS TIME) WHERE did = $1 AND rdate = $2 AND rtime = $3',
    update_ride_status: 'UPDATE Rides SET reached = TRUE WHERE uid = $1 AND rdate = $2 AND rtime = $3',
    get_current_deal: 'SELECT R.uid, R.rdate, R.rtime, R.origin, R.destination, R.capacity, B.price, D.atime FROM Rides AS R, Bids AS B, Deals AS D WHERE R.uid = B.did AND B.did = D.did AND R.rdate = B.rdate AND B.rdate = D.rdate AND R.rtime = B.rtime AND B.rtime = D.rtime AND B.pid = $1 AND B.is_win AND R.reached = FALSE',

    // complex queries
    // 1: get all rides before current time
    get_all_rides: 'WITH X AS( SELECT * FROM Rides GROUP BY uid,rdate,rtime HAVING CAST (NOW() AS DATE)< rdate OR ( CAST (NOW() AS DATE)= rdate AND CAST (NOW() AS TIME)< rtime)) SELECT uid AS driver, rdate AS start_date, rtime AS start_time, origin, destination,capacity FROM X WHERE reached = FALSE ORDER BY uid',
    // 2: auto select bid
    auto_select: 'WITH X AS ( SELECT * FROM Bids WHERE did = $1 AND rdate = $2 AND rtime = $3 ORDER BY price DESC,pid ASC LIMIT 1) UPDATE Bids AS B SET is_win = TRUE, is_pending = FALSE FROM X WHERE B.did = X.did AND B.rdate = X.rdate AND B.rtime = X.rtime AND B.pid = X.pid',
    // 3: rank all rides according to driver ranking
    rank_drivers: 'WITH X AS ( SELECT D.uid FROM Drivers AS D WHERE D.uid IN ( SELECT R.uid FROM Rides AS R WHERE R.reached = FALSE )), Y AS ( SELECT E.did, AVG(rank) AS avgrank FROM Evaluates AS E GROUP BY E.did ) SELECT X.uid FROM X, Y WHERE X.uid = Y.did ORDER BY Y.avgrank DESC;'
    
}