import React from 'react';
import CourseItem from '../../components/CourseItem';
import TestItem from '../../components/TestItem';
import '../../style/main.css';
import './style.css';
import {ReactSVG} from "react-svg";

class MainPage extends React.Component {
    constructor() {
        super();

        this.state = {
            courses: [],
            tests: [],
            intervalIsSet: false,
        };
    }

    componentDidMount() {
        let datas = [
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

    getDataFromDbCourses = () => {
        fetch('http://localhost:3001/api/getCoursesData')
            .then((data) => data.json())
            .then((res) => this.setState({courses: res.data}));
    };

    getDataFromDbTests = () => {
        fetch('http://localhost:3001/api/getTestsData')
            .then((data) => data.json())
            .then((res) => this.setState({tests: res.data}));
    };

    render() {
        const {
            courses,
            tests,
        } = this.state;

        const {
            currentUser
        } = this.props;

        return <div className={'main-page'}>
            <div className={'container main-page__about'}>
                <h1>educateGlobus</h1>
                <p>Мы сталкиваемся с информационными технологиями каждый день. <br/>
                    Сложно представить жизнь современного человека без Интернета. <br/>
                    Наша цель - помочь вам изучить современную IT-профессию.
                </p>
                <blockquote>“Не волнуйтесь, если что-то не работает. Если бы всё работало, вас бы уволили.”</blockquote>
                <button className={'button big red'}>Попробовать курсы для начинающих</button>
            </div>
            <div className={'main-page__image'}>
                <img src="../img/main/hands.png" alt=""/>
            </div>
            <div className={'container main-page__new-courses'}>
                <h2>Последний добавленный курс</h2>
                <p>Самые актуальные темы в современном IT-сообществе</p>
                <div className="hitGrid">
                    {courses.length <= 0
                        ? 'Нет данных'
                        : <CourseItem
                            id={courses[0]._id}
                            author={courses[0].author}
                            name={courses[0].name}
                            topics={courses[0].topics}
                            time={courses[0].time}
                            level={courses[0].level}
                            description={courses[0].description}
                            rating={courses[0].rating}
                            img={courses[0].img}
                            price={courses[0].price}
                            currentUser={currentUser}
                        />
                    }
                </div>
            </div>
            <div className={'container main-page__hardest-tests'}>
                <h2>Самые сложные тесты</h2>
                <p>Хотите настоящий челлендж?</p>
                <div className="main-page__hardest-tests__grid">
                    {tests.length <= 0
                        ? 'Нет данных'
                        // находим тесты со сложностью выше 4.5 и берём первые 2
                        : tests.filter(test => test.difficulty >= 4.5).slice(0, 2).map((item) => <TestItem
                            id={item._id}
                            difficulty={item.difficulty}
                            name={item.name}
                            questions={item.questions}
                            time={item.time}
                            img={item.img}
                            currentUser={currentUser}
                        />)
                    }
                </div>
                <a href={'/tests'} className={'button big black'}>Хочу больше</a>
            </div>
            <div className={'container contacts'}>
                <h2>Контакты</h2>
                <div className="contacts__soc">
                    <ReactSVG
                        src="../img/ContactsLogos/tgLogo.svg"
                        className={'contacts__soc__logo tgLogo'}
                    />
                    <ReactSVG
                        src="../img/ContactsLogos/vkLogo.svg"
                        className={'contacts__soc__logo vkLogo'}
                    />
                    <ReactSVG
                        src="../img/ContactsLogos/fbLogo.svg"
                        className={'contacts__soc__logo fbLogo'}
                    />
                </div>
            </div>
        </div>;
    }
}

export default MainPage;

