import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { Spinner } from "./Spinner";

const MDN_URL = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";

/**
 * Creates and returns a new promise that resolves after a specified number of milliseconds.
 *
 * @param {number} ms the number of milliseconds to delay
 * @returns {Promise<undefined>} a promise that resolves with the value of `undefined` after the specified delay
 */
function delayMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function GroceryPanel(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [groceryData, setGroceryData] = useState([]);

    function handleAddTodoClicked(item) {
        const todoName = `Buy ${item.name} (${item.price.toFixed(2)})`;
        props.newTask(todoName)
    }

    const onDropdownChange = (event) => {
        setError(null)
        setGroceryData([])

        if (event.target.value == "") { 
             
            
        }
        else { 
            const items = fetchData(event.target.value); 
            
            setIsLoading(!isLoading)
            delayMs(2000).then(() => {
                items.then((data) => {
                    setGroceryData(data.map(item => {
                        return {
                            name: item.name,
                            price: item.price
                        }
                    }))
                }).catch((error) => {
                    setError(true)
                })
                setIsLoading(false)
            })
        }
    }

    async function fetchData(url) {

        const response = await fetch(
            url,
        )
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }

    return (
        <div>
            <h1 className="text-xl font-bold mt-6">Groceries prices today</h1>
            <label className="mb-4 flex gap-4 items-center">
                Get prices from:
                <select disabled={isLoading} 
                        onChange={onDropdownChange}
                        className="border border-gray-300 p-1 rounded-sm disabled:opacity-50">
                    <option value="">(None selected)</option>
                    <option value={MDN_URL}>MDN</option>
                    <option value="invalid">Who knows?</option>
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
            {
                props.items.map(item =>
                    <PriceTableRow
                        key={item.name}
                        item={item}
                        onAddClicked={() => props.onAddClicked(item)}
                    />
                )
            }
            </tbody>
        </table>
    );
}

function PriceTableRow({item, onAddClicked}) {
    const buttonClasses = `italic px-2 rounded-sm border border-gray-300
        hover:bg-gray-100 active:bg-gray-200 cursor-pointer ml-5`;
    return (
        <tr>
            <td>{item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>
                <button className={buttonClasses} onClick={onAddClicked}>
                    Add to todos
                </button>
            </td>
        </tr>
    );
}
