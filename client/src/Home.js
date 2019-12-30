import React from 'react';
import './Home.css';

class Home extends React.Component{
    renderHome(){
        const htmls = <div className="page">
             <div className="hero-text display-font">
                <span className="green-text">EXCELLENCE</span> IS NOT AN ACT,
            </div>
            <div className="hero-text2 display-font">
                IT'S A <span className="green-text">HABIT</span>.
            </div>
        <div className="hero-text3 display-font"><span className="green-text">EXCELLENCE</span> <br/>IS NOT AN ACT,<br/> IT'S A <span className="green-text">HABIT</span>.</div>
      </div>;
      return htmls;
    }

    render(){
        return this.renderHome();
    }
}

export default Home;