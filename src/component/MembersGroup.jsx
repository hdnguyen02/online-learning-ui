
export default function MembersGroup({ members }) {

    return <div>
        <h3 className="uppercase text-sm text-gray-700">Thành viên</h3>

        {/*  danh sách thành viên */}

        {
            members.map((member, index) => <div key={index} className="mt-3 bg-[#F0F6F6] py-2 px-6 flex items-center gap-x-4">
                <div className='h-16 w-16 rounded-full overflow-hidden cursor-pointer'>
                    <img src={member.avatar ? member.avatar : '/user.png'} loading="lazy" className='w-full h-full' alt='' />
                </div>
                <span className="font-bold text-xl">{member.firstName + " " + member.lastName}</span>
            </div>)
        }

        <div>

        </div>
    </div>

}