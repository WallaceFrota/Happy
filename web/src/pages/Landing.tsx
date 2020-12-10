import React from 'react';
import {Link} from 'react-router-dom';

import {FiArrowRight} from 'react-icons/fi';

import '../styles/pages/landing.css';

import logoImg from '../images/logo.svg';

function Landing() {
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={logoImg} alt="Logo Happy"/>

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite lares e mude o dia de muitos idosos.</p>
                </main>

                <div className="location">
                    <strong>Castanhal</strong>
                    <span>Pará</span>
                </div>

                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0,0,0,.6)"/>
                </Link>
            </div>
        </div>
    );
}

export default Landing;
