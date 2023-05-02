import { useState } from "react";


export const cardDeckItems = ['0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?'];


type CardDeck = 'Scrum Scale' | 'Fibonacci' | 'Power of two' | 'T-Shirt sizes';


export type OptionsType = {
    cardDeck: CardDeck
    selectedItem: (item: string) => void
}

export const Options = ({ cardDeck, selectedItem }: OptionsType) => {
    const [cardItem, setCardItem] = useState<string>();

    const selectItem = (item: string) => {
        setCardItem(item);
        selectedItem(item);
    }

    return <div className="grid grid-cols-4 gap-4  mt-5">
        {cardDeckItems.map(item => <button className={item === cardItem ? 'bg-blue-300' : 'bg-blue-600'}
            onClick={() => {
                selectItem(item);
            }} key={item}>{item}</button>)}
    </div>


}