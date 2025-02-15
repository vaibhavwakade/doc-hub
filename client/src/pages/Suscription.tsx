import { useorder } from '@/features/Docs/useOrder';
import {  suscription } from '@/services/api/document/documentApi';
import {  useQuery  } from '@tanstack/react-query';
import axios from 'axios';
import { Check } from 'lucide-react';

function Subscription() {
const {data,isLoading}=useQuery({
    queryKey: ['subscription'],
    queryFn: suscription
})
const pack = data?.data

const{ purchessus } = useorder()


const checkoutHandler = async (plan:any) => {
const amount= plan.price
    try {
      // Get the Razorpay key
      const {
        data: { key },
      } = await axios.get("http://www.localhost:8000/api/getkey");
      
      // Create an order on the server
      const {
        data: { order },
      } = await axios.post("http://localhost:8000/api/v1/payment/checkout", {
        amount,
      });
  
      // Razorpay configuration
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Agro Food",
        description: "Order Payment",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        callback_url: "http://localhost:8000/api/v1/payment/paymentverification",
        prefill: {
          name: "Nitish Kumar",
          email: "krnitish540@gmail.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
        handler: async (response:any) => {
            const id=plan?._id
            const payload= {
                packageId:id
            }
          try {
             purchessus(payload)
           
          } catch (error) {
            console.error("Error placing order:", error);
            
          }
        },
        modal: {
          ondismiss: () => {
            console.log("Payment popup closed");
          },
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error during checkout:", error);
  
    }
  };

  if(isLoading){
    return(
        [1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse"
            >
              <div className="p-8">
                <div className="w-24 h-6 mb-4 bg-gray-300 dark:bg-gray-600 rounded"></div> {/* Plan Name Skeleton */}
                <div className="mb-6">
                  <div className="w-32 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div> {/* Price Skeleton */}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gray-50 dark:bg-gray-700">
                <div className="w-full py-3 px-6 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div> {/* Button Skeleton */}
              </div>
            </div>
          ))
    )
 }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Perfect Plan</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">Get started with our flexible subscription options</p>
      </div>

      {/* Pricing Cards Container */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {pack?.map((plan:any, index:any) => (
          <div 
            key={plan.name}
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300
              ${index === 1 ? 'transform scale-105 border-2 border-blue-500 dark:border-blue-400' : ''}`}
          >
            <div className="p-8">
              {index === 1 && (
                <div className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm font-semibold mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold dark:text-white">${plan.price}</span>
                <span className="text-gray-600 dark:text-gray-300">/month</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Up to {plan.documentLimit} documents
                  </span>
                </div>
                {plan.features.map((feature:any, featureIndex:any) => (
                  <div key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-gray-700">
              <button 
                className={`w-full py-3 px-6 rounded-lg transition-colors duration-200 text-white
                  ${index === 1 
                    ? 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600' 
                    : 'bg-gray-900 dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-500'}`}
                    onClick={() => checkoutHandler(plan)}
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Have questions? Check out our FAQ section or contact our support team.
        </p>
      </div>
    </div>
  </div>
  );
}

export default Subscription;