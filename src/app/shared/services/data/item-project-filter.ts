
import moment from 'moment';
import { PropertyFilterStrategy } from './property-filter-strategy/property-filter.strategy';

export class ItemProjectFilter<T> implements PropertyFilterStrategy<T> {
    constructor(value: string) {
        this.strategyValue = value;
    }
    private strategyValue: string
    public filter(data: T[], propKey: string): T[] {
        return data.filter(f => (f[propKey] == this.strategyValue) ? true : false)
    }
}