import React, { useEffect, useState } from 'react'


export const useBagStore = () => {
    const clave = 'bolsa';

    // Estado local sincronizado con localStorage
    const [bolsa, setBolsa] = useState([]);

    // Inicializar desde localStorage al montar
    useEffect(() => {
        const guardados = localStorage.getItem(clave);
        if (guardados && guardados.length > 0) {
            try {
                const parsed = JSON.parse(guardados);
                if (Array.isArray(parsed)) {
                    setBolsa(parsed);
                }
            } catch (error) {
                console.warn(`Error al parsear '${clave}' desde localStorage`, error);

            }
        } else localStorage.setItem(clave, JSON.stringify([]));
    }, []);

    // Sincronizar cada vez que cambia el estado
    useEffect(() => {

        if (bolsa.length > 0) localStorage.setItem(clave, JSON.stringify(bolsa));
    }, [bolsa]);

    // Agregar o eliminar un favorito
    const toggleBag = (item, quantity) => {
        const findElement = bolsa.find(element => element.product.product_id == item.product.product_id)

        if (findElement) {
            const deleteBag = bolsa.filter(element => element.product.product_id != item.product.product_id)
            setBolsa(deleteBag)
            localStorage.setItem(clave, JSON.stringify(deleteBag))
        } else {
            const bag = { ...item, quantity }
            setBolsa(prev => [...prev, bag])
        }

    };

    const editQuantity = (item, quantity) => {
        const edit_quantity = bolsa.map(element =>
            element.product.product_id == item.product.product_id
                ? { ...element, quantity: quantity }
                : element
        );

        setBolsa(edit_quantity);
    };

    // Verificar si un ítem está marcado como favorito
    const isBag = (element) => {
        const getBag = bolsa.find(item => item.product.product_id == element.product.product_id)
        console.log(getBag)

        if (!getBag) return {active: false, quantity: 0}
        return {active: true, quantity: getBag.quantity}
    }

    

    return {
        bolsa,
        toggleBag,
        isBag,
        editQuantity
    };
}
