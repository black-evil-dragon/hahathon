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
    const [streetSuggestions, setStreetSuggestions] = React.useState<string[] | undefined>()
    const [error, setError] = React.useState<undefined | {
        text: string,
        type: string,
    }>()


    const submitForm = async () => {
        if (userPhone && userStreet && userHome) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/order/create`, {
                    phone: userPhone,
                    street: userStreet,
                    home: userHome,
                });

                if (response.data.success) {
                    setSuccess(true);
                } else {
                    setError({
                        text: response.data.error.text,
                        type: response.data.error.type
                    })
                }
            } catch (error) {
                console.error('Ошибка при создании заказа:', error);
            }
            // dispatch(addOrder({ phone: userPhone, street: userStreet, home: userHome }));
            // setSuccess(true)
        }
    }   

    const getMap = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/map`)

        if (response.status === 200) {
            setStreetSuggestions(response.data.allStreets)
        }
        
    }

    React.useEffect(() => {
        getMap()
    }, [])


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
                            <Input {...{
                                name: "phone",
                                type: "tel",
                                placeholder: "Номер телефона",
                                onChange: (newValue: string) => setUserPhone(newValue),
                                required: true,
                            }} />
                            <Input {...{
                                name: "street",
                                placeholder: "Улица",
                                onChange: (newValue: string) => setUserStreet(newValue),
                                required: true,
                                suggestions: streetSuggestions,
                                strictSuggestions: true,
                            }} />
                            <Input {...{
                                name: "home",
                                type: 'number',
                                placeholder: "Номер дома",
                                onChange: (newValue: string) => setUserHome(newValue),
                                required: true,
                            }} />
                        </div>
                    </div>

                    <Button {...{
                        callback: submitForm,
                        className: '--dark'
                    }}>Создать заказ</Button>
                    {
                        error && <div>
                            <span className={`${error.type}`}>
                                {error.text}
                            </span>
                        </div>
                    }
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