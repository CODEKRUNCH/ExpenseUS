import React, { useState ,useEffect} from 'react';
import Sidebar from '../components/sideBar';
import { AiOutlineDownload ,AiOutlineDown} from 'react-icons/ai';
import DashboardUpperMetrics from '../components/DashboardMetric';
import { addDays, startOfDay,format, startOfMonth, endOfMonth, startOfYear, endOfYear, subMonths, subYears, startOfQuarter, endOfQuarter, startOfWeek, endOfWeek } from 'date-fns';
import Example from '../components/Graph';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../css/datepicker.css'
import Barchartexpvsinc from '../Components/statspanel';
import PieChartExpense from '../Components/PieChartExpenses';
const ProfitPathHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [state, setState] = useState([
    {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  
 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

     
  
  //format text of range in the Button
   const formatDateRange = () => {
    const start = state[0].startDate;
    const end = state[0].endDate;
    
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${format(start, 'MMM d')}–${format(end, 'd, yyyy')}`;
    }
    return `${format(start, 'MMM d')} – ${format(end, 'MMM d, yyyy')}`;
  };


const customStaticRanges = [
  {
    label: 'Last 7 Days',
    range: () => ({
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
    }),
    isSelected(range) {
      const definedStart = addDays(new Date(), -7);
      const definedEnd = new Date();
      return (
        range.startDate.getTime() === definedStart.getTime() &&
        range.endDate.getTime() === definedEnd.getTime()
      );
    },
  },
  {
    label: 'Last 30 Days',
    range: () => ({
      startDate: addDays(new Date(), -30),
      endDate: new Date(),
    }),
    isSelected(range) {
      const definedStart = addDays(new Date(), -30);
      const definedEnd = new Date();
      return (
        range.startDate.getTime() === definedStart.getTime() &&
        range.endDate.getTime() === definedEnd.getTime()
      );
    },
  },
  {
    label: 'Last 90 Days',
    range: () => ({
      startDate: addDays(new Date(), -90),
      endDate: new Date(),
    }),
    isSelected(range) {
      const definedStart = addDays(new Date(), -90);
      const definedEnd = new Date();
      return (
        range.startDate.getTime() === definedStart.getTime() &&
        range.endDate.getTime() === definedEnd.getTime()
      );
    },
  },
  {
    label: 'Last 365 Days',
    range: () => ({
      startDate: addDays(new Date(), -365),
      endDate: new Date(),
    }),
    isSelected(range) {
      const definedStart = addDays(new Date(), -365);
      const definedEnd = new Date();
      return (
        range.startDate.getTime() === definedStart.getTime() &&
        range.endDate.getTime() === definedEnd.getTime()
      );
    },
  },
  {
    label: 'Last Month',
    range: () => {
      const start = startOfMonth(subMonths(new Date(), 1));
      const end = endOfMonth(subMonths(new Date(), 1));
      return { startDate: start, endDate: end };
    },
    isSelected(range) {
      const start = startOfMonth(subMonths(new Date(), 1));
      const end = endOfMonth(subMonths(new Date(), 1));
      return (
        range.startDate.getTime() === start.getTime() &&
        range.endDate.getTime() === end.getTime()
      );
    },
  },
  {
    label: 'Last 12 Months',
    range: () => ({
      startDate: startOfMonth(subMonths(new Date(), 11)),
      endDate: endOfMonth(new Date()),
    }),
    isSelected(range) {
      const start = startOfMonth(subMonths(new Date(), 11));
      const end = endOfMonth(new Date());
      return (
        range.startDate.getTime() === start.getTime() &&
        range.endDate.getTime() === end.getTime()
      );
    },
  },
  {
    label: 'Last Year',
    range: () => {
      const start = startOfYear(subYears(new Date(), 1));
      const end = endOfYear(subYears(new Date(), 1));
      return { startDate: start, endDate: end };
    },
    isSelected(range) {
      const start = startOfYear(subYears(new Date(), 1));
      const end = endOfYear(subYears(new Date(), 1));
      return (
        range.startDate.getTime() === start.getTime() &&
        range.endDate.getTime() === end.getTime()
      );
    },
  },
  {
    label: 'Week to Date',
    range: () => ({
      startDate: startOfWeek(new Date()),
      endDate: new Date(),
    }),
    isSelected(range) {
      const start = startOfWeek(new Date());
      const end = new Date();
      return (
        range.startDate.getTime() === start.getTime() &&
        range.endDate.getTime() === end.getTime()
      );
    },
  },
  {
    label: 'Month to Date',
    range: () => ({
      startDate: startOfMonth(new Date()),
      endDate: new Date(),
    }),
    isSelected(range) {
      const start = startOfMonth(new Date());
      const end = new Date();
      return (
        range.startDate.getTime() === start.getTime() &&
        range.endDate.getTime() === end.getTime()
      );
    },
  },
  {
    label: 'Year to Date',
    range: () => ({
      startDate: startOfYear(new Date()),
      endDate: new Date(),
    }),
    isSelected(range) {
      const start = startOfYear(new Date());
      const end = new Date();
      return (
        range.startDate.getTime() === start.getTime() &&
        range.endDate.getTime() === end.getTime()
      );
    },
  },
  {
    label: 'Quarter to Date',
    range: () => ({
      startDate: startOfQuarter(new Date()),
      endDate: new Date(),
    }),
    isSelected(range) {
      const start = startOfQuarter(new Date());
      const end = new Date();
      return (
        range.startDate.getTime() === start.getTime() &&
        range.endDate.getTime() === end.getTime()
      );
    },
  },
 
];

    return (
    <div className="flex bg-[#080F25] text-white p-1">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <div className={`w-full flex flex-col bg-[#080F25] gap-3 ${isSidebarOpen ? 'lg:ml-[200px]' : 'ml-0'}`}>
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 bg-[#080F25]">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome back, Bablu Boxer</h2>
            <p className="text-sm text-[#CBD5E0]">Measure your Expenses and Track Your Finances.</p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center text-sm border border-indigo-500 text-indigo-300 hover:bg-indigo-900/30 px-4 py-2 rounded-md">
              Export data <AiOutlineDownload className="ml-1" />
            </button>
            <button className="bg-[#A33AFF] text-sm font-bold px-4 py-2 rounded-md">
              Create report
            </button>
          </div>
        </div>

        {/* Date Picker */}
        <div className=" col-span-12 row-end-1 m-0 p-0">
          <button
            onClick={() => setIsPickerOpen(!isPickerOpen)}
          className="flex items-center gap-2 px-3 py-1 rounded-lg font-medium cursor-pointer transition-all hover:opacity-90 border border-indigo-500 text-indigo-300 hover:bg-indigo-900/30 shadow-[0_4px_12px_rgba(163,58,255,0.25)] hover:shadow-[0_6px_15px_rgba(163,58,255,0.3)]">
            <span>{formatDateRange(state)}</span>
            <AiOutlineDown className={`transition-transform duration-200 ${isPickerOpen ? 'rotate-180' : ''}`} />
          </button>
          {isPickerOpen && (
             <div className="absolute left-52 rounded-lg shadow-lg z-50 border-white text-black mt-2">
                          <DateRangePicker
              onChange={(item) => setState([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={state}
              direction="horizontal"
              preventSnapRefocus={true}
              calendarFocus="backwards"
              staticRanges={customStaticRanges}
              className="custom-date-range-picker"
              maxDate={new Date()}
            />
            </div>
          )}
        </div>

        {/* Metrics */}
       <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 rounded-2xl gap-4">
          <DashboardUpperMetrics innerheader="Current Balance" cashval="50.8K" grosspercent="28.4" />
          <DashboardUpperMetrics innerheader="Monthly Spending" cashval="100.8K" grosspercent="30.4" />
          <DashboardUpperMetrics innerheader="Budget Utilization" cashval="50%" />
          <DashboardUpperMetrics innerheader="Savings" cashval="40.8K" grosspercent="-30.4" />
        </div>

        {/* Graph */}
        <div className="grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4">
          <div className="sm:col-span-6 lg:col-span-6 rounded-xl">
            <Example />
            </div>
               <div className='lg:col-span-6'>
                <Barchartexpvsinc/>
          </div>
        </div>
     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 '>
        <div className='col-span-1 md:col-span-1 lg:col-span-6'>
            <PieChartExpense />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitPathHome;