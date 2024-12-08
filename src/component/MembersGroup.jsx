import Empty from "./Empty";
export default function MembersGroup({ members }) {
  return (
    <div>
      <h3 className="text-sm text-gray-700 dark:text-white">Member</h3>

      {/*  danh sách thành viên */}

      {members.length != 0 ? (
        members.map((member, index) => (
          <div
            key={index}
            className="mt-3 bg-[#F0F6F6] py-2 px-8 flex items-center justify-between"
          >
            <div className=" flex items-center gap-x-4">
              <div className="h-10 w-10 rounded-full overflow-hidden cursor-pointer">
                <img
                  src={member.avatar ? member.avatar : "/user.png"}
                  loading="lazy"
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <span className="font-medium text-lg">
                {member.firstName + " " + member.lastName}
              </span>
            </div>
            <div className="flex gap-x-3">
            {member.roles.map((role, index) => {
              return (
                <span
                  key={index}
                  className="lowercase text-xs bg-gray-300 p-1 rounded-lg"
                >
                  {role}
                </span>
              );
            })}
            </div>
            

            {/* hiển thị thêm role */}
          </div>
        ))
      ) : (
        <Empty />
      )}
      <div></div>
    </div>
  );
}
