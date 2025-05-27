import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Counter } from './Counter';

describe('<Counter />', () => {
    it('Debería mostrar el valor inicial', () => {
        render(<Counter />);
        const counter = screen.getByText('Counter: 0');
        expect(counter).toBeInTheDocument()
    })

    it('Deberia Incrementar el contador', async () => {
        render(<Counter />);
        const button = screen.getByText('Increase');
        await act(() => {
            fireEvent.click(button)
        })

        const counter = screen.getByText('Counter: 1');
        expect(counter).toBeInTheDocument();

    })
})