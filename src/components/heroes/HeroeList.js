import React, { useMemo } from 'react'
import { getHeroeByPublisher } from '../../selectors/getHeroeByPublisher'
import { HeroeCard } from './HeroeCard';

export const HeroeList = (props) => {
    const { publisher } = props;

    const heroes = useMemo(() => getHeroeByPublisher(publisher), [publisher])
    return (
        <div className="card-columns animate__animated animate__fadeIn">
            {
                heroes.map(heroe => (
                    <HeroeCard
                        key={heroe.id}
                        {...heroe}
                    />
                ))
            }
        </div>
    )
}