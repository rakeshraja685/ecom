import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import '@testing-library/jest-dom';

// Mock next/link
jest.mock('next/link', () => {
    return ({ children }) => {
        return children;
    }
});

// Mock lucide-react
jest.mock('lucide-react', () => ({
    ShoppingCart: () => <div>CartIcon</div>,
    User: () => <div>UserIcon</div>,
    Menu: () => <div>MenuIcon</div>,
    X: () => <div>XIcon</div>,
}));

describe('Navbar', () => {
    it('renders logo', () => {
        render(<Navbar />);
        expect(screen.getByText('LuxeCart')).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        render(<Navbar />);
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Shop')).toBeInTheDocument();
    });
});
