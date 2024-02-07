/**
 * @jest-environment jsdom
 */
import ViewBuyers from "./ViewBuyers";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";



describe("Buyers/ViewBuyers tests", () => {

    
  it("should render the buyers table correctly", () => {
    //arrange
    const props = {
      //ViewBuyers: () => {},
      buyers: [],
    };
    //act
    render(
      <MemoryRouter>
        <ViewBuyers {...props} />
      </MemoryRouter>
    );
    //assert
    const bokingsTableElement = screen.getByTestId("buyer-table");
    expect(bokingsTableElement).toBeInTheDocument();
  });

  it("should detect that the  delete button has been pressed", () => {
    //arrange
    const props = {
      DeleteBuyer: jest.fn(),
      buyers: [
        {
          firstName: "Monty",
          surname: "Dog",
          address: "Very Rich Street, London",
          postcode: "W1",
          phone: "",
          id: "3",
        },
      ],
    };
    render(
      <MemoryRouter>
        <ViewBuyers {...props} />
      </MemoryRouter>
    );

    //act
    const confirmDeleteButton = screen.getByTestId("btnDelete");
    fireEvent.click(confirmDeleteButton);
    

    //assert
    expect(props.DeleteBuyer).toHaveBeenCalledWith(props.buyers[0].id);
    //expect(props.DeleteBuyer).toHaveBeenCalled();
  });
});
