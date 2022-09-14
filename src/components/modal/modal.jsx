import React from "react";
import { Modal as AntModal } from "antd";
import classnames from "classnames";
import styles from "./modal.module.scss";
import { Text, Icon } from "components";

const Modal = ({
  active,
  children,
  title = "",
  customTitle,
  actionContent,
  close,
  noHeader,
  hidden = true,
  width,
  noCloseButton = false,
  paddingless = false,
  closable = false,
  fullModal = false,
}) => {

  return (
    <AntModal
      className={classnames(
        {
          "opacity-0": hidden,
          [`${styles.fullModal}`]: fullModal,
        },
        styles.container
      )}
      width={width}
      title={
        noHeader ? null : customTitle ? (
          <div className={"flex items-center justify-between"}>
            {customTitle}
            {!noCloseButton && (
              <Icon
                className="outline-none text-xl text-gray hover:text-gray cursor-pointer"
                name="remove"
                onClick={() => {
                  close();
                }}
              />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <Text modalTitle>{title}</Text>
            {!noCloseButton && (
              <Icon
                className="outline-none text-xl text-gray hover:text-gray cursor-pointer"
                name="remove"
                onClick={() => {
                  close();
                }}
              />
            )}
          </div>
        )
      }
      visible={active}
      footer={null}
      bodyStyle={{ padding: 0 }}
      maskClosable={closable}
      closable={false}
      onCancel={closable ? () => close() : null}
    >
      <div
        className={classnames({
          "pb-md": actionContent,
          "px-md": !paddingless,
          "bg-white": fullModal,
        })}
      >
        {children}
      </div>
      {actionContent}
    </AntModal>
  );
};

export default Modal;
