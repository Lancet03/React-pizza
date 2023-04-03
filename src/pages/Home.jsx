import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryIndex, setStartFilter } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Paginaton from '../components/Pagination';
import { SearchContext } from '../App';


function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSearch = React.useRef(false);
    const isMount = React.useRef(false);

    const { categoryIndex, activeSort, currentPage } = useSelector((state) => state.filterSlice);

    const { searchValue } = React.useContext(SearchContext);

    const [isLoading, setIsLoading] = React.useState(true);
    const [pizzas, setPizzas] = React.useState([]);
    // const [activeSort, setActiveSort] = React.useState({ name: "популярности (ASC)", sort: "rating" });
    // const [categoryIndex, setCategoryIndex] = React.useState(0);
    // const [currentPage, setCurrentPage] = React.useState(1);

    const fetchPizzas = () => {
        setIsLoading(true)

        const category = categoryIndex ? `&category=${categoryIndex}` : "";

        const sortProperty = activeSort.sort.replace("-", "");
        const sortType = activeSort.sort.includes("-") ? "desc" : "asc";
        const sort = `?_sort=${sortProperty}&_order=${sortType}`;

        const search = searchValue ? `&q=${searchValue}` : "";

        axios.get(`http://localhost:3100/pizzas${sort}&_page=${currentPage}&_limit=8${category}${search}`)
            .then(res => {
                // const items = json.filter((obj) => obj.title.includes(searchValue));
                setPizzas(res.data);
                setIsLoading(false);
            })
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
        window.scrollTo(0, 0);
        if (!isSearch.current) {
            fetchPizzas();
        }
        isSearch.current = false
    }, [categoryIndex, activeSort, searchValue, currentPage]);



    return (
        <div className="container">
            <div className="content__top">
                <Categories chosenCategory={categoryIndex}
                    setChosenCategory={(i) => dispatch(setCategoryIndex(i))}
                />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
                    : pizzas.map((obj) =>
                        <PizzaBlock key={obj.id} {...obj} />
                    )}
            </div>
            <Paginaton forcePage={currentPage} />
        </div>
    )
}

export default Home