import React from 'react';
import './PortfolioCard.css';
import axios from 'axios';

class PortfolioCard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            right_arrow: "arrows",
            left_arrow: "arrows",
            project_number: 0,
            projects: null
        };
    }

    async componentDidMount(){
        
        await axios.get('api/portfolios')
        .then((response)=>{
            this.setState({projects: response.data });
            // this.viewed();
        }).catch((err)=> console.error("Here is the problem: " + err)
        );
    }

    clicked = () => {
        const {project_number, projects} = this.state;
        //Open the link in a new window
        window.open(projects[project_number]['url'], "_blank");

        let params = { 
            title: this.state.projects[project_number]['title']
        };

        axios.put('api/clicked', params).then(res => {
            if(res.data){
                // let projects = [...this.state.projects];
                let project = {...projects[project_number]};
                project['clicks'] = project['clicks'] + res.data['modifiedCount'];
                projects[this.state.project_number] = project;
                this.setState({projects: projects});
                console.log(res.data);
            }
        });
    }

    viewed = () => {
        const {project_number, projects} = this.state;
        //Open the link in a new window

        let params = { 
            title: this.state.projects[project_number]['title']
        };

        axios.put('api/viewed', params).then(res => {
            if(res.data){
                let project = {...projects[project_number]};
                project['views'] = project['views'] + res.data['modifiedCount'];
                projects[project_number] = project;
                this.setState({projects: projects});
                console.log(res.data);
            }
        });
    }

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
        const {project_number, projects} = this.state;
        if (project_number < projects.length - 1){
            this.setState({project_number: project_number + 1});
        }
        else{
            this.setState({project_number: 0});
        }
        this.viewed();
    }

    previous = () => {
        const {project_number, projects} = this.state;
        if (project_number > 0){
            this.setState({project_number: project_number - 1});
        }
        else{
            this.setState({project_number: projects.length - 1});
        }
        this.viewed();
    }

    renderPortfolioCard(){
        const {project_number, projects} = this.state;
        const techs = [];
        const techTexts = [];
        let htmlOutput;
        if(projects == null){
            htmlOutput = <div className="portfolio-page2"><div className="p-container">
            <div className="lds-hourglass"></div>
            </div></div>
        }
        else{
        projects[project_number]["techs"].forEach((tech, i)=>{ techs.push(<div className="p-col6 p-action-btn" key={i} ><i className={tech}></i>
        </div>);
        });
        projects[project_number]["tech-texts"].forEach((text, i)=>{ techTexts.push(<li key={i} >{text}</li>);
        });

        htmlOutput = <div className="portfolio-page2"><div className="p-container">
            <div className="p-cellphone-container">    
                <div className="portfolio">       
                <img className={`portfolio-img`} src={require(`./images/${projects[project_number]["image"]}`)} alt="portfolio project" />
                <div className="p-text-movie-cont">
                    <div className="p-mr-grid">
                    <div className="p-col1">
                        <h1>{ projects[project_number]["title"] }</h1>
                        <ul className="portfolio-gen">
                        {techTexts}
                        </ul>
                    </div>
                    </div>
                    <div className="p-mr-grid summary-row">
                    <div className="p-col2">
                        <h5>DESCRIPTION</h5>
                    </div>
                    <div className="p-col2">
                        <ul className="portfolio-likes">
                        <li><i className="fas fa-eye"></i>{ projects[project_number]["views"] }</li>
                        <li><i className="fas fa-mouse-pointer"></i>{ projects[project_number]["clicks"] }</li>
                        </ul>
                    </div>
                    </div>
                    <div className="p-mr-grid">
                    <div className="p-col1">
                        <p className="portfolio-description">{ projects[project_number]["content"] }</p>
                    </div>
                    </div>
                    <div className="p-mr-grid actors-row">
                    <div className="p-col1">
                        <p className="portfolio-url">
                            <button
                        onClick={this.clicked} >Click Me</button></p>
                    </div>
                    {techs}
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div className="portfolio-arrows"> 
                <div className="right-arrow-container"><i className={`fas fa-arrow-right ${this.state.right_arrow}`} onMouseOver={this.toggleArrow} onMouseOut={this.toggleArrow} onClick={this.next}></i></div>
                <div className="left-arrow-container"><i className={`fas fa-arrow-left ${this.state.left_arrow}`}  onMouseOver={this.toggleArrow} onMouseLeave={this.toggleArrow} onClick={this.previous}></i></div>
        </div>
    </div>;
    }
    return htmlOutput;
    }
    render(){
        return this.renderPortfolioCard();
    }
}

export default PortfolioCard;