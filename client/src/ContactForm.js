import React from 'react';
import './ContactForm.css';
import emailjs from 'emailjs-com';
import Schema from 'validate';
import axios from 'axios';

class ContactForm extends React.Component{
    state = { 
        subject: '',
        message: '', 
        name: '', 
        email: '',
        mobile: '',
        greeting: 'Get in touch',
        v_subject: '',
        v_message: '',
        v_name: '',
        v_email: '',
        v_mobile: ''
    };

    renderContactForm(){
        const {subject, message, name, email, mobile, v_name, v_subject, v_message, v_email, v_mobile } = this.state;
        return <form className="contacts-mailing"  onSubmit={ this.sendEmail }>
    	<h2 className="green-text">{this.state.greeting}</h2>
    	<div className="mail-form-inputs">

            <label className="form-label">Name: <span className="error">{v_name}</span></label>
            <input id="name" 
                className="subject-email" 
                type="text" 
                name="from_name"
                value={name}
                placeholder="Re: Enter your name" 
                onChange={ this.updateName } />
            
            <label className="form-label">Email: <span className="error">{v_email}</span></label>
            <input id="email" 
                className="subject-email" 
                type="email" 
                name="reply_to"
                value={email}
                placeholder="Re: Enter your email address" 
                onChange={ this.updateEmail } />

            <label className="form-label">Mobile: <span className="error">{v_mobile}</span></label>
            <input id="mobile" 
                className="subject-email" 
                type="text"
                name="mobile"
                value={mobile}
                placeholder="Re: Enter your mobile number" 
                onChange={ this.updateMobile } />

            <label className="form-label">Subject: <span className="error">{v_subject}</span></label>
            <input id="subject" 
                className="subject-email" 
                type="text"
                name="message_subject"
                value={subject}
                placeholder="Re: Enter a subject of your message" 
                onChange={ this.updateSubject }/>

            <label className="form-label">Message: <span className="error">{v_message}</span></label>
            <textarea
                id="content-email"
                className="content-email"
                name="message_html"
                value={message}
                onChange={ this.updateMessage }
                
                placeholder="Please, leave your message here"
                required
            />
    	</div>
    	<input type="submit" value="Send" className="btn btn--submit" />
  	</form>;
    }

    updateSubject = (event) => {
        this.setState({subject: event.target.value});
    }

    updateMessage = (event) => {
        this.setState({message: event.target.value})
    }

    updateName = (event) => {
        this.setState({name: event.target.value});
    }

    updateMobile = (event) => {
        this.setState({mobile: event.target.value});
    }

    updateEmail = (event) => {
        this.setState({email: event.target.value});
    }

    saveContact = (contactObject) => {
        axios.post('/api/contact', contactObject)
        .then(res => {
            if(res.statusText == 'OK'){
                console.log("Contact saved.");
            }
            else{
                console.error("Failed to save the contact." + res.status);
            }
        })
    }
    
    sendEmail = (e) => {
        e.preventDefault();
        const templateId = 'template_VHZeCF2g_clone';
        const userId = 'user_8lrPnGN4UDwIWyAtg9oKT';
        const serviceId = 'jackptoke@gmail.com'
        // const {message, name, email, mobile, subject} = this.state;
        const {name, mobile, email, subject, message} = this.state;
        const email_schema = new Schema({
            name: {
                type: String,
                required: true,
                length: { min: 3, max: 40 }
            },
            mobile: {
                type: String,
                required: true,
                match: /^[0-9]+$/,
                length: { min: 10, max: 10 }
            },
            email: {
                type: String,
                required: true,
                match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
            },
            subject: {
                type: String,
                required: true,
                length: { min: 3, max: 100 }
            },
            message: {
                type: String,
                required: true,
                length: { min: 5, max: 1000 }
            }
        });
        const errors = email_schema.validate({name, mobile, email, subject, message});
        
        if(errors.length === 0 || errors === null ){
            
        emailjs.sendForm(
            serviceId, templateId, e.target, userId
            ).then(res => {
              
              this.setState({greeting: `Thank you for getting in touch, ${name}.  I'll get to back to you soon.`});

              this.resetInputField();
              this.resetValidationMessage();
              this.saveContact({name, mobile, email, subject, message});
            })
            // Handle errors here however you like, or use a React error boundary
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err));
        }
        else{
            this.resetValidationMessage();
            for(let error of errors){
                this.setState({[`v_${error.path}`]: error.message});
            }
            
        }
    }

    resetInputField = () => {
        this.setState({subject: ''});
        this.setState({message: ''});
        this.setState({email: ''});
        this.setState({name: ''});
        this.setState({mobile: ''});
    }
    resetValidationMessage = () => {
        this.setState({v_email: ''});
        this.setState({v_mobile: ''});
        this.setState({v_name: ''});
        this.setState({v_subject: ''});
        this.setState({v_message: ''});
    }

    render(){
        return this.renderContactForm();
    }

}

export default ContactForm;