export default (substanceName: string): string => {
    return `{
        substances(query: "${substanceName}") {
            name
            url
            addictionPotential
            tolerance {
                full
                half
                zero
            }
            roas {
                name
                dose {
                    units
                    threshold
                    heavy
                    common { min max }
                    light { min max }
                    strong { min max }
                }
                duration {
                    afterglow { min max units }
                    comeup { min max units }
                    duration { min max units }
                    offset { min max units }
                    onset { min max units }
                    peak { min max units }
                    total { min max units }
                }
            }
        }
    }`;
};
