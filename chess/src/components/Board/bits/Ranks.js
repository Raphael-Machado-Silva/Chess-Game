import './Ranks.css'
const Ranks = ({ ranks }) => {
    return (
        <div className="ranks">
            {ranks.map((rank) => (
                <span key={rank} className="ranks">{rank}</span>
            ))}
        </div>
    );
};

export default Ranks;
