import axios from 'axios';
import React from 'react';


interface MapData {
    name: string;
    grid: Grid;
    streets: Streets;
    blocks: Block[][];
    startPoint: Address | null;
    clients: { address: Address }[];
}

interface Grid {
    rows: number;
    cols: number;
    intersectionDistance: number;
}

interface Address {
    street: string;
    houseNumber: number;
    blockId: string;
}

interface Building {
    id: string;
    address: Address;
}

interface Block {
    id: string;
    buildings: Building[];
}

interface Street {
    name: string;
}

interface Streets {
    horizontal: Street[];
    vertical: Street[];
}

const Map: React.FunctionComponent = () => {
    const [mapData, setMapData] = React.useState<MapData | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<Error | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(`${process.env.REACT_APP_API_URL}/map`)
                const data = await response.data;
                setMapData(data);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Функция для рендеринга квартала
    const renderBlock = (block: Block) => (

        <div key={block.id} className="block">
            <h3>{block.id}</h3>
            <ul>
                {block.buildings.map((building) => (
                    <li key={building.id}>
                        {building.address.street} {building.address.houseNumber}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div>
            <h2>{mapData?.name}</h2>
            <p>Rows: {mapData?.grid.rows}, Columns: {mapData?.grid.cols}</p>

            <ul>
                {mapData?.clients.map((client, index) => (
                    <li key={index}>
                        Client {index + 1}: {client.address.street} {client.address.houseNumber}, Block {client.address.blockId}
                    </li>
                ))}
            </ul>

            <div className="grid">
                {mapData?.blocks.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map(renderBlock)}
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Map;