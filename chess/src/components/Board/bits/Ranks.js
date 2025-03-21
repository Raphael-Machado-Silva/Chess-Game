import './Ranks.css'
import { getCharacter } from '../../../helper';

const Ranks = ({ ranks }) => {
    return (
        <div className="ranks">
            {ranks.map((rank) => (
                <span key={rank}>{rank}</span>
            ))}
        </div>
    );
};

export default Ranks;
