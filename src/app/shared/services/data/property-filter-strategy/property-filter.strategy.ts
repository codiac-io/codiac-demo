/**
 * The Strategy interface declares operations common to all supported versions
 * of some algorithm.
 *
 * The Context uses this interface to call the algorithm defined by Concrete
 * Strategies.
 */
 export interface PropertyFilterStrategy<T> {
    filter(data: T[], propKey: string): T[];
}