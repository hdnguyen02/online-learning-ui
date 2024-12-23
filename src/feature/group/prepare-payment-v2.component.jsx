import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../../context/AuthContext";
import { fetchData } from "../../global";

export default function PreparePaymentV2Component() {
    const [hoveredCard, setHoveredCard] = useState(null);

    const {auth} = useAuth(); 

    const pricingData = [
        {
            name: "Basic",
            price: "299,000",
            description: "Hoàn hảo để bắt đầu sử dụng dịch vụ của chúng tôi",
            features: [
                "Chia sẻ bộ thẻ học tập dễ dàng",
                "Thảo luận",
            ],
            buttonText: "Thanh toán",
            bgColor: "bg-white",
            hoverBgColor: "hover:bg-gray-50"
        }
    ];


    const onPayment = async () => {
        const email = auth.email
        const subUrl = `/payment?email=${email}`; 
        try {
            const { data } = await fetchData(subUrl, 'GET'); 
            const urlPayment = data; 

            window.location.replace(urlPayment);
        }
        catch (error) {
            console.log(error.message); 
        }
    }

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
            
        
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                        Chọn gói hoàn hảo của bạn
                    </h2>
                    <p className="text-xl text-gray-600">
                        Các gói cước linh hoạt phù hợp với nhu cầu của bạn với mức giá bằng VND
                    </p>
                </div>

                <div className="flex justify-center">
                    {pricingData.map((plan, index) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-2xl ${plan.bgColor} ${plan.hoverBgColor} transition-all duration-300 transform ${hoveredCard === index ? "scale-105" : "scale-100"} shadow-xl overflow-hidden max-w-md w-full`}
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline mb-4">
                                    <span className="text-5xl font-extrabold text-gray-900">
                                        {plan.price}
                                    </span>
                                    <span className="text-gray-600 ml-2">VND</span>
                                </div>
                                <p className="text-gray-600 mb-6">{plan.description}</p>
                                <button
                                    onClick={onPayment}
                                    className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-colors duration-200 ${hoveredCard === index ? "bg-indigo-700" : "bg-indigo-600"} hover:bg-indigo-700`}
                                >
                                    {plan.buttonText}
                                </button>
                            </div>
                            <div className="border-t border-gray-200 p-8">
                                <ul className="space-y-4">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li
                                            key={featureIndex}
                                            className="flex items-center text-gray-600"
                                        >
                                            <FaCheck className="text-green-500 mr-3" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}