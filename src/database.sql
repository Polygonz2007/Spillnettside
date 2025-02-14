CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username varchar(32),
    password varchar(60)
);

CREATE TABLE games (
    id INT PRIMARY KEY,
    name varchar(64),
    type TINYINT -- 0: win loss, 1: points
);

CREATE TABLE plays (
    id INT PRIMARY KEY,
    userid UNSIGNED INT,
    gameid UNSIGNED INT,

    result int, -- 0: lost, 1: won, 2: draw
    -- for spill der man teller poeng er dette poeng i stedet

    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (gameid) REFERENCES games(id)
);