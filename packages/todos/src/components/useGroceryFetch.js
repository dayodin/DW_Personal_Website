import { useState, useEffect } from "react";
import { groceryFetcher } from "./groceryFetcher";

export function useGroceryFetch(source) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [groceryData, setGroceryData] = useState([]);

    useEffect(() => {
        let isStale = false;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            setGroceryData([]);
            
            try {
                const data = await groceryFetcher.fetch(source);
                if (!isStale) {
                    setGroceryData(data.map(item => ({ name: item.name, price: item.price })));
                }
            } catch (error) {
                if (!isStale) {
                    setError(true);
                }
            }
            if (!isStale) {
                setIsLoading(false);
            }
        };

        fetchData();
        return () => {
            isStale = true;
        };
    }, [source]);

    return { isLoading, error, groceryData };
}