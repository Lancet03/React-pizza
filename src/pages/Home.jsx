import React from 'react'

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Paginaton from '../components/Pagination';

function Home({ searchValue }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [pizzas, setPizzas] = React.useState([]);
    const [activeSort, setActiveSort] = React.useState({ name: "популярности (ASC)", sort: "rating" });
    const [categoryIndex, setCategoryIndex] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);


    React.useEffect(() => {
        setIsLoading(true)

        const category = categoryIndex ? `&category=${categoryIndex}` : "";

        const sortProperty = activeSort.sort.replace("-", "");
        const sortType = activeSort.sort.includes("-") ? "desc" : "asc";
        const sort = `?_sort=${sortProperty}&_order=${sortType}`;

        const search = searchValue ? `&q=${searchValue}` : "";

        fetch(`http://localhost:3100/pizzas${sort}&_page=${currentPage}&_limit=8${category}${search}`)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                // const items = json.filter((obj) => obj.title.includes(searchValue));
                setPizzas(json);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryIndex, activeSort, searchValue, currentPage]);



    return (
        <div className="container">
            <div className="content__top">
                <Categories chosenCategory={categoryIndex} setChosenCategory={setCategoryIndex} />
                <Sort activeSort={activeSort} setActiveSort={setActiveSort} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
                    : pizzas.map((obj) =>
                            <PizzaBlock key={obj.id} {...obj} />
                        )}
            </div>
            <Paginaton setCurrentPage={setCurrentPage}/>
        </div>
    )
}

export default Home