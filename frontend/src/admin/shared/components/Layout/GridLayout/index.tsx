import React from 'react';

export type GridItem = {
    id: string;
    content: React.ReactNode;
    colSpan?: number;
};

type GridLayoutProps = {
    items: GridItem[];
    columns: number;
    columnGap?: string;
    rowGap?: string;
};

export const GridLayout: React.FC<GridLayoutProps> = ({
    items,
    columns,
    columnGap = '10px',
    rowGap = '10px',
}) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: `${rowGap} ${columnGap}`,
            }}
        >
            {items.map((item) => (
                <div
                    key={item.id}
                    style={{
                        gridColumn: `span ${item.colSpan ?? 1}`,
                        height: 'auto',
                    }}
                >
                    {item.content}
                </div>
            ))}
        </div>
    );
};
