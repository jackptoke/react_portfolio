import React from 'react';
import './Contacts.css';
import ContactForm from './ContactForm';

class Contact extends React.Component{
    renderContact(){
        return <div className="contact-page">
            <div className="social-buttons">
                <a href="https://www.facebook.com/jackptoke" target="_blank" rel="noopener noreferrer" className="social-buttons__button social-button social-button--facebook" aria-label="Facebook">
                    <span className="social-button__inner">
                    <i className="fab fa-facebook"></i>
                    </span>
                </a>
                <a href="https://www.linkedin.com/in/jackptoke/" target="_blank" rel="noopener noreferrer" className="social-buttons__button social-button social-button--linkedin" aria-label="LinkedIn">
                    <span className="social-button__inner">
                    <i className="fab fa-linkedin"></i>
                    </span>
                </a>
                <a href="https://github.com/jackptoke" target="_blank" rel="noopener noreferrer" className="social-buttons__button social-button social-button--github" aria-label="GitHub">
                    <span className="social-button__inner">
                    <i className="fab fa-github"></i>
                    </span>
                </a>
                <a href="https://www.hackerrank.com/jackptoke" target="_blank" rel="noopener noreferrer" className="social-buttons__button social-button social-button--hackerrank" aria-label="HackerRank">
                    <span className="social-button__inner">
                    <i className="fab fa-hackerrank"></i>
                    </span>
                </a>
                <a href="https://1drv.ms/b/s!AidHbHOydYH5kZolAJBHZcCtjv72GA?e=RbSpu4" target="_blank" rel="noopener noreferrer"  className="social-buttons__button social-button social-button--resume" aria-label="Resume">
                    <span className="social-button__inner">
                    <i className="fas fa-file"></i>
                    </span>
                </a>
            </div>
            
            <ContactForm />
        </div>;
    }

    render(){
        return this.renderContact();
    }
}

export default Contact;