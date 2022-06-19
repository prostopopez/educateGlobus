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
            users: [],
            dataCourses: [],
            dataTests: [],
            id: 0,
            username: null,
            password: null,
            isToggleReg: false,
            intervalIsSet: false
        };

        this.onCheckUser = this.onCheckUser.bind(this);
    }

    componentDidMount() {
        let datas = [
            this.getDataFromDbUsers,
            this.getDataFromDbCourses,
            this.getDataFromDbTests
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
            .then((res) => this.setState({users: res.data}));
    };

    putDataToDbUsers = (username, password) => {
        let currentIds = this.state.users.map((data) => data.id);
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

        const {users} = this.state;
        let logged = false;

        const isUserCorrect = users.map(singleData => {
            if (singleData.username == username && singleData.password == password) {
                return [true, singleData.username];
            }
        });

        isUserCorrect.map(isUser => {
            if (isUser) {
                logged = true;
                alert(`Вы вошли под псевдонимом ${username}`);
                this.props.onChangeUser(username);
            }
        })

        if (!logged) {
            alert('Вы ввели что-то неправильно');
        }
    };

    logOut = () => {
        this.props.onChangeUser(null);
    }

    getDataFromDbCourses = () => {
        fetch('http://localhost:3001/api/getCoursesData')
            .then((data) => data.json())
            .then((res) => this.setState({dataCourses: res.data}));
    };

    getDataFromDbTests = () => {
        fetch('http://localhost:3001/api/getTestsData')
            .then((data) => data.json())
            .then((res) => this.setState({dataTests: res.data}));
    };

    removeCourseFromUsers = (course_id, currentUser) => {
        let objIdToUpdate = null;
        parseInt(currentUser);
        this.state.users.forEach((dat) => {
            if (dat.username == currentUser) {
                objIdToUpdate = dat._id;
            }
        });

        axios.post('http://localhost:3001/api/updateUserData', {
            _id: objIdToUpdate,
            update: {$pull: {courses_id: course_id}},
        });

        window.location.reload();
    };

    removeTestFromUsers = (test_id, currentUser) => {
        let objIdToUpdate = null;
        parseInt(currentUser);
        this.state.users.forEach((dat) => {
            if (dat.username == currentUser) {
                objIdToUpdate = dat._id;
            }
        });

        axios.post('http://localhost:3001/api/updateUserData', {
            _id: objIdToUpdate,
            update: {$pull: {tests_progress: {_id: test_id}}},
        });

        window.location.reload();
    };

    render() {
        const {
            isToggleReg,
            users,
            dataCourses,
            dataTests
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
                <p className="important">Курсы:</p>
                <div className={'profile-page__basket'}>
                    {dataCourses.map(course =>
                        users.map(user => {
                            if (user.username == currentUser && user.courses_id.includes(course._id)) {
                                return (
                                    <div className={'profile-page__added'}>
                                        <div className={'profile-page__added__item'}>
                                            <img src={course.img} alt=""/>
                                            <div className={'profile-page__added__item__cont'}>
                                                <div className={'profile-page__added__item__between'}>
                                                    <p className={'important property'}>Название:</p>
                                                    <p className={'important small value'}>{course.name}</p>
                                                </div>
                                                <div className={'profile-page__added__item__between'}>
                                                    <p className={'important property'}>Цена:</p>
                                                    <p className={'important value'}>{course.price} руб.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button className={'button big red'} onClick={() => {
                                            this.removeCourseFromUsers(
                                                course._id,
                                                currentUser
                                            )
                                        }}>Удалить
                                        </button>
                                    </div>
                                );
                            }
                        })
                    )}
                </div>
                <p className="important">Тесты:</p>
                <div className={'profile-page__tests'}>
                    {dataTests.map(test =>
                        users.map(user => user.tests_progress.map(finishedTest => {
                                if (user.username == currentUser && finishedTest._id == test._id) {
                                    return (
                                        <div className={'profile-page__added'}>
                                            <div className={'profile-page__added__item'}>
                                                <img src={test.img} alt=""/>
                                                <div className={'profile-page__added__item__cont'}>
                                                    <div className={'profile-page__added__item__between'}>
                                                        <p className={'important property'}>Название:</p>
                                                        <p className={'important small value'}>{test.name}</p>
                                                    </div>
                                                    <div className={'profile-page__added__item__between'}>
                                                        <p className={'important property'}>Сложность:</p>
                                                        <p className={'important value'}>{test.difficulty}</p>
                                                    </div>
                                                    <div className={'profile-page__added__item__between'}>
                                                        <p className={'important property'}>Набрано баллов:</p>
                                                        <p className={'important value'}>{finishedTest.success}/100</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className={'button big red'} onClick={() => {
                                                this.removeTestFromUsers(
                                                    finishedTest._id,
                                                    currentUser
                                                )
                                            }}>Удалить
                                            </button>
                                        </div>
                                    );
                                }
                            })
                        )
                    )}
                </div>
            </div>
        </div>;
    }
}

export default ProfilePage;

