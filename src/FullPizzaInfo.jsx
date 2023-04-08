import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

const FullPizzaInfo = () => {
    const [pizzaInfo, setPizzaInfo] = React.useState();

    const { id } = useParams();

    React.useEffect(() => {
        async function fetchPizzas() {
            const { data } = await axios.get(`http://localhost:3100/pizzas/${id}`);
            setPizzaInfo(data);
        }

        try {
            fetchPizzas();   
        } catch (error) {
            alert("Произошла ошибка при загрузке информации о пицце!");
        }
        
    }, []);


    if(!pizzaInfo) {
        return(
            <div className='loader'>
            </div>
        )
    }

    return (
        <div className='container'>
            <h2>{pizzaInfo.title}</h2>
            <img src={pizzaInfo.imageUrl} alt="Pizza" />
            <p>Цена: {pizzaInfo.price} ₽</p>
            <p>Рейтинг: {pizzaInfo.rating}</p>
        </div>
    )
}

export default FullPizzaInfo