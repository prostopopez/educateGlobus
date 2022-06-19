import React from 'react';
import './style.css';
import '../../../style/main.css';
import axios from "axios";

class TestPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tests: [],
            intervalIsSet: false,
            currentTestId: (window.location.href).split('/').at(-1).replace('test:', '')
        };
    }

    componentDidMount() {
        let datas = [
            this.getDataFromDbUsers,
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

    getDataFromDbTests = () => {
        fetch('http://localhost:3001/api/getTestsData')
            .then((data) => data.json())
            .then((res) => this.setState({tests: res.data}));
    };

    checkTestAndUpdateUser = (currentTest, currentUser) => {
        let allQues = document.querySelectorAll('fieldset');
        let currentQuestions = currentTest.questions;

        let points = 0;
        let fullPoints = allQues.length;

        for (let i = 0; i < allQues.length; i++) {
            let options = allQues[i].querySelectorAll('input');

            for (let j = 0; j < options.length; j++) {
                if (options[j].checked && currentQuestions[i].truth == j) {
                    points += 1;
                }
            }
        }

        let success = (points / fullPoints) * 100;
        alert(`Вы набрали ${success} баллов!`);

        let objIdToUpdate = null;
        parseInt(currentUser);
        this.state.users.forEach((dat) => {
            if (dat.username == currentUser) {
                objIdToUpdate = dat._id;
            }
        });

        axios.post('http://localhost:3001/api/updateUserData', {
            _id: objIdToUpdate,
            update: {$push: {tests_progress: {_id: currentTest._id, success: success}}},
        });
    }

    render() {
        const {currentUser} = this.props;
        const {
            tests,
            currentTestId,
        } = this.state;

        return <div className={'test-page'}>
            <div className={'container'}>
                {tests.length <= 0
                    ? 'Нет тестов'
                    : tests.filter(test => test._id == currentTestId).map(currentTest => <div>
                            <h3>{currentTest.name}</h3>
                            <hr/>
                            <form name="test-form">
                                {currentTest.questions.map((question, index) =>
                                    <fieldset>
                                        <p className={'important'}>{question.name}</p>
                                        {question.options.map(option =>
                                            <label>
                                                <input type="radio" name={currentTestId + index} value={option}/>
                                                {option}
                                                <br/>
                                            </label>
                                        )}
                                        <br/>
                                    </fieldset>
                                )}
                                <button className={'button big green'} onClick={(e) => {
                                    e.preventDefault();
                                    this.checkTestAndUpdateUser(
                                        currentTest,
                                        currentUser
                                    );
                                }}>Завершить тест
                                </button>
                            </form>
                        </div>
                    )
                }
            </div>
        </div>;
    }
}

export default TestPage;
