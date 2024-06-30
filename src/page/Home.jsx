
function Home() {
  return (
    <div className="my-[60px] w-full">
       <img className="w-full" src="/study.jpg" loading="lazy" alt=""/>

      <div className="mt-12 flex gap-x-12 px-52">
        <div className="flex flex-col justify-around w-1/2">
          <h2 className="text-2xl font-bold">Tìm kiếm và tạo thẻ</h2>
          <p className="font-light tracking-wide text-xl" >Nhận chính xác những gì bạn cần để nghiên cứu. Để có một cách học thú vị trên thẻ nhớ, hãy chơi một trò chơi học tập phổ biến như Match.</p>
          <button type="button" className="w-32 h-12 text-white bg-[#1D4ED8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            Thử ngay
          </button>
        </div>
        <div className="w-1/2 flex items-center">
          <img src="/public/preview-fashcard.avif" loading="lazy" className="w-full" alt="" />
        </div>
      </div>
    </div>

  
  )
}

export default Home
