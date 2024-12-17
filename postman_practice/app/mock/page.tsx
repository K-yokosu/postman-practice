import React, { cache } from "react";

export type ColorType = {
    id: number;
    name: string;
}

const getColors = cache(async (): Promise<ColorType[]> => {
    const colors = await fetch(`${process.env.MOCK_SERVER_URL}/color`, { cache: "no-store" });
    return colors.json();
});

// const getColor = cache(async (): Promise<Color> => {
//     const color = await fetch(`${process.env.MOCK_SERVER_URL}/color?id=1`, { cache: "no-store" });
//     return color.json();
// });

export default async function Page(){
    const colors = await getColors();
    // const color = await getColor();

    return (
        <div>
            <h1>Colors</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {colors.map((color) => (
                        <tr key={color.id}>
                            <td>{color.id}</td>
                            <td>{color.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
