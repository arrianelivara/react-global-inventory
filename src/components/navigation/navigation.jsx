import React from 'react'
import { Logo } from 'images';
import { Text, Button } from "components"
import { formatDate, redirectTo } from "services";
import lang from 'translations';
import { Path } from 'paths';
import { LogoutOutlined } from "@ant-design/icons";
import { StyleType } from 'enums';
import { useNavigate } from "react-router-dom";
import { useModal } from 'hooks/index';
import { Modal } from "antd";

const Navigation = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    const logoutModal = useModal();

    const logoutCallback = () => {
      logoutModal.show({
        onOk: () => {
          localStorage.clear();
          logoutModal.close();
          navigate(Path.AUTH);
        },
        onCancel: () => {
          logoutModal.close()
        }
      })

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
      <Modal {...logoutModal} 
        title='Are you sure you want to logout?'
        content='You will be redirected to Sign in Page.'
        okText='Yes, I am sure.'
        cancelText='No, go back.'/>
    </React.Fragment>
}

export default Navigation;