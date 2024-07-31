
function Home() {
  return (
    <div className="my-[60px] w-full">
       <img className="w-full" src="/study.jpg" loading="lazy" alt=""/>
      <div className="mt-12 flex gap-x-12 px-48">
        <div className="flex flex-col justify-around w-1/2">
          <h2 className="text-2xl font-bold">Search and create card set</h2>
          <p className="font-light tracking-wide text-xl" >Get exactly what you need to study. For a fun way to study on flashcards, play a popular learning game like Match.</p>
          <button type="button" className="w-32 h-12 text-white bg-[#1D4ED8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            Try it now
          </button>
        </div>
        <div className="w-1/2 flex items-center">
          <img src="/preview-fashcard.avif" loading="lazy" className="w-full" alt="" />
        </div>       
      </div>
    </div>
  )
}

export default Home
