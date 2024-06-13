import SideBar from "../components/SideBar";
import RealtyObjectCard from "../components/RealtyObjectCard";
import Pagination from "../components/Pagination"
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";


interface RealtyPhoto {
    id: number;
    url: string;
}

interface Realty {
    id: number,
    title: string,
    description: string,
    price: number,
    realty_id: number,
    realty_images: [RealtyPhoto]
}


function Catalog() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Realty[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { categoryName } = useParams<{ categoryName?: string; }>();
    const { searchQuery } = useParams<{ searchQuery?: string; }>();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (searchQuery) {
                    response = await axios.get(
                        `http://0.0.0.0:8000/realty/search?query=${searchQuery}&page=${currentPage}&size=10`
                    );
                } else if (categoryName) {
                    response = await axios.get(
                        `http://0.0.0.0:8000/realty/${categoryName}?page=${currentPage}&size=10`
                    );
                } else {
                    response = await axios.get(
                        `http://0.0.0.0:8000/realty/realties?page=${currentPage}&size=10`
                    );
                }
                setData(response.data.items);
                setTotalPages(response.data.pages);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [currentPage, categoryName, searchQuery]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    };

    const handleCategorySelect = (category: string) => {
        setCurrentPage(1);
        navigate(`/category/${category}`)
    };

    return (
        <div className="container">
            <div className="sidebar">
                <SideBar onCategoryClick={handleCategorySelect} />
            </div>
            {loading ? (
                <div className="loading-overlay">
                    <div className="loading-text">Loading...</div>
                </div>
            ) : (
                <div className="catalog-content">
                    <div className="catalog-grid">
                        {data.map(item => (
                            <RealtyObjectCard realty_object={{
                                "id": item.realty_id,
                                "title": item.title,
                                "description": item.description,
                                "price": item.price,
                                "photos": item.realty_images,
                            }} key={item.realty_id} />
                        ))}
                    </div>
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    )
}

export default Catalog;
