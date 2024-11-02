import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Button } from '@mui/material';

export function Footer() {
  return (
    <div className="border-t-[1px] px-60 mt-14  pt-8 text-[#3d464d]">
      <div className="grid grid-cols-3  gap-10">
        <div>
          <h2 className="font-bold text-[20px] py-4">Liên hệ</h2>
          <p className="mb-3">Liên hệ ngay nếu bạn có khó khăn khi sử dụng dịch vụ hoặc cần hợp tác.</p>
          <div className="flex flex-col space-y-1">
            <a href="#">
              <span>
                <TelegramIcon fontSize="small"></TelegramIcon> Chat Với hỗ trợ viên
              </span>
            </a>
            <a href="#">
              <span>
                <FacebookIcon fontSize="small"></FacebookIcon> Tạp hóa MMO
              </span>
            </a>
            <a href="#">
              <span>
                <EmailIcon fontSize="small"></EmailIcon> support@taphoammo.net
              </span>
            </a>
            <a href="#">
              <span>
                <AccessTimeIcon fontSize="small"></AccessTimeIcon> Mon-Sat 08:00am - 10:00pm
              </span>
            </a>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-[20px] py-4">Thông tin</h2>
          <p className="mb-2">Một ứng dụng nhằm kết nối, trao đổi, mua bán trong cộng đồng kiếm tiền online.</p>
          <p className="mb-1">Thanh toán tự động, nhận hàng ngay tức thì.</p>
          <div className="flex flex-col space-y-1">
            <a href="#" className="hover:text-green-500">
              Câu hỏi thường gặp
            </a>
            <a href="#" className="hover:text-green-500">
              Điều khoản sử dụng
            </a>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-[20px] py-4">Đăng ký bán hàng</h2>
          <p className="mb-4">
            Tạo một gian hàng của bạn trên trang của chúng tôi. Đội ngũ hỗ trợ sẽ liên lạc để giúp bạn tối ưu khả năng
            bán hàng.
          </p>
          <div className="pl-2 mb-4">
            <Button
              variant="contained"
              size="medium"
              color="success"
              style={{ textTransform: 'none', fontWeight: 600, width: '120px', backgroundColor: '#22c55e' }}
            >
              Tham gia
            </Button>
          </div>
          <div>
            <p className="mb-2">Theo dõi chúng tôi trên mạng xã hội</p>
            <div className="flex space-x-2">
              <div className="w-9 h-9 rounded-full bg-yellow-400 flex justify-center items-center hover:opacity-90">
                <RssFeedIcon></RssFeedIcon>
              </div>
              <div className="w-9 h-9 rounded-full bg-red-600 flex justify-center items-center hover:opacity-90 cursor-pointer ">
                <YouTubeIcon style={{ color: 'white' }}></YouTubeIcon>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#007bff] flex justify-center items-center hover:opacity-90 cursor-pointer">
                <FacebookIcon style={{ color: 'white' }}></FacebookIcon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 h-14 leading-[56px]">
        <hr />
        <a href='#' className='text-green-500 font-semibold'>All rights reserved: TAPHOAMMO.NET</a>
      </div>
    </div>
  );
}
