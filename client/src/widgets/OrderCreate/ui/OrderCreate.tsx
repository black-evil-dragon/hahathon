import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Input } from "@shared/Input";
import Button from "@shared/ui/Button";
import { addOrder } from "@entities/Order/orderSlice";

import '../styles/OrderCreate.scss'
import { InputProps } from "@shared/Input/types";



interface OrderCreateProps {
    
}
 
const OrderCreate: React.FunctionComponent<OrderCreateProps> = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [success, setSuccess] = React.useState(false)

    const [userPhone, setUserPhone] = React.useState('')
    const [userStreet, setUserStreet] = React.useState('')
    const [userHome, setUserHome] = React.useState('')

    const [formFields, setFormFields] = React.useState<InputProps[] | null>([
        {
            name: "phone",
            type: "tel",
            placeholder: "Номер телефона",
            onChange: (newValue: string) => setUserPhone(newValue),
            required: true,

        },
        {
            name: "street",
            placeholder: "Улица",
            onChange: (newValue: string) => setUserStreet(newValue),
            required: true,
            suggestions: ["Улица Ленина", "Улица Гагарина", "Улица Пушкина"],
            strictSuggestions: true,
            
        },
        {
            name: "home",
            type: 'number',
            placeholder: "Номер дома",
            onChange: (newValue: string) => setUserHome(newValue),
            required: true,
        },
    ])



    const submitForm = async () => {
        if (userPhone && userStreet && userHome) {
            try {
                const response = await axios.post('http://localhost:8000/api/orders', {
                    phone: userPhone,
                    street: userStreet,
                    home: userHome,
                });

                if (response.status === 201) {
                    setSuccess(true);
                }
            } catch (error) {
                console.error('Ошибка при создании заказа:', error);
            }
            // dispatch(addOrder({ phone: userPhone, street: userStreet, home: userHome }));
            // setSuccess(true)
        }
    }


    return (<>
        
        <div className="order-create">
            <div className="order-create__form form">
                <div className="form__title">
                    Создать заказ
                </div>

                {!success ?<>
                    <div className="form__section">
                        <div className="form__section-name">
                            Контактная информация
                        </div>

                        <div className="form__inputs">
                            {formFields && formFields.map((field, fieldIndex) => (
                                <Input key={`input-${fieldIndex}`} {...{...field,
                                    // any args
                                }} />
                            ))}
                        </div>
                    </div>

                    <Button {...{
                        callback: submitForm,
                        className: '--dark'
                    }}>Создать заказ</Button>
                </>:<>
                    <div className="form__section form__success">
                        Отлично! Теперь вы можете перейти в <Link to={'/client/order/list'}>список своих заказов</Link> или создать еще, обновив страницу.
                    </div>
                </>
                }
            </div>
        </div>
        
        
    </>);
}
 
export default OrderCreate;