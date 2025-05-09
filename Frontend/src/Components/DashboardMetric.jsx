import { PercentBadgeIcon } from '@heroicons/react/16/solid';
import React from 'react';
function DashboardUpperMetrics({innerheader,cashval,grosspercent}) {
    
    const isProfit=parseFloat(grosspercent)>0 && grosspercent!=undefined
    const precentColorDynamic= isProfit? 'text-green-500':'text-red-500'

    return(    
    <div className="col-span-3 bg-[#0B1739] text-white rounded-xl">
    <div className="flex flex-col pl-2">
          <span className="text-sm font-medium p-3 text-gray-500">{innerheader}</span>
          <div className="flex items-baseline gap-2 pl-4">
            <span className="text-2xl font-bold text-white">{cashval}</span>
            <span className={`text-sm font-medium ${precentColorDynamic}`}>{grosspercent+'%'}</span>
          </div>
        </div>
    </div>
       );
}
export default DashboardUpperMetrics;