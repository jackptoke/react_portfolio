import React from 'react';
import './About.css';
import profile_img from './images/jack-profile4.jpg';

class About extends React.Component{
    renderAbout(){
        return <div className="about-page">
            <div className="about-container">
                <img className="profile_img" src={profile_img} alt="Jack's Profile Pic" />
                <h1 className="about-title green-text">About Me</h1>
                <div className="about-text">
                My name is Jack Toke.  I am currently a student at the <span className="green-text"><strong>Coder Academy</strong></span>. My goal is to become a Full Stack Javascript and Python Engineer.
                <br/><br/>
                I'm proficient in <strong>Ruby on Rails</strong>, <strong>Javascript</strong>, <strong>Node.Js</strong>, <strong>Express.Js</strong>, <strong>React</strong> and <strong>Python</strong>.  I've worked with SQLite, PostgreSQL, MongoDB and MySQL databases.  I am also well-versed with AWS, Heroku, Zeit Now and GitHub.
                <br/><br/>
                I'm highly responsible and focused.  My problem solving skills are second to none.  If you think I could add value to your team, please, drop me a message.  I will be very happy to get to know you and learn more about the project you are working on.
                </div>
            </div>
        </div>
    }

    render(){
        return this.renderAbout();
    }
}

export default About;