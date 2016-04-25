import 'babel-polyfill'

import { Db, Fixture, Schema, schema, Model } from './src'

Db.open('Test', '1.0', 'Test DB', 2 * 1024 * 1024)

//new Fixture(command)

//Db.query
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

    @schema(Schema.Integer)
    age() {}

    @schema(Schema.OneToMany(Post, 'user.id=post.user_id'))
    posts() {}
}

console.log(Schema.getSchemaByModel(Post))

User.query().all().then(data => {
    console.log(data)
})
