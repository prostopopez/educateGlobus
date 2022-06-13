import React from 'react';
import TelephoneInput from '../../components/TelephoneInput';
import {ReactSVG} from 'react-svg';
import  './style.css';
import '../../style/main.css';

class ContactPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: ``
        };
    }

    render() {
        return <div className={'contacts'}>
            <div className={'container'}>
                <h1>{`Контакты`}</h1>
                <hr/>
                <p>«Labrioteka» – современный книжный интернет-ресурс, успешно работающий даже во время
                    карантина.</p>
                <div className={'contactsFlex'}>
                    <div className={'leftContacts'}>
                        <form>
                            <input type='name' placeholder={'Введите ваши инициалы'} required={true}/>
                            <input type='email' placeholder={'Введите вашу почту'} required={true}/>
                            <TelephoneInput/>
                            <textarea cols='30' rows='10' placeholder={'Введите сообщение'} required={true}/>
                            <input className={'submitButton'} type='submit'/>
                        </form>
                    </div>
                    <div className={'rightContacts'}>
                        <div className={'aboutUsInfo'}>
                            <div>
                                <ReactSVG
                                    src="../img/mapIcon.svg"
                                    beforeInjection={(svg) => {
                                        svg.classList.add('inlineIcon')
                                    }}
                                />
                                <span>
                                <strong>Labrioteka</strong><br/>
                                Россия, Пенза, Пензенская область,<br/>
                                улица Пупкина 104-4, 440000<br/>
                            </span>
                            </div>
                            <div>
                                <ReactSVG
                                    src="../img/phoneIcon.svg"
                                    beforeInjection={(svg) => {
                                        svg.classList.add('inlineIcon')
                                    }}
                                />
                                <span>+ 7 (960) 000-00-00</span>
                            </div>
                            <div>
                                <ReactSVG
                                    src="../img/mailIcon.svg"
                                    beforeInjection={(svg) => {
                                        svg.classList.add('inlineIcon')
                                    }}
                                />
                                <span>prostopopez@gmail.com</span>
                            </div>
                        </div>
                        <hr/>
                        <div className={'socialNetworkInfo'}>
                            <a href="https://vk.com/gtaas">
                                <ReactSVG
                                    src="../img/ContactsLogos/vkLogo.svg"
                                    beforeInjection={(svg) => {
                                        svg.classList.add('inlineIcon')
                                    }}
                                />
                            </a>
                            <a href="/404">
                                <ReactSVG
                                    src="../img/ContactsLogos/tgLogo.svg"
                                    beforeInjection={(svg) => {
                                        svg.classList.add('inlineIcon')
                                    }}
                                />
                            </a>
                            <a href="https://www.facebook.com/people/Prostopopez-Aot/100009744790989">
                                <ReactSVG
                                    src="../img/ContactsLogos/fbLogo.svg"
                                    beforeInjection={(svg) => {
                                        svg.classList.add('inlineIcon')
                                    }}
                                />
                            </a>
                            <a href="https://www.youtube.com/prostopopez">
                                <ReactSVG
                                    src="../img/ContactsLogos/ytLogo.svg"
                                    beforeInjection={(svg) => {
                                        svg.classList.add('inlineIcon')
                                    }}
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <h2>Ответы на часто задаваемые вопросы</h2>
                <hr/>
                <label>
                    <input type="checkbox"/>
                    <div className="card">
                        <div className="front">Как мне подробнее узнать о товаре, который я нашел на вашем сайте?</div>
                        <div className="back">На странице с товаром представлена вся информация, которой в настоящий момент обладает магазин.</div>
                    </div>
                </label>
                <label>
                    <input type="checkbox"/>
                    <div className="card">
                        <div className="front">Мне нужна книга по такой-то теме. А у вас по этой теме несколько книг. Помогите выбрать лучшую.</div>
                        <div className="back">В своем выборе вы можете опереться на рейтинг (от 1 до 5), который указаны на странице с товаром.</div>
                    </div>
                </label>
                <label>
                    <input type="checkbox"/>
                    <div className="card">
                        <div className="front">Мне нужен именно данный товар. Он у вас есть?</div>
                        <div className="back">Попробуйте воспользоваться поисковой строкой на странице "Каталог". Поиск ведётся по названию, автору, жанру, коллекции и т.д.</div>
                    </div>
                </label>
                <label>
                    <input type="checkbox"/>
                    <div className="card">
                        <div className="front">Сегодня дата отправки, которая была указана на вашем сайте? Почему заказ еще не отправлен?</div>
                        <div className="back">Дата отправки указывается как примерная. Она может меняться как в меньшую, так и в большую сторону.</div>
                    </div>
                </label>
                <label>
                    <input type="checkbox"/>
                    <div className="card">
                        <div className="front"> Я не могу зайти на сайт. Система говорит, что пользователь с таким email не зарегистрирован. Что делать?</div>
                        <div className="back">В большинстве случаев это происходит из-за того, что вы случайно сделали ошибку при вводе своего электронного адреса или пароля при регистрации.</div>
                    </div>
                </label>
                <label>
                    <input type="checkbox"/>
                    <div className="card">
                        <div className="front">Как мне удалить мою регистрационную запись (экаунт)?</div>
                        <div className="back">Перейдите в панель управления аккаунтом. Обратите внимание, что после нажатия на кнопку "Удалить аккаунт", ваша запись будет немедленно удалена без возможности восстановления.</div>
                    </div>
                </label>
            </div>
        </div>
    }
}

export default ContactPage;
