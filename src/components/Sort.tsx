import React from 'react';
import { useDispatch } from 'react-redux';
import { setActiveSort } from '../redux/filter/slice';


type SortItem = {
  name: string;
  sort: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price';
}

export const sortList: SortItem[] = [
  { name: "популярности (ASC)", sort: "rating" },
  { name: "популярности (DESC)", sort: "-rating" },
  { name: "цене (ASC)", sort: "price" },
  { name: "цене (DESC)", sort: "-price" },
  { name: "алфавиту (ASC)", sort: "title" },
  { name: "алфавиту (DESC)", sort: "-title" }
];

type TSortProps = {
  activeSort: SortItem
}

const Sort: React.FC<TSortProps> = React.memo(({activeSort}) => {
  const dispatch = useDispatch();
  // const activeSort = useSelector(selectFilterSliceSort);

  const sortRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false)
      };
    }
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, []);

  const onClickSort = (obj: SortItem) => {
    dispatch(setActiveSort(obj))
    setOpen(false)
  }

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{activeSort.name}</span>
      </div>


      {open &&
        (<div className="sort__popup">
          <ul>
            {
              sortList.map((sortObj, index) =>
              (<li
                key={index}
                onClick={() => { onClickSort(sortObj) }}
                className={sortObj.name === activeSort.name ? "active" : ""}
              >
                {sortObj.name}
              </li>)
              )
            }
          </ul>
        </div>)
      }

    </div>
  )

})

export default Sort