import React, { useState, useEffect } from 'react'
import Quagga from 'quagga'


export default function QrcodeScanner() {
    // const [video,setVideo] = useState(document.querySelector("video"));
    // const [canvas,setCanvas] = useState({});
    // const [take,setTake] = useState('');

const drawImage = (canvas,video) => {
//   const canvas = document.querySelector("canvas")
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  var opts = {
    errorCorrectionLevel: "H",
    type: "image/jpeg",
    quality: 0.3,
    margin: 1,
    color: {
      dark: "#010599FF",
      light: "#FFBF60FF",
    },
  };

  window.qrcode.decode(canvas.toDataURL("image/png"));

  window.qrcode.callback = function (data) {
    if (data == "error decoding QR Code") {
      barcodeDecode(canvas.toDataURL('image/png'))
    } else {
    //   video.removeEventListener("timeupdate", checkCode);
    //   video.pause();
      alert(data);
      document.getElementById("message").innerText =
        "第" + window.count + "次成功:" + data;
      //location.href = data;
    }
  };
};

const barcodeDecode = (src) => {

    var config = {
        inputStream: {
        size: 800,
        singleChannel: false
        },
        locator: {
            patchSize: "medium",
            halfSample: true
            },
        decoder: {
            readers: [{
                format: "code_39_reader",
                config: {}
                }]
            },
        locate: true,
    }

    Quagga.decodeSingle(config, function(result) {
            if(!result){
                //  alert("图片中没有条形码和二维码！");
                return false;
            }
            //识别结果
            if(result.codeResult){
                alert("图片中的条形码为：" + result.codeResult.code);
            }else{
                // alert("未识别到图片中的条形码！");
            }
    });
}
    useEffect(() => {
        // document.querySelector("#message").innerHTML = "getUserMedia" in navigator.mediaDevices? "api is exist": "api is not exist";
        var count = 0;
        const constraints = {
        audio: false,
        video: {
            width: 180,
            height: 320,
            facingMode: { exact: "environment" },
            // facingMode:{exact:"user"},
        },
        };
        window.navigator.mediaDevices
        .getUserMedia(constraints)
        .then((mediaStream) => {
            const video = document.querySelector("video");
            video.srcObject = mediaStream;
            video.onloadedmetadata = (e) => {
            video.play();
            };
        })
        .catch((err) => {
            // document.querySelector("#error").innerHTML = err.name + ": " + err.message;
        });
        const video = document.querySelector("video");
        const canvas = document.querySelector("canvas");
        const take = document.querySelector("take");
        // setVideo(document.querySelector("video"));
        // setCanvas(document.querySelector("canvas"));
        // setTake(document.querySelector("take"));
        console.log('cavans',document.querySelector("canvas"))
        console.log('canvas2',canvas)
        // video.addEventListener('timeupdate',drawImage);
        // take.addEventListener("click", drawImage);
        drawImage(canvas,video);

        
    }, );

    
    return (
        <div>
            <p id="message"></p>
            <p id="error"></p>
            <video style={{width: '320px',height: '180px'}}></video>
            <canvas width="320" height="180 " ></canvas>
            <button id="take">take</button>
            <button id="upload">upload</button>
            <input style={{display: 'none'}} type="file" accept="image/*" />
        </div >
    )
}