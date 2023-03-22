import React from "react";

type TIcon = {
    width?: number;
    height?: number;
    color?: string;
};
export const ArrowBeforeIcon = ({
    width = 15,
    height = 15,
    color = "#000000",
}: TIcon) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.738 4.43a.75.75 0 0 1 .081 1.058L9.238 12l5.582 6.512a.75.75 0 0 1-1.14.976l-6-7a.75.75 0 0 1 0-.976l6-7a.75.75 0 0 1 1.058-.081Z"
                fill={color}
            />
        </svg>
    );
};

export const ArrowNextIcon = ({
    width = 15,
    height = 15,
    color = "#000000",
}: TIcon) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.262 19.57a.75.75 0 0 1-.081-1.058L14.762 12 9.181 5.488a.75.75 0 1 1 1.139-.976l6 7a.75.75 0 0 1 0 .976l-6 7a.75.75 0 0 1-1.058.081Z"
                fill={color}
            />
        </svg>
    );
};
