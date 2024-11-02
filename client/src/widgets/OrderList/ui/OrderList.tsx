import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { RootState } from '@stores';

import Button from '@shared/ui/Button';
import { removeOrder } from '@entities/Order/orderSlice';

import '../styles/OrderList.scss'


interface Order {
    id: string;
    phone: string;
    street: string;
    home: string;
    date: string;
}

const OrderList: React.FunctionComponent = () => {
    // const dispatch = useDispatch();
    // const orders = useSelector((state: RootState) => state.order.orders);
    const [orders, setOrders] = React.useState<Order[]>([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error("Ошибка при получении списка заказов:", error);
        }
    };

    const deleteOrder = async (id: string) => {
        try {
            await axios.delete(`http://localhost:8000/api/orders/${id}`);
            setOrders(orders.filter(order => order.id !== id));
        } catch (error) {
            console.error("Ошибка при удалении заказа:", error);
        }
        // dispatch(removeOrder(orderId));
    };

    React.useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="order-list">
            <div className="order-list__wrapper">
                <div className="order-list__title">
                    Заказы
                </div>
                {orders.length === 0 ? (
                    <p>Заказов нет</p>
                ) : (
                    <ul className="order-list__items">
                        <li className="order-list__item --header">
                            <div className="order-list__item--content-info">
                                <div className="content-info --date">
                                    Дата создания
                                </div>
                                <div className="content-info --phone">
                                    Номер телефона
                                </div>
                                <div className="content-info --street">
                                    Улица
                                </div>
                                <div className='content-info --home'>
                                    Дом
                                </div>
                                <div className='content-info --actions'>
                                    Действия
                                </div>
                            </div>
                        </li>
                        {orders.map((order, index) => (
                            <li key={index} className="order-list__item">
                                <div className="order-list__item--content-info">
                                    <div className="content-info --date">
                                        {order.date}
                                    </div>
                                    <div className="content-info --phone">
                                        {order.phone}
                                    </div>
                                    <div className="content-info --street">
                                        {order.street}
                                    </div>
                                    <div className='content-info --home'>
                                        {order.home}
                                    </div>
                                    <div className='content-info --actions'>
                                        <Button {...{
                                            className: "order-list__delete-button --no-back --danger",
                                            callback: () => deleteOrder(order.id)
                                        }}>
                                            Отменить
                                        </Button>
                                    </div>
                                </div>
                                
                                
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default OrderList;