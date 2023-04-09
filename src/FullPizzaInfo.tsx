import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizzaInfo: React.FC = () => {
    const navigate = useNavigate();

    const [pizzaInfo, setPizzaInfo] = React.useState<{
        title: string;
        imageUrl: string;
        price: number;
        rating: number;
    }>();

    const { id } = useParams();

    React.useEffect(() => {
        async function fetchPizzas() {
            try {
                const { data } = await axios.get(`http://localhost:3100/pizzas/${id}`);
                setPizzaInfo(data);
            } catch (error) {
                alert('Произошла ошибка при загрузке информации о пицце!');
                navigate("/")
            }
        };
        fetchPizzas();
    }, []);

    if (!pizzaInfo) {
        return <div className="loader"></div>;
    }

    return (
        <div className="container">
            <h2>{pizzaInfo.title}</h2>
            <img src={pizzaInfo.imageUrl} alt="Pizza" />
            <p>Цена: {pizzaInfo.price} ₽</p>
            <p>Рейтинг: {pizzaInfo.rating}</p>
        </div>
    );
};

export default FullPizzaInfo;
