import React from 'react';
import axios from 'axios';

class PTest extends React.Component{

    async renderPTest(){
        axios.get('http://localhost:5000/api/portfolios')
        .then((req, response)=>{
            response.data
        })
        return <div><h1>Thi is PTest</h1></div>
    }

    render(){
        return this.renderPTest();
    }
}