const SalesChart = () => {
    // Sample data points for the chart
    const primaryData = [
        { x: 50, y: 180 },
        { x: 120, y: 160 },
        { x: 190, y: 140 },
        { x: 260, y: 180 },
        { x: 330, y: 120 },
        { x: 400, y: 80 },
        { x: 470, y: 100 },
        { x: 540, y: 60 },
    ];

    const secondaryData = [
        { x: 50, y: 200 },
        { x: 120, y: 210 },
        { x: 190, y: 180 },
        { x: 260, y: 220 },
        { x: 330, y: 200 },
        { x: 400, y: 160 },
        { x: 470, y: 180 },
        { x: 540, y: 140 },
    ];

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const createPath = (data: { x: number; y: number }[]) => {
        return data.map((point, index) =>
            `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
        ).join(' ');
    };

    const createAreaPath = (data: { x: number; y: number }[]) => {
        const linePath = createPath(data);
        return `${linePath} L ${data[data.length - 1].x} 250 L ${data[0].x} 250 Z`;
    };

    return (
        <div className="chart-card">
            <div className="chart-card-header">
                <div className="chart-title-section">
                    <h3>Overview</h3>
                    <h2>Sales value</h2>
                </div>
                <div className="date-selector">
                    📅 May 1, 2023 ▼
                </div>
            </div>

            <div className="chart-legend">
                <div className="legend-item">
                    <span className="legend-dot primary"></span>
                    Total setup fee for active subscribers
                </div>
                <div className="legend-item">
                    <span className="legend-dot secondary"></span>
                    Subscription sales
                </div>
            </div>

            <div className="chart-container">
                <svg className="svg-chart" viewBox="0 0 600 280" preserveAspectRatio="xMidYMid meet">
                    {/* Grid lines */}
                    <line x1="50" y1="50" x2="540" y2="50" className="chart-grid-line" />
                    <line x1="50" y1="100" x2="540" y2="100" className="chart-grid-line" />
                    <line x1="50" y1="150" x2="540" y2="150" className="chart-grid-line" />
                    <line x1="50" y1="200" x2="540" y2="200" className="chart-grid-line" />

                    {/* Y-axis labels */}
                    <text x="30" y="55" className="chart-axis-label" textAnchor="end">5</text>
                    <text x="30" y="105" className="chart-axis-label" textAnchor="end">4</text>
                    <text x="30" y="155" className="chart-axis-label" textAnchor="end">3</text>
                    <text x="30" y="205" className="chart-axis-label" textAnchor="end">2</text>
                    <text x="30" y="250" className="chart-axis-label" textAnchor="end">0</text>

                    {/* X-axis labels */}
                    {months.map((month, index) => (
                        <text
                            key={month}
                            x={50 + (index * 80)}
                            y="270"
                            className="chart-axis-label"
                            textAnchor="middle"
                        >
                            {month.slice(0, 3)}
                        </text>
                    ))}

                    {/* Area fills */}
                    <path d={createAreaPath(secondaryData)} className="chart-area chart-area-secondary" />
                    <path d={createAreaPath(primaryData)} className="chart-area chart-area-primary" />

                    {/* Lines */}
                    <path d={createPath(secondaryData)} className="chart-line chart-line-secondary" />
                    <path d={createPath(primaryData)} className="chart-line chart-line-primary" />

                    {/* Data points */}
                    {primaryData.map((point, index) => (
                        <circle
                            key={`primary-${index}`}
                            cx={point.x}
                            cy={point.y}
                            r="5"
                            className="chart-point chart-point-primary"
                        />
                    ))}
                    {secondaryData.map((point, index) => (
                        <circle
                            key={`secondary-${index}`}
                            cx={point.x}
                            cy={point.y}
                            r="5"
                            className="chart-point chart-point-secondary"
                        />
                    ))}
                </svg>
            </div>
        </div>
    );
};

export default SalesChart;
