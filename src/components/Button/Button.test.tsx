import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Button } from './Button'

describe('<Button />', () => {
    it('Debería Renderer el botón', () => {
        render(<Button label='click' />);
        const button = screen.getByText('click');
        expect(button).toBeInTheDocument()
    })

    it('Debería llamar a la función onclick', async () => {
        const handleClick = vi.fn();
        render(<Button label='Click' onClick={handleClick} />)
        const button = screen.getByText('Click')
        await act(() => {
            fireEvent.click(button)
        })

        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})