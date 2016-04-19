
const db = new Db('Test', '1.0', 'Test DB', 2 * 1024 * 1024)

//db.sql('CREATE TABLE people(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, shirt TEXT NOT NULL)')

//db.sql('INSERT INTO people (name, shirt) values({name}, {shirt})', {shirt: 'shirt 1', name: 'name 1'})


let query =  db
    .select('id', 'name')
    .from('people')
    .where('name={name} or id in ({ids})', {
        ids: [2,3],
        name: 'name 1'
    })
    .orderBy('id DESC', 'name DESC')
    .limit(2)
    .all()
    .then(data => {
        console.log(data)
    })
