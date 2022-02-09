// import axios from "axios";
// import React, { useEffect } from "react";
// import { IAnimalResult } from "./types";
// import Cropper from "cropperjs";

// import { Modal, Button } from 'antd';
// import { Row, Col } from 'antd';

// const HomePage: React.FC = () => {
//     const [animals, setAnimals] = React.useState<IAnimalResult[]>([]);

//     const getAnimals = async () => {
//         try {
//             const res = await axios
//                 .get('http://localhost:8084/')
//             const { data } = res;
//             console.log("res: ", res.data);
//             setAnimals(data);
//         } catch (ex) {
//             console.log("Problem: ", ex);
//         }
//     }

//     useEffect(() => {
//         console.clear();
//         getAnimals();
//     }, []);

//     return (
//         <div>
//             {/* {console.log("animals: ",animals)} */}
//             {/* {animals.map(animal => {
//                 return(
//                 <div>
//                     {console.log(animal.id, animal.name)}
//                     <h3>|Id: {animal.id}| Name: {animal.name}</h3>
//                 </div>
//                 );
//             })} */}
//         </div>
        
//     );
// }

// export default HomePage;

import "cropperjs/dist/cropper.min.css";
import * as React from 'react';
import { Modal, Button, Row, Col } from 'antd';
import Cropper from "cropperjs";

const HomePage : React.FC = () => {
    const imgRef = React.useRef<HTMLImageElement>(null);
    const prevRef = React.useRef<HTMLImageElement>(null);
    const [cropperObj, setCropperObj] = React.useState<Cropper>();

    const [visible, setVisible] = React.useState(false);
    const handleShow = async () => {
        await setVisible(true);
        let cropper = cropperObj;
        if (!cropperObj) {
          cropper = new Cropper(imgRef.current as HTMLImageElement, {
            aspectRatio: 1 / 1,
            viewMode: 1,
            preview: prevRef.current as HTMLImageElement,
          });
        }
        cropper?.replace("https://vovalohika.tk/images/1200_431btv0l.ykj.jpeg");
        setCropperObj(cropper);
    }

    const handleCropped = async () => {
        const base64 = cropperObj?.getCroppedCanvas().toDataURL() as string;
        console.log("base64", base64);
        setVisible(false);
    }

    return (
        <>
        <h1>Home page</h1>
        <Button type="primary" onClick={handleShow}>
          Download photo
        </Button>
        <Modal
          title="Select photo"
          centered
          visible={visible}
          onOk={handleCropped}
          onCancel={() => setVisible(false)}
          width={1000}
          maskClosable={false}
        >
          <Row gutter={[8,0]}>
            <Col md={18} xs={24}>
                <div>
                    <img
                        ref={imgRef} 
                        src="https://vovalohika.tk/images/1200_431btv0l.ykj.jpeg" 
                        width="100%"/>
                </div>
            </Col>
            <Col md={6} xs={24}>
                <div
                    ref = {prevRef}
                    style={{
                        height: "100px",
                        border: "1px solid silver",
                        overflow: "hidden"
                    }}>
                </div>
            </Col>
          </Row>
        </Modal>
        </>
    );
}

export default HomePage;