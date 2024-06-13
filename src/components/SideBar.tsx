import {MouseEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AppDispatch, RootState} from "../store/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../store/categories.store";

interface SideBarProps {
    onCategoryClick: (category: string) => void;
}

function SideBar({ onCategoryClick }: SideBarProps) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();

    const dispatch: AppDispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.categories);
    const status = useSelector((state: RootState) => state.categories.status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCategories());
        }
    }, [status, dispatch]);

    console.log(categories);

    

    const handleClick = (event: MouseEvent, category: string) => {
        event.preventDefault();
        setSelectedCategory(category);
        onCategoryClick(category);
        navigate(`/category/${category}`)
        window.scrollTo(0, 0);
    }

    return (
        <>
            <ul className="list-categories">
                {categories.map((category) => (
                    <li
                        key={category.name_en}
                        className={`list-categories-item ${selectedCategory === category.name_en ? "selected": ""}`}
                        onClick={(event) => handleClick(event, category.name_en)}
                    >
                        {category.name_urk}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default SideBar;
