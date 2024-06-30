import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { baseUrl, version } from '../global'
import { Link } from 'react-router-dom'



function PrepareStudy() {


    const [deck, setDeck] = useState()

    const params = useParams()

    async function fetchDeck(id) {
        const accessToken = localStorage.getItem('accessToken')
        const url = `${baseUrl}${version}/decks/${id}`

        const jsonRp = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        const response = await jsonRp.json()
        setDeck(response.data)
    }

    useEffect(() => {
        fetchDeck(params.id)
    }, [])


    return <div>
        <Link to={"/decks"} className='flex items-center gap-x-3 cursor-pointer text-blue-600 underline'>
            <img className='w-5 h-5' src="../../public/back.png" alt="" />
            <span>Chi tiết bộ thẻ</span>
        </Link>

        <div className="mt-10 flex justify-between items-center">

            {deck &&
                <div className="flex flex-col gap-y-6">
                    <div>
                        <span className="font-medium italic">Tên bộ thẻ: </span>
                        <span>{deck.name}</span>
                    </div>
                    <div>
                        <span className="font-medium italic">Mô tả:</span>
                        <span>{deck.description}</span>
                    </div>
                    {/* <div className="flex items-center">
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900">Thẻ yêu thích</label>
                    </div>
                    <div className="flex items-center">
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900">Thẻ chưa thuộc</label>
                    </div>
                    <div>
                        <p className="text-red-500">Lưu ý: học tất cả nếu không chọn mục nào</p>
                    </div> */}
                </div>
            }

            <div className="flex flex-col gap-y-3">
                <Link to={`/decks/${params.id}/create-cards`} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Thêm thẻ
                </Link>
                <Link to={`/decks/${params.id}/learn-cards`} className="text-center bg-ctgray hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded">Học thẻ</Link>
            </div>
        </div>
    </div>
}

export default PrepareStudy