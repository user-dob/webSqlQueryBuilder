import co from 'co'

function* range(min, max) {
    for(let i=min; i<=max; i++) yield i
}


export default class Fixture {

    constructor(db) {
        this.db = db
        this.run()
    }

    run() {
        let self = this

        co(function *() {
            yield self.drop()
            self.create()
        })
    }

    drop() {
        const { db } = this

        return Promise.all([
            db.sql('DROP TABLE IF EXISTS user'),
            db.sql('DROP TABLE IF EXISTS post'),
            db.sql('DROP TABLE IF EXISTS user_post'),
            db.sql('DROP TABLE IF EXISTS comment')
        ])
    }

    create() {

        const { db, getRandomInt } = this

        co(function *() {
            yield db.sql('CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY ASC, name TEXT NOT NULL, age INT NOT NULL)')
            console.log('create table user')

            yield [...range(1, 100)].map(i => db.insert('user', {age: i, name: `name ${i}`}))
            console.log('filled table user')
        })

        co(function *() {
            yield db.sql('CREATE TABLE IF NOT EXISTS post(id INTEGER PRIMARY KEY ASC, title TEXT NOT NULL, text TEXT NOT NULL)')
            console.log('create table post')

            yield [...range(1, 100)].map(i => db.insert('post', {title: `post ${i}`, text: `text ${i} text ${i} text ${i} text ${i} text ${i} text ${i}`}))
            console.log('filled table post')
        })

        co(function *() {
            yield db.sql('CREATE TABLE IF NOT EXISTS user_post(id INTEGER PRIMARY KEY ASC, user_id INTEGER, post_id INTEGER)')
            console.log('create table user_post')

            yield [...range(1, 1000)].map(i => db.insert('user_post', {user_id: getRandomInt(0, 99), post_id: getRandomInt(1, 100)}))
            console.log('filled table user_post')
        })

        co(function *() {
            yield db.sql('CREATE TABLE IF NOT EXISTS comment(id INTEGER PRIMARY KEY ASC, post_id INTEGER, text TEXT NOT NULL)')
            console.log('create table comment')

            yield [...range(1, 400)].map(i => db.insert('comment', {text: `comment ${i}`, post_id: getRandomInt(1, 100)}))
            console.log('filled table comment')
        })
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}


