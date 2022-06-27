import React from "react";
// import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import About from "./About";

const content = {
    name: "Jose Luis Fernández Orjuela",
    profession: "Estudiante de desarrollo web Full-Stack",
}


test("The component must have a text indicating the author's profession", () => {
    const component = render(<About />)
    expect(component.container).toHaveTextContent(content.profession)
})

test("There should be two level one headings, specifying about, name of the author and the project", () => {
    const { container } = render(<About />)
    let h1 = container.querySelectorAll('h1');
    //[role="listitem"]
    expect(h1.length).toEqual(3);
})

test("There must be three level 5 heading text components", () => {
    const { container } = render(<About />)
    let h5 = container.querySelectorAll('h5');
    expect(h5.length).toEqual(3);
})

test("There must be an unordered list", () => {
    const { container } = render(<About />)
    let ul = container.querySelectorAll('ul');
    expect(ul.length).toEqual(1);
})

test("The unordered list must have seven items", () => {
    const { container } = render(<About />)
    let li = container.querySelectorAll('li');
    expect(li.length).toEqual(7);
})