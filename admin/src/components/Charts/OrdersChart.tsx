const OrdersChart = () => {
    // Sample data for multiple lines
    const lines = [
        {
            color: 'var(--primary)',
            data: [
                { x: 30, y: 100 },
                { x: 60, y: 80 },
                { x: 90, y: 90 },
                { x: 120, y: 60 },
                { x: 150, y: 50 },
                { x: 180, y: 55 },
            ],
        },
        {
            color: 'var(--gray-400)',
            data: [
                { x: 30, y: 120 },
                { x: 60, y: 110 },
                { x: 90, y: 105 },
                { x: 120, y: 95 },
                { x: 150, y: 85 },
                { x: 180, y: 80 },
            ],
        },
        {
            color: 'var(--secondary)',
            data: [
                { x: 30, y: 140 },
                { x: 60, y: 130 },
                { x: 90, y: 120 },
                { x: 120, y: 110 },
                { x: 150, y: 100 },
                { x: 180, y: 95 },
            ],
        },
    ];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    const createPath = (data: { x: number; y: number }[]) => {
        return data.map((point, index) =>
            `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
        ).join(' ');
    };

    return (
        <div className="order-sales-card">
            <div className="order-sales-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h4>Order sales</h4>
                        <div className="order-sales-value">
                            <h2>₹10,090.34</h2>
                            <span className="trend-badge positive">
                                ↑ +5.1% this week
                            </span>
                        </div>
                    </div>
                    <div className="date-selector">
                        📅 May 1, 2023 ▼
                    </div>
                </div>
            </div>

            <div style={{ height: '180px' }}>
                <svg className="svg-chart" viewBox="0 0 220 180" preserveAspectRatio="xMidYMid meet">
                    {/* Grid lines */}
                    <line x1="30" y1="40" x2="190" y2="40" className="chart-grid-line" />
                    <line x1="30" y1="80" x2="190" y2="80" className="chart-grid-line" />
                    <line x1="30" y1="120" x2="190" y2="120" className="chart-grid-line" />

                    {/* Y-axis labels */}
                    <text x="20" y="45" className="chart-axis-label" textAnchor="end">60k</text>
                    <text x="20" y="85" className="chart-axis-label" textAnchor="end">40k</text>
                    <text x="20" y="125" className="chart-axis-label" textAnchor="end">20k</text>
                    <text x="20" y="160" className="chart-axis-label" textAnchor="end">0</text>

                    {/* X-axis labels */}
                    {months.map((month, index) => (
                        <text
                            key={month}
                            x={30 + (index * 32)}
                            y="175"
                            className="chart-axis-label"
                            textAnchor="middle"
                        >
                            {month}
                        </text>
                    ))}

                    {/* Lines */}
                    {lines.map((line, lineIndex) => (
                        <path
                            key={lineIndex}
                            d={createPath(line.data)}
                            fill="none"
                            stroke={line.color}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    ))}

                    {/* Highlight point on primary line */}
                    <circle
                        cx={120}
                        cy={60}
                        r="6"
                        fill="var(--white)"
                        stroke="var(--primary)"
                        strokeWidth="3"
                    />
                </svg>
            </div>
        </div>
    );
};

export default OrdersChart;
