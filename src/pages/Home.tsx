import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { selectFilterSlice, setCategoryIndex, setStartFilter } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaSlice } from '../redux/slices/pizzaSlice';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Paginaton from '../components/Pagination';

const Home: React.FC = () => {
    // function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSearch = React.useRef(false);
    const isMount = React.useRef(false);

    const { categoryIndex, activeSort, currentPage, searchValue } = useSelector(selectFilterSlice);

    const { items, status } = useSelector(selectPizzaSlice);



    // const [isLoading, setIsLoading] = React.useState(true);

    // const [pizzas, setPizzas] = React.useState([]);
    // const [activeSort, setActiveSort] = React.useState({ name: "популярности (ASC)", sort: "rating" });
    // const [categoryIndex, setCategoryIndex] = React.useState(0);
    // const [currentPage, setCurrentPage] = React.useState(1);

    const getPizzas = async () => {
        const category = categoryIndex ? `&category=${categoryIndex}` : "";

        const sortProperty = activeSort.sort.replace("-", "");
        const sortType = activeSort.sort.includes("-") ? "desc" : "asc";
        const sort = `?_sort=${sortProperty}&_order=${sortType}`;

        const search = searchValue ? `&q=${searchValue}` : "";

        dispatch(
            // @ts-ignore
            fetchPizzas({
                sort,
                search,
                category,
                currentPage
            }));
        window.scrollTo(0, 0);
    };

    React.useEffect(() => {
        if (isMount.current) {
            const queryString = qs.stringify({
                categoryIndex,
                activeSort: activeSort.sort,
                currentPage
            });
            navigate(`?${queryString}`)
        };
        isMount.current = true;
    },
        [categoryIndex, activeSort, currentPage]
    )

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const startSort = sortList.find(item => item.sort === params.activeSort)

            dispatch(setStartFilter({
                ...params,
                activeSort: startSort
            }));
            isSearch.current = true;
        };

    }, []);

    React.useEffect(() => {
        if (!isSearch.current) {
            getPizzas();
        }
        isSearch.current = false
    }, [categoryIndex, activeSort, searchValue, currentPage]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories chosenCategory={categoryIndex}
                    setChosenCategory={(i: number) => dispatch(setCategoryIndex(i))}
                />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>

            {status === "error"
                ? <div className='content__error'>
                    <h2>Ошибка при получении пицц</h2>
                    <p>К сожалению, произошла ошибка при получении пицц с сервера. <br />
                        Попробуйте повторить попытку позже </p>
                </div>
                : (
                    <div className="content__items">
                        {status === "loading"
                            ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
                            : items.map((obj: any) =>
                                <PizzaBlock key={obj.id} {...obj} />
                            )}
                    </div>
                )
            }


            <Paginaton forcePage={currentPage} />
        </div>
    )
}

export default Home