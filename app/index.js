
const db = new Db('Test', '1.0', 'Test DB', 2 * 1024 * 1024)

let query =  db
    .select('u.id, u.name, count(p.id) as count')
    .from('user as u')
    .join('user_post as up', 'u.id=up.user_id')
    .leftJoin('post as p', 'p.id=up.post_id')
    .where('age > {age}', {
        age: 25
    })
    .groupBy('p.id')
    .having('count > {count}', {
        count: 10
    })
    .limit(10)
    .all()
    .then(data => {
        console.log(data)
    })
