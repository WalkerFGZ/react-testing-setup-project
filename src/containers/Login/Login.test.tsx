import { MemoryRouter, useNavigate } from "react-router-dom";
import { Mock, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

import { Login } from "./Login";
import { SessionProvider } from "../../context/AuthContext";
import { getAuth } from "../../services/getAuth";

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockNavigate
    }
})

vi.mock("../../services/getAuth", () => ({
    getAuth: vi.fn(),
}));

const mockNavigate = vi.fn()
const mockGetAuth = getAuth as Mock;


describe("<Login />", () => {
    const handleLogin = () => {
        return render(
            <SessionProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </SessionProvider>
        );
    };

    it.skip("Debería mostrar un mensaje de error", async () => {
        mockGetAuth.mockRejectedValue(new Error("Invalid credentials"));
        handleLogin();
        const usernameInput = screen.getByPlaceholderText("Username");
        const passwordInput = screen.getByPlaceholderText("Password");
        const buttonLogin = screen.getByRole("button", {
            name: "Login",
        });

        await act(() => {
            fireEvent.change(usernameInput, { target: { value: "wrongUser" } });
            fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });
            fireEvent.click(buttonLogin);
        });

        const errorMessage = screen.getByText("Invalid credentials");

        expect(errorMessage).toBeInTheDocument();
    });

    it.skip("Debería redirigir /orders", async () => {
        mockGetAuth.mockResolvedValue({ success: true })
        handleLogin();

        const usernameInput = screen.getByPlaceholderText("Username");
        const passwordInput = screen.getByPlaceholderText("Password");
        const buttonLogin = screen.getByRole("button", {
            name: "Login",
        });

        await act(() => {
            fireEvent.change(usernameInput, { target: { value: "validUser" } });
            fireEvent.change(passwordInput, { target: { value: "validPassword" } });
            fireEvent.click(buttonLogin);
        });

        await waitFor(() => {
            expect(mockGetAuth).toHaveBeenCalledWith('validUser', 'validPassword')
            expect(mockNavigate).toHaveBeenCalledWith('/orders')
        })

    });

    it.skip('Debería mostar la contraseña', async () => {
        handleLogin();
        const passwordInput = screen.getByPlaceholderText("Password");
        const buttonShowPassword = screen.getByRole("button", {
            name: "show"
        })

        await act(() => {
            fireEvent.change(passwordInput, { target: { value: "showPassword" } });
            fireEvent.click(buttonShowPassword);
        });

        const hideButton = screen.getByText("hide")

        expect(hideButton).toBeInTheDocument()

    })

    it('should show password', async () => {
        handleLogin();

        const passwordInput = screen.getByPlaceholderText("Password");
        const buttonTogglePassword = screen.getByRole("button", { name: "show" });

        await act(() => {
            fireEvent.click(buttonTogglePassword);
        });

        expect(passwordInput).toHaveAttribute("type", "text");

        await act(() => {
            fireEvent.click(buttonTogglePassword);
        });

        expect(passwordInput).toHaveAttribute("type", "password");
    });
});
