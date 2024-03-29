import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ShoppingCart from "./ShoppingCart";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

describe("ShoppingCart component", () => {
    it("renders", () => {
        const cartItems = [];
        const {container} = render(
            <MemoryRouter>
            <ShoppingCart cartItems={cartItems} />
            </MemoryRouter>);
        expect(container).toMatchSnapshot();
    });

    it("renders shopping cart item", () => {
        const cartItems = [{ id: 1, name: "Item1", quantity: 1, price: 10 }];
        render(
            <MemoryRouter>
            <ShoppingCart cartItems={cartItems} />
            </MemoryRouter>);
        screen.getByText("Item1");
        screen.getByText("1");
        screen.getAllByText("10");
    });

    it("renders multiple items", () => {
        const cartItems = [
            { id: 1, name: "Item1", quantity: 1, price: 10 },
            { id: 2, name: "Item2", quantity: 2, price: 20 },
        ];

        render(
            <MemoryRouter>
            <ShoppingCart cartItems={cartItems} />
            </MemoryRouter>);
        screen.getByText("Item1");
        screen.getByText("1");
        screen.getByText("10");

        screen.getByText("Item2");
        screen.getByText("2");
        screen.getByText("20");
    });

    it("renders correct sum for single item", () => {
        const cartItems = [{ id: 1, name: "Item1", quantity: 3, price: 10 }];
        render(
            <MemoryRouter>
            <ShoppingCart cartItems={cartItems} />
            </MemoryRouter>);
        screen.getByText("30");
    });

    it("renders correct sum for multiple items", () => {
        const cartItems = [
            { id: 1, name: "Item1", quantity: 3, price: 10 },
            { id: 2, name: "Item2", quantity: 2, price: 20 },
        ];
        render(
            <MemoryRouter>
            <ShoppingCart cartItems={cartItems} />
            </MemoryRouter>);
        screen.getByText("70");
    });

    it("renders message when shopping cart is empty", () => {
        const cartItems = [];
        render(
            <MemoryRouter>
            <ShoppingCart cartItems={cartItems} />
            </MemoryRouter>);
        screen.getByText("You haven't added any items to the shopping cart.");
    });

    it("renders delete item button", () => {
        const cartItems = [{ id: 1, name: "Item1", quantity: 3, price: 10 }];
        render(
        <MemoryRouter>
        <ShoppingCart cartItems={cartItems} />
        </MemoryRouter>);
        screen.getByRole("button", { name: "delete-shopping-cart-item" });
    });

    it("can click delete item button", async () => {
        const cartItems = [{ id: 1, name: "Item1", quantity: 3, price: 10 }];
        const user = userEvent.setup();

        const deleteItemMock = jest.fn();
        render(
            <MemoryRouter>
            <ShoppingCart cartItems={cartItems} onDeleteItem={deleteItemMock} />
            </MemoryRouter>
        );
        const deleteItemButton = screen.getByRole("button", {
            name: "delete-shopping-cart-item",
        });
        await user.click(deleteItemButton);

        expect(deleteItemMock).toBeCalled();
    });
});
