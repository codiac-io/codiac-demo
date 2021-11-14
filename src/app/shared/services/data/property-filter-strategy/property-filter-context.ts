import { PropertyFilterStrategy } from './property-filter.strategy';

/**
 * Time View Context defines the interface to switch between the different filtering strategies defined in the TimeView Enum.
 */
export class PropertyFilterContext<T> {
    /**
     * @type {PropertyFilterStrategy} The Context maintains a reference to one of the Strategy
     * objects. 
     */
    private strategy: PropertyFilterStrategy<T>;

    /**
     * Client provides a default strategy.
     */
    constructor(strategy: PropertyFilterStrategy<T>) {
        this.strategy = strategy;
    }

    /**
     * Allows replacing a Strategy object at runtime.
     */
    public setStrategy(strategy: PropertyFilterStrategy<T>) {
        this.strategy = strategy;
    }

    /**
     * The Context delegates some work to the Strategy object instead of
     * implementing multiple versions of the algorithm on its own.
     */
    public filter(bids: T[], propKey: string): T[] {
        return (this.strategy) ? this.strategy.filter(bids, propKey) : bids;
    }
}