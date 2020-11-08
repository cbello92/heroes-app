import React from 'react';
import { mount } from 'enzyme';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';

describe('Pruebas en <LoginScreen />', () => {
    test('debe de mostrarse correctamente', () => {

        const contextvalues = {
            dispatch: jest.fn(),
            user: {
                logged: false
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextvalues}>
                <LoginScreen />
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('debe de realizar dispatch y la navegacion', () => {
        const contextvalues = {
            dispatch: jest.fn()
        }

        const history = {
            replace: jest.fn()
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextvalues}>
                <LoginScreen history={history} />
            </AuthContext.Provider>
        );

        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();

        expect(contextvalues.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Camilo'
            }
        });

        expect(history.replace).toHaveBeenCalled();

        localStorage.setItem('lastPath', '/dc');

        handleClick();

        expect(history.replace).toHaveBeenCalledWith('/dc');
    });
});