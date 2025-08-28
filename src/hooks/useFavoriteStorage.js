import { useEffect, useState } from 'react';

export const useFavoriteStorage = () => {
    const clave = 'favoritos';

    // Estado local sincronizado con localStorage
    const [favoritos, setFavoritos] = useState([]);

    // Inicializar desde localStorage al montar
    useEffect(() => {
        const guardados = localStorage.getItem(clave);
        if (guardados && guardados.length > 0) {
            try {
                const parsed = JSON.parse(guardados);
                if (Array.isArray(parsed)) {
                    setFavoritos(parsed);
                }
            } catch (error) {
                console.warn(`Error al parsear '${clave}' desde localStorage`, error);

            }
        } else localStorage.setItem(clave, JSON.stringify([]));
    }, []);

    // Sincronizar cada vez que cambia el estado
    useEffect(() => {

        if (favoritos.length > 0) localStorage.setItem(clave, JSON.stringify(favoritos));
    }, [favoritos]);

    // Agregar o eliminar un favorito
    const toggleFavorite = (item) => {
        const findElement = favoritos.find(element => element.product.product_id == item.product.product_id)

        if (findElement) {
            const deleteFavorite = favoritos.filter(element => element.product.product_id != item.product.product_id)
            setFavoritos(deleteFavorite)
            localStorage.setItem(clave, JSON.stringify(deleteFavorite))
        } else {
            setFavoritos(prev => [...prev, item])
        }

    };

    // Verificar si un ítem está marcado como favorito
    const isFavorite = (element) => {
        const getFavorite = favoritos.find(item => item.product.product_id == element.product.product_id)

        if (!getFavorite) return false
        return true
    }


    return {
        favoritos,
        toggleFavorite,
        isFavorite
    };
};
