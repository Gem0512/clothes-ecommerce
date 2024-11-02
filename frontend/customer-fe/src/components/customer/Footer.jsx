import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo hoặc tên website */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">YourWebsite</h1>
        </div>

        {/* Các liên kết quan trọng */}
        <div className="flex space-x-6">
          <a href="/about" className="hover:underline">{t('about_us')}</a>
          <a href="/contact" className="hover:underline">{t('contact_us')}</a>
          <a href="/privacy" className="hover:underline">{t('privacy_policy')}</a>
          <a href="/terms" className="hover:underline">{t('terms_of_service')}</a>
        </div>

        {/* Các liên kết mạng xã hội */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <svg className="h-6 w-6 fill-current hover:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M22 0h-20c-1.104 0-2 .896-2 2v20c0 1.104.896 2 2 2h10v-9h-3v-4h3v-3c0-2.485 1.515-4 3.72-4 1.048 0 1.948.078 2.209.113v2.558h-1.518c-1.189 0-1.42.566-1.42 1.395v1.934h3l-.391 4h-2.609v9h5.047c1.104 0 2-.896 2-2v-20c0-1.104-.896-2-2-2z"/></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <svg className="h-6 w-6 fill-current hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.83.656-2.828.775 1.017-.611 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.719 0-4.924 2.205-4.924 4.924 0 .386.044.762.128 1.124-4.09-.205-7.719-2.165-10.148-5.144-.424.729-.666 1.577-.666 2.481 0 1.711.871 3.223 2.188 4.107-.807-.026-1.566-.247-2.228-.616v.062c0 2.39 1.698 4.382 3.951 4.834-.414.113-.849.173-1.296.173-.317 0-.626-.03-.927-.087.627 1.956 2.445 3.379 4.6 3.419-1.685 1.32-3.808 2.105-6.115 2.105-.398 0-.79-.023-1.175-.068 2.18 1.397 4.768 2.212 7.548 2.212 9.054 0 14.001-7.505 14.001-14.001 0-.213-.005-.426-.014-.637.962-.695 1.797-1.562 2.457-2.549z"/></svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <svg className="h-6 w-6 fill-current hover:text-pink-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.322 3.608 1.297.975.975 1.235 2.242 1.297 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.322 2.633-1.297 3.608-.975.975-2.242 1.235-3.608 1.297-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.322-3.608-1.297-.975-.975-1.235-2.242-1.297-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.322-2.633 1.297-3.608.975-.975 2.242-1.235 3.608-1.297 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.67.014-4.947.072-1.436.062-2.866.331-3.997 1.462-1.131 1.131-1.4 2.561-1.462 3.997-.058 1.276-.072 1.688-.072 4.947s.014 3.671.072 4.947c.062 1.436.331 2.866 1.462 3.997 1.131 1.131 2.561 1.4 3.997 1.462 1.276.058 1.688.072 4.947.072s3.671-.014 4.947-.072c1.436-.062 2.866-.331 3.997-1.462 1.131-1.131 1.4-2.561 1.462-3.997.058-1.276.072-1.688.072-4.947s-.014-3.671-.072-4.947c-.062-1.436-.331-2.866-1.462-3.997-1.131-1.131-2.561-1.4-3.997-1.462-1.276-.058-1.688-.072-4.947-.072z"/><path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.441 0 .796.645 1.441 1.441 1.441.796 0 1.441-.645 1.441-1.441 0-.796-.645-1.441-1.441-1.441z"/></svg>
          </a>
        </div>
      </div>

      {/* Thông tin bản quyền */}
      <div className="mt-8 text-center text-sm text-gray-400">
      {t('version')}
      </div>
    </footer>
  );
}

export default Footer;
