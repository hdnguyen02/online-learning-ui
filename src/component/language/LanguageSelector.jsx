import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
      <img
  src={i18n.language === 'vi' 
    ? "https://media.istockphoto.com/id/864417828/vi/vec-to/c%E1%BB%9D-vi%E1%BB%87t-nam.jpg?s=1024x1024&w=is&k=20&c=7RVaCBsvVEe75DcjphCaeJGV6nrDxEVE8Z0iYcEOqxk="
    : "https://imgproxy7.tinhte.vn/RNzAb5pRNbyb5mbYzkHx0WTlUiRIbx2Kjey9FVgyhM0/w:400/plain/https://photo2.tinhte.vn/data/attachment-files/2022/12/6238921_tinhte-co-uk-1.png"}
  alt={i18n.language === 'vi' ? "Vietnamese" : "English"}
  onClick={() => setIsOpen(!isOpen)}
  className="w-9 h-9 rounded-full cursor-pointer hover:opacity-80 transition-opacity duration-150"
/>
      </div>

      {isOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <li>
            <a
              onClick={() => handleLanguageChange('en')}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src='https://imgproxy7.tinhte.vn/RNzAb5pRNbyb5mbYzkHx0WTlUiRIbx2Kjey9FVgyhM0/w:400/plain/https://photo2.tinhte.vn/data/attachment-files/2022/12/6238921_tinhte-co-uk-1.png'
                alt="English"
                className="w-5 h-5 rounded-full"
              />
              <span className="ml-2">English</span>
              {i18n.language === 'en' && <i className="fa fa-check text-success ml-2"></i>}
            </a>
          </li>
          <li>
            <hr className="my-1 border-gray-300" />
          </li>
          <li>
            <a
              onClick={() => handleLanguageChange('vi')}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src="https://media.istockphoto.com/id/864417828/vi/vec-to/c%E1%BB%9D-vi%E1%BB%87t-nam.jpg?s=1024x1024&w=is&k=20&c=7RVaCBsvVEe75DcjphCaeJGV6nrDxEVE8Z0iYcEOqxk=" // Đường dẫn tới hình ảnh quốc kỳ của tiếng Việt
                alt="Vietnamese"
                className="w-5 h-5 rounded-full"
              />
              <span className="ml-2">Tiếng Việt</span>
              {i18n.language === 'vi' && <i className="fa fa-check text-success ml-2"></i>}
            </a>
          </li>
          {/* Thêm các ngôn ngữ khác tại đây */}
        
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
