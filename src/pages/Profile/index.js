import React from 'react';
import '../../style/main.css';
import './style.css';
import axios from "axios";
import classnames from "classnames/bind";
import style from "../../components/Header/style.css";

const cn = classnames.bind(style);

class ProfilePage extends React.Component {
    constructor() {
        super();

        this.state = {
            dataUsers: [],
            id: 0,
            username: null,
            password: null,
            isToggleReg: false,
            intervalIsSet: false,
        };

        this.onCheckUser = this.onCheckUser.bind(this);
    }

    componentDidMount() {
        let datas = [
            this.getDataFromDbUsers
        ];

        for (let i = 0; i < datas.length; i++) {
            datas[i]();

            if (!this.state.intervalIsSet) {
                let interval = setInterval(datas[i](), 1000);
                this.setState({intervalIsSet: interval});
            }
        }
    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({intervalIsSet: null});
        }
    }

    getDataFromDbUsers = () => {
        fetch('http://localhost:3001/api/getUserData')
            .then((data) => data.json())
            .then((res) => this.setState({dataUsers: res.data}));
    };

    putDataToDbUsers = (username, password) => {
        let currentIds = this.state.dataUsers.map((data) => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        axios.post('http://localhost:3001/api/putUserData', {
            id: idToBeAdded,
            username: username,
            password: password
        });
    };

    toggleReg = (isToggleReg) => {
        this.setState({
            isToggleReg
        })
    };

    onCheckUser = (e, username, password) => {
        e.preventDefault();

        const {dataUsers} = this.state;
        let logged = false;

        const isUserCorrect = dataUsers.map(singleData => {
            if (singleData.username == username && singleData.password == password) {
                return [true, singleData.username];
            }
        });

        isUserCorrect.map(isUser => {
            if (isUser) {
                logged = true;
                alert(`Вы вошли под псевдонимом ${username}`);
                this.props.onChangeUser(username);
                this.setState({
                    isModalOpen: false
                });
            }
        })

        if (!logged) {
            alert('Вы ввели что-то неправильно');
        }
    };

    logOut = () => {
        this.props.onChangeUser(null);
    }

    render() {
        const {
            isToggleReg
        } = this.state;

        const {
            currentUser
        } = this.props;

        return <div className={'profile-page'}>
            <div className={cn(`container`, {isToggleReg})}>
                <div className={'log-in'}>
                    <form>
                        {currentUser == null
                            ? <div className={cn('notLogged')}>
                                <input className={'input'} type={'text'}
                                       onChange={(e) => this.setState({username: e.target.value})}
                                       placeholder={'Введите ваш логин'} required={true}/>
                                <input className={'input'} type={'password'}
                                       onChange={(e) => this.setState({password: e.target.value})}
                                       placeholder={'Введите ваш пароль'} required={true}/>
                                <button
                                    onClick={(e) => this.onCheckUser(e, this.state.username, this.state.password)}
                                    className={'button big green'}>Войти
                                </button>
                            </div>
                            : <div className={cn('ifLogged')}>
                                <p>{currentUser}</p>
                                <button
                                    onClick={(e) => this.logOut()}
                                    className={'button big green'}>Войти под другим псевдонимом
                                </button>
                            </div>
                        }
                    </form>
                    <button onClick={() => {
                        this.toggleReg(true);
                    }} className={'button big red'}>Создать пользователя
                    </button>
                </div>
                <div className={'reg-in'}>
                    <form>
                        <input className={'input'} type={'text'}
                               onChange={(e) => this.setState({username: e.target.value})}
                               placeholder={'Введите новый логин'} required={true}/>
                        <input className={'input'} type={'password'}
                               onChange={(e) => this.setState({password: e.target.value})}
                               placeholder={'Введите новый пароль'} required={true}/>
                        <button onClick={() => this.putDataToDbUsers(this.state.username, this.state.password)}
                                className={'button big green'}>Зарегистрироваться
                        </button>
                    </form>
                    <button onClick={() => this.toggleReg(false)} className={'button big red'}>Вернуться к авторизации
                    </button>
                </div>
            </div>
        </div>;
    }
}

export default ProfilePage;

