const effectQuery = (substanceName: string): string => {
    return `{
        substances(query: "${substanceName}") {
            name
            effects {
                name
                url
            }
        }
    }`;
};
export default effectQuery;
