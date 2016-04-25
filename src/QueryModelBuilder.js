import QueryBuilder from './QueryBuilder'

export default class QueryModelBuilder extends QueryBuilder {

    constructor(command, Model) {
        super(command)
        Object.assign(this, { Model })
    }

    then(cb) {
        let { Model } = this
        return super.then(data => {
            return data.map(item => new Model(item))
        }).then(cb)
    }

}
