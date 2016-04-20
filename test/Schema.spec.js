import expect from 'expect'
import Schema from '../src/Schema'

describe('Schema', () => {

    it('Schema.String', () => {
        let schema = new Schema('user', {
            name: Schema.String
        })

        expect(schema.toString()).toEqual('CREATE TABLE user(name TEXT)')
    })

    

})

