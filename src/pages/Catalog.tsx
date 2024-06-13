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
    realty_type: string,
    title: string,
    description: string,
    price: number,
    realty_id: number,
    region: string,
    condition: string,
    street: string,
    section: string,
    floor: string,
    square: string,
    rooms: string,
    builder: string,
    rc: string,
    turn: string,
    entrance: string,
    heating: string,
    documents: string,
    material_manufacture: string,
    location_type: string,
    settlement: string,
    house_type: string,
    land_area_object: string,
    material_manufacture_2: string,
    communications: string,
    appointment: string,
    features: string,
    tenants_object: string,
    comfort: string,
    realty_images: [RealtyPhoto]
}


function Catalog() {
    const [data, setData] = useState<Realty[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { categoryName } = useParams<{ categoryName?: string; }>();
    const { searchQuery } = useParams<{ searchQuery?: string; }>();
    const navigate = useNavigate();

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
        </div>
    )
}

export default Catalog;
