import expect from 'expect'
import Schema from '../src/Schema'

describe('Schema', () => {

    it('Schema.Integer', () => {
        let schema = new Schema('user', {
            field: Schema.Integer
        })

        expect(schema.toString()).toEqual('CREATE TABLE user(field INTEGER)')
    })

    it('Schema.Integer.PK', () => {
        let schema = new Schema('user', {
            field: Schema.Integer.PK
        })

        expect(schema.toString()).toEqual('CREATE TABLE user(field INTEGER PRIMARY KEY)')
    })

    it('Schema.Integer.PK.AutoIncrement', () => {
        let schema = new Schema('user', {
            field: Schema.Integer.PK.AutoIncrement
        })

        expect(schema.toString()).toEqual('CREATE TABLE user(field INTEGER PRIMARY KEY AUTOINCREMENT)')
    })

    it('Schema.String', () => {
        let schema = new Schema('user', {
            field: Schema.String
        })

        expect(schema.toString()).toEqual('CREATE TABLE user(field TEXT)')
    })

    it('Schema.String.NotNull', () => {
        let schema = new Schema('user', {
            field: Schema.String.NotNull
        })

        expect(schema.toString()).toEqual('CREATE TABLE user(field TEXT NOT NULL)')
    })

    it('Schema.Real', () => {
        let schema = new Schema('user', {
            field: Schema.Real
        })

        expect(schema.toString()).toEqual('CREATE TABLE user(field REAL)')
    })

    it('Schema.Real', () => {
        let schema = new Schema('user', {
            field: Schema.Real
        })

        expect(schema.toString()).toEqual('CREATE TABLE user(field REAL)')
    })

    it('Schema.Blob', () => {
        let schema = new Schema('user', {
            field: Schema.Blob
        })

        expect(schema.toString()).toEqual('CREATE TABLE user(field BLOB)')
    })

})
