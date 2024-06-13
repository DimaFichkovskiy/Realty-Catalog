import {MouseEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

interface SideBarProps {
    onCategoryClick: (category: string) => void;
}

function SideBar({ onCategoryClick }: SideBarProps) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();

    const categories = {
        "apartment": "Квартири",
        "commercial": "Кормерція",
        "house": "Приватні будинки",
        "land": "Земельні ділянки",
        "secondary": "Вторинка",
        "town": "Котеджні містечка"
    };

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
                {Object.entries(categories).map(([key, value]) => (
                    <li
                        className={`list-categories-item ${selectedCategory === key ? "selected": ""}`}
                        onClick={(event) => handleClick(event, key)}
                        key={key}
                    >
                        {value}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default SideBar;
