interface StatCardProps {
    icon: string;
    value: string | number;
    label: string;
    iconColor?: 'primary' | 'secondary' | 'success' | 'info';
    activeCount?: number;
    inactiveCount?: number;
    showSparkline?: boolean;
}

const StatCard = ({
    icon,
    value,
    label,
    iconColor = 'primary',
    activeCount,
    inactiveCount,
    showSparkline = true,
}: StatCardProps) => {
    // Random heights for sparkline visualization
    const sparklineHeights = [12, 20, 16, 28, 22, 35, 30, 25, 32, 38];

    return (
        <div className="stat-card">
            <div className="stat-card-header">
                <div className={`stat-icon ${iconColor}`}>
                    {icon}
                </div>
            </div>

            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>

            {(activeCount !== undefined || showSparkline) && (
                <div className="stat-footer">
                    {activeCount !== undefined && (
                        <div className="stat-meta">
                            <span className="stat-meta-item">Active: <span>{activeCount}</span></span>
                            <span className="stat-meta-item">Inactive: <span>{inactiveCount || 0}</span></span>
                        </div>
                    )}

                    {showSparkline && (
                        <div className="sparkline">
                            {sparklineHeights.map((height, index) => (
                                <div
                                    key={index}
                                    className="sparkline-bar"
                                    style={{ height: `${height}px` }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default StatCard;
