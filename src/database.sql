CREATE TABLE users (
    id UNSIGNED INTEGER PRIMARY KEY,
    username varchar(32),
    password varchar(60)
);

CREATE TABLE games (
    id UNSIGNED INT PRIMARY KEY,
    name varchar(64)
);

CREATE TABLE plays (
    id UNSIGNED INT PRIMARY KEY,
    userid UNSIGNED INT,
    gameid UNSIGNED INT,

    result int, -- 0: lost, 1: won
    -- for spill der man teller poeng er dette poeng i stedet

    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (gameid) REFERENCES games(id)
);