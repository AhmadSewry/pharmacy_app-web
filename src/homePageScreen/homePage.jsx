import React from "react";
import Sidebar from "../components/Sidebar"
import TopBar from "../components/TopBar";




const HomePage = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  
  const handleDrawerClose = () => {
    setOpen(false);
  };
 
  return (
    <div>
      
     <TopBar open ={open} handleDrawerOpen={handleDrawerOpen}/>

      <Sidebar open ={open} handleDrawerClose={handleDrawerClose} /> 

    </div>
  );
};

export default HomePage;