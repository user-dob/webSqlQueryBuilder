import 'babel-polyfill'

import QueryBuilder from './QueryBuilder'
import Command from './Command'
import Fixture from './Fixture'
import Schema from './Schema'



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

let user = new Schema('user', {
    id: Schema.Integer.PK.AutoIncrement,
    name: Schema.String,
    foo: Schema.String.NotNull,
    bar: 'Char(10)'
})

console.log( user.toString() )

let post = new Schema('post')

























