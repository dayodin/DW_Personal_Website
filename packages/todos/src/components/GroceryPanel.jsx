import React, { useState, useEffect } from "react";

import { useGroceryFetch } from "./useGroceryFetch";
import { Spinner } from "./Spinner";

export function GroceryPanel(props) {
    const [selectedSource, setSelectedSource] = useState("MDN");
    const { isLoading, error, groceryData } = useGroceryFetch(selectedSource);

    function handleAddTodoClicked(item) {
        const todoName = `Buy ${item.name} (${item.price.toFixed(2)})`;
        props.newTask(todoName)
    }

    const onDropdownChange = async (event) => {
        setSelectedSource(event.target.value);
    }

    return (
        <div>
            <h1 className="text-xl font-bold mt-6">Groceries prices today</h1>
            <label className="mb-4 flex gap-4 items-center">
                Get prices from:
                <select disabled={isLoading} value={selectedSource} onChange={onDropdownChange} className="border border-gray-300 p-1 rounded-sm disabled:opacity-50">
                    <option value="MDN">MDN</option>
                    <option value="Liquor store">Liquor store</option>
                    <option value="Butcher">Butcher</option>
                    <option value="whoknows">Who knows?</option>
                </select>
                <div>
                    {isLoading && <Spinner />}
                    {error != null && <p className="text-red-500">Uh oh! Seems the data coundn't be loaded!</p>}
                </div>
            </label>

            {
                groceryData.length > 0 ?
                    <PriceTable items={groceryData} onAddClicked={handleAddTodoClicked} /> :
                    "No data"
            }
        </div>
    );
}

function PriceTable(props) {
    return (
        <table className="mt-4 ml-4">
            <thead>
                <tr>
                    <th className="text-left w-50">Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {props.items.map(item =>
                        <PriceTableRow key={item.name} item={item} onAddClicked={() => props.onAddClicked(item)} />
                )}
            </tbody>
        </table>
    );
}

function PriceTableRow({item, onAddClicked}) {
    const buttonClasses = `italic px-2 rounded-sm border border-gray-300 hover:bg-gray-100 active:bg-gray-200 cursor-pointer ml-5`;
    return (
        <tr>
            <td>{item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>
                <button className={buttonClasses} onClick={onAddClicked}>Add to todos</button>
            </td>
        </tr>
    );
}
