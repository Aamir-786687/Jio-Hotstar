import "./channel.css";

import ch1 from "../../assets/channel1.jpg";
import ch2 from "../../assets/channel2.png";
import ch3 from "../../assets/channel3.jpg";
import ch4 from "../../assets/channel4.jpg";
import ch5 from "../../assets/channel5.jpg";
import ch6 from "../../assets/channel6.jpg";
import ch7 from "../../assets/channel7.jpg";

const Channel = () => { 
  return (
    <>
      <div className="channels">
        <img src={ch2} alt="Channel2" />  
        <img src={ch6} alt="Channel6" />
        <img src={ch7} alt="Channel7" />
        <img src={ch1} alt="Channel1" />
        <img src={ch5} alt="Channel5" />
        <img src={ch3} alt="Channel3" />
        <img src={ch4} alt="Channel4" />
        <img src={ch6} alt="Channel6" />
        <img src={ch1} alt="Channel1" />
        
      </div>
    </>
  );
};

export default Channel;
