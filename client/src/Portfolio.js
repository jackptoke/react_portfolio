import React from 'react';
import './Portfolio.css';
import mern_image from './images/react.jpg';
import rails_image from './images/ruby_on_rails.jpg';
import sudoku_image from './images/sudoku.png';

const projects = [
    {
        title: "REACT and Node.JS", 
        content: <div>This portfolio website is built using the MERN Stack technologies - MongoDB, Express.JS, React and Node.JS.
    <ol className='green-text'>
        <li><strong>REACT</strong></li>
        <li><strong>Node.JS</strong></li>
        <li><strong>Javascript</strong></li>
        <li><strong>ZEIT Now</strong></li>
        <li><strong>Responsive CSS</strong></li>
    </ol>
    </div>, 
        image: mern_image,
        url: 'https://profile.jackptoke.now.sh/'
    },
    {
        title: "Ruby on Rails",
        content: <div>Qonnex is a website connecting interpreters and their clients.  The following are the technologies being used to create it:
        <ol className='green-text'>
            <li><strong>Ruby on Rails</strong></li>
            <li><strong>Heroku</strong></li>
            <li><strong>Stripe Payment API</strong></li>
            <li><strong>PostgreSQL Database and SQL</strong></li>
        </ol>
        </div>,
        image: rails_image,
        url: 'https://nameless-tor-35350.herokuapp.com'
    },
    {
        title: "Sudoku Master",
        content: <div>Sudoku Master is a simple terminal app written in Ruby to solve Sudoku problems.  The purpose of the project is to illustrate the programmer's understanding of:
        <ol className='green-text'>
            <li><strong>Ruby programming language</strong></li>
            <li><strong>Array</strong></li>
            <li><strong>Control structures</strong></li>
            <li><strong>And general ability to think and solve problems</strong></li>
        </ol>
        </div>,
        image: sudoku_image,
        url: 'https://github.com/jackptoke/sudoku'
    }
];

class Portfolio extends React.Component{
    state = {
        right_arrow: "arrows",
        left_arrow: "arrows",
        project_number: 0
    };

    toggleArrow = (e) => {
        if(e.target.className === "fas fa-arrow-right arrows"){
            this.setState({right_arrow: "arrows-toggle"});
        }
        else if(e.target.className === "fas fa-arrow-right arrows-toggle"){
            this.setState({right_arrow: "arrows"});
        }else if(e.target.className === "fas fa-arrow-left arrows"){
            this.setState({left_arrow: "arrows-toggle"});
        }
        else if(e.target.className === "fas fa-arrow-left arrows-toggle"){
            this.setState({left_arrow: "arrows"});
        }
    }

    next = () => {
        const {project_number} = this.state;
        if (project_number < projects.length - 1){
            this.setState({project_number: project_number + 1});
        }
        else{
            this.setState({project_number: 0});
        }
    }

    previous = () => {
        const {project_number} = this.state;
        if (project_number > 0){
            this.setState({project_number: project_number - 1});
        }
        else{
            this.setState({project_number: projects.length - 1});
        }
    }

    renderPortfolio = () => {
        const {project_number} = this.state;
        return <div className="portfolio-page">
            <h1 className="portfolio-title green-text">
                {projects[project_number]["title"]}
            </h1>
            <div className="portfolio-container">
                <div className="portfolio-image-container">
                    <img className="portfolio-image" src={projects[project_number]["image"]} alt="Mern stack" />
                </div>
                <div className="portfolio-text">
                    {projects[project_number]["content"]}
                    <br/>
                    <a href={`${projects[project_number]["url"]}`} target='_blank' rel="noopener noreferrer" >Click me</a>
                </div>
            </div>
            <div className="portfolio-arrows"> 
                <div className="right-arrow-container"><i className={`fas fa-arrow-right ${this.state.right_arrow}`} onMouseOver={this.toggleArrow} onMouseOut={this.toggleArrow} onClick={this.next}></i></div>
                <div className="left-arrow-container"><i className={`fas fa-arrow-left ${this.state.left_arrow}`}  onMouseOver={this.toggleArrow} onMouseLeave={this.toggleArrow} onClick={this.previous}></i></div>
            </div>
        </div>;
    }

    render(){
        return this.renderPortfolio();
    }
}

export default Portfolio;