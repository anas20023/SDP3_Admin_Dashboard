import React from 'react';
import { CreditCard, Clock, Construction } from 'lucide-react';

const TransactionManage = () => {
    return (
        <div className="p-4 flex flex-col items-center justify-center min-h-[80vh] bg-slate-50">
            <div className="max-w-md w-full text-center space-y-6 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="relative inline-flex">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                    <div className="relative bg-primary/10 p-5 rounded-2xl text-primary">
                        <CreditCard size={48} />
                    </div>
                    <div className="absolute -top-1 -right-1 bg-amber-100 p-1.5 rounded-lg text-amber-600 border border-amber-200">
                        <Construction size={16} />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-800">Transaction Management</h2>
                    <p className="text-gray-500">
                        We're currently building the financial tracking and payment history module.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm font-medium text-amber-600 bg-amber-50 py-2 px-4 rounded-full border border-amber-100">
                    <Clock size={16} />
                    <span>Coming in v2.0</span>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                    <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>Development Progress</span>
                        <span>45%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[45%] transition-all duration-1000"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionManage;
