import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface RealtyPhoto {
    id: number;
    url: string;
}

interface Realty {
    id: number;
    realty_type: string;
    title: string;
    description: string;
    price: number;
    region: string;
    condition: string;
    street: string;
    section: string;
    floor: string;
    square: string;
    rooms: string;
    builder: string;
    rc: string;
    turn: string;
    entrance: string;
    heating: string;
    documents: string;
    material_manufacture: string;
    location_type: string;
    settlement: string;
    house_type: string;
    land_area_object: string;
    material_manufacture_2: string;
    communications: string;
    appointment: string;
    features: string;
    tenants_object: string;
    comfort: string;
    realty_images: RealtyPhoto[];
}

function RealtyPage() {
    const {realtyId} = useParams<{ realtyId: string }>();
    const [realty, setRealty] = useState<Realty | null>(null);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {
        const fetchRealty = async () => {
            try {
                const response = await axios.get(`http://0.0.0.0:8000/realty/object/${realtyId}`);
                const data = response.data;
                setRealty(data);
                if (data.realty_images.length > 0) {
                    setSelectedPhotoIndex(0);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchRealty();
    }, [realtyId]);

    const handlePreviousPhoto = () => {
        setSelectedPhotoIndex((prevIndex) =>
            prevIndex === 0 ? realty!.realty_images.length - 1 : prevIndex - 1
        );
    };

    const handleNextPhoto = () => {
        setSelectedPhotoIndex((prevIndex) =>
            prevIndex === realty!.realty_images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const toggleDescription = () => {
        setExpanded(!expanded);
    };

    const selectedPhoto = realty?.realty_images[selectedPhotoIndex];

    return (
        <div className="realty-container">
            <div className="photos">
                <div className="photo-switcher">
                    <button className="arrow left-arrow" onClick={handlePreviousPhoto}>
                        &lt;
                    </button>
                    <div className="main-photo">
                        {selectedPhoto && (
                            <img src={selectedPhoto.url} alt={`Photo ${selectedPhoto.id}`}/>
                        )}
                    </div>
                    <button className="arrow right-arrow" onClick={handleNextPhoto}>
                        &gt;
                    </button>
                </div>
                <div className="thumbnails-wrapper">
                    <div className="thumbnails">
                        {realty?.realty_images.map((photo, index) => (
                            <img
                                key={index}
                                src={photo.url}
                                alt={`Thumbnail ${photo.id}`}
                                className={index === selectedPhotoIndex ? 'thumbnail selected' : 'thumbnail'}
                                onClick={() => setSelectedPhotoIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="details">
                <h1>{realty?.title}</h1>
                <div className="price">${realty?.price}</div>
                <div className={`description-text ${expanded ? 'expanded' : ''}`}>
                    {realty?.description}
                </div>
                <div >
                    {realty && (
                        <div className="characteristic">
                            {realty.region && <p className="characteristic-item">
                                <label>Розташування: </label>{realty.region}
                            </p>}
                            {realty.street && <p className="characteristic-item">
                                <label>Вулиця: </label>{realty.street}
                            </p>}
                            {realty.floor && <p className="characteristic-item">
                                <label>Кількість поверхів: </label>{realty.floor}
                            </p>}
                            {realty.square && <p className="characteristic-item">
                                <label>Площа: </label>{realty.square}
                            </p>}
                            {realty.rooms && <p className="characteristic-item">
                                <label>Кількість кімнат: </label>{realty.rooms}
                            </p>}
                            {realty.builder && <p className="characteristic-item">
                                <label>Будівельник: </label>{realty.builder}
                            </p>}
                            {realty.heating && <p className="characteristic-item">
                                <label>Опалення: </label>{realty.heating}
                            </p>}
                            {realty.location_type && <p className="characteristic-item">
                                <label>Тип розташування: </label>{realty.location_type}
                            </p>}
                            {realty.settlement && <p className="characteristic-item">
                                <label>Населений пункт: </label>{realty.settlement}
                            </p>}
                            {realty.house_type && <p className="characteristic-item">
                                <label>Тип будинку: </label>{realty.house_type}
                            </p>}
                            {realty.land_area_object && <p className="characteristic-item">
                                <label>Площа: </label>{realty.land_area_object}
                            </p>}
                            {realty.material_manufacture_2 && <p className="characteristic-item">
                                <label>Матеріал виготовлення: </label>{realty.material_manufacture_2}
                            </p>}
                            {realty.communications && <p className="characteristic-item">
                                <label>Комунікації: </label>{realty.communications}
                            </p>}
                            {realty.appointment && <p className="characteristic-item">
                                <label>Призначення: </label>{realty.appointment}
                            </p>}
                            {realty.tenants_object && <p className="characteristic-item">
                                <label>Оренда: </label>{realty.tenants_object}
                            </p>}
                            {realty.comfort && <p className="characteristic-item">
                                <label>Зручності: </label>{realty.comfort}
                            </p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RealtyPage;
