export interface Statistics {
    sales: {
        total: number;
        byRegion: {
            region: number;
        };
        monthly: [
            {
                month: string;
                score: number;
            }
        ]
    }
}
