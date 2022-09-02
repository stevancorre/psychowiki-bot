export class Dictionary<TKey extends string | number | symbol, TValue> {
    public constructor(protected readonly source: { [key in TKey]?: TValue } = {}) {}

    add(key: TKey, value: TValue): void {
        // if we already have a key with a value, throw an error because each key has to be unique
        if (this.source[key] !== undefined) {
            throw `Dictionary already contains a value for key \`${String(key)}\`: \`${value}\``;
        }

        this.source[key] = value;
    }

    getValue(key: TKey): TValue | undefined {
        return this.source[key];
    }

    tryGetValue(key: TKey, defaultValue: TValue): TValue {
        const value: TValue | undefined = this.source[key];
        if (value === undefined) {
            return defaultValue;
        }

        return value;
    }
}