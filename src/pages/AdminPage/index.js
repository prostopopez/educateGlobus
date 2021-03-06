import React from 'react';
import './style.css';
import '../../style/main.css';
import axios from 'axios';
import mongoose from 'mongoose';

class AdminPage extends React.Component {
    constructor() {
        super();

        this.state = {
            users: [],
            courses: [],
            tests: [],
            intervalIsSet: false,

            course_id: null,
            course_author: null,
            course_name: null,
            course_topics: [],
            course_time: null,
            course_level: null,
            course_description: null,
            course_rating: 4,
            course_img: null,
            course_price: null,

            test_id: null,
            test_difficulty: null,
            test_name: null,
            test_questions: [],
            test_time: null,
            test_img: null,

            isAdding: false,
            isEditing: false,
            isDeleting: false
        };
    }

    componentDidMount() {
        let datas = [
            this.getDataFromDbUsers,
            this.getDataFromDbCourses,
            this.getDataFromDbTests,
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

    putDataToDbCourses = (
        course_id,
        course_author,
        course_name,
        course_topics,
        course_time,
        course_level,
        course_description,
        course_rating,
        course_img,
        course_price
    ) => {
        axios.post('http://localhost:3001/api/putCoursesData', {
            _id: course_id,
            author: course_author,
            name: course_name,
            topics: course_topics,
            time: course_time,
            level: course_level,
            description: course_description,
            rating: course_rating,
            img: course_img,
            price: course_price
        });

        window.location.reload();
    }

    putDataToDbTests = (
        test_id,
        test_difficulty,
        test_name,
        test_questions,
        test_time,
        test_img,
    ) => {
        axios.post('http://localhost:3001/api/putTestsData', {
            _id: test_id,
            difficulty: test_difficulty,
            name: test_name,
            questions: test_questions,
            time: test_time,
            img: test_img,
        });

        window.location.reload();
    }

    render() {
        const {
            users,

            courses,
            course_topics,

            tests,
            test_questions,

            isAdding,
            isEditing,
            isDeleting
        } = this.state;

        return <div className={'admin-page'}>
            <div className={'container'}>
                <h1>{`?????????? ????????????`}</h1>
                <hr/>
                <h2>????????</h2>
                <form>
                    <input className={'input'} type={'text'} onChange={(e) => this.setState({
                        course_id: new mongoose.Types.ObjectId(),
                        course_author: e.target.value
                    })} placeholder={'??????????:'} required={true}/>
                    <input className={'input'} type={'text'} onChange={(e) => this.setState({
                        course_name: e.target.value
                    })} placeholder={'????????????????:'} required={true}/>
                    <input className={'input new-topic'} type={'text'} placeholder={'?????????????? ????????'}/>
                    <button className={'button small green'} onClick={(e) => {
                        e.preventDefault();

                        let newTopic = document.querySelector('.new-topic');
                        if (course_topics.includes(newTopic.value)) {
                            alert('?????????? ???????? ?????? ????????');
                        } else {
                            course_topics.push(newTopic.value);
                        }

                        this.setState({
                            course_topics: course_topics
                        })
                    }}>???????????????? ????????:
                    </button>
                    <div className={'admin-page__topic__grid'}>
                        {course_topics.length <= 0
                            ? '?????? ????????????'
                            : course_topics.map(topic => {
                                return <div className={'tag small blue'}>{topic}</div>
                            })
                        }
                    </div>
                    <input className={'input'} type={'text'} onChange={(e) => this.setState({
                        course_time: e.target.value
                    })} placeholder={'??????????:'} required={true}/>
                    <input className={'input'} type={'text'} onChange={(e) => this.setState({
                        course_level: e.target.value
                    })} placeholder={'?????????????? ????????????:'} required={true}/>
                    <textarea
                        rows="3"
                        className={'input'}
                        id="writeText"
                        name="writeText"
                        onChange={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = e.target.scrollHeight + 2 + "px";

                            this.setState({
                                course_description: e.target.value
                            })
                        }} placeholder={'????????????????:'}></textarea>
                    <input className={'input'} type={'text'} onChange={(e) => this.setState({
                        course_img: e.target.value
                    })} placeholder={'???????????? ???? ??????????????????????:'} required={true}/>
                    <input className={'input'} type={'number'} onChange={(e) => this.setState({
                        course_price: e.target.value
                    })} placeholder={'??????????????????:'} required={true}/>
                    <button className={'button big green'} onClick={(e) => {
                        e.preventDefault();
                        this.putDataToDbCourses(
                            this.state.course_id,
                            this.state.course_author,
                            this.state.course_name,
                            this.state.course_topics,
                            this.state.course_time,
                            this.state.course_level,
                            this.state.course_description,
                            this.state.course_rating,
                            this.state.course_img,
                            this.state.course_price
                        );
                    }}>????????????????
                    </button>
                    <button className={'button big blue'} onClick={(e) => {
                        e.preventDefault();
                    }}>????????????????
                    </button>
                    <button className={'button big red'} onClick={(e) => {
                        e.preventDefault();
                    }}>??????????????
                    </button>
                </form>
                <h2>????????</h2>
                <form>
                    <input className={'input'} type={'number'} step={'0.1'} min={0.1} max={5}
                           onChange={(e) => this.setState({
                               test_id: new mongoose.Types.ObjectId(),
                               test_difficulty: e.target.value
                           })} placeholder={'??????????????????:'} required={true}/>
                    <input className={'input'} type={'text'} onChange={(e) => this.setState({
                        test_name: e.target.value
                    })} placeholder={'????????????????:'} required={true}/>
                    <input className={'input'} type={'text'} onChange={(e) => this.setState({
                        test_time: e.target.value
                    })} placeholder={'??????????:'} required={true}/>
                    <div className={'admin-page__questions'}>
                        <div className={'admin-page__questions__interactive'}>
                            <input className={'input question-name'} type={'text'} placeholder={'????????????:'}/>
                            <input className={'input question-truth'} type={'number'}
                                   placeholder={'?????????? ?????????????????????? ???????????????? ????????????:'}/>
                            <ul className={'questions-options'}>
                                <li><input className={'input question-option'} type={'text'}
                                           placeholder={'?????????????? ????????????:'} required={true}/></li>
                            </ul>
                            <button className={'button small blue'} onClick={(e) => {
                                e.preventDefault();

                                let options = document.querySelector('.questions-options');
                                let optionItem = document.createElement("li");

                                optionItem.innerHTML += `<input class='input question-option' type='text' placeholder='?????????????? ????????????:' required='true'/>`;
                                options.appendChild(optionItem);
                            }}>???????????????? ?????????????? ????????????
                            </button>
                            <button className={'button small red'} onClick={(e) => {
                                e.preventDefault();

                                let options = document.querySelector('.questions-options');
                                options.removeChild(options.lastElementChild);
                            }}>?????????????? ?????????????? ????????????
                            </button>
                        </div>
                        <button className={'button small green'} onClick={(e) => {
                            e.preventDefault();

                            let questionOptions = [];
                            let questionOptionsTags = document.querySelectorAll('.question-option');
                            for (let i = 0; i < questionOptionsTags.length; i++) {
                                questionOptions.push(questionOptionsTags[i].value);
                            }

                            let questionName = document.querySelector('.question-name').value;
                            let questionTruth = document.querySelector('.question-truth').value;

                            let newQuestion = {
                                name: questionName,
                                options: questionOptions,
                                truth: questionTruth
                            };

                            test_questions.push(newQuestion);

                            this.setState({
                                test_questions: test_questions
                            })
                        }}>???????????????? ????????????
                        </button>
                        <div className={'admin-page__topic__grid'}>
                            {test_questions.length <= 0
                                ? '?????? ????????????'
                                : test_questions.map(test => {
                                    return (
                                        <div className={'tag small blue'}>{test.name}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <input className={'input'} type={'text'} onChange={(e) => this.setState({
                        test_img: e.target.value
                    })} placeholder={'???????????? ???? ??????????????????????:'} required={true}/>
                    <button className={'button big green'} onClick={(e) => {
                        e.preventDefault();
                        this.putDataToDbTests(
                            this.state.test_id,
                            this.state.test_difficulty,
                            this.state.test_name,
                            this.state.test_questions,
                            this.state.test_time,
                            this.state.test_img,
                        );
                    }}>????????????????
                    </button>
                    <button className={'button big blue'} onClick={(e) => {
                        e.preventDefault();
                    }}>????????????????
                    </button>
                    <button className={'button big red'} onClick={(e) => {
                        e.preventDefault();
                    }}>??????????????
                    </button>
                </form>
            </div>
        </div>

    }
}

export default AdminPage;
