"use client"
import React, { useEffect } from 'react';

const PDF: React.FC = () => {
    useEffect(() => {
        const preventScreenshot = (e: KeyboardEvent) => {
            if (e.key === 'PrintScreen') {
                alert('Screenshots are not allowed!');
                e.preventDefault();
            }
        };
        
        const preventCopy = (e: ClipboardEvent) => {
            alert('Copying content is not allowed!');
            e.preventDefault();
        };

        document.addEventListener('keydown', preventScreenshot);
        document.addEventListener('copy', preventCopy);

        return () => {
            document.removeEventListener('keydown', preventScreenshot);
            document.removeEventListener('copy', preventCopy);
        };
    }, []);

    return (
        <div className="relative bg-gray-50 p-4 rounded-lg shadow-lg">
            <iframe
                src="https://drive.google.com/file/d/1Y_3C7HhNsXGZ3d9sgJn_OqrSpi5rG8Xx/preview"
                sandbox="allow-scripts allow-same-origin"
                className="w-full h-screen rounded-lg"
            ></iframe>
            <div
                className="w-10 h-10 absolute bg-white right-3 top-3"
            ></div>
        </div>
    );
}

export default PDF;
