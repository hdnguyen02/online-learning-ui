
import { useEffect, useState } from 'react';
import {baseUrl, fetchData, showToastError, showToastMessage } from '../../global';
import { useParams } from 'react-router-dom';

function FlipCardComponent() {


    const params = useParams();  
    const [cards, setCards] = useState();
    const [deck, setDeck] = useState();
    const [index, setIndex] = useState(0);
    const accessToken = localStorage.getItem('accessToken');

    async function getCards() {
        const subUrl = `/decks/${params.id}/study-cards`; 
        try { 
            const { data } = await fetchData(subUrl, 'GET'); 
            setCards(data);             
        }
        catch(error) { 
            console.log(error.message);
        }
    }

    async function getDeck() {
        const subUrl = `/decks/${params.id}`;
        try { 
            const response = await fetchData(subUrl, 'GET');
            setDeck(response.data);
        }
        catch(error) {
            console.log(error.message);
        }
    }


    useEffect(() => {
        console.log("FlipCard"); 
        getDeck(); 
        getCards(); 
    }, [])


    function handleNextCard() {
        document.getElementById('card').classList.remove('is-flipped');
        const lenCards = cards.length;
        if (index == lenCards - 1) {
            setIndex(0);
        }
        else {
            setIndex(index + 1);
        }
    }


    function handlePreCard() {
        const lenCards = cards.length;
        if (index == 0) {
            setIndex(lenCards - 1);
        }
        else {
            setIndex(index - 1);
        }
    }


    function front() {
        return <div className='h-full relative flex flex-col items-center justify-center'>
            {action()}
            {cards[index].image && <div className="h-40 flex justify-center">
                <img className="object-contain" src={cards[index].image} loading="lazy"/>
            </div>}
            <p className="text-2xl text-center">{cards[index].term}</p>
        </div>
    }


    function back() {
        return <div className='h-full relative flex flex-col items-center justify-center'>
            {action()}
            <p className="text-2xl text-center">{cards[index].definition}</p>
            {cards[index].example && <p className="text-xl text-center">{cards[index].example}</p>}
        </div>
    }
    async function favoriteCard() {
        const id = cards[index].id
        const card = cards[index]
        const formData = new FormData()
        if (card.isFavorite) { 
            formData.append('isFavourite', false) 
        }
        else { 
            formData.append('isFavourite', true)  
        }
        const url = `${baseUrl}/cards/${id}`
        try {
            const jsonRp = await fetch(url, {   
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: formData
            })
            const response = await jsonRp.json()
            if (!jsonRp.ok) {
                throw new Error(response.message);
            }
            getCards()
        }
        catch (error) {
            console.log(error.message);
        }
    }

    function handleAudio(audioUrl) { 
        const audioPlayer = document.getElementById('audioPlayer')
        audioPlayer.src = audioUrl
        audioPlayer.play()
    }


    const onSwitchFavourite = async (event, id, isFavourite) => { 

        event.stopPropagation();         
        const value = !isFavourite; 
        const subUrl = `/cards/${id}/favourite?value=${value}`; 
        try { 
            await fetchData(subUrl, 'PUT');

            // cập nhập trên giao diện đi. 
            setCards(cards.map(card => { 
                return { 
                    ...card, isFavourite: value
                }
            }))
        }
        catch(error) { 
            const {message} = error; 
            console.log(message); 
        }

        

    }


    function action() {
        return (
            <div className='absolute top-4 right-8 flex items-center gap-x-3'>
                {/* kiểm tra xem có audio hay không */}
                <button onClick={event => {
                    event.stopPropagation()
                    handleAudio(cards[index].audio)
                }}>
                    <i className="fa-solid fa-headphones text-xl"></i>
                </button>

              
                <button onClick={event => onSwitchFavourite(event, cards[index].id, cards[index].isFavourite)}><i className={`fa-regular fa-star text-xl font-light ${cards[index].isFavourite ? 'text-yellow-500' : ''}`}></i></button>
            </div>
        )
    }

    function handleFlipCard(event) {
        event.currentTarget.classList.toggle('is-flipped');
    }

    return (cards && cards.length != 0 &&
        <div className='flex justify-center mt-32'>
            <audio className='hidden' id="audioPlayer" controls></audio>
            <div className="card-container">
                {
                    deck && (<h3 className='font-medium'>Bộ thẻ: { deck.name }</h3>)
                } 
                <div className="mt-12 card mx-auto" id="card" onClick={handleFlipCard}>
                    <div className="card-front">
                        {front()}
                    </div>
                    <div className="card-back">
                        {back()}
                    </div>
                </div>
                <div className='flex gap-x-6 justify-center items-center mt-5'>
                    <button onClick={handlePreCard} className="bg-[#F0F6F6] h-12 w-12 rounded-full"><i className="fa-solid fa-chevron-left text-xl"></i></button>
                    <span className='text-xl'>{index + 1}/{cards.length}</span>
                    <button onClick={handleNextCard} className="bg-[#F0F6F6] h-12 w-12 rounded-full"><i className="fa-solid fa-chevron-right text-xl"></i></button>
                </div>
            </div>
        </div>
    )
}

export default FlipCardComponent;