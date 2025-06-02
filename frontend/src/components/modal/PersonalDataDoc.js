import React from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, Form, FormControl, Modal } from 'react-bootstrap';

const PersonalDataDoc = ({show, onHide}) => {
    return (
        <div>
            <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Условия персональных данных
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <h3>Общие положения</h3>
               <p>1.1. Настоящая Политика обработки персональных
                    данных (далее — «Политика») определяет порядок сбора,
                    хранения, использования и защиты персональных данных 
                    пользователей веб-сайта базы отдыха "Дубрава" 
                    (далее — «Сайт»).
                </p>
                <p>1.2. Политика разработана в соответствии с 
                    законодательством Российской Федерации, включая
                    Федеральный закон № 152-ФЗ «О персональных данных».
                </p>
                <p>
                    Используя Сайт и предоставляя свои персональные данные, 
                    Пользователь соглашается с условиями настоящей Политики.
                </p>
                <h3>Какие данные мы собираем</h3>
                <p>
                    2.1. При бронировании проживания, оформлении заявок или 
                    подписки на рассылку мы можем запросить у Пользователя
                     следующую информацию:
                </p>
                <ul>
                    <li>ФИО;</li>
                    <li>номер телефона;</li>
                    <li>даты заезда и выезда;</li>
                </ul>
                <h3>3. Цели обработки персональных данных</h3>
                <p>3.1. Персональные данные обрабатываются для:</p>
                <ul>
                    <li>бронирования номеров и оказания услуг;</li>
                    <li>связи с Пользователем (подтверждение брони, уведомления);</li>
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button className='booking-admin-payment' onClick={onHide}> Ок</Button>
            </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PersonalDataDoc;
