import React from 'react';
import './style.css';
import '../../style/main.css';
import TestItem from "../../components/TestItem";

class TestCatalog extends React.Component {
    constructor() {
        super();

        this.state = {
            tests: [],
            intervalIsSet: false,
        };
    }

    componentDidMount() {
        let datas = [
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

    getDataFromDbTests = () => {
        fetch('http://localhost:3001/api/getTestsData')
            .then((data) => data.json())
            .then((res) => this.setState({tests: res.data}));
    };

    render() {
        const {tests} = this.state;

        return <div className={'test-catalog'}>
            <div className={'container'}>
                <h1>Каталог тестов</h1>
                <hr/>
                <div className="test-catalog__grid">
                    {tests.length <= 0
                        ? 'Нет данных'
                        : tests.map((item) =>
                            <TestItem
                                difficulty={item.difficulty}
                                name={item.name}
                                questions={item.questions}
                                time={item.time}
                                img={item.img}
                            />
                        )
                    }
                </div>
            </div>
        </div>

    }
}

export default TestCatalog;
