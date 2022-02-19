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

import * as React from 'react';
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import { url } from "inspector";

import { Modal, Button, Row, Col } from 'antd';
import './index.css';

const HomePage : React.FC = () => {
    const imgRef = React.useRef<HTMLImageElement>(null);
    const prevRef = React.useRef<HTMLImageElement>(null);
    const [cropperObj, setCropperObj] = React.useState<Cropper>();

    const [visible, setVisible] = React.useState<boolean>(false);
    const [imageView, setImageView] = React.useState<string>("https://www.securityindustry.org/wp-content/uploads/sites/3/2018/05/noimage.png");

    // const handleShow = async () => {
    //     await setVisible(true);
    //     let cropper = cropperObj;
    //     if (!cropperObj) {
    //       cropper = new Cropper(imgRef.current as HTMLImageElement, {
    //         aspectRatio: 1 / 1,
    //         viewMode: 1,
    //         preview: prevRef.current as HTMLImageElement,
    //       });
    //     }
    //     cropper?.replace(imageView);
    //     setCropperObj(cropper);
    // }

    // const handleCropped = async () => {
    //   const base64 = cropperObj?.getCroppedCanvas().toDataURL() as string;
    //   console.log("base64", base64);
    //   setImageView(base64);
    //   setVisible(false);
    // }

    // const handleSelect = async (files: FileList | null) => {
    //   if(files != null)
    //   {
    //     let file = files[0];
    //     const img = URL.createObjectURL(file);
    //     //await setImageView(URL.createObjectURL(file));

    //     await setVisible(true);
    //     let cropper = cropperObj;
    //     if (!cropperObj) {
    //       cropper = new Cropper(imgRef.current as HTMLImageElement, {
    //         aspectRatio: 1 / 1,
    //         viewMode: 1,
    //         preview: prevRef.current as HTMLImageElement,
    //       });
    //     }
    //     cropper?.replace(img);
    //     setCropperObj(cropper);
    //   } 

    // } 

    return (
      <>
        <h1>Profile</h1>
        {/* <Button type="primary" onClick={handleShow}>
          Завантажити фото
        </Button> */}
        {/* <div>
          <label htmlFor="uploadfile">
            <img src={imageView} alt="фото" width="250"/>
          </label>
          <input type="file" id="uploadfile" style={{display: "none"}} onChange={e => {handleSelect(e.currentTarget.files)}}/>
        </div>

        <Modal
          title="Вибір фото"
          centered
          visible={visible}
          onOk={handleCropped}
          onCancel={() => setVisible(false)}
          width={1000}
          maskClosable={false}
        >
          <Row gutter={[8, 0]}>
            <Col md={18} xs={24}>
              <div>
                <img
                  ref={imgRef}
                  // src="https://vovalohika.tk/images/1200_431btv0l.ykj.jpeg"
                  src={imageView}
                  width="100%"
                />
              </div>
            </Col>
            <Col md={6} xs={24}>
              <div
                ref={prevRef}
                style={{
                  height: "100px",
                  border: "1px solid silver",
                  overflow: "hidden",
                }}
              ></div>
            </Col>
          </Row>
        </Modal> */}
      </>
    );
}

export default HomePage;