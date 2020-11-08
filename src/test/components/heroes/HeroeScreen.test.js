import React from 'react';
import { mount } from 'enzyme';
import { HeroeScreen } from '../../../components/heroes/HeroeScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <HeroeScreen />', () => {
    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    };

    
    test('debe de mostrar el componente redirect si no hay argumentos en el URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe']}>
                <HeroeScreen history={history} />
            </MemoryRouter>
        );
        expect(wrapper.find('Redirect').exists()).toBe(true);
    })


    test('debe de mostrar un heroe si el parametro existe y se encuentra', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/marvel-spider']}>
                <Route path="/heroe/:heroeId" component={HeroeScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true);
    })


    test('debe de regresar anterior con PUSH', () => {

        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        };
        

        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/marvel-spider']}>
                <Route 
                    path="/heroe/:heroeId" 
                    component={() => <HeroeScreen history={history} />} 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalled();
    })

    test('debe de regresar anterior con GOBACK', () => {        

        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/marvel-spider']}>
                <Route 
                    path="/heroe/:heroeId" 
                    component={() => <HeroeScreen history={history} />} 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.goBack).toHaveBeenCalled();
        expect(history.push).toHaveBeenCalledTimes(0);
    })


    test('debe de llamar el Redirect si el heroe no existe', () => {        

        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/marvel-spider123123213123']}>
                <Route 
                    path="/heroe/:heroeId" 
                    component={() => <HeroeScreen history={history} />} 
                />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('');

    })
    
});