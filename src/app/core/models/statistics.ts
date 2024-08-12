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
    };
    customerSatisfaction: {
        averageScore: number;
        monthlyScores: [
            {
                month: string;
                score: number;
            }
        ];
        byRegion: [
            {
                regionName: string;
                regionScore: number;
            }
        ]
    }
}
