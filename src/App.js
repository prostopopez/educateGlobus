import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './style/main.css';

const menuItems = [
    {
        icon: '../img/Main/user.svg',
        link: `/user`
    },
    {
        name: `Курсы`,
        link: `/courses`
    },
    {
        name: `Тесты`,
        link: `/tests`
    },
    {
        icon: '../img/Main/basket.svg',
        link: `/basket`
    },
];

const leftItems = menuItems.slice(0, Math.round(menuItems.length / 2));
const rightItems = menuItems.slice(Math.round(menuItems.length / 2));

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pathname: props.history.location.pathname
        };
    }

    componentDidMount() {
        window.h.listen((e) => {
            this.setState({
                pathname: e.pathname
            });
        });
    }

    render() {
        const {pathname} = this.state;

        return <React.Fragment>
            <Header
                leftItems={leftItems}
                rightItems={rightItems}
                pathname={pathname}
            />
            <main>
                {this.props.children}
            </main>
            <Footer
                leftItems={leftItems}
                rightItems={rightItems}
            />
        </React.Fragment>;
    }
}

export default App;
