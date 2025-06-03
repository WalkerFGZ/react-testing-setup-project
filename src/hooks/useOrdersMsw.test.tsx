import { Await, MemoryRouter } from 'react-router-dom'
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest'
import { SessionProvider, useSession } from '../context/AuthContext'
import { renderHook, waitFor } from '@testing-library/react'

import useOrders from './useOrders'

vi.mock('../context/AuthContext', async () => {
    const actual = await vi.importActual('../context/AuthContext');
    return {
        ...actual,
        useSession: vi.fn()
    }
})


describe('useOrders MSW', () => {
    const mockUser = { id: '1', name: 'Andres G' };
    beforeEach(() => {
        (useSession as Mock).mockReturnValue({ user: mockUser })
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <SessionProvider>
            <MemoryRouter>
                {children}
            </MemoryRouter>
        </SessionProvider>
    )

    it('Debe obtener bien la información', async () => {
        const { result } = renderHook(() => useOrders(), { wrapper })

        const initialLoading = result.current.loading;
        expect(initialLoading).toBe(true)

        await waitFor(() => {
            const lengthOrders = result.current.orders.length;
            expect(lengthOrders).toBe(1)
        })
    })
})




