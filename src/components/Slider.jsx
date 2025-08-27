import React, { useEffect, useState } from 'react'

export const Slider = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        'https://fakegodsbrand.com/cdn/shop/files/DESKTOP_1_f599fe5c-9cb2-4c08-ab89-76d87b0557af.jpg?v=1744209567&width=2000', // Ejemplo de URL de imagen
        'https://fakegodsbrand.com/cdn/shop/files/DESKTOP_2_daafac41-e0be-41b5-bc35-fc7c4fd07fa8.jpg?v=1744209597&width=2000',
        'https://fakegodsbrand.com/cdn/shop/files/DESKTOP_3.jpg?v=1744209611&width=2000'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
    }, [images.length]);

    return (
        <main id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <img src={images[currentImageIndex]} className={`d-block w-100 img-slider img-1`} alt="..." />
        </main>
    )
}
