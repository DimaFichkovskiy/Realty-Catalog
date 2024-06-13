import {useState} from "react";
import {useNavigate} from "react-router-dom";
import searchIcon from '../assets/images/search.png'

function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search/${searchQuery}`);
            setSearchQuery('');
        }
    };

    return (
        <>
            <a className='logo' href="/">Realty Catalog</a>
            <form className='search-form' onSubmit={handleSearchSubmit}>
                <input
                    type='text'
                    placeholder='Пошук...'
                    className='search-form-input'
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button type='submit' className='search-form-button'>
                    <img src={searchIcon} alt='Search'/>
                </button>
            </form>
        </>
    );
}

export default Header;
