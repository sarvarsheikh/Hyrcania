import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentResultPage = () => {
    const [paymentStatus, setPaymentStatus] = useState({
        loading: true,
        success: false,
        message: '',
        refId: null,
        amount: null
    });

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                const token = localStorage.getItem("token");
                const parsedToken = JSON.parse(token);
                const searchParams = new URLSearchParams(location.search);
                const authority = searchParams.get("Authority");
                const status = searchParams.get("Status");

                if (!authority || !status) {
                    throw new Error("Missing Authority or Status in URL");
                }

                const response = await fetch(`https://hyrcanianrun.liara.run/api/payment/verify/?Authority=${authority}&Status=${status}`, {
                    headers: {
                        Authorization: `JWT ${parsedToken.access_token}`,
                    },
                });

                const result = await response.json();
                console.log(result)
                if (result.status) {
                    setPaymentStatus({
                        loading: false,
                        success: true,
                        message: result.message,
                        refId: result.ref_id || null,
                        amount: result.amount || null
                    });
                } else {
                    setPaymentStatus({
                        loading: false,
                        success: false,
                        message: result.message || "Payment failed or canceled",
                        refId: null,
                        amount: null
                    });
                }
            } catch (error) {
                console.error("Verification error:", error);
                setPaymentStatus({
                    loading: false,
                    success: false,
                    message: "An error occurred while verifying payment.",
                    refId: null,
                    amount: null
                });
            }
        };

        verify();
    }, [location]);

    const handleReturnHome = () => {
        navigate('/'); // Navigate to home page
    };

    const handleViewTickets = () => {
        navigate('/tickets'); // Navigate to tickets page
    };

    const handleTryAgain = () => {
        navigate('/marathon'); // Navigate back to marathon signup page
    };

    // Display loading state
    if (paymentStatus.loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
                <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center">
                    <div className="inline-block h-10 w-10 mb-4">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-500"></div>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-700">در حال تکمیل پرداخت شما</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className={`bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center 
        ${paymentStatus.success ? 'border-t-4 border-green-500' : 'border-t-4 border-red-500'}`}>

                <div className="flex justify-center mb-6">
                    {paymentStatus.success ? (
                        <div className="rounded-full bg-green-100 p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                    ) : (
                        <div className="rounded-full bg-red-100 p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                        </div>
                    )}
                </div>

                <h1 className="text-2xl font-bold mb-4">
                    {paymentStatus.success ? 'پرداخت با موفقیت انجام' : 'پرداخت به مشکل خورد'}
                </h1>

                <p className="text-gray-600 mb-6">{paymentStatus.message}</p>

                {paymentStatus.refId && (
                    <div className="bg-gray-50 p-4 rounded-md mb-6 text-left">
                        <p className="mb-2"><span className="font-medium">شماره پیگیری </span> {paymentStatus.refId}</p>
                        {paymentStatus.amount && (
                            <p className="mb-2"><span className="font-medium">مقدار پرداختی</span> ${paymentStatus.amount}</p>
                        )}
                        <p><span className="font-medium">تاریخ</span> {new Date().toLocaleDateString()}</p>
                    </div>
                )}

                <div className="space-y-3">
                    {paymentStatus.success ? (
                        <>
                            <button
                                onClick={handleViewTickets}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md font-medium transition-colors"
                            >
                                مشاهده بلیط
                            </button>
                            <button
                                onClick={handleReturnHome}
                                className="w-full border border-blue-500 text-blue-500 hover:bg-blue-50 py-3 px-4 rounded-md font-medium transition-colors"
                            >
                                بازگشت به خانه
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleTryAgain}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md font-medium transition-colors"
                            >
                                دوباره امتحان کنید
                            </button>
                            <button
                                onClick={handleReturnHome}
                                className="w-full border border-blue-500 text-blue-500 hover:bg-blue-50 py-3 px-4 rounded-md font-medium transition-colors"
                            >
                                بازگشت به خانه
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentResultPage;