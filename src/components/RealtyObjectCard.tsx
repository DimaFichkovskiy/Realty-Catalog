import placeholder from "../assets/images/placeholder.png";
import {Link} from "react-router-dom";

interface RealtyPhoto {
    id: number;
    url: string;
}

interface RealtyObject {
    id: number;
    title: string;
    description: string;
    price: number;
    photos: [RealtyPhoto];
}

interface Props {
    realty_object: RealtyObject
}

function RealtyObjectCard({realty_object}: Props) {
    return (
        <div className="card">
            <div className="card-left">
                <h2>{realty_object.title}</h2>
                <div className="price">{realty_object.price} $</div>
                <div className="details">
                    {realty_object.description}
                </div>
                <Link to={`/object/${realty_object.id}`} className="button">Переглянути</Link>
            </div>
            <div className="card-right">
                <div className="images">
                    {realty_object.photos.slice(0, 4).map(item => (
                        <img key={item.id} src={item.url} alt="Фото нерухомості"/>
                    ))}
                    {[...Array(Math.max(4 - realty_object.photos.length, 0))]
                        .map((_, index) => (
                            <img src={placeholder} alt="Фото заглушка"/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default RealtyObjectCard;
