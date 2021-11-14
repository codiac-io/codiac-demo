import { PropertyFilterStrategy } from '../property-filter-strategy/property-filter.strategy';

export class AllFilter<T> implements PropertyFilterStrategy<T> {
    public filter(data: T[]): T[] {
        return data
    }
}