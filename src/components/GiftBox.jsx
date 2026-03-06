import { motion } from 'framer-motion';

const GiftBox = ({ isOpen, onOpen }) => {
    return (
        <div className="gift-container" onClick={onOpen}>
            <div className={`gift-box ${isOpen ? 'open' : ''}`}>

                {/* The lid which opens */}
                <div className={`box-face box-top ${isOpen ? 'gift-lid-open' : ''}`}>
                    <div className="ribbon-center"></div>
                </div>

                <div className="box-face box-front"></div>
                <div className="box-face box-back"></div>
                <div className="box-face box-right"></div>
                <div className="box-face box-left"></div>
                <div className="box-face box-bottom"></div>
            </div>
        </div>
    );
};

export default GiftBox;
