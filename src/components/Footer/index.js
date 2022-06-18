import React from 'react';
import classnames from 'classnames/bind';
import {ReactSVG} from "react-svg";
import style from '../Footer/style.css';
import '../../style/main.css';

const cn = classnames.bind(style);

const goTo = (e, path) => {
    e.preventDefault();

    window.h.push(path);
};

const Footer = (props) => {
    const {leftItems, rightItems} = props;

    return <footer className={'footer'}>
        <div className={cn('container', 'footer__cont')}>
            <ul>
                {leftItems.map(item => <li>
                    <a
                        onClick={(e) => {
                            goTo(e, item.link);
                        }}
                        className={'link'}
                        href={item.link}
                    >
                        {
                            item.name !== undefined
                                ? item.name
                                : <ReactSVG
                                    src={item.icon}
                                    beforeInjection={(svg) => {
                                        svg.classList.add('additional-icon');
                                    }}
                                />
                        }
                    </a>
                </li>)}
                <li>
                    <a onClick={(e) => {
                        goTo(e, '/');
                    }}
                       className={'link'}
                       href={'/'}>
                        <ReactSVG
                            src="../img/Main/logo.svg"
                            beforeInjection={(svg) => {
                                svg.classList.add('main-icon');
                            }}
                        />
                    </a>
                </li>
                {rightItems.map(item => <li>
                    <a
                        onClick={(e) => {
                            goTo(e, item.link);
                        }}
                        className={'link'}
                        href={item.link}
                    >
                        {
                            item.name !== undefined
                                ? item.name
                                : <ReactSVG
                                    src={item.icon}
                                    beforeInjection={(svg) => {
                                        svg.classList.add('additional-icon');
                                    }}
                                />
                        }
                    </a>
                </li>)}
            </ul>
            <div className={'footer__description'}>
                <span className={'important'}>&copy; 2022 educateGlobus</span>
                <span className={'important'}>prostopopez</span>
            </div>
        </div>
    </footer>;
};

export default Footer;
