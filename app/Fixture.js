import co from 'co'

function* range(min, max) {
    for(let i=min; i<=max; i++) yield i
}


export default class Fixture {

    constructor(command) {
        this.command = command
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
        const { command } = this

        return Promise.all([
            command.sql('DROP TABLE IF EXISTS user'),
            command.sql('DROP TABLE IF EXISTS post'),
            command.sql('DROP TABLE IF EXISTS user_post'),
            command.sql('DROP TABLE IF EXISTS comment')
        ])
    }

    create() {

        const { command, getRandomInt } = this

        co(function *() {
            yield command.sql('CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY, name TEXT NOT NULL, age INT NOT NULL)')
            console.log('create table user')

            yield command.insert('user', [...range(1, 100)].map(i => {
                return {name: `name ${i}`, age: i}
            }))
            console.log('filled table user')
        })

        co(function *() {
            yield command.sql('CREATE TABLE IF NOT EXISTS post(id INTEGER PRIMARY KEY, title TEXT NOT NULL, text TEXT NOT NULL)')
            console.log('create table post')

            yield command.insert('post', [...range(1, 100)].map(i => {
                return {title: `post ${i}`, text: `text ${i} text ${i} text ${i} text ${i} text ${i} text ${i}`}
            }))
            console.log('filled table post')
        })

        co(function *() {
            yield command.sql('CREATE TABLE IF NOT EXISTS user_post(id INTEGER PRIMARY KEY, user_id INTEGER, post_id INTEGER)')
            console.log('create table user_post')

            yield command.insert('user_post', [...range(1, 1000)].map(i => {
                return {user_id: getRandomInt(0, 99), post_id: getRandomInt(1, 100)}
            }))
            console.log('filled table user_post')
        })

        co(function *() {
            yield command.sql('CREATE TABLE IF NOT EXISTS comment(id INTEGER PRIMARY KEY, post_id INTEGER, text TEXT NOT NULL)')
            console.log('create table comment')

            yield command.insert('comment', [...range(1, 400)].map(i => {
                return {text: `comment ${i}`, post_id: getRandomInt(1, 100)}
            }))
            console.log('filled table comment')
        })
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}


