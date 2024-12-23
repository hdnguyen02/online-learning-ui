import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import { fetchData, showToastMessage } from "../../../global";
import { ToastContainer } from "react-toastify";
const ShareModal = ({ idDeckShare, isOpen, onClose }) => {

  const [selectAllOwned, setSelectAllOwned] = useState(false);
  const [selectAllParticipated, setSelectAllParticipated] = useState(false);

  const handleSelectAllOwned = (e) => {
    setSelectAllOwned(e.target.checked);
    setOwnerGroups(ownerGroups.map(group => ({ ...group, selected: e.target.checked })));
  };

  const handleSelectAllParticipated = (e) => {
    setSelectAllParticipated(e.target.checked);
    setGroupsAttendance(groupsAttendance.map(group => ({ ...group, selected: e.target.checked })));
  };

  const handleOwnedGroupChange = (id) => {
    const updatedGroups = ownerGroups.map(group =>
      group.id === id ? { ...group, selected: !group.selected } : group
    );
    setOwnerGroups(updatedGroups);
    setSelectAllOwned(updatedGroups.every(group => group.selected));
  };

  const handleParticipatedGroupChange = (id) => {
    const updatedGroups = groupsAttendance.map(group =>
      group.id === id ? { ...group, selected: !group.selected } : group
    );
    setGroupsAttendance(updatedGroups);
    setSelectAllParticipated(updatedGroups.every(group => group.selected));
  };

  const handleShare = async () => {
    const selectedGroups = [
      ...ownerGroups.filter(group => group.selected),
      ...groupsAttendance.filter(group => group.selected)
    ];

    if (selectedGroups.length == 0) return; 
    // nhận vào kết quả.
    const payload = {
      idDeck: idDeckShare, 
      idGroups: selectedGroups.map(selectedGroup => selectedGroup.id) 
    }

    try { 
      const subUrl = '/decks/share';
      await fetchData(subUrl,'POST', payload);  
      showToastMessage("Chia sẽ bộ thẻ thành công!"); 
    }
    catch(error) { 
      console.log(error.message); 
    }
    onClose();
  };

  const [ownerGroups, setOwnerGroups] = useState(); 
  const [groupsAttendance, setGroupsAttendance] = useState(); 
  const getGroups = async () => {
    const subUrl = '/groups'; 
    try { 
      const { data } = await fetchData(subUrl, 'GET'); 
      setOwnerGroups(data.ownerGroups.map(ownerGroup => { 
        return { id: ownerGroup.id, name: ownerGroup.name, selected: false, image: "https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_1280.png" }
      })); 
      setGroupsAttendance(data.groupsAttendance.map(groupAttendance => {
        return {id: groupAttendance.id, name: groupAttendance.name, selected: false, image:"https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_1280.png"}
      })); 
    }
    catch(error) { 
      console.log(error.message); 
    }
    
  }

  useEffect(() => {
    if (!isOpen) return;  
    getGroups(); 
  }, [isOpen]); 

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <ToastContainer/>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

        <div className="relative bg-white rounded-lg w-full max-w-md p-6 shadow-xl transition-all transform">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Chia sẽ bộ thẻ</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoMdClose className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Chọn nhóm bạn muốn chia sẻ bộ thẻ của mình.
          </p>

          <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
            {/* Owned Groups Section */}
            <div>
              <div className="flex items-center mb-4 sticky top-0 bg-white py-2">
                <input
                  type="checkbox"
                  checked={selectAllOwned}
                  onChange={handleSelectAllOwned}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-lg font-medium text-gray-700">Nhóm của bạn</span>
              </div>

              <div className="space-y-3">
                {ownerGroups?.map((group) => (
                  <div key={group.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={group.selected}
                      onChange={() => handleOwnedGroupChange(group.id)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-10 h-10 rounded-full ml-3 object-cover"
                    />
                    <span className="ml-3 text-gray-700">{group.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Participated Groups Section */}
            <div>
              <div className="flex items-center mb-4 sticky top-0 bg-white py-2">
                <input
                  type="checkbox"
                  checked={selectAllParticipated}
                  onChange={handleSelectAllParticipated}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-lg font-medium text-gray-700">Nhóm tham gia</span>
              </div>

              <div className="space-y-3">
                {groupsAttendance?.map((group) => (
                  <div key={group.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={group.selected}
                      onChange={() => handleParticipatedGroupChange(group.id)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-10 h-10 rounded-full ml-3 object-cover"
                    />
                    <span className="ml-3 text-gray-700">{group.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleShare}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <FaShare className="mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;