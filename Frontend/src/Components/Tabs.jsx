import React, { useState, useEffect } from "react";
import Tab1 from "./SubComponent/tab1";
import Tab2 from "./SubComponent/tab2";
import Tab3 from "./SubComponent/tab3";
import { FileText, BarChart2, Mail } from "lucide-react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [completedTabs, setCompletedTabs] = useState([]);

  // Add tab to completed tabs when navigating away
  useEffect(() => {
    if (activeTab && !completedTabs.includes(activeTab)) {
      setCompletedTabs([...completedTabs, activeTab]);
    }
  }, [activeTab]);

  const handleTabChange = (tab) => {
    // Only allow changing to tabs that are either next in sequence or completed
    const tabOrder = ["tab1", "tab2", "tab3"];
    const currentIndex = tabOrder.indexOf(activeTab);
    const targetIndex = tabOrder.indexOf(tab);
    
    if (targetIndex <= currentIndex + 1 || completedTabs.includes(tab)) {
      setActiveTab(tab);
    }
  };

  const goToNextTab = (tab) => {
    setActiveTab(tab);
    if (!completedTabs.includes(activeTab)) {
      setCompletedTabs([...completedTabs, activeTab]);
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case "tab1":
        return <Tab1 goToNextTab={() => goToNextTab("tab2")} />;
      case "tab2":
        return <Tab2 goToNextTab={() => goToNextTab("tab3")} />;
      case "tab3":
        return <Tab3 goBack={() => setActiveTab("tab2")} />;
      default:
        return null;
    }
  };

  const tabs = [
    { id: "tab1", label: "Upload Resumes", icon: FileText },
    { id: "tab2", label: "Score", icon: BarChart2 },
    { id: "tab3", label: "Invite", icon: Mail },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 bg-white rounded-xl shadow-md overflow-hidden">
      {/* Tab Navigation */}
      <div className="px-6 pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Resume Processing</h1>
          <div className="flex items-center space-x-1 w-full sm:w-auto">
            {tabs.map((tab, index) => {
              // Determine if this tab is available to click
              const isAvailable = 
                tab.id === "tab1" || 
                completedTabs.includes(`tab${index}`) || 
                tab.id === `tab${tabs.findIndex(t => t.id === activeTab) + 2}`;
                
              // Create variable for the progress line between tabs
              const showLine = index < tabs.length - 1;
              
              return (
                <React.Fragment key={tab.id}>
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex flex-col items-center justify-center ${
                        isAvailable ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                      }`}
                      disabled={!isAvailable}
                    >
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          activeTab === tab.id 
                            ? "bg-blue-600 text-white" 
                            : completedTabs.includes(tab.id)
                              ? "bg-green-100 text-green-700 border-2 border-green-500"
                              : "bg-gray-100 text-gray-500 border border-gray-300"
                        }`}
                      >
                        <tab.icon size={18} />
                      </div>
                      <span className={`text-xs mt-1 ${
                        activeTab === tab.id ? "font-bold text-blue-600" : "text-gray-500"
                      }`}>
                        {tab.label}
                      </span>
                    </button>
                  </div>
                  
                  {showLine && (
                    <div className={`hidden sm:block w-16 h-1 ${
                      completedTabs.includes(tab.id) && completedTabs.includes(tabs[index + 1].id)
                        ? "bg-green-500"
                        : activeTab === tabs[index + 1].id && completedTabs.includes(tab.id)
                          ? "bg-blue-500"
                          : "bg-gray-200"
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="px-6 pb-6">
        {renderTab()}
      </div>
    </div>
  );
};

export default Tabs;