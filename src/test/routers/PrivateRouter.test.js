import React from 'react'
import { mount } from "enzyme";
import { PrivateRouter } from "../../routers/PrivateRouter";
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas en <PrivateRouter />', () => {
    const props = {
        location: {
            pathname: '/marvel'
        }
    }


    Storage.prototype.setItem = jest.fn();

    test('debe de mostrar el componente si esta autenticado y guardar localStorage', () => {

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRouter
                    isAuthenticated={true}
                    component={() => <span>Listo</span>}
                    {...props}
                />
            </MemoryRouter>
        );

        expect(wrapper.find('span').exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');
    });

    test('debe de bloquear si no esta autenticado', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRouter
                    isAuthenticated={false}
                    component={() => <span>Listo</span>}
                    {...props}
                />
            </MemoryRouter>
        );

        expect(wrapper.find('span').exists()).toBe(false);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');
    })
    

});