import React, { useState, useRef, useEffect } from 'react'
import queryString from 'query-string';
import { heroes } from '../../data/heroes'
import { HeroeCard } from '../heroes/HeroeCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = '' } =queryString.parse(location.search);

    const inputRef = useRef();
    const [heroesFiltered, setHeroesFiltered] = useState([]);
    const [values, handleInputChange, reset] = useForm({
        search: q
    });


    const handleSearch = (e) => {
        e.preventDefault();
        
        const { search } = values;
        history.push(`?q=${search}`);

        if (!search || search.length === 0) {
            setHeroesFiltered([]);
            alert("Ingresa el heroe que deseas buscar");
            inputRef.current.focus();
            return;
        }

        let heroesFilter = heroes.filter(x => x.superhero.toLowerCase().includes(search.toLowerCase()));

        setHeroesFiltered(heroesFilter)
        reset();

    }

    // cuando se monta el componente, cuando las dependencias no reciben valor
    useEffect(() => {
        let heroesFilter = heroes.filter(x => x.superhero.toLowerCase().includes(q.toLowerCase()));

        setHeroesFiltered(heroesFilter)
    }, [])

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
                            value={values.search}
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
                    <h4>Results ({ heroesFiltered.length } results)</h4>
                    <hr />

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
