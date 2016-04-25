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

//console.log(Schema.getSchemaByModel(Post))

//User.query().select('id', 'name').all().then(data => {
//    console.log(data)
//})

Post.select().limit(10).all().then(data => {
    console.log(data)
})

//co(function *() {
//    let users = User.select().then()
//    let posts = Post.select().where('user_id in ({ids})', [1,2,3]).then()
//
//})





