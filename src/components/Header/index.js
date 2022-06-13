import React from 'react';
import classnames from 'classnames/bind';
import enhanceWithClickOutside from 'react-click-outside';
import {ReactSVG} from 'react-svg';
import style from './style.css';
import '../../style/main.css';

const cn = classnames.bind(style);

const goTo = (e, path) => {
    e.preventDefault();

    window.h.push(path);
};

class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            isMenuOpen: false,
        };
    }

    toggleMenu = (isMenuOpen) => {
        this.setState({
            isMenuOpen
        });

        if (isMenuOpen === true) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    };

    goTo = (e, link) => {
        goTo(e, link);

        this.setState({
            isMenuOpen: false
        });
        document.body.classList.remove('no-scroll');
    };

    render() {
        const {
            leftItems,
            rightItems,
        } = this.props;
        const {
            isMenuOpen,
        } = this.state;

        return <header className={cn(`header`, {expanded: isMenuOpen})}>
            <div className={'container header__cont'}>
                <button className={cn(`header__toggle`, {active: isMenuOpen})} onClick={() => this.toggleMenu(!isMenuOpen)}>
                    <span/>
                    <span/>
                    <span/>
                </button>
                <ul>
                    {leftItems.map(item => <li>
                        <a
                            onClick={(e) => {
                                this.goTo(e, item.link);
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
                                this.goTo(e, item.link);
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
            </div>
        </header>;
    }
}

export default enhanceWithClickOutside(Header);
