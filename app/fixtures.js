
const db = new Db('Test', '1.0', 'Test DB', 2 * 1024 * 1024)

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

db.sql('DROP TABLE user')
db.sql('DROP TABLE post')
db.sql('DROP TABLE user_post')
db.sql('DROP TABLE comment')


db.sql('CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY ASC, name TEXT NOT NULL, age INT NOT NULL)')
for (let i=0; i<100; i++) {
    db.sql('INSERT INTO user (name, age) values({name}, {age})', {age: i, name: `name ${i}`})
}

db.sql('CREATE TABLE IF NOT EXISTS post(id INTEGER PRIMARY KEY ASC, title TEXT NOT NULL, text TEXT NOT NULL)')
for (let i=0; i<100; i++) {
    db.sql('INSERT INTO post (title, text) values({title}, {text})', {title: `post ${i}`, text: `text ${i} text ${i} text ${i} text ${i} text ${i} text ${i}`})
}


db.sql('CREATE TABLE IF NOT EXISTS user_post(id INTEGER PRIMARY KEY ASC, user_id INTEGER, post_id INTEGER)')
for (let i=0; i<1000; i++) {
    db.sql('INSERT INTO user_post (user_id, post_id) values({user_id}, {post_id})', {user_id: getRandomInt(0, 99), post_id: getRandomInt(0, 99)})
}

db.sql('CREATE TABLE IF NOT EXISTS comment(id INTEGER PRIMARY KEY ASC, post_id INTEGER, text TEXT NOT NULL)')
for (let i=0; i<300; i++) {
    db.sql('INSERT INTO comment (post_id, text) values({post_id}, {text})', {text: `comment ${i}`, post_id: getRandomInt(0, 99)})
}











