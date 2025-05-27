import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Calculator } from './Calculator'

describe('<Calculador />', () => {
    const useCasesTest = [
        { a: 1, b: 2, operation: 'add', expected: 3 },
        { a: 3, b: 2, operation: 'multiply', expected: 6 },
        { a: 3, b: 0, operation: 'divide', expected: 'Error' }
    ]

    it.each(useCasesTest)('Deberia retornar $expected cuando $a y $b son $operation', ({ a, b, operation, expected }) => {
        render(<Calculator a={a} b={b} operation={operation} />)
        const result = screen.getByText(`Result: ${expected}`)

        expect(result).toBeInTheDocument()
    })
})