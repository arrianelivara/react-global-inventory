import React from 'react'
import { Logo } from 'images';
import { Text, Button } from "components"
import { formatDate, redirectTo } from "services";
import lang from 'translations';
import { Path } from 'paths';
import { LogoutOutlined } from "@ant-design/icons";
import { StyleType } from 'enums';
import { useNavigate } from "react-router-dom";

const Navigation = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    const logoutCallback = () => {
      localStorage.clear();
      navigate(Path.AUTH);
    }
    return <React.Fragment>
      <div className="w-full py-2 border-b bg-white px-5">
        <div className="flex justify-between items-center">
          <img src={Logo} alt="logo" style={{ height: '60px' }}/>
          <div className="flex justify-between items-center gap-3">
            <Text>{formatDate(new Date())}</Text>
            {isLoggedIn && 
              <div>
                <Button type={StyleType.Secondary} onClick={logoutCallback}>
                  <LogoutOutlined className="mr-sm"/>{lang.logout}</Button>
              </div>}
          </div>
        </div>
      </div>
    </React.Fragment>
}

export default Navigation;