import 'babel-polyfill'

import { Db, Fixture, Schema, schema, Model } from './src'

Db.open('Test', '1.0', 'Test DB', 2 * 1024 * 1024)

//new Fixture(command)

//Db.query()
//    .select('u.id, u.name, count(p.id) as count')
//    .from('user as u')
//    .join('user_post as up', 'u.id=up.user_id')
//    .leftJoin('post as p', 'p.id=up.post_id')
//    .where('age > {age}', {
//        age: 25
//    })
//    .groupBy('p.id')
//    .having('count > {count}', {
//        count: 10
//    })
//    .limit(10)
//    .then(data => {
//        console.log(data)
//    })


class Post extends Model {

    @schema(Schema.Integer.PK.AutoIncrement)
    id() {}

    @schema(Schema.String)
    name() {}

    @schema(Schema.ManyToOne(User))
    user() {}

    @schema(Schema.OneToMany(Comment))
    comments() {}

}

class User extends Model {

    @schema(Schema.Integer.PK.AutoIncrement)
    id() {}

    @schema(Schema.String)
    name() {}

    @schema(Schema.Integer)
    age() {}

    @schema(Schema.OneToMany(Post))
    posts() {}
}

class Comment extends Model {

    @schema(Schema.Integer.PK.AutoIncrement)
    id() {}

    @schema(Schema.String)
    text() {}

    @schema(Schema.ManyToOne(Post))
    post() {}
}


//Db.command.execute('SELECT * FROM user WHERE age > {age} LIMIT 10', {age: 10}).then(data => {
//    console.log(data)
//})

//Db.command.execute(
//    [
//        ['SELECT * FROM user WHERE age > {age} LIMIT 10', {age: 10}],
//        ['SELECT * FROM user WHERE age > {age} LIMIT 10', {age: 10}]
//    ]
//).then(data => {
//    console.log(data)
//})


//Db.command.execute(function *() {
//
//    let r1 = yield ['SELECT * FROM user WHERE age > {age} LIMIT 10', {age: 10}]
//    let r2 = yield ['SELECT * FROM user WHERE age > {age} LIMIT 10', {age: 10}]
//
//    return r2
//
//}).then(data => {
//    console.log(data)
//}).catch(() => {
//    console.log('}).catch(() => {')
//})


//console.log(Schema.getSchemaByModel(Post))

//Post.select().limit(10).all().then(data => {
//    console.log(data)
//})

Db.command.execute(function *() {

    let users = yield User.select().limit(10)
    let posts = yield Post.select().where('id in ({ids})', {ids: [1,2,3]})
    //let posts = yield Post.select().where('user_id in ({ids})', {ids: users.ids}).all()

    console.log(users.rows)
    console.log(posts.rows)
})