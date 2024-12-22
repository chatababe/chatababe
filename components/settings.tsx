import { X } from "lucide-react";
import React from "react";

const Settingstab = ({setOpenSettings}: {setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <div className="relative min-h-[8rem] px-6 py-4 mb-2 mx-8 border border-n-4/40 rounded-lg shadow-sm lg:px-8 max-lg:hidden">
      <div className="flex items-center mb-2">
        <h1 className="text-sm text-s-1 font-semibold capitalize mb-2">
          options
        </h1>
        <button className="ml-auto" onClick={()=>setOpenSettings(false)}>
          <X color="#C1C1C1" />
        </button>
      </div>
      <div className="flex items-center gap-12">
        <div>
          <h2 className="text-xs text-n-3 mb-2 font-medium">Settings</h2>
          <form className="flex items-center">
            <input type="checkbox" name="locations" className="w-4 h-4 mr-2" />
            <label htmlFor="locations" className="text-xs text-n-2">
              show locations
            </label>
          </form>
        </div>
        <div>
          <h2 className="text-xs text-n-3 mb-2 font-medium">Refreshes thumbnail every:</h2>
          <form className="flex items-center">
            <input type="checkbox" name="refresh" className="w-4 h-4 mr-2" />
            <label htmlFor="refresh" className="text-xs text-n-2">
              refresh
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settingstab;
