import React from 'react';
import PromotionBox from './PromotionBox/PromotionBox'
import './Popup.css'

const Popup = ({children}) => {



    return <div className="popup">
        <PromotionBox></PromotionBox>
    </div>
}

export default Popup