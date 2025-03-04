const Ranks = ({ ranks }) => {
    return (
        <div className="ranks">
            {ranks.map((rank) => (
                <div key={rank} className="rank">{rank}</div>
            ))}
        </div>
    );
};

export default Ranks;
