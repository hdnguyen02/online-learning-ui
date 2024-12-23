
import { Outlet } from "react-router-dom"
import useAuth from "../context/AuthContext"
import { roles } from "../enum/role.enum";
import { useSearchParams } from "react-router-dom";
import PreparePaymentComponent from "../feature/group/prepare-payment.component";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { showToastError, showToastMessage } from "../global";

export default function GlobalGroup() {

  // check xem. 
  const [searchParams] = useSearchParams();
  const payment_status = searchParams.get("payment_status"); 
  
  useEffect(() => {
    console.log(payment_status);
    if (payment_status) { 
      if (payment_status == "success") { 
        showToastMessage("Thanh toán thành công"); 
        
      }
      else if (payment_status == "fail") { 
        showToastError("Thanh toán thất bại");  
      }
      else if (payment_status == "refund") { 
        showToastError("Đã xảy ra lỗi, liên hệ admin!"); 
      }
    }
  }, [])

  const {auth} = useAuth(); 
  if (auth.roles.includes(roles.groupActivitiesAccess)) { 
    return <div className='mx-4 md:mx-48 mt-28'>
        <ToastContainer/>
        <Outlet />
    </div>
  }
  else { 
    return <div>
      <ToastContainer/>
      <PreparePaymentComponent/>
    </div>
 
  }

   
  
}