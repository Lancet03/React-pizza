import React from 'react';

function Categories( {chosenCategory,setChosenCategory} ) {


    const categories = ["Все",
        "Мясные",
        "Вегетарианские",
        "Гриль",
        "Острые",
        "Закрытые"];

    const onCategory = (index) => {
        setChosenCategory(index);

    };

    return (
        <div className="categories">
            <ul>
                {categories.map(
                    (category, index) => (
                        <li
                            key={index}
                            onClick={() => onCategory(index)}
                            className={chosenCategory === index ? "active" : ""}
                        >
                            {category}
                        </li>)
                )}
                {/* <li>Мясные</li>
         <li>Вегетарианская</li>
         <li>Гриль</li>
         <li>Острые</li>
         <li>Закрытые</li> */}
            </ul>
        </div>
    )

}

export default Categories;