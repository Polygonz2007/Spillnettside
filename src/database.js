
// This module is responsible for handling database interaction by the app, in a safe and proper way.

const sqlite3 = require('better-sqlite3');
const db = sqlite3('./src/games.db');
db.pragma('journal_mode = WAL');

// Encryption
const bcrypt = require('bcrypt');
const salt_rounds = 10;

// Adds a user to the database, with checks if it is a valid name and stuff
function new_user(username, password) {
    // Check length
    if (username.length < 4 || username.length > 32)
        return "Username length not valid.";

    if (!password)
        return "You need a password.";

    // Check if another user already has username
    const user_check = check_username(username);

    if (user_check != -1)
        return "Username taken.";

    // Hash password
    const hash = bcrypt.hashSync(password, salt_rounds);

    // Insert new user
    const add_user = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    let user = add_user.run(username, hash);

    if (user.changes == 0)
        return "Database error. Please try again.";

    return 0;
}

function new_group() {
    return 0;
}

function new_message() {
    return 0;
}

function check_username(username) {
    // If a user is found returns the users id, if not returns -1
    const user_query = db.prepare("SELECT * FROM users WHERE username = ?");
    let user = user_query.all(username);

    console.log("Finding userid of user " + username);

    if (user[0])
        return user[0].id;

    return -1;
}

function get_user_info(id) {
    // Check if another user already has username
    const user_query = db.prepare("SELECT * FROM users WHERE id = ?");
    let user = user_query.all(id);

    if (user[0])
        return user[0];

    return -1;
}

function get_group_members() {
    return 0;
}

function get_messages() {
    return 0;
}

function delete_user(username) {
    // Get user
    const username_check = db.prepare("SELECT id FROM users WHERE username = ?");
    let user_check = username_check.all(username);

    if (user_check.length == 0)
        return "Could not find user " + username + " in the database.";

    // REMOVE THEM
    const remove_user = db.prepare("DELETE FROM users WHERE id = ?");
    let result = remove_user.run(user_check[0].id);

    if (result.changes == 0)
        return "Database error. Please try again."

    return 0;
}

module.exports = {
    new_user,
    new_group,
    new_message,
    check_username,
    get_user_info,
    get_group_members,
    get_messages,
    delete_user
}
