import React, { useRef, useMemo } from 'react'
import queryString from 'query-string';
import { HeroeCard } from '../heroes/HeroeCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);

    const inputRef = useRef();
    // const [heroesFiltered, setHeroesFiltered] = useState([]);
    const [values, handleInputChange] = useForm({
        search: q
    });

    const { search } = values;

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);


    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${search}`);
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Search form</h4>

                    <form onSubmit={handleSearch}>
                        <input
                            ref={inputRef}
                            type="text"
                            name="search"
                            value={search}
                            autoComplete="off"
                            placeholder="Find your heroe"
                            className="form-control"
                            onChange={handleInputChange}
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>

                    </form>

                </div>

                <div className="col-7">
                    <h4>Results ({heroesFiltered.length} results)</h4>

                    <hr />


                    {
                        (q === '')
                        &&
                        <div className="alert alert-info">
                            Search a hero
                        </div>
                    }

                    {
                        (q !== '' && heroesFiltered.length === 0)
                        &&
                        <div className="alert alert-danger">
                            There is not a hero with { q }
                        </div>
                    }

                    {
                        heroesFiltered.map(heroe => (
                            <HeroeCard
                                key={heroe.id}
                                {...heroe}
                            />
                        ))
                    }
                </div>

            </div>

        </div>
    )
}
