import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { setUserType } from '@entities/User/userSlice';

import '../styles/Home.scss'
import Button from "@shared/ui/Button";

interface HomeProps {
    
}
 
const Home: React.FunctionComponent<HomeProps> = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (choice: string) => {
        switch (choice) {
            case "client":
                dispatch(setUserType(choice))
                navigate("/client");
                break;

            case "admin":
                dispatch(setUserType(choice))
                navigate("/admin");
                break;
        
            default:
                break;
        }
    }

    return (<>
        <div className="home">
            <div className="home__wrapper">
                <div className="home__title">
                    <h1>Привет!</h1>
                    <p>Давай определимся с ролью для тестирования ;)</p>
                </div>

                <div className="home__buttons">
                    <Button {...{
                        callback: () => handleClick('client'),
                        className: '--dark',
                    }}>Я классный клиент 🤑</Button>

                    <Button {...{
                        callback: () => handleClick('admin'),
                        className: '--dark',
                    }}>Я крутой администратор 😎</Button>
                </div>
            </div>
        </div>
    </>);
}
 
export default Home;