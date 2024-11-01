"use client";
import React from 'react';

const EmptyDashboard: React.FC = () => {
    return (
        <div className="grid place-items-center h-full bg-inherit">
            <div className="flex flex-col gap-8 items-center justify-center">
                <p className="font-bold text-lg text-L828fa3">This board is empty. Create a new column to get started.</p>
                <button className="w-2/4 text-transform:capitalize rounded-full bg-L635fc7 p-4 text-base font-bold text-white">
                    + add new column
                </button>
            </div>
        </div>
    )
}

export default EmptyDashboard;