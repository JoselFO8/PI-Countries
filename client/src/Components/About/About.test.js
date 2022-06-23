import React from "react";
// import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import About from "./About";

const content = {
    title: "About",
    body: "CAMBIAR The App is an online app that originated in May 2022, with its roots planted in knowledge of the React library in Henry's course. The application connects to external databases to identify the meteorology (weather and climate) of different cities. Its development based in Mosquera-Colombia, is headed by Jose Fernández as lead developer."
}

test('The component must have as title: "About"', () => {
    const component = render(<About />)
    expect(component.container).toHaveTextContent(content.title)
})

test('The component should have a text describing about', () => {
    const {getByRole} = render(<About />);
    expect(getByRole('heading', {level: 5}))
})