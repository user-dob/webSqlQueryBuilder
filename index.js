import 'babel-polyfill'

import { Command, QueryBuilder, Fixture, Schema, schema, Model } from './src'

const db = openDatabase('Test', '1.0', 'Test DB', 2 * 1024 * 1024)
let command = new Command(db)
let query = new QueryBuilder(command)

//new Fixture(command)

//query
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
//    .all()
//    .then(data => {
//        console.log(data)
//    })
//
//let user = new Schema('user', {
//    id: Schema.Integer.PK.AutoIncrement,
//    name: Schema.String,
//    foo: Schema.String.NotNull,
//    bar: 'Char(10)'
//})
//
//console.log( user.toString() )
//
//let post = new Schema('post')

class Post extends Model {

    @schema(Schema.Integer.PK.AutoIncrement)
    id() {}

    @schema(Schema.String)
    name() {}

    @schema(Schema.ManyToOne(User, 'user.id=post.user_id'))
    user() {}

}

class User extends Model {

    @schema(Schema.Integer.PK.AutoIncrement)
    id() {}

    @schema(Schema.String)
    name() {}

    @schema(Schema.OneToMany(Post, 'user.id=post.user_id'))
    posts() {}
}

console.log(Schema.getSchemaByModel(Post))