import QueryBuilder from './QueryBuilder'

export default class QueryModelBuilder extends QueryBuilder {

    constructor(command, Model) {
        super(command)

        this.Model = Model
    }

    all() {
        let { Model } = this
        return super.all().then(data => {
            return data.map(item => new Model(item))
        })
    }

}
