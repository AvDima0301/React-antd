import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import { IRegisterForm } from './type';


import './index.css';
import { Layout, Menu, Breadcrumb, Button, Modal, Input, Row, Col, AutoComplete } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import axios, { Axios, AxiosRequestConfig } from 'axios';
import { stringify } from 'querystring';

const DefaultLayout : React.FC = () => {

    const { Header, Content, Footer } = Layout;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalName, setModalName] = useState<string>("person");
    const imgRef = React.useRef<HTMLImageElement>(null);
    const prevRef = React.useRef<HTMLImageElement>(null);
    const [cropperObj, setCropperObj] = useState<Cropper>();
    const [visible, setVisible] = useState<boolean>(false);    
    const [imageView, setImageView] = useState<string>("https://congress.ache.org/wp-content/uploads/2021/11/default-avatar.jpg");

    const showRegisterModal = () => {
        setIsModalVisible(true);
    };
    
    const handleRegisterOk = () => {
        console.log(imageView, modalName);
        const person: IRegisterForm = {
            name: modalName,
            image: imageView,
        }
        registerPerson(person);
        setIsModalVisible(false);
    };

    const registerPerson = async (person: IRegisterForm) => {
        //console.log(person.image);
        const res = await axios
        .post<IRegisterForm>("http://localhost:8084/add", person)
        //.post(`http://localhost:8084/add?name=${person.name}&image=${person.image}`)
        .then(res => {
            console.log(res);
        });
    }
    
    const handleRegisterCancel = () => {
        setIsModalVisible(false);
    };

    const handleSelect = async (files: FileList | null) => {
        if(files != null)
        {
          let file = files[0];
          const img = URL.createObjectURL(file);
  
          await setVisible(true);
          let cropper = cropperObj;
          if (!cropperObj) {
            cropper = new Cropper(imgRef.current as HTMLImageElement, {
              aspectRatio: 1 / 1,
              viewMode: 1,
              preview: prevRef.current as HTMLImageElement,
            });
          }
          cropper?.replace(img);
          setCropperObj(cropper);
        } 
      }
      const handleCropped = async () => {
        const base64 = cropperObj?.getCroppedCanvas().toDataURL() as string;
        //console.log("base64", base64);
        setImageView(base64);
        setVisible(false);
      } 

    return ( 
        <>
            <Modal title="Register"
            visible={isModalVisible} 
            onOk={handleRegisterOk} 
            onCancel={handleRegisterCancel}>
                <div  style={{marginBottom: "15px"}}>
                    <label htmlFor="uploadfile">
                        <img src={imageView} alt="фото" width="150"/>
                    </label>
                    <input type="file" id="uploadfile" style={{display: "none"}} onChange={e => {handleSelect(e.currentTarget.files)}}/>
                </div>
                <Input placeholder="Name" onChange={e => {setModalName(e.currentTarget.value)}}/>
            </Modal>

            <Modal
            title="Select image"
            centered
            visible={visible}
            onOk={handleCropped}
            onCancel={() => setVisible(false)}
            width={1000}
            maskClosable={false}>
                <Row gutter={[8, 0]}>
                    <Col md={18} xs={24}>
                        <div>
                            <img
                            ref={imgRef}
                            src={imageView}
                            width="100%"/>
                        </div>
                    </Col>
                    <Col md={6} xs={24}>
                        <div
                            ref={prevRef}
                            style={{ height: "100px",
                            border: "1px solid silver",
                            overflow: 'hidden'}}>
                        </div>
                    </Col>
                </Row>
            </Modal>

            <Layout>
                <Header className="header" style={{display: 'flex', justifyContent: "end", alignItems: "center"}}>
                    <div className="logo" />
                    <Button ghost style={{marginRight: "15px"}}>Login</Button>
                    <Button type="primary" onClick={showRegisterModal}>Register</Button>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Outlet />
                    </Content>
                </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </>
    );
}   

export default DefaultLayout;


