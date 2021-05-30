import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Direct from "../components/direct";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="grid  grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg ">
        <Switch>
          <Route exact path="/dashboard">
            <Timeline />
            <Sidebar />
          </Route>
          <Route path="/dashboard/direct">
            <Direct />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
